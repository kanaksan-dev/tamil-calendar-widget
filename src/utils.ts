/**
 * Validate date format (YYYY-MM-DD)
 */
export const isValidDateFormat = (date: string): boolean => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return false;
    }
    
    // Check if it's a valid date
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
  };
  
  /**
   * Build the complete API URL with date
   */
  export const buildApiUrl = (apiUrl: string, date: string): string => {
    // Remove trailing slash if present
    const cleanApiUrl = apiUrl.replace(/\/$/, '');
    
    // Check if the URL already contains the daily-sheet endpoint
    if (cleanApiUrl.includes('/daily-sheet')) {
      return `${cleanApiUrl}/${date}`;
    }
    
    // Assume the URL needs the full endpoint appended
    return `${cleanApiUrl}/api/calendar/daily-sheet/${date}`;
  };
  
  /**
   * Get error message for different error types
   */
  export const getErrorMessage = (error: any): string => {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return 'Network error: Unable to connect to the calendar service. Please check your internet connection.';
    }
    
    if (error.status) {
      switch (error.status) {
        case 401:
          return 'Authentication failed: Invalid API key or token. Please contact support for a valid API URL.';
        case 403:
          return 'Access denied: Your API key does not have permission to access this resource.';
        case 404:
          return 'Calendar not found: No calendar available for the selected date.';
        case 429:
          return 'Rate limit exceeded: Too many requests. Please try again later.';
        case 500:
          return 'Server error: The calendar service is temporarily unavailable. Please try again later.';
        default:
          return `Error ${error.status}: Unable to load calendar. Please try again.`;
      }
    }
    
    return 'Unable to load Tamil calendar. Please check your API URL and try again.';
  };