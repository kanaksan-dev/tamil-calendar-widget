# Tamil Calendar Widget

A beautiful, lightweight React component for displaying Tamil daily calendar sheets as images.

## Features

🎯 **Simple Integration** - Just one prop for API URL and date  
🚀 **Smart Caching** - Automatic image caching to minimize API calls  
⚡ **Fast Loading** - Optimized blob URL handling for better performance  
🛡️ **Error Handling** - Comprehensive error states with meaningful messages  
📱 **Responsive** - Works on all screen sizes  
🎨 **Customizable** - Easy styling with CSS classes and inline styles  
📦 **Lightweight** - Minimal bundle size with zero dependencies  
🔒 **TypeScript** - Full TypeScript support with detailed type definitions  

## Installation

```bash
npm install @kanaksan/tamil-calendar-widget
```

## Quick Start

```jsx
import React from 'react';
import { TamilCalendarWidget } from '@kanaksan/tamil-calendar-widget';

function App() {
  return (
    <div>
      <h1>Tamil Calendar</h1>
      <TamilCalendarWidget 
        apiUrl="<api-url>"
        date="2025-02-22"
        width={400}
      />
    </div>
  );
}
```

## Getting API Access

To use this widget, you need access to the Tamil Calendar API:

📧 **Contact**: helpdesk@kanaksan.com  
🌐 **Website**: https://tamilcalendarwidget.netlify.app/

### API Access Tiers:
- **Free Tier**: 100 requests/day
- **Pro Tier**: 1000 requests/day + historical data  
- **Enterprise**: Unlimited + custom features

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `apiUrl` | `string` | ✅ | - | Complete API URL with authentication |
| `date` | `string` | ✅ | - | Date in YYYY-MM-DD format |
| `width` | `number` | ❌ | `400` | Image width in pixels |
| `height` | `number` | ❌ | `auto` | Image height in pixels |
| `alt` | `string` | ❌ | `"Tamil Daily Calendar"` | Alt text for accessibility |
| `className` | `string` | ❌ | `""` | Additional CSS class |
| `style` | `CSSProperties` | ❌ | `{}` | Inline styles for container |
| `onLoad` | `function` | ❌ | - | Callback when image loads |
| `onError` | `function` | ❌ | - | Callback when error occurs |
| `showLoader` | `boolean` | ❌ | `true` | Show loading indicator |
| `loaderComponent` | `ReactNode` | ❌ | - | Custom loading component |
| `errorComponent` | `ReactNode` | ❌ | - | Custom error component |

## Advanced Usage

### Custom Styling
```jsx
<TamilCalendarWidget 
  apiUrl="https://api.example.com/calendar?token=abc123"
  date="2025-02-22"
  className="my-calendar"
  style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
/>
```

### Error Handling
```jsx
<TamilCalendarWidget 
  apiUrl="https://api.example.com/calendar?token=abc123"
  date="2025-02-22"
  onLoad={() => console.log('Calendar loaded successfully')}
  onError={(error) => console.error('Failed to load:', error.message)}
/>
```

### Custom Loading and Error Components
```jsx
<TamilCalendarWidget 
  apiUrl="https://api.example.com/calendar?token=abc123"
  date="2025-02-22"
  loaderComponent={<div>🔄 Loading your Tamil calendar...</div>}
  errorComponent={<div>❌ Calendar unavailable</div>}
/>
```

## Caching

The widget automatically caches images for 24 hours to improve performance and reduce API calls. You can access the cache manager:

```jsx
import { imageCache } from '@kanaksan/tamil-calendar-widget';

// Clear all cached images
imageCache.clearCache();

// Clean up expired entries
imageCache.cleanupExpired();
```

## Error Messages

The component provides user-friendly error messages for common scenarios:

- **Network issues**: "Network error: Unable to connect to the calendar service"
- **Authentication**: "Authentication failed: Invalid API key or token"
- **Not found**: "Calendar not found: No calendar available for the selected date"
- **Rate limiting**: "Rate limit exceeded: Too many requests"
- **Server errors**: "Server error: The calendar service is temporarily unavailable"

## TypeScript Support

Full TypeScript definitions included:

```typescript
import { TamilCalendarWidget, TamilCalendarWidgetProps } from '@kanaksan/tamil-calendar-widget';

const props: TamilCalendarWidgetProps = {
  apiUrl: "https://api.example.com/calendar?token=abc123",
  date: "2025-02-22",
  width: 500,
  onLoad: () => console.log('Loaded!')
};
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

MIT © calendar.kanaksan.com

---

For API access and support, please contact: helpdesk@kanaksan.com