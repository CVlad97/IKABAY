export const sourcingMailbox = {
  official: 'sourcing@ikabay.store',
  operational: 'sourcing@ikabay.store',
  note: "sourcing@ikabay.store est l'adresse cible, mais l'envoi opérationnel actuel est sourcing@ikabay.store tant que l'auth SMTP Hostinger n'est pas corrigée.",
};

export const exactOrderLines = [
  { lot: 'Critique Europe', family: 'Compas magnétique', qty: '5 pcs', exactSpec: '135 mm minimum, 150 mm idéal, fiche technique obligatoire', preferred: 'Comptoir Nautique / Plastimo', status: 'RFQ envoyée' },
  { lot: 'Critique Europe', family: 'Liston PVC prépercé', qty: '60 m + option 66 m', exactSpec: 'PVC marine, largeur 55 mm / 5,5 cm, barres de 6 m, prépercé, photo + coupe obligatoires', preferred: 'Osculati', status: 'RFQ envoyée' },
  { lot: 'Critique Europe', family: 'Liseret compatible', qty: '100 m cible', exactSpec: 'Compatible avec liston retenu, rouleaux de 20 m souhaités', preferred: 'Osculati', status: 'RFQ envoyée' },
  { lot: 'Critique Europe', family: 'Embouts inox liston', qty: '20 / 40 pcs option', exactSpec: 'Embouts/capuchons/jonctions inox 316 compatibles liston retenu, visserie incluse', preferred: 'Osculati', status: 'RFQ envoyée' },
  { lot: 'Critique Europe', family: 'Hublots inox/alu', qty: '10 pcs', exactSpec: '150 × 365 mm max, dimensions extérieures + découpe à confirmer, joint EPDM', preferred: 'Osculati 81.502 / alternative Gebo', status: 'RFQ envoyée' },
  { lot: 'Qualité France/Europe', family: 'Bolster / siège baquet double', qty: '5 pcs', exactSpec: 'Version simple/double, avec ou sans glacière, avec ou sans porte-gobelet, sellerie marine UV', preferred: 'X-Vision / Trend Marine / Pompanette', status: 'À relancer' },
  { lot: 'Qualité France/Europe', family: 'Sellerie bleu/gris + gris premium', qty: 'base 5 bateaux', exactSpec: 'Facile à laver, non salissante, UV/sel, échantillon physique obligatoire', preferred: 'X-Vision / sellier FR', status: 'À relancer' },
  { lot: 'Europe/USA', family: 'Davier / bow roller', qty: '5 pcs', exactSpec: 'Pour ancre 8 kg, support 10 kg max, inox, plan de montage', preferred: 'Quick Nemo 10 / Mantus', status: 'RFQ envoyée' },
  { lot: 'Chine inox standard', family: 'Échelle inox 4 marches', qty: '10 pcs', exactSpec: 'Largeur 30 cm, inox 316, fixation complète, photo + fiche', preferred: 'Alastin / Osculati backup', status: 'RFQ envoyée' },
  { lot: 'Chine inox standard', family: 'Taquets inox 200 mm', qty: '35 pcs', exactSpec: 'Inox 316/316L, poli miroir, base 4 trous, plan perçage', preferred: 'Alastin', status: 'RFQ envoyée' },
  { lot: 'Chine inox standard', family: 'Loquets avec clé', qty: '20 pcs', exactSpec: 'Inox 316, serrure marine, plan de découpe obligatoire', preferred: 'Wudi Xinxiangju', status: 'RFQ envoyée' },
  { lot: 'Chine inox standard', family: 'Loquets sans clé', qty: '20 pcs', exactSpec: 'Inox 316, même format si possible, plan de découpe obligatoire', preferred: 'Wudi Xinxiangju', status: 'RFQ envoyée' },
  { lot: 'Chine inox standard', family: 'Porte-gobelets inox', qty: '20 pcs', exactSpec: 'Inox 316, Ø75–90 mm, encastré/flush mount', preferred: 'Alastin', status: 'RFQ envoyée' },
  { lot: 'À ventiler', family: 'Quincaillerie / plomberie / menuiserie', qty: 'à confirmer', exactSpec: 'Charnières, manilles, visserie, passe-coques, plomberie, menuiserie ligne par ligne', preferred: 'Osculati + Chine selon criticité', status: 'À compléter' },
];

export const sentRfqs = [
  { supplier: 'Osculati', to: 'info@osculati.com', subject: 'RFQ - Liston PVC 55 mm + liseret + hublots + embouts inox - Export Martinique', sentAt: '2026-07-03 17:03 UTC', account: 'sourcing@ikabay.store', scope: 'Liston 55 mm, liseret, embouts inox, hublots, échelles, taquets, loquets, porte-gobelets', status: 'Envoyé' },
  { supplier: 'Alastin Marine / Qingdao', to: 'andyzhang@alastin-marine.com', subject: 'RFQ - SS316 marine hardware exact order - cleats ladders cup holders - Caribbean supply', sentAt: '2026-07-28 19:02 UTC', account: 'sourcing@ikabay.store', scope: 'Taquets, échelles, porte-gobelets, manilles, visserie inox 316', status: 'Envoyé' },
  { supplier: 'Wudi Xinxiangju', to: 'sdwdxincheng@163.com', subject: 'RFQ - SS316 marine flush latches exact order - with and without key', sentAt: '2026-07-28 19:02 UTC', account: 'sourcing@ikabay.store', scope: 'Loquets inox avec/sans clé + charnières option', status: 'Envoyé' },
  { supplier: 'Quick Group', to: 'info@quickgroup.com', subject: 'RFQ - Bow Roller Nemo 10 QKANEMO10 x5 - exact quote Martinique', sentAt: '2026-07-28 19:02 UTC', account: 'sourcing@ikabay.store', scope: 'Davier Quick Nemo 10 x5', status: 'Envoyé' },
  { supplier: 'Mantus Marine', to: 'info@mantusanchors.com', subject: 'RFQ - Bow roller for 8 kg anchor - 5 units - exact quote Caribbean delivery', sentAt: '2026-07-28 19:03 UTC', account: 'sourcing@ikabay.store', scope: 'Bow roller / davier pour ancre 8 kg', status: 'Envoyé' },
  { supplier: 'Comptoir Nautique', to: 'contact@comptoirnautique.fr', subject: 'Demande de devis - Compas Plastimo 135/150 mm x5 - Export Martinique', sentAt: '2026-07-28 19:03 UTC', account: 'sourcing@ikabay.store', scope: 'Compas Plastimo Contest 150 / Neptune 135 x5', status: 'Envoyé' },
];

export const supplierScores = [
  { supplier: 'Osculati', zone: 'Italie / Europe', price: 14, landed: 22, delay: 13, quality: 19, reliability: 19, total: 87, badge: 'Recommandé', note: 'Socle catalogue Europe pour liston/hublots/quincaillerie. Photos/fiches obligatoires.' },
  { supplier: 'Quick Group', zone: 'Italie', price: 15, landed: 20, delay: 13, quality: 20, reliability: 18, total: 86, badge: 'Recommandé', note: 'Davier Nemo 10 très pertinent si stock confirmé.' },
  { supplier: 'Comptoir Nautique', zone: 'France', price: 12, landed: 20, delay: 14, quality: 19, reliability: 17, total: 82, badge: 'Recommandé', note: 'Bon fournisseur compas Plastimo en prix HT export DOM.' },
  { supplier: 'Mantus Marine', zone: 'USA', price: 13, landed: 17, delay: 10, quality: 20, reliability: 18, total: 78, badge: 'À tester', note: 'Qualité forte, mais transport USA à confirmer.' },
  { supplier: 'Alastin Marine', zone: 'Chine / Qingdao', price: 19, landed: 18, delay: 8, quality: 14, reliability: 15, total: 74, badge: 'À tester', note: 'Excellent prix potentiel, dépend du MOQ réel et certificat 316.' },
  { supplier: 'Wudi Xinxiangju', zone: 'Chine / Wudi', price: 18, landed: 16, delay: 8, quality: 13, reliability: 14, total: 69, badge: 'Risque moyen', note: 'Utile pour loquets, risque MOQ + validation qualité.' },
];

export const blockingPoints = [
  { severity: 'P0', title: 'sourcing@ikabay.store non opérationnel SMTP', action: 'Réinitialiser/créer correctement l’adresse puis changer le mot de passe post-envoi.' },
  { severity: 'P0', title: 'Liston PVC 55 mm exact', action: 'Refuser toute proposition différente sans photo, coupe et validation de montage.' },
  { severity: 'P1', title: 'Hublots 150 × 365 mm', action: 'Valider dimensions extérieures et dimensions de découpe avant commande.' },
  { severity: 'P1', title: 'MOQ Chine', action: 'Calculer le coût réel au MOQ, pas à la quantité besoin.' },
  { severity: 'P1', title: 'Sellerie / bolsters', action: 'Exiger échantillon physique bleu/gris + gris premium avant commande.' },
  { severity: 'P2', title: 'Quincaillerie / plomberie / menuiserie', action: 'Ventiler ligne par ligne avec quantités exactes.' },
];

export const logisticsScenarios = [
  {
    name: 'Économique',
    strategy: 'Chine maximum pour inox standard, Europe seulement pour produits critiques.',
    purchase: 14500,
    transport: 1900,
    duties: 1300,
    total: 17700,
    delay: '10–14 semaines',
    risk: 'Élevé',
    color: '#dc2626',
    note: 'Ne devient intéressant que si Alastin/Wudi acceptent petits MOQ ou échantillons rapides.',
  },
  {
    name: 'Équilibré',
    strategy: 'Europe pour liston/hublots/compas/davier, Chine seulement si MOQ réel adapté.',
    purchase: 15950,
    transport: 1200,
    duties: 850,
    total: 18000,
    delay: '8–10 semaines',
    risk: 'Faible à moyen',
    color: '#0f766e',
    note: 'Scénario recommandé tant qu’on attend les réponses Chine.',
  },
  {
    name: 'Rapide',
    strategy: 'Tout Europe/France/Italie, zéro Chine sauf accessoires secondaires.',
    purchase: 16900,
    transport: 1000,
    duties: 300,
    total: 18200,
    delay: '5–7 semaines',
    risk: 'Faible',
    color: '#2563eb',
    note: 'Le plus fiable si le chantier doit avancer vite.',
  },
];

export const martiniqueCostDefaults = {
  eurToUsd: 1.08,
  insurancePct: 1.8,
  martiniqueVatPct: 8.5,
  importDutyPct: 3,
  geodisFileFee: 180,
  finalDelivery: 220,
  europeLclPerCbm: 520,
  chinaLclPerCbmUsd: 480,
  chinaLclMinCbm: 2,
  airPerKg: 7,
};

export function computeLandedCost({
  purchase = 0,
  cbm = 0,
  weightKg = 0,
  origin = 'europe',
  mode = 'maritime',
  supplierFees = 0,
  marginPct = 0,
}) {
  const p = Number(purchase) || 0;
  const volume = Number(cbm) || 0;
  const weight = Number(weightKg) || 0;
  const fees = Number(supplierFees) || 0;
  const margin = Number(marginPct) || 0;
  const d = martiniqueCostDefaults;

  let freight = 0;
  if (mode === 'air') {
    freight = weight * d.airPerKg;
  } else if (origin === 'china') {
    freight = Math.max(volume, d.chinaLclMinCbm) * d.chinaLclPerCbmUsd / d.eurToUsd;
  } else {
    freight = Math.max(volume, 0.5) * d.europeLclPerCbm;
  }

  const insurance = (p + freight) * (d.insurancePct / 100);
  const importTaxes = origin === 'china' ? (p + freight + insurance) * ((d.martiniqueVatPct + d.importDutyPct) / 100) : 0;
  const landedBeforeMargin = p + fees + freight + insurance + importTaxes + d.geodisFileFee + d.finalDelivery;
  const marginValue = landedBeforeMargin * (margin / 100);
  const finalPrice = landedBeforeMargin + marginValue;

  return {
    purchase: p,
    supplierFees: fees,
    freight,
    insurance,
    importTaxes,
    fileFee: d.geodisFileFee,
    finalDelivery: d.finalDelivery,
    landedBeforeMargin,
    marginValue,
    finalPrice,
  };
}
