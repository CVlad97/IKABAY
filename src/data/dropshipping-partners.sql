-- ============================================================
-- Dropshipping — Sources partenaires démo
-- ============================================================
INSERT INTO partner_sources (name, type, base_url, sync_frequency, margin_percent, fee_percent, currency, status, avg_delay_days, notes)
VALUES
('AliExpress', 'api', 'https://www.aliexpress.com/', 'daily', 20, 2, 'EUR', 'en-test', 15,
 'Gros catalogue. API via AliExpress Affiliate. Marge 20% recommandée car frais Ali 2%.'),
('CJ Dropshipping', 'api', 'https://www.cjdropshipping.com/', 'daily', 18, 0, 'EUR', 'en-test', 10,
 'Dropshipping spécialisé. Pas de frais d''abonnement. MOQ 1. Expédition rapide.'),
('Alibaba 1688', 'scraped', 'https://www.1688.com/', 'weekly', 25, 0, 'USD', 'en-test', 25,
 'Fabricants directs Chine. Prix les plus bas. MOQ plus élevé. Nécessite agent.'),
('Grossistes Europe', 'csv-import', '', 'manual', 15, 0, 'EUR', 'en-test', 7,
 'Fournisseurs Europe à intégrer via fichiers CSV. Livraison DOM plus rapide.'),
('Fournisseurs Locaux', 'manual', '', 'manual', 12, 0, 'EUR', 'actif', 3,
 'Partenaires Martinique/Caraïbes. Livraison locale.'),
('AliExpress FR', 'api', 'https://fr.aliexpress.com/', 'daily', 20, 2, 'EUR', 'en-test', 10,
 'Version française AliExpress. Certains produits en entrepôt FR/ES.');

-- ============================================================
-- Dropshipping — Produits partenaires démo
-- ============================================================
INSERT INTO partner_products (source_id, source_product_id, name_fr, name_en, sku, category, price_wholesale, shipping_cost, shipping_origin, stock_status, stock_quantity, moq, delay_days, weight_kg, dimensions_cm, description, tags)
SELECT ps.id, 'AE-HORN-001', 'Corne de brume marine 12V', 'Marine horn 12V', 'DS-HORN-001', 'Sécurité', 5.50, 3.50, 'Chine', 'disponible', 200, 1, 12, 0.35, '15x10x8', 'Corne de brume électrique 12V pour bateau. Conforme COLREG.', ARRAY['corne','brume','12v','sécurité']
FROM partner_sources ps WHERE ps.name = 'AliExpress';

INSERT INTO partner_products (source_id, source_product_id, name_fr, name_en, sku, category, price_wholesale, shipping_cost, shipping_origin, stock_status, stock_quantity, moq, delay_days, weight_kg, dimensions_cm, description, tags)
SELECT ps.id, 'CJ-LIGHT-001', 'Feu de navigation LED 12V', 'Navigation light LED 12V', 'DS-LIGHT-001', 'Éclairage', 4.20, 2.80, 'Chine', 'disponible', 150, 1, 8, 0.20, '12x6x5', 'Feu de navigation LED étanche. Certifié marine grade.', ARRAY['led','navigation','12v','étanche']
FROM partner_sources ps WHERE ps.name = 'CJ Dropshipping';

INSERT INTO partner_products (source_id, source_product_id, name_fr, name_en, sku, category, price_wholesale, shipping_cost, shipping_origin, stock_status, stock_quantity, moq, delay_days, weight_kg, dimensions_cm, description, tags)
SELECT ps.id, '1688-CLEAT-316', 'Taquet inox 316 marine 200mm', 'Marine cleat 316 SS 200mm', 'DS-CLEAT-001', 'Accastillage', 2.10, 4.00, 'Chine', 'disponible', 500, 10, 20, 0.30, '20x8x5', 'Taquet inox 316 poli miroir. Pour bateau.', ARRAY['taquet','inox','316','200mm','accastillage']
FROM partner_sources ps WHERE ps.name = 'Alibaba 1688';

INSERT INTO partner_products (source_id, source_product_id, name_fr, name_en, sku, category, price_wholesale, shipping_cost, shipping_origin, stock_status, stock_quantity, moq, delay_days, weight_kg, dimensions_cm, description, tags)
SELECT ps.id, 'EU-FENDER-H6', 'Pare-battage H6 marine grade', 'Fender H6 marine grade', 'DS-FEND-001', 'Pare-battages', 18.00, 5.00, 'Pays-Bas', 'disponible', 50, 1, 5, 1.20, '60x30x30', 'Pare-battage H6 qualité marine. Livraison rapide DOM.', ARRAY['pare-battage','h6','marine','europe']
FROM partner_sources ps WHERE ps.name = 'Grossistes Europe';

INSERT INTO partner_products (source_id, source_product_id, name_fr, name_en, sku, category, price_wholesale, shipping_cost, shipping_origin, stock_status, stock_quantity, moq, delay_days, weight_kg, dimensions_cm, description, tags)
SELECT ps.id, 'AE-LADDER-4', 'Échelle inox 4 marches marine', 'SS ladder 4 steps marine', 'DS-LADD-001', 'Accastillage', 35.00, 8.00, 'Chine', 'disponible', 100, 1, 15, 4.50, '120x35x10', 'Échelle de bain inox 304, 4 marches antidérapantes.', ARRAY['échelle','inox','4 marches','bateau']
FROM partner_sources ps WHERE ps.name = 'AliExpress FR';

INSERT INTO partner_products (source_id, source_product_id, name_fr, name_en, sku, category, price_wholesale, shipping_cost, shipping_origin, stock_status, stock_quantity, moq, delay_days, weight_kg, dimensions_cm, description, tags)
SELECT ps.id, 'LOCAL-BUOY', 'Bouée de sauvetage complète', 'Lifebuoy complete', 'DS-BUOY-001', 'Sécurité', 22.00, 0, 'Martinique', 'disponible', 20, 1, 2, 1.80, '60x60x15', 'Bouée de sauvetage avec ligne. Stock local Martinique.', ARRAY['bouée','sauvetage','local','martinique']
FROM partner_sources ps WHERE ps.name = 'Fournisseurs Locaux';

INSERT INTO partner_products (source_id, source_product_id, name_fr, name_en, sku, category, price_wholesale, shipping_cost, shipping_origin, stock_status, stock_quantity, moq, delay_days, weight_kg, dimensions_cm, description, tags)
SELECT ps.id, 'CJ-ANCHOR-8', 'Ancre galvanisée 8kg', 'Galvanized anchor 8kg', 'DS-ANCH-001', 'Mouillage', 28.00, 6.00, 'Chine', 'disponible', 80, 1, 10, 8.00, '80x30x10', 'Ancre pliante galvanisée 8kg. Convient bateaux 6-9m.', ARRAY['ancre','galvanisée','8kg','mouillage']
FROM partner_sources ps WHERE ps.name = 'CJ Dropshipping';