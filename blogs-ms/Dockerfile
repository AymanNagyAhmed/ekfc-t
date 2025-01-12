# Backend Dockerfile for Development
FROM node:22.11.0-alpine

# Add labels for image identification
LABEL name="ekfc-blog-ms"
LABEL version="dev"
LABEL description="posts Microservice development image"
LABEL maintainer="AymanNagy.Ahmed@gmail.com"

RUN if ! yarn --version; then npm install -g yarn@1.22.22; fi


# Set working directory
WORKDIR /var/www/blog-ms

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    wget \
    build-base \
    g++ \
    libstdc++ \
    python3 \
    openssl

# Create node user and set permissions
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install dependencies first
COPY package*.json ./
RUN yarn install --no-lockfile

# Copy the rest of the code
COPY . .

# Set proper permissions
RUN chown -R appuser:appgroup /var/www/blog-ms

# Switch to non-root user
USER appuser

# Expose development port
EXPOSE 4004

# Set environment to development
ENV NODE_ENV=development

# Development command with hot reload
CMD ["yarn", "start:dev"]