# Use the official Node.js image as a base image
FROM node:22.6.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code into the working directory
COPY . .

# Expose the application port (adjust if your app uses a different port)
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "start"]