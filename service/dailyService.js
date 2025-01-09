const moment = require('moment');
const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    day: { type: String, required: true },
    amount: { type: Number, required: true },
    detail: { type: String },
    date: { type: Date, default: Date.now },
},{
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});

const Daily = mongoose.model('Daily', dailySchema);

exports.createDaily = async (dailyData) => {
    if (!dailyData.date) {
        dailyData.date = Date.now();
    }
    const daily = new Daily(dailyData);
    await daily.save();
    return daily;
}

exports.getDailies = async () => {
    const dailies = await Daily.find();
    return dailies;
}

exports.getDailyById = async (id) => {
    const daily = await Daily.findById(id);
    return daily;
}

exports.updateDaily = async (id, dailyData) => {
    const daily = await Daily.findByIdAndUpdate(id, dailyData, { new: true });
    return daily;
}

exports.deleteDaily = async (id) => {
    const result = await Daily.findByIdAndDelete(id);
    return result ? true : false;
}

exports.calculateAmountYear = async () => {
    try {
        const dailies = await Daily.find();
        
        // Group entries by year dynamically
        const groupedByYear = dailies.reduce((acc, daily) => {
            const yearKey = moment(daily.date).year();
            if (!acc[yearKey]) {
                acc[yearKey] = [];
            }
            acc[yearKey].push(daily);
            return acc;
        }, {});

        // Get all unique years from the grouped data and sort them
        const years = Object.keys(groupedByYear).map(Number).sort((a, b) => a - b);  // Sorting years in ascending order
        
        // Function to get the month-wise data for a given year
        const getYearData = (yearKey) => {
            const yearDailies = groupedByYear[yearKey] || [];
            const totalAmount = yearDailies.reduce((sum, daily) => sum + daily.amount, 0);
            const months = moment.months();  // Array with names of months

            const formattedMonthData = months.map((month, idx) => {
                const monthData = yearDailies.filter(daily => moment(daily.date).month() === idx);
                return {
                    month: `${month} ${yearKey}`,
                    start: moment(`${yearKey}-${idx + 1}-01`).startOf('month').toISOString(),
                    amount: monthData.reduce((sum, daily) => sum + daily.amount, 0),
                };
            });

            return { yearKey, totalAmount, months: formattedMonthData };
        };

        // Generate data for all years
        const allYearData = years.map(year => getYearData(year));

        return allYearData;

    } catch (error) {
        console.error('Error calculating amounts:', error.message);
        throw new Error('Failed to calculate amounts. Please try again.');
    }
};


exports.calculateAmountMonth = async () => {
    try {
        const dailies = await Daily.find();

        // Group entries by year and month first
        const groupedByMonth = dailies.reduce((acc, daily) => {
            const year = moment(daily.date).year();
            const month = moment(daily.date).month(); // 0-based month
            
            const monthKey = `${year}-${month}`; // Group by Year-Month

            if (!acc[monthKey]) {
                acc[monthKey] = [];
            }
            acc[monthKey].push(daily);
            return acc;
        }, {});

        // Get all unique months (like "2025-0", "2025-1" for Jan, Feb 2025)
        const monthKeys = Object.keys(groupedByMonth);

        // Function to get the data for each month and its weeks
        const getMonthWeekData = (monthKey) => {
            const [year, month] = monthKey.split('-');
            const monthDailies = groupedByMonth[monthKey] || [];

            // Calculate weeks (start from day of the month and group into 7-day intervals)
            const weekData = [];
            const daysInMonth = moment(`${year}-${parseInt(month) + 1}`, "YYYY-MM").daysInMonth();
            let currentWeekAmount = 0;
            let weekNumber = 1; // Always start from Week 1 for the new month

            // Loop over each day of the month
            for (let i = 1; i <= daysInMonth; i++) {
                const dayOfMonth = moment(`${year}-${parseInt(month) + 1}-${i}`, "YYYY-MM-DD");
                const dailyData = monthDailies.filter(daily => moment(daily.date).isSame(dayOfMonth, 'day'));
                const totalAmount = dailyData.reduce((sum, item) => sum + item.amount, 0);

                currentWeekAmount += totalAmount;

                // If it's the last day of the week or the last day of the month, push the week data
                if (dayOfMonth.isoWeekday() === 7 || i === daysInMonth) {
                    weekData.push({
                        week: `W${weekNumber}`,
                        amount: currentWeekAmount
                    });
                    currentWeekAmount = 0; // Reset the amount for the next week
                    weekNumber++; // Increment to the next week number
                    if (weekNumber > 4) break; // Ensure there are only 4 weeks max
                }
            }

            // Fill any remaining weeks with 0 if no data
            while (weekData.length < 4) {
                weekData.push({
                    week: `W${weekNumber}`,
                    amount: 0
                });
                weekNumber++;
            }

            // Sort weeks by date order
            weekData.sort((a, b) => {
                const weekA = parseInt(a.week.replace('W', ''));
                const weekB = parseInt(b.week.replace('W', ''));
                return weekA - weekB;
            });

            return {
                month: moment().year(year).month(month).format('MMMM YYYY'),  // e.g., "January 2025"
                weekData,
            };
        };

        // Generate data for all months
        const allMonthData = monthKeys.map(monthKey => getMonthWeekData(monthKey));

        return allMonthData;

    } catch (error) {
        console.error('Error calculating monthly week data:', error.message);
        throw new Error('Failed to calculate monthly week data. Please try again.');
    }
};

exports.calculateAmountWeeks = async () => {
    try {
        const dailies = await Daily.find(); // Get all daily records from the database

        // Group daily data by Year and Week (YYYY-WW format)
        const groupedByWeek = dailies.reduce((acc, daily) => {
            const year = moment(daily.date).year();
            const week = moment(daily.date).week();  // Using week() to ensure correct week number
            const weekKey = `${year}-W${week}`;  // Year-Week format

            if (!acc[weekKey]) {
                acc[weekKey] = [];
            }
            acc[weekKey].push(daily);
            return acc;
        }, {});

        // Generate the data for each week (with daily aggregation)
        const allWeekData = Object.keys(groupedByWeek).map(weekKey => {
            const [year, week] = weekKey.split('-');
            const weekDailies = groupedByWeek[weekKey];
            const startOfWeek = moment().year(year).week(week).startOf('week');  // Get the first day of the week

            // Create an array for each day of the week (7 days)
            const weekDaysData = Array.from({ length: 7 }, (_, dayIndex) => {
                const dayOfWeek = startOfWeek.clone().add(dayIndex, 'days');  // Get the exact date for each day

                // Get all daily entries for this day
                const dailyDataForDay = weekDailies.filter(daily => 
                    moment(daily.date).startOf('day').isSame(dayOfWeek.startOf('day'))
                );

                // Sum the amounts for this day
                const totalAmountForDay = dailyDataForDay.reduce((sum, item) => sum + item.amount, 0);

                return {
                    day: dayOfWeek.format('dddd'),  // Get the full name of the day
                    date: dayOfWeek.toISOString(),  // Get the date in ISO format
                    amount: totalAmountForDay,      // The total amount for that day
                };
            });

            // Calculate the total amount for the whole week
            const totalAmountForWeek = weekDailies.reduce((sum, daily) => sum + daily.amount, 0);

            return {
                week: `WW${week} ${year}`,  // Format for the week (e.g., WW1 2025)
                totalAmount: totalAmountForWeek,
                dailyData: weekDaysData,  // Data for each day in the week
            };
        });

        return allWeekData;  // Return the aggregated weekly data

    } catch (error) {
        console.error('Error calculating weekly amounts:', error.message);
        throw new Error('Failed to calculate weekly amounts. Please try again.');
    }
};