import { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '@/common/interfaces/api-response.interface';
import { HTTP_STATUS } from '@/common/constants/api.constants';

/**
 * Utility class for creating standardized API responses
 */
export class ApiResponseUtil {
    /**
     * Creates a success response object following the API response format
     * @param data Response data
     * @param message Success message
     * @param path Request path
     * @param statusCode HTTP status code (defaults to 200)
     */
    static success<T>(
        data: T,
        message: string,
        path: string,
        statusCode: number = HTTP_STATUS.OK,
    ): ApiSuccessResponse<T> {
        return {
            success: true,
            statusCode,
            message,
            path,
            timestamp: new Date(),
            data,
        };
    }

    /**
     * Creates an error response object following the API response format
     * @param message Error message
     * @param path Request path
     * @param statusCode HTTP status code
     * @param errors Optional validation errors
     */
    static error(
        message: string,
        path: string,
        statusCode: number,
        errors?: Record<string, string[]>,
    ): ApiErrorResponse {
        return {
            success: false,
            statusCode,
            message,
            path,
            timestamp: new Date(),
            errors,
        };
    }
} 