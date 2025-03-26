# Use official Node.js LTS image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use a lightweight HTTP server to serve the Angular app
RUN npm install -g http-server

# Set default command to serve the app
CMD ["http-server", "dist/blog-frontend", "-p", "80"]

# Expose port 80 for the container
EXPOSE 80
