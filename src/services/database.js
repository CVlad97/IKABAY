/**
 * IKABAY Sourcing — Database Service Layer
 * Wraps Supabase calls with fallback to local demo data.
 * Toutes les fonctions retournent { data, error }.
 */
import { supabase, hasSupabaseConfig } from '../lib/supabase';

// ─── Fallback data ───────────────────────────────────────
const fallback = {
  products: [],
  sourcing_requests: [
    { id: 'demo-1', client_name: 'Jules Defel', status: 'fournisseurs-consultes', created_at: '2026-06-01', category: 'Sécurité', budget: 500, urgency: 'haute' },
    { id: 'demo-2', client_name: 'Sophie Larcher', status: 'devis-envoye', created_at: '2026-06-03', category: 'Plomberie marine', budget: 200, urgency: 'moyenne' },
    { id: 'demo-3', client_name: 'Club Nautique FM', status: 'valide', created_at: '2026-06-05', category: 'Pavillons', budget: 300, urgency: 'urgente' },
  ],
  client_cases: [
    { id: 'demo-jules', client_name: 'Jules Defel', case_type: 'sourcing-nautique', status: 'en-qualification', budget: 500, urgency: 'haute' },
  ],
  quotes: [
    { id: 'demo-quote-1', quote_number: 'DEV-2026-001', client_name: 'Jules Defel', status: 'brouillon', total: 143.00 },
  ],
  suppliers: [
    { id: 'demo-sup-1', name: 'MarineTech Europe', email: 'jean@marinetech.eu', country: 'France', status: 'actif' },
    { id: 'demo-sup-2', name: 'NauticParts Asia', email: 'li@nauticparts.cn', country: 'Chine', status: 'actif' },
    { id: 'demo-sup-3', name: 'BoatSupply Caraïbes', email: 'marie@boatsupply.mq', country: 'Martinique', status: 'actif' },
  ],
  delivery_tracking: [
    { id: 'demo-track-1', supplier_name: 'MarineTech Europe', status: 'en-transit', eta: '2026-06-28' },
    { id: 'demo-track-2', supplier_name: 'NauticParts Asia', status: 'en-preparation', eta: '2026-07-10' },
  ],
  email_logs: [
    { id: 'demo-email-1', template: 'demande-prix', recipient: 'jean@marinetech.eu', status: 'envoye' },
  ],
  supplier_offers: [],
};

function api(table) {
  return {
    async list(filters = {}, orderBy = 'created_at', ascending = false) {
      if (!hasSupabaseConfig) {
        const data = fallback[table] || [];
        return { data, error: null };
      }
      let query = supabase.from(table).select('*');
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          query = query.eq(k, v);
        }
      });
      query = query.order(orderBy, { ascending });
      const { data, error } = await query;
      if (error) return { data: fallback[table] || [], error };
      return { data, error: null };
    },

    async get(id) {
      if (!hasSupabaseConfig) {
        const row = (fallback[table] || []).find(r => r.id === id);
        return { data: row || null, error: row ? null : { message: 'Not found' } };
      }
      const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
      if (error) return { data: null, error };
      return { data, error: null };
    },

    async create(payload) {
      if (!hasSupabaseConfig) {
        const row = { id: `demo-${Date.now()}`, ...payload, created_at: new Date().toISOString() };
        if (fallback[table]) fallback[table].unshift(row);
        return { data: row, error: null };
      }
      const { data, error } = await supabase.from(table).insert(payload).select().single();
      return { data, error };
    },

    async update(id, payload) {
      if (!hasSupabaseConfig) {
        const idx = (fallback[table] || []).findIndex(r => r.id === id);
        if (idx !== -1) {
          fallback[table][idx] = { ...fallback[table][idx], ...payload, updated_at: new Date().toISOString() };
          return { data: fallback[table][idx], error: null };
        }
        return { data: null, error: { message: 'Not found' } };
      }
      const { data, error } = await supabase.from(table).update(payload).eq('id', id).select().single();
      return { data, error };
    },

    async remove(id) {
      if (!hasSupabaseConfig) {
        fallback[table] = (fallback[table] || []).filter(r => r.id !== id);
        return { data: null, error: null };
      }
      const { error } = await supabase.from(table).delete().eq('id', id);
      return { data: null, error };
    },
  };
}

// ─── Exports ─────────────────────────────────────────────
export const productsApi     = api('products');
export const sourcingApi     = api('sourcing_requests');
export const clientCasesApi  = api('client_cases');
export const quotesApi       = api('quotes');
export const suppliersApi    = api('suppliers');
export const offersApi       = api('supplier_offers');
export const emailLogsApi    = api('email_logs');
export const deliveryApi     = api('delivery_tracking');

// ─── Orders API ────────────────────────────────────────────
export const ordersApi = api('orders');

// ─── Dropshipping APIs ────────────────────────────────────
export const partnerSourcesApi  = api('partner_sources');
export const partnerProductsApi = api('partner_products');
export const partnerOrdersApi   = api('partner_orders');