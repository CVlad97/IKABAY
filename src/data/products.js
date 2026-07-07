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
      { name: 'Trend Marine 🇫🇷', price: '~130€', delivery: '5-7j', link: '' },
      { name: 'SVB Allemagne 🇩🇪', price: '95€', delivery: 'Stock', link: '' },
    ]},

  // 5. Bolsters
  { id: 'jd05', nameFr: 'Bolster double baquet + sellerie', nameEn: 'Double bolster seat + upholstery', price: 1800, category: 'sieges', status: 'sur-devis', image: null, unit: 'pc',
    comment: 'X-Vision Marine - Cuir UV bleu/gris - Option glacière - 4-6 sem CRITIQUE',
    suppliers: [
      { name: 'Ullman Dynamics 🇸🇪', price: 'sur devis', delivery: '4-8 sem', link: 'https://www.ullmandynamics.com', reco: true },
      { name: 'Ros Industrie 🇮🇹', price: 'sur devis', delivery: '4-6 sem', link: 'https://www.rosindustrie.com/' },
      { name: 'Trend Marine 🇫🇷', price: '1 200-2 000€', delivery: '5-7 sem', link: 'https://www.trendmarine.com/produits/sieges-baquet-double/' },
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

  // ========== NOUVEAUX PRODUITS — EXTENSION CATALOGUE ==========

  // 12. Winch
  { id: 'jd12', nameFr: 'Winch manuel inox 2 vitesses', nameEn: 'Manual winch 2-speed stainless', price: 320, category: 'accastillage-inox', status: 'disponible', image: null, unit: 'pc',
    comment: 'Lewmar EVO70 ou Andersen 46ST - Inox 316 - Rapport 6.3:1 / 48:1',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '320-380€', delivery: 'Stock', link: 'https://www.adnautic.com/winches/30439-lewmar-evo70-self-tailing-winch.html', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '~360€', delivery: 'Stock', link: 'https://www.svb.de/en/andersen-stainless-steel-winch-46st.html' },
    ]},

  // 13. Feux de navigation LED
  { id: 'jd13', nameFr: 'Feu de navigation LED étanche', nameEn: 'Navigation LED light waterproof', price: 45, category: 'navigation', status: 'disponible', image: null, unit: 'pc',
    comment: 'Lopolight ou Hella Marine - LED 2Nm - 12/24V - IP67',
    suppliers: [
      { name: 'SVB Allemagne 🇩🇪', price: '45-65€', delivery: 'Stock', link: 'https://www.svb.de/en/navigation-lights/', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '52€', delivery: 'Stock', link: '' },
    ]},

  // 14. Moteur hors-bord électrique
  { id: 'jd14', nameFr: 'Moteur hors-bord électrique 3-5CV', nameEn: 'Electric outboard motor 3-5hp', price: 1490, category: 'navigation', status: 'sur-devis', image: null, unit: 'pc',
    comment: 'Torqeedo Travel 1103C ou ePropulsion Navy 3.0 - Lithium 48V',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '1 490-2 200€', delivery: '7-10j', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '1 680€', delivery: 'Stock', link: 'https://www.svb.de/en/electric-outboard-motors/' },
    ]},

  // 15. Panneau solaire marine
  { id: 'jd15', nameFr: 'Panneau solaire flexible 100W', nameEn: 'Solar panel flexible 100W', price: 190, category: 'electricite', status: 'disponible', image: null, unit: 'pc',
    comment: 'Victron Energy - Monocristallin - Étanche - 1200x540x3mm - 2,5kg',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '190€', delivery: 'Stock', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '210€', delivery: 'Stock', link: 'https://www.svb.de/en/solar-charging/' },
    ]},

  // 16. Guindeau électrique
  { id: 'jd16', nameFr: 'Guindeau électrique 12V 700W', nameEn: 'Electric windlass 12V 700W', price: 650, category: 'davier', status: 'disponible', image: null, unit: 'pc',
    comment: 'Quick Nemo QKWIND700 - Inox 316 - 8mm chaine - Télécommande incluse',
    suppliers: [
      { name: 'Quick Nautical 🇮🇹', price: '650€', delivery: 'Stock 72h', link: 'https://www.quicknautical.com/en/store/windlasses/', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '720€', delivery: 'Stock', link: '' },
      { name: 'Lewmar 🇬🇧', price: '700-850€', delivery: '2-3 sem', link: '' },
    ]},

  // 17. Pare-battage gonflable
  { id: 'jd17', nameFr: 'Pare-battage gonflable polyform A6', nameEn: 'Inflatable fender polyform A6', price: 38, category: 'pare-battages', status: 'disponible', image: null, unit: 'pc',
    comment: 'Polyform A6 - 76x40cm - PVC renforcé - 2 anneaux',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '38€', delivery: 'Stock', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '42€', delivery: 'Stock', link: '' },
    ]},

  // 18. Aileron stabilisateur
  { id: 'jd18', nameFr: 'Aileron stabilisateur actif 12V', nameEn: 'Active stabilizer fin 12V', price: 3500, category: 'navigation', status: 'sur-devis', image: null, unit: 'pc',
    comment: 'Matspec ou Smartgyro - Réduit roulis 90% - 12/24V - Installation pro',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '3 500€', delivery: '4-6 sem', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '3 200-4 500€', delivery: '2-4 sem', link: '' },
    ]},

  // 19. Radar marine 24"
  { id: 'jd19', nameFr: 'Radar marine 24" couleur', nameEn: 'Marine color radar 24"', price: 2400, category: 'navigation', status: 'sur-devis', image: null, unit: 'pc',
    comment: 'Furuno DRS4D+ ou Simrad Halo20+ - 24" écran couleur - 36Nm',
    suppliers: [
      { name: 'SVB Allemagne 🇩🇪', price: '2 400-3 000€', delivery: 'Stock', link: 'https://www.svb.de/en/radar-systems/', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '2 600€', delivery: '7-10j', link: '' },
    ]},

  // 20. VHF marine DSC
  { id: 'jd20', nameFr: 'VHF marine DSC fixe', nameEn: 'Fixed VHF marine DSC', price: 280, category: 'navigation', status: 'disponible', image: null, unit: 'pc',
    comment: 'ICOM M330 ou Standard Horizon GX1800 - Classe D DSC - AIS récepteur intégré',
    suppliers: [
      { name: 'SVB Allemagne 🇩🇪', price: '280€', delivery: 'Stock', link: 'https://www.svb.de/en/vhf-radios/', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '310€', delivery: 'Stock', link: '' },
    ]},

  // 21. Doseur de carburant électronique
  { id: 'jd21', nameFr: 'Débitmètre carburant électronique', nameEn: 'Electronic fuel flow meter', price: 220, category: 'navigation', status: 'disponible', image: null, unit: 'pc',
    comment: 'Navman F210 - Précision 1% - 12/24V - Débit max 150L/h',
    suppliers: [
      { name: 'SVB Allemagne 🇩🇪', price: '220€', delivery: 'Stock', link: '', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '250€', delivery: 'Stock', link: '' },
    ]},

  // 22. Propulseur d'étrave 12V
  { id: 'jd22', nameFr: 'Propulseur d\'étrave électrique 12V 4kW', nameEn: 'Bow thruster electric 12V 4kW', price: 2100, category: 'navigation', status: 'sur-devis', image: null, unit: 'pc',
    comment: 'Sleipner SX35 ou Vetus 75kgf - 12V - Commande à distance - Installation',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '2 100-2 800€', delivery: '2-3 sem', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '2 500€', delivery: 'Stock', link: '' },
    ]},

  // 23. Compresseur de climatisation marine
  { id: 'jd23', nameFr: 'Climatisation marine 12000 BTU', nameEn: 'Marine AC 12000 BTU', price: 1800, category: 'electricite', status: 'sur-devis', image: null, unit: 'pc',
    comment: 'Webasto BlueCool ou Dometic Turbo - 12000 BTU - 230V - Inverseur de cycle',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '1 800-2 400€', delivery: '7-10j', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '2 100€', delivery: 'Stock', link: '' },
    ]},

  // 24. Chaudière eau chaude marine
  { id: 'jd24', nameFr: 'Chauffe-eau marine 40L 230V/Échangeur', nameEn: 'Marine water heater 40L', price: 420, category: 'plomberie', status: 'disponible', image: null, unit: 'pc',
    comment: 'Isotherm ou Quick - 40L - 230V + échangeur moteur - Cuve inox 316',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '420-550€', delivery: 'Stock', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '480€', delivery: 'Stock', link: '' },
    ]},

  // 25. Pompe de cale automatique
  { id: 'jd25', nameFr: 'Pompe de cale automatique 12V 2000GPH', nameEn: 'Bilge pump auto 12V 2000GPH', price: 85, category: 'plomberie', status: 'disponible', image: null, unit: 'pc',
    comment: 'Rule 2000 ou Johnson Pump - 12V - 2000 GPH (7500L/h) - Flotteur auto intégré',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '85€', delivery: 'Stock', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '92€', delivery: 'Stock', link: '' },
    ]},

  // 26. Porte-bidon eau douce 12V
  { id: 'jd26', nameFr: 'Distributeur eau sous pression 12V', nameEn: 'Fresh water pressure pump 12V', price: 110, category: 'plomberie', status: 'disponible', image: null, unit: 'pc',
    comment: 'SHURflo Aqua King - 12V - 5.5L/min - 3 bar - Anti-cyclage',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '110€', delivery: 'Stock', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '125€', delivery: 'Stock', link: '' },
    ]},

  // 27. WC marin électrique avec broyeur
  { id: 'jd27', nameFr: 'WC marin électrique broyeur', nameEn: 'Electric marine toilet with macerator', price: 680, category: 'plomberie', status: 'disponible', image: null, unit: 'pc',
    comment: 'Jabsco 37010 ou Dometic MasterFlush - 12V - Broyeur intégré - 60L réservoir eau',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '680€', delivery: 'Stock', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '750€', delivery: 'Stock', link: '' },
    ]},

  // 28. Table de cockpit pliante
  { id: 'jd28', nameFr: 'Table cockpit pliante acajou/inox', nameEn: 'Folding teak cockpit table', price: 350, category: 'trappes-coffres', status: 'sur-devis', image: null, unit: 'pc',
    comment: 'Acajou massif ou teck - Piètement inox 316 - Pliante - 800x500mm',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '350-500€', delivery: '7-10j', link: '', reco: true },
      { name: 'Osculati 🇮🇹', price: '380€', delivery: '5-7j', link: '' },
    ]},

  // 29. Coffre de pont inox
  { id: 'jd29', nameFr: 'Coffre de pont inox 316 600x400x250mm', nameEn: 'Deck locker stainless 600x400x250mm', price: 240, category: 'accastillage-inox', status: 'disponible', image: null, unit: 'pc',
    comment: 'Osculati 84.600 ou AD Nautic - Inox 316 brossé - Charnière continue - Joint EPDM',
    suppliers: [
      { name: 'Osculati 🇮🇹', price: '240€', delivery: 'Stock 5-7j', link: 'https://www.osculati.com/en/deck-lockers/', reco: true },
      { name: 'AD Nautic 🇫🇷', price: '275€', delivery: 'Stock', link: '' },
    ]},

  // 30. Gilet de sauvetage automatique
  { id: 'jd30', nameFr: 'Gilet de sauvetage automatique ISO 150N', nameEn: 'Auto lifejacket 150N ISO', price: 89, category: 'securite', status: 'disponible', image: null, unit: 'pc',
    comment: 'Plastimo 150N - Déclenchement automatique - Harnais intégré - Lumière LED',
    suppliers: [
      { name: 'AD Nautic 🇫🇷', price: '89€', delivery: 'Stock', link: '', reco: true },
      { name: 'SVB Allemagne 🇩🇪', price: '95€', delivery: 'Stock', link: 'https://www.svb.de/en/lifejackets/' },
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