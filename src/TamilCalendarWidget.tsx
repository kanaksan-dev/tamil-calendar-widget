import React, { useState, useEffect, useCallback } from "react";
import { TamilCalendarWidgetProps } from "./types";
import { imageCache } from "./cache";
import { isValidDateFormat, buildApiUrl, getErrorMessage } from "./utils";
import "./TamilCalendarWidget.css";

const TamilCalendarWidget: React.FC<TamilCalendarWidgetProps> = ({
  apiUrl,
  date,
  width = 400,
  height,
  alt = "Tamil Daily Calendar",
  className = "",
  style = {},
  onLoad,
  onError,
  showLoader = true,
  loaderComponent,
  errorComponent,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendarImage = useCallback(
    async (apiUrl: string, date: string) => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first
        const cachedUrl = imageCache.getCachedImage(apiUrl, date);
        if (cachedUrl) {
          setImageUrl(cachedUrl);
          setLoading(false);
          onLoad?.();
          return;
        }

        // Build the complete API URL
        const fullApiUrl = buildApiUrl(apiUrl, date);

        // Fetch image from API
        const response = await fetch(fullApiUrl, {
          method: "GET",
          headers: {
            Accept: "image/jpeg, image/png, image/*",
          },
        });

        if (!response.ok) {
          const error = new Error(
            `HTTP ${response.status}: ${response.statusText}`
          );
          (error as any).status = response.status;
          throw error;
        }

        // Get the image as blob
        const blob = await response.blob();

        // Verify it's an image
        if (!blob.type.startsWith("image/")) {
          throw new Error("Invalid response: Expected image data");
        }

        // Create blob URL
        const blobUrl = URL.createObjectURL(blob);

        // Cache the image
        imageCache.setCachedImage(apiUrl, date, blobUrl);

        setImageUrl(blobUrl);
        onLoad?.();
      } catch (err: any) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        onError?.(new Error(errorMessage));
      } finally {
        setLoading(false);
      }
    },
    [onLoad, onError]
  );

  useEffect(() => {
    // Validate inputs
    if (!apiUrl) {
      setError("API URL is required");
      return;
    }

    if (!date) {
      setError("Date is required");
      return;
    }

    if (!isValidDateFormat(date)) {
      setError("Invalid date format. Please use YYYY-MM-DD format");
      return;
    }

    // Reset state and fetch image
    setImageUrl(null);
    setError(null);
    fetchCalendarImage(apiUrl, date);

    // Cleanup function to revoke blob URL when component unmounts or deps change
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [apiUrl, date, fetchCalendarImage]); // Note: imageUrl is intentionally not in deps

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const containerStyle: React.CSSProperties = {
    width: width,
    height: height || "auto",
    ...style,
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: height ? "100%" : "auto",
    objectFit: height ? "contain" : "initial",
    display: "block",
  };

  if (loading && showLoader) {
    return (
      <div
        className={`tamil-calendar-widget tamil-calendar-loading ${className}`}
        style={containerStyle}
      >
        {loaderComponent || (
          <div className="tamil-calendar-loader">
            <div className="tamil-calendar-spinner"></div>
            <p>Loading Tamil Calendar...</p>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`tamil-calendar-widget tamil-calendar-error ${className}`}
        style={containerStyle}
      >
        {errorComponent || (
          <div className="tamil-calendar-error-content">
            <div className="tamil-calendar-error-icon">⚠️</div>
            <p className="tamil-calendar-error-message">{error}</p>
          </div>
        )}
      </div>
    );
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <div
      className={`tamil-calendar-widget ${className}`}
      style={containerStyle}
    >
      <img
        src={imageUrl}
        alt={alt}
        style={imageStyle}
        onLoad={() => onLoad?.()}
        onError={() => {
          const errorMsg = "Failed to display calendar image";
          setError(errorMsg);
          onError?.(new Error(errorMsg));
        }}
      />
    </div>
  );
};

export default TamilCalendarWidget;
