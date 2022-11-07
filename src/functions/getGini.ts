import { Country } from '../types/types';

/**
 * Returns gini from lastest year value
 * @param "gini" : { "20XX" : YY }
 * @returns "YY %" if found
 * @returns "-" if no gini data
 */
export const giniToString = (object: Country): string => {
  if (!object.gini) return '-';

  return `${object.gini[Object.keys(object.gini)[0]]} %`;
};

// Get gini from latest year. If no value returns 0
export const formatGini = (gini?: { [key: string]: number }): number => {
  if (!gini) return 0;

  if (gini) {
    const key = Object.keys(gini)[0];
    return gini[key];
  }

  return 0;
};
