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

/** Latest gini value to sort on, `undefined` when the country has no data */
export const formatGini = (
  gini?: Record<string, number>,
): number | undefined => {
  if (!gini) return undefined;

  const key = Object.keys(gini)[0];
  if (!key) return undefined;
  return gini[key];
};
