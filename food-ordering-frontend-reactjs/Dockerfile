# Use a Node.js base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the entire project
COPY . .

# Build the project (if necessary)
# RUN npm run build

# Expose port 3000 (or any other port you want to use)
EXPOSE 3000

# Command to start the Node.js server
CMD ["npm", "start"]
