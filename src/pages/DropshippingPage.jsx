import { useState, useMemo } from 'react';
import {
  Globe, Package, ShoppingCart, TrendingUp, DollarSign,
  Search, Filter, Plus, Copy, CheckCircle, Clock, AlertCircle,
  Truck, ExternalLink, BarChart3, RefreshCw, ArrowRight,
  Globe2, Store, Zap, ZapOff, Download, Upload, Tag
} from 'lucide-react';
import { DROPSHIPPING_SOURCES, DROPSHIPPING_PRODUCTS, calcIkabayPrice, calcNetMargin } from '../data/dropshipping';
import { APP_NAME } from '../utils/constants';

const STATUS_COLORS = {
  'en-test': '#f97316',
  'actif': '#16a34a',
  'inactif': '#6b7280'
};

const STOCK_COLORS = {
  'disponible': '#16a34a',
  'rupture': '#dc2626',
  'commande': '#f97316',
  'sur-devis': '#7c3aed'
};

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div style={{
      background: 'white', borderRadius: 16, padding: 24,
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)', flex: 1, minWidth: 180
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: color || '#0f766e', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={22} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 13, color: '#60716f', fontWeight: 600 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#1a2e2b' }}>{value}</div>
        </div>
      </div>
      {sub && <div style={{ fontSize: 13, color: '#8a9b97' }}>{sub}</div>}
    </div>
  );
}

export function DropshippingPage() {
  const [activeTab, setActiveTab] = useState('apercu');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Sources stats
  const totalSources = DROPSHIPPING_SOURCES.length;
  const activeSources = DROPSHIPPING_SOURCES.filter(s => s.status === 'actif').length;
  const testSources = DROPSHIPPING_SOURCES.filter(s => s.status === 'en-test').length;
  
  // Products stats
  const totalProducts = DROPSHIPPING_PRODUCTS.length;
  const avgMargin = DROPSHIPPING_SOURCES.reduce((a, s) => a + s.marginPercent, 0) / totalSources;
  
  // Orders (demo)
  const demoOrders = [
    { id: 'CMD-001', client: 'Jules Defel', source: 'AliExpress', status: 'en-transit', total: 45.80, date: '2026-06-20' },
    { id: 'CMD-002', client: 'Club Nautique FM', source: 'CJ Dropshipping', status: 'livre', total: 28.40, date: '2026-06-18' },
  ];

  // Filtered products
  const filteredProducts = useMemo(() => {
    return DROPSHIPPING_PRODUCTS.filter(p => {
      const matchSearch = !searchTerm || 
        p.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.nameEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSource = filterSource === 'all' || p.sourceId === filterSource;
      const matchCategory = filterCategory === 'all' || p.category === filterCategory;
      return matchSearch && matchSource && matchCategory;
    });
  }, [searchTerm, filterSource, filterCategory]);

  const categories = [...new Set(DROPSHIPPING_PRODUCTS.map(p => p.category))];

  const getSource = (sourceId) => DROPSHIPPING_SOURCES.find(s => s.id === sourceId);

  const priceColumns = [
    { key: 'name', label: 'Produit' },
    { key: 'source', label: 'Source' },
    { key: 'wholesale', label: 'Achat' },
    { key: 'shipping', label: 'Fret' },
    { key: 'ikabay', label: 'Prix IKABAY' },
    { key: 'margin', label: 'Marge nette' },
    { key: 'delay', label: 'Délai' },
    { key: 'stock', label: 'Stock' },
  ];

  const renderTab = (id, label, IconComponent) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
        border: 'none', borderRadius: 10, cursor: 'pointer',
        background: activeTab === id ? '#0f766e' : '#e8f0ee',
        color: activeTab === id ? 'white' : '#1a2e2b',
        fontWeight: 700, fontSize: 14, transition: 'all 0.2s'
      }}
    >
      <IconComponent size={18} /> {label}
    </button>
  );

  return (
    <div className="pageSection" style={{ position: 'relative' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
        borderRadius: 24, padding: '40px 48px', marginBottom: 32,
        color: 'white', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', margin: 0, fontSize: 32 }}>
            <Package size={28} style={{ verticalAlign: 'middle', marginRight: 12 }} />
            Dropshipping Multi-Partenaires
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', margin: '8px 0 0', fontSize: 16, maxWidth: 500 }}>
            Alternative low-cost à AutoDS. {totalSources} sources connectées, {totalProducts} produits agrégés.
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 20,
              fontSize: 13, fontWeight: 700
            }}>
              0€ d'abonnement mensuel
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 20,
              fontSize: 13, fontWeight: 700
            }}>
              Marge moyenne {avgMargin.toFixed(0)}%
            </span>
          </div>
        </div>
        <div style={{
          position: 'absolute', right: -20, top: -20, opacity: 0.08,
          fontSize: 200, fontWeight: 900, lineHeight: 1
        }}>
          <Package size={200} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <StatCard icon={Store} label="Sources" value={totalSources}
          sub={`${activeSources} active(s) · ${testSources} en test`} color="#0f766e" />
        <StatCard icon={Package} label="Produits" value={totalProducts}
          sub="Catalogue agrégé multi-sources" color="#2563eb" />
        <StatCard icon={BarChart3} label="Marge moy." value={`${avgMargin.toFixed(0)}%`}
          sub="Marge IKABAY + frais partenaire" color="#7c3aed" />
        <StatCard icon={ShoppingCart} label="Commandes" value={demoOrders.length}
          sub="Via le système dropshipping" color="#0891b2" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {renderTab('apercu', 'Aperçu', Globe)}
        {renderTab('produits', 'Catalogue', Package)}
        {renderTab('comparateur', 'Comparateur', BarChart3)}
        {renderTab('commandes', 'Commandes', ShoppingCart)}
        {renderTab('sources', 'Sources', Store)}
      </div>

      {/* ===== TAB APERÇU ===== */}
      {activeTab === 'apercu' && (
        <div>
          <div className="sectionTitle">
            <h2>Sources Dropshipping</h2>
          </div>
          <div className="cardGrid">
            {DROPSHIPPING_SOURCES.map(source => {
              const productCount = DROPSHIPPING_PRODUCTS.filter(p => p.sourceId === source.id).length;
              const sourceProduct = DROPSHIPPING_PRODUCTS.find(p => p.sourceId === source.id);
              const ikabayPrice = sourceProduct ? calcIkabayPrice(sourceProduct, source) : 0;
              
              return (
                <div key={source.id} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16, color: '#1a2e2b' }}>{source.name}</div>
                      <div style={{ fontSize: 12, color: '#8a9b97', marginTop: 4 }}>
                        {source.type === 'api' ? 'API' : source.type === 'scraped' ? 'Scraping' : 'Manuel'}
                      </div>
                    </div>
                    <span className="badge" style={{
                      background: STATUS_COLORS[source.status],
                      fontSize: 11, padding: '4px 10px'
                    }}>
                      {source.status === 'actif' ? 'Actif' : source.status === 'en-test' ? 'Test' : 'Inactif'}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: '#60716f', marginBottom: 12 }}>
                    {source.notes?.substring(0, 80)}...
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                    <div><strong style={{ color: '#1a2e2b' }}>{productCount}</strong> produits</div>
                    <div><strong style={{ color: '#1a2e2b' }}>{source.marginPercent}%</strong> marge</div>
                    <div><strong style={{ color: '#1a2e2b' }}>{source.avgDelayDays}j</strong> délai</div>
                  </div>
                  {sourceProduct && (
                    <div style={{ marginTop: 12, padding: 10, background: '#f0f5f3', borderRadius: 8, fontSize: 12 }}>
                      <div style={{ color: '#60716f' }}>Exemple :</div>
                      <div style={{ fontWeight: 700, color: '#1a2e2b' }}>{sourceProduct.nameFr}</div>
                      <div style={{ color: '#0f766e', fontWeight: 700 }}>
                        Achat {sourceProduct.priceWholesale.toFixed(2)}€ → Vente {ikabayPrice.toFixed(2)}€
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Workflow */}
          <div className="sectionTitle" style={{ marginTop: 32 }}>
            <h2>Comment ça marche</h2>
          </div>
          <div style={{
            background: 'white', borderRadius: 16, padding: 32, marginTop: 8,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              {[
                { step: '1', icon: Search, label: 'Recherche', desc: 'L\'agent trouve le produit chez le meilleur partenaire' },
                { step: '2', icon: TrendingUp, label: 'Marge', desc: `La marge IKABAY (${avgMargin.toFixed(0)}% en moyenne) s'ajoute auto` },
                { step: '3', icon: ShoppingCart, label: 'Commande', desc: 'Le client commande → la commande part au fournisseur' },
                { step: '4', icon: Truck, label: 'Expédition', desc: 'Le fournisseur expédie direct au client (ou via IKABAY)' },
                { step: '5', icon: DollarSign, label: 'Profit', desc: `IKABAY encaisse la différence. 0€ d'abonnement.` },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 28,
                    background: '#0f766e', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px', fontSize: 20, fontWeight: 800
                  }}>
                    {item.step}
                  </div>
                  <div style={{ fontWeight: 700, color: '#1a2e2b', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: '#60716f' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB CATALOGUE ===== */}
      {activeTab === 'produits' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div className="sectionTitle" style={{ margin: 0 }}>
              <h2 style={{ margin: 0 }}>Catalogue agrégé</h2>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button className="btn btnSecondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Upload size={16} /> Importer
              </button>
              <button className="btn btnSecondary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Download size={16} /> Exporter
              </button>
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, background: 'white',
              borderRadius: 10, padding: '8px 16px', flex: 1, minWidth: 200,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <Search size={18} color="#8a9b97" />
              <input
                type="text" placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14 }}
              />
            </div>
            <select
              value={filterSource}
              onChange={e => setFilterSource(e.target.value)}
              className="select"
              style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #d0dbd8', fontSize: 14 }}
            >
              <option value="all">Toutes les sources</option>
              {DROPSHIPPING_SOURCES.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="select"
              style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #d0dbd8', fontSize: 14 }}
            >
              <option value="all">Toutes catégories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Products table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <thead>
                <tr style={{ background: '#f0f5f3' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}>Produit</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}>Source</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}>Achat</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}>Fret</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}>Prix IKABAY</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}>Marge</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}>MOQ</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}>Délai</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}>Stock</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, color: '#60716f', whiteSpace: 'nowrap' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => {
                  const source = getSource(p.sourceId);
                  const ikabayPrice = calcIkabayPrice(p, source);
                  const netMargin = calcNetMargin(p, source);
                  const marginPct = ((ikabayPrice - p.priceWholesale - p.shippingCost) / p.priceWholesale * 100).toFixed(0);
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #e8f0ee' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#1a2e2b', fontSize: 14 }}>{p.nameFr}</div>
                        <div style={{ fontSize: 12, color: '#8a9b97' }}>{p.sku}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span className="badge" style={{
                          background: STATUS_COLORS[source?.status] || '#6b7280',
                          fontSize: 11, padding: '4px 8px'
                        }}>
                          {source?.name}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 700, color: '#1a2e2b' }}>
                        {p.priceWholesale.toFixed(2)}€
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right', color: '#60716f' }}>
                        {p.shippingCost > 0 ? `${p.shippingCost.toFixed(2)}€` : '-'}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <span style={{ fontWeight: 800, color: '#0f766e', fontSize: 16 }}>
                          {ikabayPrice.toFixed(2)}€
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: '#16a34a' }}>+{netMargin.toFixed(2)}€</div>
                        <div style={{ fontSize: 12, color: '#8a9b97' }}>({marginPct}%)</div>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: '#60716f' }}>
                        {p.moq}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <span style={{
                          background: p.delayDays <= 7 ? '#dcfce7' : p.delayDays <= 15 ? '#fff7ed' : '#fef2f2',
                          color: p.delayDays <= 7 ? '#16a34a' : p.delayDays <= 15 ? '#ea580c' : '#dc2626',
                          padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600
                        }}>
                          {p.delayDays}j
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <span style={{
                          color: STOCK_COLORS[p.stockStatus],
                          fontWeight: 700, fontSize: 13
                        }}>
                          {p.stockQty}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <button className="btn btnPrimary" style={{ padding: '6px 12px', fontSize: 12 }}>
                          <Copy size={14} style={{ marginRight: 4 }} />
                          Ajouter
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#8a9b97' }}>
              Aucun produit trouvé
            </div>
          )}
        </div>
      )}

      {/* ===== TAB COMPARATEUR ===== */}
      {activeTab === 'comparateur' && (
        <div>
          <div className="sectionTitle">
            <h2>Comparateur de prix multi-sources</h2>
            <p>Trouvez le meilleur rapport qualité/prix pour chaque produit</p>
          </div>
          
          {/* Comparaison fictive */}
          <div style={{
            background: 'white', borderRadius: 16, padding: 24, marginBottom: 16,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <h3 style={{ margin: '0 0 16px', color: '#1a2e2b' }}>Feu de navigation LED — Comparatif</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {[
                { source: 'CJ Dropshipping', wholesale: 4.20, shipping: 2.80, delay: 8, moq: 1, note: 'Meilleur prix' },
                { source: 'AliExpress', wholesale: 5.10, shipping: 3.50, delay: 12, moq: 1, note: 'Catalogue + large' },
                { source: 'Alibaba 1688', wholesale: 3.50, shipping: 6.00, delay: 25, moq: 10, note: 'Prix usine' },
                { source: 'Grossiste Europe', wholesale: 8.00, shipping: 2.00, delay: 5, moq: 1, note: 'Rapide DOM' },
              ].map((offer, i) => {
                const ikabayPrice = offer.wholesale * 1.18 + offer.shipping;
                let best = i === 0;
                return (
                  <div key={i} style={{
                    border: best ? '2px solid #16a34a' : '1px solid #e8f0ee',
                    borderRadius: 12, padding: 16, position: 'relative'
                  }}>
                    {best && <div style={{
                      position: 'absolute', top: -10, right: 12,
                      background: '#16a34a', color: 'white', padding: '2px 10px',
                      borderRadius: 10, fontSize: 11, fontWeight: 700
                    }}>RECOMMANDÉ</div>}
                    <div style={{ fontWeight: 700, color: '#1a2e2b', marginBottom: 8 }}>{offer.source}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                      <span style={{ color: '#60716f' }}>Achat</span>
                      <span style={{ fontWeight: 700 }}>{offer.wholesale.toFixed(2)}€</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                      <span style={{ color: '#60716f' }}>Fret</span>
                      <span>{offer.shipping.toFixed(2)}€</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                      <span style={{ color: '#60716f' }}>IKABAY</span>
                      <span style={{ fontWeight: 800, color: '#0f766e', fontSize: 16 }}>{ikabayPrice.toFixed(2)}€</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 8, color: '#8a9b97' }}>
                      <span>Délai {offer.delay}j · MOQ {offer.moq}</span>
                    </div>
                    <div style={{ fontSize: 12, color: best ? '#16a34a' : '#60716f', marginTop: 4 }}>{offer.note}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===== TAB COMMANDES ===== */}
      {activeTab === 'commandes' && (
        <div>
          <div className="sectionTitle">
            <h2>Gestion des commandes dropshipping</h2>
            <button className="btn btnPrimary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Plus size={16} /> Nouvelle commande
            </button>
          </div>

          <div style={{ overflowX: 'auto', background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f0f5f3' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, color: '#60716f' }}>Réf</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, color: '#60716f' }}>Client</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 13, color: '#60716f' }}>Source</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: 13, color: '#60716f' }}>Total</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, color: '#60716f' }}>Statut</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, color: '#60716f' }}>Date</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, color: '#60716f' }}></th>
                </tr>
              </thead>
              <tbody>
                {demoOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #e8f0ee' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1a2e2b' }}>{order.id}</td>
                    <td style={{ padding: '14px 16px', color: '#1a2e2b' }}>{order.client}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className="badge" style={{ fontSize: 11, padding: '4px 8px', background: '#e8f0ee', color: '#1a2e2b' }}>
                        {order.source}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 700 }}>{order.total.toFixed(2)}€</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <span style={{
                        background: order.status === 'livre' ? '#dcfce7' : '#fff7ed',
                        color: order.status === 'livre' ? '#16a34a' : '#ea580c',
                        padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600
                      }}>
                        {order.status === 'livre' ? <><CheckCircle size={14} style={{ marginRight: 4 }} /> Livré</> : <><Truck size={14} style={{ marginRight: 4 }} /> En transit</>}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center', color: '#60716f', fontSize: 13 }}>{order.date}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button className="btn btnSecondary" style={{ padding: '6px 12px', fontSize: 12 }}>
                        Détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== TAB SOURCES ===== */}
      {activeTab === 'sources' && (
        <div>
          <div className="sectionTitle">
            <h2>Gestion des sources partenaires</h2>
            <button className="btn btnPrimary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Plus size={16} /> Ajouter une source
            </button>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {DROPSHIPPING_SOURCES.map(source => {
              const productCount = DROPSHIPPING_PRODUCTS.filter(p => p.sourceId === source.id).length;
              return (
                <div key={source.id} style={{
                  background: 'white', borderRadius: 16, padding: 24,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center'
                }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 16 }}>{source.name}</span>
                      <span className="badge" style={{
                        background: source.type === 'api' ? '#2563eb' : source.type === 'scraped' ? '#7c3aed' : '#f97316',
                        fontSize: 11, padding: '2px 8px'
                      }}>
                        {source.type}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: '#60716f' }}>{source.notes}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 24 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 20 }}>{productCount}</div>
                      <div style={{ fontSize: 12, color: '#8a9b97' }}>Produits</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 20 }}>{source.marginPercent}%</div>
                      <div style={{ fontSize: 12, color: '#8a9b97' }}>Marge</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 20 }}>{source.avgDelayDays}j</div>
                      <div style={{ fontSize: 12, color: '#8a9b97' }}>Délai</div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btnSecondary" style={{ fontSize: 12, padding: '8px 16px' }}>
                      Configurer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer info */}
      <div style={{
        marginTop: 40, padding: 24, background: '#f0f5f3', borderRadius: 16,
        textAlign: 'center', fontSize: 14, color: '#60716f'
      }}>
        <strong style={{ color: '#1a2e2b' }}>Comparaison vs AutoDS</strong>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 700, color: '#16a34a', fontSize: 18 }}>0€</div>
            <div style={{ fontSize: 12 }}>Abonnement mensuel IKABAY</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#dc2626', fontSize: 18 }}>~30€/mois</div>
            <div style={{ fontSize: 12 }}>AutoDS starter</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#16a34a', fontSize: 18 }}>100%</div>
            <div style={{ fontSize: 12 }}>Marge conservée par IKABAY</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#dc2626', fontSize: 18 }}>~50%</div>
            <div style={{ fontSize: 12 }}>Marge prélevée par AutoDS</div>
          </div>
        </div>
      </div>
    </div>
  );
}