import { Country } from "../types/types";

const giniToString = (object: Country): String => {
  if (!object.gini) return "-";

  return object.gini[Object.keys(object.gini)[0]] + " %";
};

// Get gini from lastest year. If no value returns 0
export const formatGini = (gini: any): number => {
  if (!gini) return 0;

  if (gini) {
    const key = Object.keys(gini)[0];
    return gini[key];
  }

  return 0;
};

export default giniToString;

// Returns gini from lastest year value
// "gini" : { "20XX" : YY }
// returns "YY %" if found
// returns "-" if no gini data
