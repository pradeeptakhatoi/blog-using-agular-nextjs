# Stage 1: Build the application
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production

# Expose application port
EXPOSE 3000

# Set environment variables (Modify as needed)
ENV NODE_ENV=production

# Start the NestJS application
CMD ["node", "dist/main"]
