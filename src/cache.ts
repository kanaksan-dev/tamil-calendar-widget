interface ImageCache {
    [key: string]: {
      url: string;
      timestamp: number;
      expiresAt: number;
    };
  }
  
  class ImageCacheManager {
    private cache: ImageCache = {};
    private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
    /**
     * Generate cache key from API URL and date
     */
    private getCacheKey(apiUrl: string, date: string): string {
      return `${apiUrl}_${date}`;
    }
  
    /**
     * Get cached image URL if available and not expired
     */
    getCachedImage(apiUrl: string, date: string): string | null {
      const key = this.getCacheKey(apiUrl, date);
      const cached = this.cache[key];
      
      if (!cached) {
        return null;
      }
  
      // Check if expired
      if (Date.now() > cached.expiresAt) {
        this.removeCachedImage(apiUrl, date);
        return null;
      }
  
      return cached.url;
    }
  
    /**
     * Cache image URL with expiration
     */
    setCachedImage(apiUrl: string, date: string, imageUrl: string): void {
      const key = this.getCacheKey(apiUrl, date);
      this.cache[key] = {
        url: imageUrl,
        timestamp: Date.now(),
        expiresAt: Date.now() + this.CACHE_DURATION
      };
    }
  
    /**
     * Remove specific cached image and revoke blob URL
     */
    removeCachedImage(apiUrl: string, date: string): void {
      const key = this.getCacheKey(apiUrl, date);
      const cached = this.cache[key];
      
      if (cached) {
        // Revoke blob URL to free memory
        URL.revokeObjectURL(cached.url);
        delete this.cache[key];
      }
    }
  
    /**
     * Clear all cached images and revoke blob URLs
     */
    clearCache(): void {
      Object.values(this.cache).forEach(cached => {
        URL.revokeObjectURL(cached.url);
      });
      this.cache = {};
    }
  
    /**
     * Clean up expired entries
     */
    cleanupExpired(): void {
      const now = Date.now();
      Object.keys(this.cache).forEach(key => {
        if (this.cache[key].expiresAt < now) {
          URL.revokeObjectURL(this.cache[key].url);
          delete this.cache[key];
        }
      });
    }
  }
  
  // Singleton instance
  export const imageCache = new ImageCacheManager();
  