import { useMemo, useState } from 'react';
import { Anchor, Check, MessageCircle, Minus, Package, Plus, Search, ShoppingCart, Trash2 } from 'lucide-react';
import { localStockCategories, localStockProducts } from '../data/localStock';
import { waMessage } from '../utils/constants';

const euro = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

export default function DestockagePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState({});

  const filtered = useMemo(() => localStockProducts.filter((product) => {
    const matchCategory = !category || product.category === category;
    const text = `${product.name} ${product.reference} ${product.brand} ${product.category}`.toLowerCase();
    return matchCategory && text.includes(query.trim().toLowerCase());
  }), [query, category]);

  const setQty = (product, nextQty) => {
    const qty = Math.max(0, Math.min(product.stock, nextQty));
    setCart((current) => {
      const next = { ...current };
      if (qty === 0) delete next[product.reference];
      else next[product.reference] = { product, qty };
      return next;
    });
  };
  const cartItems = Object.values(cart);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const orderUrl = useMemo(() => {
    if (!cartItems.length) return '#';
    const lines = cartItems.map(({ product, qty }) =>
      `- ${product.name} | réf. ${product.reference} | ${qty} x ${euro(product.price)} = ${euro(qty * product.price)}`
    );
    return waMessage([
      'Bonjour IKABAY, je souhaite commander/réserver ces articles disponibles en Martinique :',
      '', ...lines, '', `Total articles : ${euro(cartTotal)}`,
      'Merci de confirmer l’état exact, la disponibilité, le retrait/livraison et le montant final avant paiement.'
    ].join('\n'));
  }, [cartItems, cartTotal]);

  return (
    <section className="pageSection">
      <div className="badge" style={{ marginBottom: 12 }}><Anchor size={14} /> Stock local Martinique</div>
      <h1>Déstockage & occasion nautique</h1>
      <p style={{ maxWidth: 760, marginBottom: 20 }}>
        Articles déjà disponibles localement. Les quantités ci-dessous correspondent à l’inventaire enregistré ;
        l’état exact et la disponibilité finale sont confirmés avant paiement.
      </p>

      <div className="card" style={{ padding: 16, marginBottom: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 260px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #d8e4e1', borderRadius: 12, padding: '0 12px' }}>
          <Search size={17} color="#60716f" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un article ou une référence"
            style={{ flex: 1, minHeight: 44, border: 0, outline: 'none', background: 'transparent' }}
          />
        </div>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          style={{ minHeight: 44, borderRadius: 12, border: '1px solid #d8e4e1', padding: '0 12px', background: 'white' }}
        >
          <option value="">Toutes catégories</option>
          {localStockCategories.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>

      {cartItems.length > 0 && (
        <div className="card" style={{ padding: 18, marginBottom: 24, border: '2px solid #0f766e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <strong><ShoppingCart size={17} /> Sélection : {cartCount} article{cartCount > 1 ? 's' : ''}</strong>
              <div style={{ color: '#60716f', marginTop: 4 }}>Total articles : {euro(cartTotal)}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btnSecondary" onClick={() => setCart({})}>
                <Trash2 size={15} /> Vider
              </button>
              <a className="btn btnPrimary" href={orderUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> Commander sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16 }}>
        {filtered.map((product) => {
          const qty = cart[product.reference]?.qty || 0;
          return (
            <article key={product.reference} className="card" style={{ overflow: 'hidden', padding: 0 }}>
              <div style={{ height: 145, display: 'grid', placeItems: 'center', background: '#f1f6f4' }}>
                <Package size={42} color="#86a19b" />
              </div>
              <div style={{ padding: 17 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                  <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}><Check size={13} /> En stock</span>
                  <span style={{ fontSize: 12, color: '#60716f' }}>Réf. {product.reference}</span>
                </div>
                <h3 style={{ margin: '0 0 4px', fontSize: 17 }}>{product.name}</h3>
                <div style={{ fontSize: 12, color: '#60716f', marginBottom: 8 }}>{product.brand} · {product.category}</div>
                <p style={{ fontSize: 13, color: '#516866', minHeight: 38 }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 10, marginTop: 12 }}>
                  <div>
                    <div style={{ fontSize: 21, fontWeight: 900, color: '#0a4a5c' }}>{euro(product.price)}</div>
                    <div style={{ fontSize: 12, color: '#60716f' }}>Stock enregistré : {product.stock}</div>
                  </div>
                  {qty === 0 ? (
                    <button className="btn btnPrimary" onClick={() => setQty(product, 1)}>
                      <Plus size={16} /> Ajouter
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button className="btn btnSecondary" style={{ padding: '8px 10px' }} onClick={() => setQty(product, qty - 1)}><Minus size={15} /></button>
                      <strong>{qty}</strong>
                      <button className="btn btnSecondary" style={{ padding: '8px 10px' }} onClick={() => setQty(product, qty + 1)} disabled={qty >= product.stock}><Plus size={15} /></button>
                    </div>
                  )}
                </div>
                <a
                  href={waMessage(`Bonjour IKABAY, je suis intéressé par ${product.name}, réf. ${product.reference}, au prix affiché de ${euro(product.price)}. Merci de confirmer l’état, la disponibilité et le retrait/livraison.`)}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-flex', marginTop: 12, color: '#0f766e', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
                >
                  <MessageCircle size={15} /> Poser une question
                </a>
              </div>
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="card" style={{ padding: 32, textAlign: 'center', marginTop: 16 }}>
          <Package size={34} color="#86a19b" />
          <p>Aucun article ne correspond à votre recherche.</p>
        </div>
      )}
    </section>
  );
}
