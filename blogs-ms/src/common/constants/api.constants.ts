export const API = {
  PREFIX: 'api',
  VERSION: 'v1',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const ERROR_MESSAGES = {
  RESOURCE_NOT_FOUND: (resource: string) => `${resource} not found.`,
  RESOURCE_CONFLICT: (resource: string) => `${resource} already exists.`,
  INVALID_INPUT: 'The provided input is invalid.',
  UNAUTHORIZED: 'Unauthorized access.',
  FORBIDDEN: 'Access forbidden.',
  SERVICE_UNAVAILABLE: (service: string) => 
    `${service} is currently unavailable. Please try again later.`,
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
} as const; 