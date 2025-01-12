import { UnauthorizedException } from '@nestjs/common';

/**
 * Utility class for time-related operations
 */
export class TimeUtil {
  /**
   * Converts duration string (1d, 1h, 1m, 1s) to seconds
   * @param duration Duration string (e.g., "1d", "2h", "30m", "45s")
   * @returns number of seconds
   * @throws UnauthorizedException if duration format is invalid
   */
  static parseDurationToSeconds(duration: string): number {
    const match = duration.match(/^(\d+)([dhms])$/);
    if (!match) {
      throw new UnauthorizedException('Invalid duration format');
    }

    const [, value, unit] = match;
    const numValue = parseInt(value, 10);

    switch (unit) {
      case 'd':
        return numValue * 24 * 60 * 60;
      case 'h':
        return numValue * 60 * 60;
      case 'm':
        return numValue * 60;
      case 's':
        return numValue;
      default:
        throw new UnauthorizedException('Invalid duration unit');
    }
  }
} 