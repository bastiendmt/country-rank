import { Country } from "../types/types";

const getGini = (object: Country): String => {
  if (!object.gini) return "-";

  return object.gini[Object.keys(object.gini)[0]] + " %";
};

export default getGini;

// Returns gini from lastest year value
// "gini" : { "20XX" : YY }
// returns "YY %" if found
// returns "-" if no gini data
