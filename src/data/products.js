// Ikabay Sourcing — Seed data for déstockage nautique (from PDF 17 pages)
// Prices are from the actual PDF document. Quantities marked as "À confirmer" per rules.

export const categories = [
  { id: 'securite', name: 'Sécurité', icon: 'Shield' },
  { id: 'navigation', name: 'Navigation / Éclairage', icon: 'Lightbulb' },
  { id: 'accastillage-inox', name: 'Accastillage inox', icon: 'Anchor' },
  { id: 'plomberie', name: 'Plomberie marine', icon: 'Droplets' },
  { id: 'electricite', name: 'Électricité marine', icon: 'Zap' },
  { id: 'pare-battages', name: 'Pare-battages / Bouées', icon: 'Circle' },
  { id: 'remorque', name: 'Remorque / Treuil', icon: 'Truck' },
  { id: 'trappes-coffres', name: 'Trappes / Coffres', icon: 'Box' },
  { id: 'audio', name: 'Audio / Connectique', icon: 'Speaker' },
  { id: 'destockage-urgent', name: 'Déstockage urgent', icon: 'Tag' },
];

export const products = [
  // === SÉCURITÉ ===
  { id: 'p1', nameFr: 'Corne de brume', nameEn: 'Fog horn', price: 12, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p2', nameFr: 'Dry briefcase', nameEn: 'Dry briefcase', price: 10, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p3', nameFr: 'Flotteur de surface blanc/rouge', nameEn: 'Surface buoy white/red', price: 6, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p4', nameFr: 'Feu flottant à allumage automatique', nameEn: 'Automatic floating light', price: 24, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p5', nameFr: 'Support bouée de sauvetage', nameEn: 'Lifebuoy bracket', price: 15, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },

  // === NAVIGATION / ÉCLAIRAGE ===
  { id: 'p6', nameFr: 'Feu tribord vert', nameEn: 'Starboard light green', price: 18, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p7', nameFr: 'Feu tribord vert (grand modèle)', nameEn: 'Starboard light green large', price: 22, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p8', nameFr: 'Panneau interrupteurs marin', nameEn: 'Marine switch panel', price: 35, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: 'Plusieurs modèles de 35 à 50€' },
  { id: 'p9', nameFr: 'Fusible étanche marine', nameEn: 'Marine waterproof fuse', price: 65, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: 'De 65 à 70€ selon modèle' },
  { id: 'p10', nameFr: 'Volant bateau 350mm', nameEn: 'Boat steering wheel 350mm', price: 70, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p11', nameFr: 'Volant bateau 360mm', nameEn: 'Boat steering wheel 360mm', price: 100, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },

  // === DRAPEAUX ===
  { id: 'p12', nameFr: 'Drapeau français 20×30', nameEn: 'French flag 20×30', price: 5, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p13', nameFr: 'Drapeau français 30×45', nameEn: 'French flag 30×45', price: 8, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p14', nameFr: 'Drapeau français 50×75', nameEn: 'French flag 50×75', price: 12, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },

  // === TRAPPES / COFFRES ===
  { id: 'p15', nameFr: 'Trappe de visite blanche couvercle détachable', nameEn: 'White inspection hatch', price: 20, category: 'trappes-coffres', status: 'disponible', image: null, unit: 'pc', comment: 'De 20 à 24€ selon taille' },
  { id: 'p16', nameFr: 'Boîtier remplissage de pont avec couvercle', nameEn: 'Deck fill with cap', price: 30, category: 'trappes-coffres', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p17', nameFr: 'Boîtier de douche blanc', nameEn: 'White shower box', price: 18, category: 'trappes-coffres', status: 'disponible', image: null, unit: 'pc', comment: 'De 18 à 20€ selon modèle' },
  { id: 'p18', nameFr: 'Trappe de pont KROME', nameEn: 'KROME deck hatch', price: 20, category: 'trappes-coffres', status: 'disponible', image: null, unit: 'pc', comment: 'De 20 à 45€ selon taille' },
  { id: 'p19', nameFr: 'Capteur réservoir eau douce/eaux usées', nameEn: 'Fresh/black water tank sensor', price: 35, category: 'trappes-coffres', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p20', nameFr: 'Jauge de niveau 12/24V', nameEn: 'Level gauge 12/24V', price: 25, category: 'trappes-coffres', status: 'disponible', image: null, unit: 'pc', comment: '' },

  // === PARE-BATTAGES / BOUÉES ===
  { id: 'p21', nameFr: 'Pare-battage U2', nameEn: 'Fender U2', price: 25, category: 'pare-battages', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p22', nameFr: 'Pare-battage U4', nameEn: 'Fender U4', price: 30, category: 'pare-battages', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p23', nameFr: 'Pare-battage H6', nameEn: 'Fender H6', price: 35, category: 'pare-battages', status: 'disponible', image: null, unit: 'pc', comment: '' },

  // === REMORQUE / TREUIL ===
  { id: 'p24', nameFr: 'Ancre pliante galvanisée', nameEn: 'Galvanized folding anchor', price: 70, category: 'remorque', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p25', nameFr: 'Treuil manuel remorque', nameEn: 'Trailer manual winch', price: 35, category: 'remorque', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p26', nameFr: 'Roue jockey télescopique', nameEn: 'Telescopic jockey wheel', price: 35, category: 'remorque', status: 'disponible', image: null, unit: 'pc', comment: '' },

  // === PLOMBERIE MARINE ===
  { id: 'p27', nameFr: 'Tuyau marin PVC renforcé 38mm', nameEn: 'Marine PVC hose 38mm', price: 0, category: 'plomberie', status: 'disponible', image: null, unit: 'mètre', comment: 'Prix au mètre — nous contacter' },
  { id: 'p28', nameFr: 'Aussière d\'amarrage', nameEn: 'Mooring line', price: 0, category: 'plomberie', status: 'disponible', image: null, unit: 'mètre', comment: 'Prix au mètre — nous contacter' },
  { id: 'p29', nameFr: 'Réservoir souple 100L', nameEn: 'Flexible tank 100L', price: 50, category: 'plomberie', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p30', nameFr: 'Réservoir souple 150L', nameEn: 'Flexible tank 150L', price: 50, category: 'plomberie', status: 'disponible', image: null, unit: 'pc', comment: '' },

  // === ACCASTILLAGE INOX ===
  { id: 'p31', nameFr: 'Support cannes à pêche', nameEn: 'Fishing rod holder', price: 10, category: 'accastillage-inox', status: 'disponible', image: null, unit: 'pc', comment: 'De 10 à 40€ selon modèle' },
  { id: 'p32', nameFr: 'Charnière inox marine', nameEn: 'Marine stainless hinge', price: 0, category: 'accastillage-inox', status: 'a-confirmer', image: null, unit: 'pc', comment: 'Plusieurs tailles — nous contacter' },
  { id: 'p33', nameFr: 'Manille inox', nameEn: 'Stainless shackle', price: 0, category: 'accastillage-inox', status: 'a-confirmer', image: null, unit: 'pc', comment: 'Plusieurs tailles — nous contacter' },
  { id: 'p34', nameFr: 'Mousqueton inox', nameEn: 'Stainless carabiner', price: 0, category: 'accastillage-inox', status: 'a-confirmer', image: null, unit: 'pc', comment: 'Plusieurs tailles — nous contacter' },
  { id: 'p35', nameFr: 'Grille d\'aération inox', nameEn: 'Stainless vent grill', price: 0, category: 'accastillage-inox', status: 'a-confirmer', image: null, unit: 'pc', comment: 'Plusieurs modèles — nous contacter' },
  { id: 'p36', nameFr: 'Visserie inox (lot)', nameEn: 'Stainless screw kit', price: 0, category: 'accastillage-inox', status: 'a-confirmer', image: null, unit: 'lot', comment: 'Prix selon quantité — nous contacter' },

  // === AUDIO / CONNECTIQUE ===
  { id: 'p37', nameFr: 'Kit haut-parleurs marins 2 pcs', nameEn: 'Marine speaker kit 2 pcs', price: 0, category: 'audio', status: 'a-confirmer', image: null, unit: 'kit', comment: 'Nous contacter pour prix et disponibilité' },
  { id: 'p38', nameFr: 'Kit haut-parleurs marins 4 pcs', nameEn: 'Marine speaker kit 4 pcs', price: 0, category: 'audio', status: 'a-confirmer', image: null, unit: 'kit', comment: 'Nous contacter pour prix et disponibilité' },
];

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(catId) {
  return products.filter(p => p.category === catId);
}

export function searchProducts(query) {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.nameFr.toLowerCase().includes(q) ||
    p.nameEn.toLowerCase().includes(q) ||
    p.category.includes(q)
  );
}

export function formatPrice(price) {
  return price > 0 ? `${price} €` : 'Nous contacter';
}