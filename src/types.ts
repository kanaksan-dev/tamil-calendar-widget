export interface TamilCalendarWidgetProps {
    /**
     * Complete API URL with authentication token
     * Example: "https://api.tamilcalendar.com/v1/daily-sheet?token=abc123"
     */
    apiUrl: string;
    
    /**
     * Date in YYYY-MM-DD format
     * Example: "2025-07-12"
     */
    date: string;
    
    /**
     * Image width in pixels
     * @default 400
     */
    width?: number;
    
    /**
     * Image height in pixels (if not provided, maintains aspect ratio)
     */
    height?: number;
    
    /**
     * Alt text for the calendar image
     * @default "Tamil Daily Calendar"
     */
    alt?: string;
    
    /**
     * Additional CSS class name
     */
    className?: string;
    
    /**
     * Inline styles for the container
     */
    style?: React.CSSProperties;
    
    /**
     * Callback fired when image loads successfully
     */
    onLoad?: () => void;
    
    /**
     * Callback fired when image fails to load
     */
    onError?: (error: Error) => void;
    
    /**
     * Show loading indicator while fetching
     * @default true
     */
    showLoader?: boolean;
    
    /**
     * Custom loading component
     */
    loaderComponent?: React.ReactNode;
    
    /**
     * Custom error component
     */
    errorComponent?: React.ReactNode;
  }
  
  export interface CacheEntry {
    url: string;
    timestamp: number;
    expiresAt: number;
  }
  