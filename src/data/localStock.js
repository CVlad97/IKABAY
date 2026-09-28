export const localStockProducts = [
  { reference: '11109', name: 'Trappe de visite blanche Ø14,1', brand: 'Nuova Rade', category: 'Trappes', stock: 15, price: 22.5, description: 'Trappe compacte pour inspection, coffre ou accès technique.', condition: 'Déstockage / occasion' },
  { reference: '11111', name: 'Trappe de visite blanche Ø16,4', brand: 'Nuova Rade', category: 'Trappes', stock: 12, price: 27, description: 'Trappe blanche large pour accès technique et rangement.', condition: 'Déstockage / occasion' },
  { reference: '45175', name: 'Trappe de visite blanche 380x380', brand: 'Nuova Rade', category: 'Trappes', stock: 9, price: 40.5, description: 'Grande trappe amovible pour pont, coffre ou aménagement.', condition: 'Déstockage / occasion' },
  { reference: '196517', name: 'Trappe KROME blanche 370x375', brand: 'Nuova Rade', category: 'Trappes', stock: 5, price: 33.75, description: 'Trappe KROME avec double fermeture.', condition: 'Déstockage / occasion' },
  { reference: '44547', name: 'Aérateur WATER 420x120 blanc', brand: 'Nuova Rade', category: 'Ventilation', stock: 23, price: 45, description: 'Aérateur long format pour coque ou aménagement.', condition: 'Déstockage / occasion' },
  { reference: '54386', name: 'Ventilation coquille 215x180x70 blanc', brand: 'Nuova Rade', category: 'Ventilation', stock: 7, price: 31.5, description: 'Coquille de ventilation blanche pour entrée d’air protégée.', condition: 'Déstockage / occasion' },
  { reference: 'VENT-150SS', name: 'Grille d’aération inox ronde Ø150', brand: 'Sea Ocean', category: 'Ventilation', stock: 5, price: 35.98, description: 'Grille inox ronde pour ventilation marine.', condition: 'Déstockage / occasion' },
  { reference: '30851', name: 'Feu tribord vert 112 mm C12M', brand: 'Lalizas', category: 'Navigation', stock: 12, price: 27, description: 'Feu de navigation tribord vert pour remplacement rapide.', condition: 'Déstockage / occasion' },
  { reference: '97816', name: 'Bouée marqueur torpille Safe Dive', brand: 'Lalizas', category: 'Sécurité marine', stock: 5, price: 27, description: 'Bouée marqueur pour plongée et sécurité.', condition: 'Déstockage / occasion' },
  { reference: '43253', name: 'Passe-coque Ø55 avec soupape Ø50', brand: 'Nuova Rade', category: 'Passe-coques', stock: 23, price: 24.75, description: 'Passe-coque blanc avec soupape et raccord tuyau Ø50.', condition: 'Déstockage / occasion' },
  { reference: '71988', name: 'Pare-battage H6 22x76 blanc/bleu', brand: 'Nuova Rade', category: 'Pare-battages', stock: 10, price: 40.5, description: 'Pare-battage grand format pour protection de coque.', condition: 'Déstockage / occasion' },
  { reference: '72262', name: 'Pare-battage U2 14x50 blanc', brand: 'Nuova Rade', category: 'Pare-battages', stock: 53, price: 40.5, description: 'Pare-battage U2 blanc, format standard.', condition: 'Déstockage / occasion' },
];

export const localStockCategories = [...new Set(localStockProducts.map((product) => product.category))];
