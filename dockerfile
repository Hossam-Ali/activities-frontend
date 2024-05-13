# Use the official Node.js 20.9.0 image as the base image
FROM node:20.9.0

# Set the working directory in the container
WORKDIR /usr/src/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (if necessary)
EXPOSE 5173

# Command to run your application
CMD ["npm", "start"]
