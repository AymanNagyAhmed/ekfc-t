import { Document } from 'mongoose';

/**
 * Interface representing a User document in MongoDB
 * Extends Document to include Mongoose document methods
 */
export interface User extends Document {
  /**
   * User's first name (optional)
   */
  firstName?: string | null;

  /**
   * User's last name (optional)
   */
  lastName?: string | null;

  /**
   * User's email address (required, unique)
   */
  email: string;

  /**
   * User's hashed password (required)
   */
  password: string;

  /**
   * Flag indicating if email is verified
   * @default false
   */
  isEmailVerified: boolean;

  /**
   * User's role in the system
   * @default 'user'
   */
  role: string;

  /**
   * User's phone number (optional, unique if provided)
   */
  phoneNumber?: string;

  /**
   * Flag indicating if the user account is active
   * @default true
   */
  isActive: boolean;

  /**
   * Timestamp when the document was created
   */
  createdAt: Date;

  /**
   * Timestamp when the document was last updated
   */
  updatedAt: Date;

  /**
   * Virtual property that returns the full name
   * Combines firstName and lastName, returns 'Anonymous User' if both are null
   */
  readonly fullName: string;
}
