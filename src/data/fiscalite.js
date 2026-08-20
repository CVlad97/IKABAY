// IKABAY Sourcing — Fiscalité, transport et conformité Martinique (DOM)
// Régime fiscal spécifique aux DOM-TOM français — Loi française

// ============================================================
// 1. RÉGIME FISCAL MARTINIQUE (DOM)
// ============================================================

export const TAXATION = {
  // TVA Martinique (taux DOM — différents de la métropole)
  tva: {
    taux_plein: 0.085,      // 8.5% — taux normal DOM (contre 20% métropole)
    taux_reduit: 0.021,     // 2.1% — produits alimentaires, équipements agricoles
    taux_intermediaire: 0.05, // 5.0% — certains biens et services
    exonere: false,          // Pas d'exonération TVA sur les produits nautiques
    reference_loi: 'Art. 294 CGI — Dispositions DOM / Loi Pons (1986)'
  },
  
  // Octroi de mer — taxe spécifique DOM (entrée de marchandises)
  octroi_mer: {
    taux_min: 0.0,           // 0% — matières premières, certains équipements
    taux_moyen: 0.04,        // 4% — biens de consommation courante
    taux_max: 0.07,          // 7% — biens de consommation finale
    taux_luxe: 0.10,         // 10% — produits de luxe, alcools, tabacs
    equipement_nautique: 0.04, // 4% — applicable aux équipements nautiques
    reference_loi: 'Code général des collectivités territoriales — Art. L4431-1'
  },

  // Droits de douane — Importation hors UE
  douane: {
    origine_ue: 0.0,         // 0% — Union Européenne (France, Italie, Allemagne...)
    origine_chine: 0.04,     // 4% — Chine (tarif préférentiel SPG)
    origine_usa: 0.035,      // 3.5% — États-Unis
    origine_autres: 0.05,    // 5% — autres pays hors UE
    reference: 'Tarif Douanier Commun (TDC) — Règlement UE 2658/87'
  },

  // Fiscalité entreprise (Martinique = zone France)
  entreprise: {
    impot_societes: 0.25,    // 25% IS standard
    is_reduit_pme: 0.15,     // 15% IS pour PME (< 42k€ bénéfice)
    cotisation_fonciere: 'CFE — variable selon commune',
    cotisation_valeur_ajoutee: 'CVAE — 0.75% à 1.5% du CA',
    versement_mobilite: '0% pour les DOM (exonéré)',
    reference: 'CGI — Art. 219, 1586 ter, 1600'
  },

  // Cas spécifique DOM — Loi Lurel (2014) / Loi Pons (1986)
  dispositifs_dom: {
    loi_lurel: 'Crédit d\'impôt pour investissements productifs dans les DOM (25-40%)',
    loi_pons: 'Exonération de charges sociales et fiscales pour les entreprises DOM',
    zone_franche: 'Régime de Zone Franche d\'Activité (ZFA) — exonération IS 5 ans',
  }
};

// ============================================================
// 2. TRANSPORT PARTENAIRES — MARTINIQUE
// ============================================================

export const TRANSPORT_PARTNERS = [
  {
    name: 'GEODIS',
    country: 'France',
    service: 'Groupage LCL France → Martinique',
    type: 'maritime',
    agence_locale: 'GEODIS Martinique — Fort-de-France',
    email: 'devis.martinique@geodis.com',
    tel: '0596 XX XX XX',
    delai_moyen_jours: 12,
    prix_estime_par_m3: 350,       // 350€/m³ LCL France → Martinique
    prix_estime_par_kg: null,
    assurance_incluse: true,
    dedouanement_inclus: true,
    tracking: true,
    notes: 'Groupe logistique mondial. Agence Fort-de-France. Dédouanement DOM inclus.',
    statut: 'contacte'
  },
  {
    name: 'CMA CGM Martinique',
    country: 'France',
    service: 'Conteneur FCL/LCL France → Martinique',
    type: 'maritime',
    agence_locale: 'CMA CGM Antilles — Fort-de-France',
    email: 'fdf.agency@cma-cgm.com',
    tel: '0596 XX XX XX',
    delai_moyen_jours: 10,
    prix_estime_par_m3: 300,       // 300€/m³ LCL
    prix_estime_par_kg: null,
    assurance_incluse: false,
    dedouanement_inclus: false,
    tracking: true,
    notes: '1er armateur français. Ligne directe Le Havre/Fos → Fort-de-France.',
    statut: 'contacte'
  },
  {
    name: 'SDV Martinique (Bolloré)',
    country: 'France',
    service: 'Groupage et dédouanement France → Martinique',
    type: 'maritime',
    agence_locale: 'Bolloré Logistics Martinique',
    email: 'martinique@bollore-logistics.com',
    tel: null,
    delai_moyen_jours: 14,
    prix_estime_par_m3: 380,
    prix_estime_par_kg: null,
    assurance_incluse: true,
    dedouanement_inclus: true,
    tracking: true,
    notes: 'Présence historique aux Antilles. Service groupage + dédouanement clé en main.',
    statut: 'a-contacter'
  },
  {
    name: 'Chronopost DOM',
    country: 'France',
    service: 'Colis express France → Martinique 24-72h',
    type: 'aerien',
    agence_locale: 'Chronopost Martinique',
    email: null,
    tel: '0596 XX XX XX',
    delai_moyen_jours: 2,
    prix_estime_par_m3: null,
    prix_estime_par_kg: 12,         // 12€/kg colis express
    assurance_incluse: false,
    dedouanement_inclus: true,
    tracking: true,
    notes: 'Pour petits colis urgents (< 30kg). Prix élevé mais délai record.',
    statut: 'a-contacter'
  },
  {
    name: 'MSC Martinique',
    country: 'Suisse/France',
    service: 'Conteneur FCL/LCL Europe → Martinique',
    type: 'maritime',
    agence_locale: 'MSC Antilles',
    email: null,
    tel: null,
    delai_moyen_jours: 11,
    prix_estime_par_m3: 320,
    prix_estime_par_kg: null,
    assurance_incluse: false,
    dedouanement_inclus: false,
    tracking: true,
    notes: '2e armateur mondial. Prix compétitifs sur le fret maritime.',
    statut: 'a-contacter'
  },
];

// ============================================================
// 3. CALCULATEUR DE PRIX — IKABAY
// ============================================================

/**
 * Calcule le prix de vente final en Martinique
 * Inclut : achat + transport + douane + octroi mer + TVA DOM + marge IKABAY
 */
export function calculateFinalPrice({
  purchasePrice,       // Prix d'achat HT en EUR
  shippingCost,        // Coût transport unitaire EUR
  weight,              // Poids en kg
  volume,              // Volume en m³
  origin,              // 'ue' | 'chine' | 'usa' | 'autres'
  marginPercent = 25,  // Marge IKABAY souhaitée (défaut 25%)
  productType = 'equipement_nautique'
}) {
  // 1. Frais de douane
  const douaneRate = {
    'ue': 0,
    'chine': 0.04,
    'usa': 0.035,
    'autres': 0.05
  }[origin] || 0.05;

  const douane = purchasePrice * douaneRate;

  // 2. Octroi de mer (4% pour équipement nautique)
  const octroi = purchasePrice * 0.04;

  // 3. Transport unitaire
  const transport = shippingCost || 0;

  // 4. Assiette taxable (prix CAF = Cost, Insurance, Freight)
  const assiette_caf = purchasePrice + transport + douane + octroi;

  // 5. TVA DOM (8.5% sur le CAF)
  const tva = assiette_caf * 0.085;

  // 6. Coût total revient
  const cout_revient = assiette_caf + tva;

  // 7. Prix vente IKABAY (achat + transport + taxes + marge)
  const marge_base = purchasePrice * (marginPercent / 100);
  const prix_vente_ht = cout_revient + marge_base;

  // 8. Marge nette réelle
  const marge_nette = prix_vente_ht - cout_revient;
  const taux_marge_reel = (marge_nette / cout_revient) * 100;

  return {
    douane: Math.round(douane * 100) / 100,
    octroi_mer: Math.round(octroi * 100) / 100,
    transport: Math.round(transport * 100) / 100,
    assiette_caf: Math.round(assiette_caf * 100) / 100,
    tva_dom: Math.round(tva * 100) / 100,
    cout_revient: Math.round(cout_revient * 100) / 100,
    marge_ikabay: Math.round(marge_nette * 100) / 100,
    taux_marge_reel: Math.round(taux_marge_reel * 100) / 100,
    prix_vente_final: Math.round(prix_vente_ht * 100) / 100,
    breakdown: {
      achat_ht: purchasePrice,
      douane_pct: douaneRate * 100,
      octroi_pct: 4,
      tva_pct: 8.5,
      marge_pct_applique: marginPercent,
      marge_pct_reel: Math.round(taux_marge_reel * 100) / 100
    }
  };
}

// ============================================================
// 4. RÈGLES LÉGALES — CONFORMITÉ FRANÇAISE
// ============================================================

export const LEGAL_REQUIREMENTS = {
  mentions_legales: {
    obligatoire: true,
    articles: ['Loi n°2004-575 du 21 juin 2004 (LCEN)', 'Art. 19 — Mentions obligatoires'],
    contenus: [
      'Raison sociale et forme juridique',
      'Adresse du siège social',
      'Numéro RCS (Registre du Commerce et des Sociétés)',
      'Numéro TVA intracommunautaire',
      'Capital social',
      'Directeur de la publication',
      'Hébergeur du site (nom, adresse, téléphone)',
    ]
  },
  
  cgv: {
    obligatoire: true,
    articles: ['Art. L441-1 du Code de commerce', 'Art. L111-1 du Code de la consommation'],
    contenus: [
      'Prix : indiqués en Euros TTC (toutes taxes comprises DOM)',
      'Frais de livraison : détaillés par zone géographique',
      'Délai de livraison : mentionné avant la commande',
      'Droit de rétractation : 14 jours (Art. L221-18 C. conso.)',
      'Modalités de paiement : acceptés, sécurité',
      'Garantie légale de conformité (2 ans — Art. L217-4 C. conso.)',
      'Garantie légale des vices cachés (Art. 1641 Code civil)',
      'Service après-vente : coordonnées et modalités',
      'Médiation : coordonnées du médiateur de la consommation',
    ]
  },

  rgpd: {
    obligatoire: true,
    articles: ['Règlement UE 2016/679 (RGPD)', 'Loi n°78-17 du 6 janvier 1978 (Informatique & Libertés)'],
    contenus: [
      'Politique de confidentialité accessible',
      'Formulaire de collecte de données avec checkbox consentement',
      'Droit d\'accès, de rectification, d\'opposition (Art. 15-22 RGPD)',
      'Délai de conservation des données (max 36 mois)',
      'Sécurité des paiements (PSP certifié PCI-DSS)',
      'Cookie wall conforme (consentement actif obligatoire)',
    ]
  },

  douane_dom: {
    regime_particulier: true,
    details: [
      'Les DOM sont des Régions Ultrapériphériques (RUP) — pas de droit de douane UE',
      'Marchandises UE : libre circulation, pas de douane, TVA DOM 8.5%',
      'Marchandises hors UE : déclaration en douane, octroi de mer + TVA DOM',
      'Seuil de franchise douane DOM : 150€ (contre 700€ en métropole)',
      'N° EORI obligatoire pour importer hors UE',
    ]
  },

  facturation: {
    obligatoire: true,
    articles: ['Art. L441-9 du Code de commerce', 'Art. 289 CGI'],
    mentions: [
      'Numéro de facture unique et chronologique',
      'Date de la facture',
      'Identité du vendeur (nom, adresse, RCS, TVA intra)',
      'Identité du client (nom, adresse)',
      'Dénomination des produits/services',
      'Quantité, prix unitaire HT, taux de TVA',
      'Montant de la TVA DOM (8.5%) ou exonération',
      'Total TTC en Euros',
      'Date d\'échéance et conditions de paiement',
      'Pénalités de retard (taux=3x intérêt légal)',
    ]
  }
};

// ============================================================
// 5. CALCULATEUR DE MARGE RAPIDE
// ============================================================

/**
 * Exemples concrets de marges IKABAY (produits Joël Dufeal)
 * 
 * Produit UE (Osculati) :
 *   Achat HT: 18.50€ (taquet)
 *   Transport: 3.00€ (groupage)
 *   Douane: 0€ (origine UE)
 *   Octroi mer: 0.74€
 *   TVA 8.5%: 1.89€
 *   Coût revient: 24.13€
 *   Marge 30%: 7.24€
 *   Prix vente TTC: 31.37€
 *   Marge brute: 30%
 *
 * Produit Chine (Alastin) :
 *   Achat FOB: 2.85€ (taquet)
 *   Fret Chine→DOM: 1.50€
 *   Douane 4%: 0.17€
 *   Octroi mer 4%: 0.17€
 *   TVA 8.5%: 0.40€
 *   Coût revient: 5.09€
 *   Marge 40%: 2.04€
 *   Prix vente TTC: 7.13€
 *   Marge brute: 40%
 */

export const MARGIN_EXAMPLES = [
  {
    product: 'Taquet inox 316 200mm',
    origine: 'UE (Osculati)',
    achat: 18.50,
    transport: 3.00,
    douane: 0,
    octroi: 0.74,
    tva_dom: 1.89,
    cout_revient: 24.13,
    marge_30pc: 7.24,
    prix_vente: 31.37,
    marge_nette_pc: 30
  },
  {
    product: 'Taquet inox 316 200mm',
    origine: 'Chine (Alastin)',
    achat: 2.85,
    transport: 1.50,
    douane: 0.17,
    octroi: 0.17,
    tva_dom: 0.40,
    cout_revient: 5.09,
    marge_40pc: 2.04,
    prix_vente: 7.13,
    marge_nette_pc: 40
  },
  {
    product: 'Bolster double baquet',
    origine: 'UE (Ullman Dynamics)',
    achat: 1690.00,
    transport: 50.00,
    douane: 0,
    octroi: 67.60,
    tva_dom: 153.62,
    cout_revient: 1961.22,
    marge_25pc: 490.31,
    prix_vente: 2451.53,
    marge_nette_pc: 25
  },
];