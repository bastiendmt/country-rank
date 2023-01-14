import { TranslationType } from '../types/types';

const translationsContent: {
  eng: TranslationType;
  fra: TranslationType;
  [key: string]: TranslationType;
} = {
  eng: {
    country: {
      area: 'Area',
      capital: 'Capital',
      currencies: 'Currencies',
      details: 'Details',
      gini: 'Gini',
      languages: 'Languages',
      nativeName: 'Native name',
      neighbouringCountries: 'Neihbouring Countries',
      noNeighbors: 'No neighbors',
      population: 'Population',
      subregion: 'Subregion',
    },
    filter: 'Filter by name, Region or SubRegion',
    foundCountries: 'countries found',
    giniDefinition:
      'The Gini coefficient measures the inequality among values of a frequency distribution (for example, levels of income). A Gini coefficient of zero expresses perfect equality, where all values.',
    randomCountry: 'Random country',
    sort: {
      area: 'Area',
      gini: 'Gini',
      name: 'Name',
      population: 'Population',
    },
    switchLanguage: 'Switch language',
    switchTheme: 'Change theme',
  },
  fra: {
    country: {
      area: 'Superficie',
      capital: 'Capitale',
      currencies: 'Devises',
      details: 'Détails',
      gini: 'Gini',
      languages: 'Languages',
      nativeName: 'Nom natif',
      neighbouringCountries: 'Pays voisins',
      noNeighbors: 'Aucun voisin',
      population: 'Population',
      subregion: 'Continent',
    },
    filter: 'Filtrer par nom ou par continent',
    foundCountries: 'pays trouvés',
    giniDefinition: `Le coefficient de Gini, ou indice de Gini, est une mesure statistique permettant de rendre compte de la répartition d'une variable (salaire, revenus, patrimoine) au sein d'une population. Autrement dit, il mesure le niveau d'inégalité de la répartition d'une variable dans la population.`,
    randomCountry: 'Pays aléatoire',
    sort: {
      area: 'Superficie',
      gini: 'Gini',
      name: 'Nom',
      population: 'Population',
    },
    switchLanguage: 'Changer de langue',
    switchTheme: 'Changer de thème',
  },
};

export default translationsContent;
