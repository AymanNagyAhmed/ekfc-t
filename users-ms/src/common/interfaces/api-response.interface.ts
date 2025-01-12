import { HTTP_STATUS } from '@/common/constants/api.constants';
import { User } from '@/modules/users/schemas/user.schema';

/**
 * Interface for successful API responses
 */
export interface ApiSuccessResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  path: string;
  timestamp: Date;
}

/**
 * Interface for error API responses
 */
export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  path: string;
  timestamp: Date;
  errors?: Record<string, string[]>;
}

export interface LoginResponse {
  user: User;
  access_token: string;
}

export interface TokenPayload {
  userId: string;
}
/**
 * Union type for all API responses
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse; 