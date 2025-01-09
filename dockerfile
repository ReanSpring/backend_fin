# Use the official Node.js image from Docker Hub
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file into the container (if it exists)
COPY .env .env

# Expose the application port
EXPOSE 3000

# Build and start the application
RUN npm run build

# Start the app
CMD ["npm", "start"]