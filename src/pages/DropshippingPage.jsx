import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle, CheckCircle, ExternalLink, Globe2, Loader2, Package,
  Search, Server, ShoppingBag, Store, Wifi, WifiOff, Truck, Boxes, X
} from 'lucide-react';
import { DROPSHIPPING_PRODUCTS } from '../data/dropshipping';
import {
  getProviderStatus, getProviderCategories, searchProviderProducts,
  getProviderProduct, getProviderStock, getProviderFreight
} from '../services/dropshippingApi';
import { waMessage } from '../utils/constants';

const CATEGORIES = [
  'Maison', 'Cuisine', 'Mode', 'Beauté', 'Électronique', 'Téléphone',
  'Informatique', 'Sport', 'Auto Moto', 'Outils', 'Jardin', 'Animaux',
  'Bébé', 'Jouets', 'Bijoux', 'Montres', 'Chaussures', 'Sacs',
  'Bureau', 'Marine', 'Voyage', 'Cadeaux'
];

const MARTINIQUE_SELECTIONS = [
  { id: 'mobile', label: 'Téléphone & accessoires', query: 'phone accessories', reason: 'Usage quotidien et produits légers' },
  { id: 'home', label: 'Maison & rangement', query: 'home storage organizer', reason: 'Organisation et petits équipements maison' },
  { id: 'kitchen', label: 'Cuisine', query: 'kitchen organizer', reason: 'Équipement pratique du quotidien' },
  { id: 'beauty', label: 'Beauté & soins', query: 'beauty organizer', reason: 'Produits compacts adaptés au e-commerce' },
  { id: 'sport', label: 'Sport & fitness', query: 'fitness resistance band', reason: 'Usage maison et extérieur, faible encombrement' },
  { id: 'auto', label: 'Auto & mobilité', query: 'car phone holder', reason: 'Accessoires utiles pour les déplacements' },
  { id: 'solar', label: 'Jardin & solaire', query: 'solar garden light', reason: 'Usage extérieur en climat tropical' },
  { id: 'travel', label: 'Voyage & bagagerie', query: 'travel organizer', reason: 'Mobilité inter-îles et Hexagone' },
  { id: 'pets', label: 'Animaux', query: 'pet grooming brush', reason: 'Accessoires récurrents et faciles à expédier' },
  { id: 'baby', label: 'Bébé & famille', query: 'baby stroller accessory', reason: 'Accessoires pratiques non sensibles' },
  { id: 'marine', label: 'Marine & plage', query: 'waterproof dry bag', reason: 'Nautisme, plage et pluie tropicale' },
  { id: 'office', label: 'Bureau & télétravail', query: 'desk organizer', reason: 'Équipement maison et professionnels' },
];

const STATUS = {
  configured: { label: 'Connecté', bg: '#dcfce7', color: '#166534' },
  ready: { label: 'Prêt', bg: '#dcfce7', color: '#166534' },
  action_required: { label: 'Clé requise', bg: '#fff7ed', color: '#9a3412' },
  optional: { label: 'Optionnel', bg: '#eff6ff', color: '#1d4ed8' },
  disabled_cost: { label: 'Payant — désactivé', bg: '#f3f4f6', color: '#4b5563' }
};

const IKABAY_MARGIN_RATE = 0.20;

function money(value) {
  if (value === '' || value === null || value === undefined) return 'Sur devis';
  if (typeof value === 'string' && value.includes('-')) return `${value} USD`;
  const n = Number(value);
  return Number.isFinite(n) ? `${n.toFixed(2)} USD` : String(value);
}

function totalStock(rows) {
  return (rows || []).reduce((sum, row) => sum + Number(row.quantity || 0), 0);
}

export default function DropshippingPage() {
  const [providers, setProviders] = useState([]);
  const [backendOk, setBackendOk] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [cjCategories, setCjCategories] = useState([]);
  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [stock, setStock] = useState([]);
  const [freight, setFreight] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [recommended, setRecommended] = useState([]);
  const [recommendLoading, setRecommendLoading] = useState(false);
  const [recommendError, setRecommendError] = useState('');

  useEffect(() => {
    let mounted = true;
    getProviderStatus()
      .then((data) => {
        if (!mounted) return;
        const list = data.providers || [];
        setProviders(list);
        setBackendOk(true);
        if (list.find((p) => p.id === 'cj' && p.status === 'configured')) {
          getProviderCategories('cj')
            .then((categories) => {
              if (mounted) setCjCategories(Array.isArray(categories.data) ? categories.data : []);
            })
            .catch(() => {});
        }
      })
      .catch(() => {
        if (!mounted) return;
        setBackendOk(false);
      });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!backendOk || !providers.length) return;
    const activeProvider = providers.find((p) => p.id === 'cj' && p.status === 'configured') ? 'cj' : 'printful';
    let cancelled = false;
    setRecommendLoading(true);
    setRecommendError('');

    Promise.all(
      MARTINIQUE_SELECTIONS.map(async (selection) => {
        try {
          const data = await searchProviderProducts(activeProvider, { query: selection.query, size: 4 });
          return (data.items || []).slice(0, 4).map((item) => ({
            ...item,
            selectionId: selection.id,
            selectionLabel: selection.label,
            selectionReason: selection.reason,
          }));
        } catch {
          return [];
        }
      })
    ).then((groups) => {
      if (cancelled) return;
      const seen = new Set();
      const items = groups.flat().filter((item) => {
        const key = `${item.provider}:${item.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      setRecommended(items);
      if (!items.length) {
        setRecommendError('La sélection automatique est momentanément indisponible. Utilisez la recherche fournisseur.');
      }
    }).finally(() => {
      if (!cancelled) setRecommendLoading(false);
    });

    return () => { cancelled = true; };
  }, [backendOk, providers]);

  const cj = useMemo(() => providers.find((p) => p.id === 'cj'), [providers]);
  const fallbackProducts = useMemo(() => DROPSHIPPING_PRODUCTS.slice(0, 6), []);
  const categoryNames = useMemo(
    () => cjCategories.length
      ? cjCategories.map((c) => c.categoryFirstName).filter(Boolean)
      : CATEGORIES,
    [cjCategories]
  );

  const runSearch = async (term = query) => {
    const keyword = String(term || '').trim();
    setQuery(keyword);
    setSearching(true);
    setError('');
    try {
      const primaryProvider = cj?.status === 'configured' ? 'cj' : 'printful';
      const data = await searchProviderProducts(primaryProvider, { query: keyword, size: 24 });
      setProducts(data.items || []);
      if ((data.items || []).length) {
        setError(primaryProvider === 'printful'
          ? 'CJ attend encore sa clé API : résultats Printful affichés en attendant.'
          : '');
      } else {
        setError('Aucun résultat fournisseur pour cette recherche. Essaie une autre catégorie ou le sourcing WhatsApp.');
      }
    } catch {
      if (cj?.status === 'configured') {
        try {
          const printful = await searchProviderProducts('printful', { query: keyword, size: 24 });
          setProducts(printful.items || []);
          setError((printful.items || []).length
            ? 'CJ est momentanément indisponible : résultats Printful affichés.'
            : 'Aucun résultat fournisseur pour cette recherche.');
        } catch {
          setProducts([]);
          setError('La recherche fournisseur est momentanément indisponible. Le sourcing WhatsApp reste opérationnel.');
        }
      } else {
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

  const loadVariantAvailability = async (variant) => {
    setAvailabilityLoading(true);
    setDetailError('');
    setSelectedVariant(variant);
    setStock([]);
    setFreight([]);
    try {
      const stockData = await getProviderStock('cj', variant.vid);
      const stockRows = stockData.stock || [];
      setStock(stockRows);
      if (totalStock(stockRows) <= 0) {
        setDetailError('Stock non confirmé pour cette variante.');
        return { stockRows, freightOptions: [] };
      }
      try {
        const freightData = await getProviderFreight('cj', {
          vid: variant.vid,
          quantity: 1,
          destinationCode: 'MQ',
          originCode: 'CN'
        });
        const freightOptions = freightData.options || [];
        setFreight(freightOptions);
        if (!freightOptions.length) {
          setDetailError('Aucune route logistique CJ vers la Martinique n’a été retournée pour cette variante.');
        }
        return { stockRows, freightOptions };
      } catch {
        setDetailError('Stock confirmé, mais le transport Martinique doit être reconfirmé.');
        return { stockRows, freightOptions: [] };
      }
    } catch {
      setDetailError('Cette variante n’est pas disponible dans le stock CJ.');
      return { stockRows: [], freightOptions: [] };
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const openDetails = async (product) => {
    if (!product?.id || product.provider !== 'cj') return;
    setDetailLoading(true);
    setDetailError('');
    setDetailProduct(null);
    setSelectedVariant(null);
    setStock([]);
    setFreight([]);
    try {
      const data = await getProviderProduct('cj', product.id);
      const detail = data.product;
      setDetailProduct(detail);
      const variants = detail?.variants || [];
      let picked = null;

      for (const variant of variants.slice(0, 5)) {
        try {
          const stockData = await getProviderStock('cj', variant.vid);
          const rows = stockData.stock || [];
          if (totalStock(rows) > 0) {
            picked = variant;
            setSelectedVariant(variant);
            setStock(rows);
            try {
              const freightData = await getProviderFreight('cj', {
                vid: variant.vid,
                quantity: 1,
                destinationCode: 'MQ',
                originCode: 'CN'
              });
              setFreight(freightData.options || []);
            } catch {
              setDetailError('Produit en stock ; transport Martinique à reconfirmer.');
            }
            break;
          }
        } catch {
          // CJ peut retourner des variantes présentes dans la fiche mais absentes du stock.
        }
      }

      if (!picked && variants[0]) {
        setSelectedVariant(variants[0]);
        setDetailError('Aucune variante avec stock confirmé n’a été trouvée automatiquement.');
      }
    } catch {
      setDetailError('Impossible de charger la fiche CJ pour le moment.');
    } finally {
      setDetailLoading(false);
    }
  };

  const cheapestFreight = freight[0] || null;
  const selectedPrice = Number(selectedVariant?.price ?? detailProduct?.price ?? 0);
  const serviceMargin = selectedPrice * IKABAY_MARGIN_RATE;
  const estimatedTotal = selectedPrice + serviceMargin + Number(cheapestFreight?.price || 0);

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

      <section style={{ marginBottom: 30 }}>
        <div className="sectionTitle" style={{ marginBottom: 14 }}>
          <h2>🔥 Sélection Martinique & Caraïbes</h2>
          <p>Une vitrine multi-catégories remontée en direct des fournisseurs. La disponibilité et le transport vers la Martinique sont revérifiés avant toute commande.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {MARTINIQUE_SELECTIONS.map((selection) => (
            <button
              key={selection.id}
              onClick={() => chooseCategory(selection.query)}
              className="badge"
              style={{ cursor: 'pointer', border: '1px solid #dce6e3' }}
              title={selection.reason}
            >
              {selection.label}
            </button>
          ))}
        </div>

        {recommendLoading && (
          <div className="card" style={{ padding: 18, display: 'flex', gap: 9, alignItems: 'center' }}>
            <Loader2 size={18} /> Chargement de la sélection fournisseur en direct…
          </div>
        )}
        {recommendError && (
          <div style={{ background: '#fff7ed', color: '#9a3412', padding: 14, borderRadius: 14 }}>{recommendError}</div>
        )}
        {!recommendLoading && recommended.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {recommended.slice(0, 24).map((product) => (
              <article className="card" key={`rec-${product.provider}-${product.id}`} style={{ padding: 0, overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  style={{ width: '100%', height: 180, objectFit: 'contain', background: '#f7faf9' }}
                />
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 900, color: '#0f766e', textTransform: 'uppercase' }}>{product.selectionLabel}</div>
                  <h3 style={{ fontSize: 15, lineHeight: 1.35, margin: '6px 0 8px', minHeight: 40 }}>{product.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                    <strong style={{ color: '#0a4a5c' }}>{money(product.price)}</strong>
                    <span style={{ fontSize: 11, color: '#60716f' }}>{product.provider === 'cj' ? 'CJ direct' : product.provider}</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#73837f', lineHeight: 1.45, minHeight: 34 }}>{product.selectionReason}</p>
                  <button
                    className="btn btnPrimary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => product.provider === 'cj' ? openDetails(product) : runSearch(product.name)}
                  >
                    Vérifier stock & livraison MQ
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

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
          {categoryNames.map((name) => (
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

      {detailLoading && (
        <div className="card" style={{ padding: 22, marginBottom: 26, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Loader2 size={20} /> Chargement de la fiche CJ, du stock et du transport Martinique…
        </div>
      )}

      {detailProduct && (
        <div className="card" style={{ padding: 22, marginBottom: 28, border: '1px solid #cfe4df' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 12, color: '#0f766e', fontWeight: 800 }}>FICHE CJ EN DIRECT</div>
              <h2 style={{ margin: '5px 0 4px' }}>{detailProduct.name}</h2>
              <div style={{ color: '#60716f', fontSize: 13 }}>{detailProduct.categoryName}</div>
            </div>
            <button
              onClick={() => setDetailProduct(null)}
              aria-label="Fermer la fiche produit"
              style={{ border: 0, background: '#eef5f3', borderRadius: 999, width: 36, height: 36, cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div>
              <img
                src={selectedVariant?.image || detailProduct.image}
                alt=""
                style={{ width: '100%', maxHeight: 340, objectFit: 'contain', background: '#f6f8f7', borderRadius: 14 }}
              />
              <div style={{ marginTop: 10, fontSize: 12, color: '#60716f' }}>
                SKU : {selectedVariant?.sku || detailProduct.sku}
              </div>
            </div>

            <div>
              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>Variante</label>
                  <select
                    className="input"
                    value={selectedVariant?.vid || ''}
                    onChange={(e) => {
                      const variant = (detailProduct.variants || []).find((v) => v.vid === e.target.value);
                      if (variant) loadVariantAvailability(variant);
                    }}
                  >
                    {(detailProduct.variants || []).map((variant) => (
                      <option key={variant.vid} value={variant.vid}>
                        {variant.key || variant.name} — {money(variant.price)}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span className="badge"><Boxes size={14} /> Stock confirmé : {totalStock(stock)}</span>
                  <span className="badge"><Truck size={14} /> Destination : Martinique</span>
                </div>

                {availabilityLoading && (
                  <div style={{ color: '#60716f', fontSize: 13 }}>Vérification stock et transport…</div>
                )}

                {detailError && (
                  <div style={{ background: '#fff7ed', color: '#9a3412', padding: 10, borderRadius: 10, fontSize: 13 }}>
                    {detailError}
                  </div>
                )}

                <div style={{ background: '#f6f8f7', borderRadius: 14, padding: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, fontSize: 14 }}>
                    <span>Produit CJ</span><strong>{money(selectedPrice)}</strong>
                    <span>Marge service IKABAY (20 %)</span><strong>{money(serviceMargin)}</strong>
                    <span>Transport le moins cher</span><strong>{cheapestFreight ? money(cheapestFreight.price) : 'À confirmer'}</strong>
                    <span style={{ borderTop: '1px solid #dce6e3', paddingTop: 8 }}>Estimation IKABAY</span>
                    <strong style={{ borderTop: '1px solid #dce6e3', paddingTop: 8, color: '#0f766e' }}>
                      {cheapestFreight ? money(estimatedTotal) : 'Sur devis'}
                    </strong>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 11, color: '#73837f' }}>
                    Estimation en USD hors éventuels droits, TVA/octroi de mer et variation de change. Prix final confirmé avant paiement.
                  </div>
                </div>

                {freight.length > 0 && (
                  <div>
                    <div style={{ fontWeight: 800, marginBottom: 8 }}>Options transport CJ</div>
                    {freight.slice(0, 4).map((option) => (
                      <div key={option.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '7px 0', borderBottom: '1px solid #eef2f1', fontSize: 13 }}>
                        <span>{option.name} · {option.estimatedDays || 'délai à confirmer'} j</span>
                        <strong>{money(option.price)}</strong>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  className="btn btnPrimary"
                  href={waMessage(`Bonjour IKABAY, je souhaite confirmer ce produit CJ : ${detailProduct.name}, variante ${selectedVariant?.key || selectedVariant?.name || ''}, SKU ${selectedVariant?.sku || detailProduct.sku}. Produit ${money(selectedPrice)}, transport estimé ${cheapestFreight ? money(cheapestFreight.price) : 'à confirmer'}, estimation IKABAY ${cheapestFreight ? money(estimatedTotal) : 'sur devis'}. Merci de confirmer le prix final rendu Martinique.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ShoppingBag size={17} /> Demander la confirmation finale
                </a>
              </div>
            </div>
          </div>

          {detailProduct.description && (
            <p style={{ marginTop: 20, color: '#516866', lineHeight: 1.6 }}>{detailProduct.description}</p>
          )}
        </div>
      )}

      <div className="sectionTitle">
        <h2>{products.length ? 'Résultats fournisseur en direct' : 'Aperçu catalogue'}</h2>
        <p>{products.length ? 'Données reçues depuis CJ via le VPS IKABAY.' : 'Aperçu IKABAY affiché tant qu’aucune recherche fournisseur n’est lancée. Les disponibilités sont reconfirmées avant commande.'}</p>
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
                {live && p.provider === 'cj' && (
                  <button
                    className="btn btnSecondary"
                    style={{ marginRight: 8, marginBottom: 8 }}
                    onClick={() => openDetails(p)}
                  >
                    Voir détails, stock & transport
                  </button>
                )}
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

