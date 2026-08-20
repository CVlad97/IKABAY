import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, SlidersHorizontal, Ship, CheckCircle, AlertTriangle,
  Clock, Star, ShoppingCart, ExternalLink, MessageCircle,
  Filter, Grid3X3, List, ArrowRight, Package, Truck, ShieldCheck
} from 'lucide-react';
import { products, categories, getProductsByCategory } from '../data/products';
import { WHATSAPP_URL, waMessage } from '../utils/constants';

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
  'a-confirmer': { label: 'A confirmer', color: '#92400e', bg: '#fef3c7' },
};

const PRODUCT_PHOTOS = {
  'securite': '/photos/navigation.jpg',
  'navigation': '/photos/compass.jpg',
  'accastillage-inox': '/photos/hardware.jpg',
  'plomberie': '/photos/hardware.jpg',
  'electricite': '/photos/navigation.jpg',
  'pare-battages': '/photos/cargo.jpg',
  'remorque': '/photos/cargo.jpg',
  'trappes-coffres': '/photos/hardware.jpg',
  'audio': '/photos/navigation.jpg',
  'destockage-urgent': '/photos/cargo.jpg',
};

export function CataloguePage() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

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
    // Sort
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    else result = [...result].sort((a, b) => a.nameFr.localeCompare(b.nameFr));
    return result;
  }, [search, activeCat, sortBy]);

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

  const buyOnWhatsApp = (product) => {
    window.open(waMessage(`Bonjour IKABAY, je souhaite commander : ${product.nameFr} (ref ${product.id}) au prix de ${product.price} EUR.`));
  };

  return (
    <div className="pageSection">

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
        borderRadius: 24, padding: '32px 40px', marginBottom: 32, color: 'white'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Package size={24} /> Catalogue IKABAY
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', margin: '8px 0 0', fontSize: 15 }}>
          {products.length} produits disponibles • Prix fournisseurs verifies • Livraison Martinique
        </p>
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, background: 'white',
          borderRadius: 12, padding: '10px 16px', flex: 1, minWidth: 250,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <Search size={18} color="#8a9b97" />
          <input type="text" placeholder="Rechercher un produit..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14 }} />
        </div>
        <select value={activeCat} onChange={e => setActiveCat(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid #d0dbd8', fontSize: 14, background: 'white' }}>
          <option value="all">Toutes categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid #d0dbd8', fontSize: 14, background: 'white' }}>
          <option value="name">A-Z</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix decroissant</option>
        </select>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <button onClick={() => setViewMode('grid')} style={{
            padding: '10px', borderRadius: 8, border: viewMode === 'grid' ? '2px solid #0f766e' : '1px solid #d0dbd8',
            background: viewMode === 'grid' ? '#e7fbf7' : 'white', cursor: 'pointer'
          }}><Grid3X3 size={18} /></button>
          <button onClick={() => setViewMode('list')} style={{
            padding: '10px', borderRadius: 8, border: viewMode === 'list' ? '2px solid #0f766e' : '1px solid #d0dbd8',
            background: viewMode === 'list' ? '#e7fbf7' : 'white', cursor: 'pointer'
          }}><List size={18} /></button>
        </div>
      </div>

      {/* Categories bar */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 24 }}>
        <button onClick={() => setActiveCat('all')} style={{
          padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
          background: activeCat === 'all' ? '#0f766e' : '#e8f0ee',
          color: activeCat === 'all' ? 'white' : '#1a2e2b', fontWeight: 700, fontSize: 13
        }}>Tous ({products.length})</button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
            padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            background: activeCat === c.id ? '#0f766e' : '#e8f0ee',
            color: activeCat === c.id ? 'white' : '#1a2e2b', fontWeight: 700, fontSize: 13
          }}>{CATEGORY_ICONS[c.id] || ''} {c.name}</button>
        ))}
      </div>

      {/* Products */}
      {Object.entries(grouped).map(([catName, items]) => (
        <div key={catName} style={{ marginBottom: 32 }}>
          <div className="sectionTitle">
            <h2 style={{ fontSize: 20 }}>{catName} ({items.length})</h2>
          </div>
          <div style={{
            display: viewMode === 'grid'
              ? 'grid'
              : 'block',
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(260px, 1fr))' : '1fr',
            gap: 16
          }}>
            {items.map(p => {
              const st = STATUS_STYLES[p.status] || STATUS_STYLES['disponible'];
              const photo = PRODUCT_PHOTOS[p.category] || '/photos/hardware.jpg';
              const icon = CATEGORY_ICONS[p.category] || '📦';

              if (viewMode === 'list') {
                return (
                  <div key={p.id} className="card" style={{
                    padding: 20, display: 'flex', gap: 20, alignItems: 'center', marginBottom: 12
                  }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: 12, flexShrink: 0,
                      background: `url('${photo}') center/cover no-repeat`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 32
                    }}>{icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 16 }}>{p.nameFr}</div>
                      <div style={{ fontSize: 12, color: '#8a9b97' }}>{p.nameEn} • {p.unit === 'm' ? 'prix au metre' : `ref: ${p.id}`}</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 6, alignItems: 'center' }}>
                        <span className="badge" style={{ background: st.bg, color: st.color, fontSize: 11, padding: '3px 8px' }}>{st.label}</span>
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#0f766e' }}>{p.price} EUR</span>
                      </div>
                    </div>
                    <button onClick={() => buyOnWhatsApp(p)} style={{
                      background: '#25D366', color: 'white', border: 'none', borderRadius: 10,
                      padding: '10px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap'
                    }}>
                      <MessageCircle size={16} /> Commander
                    </button>
                  </div>
                );
              }

              return (
                <div key={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{
                    height: 160,
                    background: `url('${photo}') center/cover no-repeat`,
                    position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 48
                  }}>
                    <span className="badge" style={{
                      position: 'absolute', top: 10, right: 10,
                      background: st.bg, color: st.color, fontSize: 11, padding: '3px 8px'
                    }}>{st.label}</span>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 15, marginBottom: 4 }}>{p.nameFr}</div>
                    <div style={{ fontSize: 12, color: '#8a9b97', marginBottom: 8 }}>{p.nameEn}</div>
                    {p.comment && <div style={{ fontSize: 12, color: '#60716f', marginBottom: 8, fontStyle: 'italic' }}>{p.comment}</div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, color: '#0f766e' }}>{p.price} EUR</span>
                      <span style={{ fontSize: 12, color: '#8a9b97' }}>{p.unit === 'm' ? '/m' : '/pc'}</span>
                    </div>
                    <button onClick={() => buyOnWhatsApp(p)} style={{
                      width: '100%', padding: '10px', borderRadius: 10, border: 'none',
                      background: '#25D366', color: 'white', fontWeight: 700, fontSize: 13,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                    }}>
                      <MessageCircle size={16} /> Commander sur WhatsApp
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#8a9b97' }}>
          <Package size={48} style={{ marginBottom: 12 }} />
          <h3>Aucun produit trouve</h3>
          <p style={{ fontSize: 14 }}>Essayez de modifier votre recherche ou vos filtres.</p>
        </div>
      )}

      {/* Footer CTA */}
      <div style={{
        marginTop: 40, padding: 32, background: '#f0f5f3', borderRadius: 20,
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 8px', color: '#1a2e2b' }}>Vous ne trouvez pas ce que vous cherchez ?</h3>
        <p style={{ fontSize: 14, color: '#60716f', marginBottom: 16 }}>
          Contactez-nous sur WhatsApp avec votre liste de produits. Nous vous trouvons les meilleurs prix.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btnPrimary" style={{
          padding: '14px 28px', borderRadius: 12, fontWeight: 800, fontSize: 15,
          display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none'
        }}>
          <MessageCircle size={20} /> Parler a un conseiller
        </a>
      </div>

    </div>
  );
}