// IKABAY — Fonctionnalités virales et avantages concurrentiels
// Parrainage, points fidélité, garanties, partage social

export const VIRAL_FEATURES = {
  // ===== PARRAINAGE =====
  referral: {
    enabled: true,
    prime_parrain: 15,     // 15€ de réduction pour le parrain
    prime_filleul: 10,     // 10€ de réduction pour le filleul
    seuil_declenchement: 1, // Déclenché dès la 1ère commande du filleul
    max_parrainages: 10,    // Maximum 10 filleuls par mois
    code_promo_length: 8,
    conditions: 'Offre valable pour toute commande de 50€ minimum. Crédit utilisable sur la prochaine commande.',
  },

  // ===== POINTS FIDÉLITÉ =====
  loyalty: {
    enabled: true,
    nom: 'Ikabay Miles',
    points_par_euro: 1,         // 1 point par euro dépensé
    valeur_point_en_centimes: 5, // 1 point = 0,05€ de réduction
    seuil_remboursement: 500,    // Minimum 500 points (25€) pour remboursement
    bonus_premiere_commande: 200, // 200 points cadeau à la 1ère commande
    bonus_anniversaire: 100,     // 100 points le jour de l'anniversaire
    bonus_avis: 50,             // 50 points pour un avis produit
    parrainage_bonus: 300,      // 300 points pour un filleul qui commande
    statuts: [
      { nom: 'Bronze', seuil: 0, couleur: '#cd7f32', avantages: 'Points standard' },
      { nom: 'Argent', seuil: 5000, couleur: '#c0c0c0', avantages: 'Livraison offerte' },
      { nom: 'Or', seuil: 15000, couleur: '#ffd700', avantages: '-5% sur tout le catalogue' },
      { nom: 'Platine', seuil: 50000, couleur: '#e5e4e2', avantages: '-10% + prioritaire' },
    ],
  },

  // ===== GARANTIES =====
  guarantees: [
    {
      icon: '🎯',
      title: 'Prix très compétitifs',
      desc: 'Nous cherchons un positionnement tarifaire bas et transparent selon disponibilité et frais réels.',
      promo: 'Positionnement prix étudié',
    },
    {
      icon: '🚚',
      title: 'Livraison express DOM',
      desc: 'Expédition sous 24h. Livraison Martinique en 8-12 jours maritimes.',
      promo: 'Gratuite dès 150€',
    },
    {
      icon: '💬',
      title: 'Support WhatsApp 24/7',
      desc: 'Un vrai commercial nautique à votre écoute. Réponse < 1h ouvrée.',
      promo: 'Sans engagement',
    },
    {
      icon: '💳',
      title: 'Paiement 3x ou 4x sans frais',
      desc: 'Payez en plusieurs fois par carte bancaire. Dès 100€ d\'achat.',
      promo: 'Dès 100€',
    },
    {
      icon: '🛡️',
      title: 'Garantie conformité 2 ans',
      desc: 'Tous nos produits sont garantis conformes aux normes CE et marine.',
      promo: 'Art. L217-4 C. conso.',
    },
    {
      icon: '⚡',
      title: 'Sourcing express 24h',
      desc: 'Urgent ? Trouvé en 24h avec notre réseau de 42 fournisseurs vérifiés.',
      promo: 'Devis gratuit',
    },
  ],

  // ===== PARTAGE SOCIAL =====
  sharing: {
    message_whatsapp: '🚢 Ikabay Sourcing — Équipement nautique pour la Caraïbe !\n\nJe viens de découvrir cette plateforme incroyable pour le sourcing nautique. Prix imbattables, livraison Martinique, support WhatsApp.\n\n👉 https://ikabay.store\n\nUtilise mon code PARRAINAGE pour -10€ sur ta première commande :',
    message_email: "Découvrez Ikabay Sourcing — le sourcing nautique pour la Caraïbe. Prix compétitifs, fournisseurs vérifiés, livraison Martinique.",
  },
};

// ===== CALCUL DES POINTS =====
export function calculatePoints(amountEUR) {
  return Math.floor(amountEUR * VIRAL_FEATURES.loyalty.points_par_euro);
}

export function pointsToEUR(points) {
  return (points * VIRAL_FEATURES.loyalty.valeur_point_en_centimes) / 100;
}

export function getLoyaltyTier(points) {
  const tiers = [...VIRAL_FEATURES.loyalty.statuts].reverse();
  for (const tier of tiers) {
    if (points >= tier.seuil) return tier;
  }
  return VIRAL_FEATURES.loyalty.statuts[0];
}

// ===== PRIX FINAL AVEC REMISES =====
export function calculateDiscountedPrice(priceEUR, points, referralCode) {
  let discount = 0;
  
  // Points discount
  if (points >= VIRAL_FEATURES.loyalty.seuil_remboursement) {
    discount += pointsToEUR(points);
  }
  
  // Referral discount
  if (referralCode) {
    discount += VIRAL_FEATURES.referral.prime_filleul;
  }
  
  const final = Math.max(0, priceEUR - discount);
  return {
    originalPrice: priceEUR,
    discount,
    finalPrice: final,
    savings: Math.round((discount / priceEUR) * 100) + '%',
  };
}