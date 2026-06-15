-- IKABAY Sourcing — Migration initiale
-- Crée les 8 tables de l'application
-- Date: 2026-06-15
-- Appliquer avec : supabase migration up

-- ============================================================
-- 1. Produits (catalogue déstockage nautique)
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref TEXT UNIQUE,
  name_fr TEXT NOT NULL,
  name_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'disponible'
    CHECK (status IN ('disponible','a-confirmer','reserve')),
  image_url TEXT,
  unit TEXT DEFAULT 'pc',
  is_price_per_meter BOOLEAN DEFAULT false,
  comment TEXT,
  quantity INTEGER,        -- NULL = à confirmer
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. Demandes de sourcing
-- ============================================================
CREATE TABLE IF NOT EXISTS sourcing_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_phone TEXT,
  client_email TEXT,
  category TEXT,
  description TEXT,
  budget DECIMAL(10,2),
  urgency TEXT CHECK (urgency IN ('faible','moyenne','haute','urgente')),
  quantity INTEGER,
  product_link TEXT,
  destination TEXT,
  delivery_mode TEXT
    CHECK (delivery_mode IN ('express-aerien','maritime-economique','groupage',
           'retrait-local','point-relais','livraison-partenaire')),
  comment TEXT,
  status TEXT NOT NULL DEFAULT 'nouveau'
    CHECK (status IN ('nouveau','a-qualifier','fournisseurs-consultes',
           'devis-envoye','valide','commande','en-transit','livre','archive')),
  kanban_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. Dossiers clients (ex: Jules Defel)
-- ============================================================
CREATE TABLE IF NOT EXISTS client_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_phone TEXT,
  client_email TEXT,
  case_type TEXT,            -- 'sourcing-nautique', 'devis-simple', etc.
  status TEXT DEFAULT 'en-qualification',
  budget DECIMAL(10,2),
  urgency TEXT,
  documents TEXT[],          -- URLs de fichiers
  notes TEXT,
  timeline JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. Devis
-- ============================================================
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT UNIQUE,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  status TEXT DEFAULT 'brouillon'
    CHECK (status IN ('brouillon','envoye','accepte','refuse')),
  items JSONB DEFAULT '[]'::jsonb,
  subtotal DECIMAL(10,2),
  estimated_fees DECIMAL(10,2) DEFAULT 0,
  estimated_margin DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2),
  deposit_amount DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 5. Fournisseurs
-- ============================================================
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  category TEXT,
  notes TEXT,
  status TEXT DEFAULT 'actif'
    CHECK (status IN ('actif','a-tester','risque','eviter')),
  -- Scores individuels (total = 100 max)
  score_price INTEGER CHECK (score_price BETWEEN 0 AND 15),
  score_delay INTEGER CHECK (score_delay BETWEEN 0 AND 15),
  score_reliability INTEGER CHECK (score_reliability BETWEEN 0 AND 15),
  score_quality INTEGER CHECK (score_quality BETWEEN 0 AND 15),
  score_warranty INTEGER CHECK (score_warranty BETWEEN 0 AND 10),
  score_communication INTEGER CHECK (score_communication BETWEEN 0 AND 10),
  score_transport_cost INTEGER CHECK (score_transport_cost BETWEEN 0 AND 10),
  score_margin INTEGER CHECK (score_margin BETWEEN 0 AND 5),
  score_history INTEGER CHECK (score_history BETWEEN 0 AND 5),
  total_score INTEGER GENERATED ALWAYS AS (
    COALESCE(score_price,0) + COALESCE(score_delay,0)
    + COALESCE(score_reliability,0) + COALESCE(score_quality,0)
    + COALESCE(score_warranty,0) + COALESCE(score_communication,0)
    + COALESCE(score_transport_cost,0) + COALESCE(score_margin,0)
    + COALESCE(score_history,0)
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 6. Offres fournisseurs
-- ============================================================
CREATE TABLE IF NOT EXISTS supplier_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  purchase_price DECIMAL(10,2),
  transport_cost DECIMAL(10,2),
  delivery_delay TEXT,
  min_order INTEGER,
  warranty TEXT,
  estimated_margin DECIMAL(10,2),
  recommendation TEXT
    CHECK (recommendation IN ('recommandé','a-tester','risque-moyen','a-eviter')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 7. Logs d'emails
-- ============================================================
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template TEXT,
  recipient TEXT NOT NULL,
  subject TEXT,
  body TEXT,
  status TEXT DEFAULT 'brouillon'
    CHECK (status IN ('brouillon','pret','envoye','relance','repondu','archive')),
  related_type TEXT,    -- 'client-case', 'supplier', 'quote'
  related_id UUID,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 8. Suivi de livraison / Transport
-- ============================================================
CREATE TABLE IF NOT EXISTS delivery_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_name TEXT,
  departure_country TEXT,
  departure_city TEXT,
  carrier TEXT,
  tracking_number TEXT,
  transport_mode TEXT
    CHECK (transport_mode IN ('express-aerien','maritime-economique','groupage',
           'retrait-local','point-relais','livraison-partenaire')),
  estimated_cost DECIMAL(10,2),
  estimated_delay TEXT,
  eta DATE,
  destination TEXT,
  relay_point TEXT,
  status TEXT DEFAULT 'a-recuperer'
    CHECK (status IN ('a-recuperer','en-preparation','en-transit',
           'arrive-martinique','en-controle-douane','en-point-relais','livre')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_sourcing_status ON sourcing_requests(status);
CREATE INDEX IF NOT EXISTS idx_sourcing_kanban ON sourcing_requests(kanban_order);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_suppliers_status ON suppliers(status);
CREATE INDEX IF NOT EXISTS idx_supplier_offers_supplier ON supplier_offers(supplier_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_related ON email_logs(related_type, related_id);
CREATE INDEX IF NOT EXISTS idx_delivery_status ON delivery_tracking(status);
CREATE INDEX IF NOT EXISTS idx_client_cases_status ON client_cases(status);