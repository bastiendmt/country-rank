/**
 * Returns gini from latest year value
 * @param "gini" : { "20XX" : YY }
 * @returns "YY %" if found
 * @returns "-" if no gini data
 */
export const giniToString = (gini?: { [key: string]: number }): string => {
  if (!gini) return '-';
  const latestYear = Object.keys(gini)[0] as string;
  const value = gini[latestYear] as number;
  return `${value} %`;
};

/** Format gini to sort */
export const formatGini = (gini?: { [key: string]: number }): number => {
  if (!gini) return 0;

  if (gini) {
    const key = Object.keys(gini)[0];
    if (!key) return 0;
    return gini[key] as number;
  }

  return 0;
};
