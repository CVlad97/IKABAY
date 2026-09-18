// IKABAY — Fonctionnalités virales et avantages concurrentiels
// Parrainage, points fidélité, garanties, partage social

export const VIRAL_FEATURES = {
  // ===== PARRAINAGE =====
  referral: {
    enabled: false,
    prime_parrain: 15,     // 15€ de réduction pour le parrain
    prime_filleul: 10,     // 10€ de réduction pour le filleul
    seuil_declenchement: 1, // Déclenché dès la 1ère commande du filleul
    max_parrainages: 10,    // Maximum 10 filleuls par mois
    code_promo_length: 8,
    conditions: 'Offre valable pour toute commande de 50€ minimum. Crédit utilisable sur la prochaine commande.',
  },

  // ===== POINTS FIDÉLITÉ =====
  loyalty: {
    enabled: false,
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
      title: 'Prix étudié et transparent',
      desc: 'Le prix, les frais identifiés et les hypothèses sont clarifiés avant validation du devis.',
      promo: 'Sur devis',
    },
    {
      icon: '🚚',
      title: 'Livraison Martinique',
      desc: 'Le mode de transport et le délai sont confirmés selon le fournisseur, le produit et la destination.',
      promo: 'Délai à confirmer',
    },
    {
      icon: '💬',
      title: 'Contact WhatsApp',
      desc: 'Un canal direct est disponible pour les demandes de devis, de sourcing et de suivi.',
      promo: 'Contact direct',
    },
    {
      icon: '⚓',
      title: 'Sourcing nautique',
      desc: 'Recherche multi-fournisseurs avec références et liens quand ils sont disponibles et vérifiés.',
      promo: 'Demande gratuite',
    },
  ],

  // ===== PARTAGE SOCIAL =====
  sharing: {
    message_whatsapp: '🚢 Ikabay Sourcing — Équipement nautique pour la Caraïbe !\n\nJe viens de découvrir IKABAY pour le sourcing nautique : catalogue, demandes de devis et livraison Martinique selon disponibilité.\n\n👉 https://ikabay.store',
    message_email: "Découvrez Ikabay Sourcing — le sourcing nautique pour la Caraïbe. Demandes de devis, recherche fournisseurs et livraison Martinique selon disponibilité.",
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