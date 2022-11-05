import { TranslationType } from '../types/types';

const translations: {
  eng: TranslationType;
  fra: TranslationType;
  [key: string]: TranslationType;
} = {
  eng: {
    randomCountry: 'Random country',
    switchTheme: 'Change theme',
    switchLanguage: 'Switch language',
    filter: 'Filter by name, Region or SubRegion',
    foundCountries: 'countries found',
    giniDefinition:
      'The Gini coefficient measures the inequality among values of a frequency distribution (for example, levels of income). A Gini coefficient of zero expresses perfect equality, where all values.',
    sort: {
      name: 'Name',
      population: 'Population',
      area: 'Area',
      gini: 'Gini',
    },
    country: {
      details: 'Details',
      capital: 'Capital',
      subregion: 'Subregion',
      languages: 'Languages',
      currencies: 'Currencies',
      nativeName: 'Native name',
      gini: 'Gini',
      neighbouringCountries: 'Neihbouring Countries',
      noNeighbors: 'No neighbors',
      population: 'Population',
      area: 'Area',
    },
  },
  fra: {
    randomCountry: 'Pays aléatoire',
    switchTheme: 'Changer de thème',
    switchLanguage: 'Changer de langue',
    filter: 'Filtrer par nom ou par continent',
    foundCountries: 'pays trouvés',
    giniDefinition: `Le coefficient de Gini, ou indice de Gini, est une mesure statistique permettant de rendre compte de la répartition d'une variable (salaire, revenus, patrimoine) au sein d'une population. Autrement dit, il mesure le niveau d'inégalité de la répartition d'une variable dans la population.`,
    sort: {
      name: 'Nom',
      population: 'Population',
      area: 'Superficie',
      gini: 'Gini',
    },
    country: {
      details: 'Détails',
      capital: 'Capitale',
      subregion: 'Continent',
      languages: 'Languages',
      currencies: 'Devises',
      nativeName: 'Nom natif',
      gini: 'Gini',
      neighbouringCountries: 'Pays voisins',
      noNeighbors: 'Aucun voisin',
      population: 'Population',
      area: 'Superficie',
    },
  },
};

export default translations;
