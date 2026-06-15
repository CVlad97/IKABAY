import { useState, useMemo } from 'react';
import {
  Search, Filter, SlidersHorizontal, ShoppingCart, MessageCircle,
  Tag, AlertCircle, Image
} from 'lucide-react';
import { products, categories, searchProducts, formatPrice } from '../data/products';
import { WHATSAPP_URL, waMessage } from '../utils/constants';

const statusConfig = {
  disponible: { label: 'Disponible', color: '#16a34a', bg: '#dcfce7' },
  'a-confirmer': { label: 'À confirmer', color: '#ea580c', bg: '#fff7ed' },
  reserve: { label: 'Réservé', color: '#dc2626', bg: '#fef2f2' },
};

export function DestockagePage() {
  const [query, setQuery] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sort, setSort] = useState('');
  const [quantities, setQuantities] = useState({});

  const filtered = useMemo(() => {
    let result = query ? searchProducts(query) : [...products];

    if (catFilter) {
      result = result.filter(p => p.category === catFilter);
    }

    if (priceMin !== '') {
      const min = parseFloat(priceMin);
      result = result.filter(p => p.price === 0 || p.price >= min);
    }
    if (priceMax !== '') {
      const max = parseFloat(priceMax);
      result = result.filter(p => p.price > 0 && p.price <= max);
    }

    if (sort === 'price-asc') result.sort((a, b) => (a.price || 999999) - (b.price || 999999));
    else if (sort === 'price-desc') result.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sort === 'name') result.sort((a, b) => a.nameFr.localeCompare(b.nameFr));

    return result;
  }, [query, catFilter, priceMin, priceMax, sort]);

  const handleQty = (id, val) => {
    const n = parseInt(val) || 0;
    setQuantities(prev => ({ ...prev, [id]: n < 0 ? 0 : n }));
  };

  const waReserveMsg = (p, qty) =>
    waMessage(`Bonjour Ikabay, je souhaite réserver :\n- ${p.nameFr} (${formatPrice(p.price)})\nQuantité : ${qty || 1}\nMerci de me confirmer la disponibilité.`);

  return (
    <section className="pageSection">
      <div className="badge" style={{ marginBottom: 12 }}>Inventaire</div>
      <h1>Déstockage nautique</h1>
      <p style={{ marginBottom: 24 }}>
        Consultez les lots disponibles à prix coûtant. {filtered.length} produit{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}.
      </p>
      <p style={{ fontSize: 13, color: '#60716f', marginBottom: 24 }}>
        Contact : <a href="mailto:sourcing@ikabay.store" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>sourcing@ikabay.store</a>
      </p>

      {/* ─── FILTERS BAR ─── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24,
        background: 'rgba(255,255,255,0.85)', borderRadius: 20, padding: 16,
        border: '1px solid rgba(16,32,34,0.1)'
      }}>
        {/* Search */}
        <div style={{ flex: '1 1 220px', display: 'flex', alignItems: 'center', gap: 8,
          background: 'white', border: '1px solid rgba(16,32,34,0.13)', borderRadius: 14,
          padding: '0 14px', minHeight: 48 }}>
          <Search size={18} color="#60716f" />
          <input
            placeholder="Rechercher par nom (FR/EN)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ border: 0, outline: 'none', width: '100%', background: 'transparent' }}
          />
        </div>

        {/* Category */}
        <div style={{ flex: '0 1 200px', display: 'flex', alignItems: 'center', gap: 6,
          background: 'white', border: '1px solid rgba(16,32,34,0.13)', borderRadius: 14,
          padding: '0 10px', minHeight: 48 }}>
          <Filter size={16} color="#60716f" />
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            style={{ border: 0, outline: 'none', width: '100%', background: 'transparent',
              minHeight: 46, fontWeight: 600, fontSize: 14 }}
          >
            <option value="">Toutes catégories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Price min */}
        <div style={{ flex: '0 1 110px' }}>
          <input
            type="number" placeholder="€ min"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
              padding: '0 12px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
          />
        </div>

        {/* Price max */}
        <div style={{ flex: '0 1 110px' }}>
          <input
            type="number" placeholder="€ max"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
              padding: '0 12px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
          />
        </div>

        {/* Sort */}
        <div style={{ flex: '0 1 170px', display: 'flex', alignItems: 'center', gap: 6,
          background: 'white', border: '1px solid rgba(16,32,34,0.13)', borderRadius: 14,
          padding: '0 10px', minHeight: 48 }}>
          <SlidersHorizontal size={16} color="#60716f" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ border: 0, outline: 'none', width: '100%', background: 'transparent',
              minHeight: 46, fontWeight: 600, fontSize: 14 }}
          >
            <option value="">Trier par</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name">Nom (A-Z)</option>
          </select>
        </div>
      </div>

      {/* ─── PRODUCT GRID ─── */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.7)',
          borderRadius: 24, border: '2px dashed rgba(15,118,110,0.25)'
        }}>
          <AlertCircle size={48} color="#60716f" />
          <p style={{ marginTop: 12, color: '#5a6d6b', fontWeight: 600 }}>
            Aucun produit ne correspond à vos critères.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16
        }}>
          {filtered.map(p => {
            const status = statusConfig[p.status] || statusConfig['disponible'];
            const qty = quantities[p.id] || 0;
            const isPerMeter = p.isPricePerMeter || p.unit === 'mètre';

            return (
              <div key={p.id} className="card" style={{
                display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden'
              }}>
                {/* Image placeholder */}
                <div style={{
                  height: 160, background: '#f0f5f3', display: 'grid', placeItems: 'center',
                  color: '#b0c4c0', borderBottom: '1px solid rgba(16,32,34,0.06)'
                }}>
                  {p.image ? (
                    <img src={p.image} alt={p.nameFr} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Image size={40} />
                  )}
                </div>

                <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Status badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      background: status.bg, color: status.color, borderRadius: 999,
                      padding: '4px 10px', fontSize: 12, fontWeight: 800
                    }}>
                      <Tag size={12} /> {status.label}
                    </span>
                    {isPerMeter && (
                      <span style={{
                        background: '#ede9fe', color: '#6d28d9', borderRadius: 999,
                        padding: '4px 10px', fontSize: 11, fontWeight: 800
                      }}>
                        Prix au mètre
                      </span>
                    )}
                  </div>

                  {/* Names */}
                  <h3 style={{ fontSize: 17, margin: '0 0 2px' }}>{p.nameFr}</h3>
                  <p style={{ fontSize: 13, color: '#60716f', margin: '0 0 10px' }}>{p.nameEn}</p>

                  {/* Price */}
                  <div style={{
                    fontSize: 20, fontWeight: 900, color: '#0a4a5c', marginBottom: 10
                  }}>
                    {formatPrice(p.price)}
                    {isPerMeter && <span style={{ fontSize: 13, fontWeight: 600, color: '#60716f' }}> /m</span>}
                  </div>

                  {/* Comment */}
                  {p.comment && (
                    <p style={{ fontSize: 12, color: '#5a6d6b', margin: '0 0 12px', fontStyle: 'italic' }}>
                      {p.comment}
                    </p>
                  )}

                  {/* Quantity + Actions */}
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <label style={{ fontSize: 13, fontWeight: 700, color: '#435956' }}>Qté:</label>
                      <input
                        type="number" min="0" value={qty}
                        onChange={e => handleQty(p.id, e.target.value)}
                        style={{
                          width: 60, minHeight: 36, borderRadius: 10,
                          border: '1px solid rgba(16,32,34,0.13)', textAlign: 'center',
                          fontWeight: 700, outline: 'none', background: 'white'
                        }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <button
                        style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          gap: 6, background: '#0f766e', color: 'white', border: 0, borderRadius: 12,
                          padding: '10px 8px', fontWeight: 800, fontSize: 13, cursor: 'pointer',
                          minHeight: 42
                        }}
                      >
                        <ShoppingCart size={16} /> Ajouter
                      </button>
                      <a
                        href={waReserveMsg(p, qty)}
                        target="_blank" rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          gap: 6, background: '#fff4e9', color: '#9a3412', border: 0, borderRadius: 12,
                          padding: '10px 8px', fontWeight: 800, fontSize: 13, cursor: 'pointer',
                          textDecoration: 'none', minHeight: 42
                        }}
                      >
                        <MessageCircle size={16} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default DestockagePage;