import { useEffect, useMemo, useState } from 'react';
import { Check, Loader2, MessageCircle, Package, Search, ShoppingCart, Trash2, Truck, X } from 'lucide-react';
import {
  getProviderStatus, searchProviderProducts, getProviderProduct,
  getProviderStock, getProviderFreight
} from '../services/dropshippingApi';
import { waMessage } from '../utils/constants';

const PUBLIC_MARGIN = 1.20;
const CATEGORY_QUERIES = [
  ['Maison', 'home'], ['Cuisine', 'kitchen'], ['Téléphone', 'phone'], ['Informatique', 'computer'],
  ['Mode', 'fashion'], ['Beauté', 'beauty'], ['Sport', 'sport'], ['Auto / Moto', 'car'],
  ['Jardin', 'garden'], ['Animaux', 'pet'], ['Bébé', 'baby'], ['Jouets', 'toy'],
  ['Bijoux', 'jewelry'], ['Montres', 'watch'], ['Chaussures', 'shoes'], ['Sacs', 'bag'],
  ['Bureau', 'office'], ['Marine', 'marine'], ['Voyage', 'travel'], ['Cadeaux', 'gift']
];

const usd = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
const totalStock = (rows) => (rows || []).reduce((sum, row) => sum + Number(row.quantity || 0), 0);

export default function DropshippingPage() {
  const [provider, setProvider] = useState(null);
  const [query, setQuery] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Maison');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [detail, setDetail] = useState(null);
  const [variant, setVariant] = useState(null);
  const [stock, setStock] = useState([]);
  const [freight, setFreight] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailMessage, setDetailMessage] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProviderStatus().then((data) => {
      if (!mounted) return;
      const list = data.providers || [];
      const nextProvider = list.find((item) => item.id === 'cj' && item.status === 'configured') ? 'cj' : 'printful';
      setProvider(nextProvider);
      searchProducts('home', nextProvider);
    }).catch(() => {
      if (mounted) {
        setLoading(false);
        setMessage('Le catalogue est momentanément indisponible. Le stock local reste accessible.');
      }
    });
    return () => { mounted = false; };
  }, []);

  const searchProducts = async (term, providerOverride = provider) => {
    if (!providerOverride) return;
    setLoading(true);
    setMessage('');
    try {
      const data = await searchProviderProducts(providerOverride, { query: term, size: 24 });
      setProducts(data.items || []);
      if (!(data.items || []).length) setMessage('Aucun produit trouvé. Essayez une autre recherche.');
    } catch {
      setProducts([]);
      setMessage('Recherche momentanément indisponible.');
    } finally {
      setLoading(false);
    }
  };
  const loadAvailability = async (selected) => {
    setVariant(selected);
    setStock([]);
    setFreight([]);
    setDetailMessage('');
    try {
      const stockData = await getProviderStock('cj', selected.vid);
      const rows = stockData.stock || [];
      setStock(rows);
      if (totalStock(rows) <= 0) {
        setDetailMessage('Cette variante n’est pas disponible actuellement.');
        return false;
      }
      const freightData = await getProviderFreight('cj', {
        vid: selected.vid, quantity: 1, destinationCode: 'MQ', originCode: 'CN'
      });
      setFreight(freightData.options || []);
      if (!(freightData.options || []).length) {
        setDetailMessage('La livraison vers la Martinique doit être confirmée pour cette variante.');
      }
      return true;
    } catch {
      setDetailMessage('Disponibilité à reconfirmer pour cette variante.');
      return false;
    }
  };

  const openDetails = async (product) => {
    if (product.provider !== 'cj') {
      setQuery(product.name);
      setMessage('Ce produit est disponible sur demande. Envoyez-nous la référence pour confirmation.');
      return;
    }
    setDetailLoading(true);
    setDetail(null);
    setVariant(null);
    setStock([]);
    setFreight([]);
    setDetailMessage('');
    try {
      const data = await getProviderProduct('cj', product.id);
      const item = data.product;
      setDetail(item);
      for (const candidate of (item.variants || []).slice(0, 6)) {
        if (await loadAvailability(candidate)) break;
      }
    } catch {
      setDetailMessage('Impossible de vérifier ce produit pour le moment.');
    } finally {
      setDetailLoading(false);
    }
  };
  const cheapestFreight = freight[0] || null;
  const estimatedPublicPrice = useMemo(() => {
    if (!variant || !cheapestFreight) return null;
    return (Number(variant.price || 0) + Number(cheapestFreight.price || 0)) * PUBLIC_MARGIN;
  }, [variant, cheapestFreight]);

  const addCurrentToCart = () => {
    if (!detail || !variant || !estimatedPublicPrice) return;
    const item = {
      key: `${detail.id}:${variant.vid}`,
      name: detail.name,
      sku: variant.sku || detail.sku,
      variant: variant.key || variant.name,
      price: estimatedPublicPrice,
      delivery: cheapestFreight?.estimatedDays || '',
    };
    setCart((current) => current.some((entry) => entry.key === item.key) ? current : [...current, item]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const orderUrl = useMemo(() => {
    if (!cart.length) return '#';
    const lines = cart.map((item) => `- ${item.name} | ${item.variant || item.sku} | estimation ${usd(item.price)}`);
    return waMessage([
      'Bonjour IKABAY, je souhaite commander les articles suivants :', '', ...lines,
      '', `Total estimatif : ${usd(cartTotal)}`,
      'Merci de confirmer la disponibilité, le prix final livré en Martinique et le délai avant paiement.'
    ].join('\n'));
  }, [cart, cartTotal]);
  const submitSearch = () => {
    setActiveCategory('');
    searchProducts(query);
  };

  const selectCategory = (label, term) => {
    setActiveCategory(label);
    setQuery(term);
    searchProducts(term);
  };

  return (
    <section className="pageSection">
      <div className="badge" style={{ marginBottom: 12 }}>Boutique internationale</div>
      <h1>Commander un produit livré en Martinique</h1>
      <p style={{ maxWidth: 760, marginBottom: 22 }}>
        Recherchez un article, vérifiez sa disponibilité et obtenez une estimation de livraison avant de confirmer votre commande.
      </p>

      {cart.length > 0 && (
        <div className="card" style={{ padding: 16, marginBottom: 22, border: '2px solid #0f766e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div><strong><ShoppingCart size={16} /> Ma commande : {cart.length} article{cart.length > 1 ? 's' : ''}</strong><div style={{ color: '#60716f' }}>Total estimatif : {usd(cartTotal)}</div></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btnSecondary" onClick={() => setCart([])}><Trash2 size={15} /> Vider</button>
              <a className="btn btnPrimary" href={orderUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Commander</a>
            </div>
          </div>
        </div>
      )}
      <div className="card" style={{ padding: 18, marginBottom: 22 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', display: 'flex', gap: 8, alignItems: 'center', border: '1px solid #d8e4e1', borderRadius: 12, padding: '0 12px' }}>
            <Search size={17} color="#60716f" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') submitSearch(); }}
              placeholder="Que recherchez-vous ?"
              style={{ flex: 1, minHeight: 44, border: 0, outline: 'none', background: 'transparent' }}
            />
          </div>
          <button className="btn btnPrimary" onClick={submitSearch} disabled={loading}>
            {loading ? <Loader2 size={17} /> : <Search size={17} />} Rechercher
          </button>
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 14 }}>
          {CATEGORY_QUERIES.map(([label, term]) => (
            <button
              key={label}
              onClick={() => selectCategory(label, term)}
              style={{ border: activeCategory === label ? '1px solid #0f766e' : '1px solid #d8e4e1', background: activeCategory === label ? '#e7fbf7' : 'white', borderRadius: 999, padding: '7px 11px', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}
            >{label}</button>
          ))}
        </div>
      </div>
      {message && <div className="card" style={{ padding: 14, marginBottom: 20, color: '#7c4a16' }}>{message}</div>}

      {detailLoading && (
        <div className="card" style={{ padding: 18, marginBottom: 22 }}><Loader2 size={18} /> Vérification de la disponibilité et de la livraison…</div>
      )}

      {detail && (
        <div className="card" style={{ padding: 20, marginBottom: 26, border: '1px solid #cfe4df' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'start' }}>
            <div><div className="badge" style={{ marginBottom: 8 }}><Check size={13} /> Disponibilité vérifiée</div><h2 style={{ margin: 0 }}>{detail.name}</h2></div>
            <button onClick={() => setDetail(null)} aria-label="Fermer" style={{ border: 0, background: '#eef5f3', borderRadius: 999, width: 36, height: 36, cursor: 'pointer' }}><X size={18} /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 20, marginTop: 18 }}>
            <img src={variant?.image || detail.image} alt="" style={{ width: '100%', maxHeight: 320, objectFit: 'contain', background: '#f5f8f7', borderRadius: 14 }} />
            <div>
              <label style={{ fontSize: 12, fontWeight: 800 }}>Choisir une variante</label>
              <select className="input" value={variant?.vid || ''} onChange={(event) => {
                const next = (detail.variants || []).find((item) => item.vid === event.target.value);
                if (next) loadAvailability(next);
              }} style={{ width: '100%', marginTop: 6 }}>
                {(detail.variants || []).map((item) => <option key={item.vid} value={item.vid}>{item.key || item.name}</option>)}
              </select>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                <span className="badge"><Package size={13} /> Stock : {totalStock(stock)}</span>
                <span className="badge"><Truck size={13} /> Livraison Martinique</span>
              </div>
              {detailMessage && <div style={{ marginTop: 12, padding: 10, borderRadius: 10, background: '#fff7ed', color: '#9a3412', fontSize: 13 }}>{detailMessage}</div>}
              <div style={{ background: '#f6f8f7', borderRadius: 14, padding: 16, marginTop: 14 }}>
                <div style={{ fontSize: 12, color: '#60716f' }}>Estimation livrée en Martinique</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#0a4a5c', marginTop: 3 }}>
                  {estimatedPublicPrice ? usd(estimatedPublicPrice) : 'À confirmer'}
                </div>
                {cheapestFreight && <div style={{ fontSize: 12, color: '#60716f', marginTop: 4 }}>Délai indicatif : {cheapestFreight.estimatedDays || 'à confirmer'} jours</div>}
                <div style={{ fontSize: 11, color: '#73837f', marginTop: 8 }}>Prix final confirmé avant paiement, selon disponibilité, transport et taxes locales applicables.</div>
              </div>
              <button className="btn btnPrimary" style={{ marginTop: 14 }} onClick={addCurrentToCart} disabled={!estimatedPublicPrice || totalStock(stock) <= 0}>
                <ShoppingCart size={16} /> Ajouter à ma commande
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="sectionTitle">
        <h2>Produits disponibles à la commande</h2>
        <p>Sélectionnez un produit pour vérifier son stock, sa variante et son estimation livrée.</p>
      </div>

      {loading ? (
        <div className="card" style={{ padding: 28, textAlign: 'center' }}><Loader2 size={24} /> Chargement des produits…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
          {products.map((product) => (
            <article key={`${product.provider}-${product.id}`} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {product.image ? (
                <img src={product.image} alt="" loading="lazy" style={{ width: '100%', height: 210, objectFit: 'cover', background: '#f3f6f5' }} />
              ) : (
                <div style={{ height: 170, display: 'grid', placeItems: 'center', background: '#f3f6f5' }}><Package size={38} color="#86a19b" /></div>
              )}
              <div style={{ padding: 16 }}>
                <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>Disponible à vérifier</span>
                <h3 style={{ fontSize: 16, margin: '10px 0 6px' }}>{product.name}</h3>
                <p style={{ fontSize: 12, color: '#60716f', minHeight: 34 }}>Prix livré calculé après vérification de la variante et du transport.</p>
                <button className="btn btnPrimary" style={{ width: '100%', marginTop: 8 }} onClick={() => openDetails(product)}>
                  Voir disponibilité & prix
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      <div className="card" style={{ padding: 18, marginTop: 24, background: '#f8fbfa' }}>
        <strong>Besoin d’un produit précis ?</strong>
        <p style={{ margin: '6px 0 12px', color: '#60716f' }}>Envoyez-nous le nom, une photo ou une référence. Nous vérifions la disponibilité et le prix livré en Martinique.</p>
        <a className="btn btnSecondary" href={waMessage('Bonjour IKABAY, je recherche un produit précis. Voici ma demande :')} target="_blank" rel="noreferrer">
          <MessageCircle size={16} /> Demander sur WhatsApp
        </a>
      </div>
    </section>
  );
}
