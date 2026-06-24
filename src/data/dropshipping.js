// IKABAY Dropshipping — Données partenaires démo (fallback)
// Utilisé quand Supabase n'est pas configuré

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
    avgDelayDays: 3,
    logoUrl: null,
    notes: 'Partenaires Martinique/Caraïbes. Stock local.'
  },
  {
    id: 'ds-ae-fr',
    name: 'AliExpress FR',
    type: 'api',
    marginPercent: 20,
    feePercent: 2,
    currency: 'EUR',
    status: 'en-test',
    avgDelayDays: 10,
    logoUrl: null,
    notes: 'Certains produits en entrepôt FR/ES.'
  }
];

export const DROPSHIPPING_PRODUCTS = [
  {
    id: 'dp-1',
    sourceId: 'ds-ae',
    nameFr: 'Corne de brume marine 12V',
    nameEn: 'Marine horn 12V',
    sku: 'DS-HORN-001',
    category: 'Sécurité',
    priceWholesale: 5.50,
    shippingCost: 3.50,
    shippingOrigin: 'Chine',
    stockStatus: 'disponible',
    stockQty: 200,
    moq: 1,
    delayDays: 12,
    weightKg: 0.35,
    dimensions: '15x10x8',
    description: 'Corne de brume électrique 12V. Conforme COLREG.',
    tags: ['corne', 'brume', '12v']
  },
  {
    id: 'dp-2',
    sourceId: 'ds-cj',
    nameFr: 'Feu de navigation LED 12V',
    nameEn: 'Navigation light LED 12V',
    sku: 'DS-LIGHT-001',
    category: 'Éclairage',
    priceWholesale: 4.20,
    shippingCost: 2.80,
    shippingOrigin: 'Chine',
    stockStatus: 'disponible',
    stockQty: 150,
    moq: 1,
    delayDays: 8,
    weightKg: 0.20,
    dimensions: '12x6x5',
    description: 'Feu LED étanche. Certifié marine grade.',
    tags: ['led', 'navigation', 'étanche']
  },
  {
    id: 'dp-3',
    sourceId: 'ds-1688',
    nameFr: 'Taquet inox 316 marine 200mm',
    nameEn: 'Marine cleat 316 SS 200mm',
    sku: 'DS-CLEAT-001',
    category: 'Accastillage',
    priceWholesale: 2.10,
    shippingCost: 4.00,
    shippingOrigin: 'Chine',
    stockStatus: 'disponible',
    stockQty: 500,
    moq: 10,
    delayDays: 20,
    weightKg: 0.30,
    dimensions: '20x8x5',
    description: 'Taquet inox 316 poli miroir.',
    tags: ['taquet', 'inox', '316']
  },
  {
    id: 'dp-4',
    sourceId: 'ds-eu',
    nameFr: 'Pare-battage H6 marine grade',
    nameEn: 'Fender H6 marine grade',
    sku: 'DS-FEND-001',
    category: 'Pare-battages',
    priceWholesale: 18.00,
    shippingCost: 5.00,
    shippingOrigin: 'Pays-Bas',
    stockStatus: 'disponible',
    stockQty: 50,
    moq: 1,
    delayDays: 5,
    weightKg: 1.20,
    dimensions: '60x30x30',
    description: 'Pare-battage H6 qualité marine.',
    tags: ['pare-battage', 'h6', 'europe']
  },
  {
    id: 'dp-5',
    sourceId: 'ds-ae-fr',
    nameFr: 'Échelle inox 4 marches marine',
    nameEn: 'SS ladder 4 steps marine',
    sku: 'DS-LADD-001',
    category: 'Accastillage',
    priceWholesale: 35.00,
    shippingCost: 8.00,
    shippingOrigin: 'Chine',
    stockStatus: 'disponible',
    stockQty: 100,
    moq: 1,
    delayDays: 15,
    weightKg: 4.50,
    dimensions: '120x35x10',
    description: 'Échelle de bain inox 304, marches antidérapantes.',
    tags: ['échelle', 'inox', '4 marches']
  },
  {
    id: 'dp-6',
    sourceId: 'ds-local',
    nameFr: 'Bouée de sauvetage complète',
    nameEn: 'Lifebuoy complete',
    sku: 'DS-BUOY-001',
    category: 'Sécurité',
    priceWholesale: 22.00,
    shippingCost: 0,
    shippingOrigin: 'Martinique',
    stockStatus: 'disponible',
    stockQty: 20,
    moq: 1,
    delayDays: 2,
    weightKg: 1.80,
    dimensions: '60x60x15',
    description: 'Bouée avec ligne. Stock local Martinique.',
    tags: ['bouée', 'sauvetage', 'local']
  },
  {
    id: 'dp-7',
    sourceId: 'ds-cj',
    nameFr: 'Ancre galvanisée 8kg',
    nameEn: 'Galvanized anchor 8kg',
    sku: 'DS-ANCH-001',
    category: 'Mouillage',
    priceWholesale: 28.00,
    shippingCost: 6.00,
    shippingOrigin: 'Chine',
    stockStatus: 'disponible',
    stockQty: 80,
    moq: 1,
    delayDays: 10,
    weightKg: 8.00,
    dimensions: '80x30x10',
    description: 'Ancre pliante galvanisée 8kg.',
    tags: ['ancre', 'galvanisée', '8kg']
  }
];

// Calcule le prix de vente IKABAY
export function calcIkabayPrice(product, source) {
  const marginPct = source?.marginPercent || 20;
  const feePct = source?.feePercent || 0;
  const base = product.priceWholesale * (1 + marginPct / 100);
  const withFees = base * (1 + feePct / 100);
  return Math.round(withFees * 100) / 100;
}

// Calcule la marge nette
export function calcNetMargin(product, source) {
  const ikabayPrice = calcIkabayPrice(product, source);
  const totalCost = product.priceWholesale + (product.shippingCost || 0);
  return Math.round((ikabayPrice - totalCost) * 100) / 100;
}