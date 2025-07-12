import React, { useState } from 'react';
import { TamilCalendarWidget } from '../src';

function App() {
  const [apiUrl, setApiUrl] = useState('http://localhost:8082');
  const [date, setDate] = useState('2025-07-12');
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState<number | undefined>(undefined);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleLoadSuccess = () => {
    console.log('✅ Calendar loaded successfully!');
  };

  const handleLoadError = (error: Error) => {
    console.error('❌ Calendar failed to load:', error.message);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🗓️ Tamil Calendar Widget Test</h1>
      
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Configuration</h2>
        
        <div style={{ display: 'grid', gap: '15px', maxWidth: '500px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              API Base URL:
            </label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              placeholder="http://localhost:8082"
            />
            <small style={{ color: '#666' }}>
              The Spring Boot API base URL (without /api/calendar/daily-sheet)
            </small>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Date:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <small style={{ color: '#666' }}>
              Current date: {today}
            </small>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Width:
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                min="200"
                max="800"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Height (optional):
              </label>
              <input
                type="number"
                value={height || ''}
                onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : undefined)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="Auto"
                min="200"
                max="800"
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>🧪 Test Results</h2>
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          
          {/* Test 1: Basic Widget */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <h3>Test 1: Basic Widget</h3>
            <p><strong>API URL:</strong> {apiUrl}</p>
            <p><strong>Date:</strong> {date}</p>
            <TamilCalendarWidget
              apiUrl={apiUrl}
              date={date}
              width={width}
              height={height}
              onLoad={handleLoadSuccess}
              onError={handleLoadError}
            />
          </div>

          {/* Test 2: Custom Styling */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <h3>Test 2: Custom Styling</h3>
            <p><strong>Custom border and shadow</strong></p>
            <TamilCalendarWidget
              apiUrl={apiUrl}
              date={date}
              width={Math.min(width, 300)}
              className="custom-calendar"
              style={{ 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '2px solid #007bff'
              }}
              onLoad={() => console.log('✅ Custom styled calendar loaded')}
              onError={(error) => console.log('❌ Custom styled calendar error:', error.message)}
            />
          </div>

          {/* Test 3: Error Handling */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <h3>Test 3: Error Handling</h3>
            <p><strong>Invalid API URL (should show error)</strong></p>
            <TamilCalendarWidget
              apiUrl="https://invalid-url-for-testing.com"
              date={date}
              width={Math.min(width, 300)}
              onLoad={() => console.log('✅ This should not happen')}
              onError={(error) => console.log('❌ Expected error:', error.message)}
            />
          </div>

          {/* Test 4: Invalid Date */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <h3>Test 4: Invalid Date Format</h3>
            <p><strong>Bad date format (should show error)</strong></p>
            <TamilCalendarWidget
              apiUrl={apiUrl}
              date="invalid-date"
              width={Math.min(width, 300)}
              onLoad={() => console.log('✅ This should not happen')}
              onError={(error) => console.log('❌ Expected date error:', error.message)}
            />
          </div>

        </div>
      </div>

      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2>📋 Testing Checklist</h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>✅ Widget loads successfully with valid API URL and date</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>✅ Loading spinner appears while fetching</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>✅ Error messages appear for invalid API URL</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>✅ Error messages appear for invalid date format</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>✅ Custom styling works correctly</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>✅ Console shows success/error messages</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>✅ Widget is responsive on different screen sizes</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>✅ Caching works (same date loads faster on second try)</span>
          </label>
        </div>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
        <h2>🚀 Ready to Publish?</h2>
        <p>Once all tests pass, you can publish your package:</p>
        <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`npm run build
npm login
npm publish --access public`}
        </pre>
      </div>
    </div>
  );
}

export default App;
