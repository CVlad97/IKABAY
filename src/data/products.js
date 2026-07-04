// Ikabay Sourcing — Produits sourcing nautique (Projet Joël Dufeal)
// Prix réels vérifiés sur sites fournisseurs — Juillet 2026

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
  // Nouvelles catégories sourcing
  { id: 'compas', name: 'Compas magnétique', icon: 'Compass' },
  { id: 'liston', name: 'Liston / Liseret PVC', icon: 'Maximize' },
  { id: 'hublots', name: 'Hublots', icon: 'Circle' },
  { id: 'sieges', name: 'Sièges / Bolsters', icon: 'Armchair' },
  { id: 'davier', name: 'Davier / Ancrage', icon: 'Anchor' },
  { id: 'echelles', name: 'Échelles de bain', icon: 'ArrowUpFromLine' },
  { id: 'taquets', name: 'Taquets d\'amarrage', icon: 'CircleDot' },
  { id: 'loquets', name: 'Loquets / Fermetures', icon: 'Lock' },
  { id: 'quincaillerie', name: 'Quincaillerie marine', icon: 'Wrench' },
];

export const products = [
  // === SÉCURITÉ (existants) ===
  { id: 'p1', nameFr: 'Corne de brume', nameEn: 'Fog horn', price: 12, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p2', nameFr: 'Dry briefcase', nameEn: 'Dry briefcase', price: 10, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p3', nameFr: 'Flotteur de surface blanc/rouge', nameEn: 'Surface buoy white/red', price: 6, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p4', nameFr: 'Feu flottant à allumage automatique', nameEn: 'Automatic floating light', price: 24, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p5', nameFr: 'Support bouée de sauvetage', nameEn: 'Lifebuoy bracket', price: 15, category: 'securite', status: 'disponible', image: null, unit: 'pc', comment: '' },

  // === NAVIGATION / ÉCLAIRAGE (existants) ===
  { id: 'p6', nameFr: 'Feu tribord vert', nameEn: 'Starboard light green', price: 18, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p7', nameFr: 'Feu tribord vert (grand modèle)', nameEn: 'Starboard light green large', price: 22, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p8', nameFr: 'Panneau interrupteurs marin', nameEn: 'Marine switch panel', price: 35, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p9', nameFr: 'Fusible étanche marine', nameEn: 'Marine waterproof fuse', price: 65, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p10', nameFr: 'Volant bateau 350mm', nameEn: 'Boat steering wheel 350mm', price: 70, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },
  { id: 'p11', nameFr: 'Volant bateau 360mm', nameEn: 'Boat steering wheel 360mm', price: 100, category: 'navigation', status: 'disponible', image: null, unit: 'pc', comment: '' },

  // === PROJET JOËL DUFEAL — 11 PRODUITS SOURCING ===

  // 1. Compas magnétique
  { id: 'jd01', nameFr: 'Compas magnétique Contest 150', nameEn: 'Compass Contest 150', price: 543.90, category: 'compas', status: 'disponible', image: null, unit: 'pc', 
    comment: 'Plastimo 20301 - Ø150mm - Éclairage 12/24V - 1,5kg', 
    suppliers: [
      { name: 'Comptoir Nautique 🇫🇷', price: '543,90€', delivery: 'Stock 48h', link: 'https://www.comptoirnautique.fr/compas-magnetique-plastimo-contest-150-20301.html', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '549,00€', delivery: 'Stock', link: 'https://www.adnautic.com/compas-magnetique-plastimo-contest-150-150-mm-20301.html' },
      { name: 'SVB Allemagne 🇩🇪', price: '632,90€', delivery: 'Stock', link: 'https://www.svb.de/de/plastimo-kreiselkompass-contest-150.html' },
    ]},

  // 2. Liston PVC
  { id: 'jd02', nameFr: 'Liston PVC prépercé Tessilmare Radial 55mm / Osculati', nameEn: 'PVC rub rail Tessilmare Radial 55mm', price: 8.90, category: 'liston', status: 'disponible', image: null, unit: 'barre 6m',
    comment: 'Tessilmare RADIAL 55mm ou Osculati 87.203.00 20x10mm - Noir',
    suppliers: [
      { name: 'Tessilmare RADIAL 🇮🇹', price: 'sur devis', delivery: 'Stock', link: 'https://www.tessilmare.com/product/radial/', reco: true },
      { name: 'Osculati 87.203.00 🇮🇹', price: '8,90€/barre', delivery: 'Stock 5-7j', link: 'https://www.osculati.com/en/products/8720300-listello-paraspigoli-in-pvc-forato' },
      { name: 'AD Nautic 🇫🇷', price: '8,95€/barre', delivery: 'Stock', link: 'https://www.adnautic.com/accastillage/liston-pvc-preperce-osculati-8720300.html' },
    ]},

  // 3. Liseret
  { id: 'jd03', nameFr: 'Liseret compatible liston Tessilmare/Osculati', nameEn: 'Insert for rub rail', price: 3.50, category: 'liston', status: 'disponible', image: null, unit: 'barre 6m',
    comment: 'Compatible Tessilmare Radial 55mm - Osculati 87.201.00',
    suppliers: [
      { name: 'Osculati 87.201.00 🇮🇹', price: '3,50€/barre', delivery: 'Stock', link: 'https://www.osculati.com/en/products/8720100-listello-paraspigoli-fermavetro-in-pvc', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '3,60€/barre', delivery: 'Stock', link: '' },
      { name: 'Gebomarine 🇫🇷', price: '3,80€/barre', delivery: 'Stock', link: '' },
    ]},

  // 4. Hublots
  { id: 'jd04', nameFr: 'Hublot ovale inox 365x150mm', nameEn: 'Oval porthole 365x150mm', price: 85.90, category: 'hublots', status: 'disponible', image: null, unit: 'pc',
    comment: 'Osculati 81.502 - STANDARD catalogue - Inox 316 - Verre trempé',
    suppliers: [
      { name: 'Osculati 81.502 🇮🇹', price: '85,90€', delivery: 'Stock 5-7j', link: 'https://www.osculati.com/en/products/portlights/81-5xx-oval-stainless-steel-portlight', reco: true },
      { name: 'Gebo Marine 🇫🇷', price: '~200€', delivery: '3-5 sem', link: 'https://www.gebomarine.com/en/giobo-portholes/' },
      { name: 'X-Vision Marine 🇮🇹', price: '~150€', delivery: '4-6 sem', link: '' },
    ]},

  // 5. Bolsters
  { id: 'jd05', nameFr: 'Bolster double baquet + sellerie', nameEn: 'Double bolster seat + upholstery', price: 1800, category: 'sieges', status: 'sur-devis', image: null, unit: 'pc',
    comment: 'X-Vision Marine - Cuir UV bleu/gris - Option glacière - 4-6 sem CRITIQUE',
    suppliers: [
      { name: 'X-Vision Marine 🇫🇷', price: '1 500-2 200€', delivery: '4-6 sem ⚠️', link: 'https://www.x-vision-marine.com/devis-express/', reco: true },
      { name: 'Trend Marine 🇫🇷', price: '1 200-2 000€', delivery: '5-7 sem', link: 'https://www.trendmarine.com/produits/sieges-baquet-double/' },
      { name: 'Seatrade 🇮🇹', price: '1 200-1 800€', delivery: '6-8 sem', link: 'https://www.seatrade.com/contacts' },
    ]},

  // 6. Davier
  { id: 'jd06', nameFr: 'Davier bow roller ancre 8-10kg', nameEn: 'Bow roller anchor 8-10kg', price: 99, category: 'davier', status: 'disponible', image: null, unit: 'pc',
    comment: 'Quick Nemo QKANEMO10 - Inox 316L - 205x70x30mm',
    suppliers: [
      { name: 'Quick Nemo QKANEMO10 🇮🇹', price: '99€', delivery: 'Stock 72h', link: 'https://www.quicknautical.com/en/store/bow-rollers-1015/bow-roller-nemo-316l-919.html', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '104€', delivery: 'Stock', link: 'https://www.adnautic.com/daviers-bow-rollers/18597-davier-bow-roller-quick-nemo-316l-8022166559565.html' },
      { name: 'Mantus Marine 🇺🇸', price: '~150€', delivery: '2-3 sem', link: '' },
    ]},

  // 7. Échelle
  { id: 'jd07', nameFr: 'Échelle inox 4 marches 30cm', nameEn: 'Stainless ladder 4 steps 30cm', price: 112.50, category: 'echelles', status: 'disponible', image: null, unit: 'pc',
    comment: 'Osculati 84.840 - Inox 316 - Oscillante - 150 kg',
    suppliers: [
      { name: 'Osculati 84.840 🇮🇹', price: '112,50€', delivery: 'Stock 5-7j', link: 'https://www.osculati.com/en/84-840-stainless-steel-folding-ladder-4-steps', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '135€', delivery: 'Stock 24h', link: '' },
      { name: 'SVB Allemagne 🇩🇪', price: '~125€', delivery: 'Stock', link: '' },
    ]},

  // 8. Taquets
  { id: 'jd08', nameFr: 'Taquet inox 200mm', nameEn: 'Cleat stainless 200mm', price: 18.50, category: 'taquets', status: 'disponible', image: null, unit: 'pc',
    comment: 'Osculati 90.613 - Inox 316L poli - Entraxe 110mm',
    suppliers: [
      { name: 'Osculati 90.613 🇮🇹', price: '18,50€', delivery: 'Stock 5-7j', link: 'https://www.osculati.com/en/90-613-stainless-steel-cleat-200-mm', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '22,50€', delivery: 'Stock', link: '' },
      { name: 'Qingdao Glory 🇨🇳', price: '~2,50$ (MOQ100)', delivery: '15-20j+fret', link: 'https://gloryhardware.en.alibaba.com/' },
    ]},

  // 9. Loquets
  { id: 'jd09', nameFr: 'Loquet inox simple + à clé', nameEn: 'Stainless latch + key lock', price: 12.15, category: 'loquets', status: 'disponible', image: null, unit: 'pc',
    comment: 'Osculati 92.100 (simple 9,80€) + 92.102 (à clé 14,50€) - Inox 316',
    suppliers: [
      { name: 'Osculati 92.100/102 🇮🇹', price: '9,80-14,50€', delivery: 'Stock', link: 'https://www.osculati.com/en/92-100-stainless-steel-latch-simple', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '12-17,50€', delivery: 'Stock', link: '' },
      { name: 'Wudi 🇨🇳', price: '~2,50-4$ (MOQ300)', delivery: '20-30j+fret', link: 'https://wdxinxiangju.en.alibaba.com/' },
    ]},

  // 10. Porte-gobelets
  { id: 'jd10', nameFr: 'Porte-gobelet inox', nameEn: 'Cup holder stainless', price: 8.50, category: 'accastillage-inox', status: 'disponible', image: null, unit: 'pc',
    comment: 'Osculati 84.970 - Ø70mm - Inox 316 - Encastré ou à visser',
    suppliers: [
      { name: 'Osculati 84.970 🇮🇹', price: '8,50€', delivery: 'Stock 5-7j', link: 'https://www.osculati.com/en/84-970-stainless-steel-cup-holder', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '10,50€', delivery: 'Stock', link: '' },
      { name: 'Alastin Chine 🇨🇳', price: '~3,50$ (MOQ100)', delivery: '15-20j+fret', link: 'https://alastin.en.alibaba.com/' },
    ]},

  // 11. Quincaillerie lot
  { id: 'jd11', nameFr: 'Lot quincaillerie marine 5 bateaux', nameEn: 'Marine hardware kit 5 boats', price: 800, category: 'quincaillerie', status: 'sur-devis', image: null, unit: 'lot',
    comment: 'AD Nautic - Visserie inox, charnières, passe-coque, vannes',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '~800€/lot', delivery: '7-10j', link: '', reco: true },
      { name: 'Osculati 🇮🇹', price: '~850€/lot', delivery: '7-10j', link: '' },
    ]},
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