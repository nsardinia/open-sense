
FROM node:22.16.0-alpine
# Set working directory
WORKDIR /app
# Copy package files first (for efficient caching)
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy the rest of the source code
COPY . .
# Build the Vite app
RUN npm run build
# Copy built files from previous stage
RUN npm install -g serve
RUN npm install -g serve

EXPOSE 3000

# Start NGINX
CMD ["serve", "dist"]
