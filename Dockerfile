# Stage 1: Build
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
COPY tsconfig.json ./
COPY .npmrc .npmrc 
RUN npm ci

# Copy source files and build
COPY ./src ./src
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only what's needed to run the app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Start the app
CMD ["node", "dist/index.js"]
