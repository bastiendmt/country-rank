# Error Handling in Country Rank

## Overview

This application uses Next.js App Router's built-in error handling with `error.tsx` files.

## Quick Start

Run the test script to see testing instructions:
```bash
./test-error-boundary.sh
```

## Error Boundary Structure

We use a single `error.tsx` file at the root language level (`src/app/[lang]/error.tsx`) which:
- Catches errors from all child routes including the country details page
- Provides a consistent error UI across the application
- Allows users to retry the failed operation

**Why only one error.tsx file?**
- Having `error.tsx` at both `/[lang]/` and `/[lang]/country/[id]/` would be redundant
- The parent-level error boundary already catches errors from all child routes
- This keeps the codebase simpler and more maintainable
- Only create additional error.tsx files if you need different error UIs for specific routes

## How to Test Error Boundaries

### Method 1: Throw an Error in Development

1. **Test in the main page**: Add a temporary error in `src/app/[lang]/page.tsx`:
```tsx
const Index = async ({ params }: PageProps<'/[lang]'>) => {
  throw new Error('Test error on main page');
  // ... rest of the code
};
```

2. **Test in country detail page**: Add a temporary error in `src/app/[lang]/country/[id]/page.tsx`:
```tsx
const Country = async ({ params }: PageProps<'/[lang]/country/[id]'>) => {
  throw new Error('Test error on country page');
  // ... rest of the code
};
```

3. Visit the page in your browser - you should see the error UI
4. Click "Try again" to verify the reset functionality
5. Remove the test error when done

### Method 2: Simulate API Failures

Modify the API calls to simulate failures:

```tsx
// In src/api/getCountries.ts or src/api/getCountry.ts
export async function getCountries() {
  throw new Error('API temporarily unavailable');
  // ... rest of the code
}
```

### Method 3: Test with Invalid Data

1. Navigate to a country page with an invalid ID: `/en/country/INVALID_ID`
2. This should trigger the not-found.tsx, not the error boundary
3. To test the error boundary, make the API throw an error instead of returning null

### Method 4: Use Browser DevTools

1. Open your browser's DevTools
2. Go to Sources tab
3. Set a breakpoint in your component
4. Use the console to throw an error while the component is rendering

## Error vs Not Found

Important distinction:
- **error.tsx**: Catches runtime errors (thrown errors, unhandled promises, etc.)
- **not-found.tsx**: Handles 404 cases (when `notFound()` is called or the route doesn't exist)

In this app:
- Missing countries return the not-found page (via `NotFound()` component)
- API failures or unexpected errors trigger the error boundary

## Testing in Production

For production error monitoring, consider integrating an error tracking service like:
- Sentry
- LogRocket
- Rollbar

These services can be integrated by adding their SDK to the error boundary's useEffect hook.

## Best Practices

1. **Keep error messages user-friendly** - Don't expose technical details to end users
2. **Log errors for debugging** - Use the useEffect hook to send errors to your logging service
3. **Provide recovery options** - The reset button allows users to retry
4. **Use error.digest** - Next.js provides a digest for server-side errors for better tracking
5. **Test regularly** - Periodically test error boundaries to ensure they work as expected
