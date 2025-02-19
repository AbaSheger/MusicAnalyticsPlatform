# Use an official Node.js image to build the application
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code and build the application
COPY . .
RUN npm run build

# Expose port 3000 and set the entry point to run the application
EXPOSE 3000
CMD ["npm", "start"]
