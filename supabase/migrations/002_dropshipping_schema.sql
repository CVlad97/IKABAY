-- IKABAY Sourcing — Migration dropshipping multi-partenaires
-- Tables pour le système de dropshipping low-cost (alternative AutoDS)
-- Date: 2026-06-24

-- ============================================================
-- 1. Sources partenaires (AliExpress, CJ, Alibaba, Europe...)
-- ============================================================
CREATE TABLE IF NOT EXISTS partner_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                          -- ex: 'AliExpress', 'CJ Dropshipping', 'Alibaba 1688'
  type TEXT NOT NULL CHECK (type IN (
    'api','scraped','csv-import','manual','affiliate'
  )),
  base_url TEXT,
  api_key_placeholder TEXT,                    -- placeholder, jamais la vraie clé
  sync_frequency TEXT DEFAULT 'daily' CHECK (sync_frequency IN ('hourly','daily','weekly','manual')),
  margin_percent DECIMAL(5,2) DEFAULT 15.00,  -- marge automatique IKABAY
  fee_percent DECIMAL(5,2) DEFAULT 0,         -- frais du partenaire (ex: 2% pour AliExpress)
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'actif' CHECK (status IN ('actif','en-test','inactif')),
  logo_url TEXT,
  notes TEXT,
  min_moq INTEGER DEFAULT 1,
  avg_delay_days INTEGER,                     -- délai moyen livraison
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. Produits dropshipping (catalogue agrégé des partenaires)
-- ============================================================
CREATE TABLE IF NOT EXISTS partner_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES partner_sources(id),
  source_product_id TEXT,                     -- ID chez le partenaire
  name_fr TEXT NOT NULL,
  name_en TEXT,
  sku TEXT,
  category TEXT,
  subcategory TEXT,
  price_wholesale DECIMAL(10,2) NOT NULL,    -- prix fournisseur (achat)
  price_retail DECIMAL(10,2),                -- prix vente conseillé
  price_ikabay DECIMAL(10,2) GENERATED ALWAYS AS (
    ROUND(price_wholesale * (1 + COALESCE(
      (SELECT margin_percent FROM partner_sources ps WHERE ps.id = source_id),
      15
    ) / 100), 2)
  ) STORED,                                   -- prix vente IKABAY (prix achat + marge)
  currency TEXT DEFAULT 'EUR',
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  shipping_origin TEXT,                       -- pays d'origine
  stock_status TEXT DEFAULT 'disponible' CHECK (stock_status IN ('disponible','rupture','commande','sur-devis')),
  stock_quantity INTEGER DEFAULT 0,
  moq INTEGER DEFAULT 1,                     -- Minimum Order Quantity
  delay_days INTEGER,                        -- délai fournisseur
  weight_kg DECIMAL(8,2),
  dimensions_cm TEXT,                         -- "30x20x15"
  image_url TEXT,
  description TEXT,
  specifications JSONB,                       -- caractéristiques techniques
  tags TEXT[],                                -- mots-clés
  last_sync_at TIMESTAMPTZ,                  -- dernière synchro
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(source_id, source_product_id)
);

-- Index pour la recherche
CREATE INDEX IF NOT EXISTS idx_partner_products_category ON partner_products(category);
CREATE INDEX IF NOT EXISTS idx_partner_products_source ON partner_products(source_id);
CREATE INDEX IF NOT EXISTS idx_partner_products_price ON partner_products(price_wholesale);
CREATE INDEX IF NOT EXISTS idx_partner_products_active ON partner_products(is_active) WHERE is_active = true;

-- ============================================================
-- 3. Commandes dropshipping (lié au client final)
-- ============================================================
CREATE TABLE IF NOT EXISTS partner_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref TEXT UNIQUE NOT NULL,              -- référence IKABAY
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  client_address TEXT,
  destination TEXT DEFAULT 'Martinique',
  
  -- Produits commandés (JSON pour flexibilité)
  items JSONB NOT NULL DEFAULT '[]',
  
  -- Totaux
  total_wholesale DECIMAL(10,2) NOT NULL,     -- total achat
  total_shipping DECIMAL(10,2) DEFAULT 0,     -- frais port total
  total_ikabay_margin DECIMAL(10,2) DEFAULT 0,-- marge IKABAY
  total_retail DECIMAL(10,2) NOT NULL,        -- total vendu au client
  
  -- Source / Fournisseur
  source_id UUID REFERENCES partner_sources(id),
  supplier_name TEXT,
  supplier_order_ref TEXT,                    -- réf chez le fournisseur
  
  -- Statuts
  status TEXT NOT NULL DEFAULT 'en-attente' CHECK (status IN (
    'en-attente','confirme','en-preparation','expedie','en-transit',
    'arrive-pays','en-douane','livre','annule','rembourse'
  )),
  payment_status TEXT DEFAULT 'en-attente' CHECK (payment_status IN (
    'en-attente','paye-fournisseur','recu-client','rembourse'
  )),
  
  -- Tracking
  tracking_number TEXT,
  tracking_url TEXT,
  carrier TEXT,
  estimated_delivery DATE,
  delivered_at TIMESTAMPTZ,
  
  -- Logs
  notes TEXT,
  status_history JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_partner_orders_status ON partner_orders(status);
CREATE INDEX IF NOT EXISTS idx_partner_orders_source ON partner_orders(source_id);
CREATE INDEX IF NOT EXISTS idx_partner_orders_client ON partner_orders(client_name);

-- ============================================================
-- 4. Logs de synchro automatique
-- ============================================================
CREATE TABLE IF NOT EXISTS sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES partner_sources(id),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('running','success','partial','failed')),
  products_count INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]',
  duration_seconds INTEGER
);