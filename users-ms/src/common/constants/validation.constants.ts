/**
 * Regular expression for validating email addresses
 * Follows RFC 5322 Official Standard
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Regular expression for validating phone numbers
 * Supports international format with optional country code
 */
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

/**
 * Password validation requirements
 */
export const PASSWORD_VALIDATION = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 50,
  REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  MESSAGE: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
} as const;

/**
 * Name validation requirements
 */
export const NAME_VALIDATION = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 50,
  REGEX: /^[a-zA-Z\s-']+$/,
  MESSAGE: 'Name can only contain letters, spaces, hyphens and apostrophes',
} as const;

/**
 * Image validation requirements
 */
export const IMAGE_VALIDATION = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  MAX_COUNT: 5,
  MESSAGE: 'Image must be less than 5MB and in JPG, PNG or GIF format',
} as const;

/**
 * General validation messages
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_PASSWORD: PASSWORD_VALIDATION.MESSAGE,
  INVALID_NAME: NAME_VALIDATION.MESSAGE,
  INVALID_IMAGE: IMAGE_VALIDATION.MESSAGE,
} as const; 