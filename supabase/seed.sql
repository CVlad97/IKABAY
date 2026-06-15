-- IKABAY Sourcing — Données de démonstration
-- À exécuter après la migration 001_initial_schema.sql
-- Via : supabase db seed supabase/seed.sql

-- ============================================================
-- Produits déstockage (19 produits du PDF)
-- ============================================================
INSERT INTO products (ref, name_fr, name_en, price, category, status, unit, is_price_per_meter) VALUES
('DK-001', 'Corne de brume', 'Signal horn', 12, 'Sécurité', 'disponible', 'pc', false),
('DK-002', 'Dry briefcase', 'Dry briefcase', 10, 'Accessoires', 'disponible', 'pc', false),
('DK-003', 'Drapeau français 20x30', 'Boat Flag France 20x30', 5, 'Pavillons', 'disponible', 'pc', false),
('DK-004', 'Drapeau français 30x45', 'French Flag 30x45', 8, 'Pavillons', 'disponible', 'pc', false),
('DK-005', 'Drapeau français 50x75', 'French Flag 50x75', 12, 'Pavillons', 'disponible', 'pc', false),
('DK-006', 'Trappe de visite blanche', 'Inspection hatch white', 20, 'Trappes / coffres', 'disponible', 'pc', false),
('DK-007', 'Feu flottant automatique', 'Floating light auto switch', 24, 'Sécurité', 'disponible', 'pc', false),
('DK-008', 'Boîtier remplissage de pont', 'Deck filler case', 30, 'Plomberie marine', 'disponible', 'pc', false),
('DK-009', 'Boîtier de douche blanc', 'Case for shower', 18, 'Plomberie marine', 'disponible', 'pc', false),
('DK-010', 'Trappe de pont KROME', 'KROME hatch', 30, 'Trappes / coffres', 'disponible', 'pc', false),
('DK-011', 'Capteur réservoir eau douce / eaux usées', 'Tank sensor', 35, 'Électricité marine', 'disponible', 'pc', false),
('DK-012', 'Jauge de niveau 12/24V', 'Level gauge 12/24V', 25, 'Électricité marine', 'disponible', 'pc', false),
('DK-013', 'Pare-battage renforcé', 'Heavy duty fender', 35, 'Pare-battages / bouées', 'disponible', 'pc', false),
('DK-014', 'Volant bateau 350 mm', 'Steering wheel 350mm', 70, 'Pilotage', 'disponible', 'pc', false),
('DK-015', 'Ancre pliante galvanisée', 'Folding anchor galvanized', 70, 'Mouillage', 'disponible', 'pc', false),
('DK-016', 'Treuil manuel remorque', 'Manual trailer winch', 35, 'Remorque / treuil', 'disponible', 'pc', false),
('DK-017', 'Roue jockey télescopique', 'Telescopic jockey wheel', 35, 'Remorque / treuil', 'disponible', 'pc', false),
('DK-018', 'Tuyau marin PVC renforcé 38 mm', 'Reinforced PVC marine hose 38mm', 15, 'Plomberie marine', 'disponible', 'm', true),
('DK-019', 'Aussière d''amarrage polyester noire', 'Double-twist mooring rope', 7, 'Mouillage', 'disponible', 'm', true);

-- ============================================================
-- Fournisseurs démo
-- ============================================================
INSERT INTO suppliers (name, contact, email, phone, country, category, status,
  score_price, score_delay, score_reliability, score_quality, score_warranty,
  score_communication, score_transport_cost, score_margin, score_history)
VALUES
('MarineTech Europe', 'Jean Dupont', 'jean@marinetech.eu', '+33 1 23 45 67 89',
 'France', 'Accastillage', 'actif',
 12, 13, 14, 13, 8, 9, 7, 4, 4),
('NauticParts Asia', 'Li Wei', 'li@nauticparts.cn', '+86 21 1234 5678',
 'Chine', 'Électronique marine', 'actif',
 14, 10, 11, 12, 7, 7, 8, 5, 3),
('BoatSupply Caraïbes', 'Marie-Ange', 'marie@boatsupply.mq', '+596 696 12 34 56',
 'Martinique', 'Quincaillerie', 'actif',
 10, 14, 13, 12, 9, 10, 9, 3, 5),
('SeaPro BV', 'Pieter van den Berg', 'pieter@seapro.nl', '+31 10 234 5678',
 'Pays-Bas', 'Mouillage', 'a-tester',
 11, 9, 10, 11, 6, 7, 6, 4, 2);

-- ============================================================
-- Demandes sourcing démo
-- ============================================================
INSERT INTO sourcing_requests (client_name, client_phone, client_email, category,
  description, budget, urgency, quantity, destination, delivery_mode, status)
VALUES
('Jules Defel', '+596 696 00 00 01', 'jules.defel@email.mq',
 'Sécurité', 'Recherche feux de navigation LED homologués pour bateau de 12m',
 500, 'haute', 4, 'Le Marin', 'express-aerien', 'fournisseurs-consultes'),
('Sophie Larcher', '+596 696 00 00 02', 'sophie.larcher@email.mq',
 'Plomberie marine', 'Besoin de tuyaux PVC marine 38mm et raccords inox',
 200, 'moyenne', 10, 'Fort-de-France', 'maritime-economique', 'devis-envoye'),
('Club Nautique FM', '+596 696 00 00 03', 'clubfm@email.mq',
 'Pavillons', 'Drapeaux France 50x75 x20 pour événement',
 300, 'urgente', 20, 'Ducos', 'retrait-local', 'valide'),
('Philippe Abraham', '+596 696 00 00 04', 'p.abraham@email.mq',
 'Électricité marine', 'Capteurs réservoir et jauges 12V pour catamaran',
 400, 'moyenne', 6, 'Rivière-Pilote', 'maritime-economique', 'nouveau');

-- ============================================================
-- Dossier client démo — Jules Defel
-- ============================================================
INSERT INTO client_cases (client_name, client_phone, client_email, case_type, status,
  budget, urgency, notes, timeline)
VALUES
('Jules Defel', '+596 696 00 00 01', 'jules.defel@email.mq',
 'sourcing-nautique', 'en-qualification', 500, 'haute',
 'Dossier sourcing nautique / accessoires bateau. Client référent.',
 '[{"event": "Demande reçue", "date": "2026-06-01", "status": "done"},
   {"event": "Analyse stock", "date": "2026-06-02", "status": "done"},
   {"event": "Recherche fournisseurs", "date": "2026-06-05", "status": "done"},
   {"event": "RFQ envoyée", "date": "2026-06-08", "status": "done"},
   {"event": "Offres reçues", "date": "2026-06-12", "status": "active"},
   {"event": "Comparaison", "date": null, "status": "pending"},
   {"event": "Devis envoyé", "date": null, "status": "pending"},
   {"event": "Validation client", "date": null, "status": "pending"},
   {"event": "Paiement / acompte", "date": null, "status": "pending"},
   {"event": "Commande", "date": null, "status": "pending"},
   {"event": "Transport", "date": null, "status": "pending"},
   {"event": "Livraison", "date": null, "status": "pending"},
   {"event": "Clôture", "date": null, "status": "pending"}]'::jsonb);

-- ============================================================
-- Devis démo
-- ============================================================
INSERT INTO quotes (quote_number, client_name, client_email, client_phone, status,
  items, subtotal, estimated_fees, estimated_margin, total, deposit_amount, notes)
VALUES
('DEV-2026-001', 'Jules Defel', 'jules.defel@email.mq', '+596 696 00 00 01', 'brouillon',
  '[{"product":"Feu tribord vert LED","quantity":2,"unit_price":22,"purchase_price":14,"margin":36,"total":44},
    {"product":"Feu bâbord rouge LED","quantity":2,"unit_price":22,"purchase_price":14,"margin":36,"total":44},
    {"product":"Support bouée de sauvetage","quantity":2,"unit_price":15,"purchase_price":9,"margin":40,"total":30}]'::jsonb,
  118.00, 25.00, 43.00, 143.00, 50.00,
  'Devis sous réserve de disponibilité, confirmation fournisseur et validation finale du client.');

-- ============================================================
-- Suivi livraison démo
-- ============================================================
INSERT INTO delivery_tracking (supplier_name, departure_country, departure_city,
  carrier, tracking_number, transport_mode, estimated_cost, estimated_delay, eta,
  destination, relay_point, status)
VALUES
('MarineTech Europe', 'France', 'Marseille', 'CMA CGM', 'CMAU2026061501',
 'maritime-economique', 85.00, '12-15 jours', '2026-06-28', 'Martinique', 'Fort-de-France', 'en-transit'),
('NauticParts Asia', 'Chine', 'Shanghai', 'Maersk', 'MAEU2026061502',
 'maritime-economique', 120.00, '25-30 jours', '2026-07-10', 'Martinique', 'Ducos', 'en-preparation'),
('BoatSupply Caraïbes', 'Martinique', 'Le Lamentin', 'Chronopost', 'CHR9720615',
 'point-relais', 12.00, '24h', '2026-06-16', 'Martinique', 'Sainte-Luce', 'arrive-martinique');

-- ============================================================
-- Logs email démo
-- ============================================================
INSERT INTO email_logs (template, recipient, subject, body, status, related_type, related_id)
VALUES
('demande-prix', 'jean@marinetech.eu',
 'Demande de prix — Ikabay Sourcing — Feux navigation LED',
 'Bonjour, je vous contacte pour une demande de prix...', 'envoye', 'supplier',
 (SELECT id FROM suppliers WHERE email = 'jean@marinetech.eu')),
('devis', 'jules.defel@email.mq',
 'Votre devis Ikabay Sourcing — DEV-2026-001',
 'Bonjour Jules, veuillez trouver ci-joint votre devis...', 'pret', 'client-case',
 (SELECT id FROM client_cases WHERE client_email = 'jules.defel@email.mq')),
('relance', 'li@nauticparts.cn',
 'Relance — Demande de prix Ikabay Sourcing',
 'Bonjour, suite à notre précédent message...', 'relance', 'supplier',
 (SELECT id FROM suppliers WHERE email = 'li@nauticparts.cn'));