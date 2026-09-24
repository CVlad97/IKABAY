export const MARINE_SUPPLIERS = [
  {
    id: 'osculati',
    name: 'Osculati',
    country: 'Italie',
    role: 'Catalogue multi-références nautiques',
    categories: ['Accastillage', 'Listons', 'Hublots', 'Échelles', 'Taquets', 'Loquets', 'Porte-gobelets'],
    integration: 'catalogue/b2b',
    status: 'catalogue-public',
    url: 'https://www.osculati.com/',
    catalogueUrl: 'https://www.osculati.com/page/catalogues',
    note: 'Catalogue public disponible ; accès API public non identifié. Prévoir flux revendeur, CSV/XML ou import catalogue autorisé.'
  },
  {
    id: 'svb',
    name: 'SVB',
    country: 'Allemagne',
    role: 'Distributeur nautique Europe',
    categories: ['Compas', 'Navigation', 'Accastillage', 'Équipement bateau'],
    integration: 'catalogue/deeplink',
    status: 'catalogue-public',
    url: 'https://www.svb24.com/',
    catalogueUrl: 'https://www.svb24.com/',
    note: 'Catalogue public ; flux/API marchand public non identifié. Import revendeur ou liens directs à privilégier.'
  },
  {
    id: 'mantus',
    name: 'Mantus Marine',
    country: 'USA',
    role: 'Ancrage & mouillage premium',
    categories: ['Ancres', 'Daviers', 'Mouillage', 'Sécurité'],
    integration: 'dealer',
    status: 'dealer-public',
    url: 'https://www.mantusmarine.com/',
    catalogueUrl: 'https://www.mantusmarine.com/distributors/',
    note: 'Programme revendeur public. À contacter pour conditions pro, tarif dealer et éventuel feed catalogue.'
  },
  {
    id: 'quick',
    name: 'Quick Nautical',
    country: 'Italie / USA',
    role: 'Guindeaux, propulsion, ancrage, éclairage',
    categories: ['Daviers', 'Guindeaux', 'Électricité', 'Éclairage'],
    integration: 'dealer/catalogue',
    status: 'catalogue-public',
    url: 'https://www.quickitaly.com/',
    catalogueUrl: 'https://www.quickusa.com/en/catalogue/',
    note: 'Catalogues et réseau distributeurs publics. API publique non identifiée.'
  },
  {
    id: 'integrity',
    name: 'Integrity Marine',
    country: 'USA',
    role: 'Rub rail / listons / profilés',
    categories: ['Listons', 'Liserets', 'Profilés', 'Inserts'],
    integration: 'catalogue/rfq',
    status: 'catalogue-public',
    url: 'https://www.integritymarinecorp.com/',
    catalogueUrl: 'https://www.integritymarinecorp.com/all-inventory',
    note: 'Inventaire public détaillé ; idéal pour RFQ et import structuré après accord fournisseur.'
  },
  {
    id: 'alastin',
    name: 'Alastin Marine',
    country: 'Chine',
    role: 'Fabricant / grossiste marine hardware',
    categories: ['Ancres', 'Chaînes', 'Taquets', 'Échelles', 'Porte-cannes', 'Bimini', 'Accastillage'],
    integration: 'wholesale/catalogue',
    status: 'wholesale-public',
    url: 'https://www.alastinmarine.com/',
    catalogueUrl: 'https://www.alastinmarine.com/marine-parts-accessories/',
    note: 'Le fabricant annonce plus de 20 000 références. À négocier : catalogue exportable, tarifs grossiste, MOQ, personnalisation et éventuelle marque propre.'
  },
  {
    id: 'five-oceans',
    name: 'Five Oceans',
    country: 'USA',
    role: 'Accessoires & équipements nautiques',
    categories: ['Échelles', 'Sécurité', 'Accastillage', 'Équipement'],
    integration: 'catalogue/rfq',
    status: 'a-qualifier',
    url: 'https://www.five-oceans.com/',
    catalogueUrl: 'https://www.five-oceans.com/',
    note: 'Références déjà étudiées dans le dossier Joël. Conditions revendeur/feed à qualifier.'
  },
  {
    id: 'ritchie',
    name: 'Ritchie Navigation',
    country: 'USA',
    role: 'Compas marins',
    categories: ['Compas', 'Navigation'],
    integration: 'dealer/rfq',
    status: 'a-qualifier',
    url: 'https://www.ritchienavigation.com/',
    catalogueUrl: 'https://www.ritchienavigation.com/',
    note: 'Marque de compas déjà identifiée dans le sourcing. Conditions pro à qualifier.'
  },
  {
    id: 'pompanette-bomar',
    name: 'Pompanette / Bomar',
    country: 'USA',
    role: 'Hublots, trappes & équipements',
    categories: ['Hublots', 'Trappes', 'Pont'],
    integration: 'catalogue/rfq',
    status: 'a-qualifier',
    url: 'https://www.pompanette.com/',
    catalogueUrl: 'https://www.pompanette.com/',
    note: 'Références hublots/trappes issues du sourcing Joël. Feed/API à qualifier.'
  },
  {
    id: 'marine-town',
    name: 'Marine Town',
    country: 'International',
    role: 'Quincaillerie marine',
    categories: ['Loquets', 'Charnières', 'Quincaillerie'],
    integration: 'catalogue/rfq',
    status: 'a-qualifier',
    url: 'https://www.marinetown.com/',
    catalogueUrl: 'https://www.marinetown.com/',
    note: 'Références quincaillerie déjà identifiées ; conditions B2B à qualifier.'
  }
];

export const MARINE_FOCUS_CATEGORIES = [
  'Compas & navigation', 'Listons & liserets', 'Hublots & trappes', 'Sièges & bolsters',
  'Daviers & ancrage', 'Échelles', 'Taquets', 'Porte-gobelets', 'Loquets & charnières',
  'Électricité marine', 'Sécurité', 'Pêche & porte-cannes'
];
