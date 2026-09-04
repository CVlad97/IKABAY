// IKABAY Dropshipping — données de démonstration (fallback)
// Ces données ne sont jamais une preuve de stock ou de prix en temps réel.

export const DROPSHIPPING_INTEGRATIONS = [
  {
    id: 'cj',
    name: 'CJ Dropshipping',
    status: 'à-configurer',
    mode: 'API officielle',
    docsUrl: 'https://developers.cjdropshipping.com/en/api/introduction.html',
    note: 'Le meilleur premier candidat pour catalogue, commandes, logistique et suivi via API.',
    requiredSecret: 'CJ_ACCESS_TOKEN'
  },
  {
    id: 'zendrop',
    name: 'Zendrop',
    status: 'non-connecté',
    mode: 'Plateformes prises en charge',
    docsUrl: 'https://support.zendrop.com/en/articles/8176418-zendrop-e-commerce-platform-integrations',
    note: 'Zendrop documente Shopify, TikTok Shop US, ClickFunnels et Wix. Ikabay devra passer par une plateforme prise en charge ou un accès API confirmé.',
    requiredSecret: 'Accès Zendrop/API à confirmer'
  },
  {
    id: 'autods',
    name: 'AutoDS',
    status: 'non-connecté',
    mode: 'API avec accès requis',
    docsUrl: 'https://help.autods.com/en/articles/12699964-autods-api-feature-automate-product-imports-orders-and-sourcing',
    note: 'L’automatisation personnalisée exige l’accès API AutoDS et un backend sécurisé.',
    requiredSecret: 'AUTODS_API_KEY'
  }
];

export const DROPSHIPPING_SOURCES = [
  {
    id: 'ds-ae',
    name: 'AliExpress',
    type: 'api',
    marginPercent: 20,
    feePercent: 2,
    currency: 'EUR',
    status: 'en-test',
    avgDelayDays: 15,
    logoUrl: null,
    notes: 'Gros catalogue. API via AliExpress Affiliate.'
  },
  {
    id: 'ds-cj',
    name: 'CJ Dropshipping',
    type: 'api',
    marginPercent: 18,
    feePercent: 0,
    currency: 'EUR',
    status: 'en-test',
    avgDelayDays: 10,
    logoUrl: null,
    notes: 'Spécialisé dropshipping. MOQ 1. Pas d\'abonnement.'
  },
  {
    id: 'ds-1688',
    name: 'Alibaba 1688',
    type: 'scraped',
    marginPercent: 25,
    feePercent: 0,
    currency: 'USD',
    status: 'en-test',
    avgDelayDays: 25,
    logoUrl: null,
    notes: 'Fabricants directs. Prix les + bas. MOQ plus élevé.'
  },
  {
    id: 'ds-eu',
    name: 'Grossistes Europe',
    type: 'csv-import',
    marginPercent: 15,
    feePercent: 0,
    currency: 'EUR',
    status: 'en-test',
    avgDelayDays: 7,
    logoUrl: null,
    notes: 'Fournisseurs Europe. Livraison DOM rapide.'
  },
  {
    id: 'ds-local',
    name: 'Fournisseurs Locaux',
    type: 'manual',
    marginPercent: 12,
    feePercent: 0,
    currency: 'EUR',
    status: 'actif',
