import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, SlidersHorizontal, Ship, CheckCircle, AlertTriangle,
  Clock, Star, ShoppingCart, ExternalLink
} from 'lucide-react';
import { products, categories, getProductsByCategory } from '../data/products';

const CATEGORY_ICONS = {
  'compas': '🧭', 'liston': '📏', 'hublots': '🪟', 'sieges': '🪑',
  'davier': '⚓', 'echelles': '🪜', 'taquets': '🔩', 'loquets': '🔒',
  'accastillage-inox': '⚙️', 'quincaillerie': '🔧', 'navigation': '💡',
  'electricite': '⚡', 'plomberie': '💧', 'pare-battages': '⭕',
  'securite': '🛡️', 'trappes-coffres': '📦', 'remorque': '🚛',
  'audio': '🔊', 'destockage-urgent': '🏷️',
};

const STATUS_STYLES = {
  'disponible': { label: 'En stock', color: '#16a34a', bg: '#dcfce7' },
  'sur-devis': { label: 'Sur devis', color: '#ea580c', bg: '#fff7ed' },
  'a-confirmer': { label: 'À confirmer', color: '#92400e', bg: '#fef3c7' },
};

export function CataloguePage() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCat !== 'all') {
      result = getProductsByCategory(activeCat);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.nameFr.toLowerCase().includes(q) ||
        p.nameEn?.toLowerCase().includes(q) ||
        p.comment?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCat]);

  // Group by category for display
  const grouped = useMemo(() => {
    const groups = {};
    filteredProducts.forEach(p => {
      const cat = categories.find(c => c.id === p.category);
      const catName = cat?.name || p.category;
      if (!groups[catName]) groups[catName] = [];
      groups[catName].push(p);
    });
    return groups;
  }, [filteredProducts]);

  const totalProducts = products.length;
  const totalFiltered = filteredProducts.length;

  return (
    <section className="pageSection">
      {/* ─── HERO ─── */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div className="badge">Catalogue Fournisseurs</div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 52px)', margin: '8px 0 4px' }}>
          Catalogue Nautique
        </h1>
        <p style={{ color: '#60716f', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          {totalProducts} produits référencés — Prix réels vérifiés — 3 fournisseurs minimum par produit
        </p>
      </div>

      {/* ─── SEARCH + FILTERS ─── */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap',
        background: 'rgba(255,255,255,0.92)', borderRadius: 20,
        border: '1px solid rgba(16,32,34,0.1)', padding: 16
      }}>
        {/* Search bar */}
        <div style={{
          flex: '1 1 280px', display: 'flex', alignItems: 'center', gap: 8,
          background: 'white', border: '1px solid rgba(16,32,34,0.13)', borderRadius: 14,
          padding: '0 14px', minHeight: 48
        }}>
          <Search size={18} color="#60716f" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un produit... (ex: compas, hublot, taquet)"
            style={{ border: 0, outline: 'none', width: '100%', background: 'transparent', fontWeight: 600, fontSize: 14 }}
          />
        </div>
        {/* Count */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#e7fbf7', color: '#0f766e', borderRadius: 999,
          padding: '6px 16px', fontSize: 13, fontWeight: 800, whiteSpace: 'nowrap'
        }}>
          <Ship size={14} /> {totalFiltered} produits
        </div>
      </div>

      {/* ─── CATEGORY TABS ─── */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap',
        overflowX: 'auto', paddingBottom: 8
      }}>
        <button
          onClick={() => setActiveCat('all')}
          style={{
            padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: activeCat === 'all' ? '#0f766e' : '#e8f0ee',
            color: activeCat === 'all' ? 'white' : '#1a2e2b',
            fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}
        >
          🏴‍☠️ Tous ({totalProducts})
        </button>
        {categories.filter(c => products.some(p => p.category === c.id)).map(cat => {
          const count = getProductsByCategory(cat.id).length;
          const icon = CATEGORY_ICONS[cat.id] || '📦';
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              style={{
                padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: activeCat === cat.id ? '#0f766e' : '#e8f0ee',
                color: activeCat === cat.id ? 'white' : '#1a2e2b',
                fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {icon} {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* ─── PRODUCTS GRID ─── */}
      {Object.keys(grouped).length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#8aa09c' }}>
          <Search size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p style={{ fontSize: 18, fontWeight: 700 }}>Aucun résultat</p>
          <p>Essayez de modifier votre recherche ou filtre.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([catName, catProducts]) => (
          <div key={catName} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              {CATEGORY_ICONS[catProducts[0].category] || '📦'} {catName}
              <span style={{ fontSize: 14, color: '#60716f', fontWeight: 600 }}>({catProducts.length})</span>
            </h2>
            <div style={{
              display: 'grid', gap: 14,
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
            }}>
              {catProducts.map(product => {
                const statusInfo = STATUS_STYLES[product.status] || STATUS_STYLES['a-confirmer'];
                const bestSupplier = product.suppliers?.find(s => s.reco) || product.suppliers?.[0];
                return (
                  <Link to={`/produit/${product.id}`} key={product.id}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.95)', borderRadius: 18,
                      border: '1px solid rgba(16,32,34,0.1)', overflow: 'hidden',
                      transition: 'box-shadow 0.3s, transform 0.2s',
                      cursor: 'pointer', height: '100%'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(26,72,70,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                    >
                      {/* Image placeholder */}
                      <div style={{
                        height: 180, background: 'linear-gradient(135deg, #f4f9f7, #e8f0ec)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', borderBottom: '1px solid rgba(16,32,34,0.06)'
                      }}>
                        <span style={{ fontSize: 48, opacity: 0.15 }}>
                          {CATEGORY_ICONS[product.category] || '📦'}
                        </span>
                        <span style={{
                          position: 'absolute', top: 12, right: 12,
                          background: statusInfo.bg, color: statusInfo.color,
                          borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 800
                        }}>
                          {statusInfo.label}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ padding: 16 }}>
                        <h3 style={{ fontSize: 16, margin: '0 0 4px', lineHeight: 1.3, color: '#0a4a5c' }}>
                          {product.nameFr}
                        </h3>
                        <p style={{ fontSize: 12, color: '#60716f', margin: '0 0 10px', lineHeight: 1.3 }}>
                          {product.comment?.slice(0, 80)}{product.comment?.length > 80 ? '...' : ''}
                        </p>

                        {/* Price + best supplier */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: '#0a4a5c' }}>
                              {product.price > 0 ? `${product.price} €` : 'Sur devis'}
                            </div>
                            <div style={{ fontSize: 11, color: '#8aa09c' }}>par {product.unit}</div>
                          </div>
                          {bestSupplier && (
                            <div style={{ textAlign: 'right', fontSize: 11 }}>
                              <span style={{ color: '#0f766e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Star size={11} /> {bestSupplier.name}
                              </span>
                              <span style={{ color: '#60716f' }}>{bestSupplier.delivery}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default CataloguePage;