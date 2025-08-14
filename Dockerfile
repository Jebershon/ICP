# Use official Node.js 18 image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Force Puppeteer to download Chrome during build
RUN npx puppeteer browsers install chrome

# Copy all project files
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
