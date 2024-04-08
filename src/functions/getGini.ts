/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/**
 * Returns gini from latest year value
 * @param "gini" : { "20XX" : YY }
 * @returns "YY %" if found
 * @returns "-" if no gini data
 */
export const giniToString = (gini?: Record<string, number>): string => {
  if (!gini) return '-';
  const latestYear = Object.keys(gini)[0] as string;
  const value = gini[latestYear] ?? 0;
  return `${value.toString()} %`;
};

/** Format gini to sort */
export const formatGini = (gini?: Record<string, number>): number => {
  if (!gini) return 0;

  const key = Object.keys(gini)[0];
  if (!key) return 0;
  return gini[key] as number;
};
