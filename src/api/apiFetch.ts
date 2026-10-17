import 'server-only';
import { API_URL } from '@/api/url';

/**
 * fetch wrapper for the REST Countries API that adds the Bearer API key.
 * Server-only: the key must never reach the browser bundle.
 * @param {string} path - path relative to API_URL, e.g. `/alpha/fra`
 */
export function apiFetch(
  path: string,
  init: NonNullable<Parameters<typeof fetch>[1]> = {},
) {
  const apiKey = process.env.RESTCOUNTRIES_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESTCOUNTRIES_API_KEY environment variable');
  }

  return fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${apiKey}` },
  });
}
