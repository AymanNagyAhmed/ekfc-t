/**
 * Application-wide constants
 */

// API Configuration
export const API = {
  PREFIX: 'api',
  VERSION: 'v1',
  TIMEOUT: 5000,
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100
  }
} as const;

// Authentication Constants
export const AUTH = {
  JWT: {
    SECRET: process.env.JWT_SECRET || 'your-secret-key',
    EXPIRES_IN: '1d',
    REFRESH_EXPIRES_IN: '7d',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
  },
  STRATEGIES: {
    JWT: 'jwt',
    LOCAL: 'local'
  },
  MESSAGES: {
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_TOKEN: 'Invalid token',
    INVALID_CREDENTIALS: 'Invalid credentials'
  }
} as const;

// Validation Constants
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 20,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20
  },
  EMAIL: {
    PATTERN: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  }
} as const;

// Database Configuration
export const DATABASE = {
  CONNECTION_TIMEOUT: 5000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  POOL: {
    MIN: 5,
    MAX: 10
  }
} as const;

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
} as const;

// Cache Configuration
export const CACHE = {
  TTL: 60 * 60 * 1000, // 1 hour in milliseconds
  MAX: 100 // maximum number of items in cache
} as const;

// File Upload Constants
export const UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  DESTINATION: 'uploads/'
} as const;

// Response Status Messages
export const RESPONSE_MESSAGES = {
  SUCCESS: 'Success',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad request',
  INTERNAL_ERROR: 'Internal server error'
} as const;

// Roles and Permissions
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
} as const;

// Swagger Documentation
export const SWAGGER = {
  TITLE: 'API Documentation',
  DESCRIPTION: 'API documentation for the application',
  VERSION: '1.0',
  TAG: 'api'
} as const;

// Cookie Options
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
} as const;
