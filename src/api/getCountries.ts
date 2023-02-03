import { API_URL } from '@/config';
import { Countries } from '@/types/types';

export async function getCountries(): Promise<Countries | undefined> {
  const res = await fetch(`${API_URL}/all`);
  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }
  return res.json();
}
