import 'server-only';

/**
 * fetch wrapper for the REST Countries API that adds the Bearer API key.
 * Server-only: the key must never reach the browser bundle.
 * @param {string} path - path relative to RESTCOUNTRIES_API_URL, e.g. `?limit=100`
 */
export function apiFetch(
  path: string,
  init: NonNullable<Parameters<typeof fetch>[1]> = {},
) {
  const apiUrl = process.env.RESTCOUNTRIES_API_URL;
  const apiKey = process.env.RESTCOUNTRIES_API_KEY;
  if (!apiUrl || !apiKey) {
    throw new Error(
      'Missing RESTCOUNTRIES_API_URL or RESTCOUNTRIES_API_KEY environment variable',
    );
  }

  return fetch(`${apiUrl}${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${apiKey}` },
  });
}
