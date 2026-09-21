import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle, CheckCircle, ExternalLink, Globe2, Loader2, Package,
  Search, Server, ShoppingBag, Store, Wifi, WifiOff
} from 'lucide-react';
import { DROPSHIPPING_PRODUCTS } from '../data/dropshipping';
import { getProviderStatus, searchProviderProducts } from '../services/dropshippingApi';
import { waMessage } from '../utils/constants';

const CATEGORIES = [
  'Maison', 'Cuisine', 'Mode', 'Beauté', 'Électronique', 'Téléphone',
  'Informatique', 'Sport', 'Auto Moto', 'Outils', 'Jardin', 'Animaux',
  'Bébé', 'Jouets', 'Bijoux', 'Montres', 'Chaussures', 'Sacs',
  'Bureau', 'Marine', 'Voyage', 'Cadeaux'
];

const STATUS = {
  configured: { label: 'Connecté', bg: '#dcfce7', color: '#166534' },
  ready: { label: 'Prêt', bg: '#dcfce7', color: '#166534' },
  action_required: { label: 'Clé requise', bg: '#fff7ed', color: '#9a3412' },
  optional: { label: 'Optionnel', bg: '#eff6ff', color: '#1d4ed8' },
  disabled_cost: { label: 'Payant — désactivé', bg: '#f3f4f6', color: '#4b5563' }
};

function money(value) {
  if (value === '' || value === null || value === undefined) return 'Sur devis';
  if (typeof value === 'string' && value.includes('-')) return `${value} USD`;
  const n = Number(value);
  return Number.isFinite(n) ? `${n.toFixed(2)} USD` : String(value);
}

export default function DropshippingPage() {
  const [providers, setProviders] = useState([]);
  const [backendOk, setBackendOk] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    getProviderStatus()
      .then((data) => {
        if (!mounted) return;
        setProviders(data.providers || []);
        setBackendOk(true);
      })
      .catch(() => {
        if (!mounted) return;
        setBackendOk(false);
      });
    return () => { mounted = false; };
  }, []);

  const cj = useMemo(() => providers.find((p) => p.id === 'cj'), [providers]);
  const fallbackProducts = useMemo(() => DROPSHIPPING_PRODUCTS.slice(0, 6), []);

  const runSearch = async (term = query) => {
    const keyword = String(term || '').trim();
    setQuery(keyword);
    setSearching(true);
    setError('');
    try {
      const data = await searchProviderProducts('cj', { query: keyword, size: 24 });
      setProducts(data.items || []);
      if (!(data.items || []).length) setError('Aucun produit CJ trouvé pour cette recherche.');
    } catch (e) {
      try {
        const printful = await searchProviderProducts('printful', { query: keyword, size: 24 });
        setProducts(printful.items || []);
        if ((printful.items || []).length) {
          setError(e.status === 503 ? 'CJ attend encore sa clé API : résultats Printful affichés en attendant.' : '');
        } else {
          setError('Aucun résultat fournisseur pour cette recherche. Essaie une autre catégorie ou le sourcing WhatsApp.');
        }
      } catch {
        setProducts([]);
        setError('La recherche fournisseur est momentanément indisponible. Le sourcing WhatsApp reste opérationnel.');
      }
    } finally {
      setSearching(false);
    }
  };

  const chooseCategory = (name) => {
    setActiveCategory(name);
    runSearch(name);
  };

  return (
    <section className="pageSection">
      <div className="hero" style={{ marginBottom: 28 }}>
        <div className="badge"><Globe2 size={15} /> Marketplace multi-catégories</div>
        <h1>Des milliers de références,<br />une seule recherche IKABAY</h1>
        <p style={{ maxWidth: 760 }}>
          CJdropshipping est le moteur API principal. Printify/Printful complètent le catalogue POD.
          Les fournisseurs Europe, Caraïbe et locaux restent intégrables par fichier ou sourcing.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
          <span className="badge" style={{ background: backendOk ? '#dcfce7' : '#fef2f2', color: backendOk ? '#166534' : '#b91c1c' }}>
            {backendOk ? <Wifi size={14} /> : <WifiOff size={14} />}
            {backendOk ? 'Backend VPS connecté' : 'Backend indisponible'}
          </span>
          <span className="badge"><Server size={14} /> API sécurisée côté serveur</span>
        </div>
      </div>

      <div className="card" style={{ padding: 22, marginBottom: 26 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px', display: 'flex', gap: 8 }}>
            <input
              className="input"
              style={{ flex: 1 }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') runSearch(); }}
              placeholder="Ex. coque téléphone, montre, cuisine, pêche, cadeau..."
            />
            <button className="btn btnPrimary" onClick={() => runSearch()} disabled={searching}>
              {searching ? <Loader2 size={18} /> : <Search size={18} />} Rechercher
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
          {CATEGORIES.map((name) => (
            <button
              key={name}
              onClick={() => chooseCategory(name)}
              style={{
                border: activeCategory === name ? '1px solid #0f766e' : '1px solid #dce6e3',
                background: activeCategory === name ? '#e7fbf7' : 'white',
                color: '#21413d', borderRadius: 999, padding: '7px 12px',
                cursor: 'pointer', fontWeight: 700, fontSize: 12
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ background: '#fff7ed', color: '#9a3412', border: '1px solid #fed7aa', borderRadius: 14, padding: 14, marginBottom: 22, display: 'flex', gap: 9 }}>
          <AlertCircle size={19} /> <span>{error}</span>
        </div>
      )}

      <div className="sectionTitle">
        <h2>{products.length ? 'Résultats fournisseur en direct' : 'Aperçu catalogue'}</h2>
        <p>{products.length ? 'Données reçues depuis CJ via le VPS IKABAY.' : 'Exemples locaux affichés tant que la clé CJ n’est pas encore ajoutée.'}</p>
      </div>

      <div className="cardGrid" style={{ marginBottom: 34 }}>
        {(products.length ? products : fallbackProducts).map((p) => {
          const live = products.length > 0;
          const name = live ? p.name : p.nameFr;
          const id = live ? p.id : p.sku;
          const price = live ? money(p.price) : 'Prix à reconfirmer';
          return (
            <article key={id} className="card" style={{ overflow: 'hidden' }}>
              {live && p.image ? (
                <img src={p.image} alt="" loading="lazy" style={{ width: '100%', height: 210, objectFit: 'cover', background: '#f3f6f5' }} />
              ) : (
                <div style={{ height: 150, display: 'grid', placeItems: 'center', background: '#f3f6f5' }}>
                  <Package size={42} color="#7b918d" />
                </div>
              )}
              <div style={{ padding: 18 }}>
                <div style={{ fontSize: 12, color: '#60716f', marginBottom: 5 }}>{live ? 'CJdropshipping' : 'Catalogue IKABAY'}</div>
                <h3 style={{ fontSize: 17, margin: '0 0 8px' }}>{name}</h3>
                <div style={{ color: '#0f766e', fontWeight: 800, marginBottom: 12 }}>{price}</div>
                <a
                  className="btn btnPrimary"
                  href={waMessage(`Bonjour IKABAY, je souhaite un devis pour : ${name} (réf. ${id}). Merci de confirmer prix final, livraison Martinique et délai.`)}
                  target="_blank" rel="noreferrer"
                >
                  <ShoppingBag size={16} /> Demander ce produit
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="sectionTitle">
        <h2>Connexions fournisseurs</h2>
        <p>État réel du backend VPS. Les clés privées restent sur le serveur.</p>
      </div>
      <div className="cardGrid">
        {providers.map((provider) => {
          const style = STATUS[provider.status] || STATUS.optional;
          return (
            <div key={provider.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0 }}>{provider.name}</h3>
                  <div style={{ fontSize: 12, color: '#60716f', marginTop: 4 }}>{provider.mode} · {provider.cost}</div>
                </div>
                <span style={{ background: style.bg, color: style.color, borderRadius: 999, padding: '5px 9px', height: 'fit-content', fontSize: 11, fontWeight: 800 }}>
                  {style.label}
                </span>
              </div>
              <p style={{ color: '#516866', fontSize: 13, lineHeight: 1.5 }}>
                {(provider.capabilities || []).join(' · ')}
              </p>
              {provider.action && <p style={{ fontSize: 12, color: '#7c2d12' }}>{provider.action}</p>}
              {provider.status === 'configured' && <div style={{ color: '#166534', fontWeight: 800, fontSize: 13 }}><CheckCircle size={15} /> Prêt à utiliser</div>}
            </div>
          );
        })}
      </div>

      {!providers.length && (
        <div className="card" style={{ padding: 20 }}>
          <Store size={24} /> Chargement du statut fournisseurs…
        </div>
      )}

      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <a className="btn btnSecondary" href="https://developers.cjdropshipping.com/" target="_blank" rel="noreferrer">
          <ExternalLink size={16} /> Documentation CJ
        </a>
      </div>
    </section>
  );
}

