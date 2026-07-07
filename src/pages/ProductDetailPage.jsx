import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Ship, ArrowLeft, ShoppingCart, CheckCircle, AlertTriangle,
  Truck, Clock, Phone, Mail, Star, ExternalLink, MessageCircle,
  X, Send, Loader, Check
} from 'lucide-react';
import { products, categories, getProductById } from '../data/products';
import { waMessage, WHATSAPP_URL } from '../utils/constants';
import { ordersApi } from '../services/database';

const CATEGORY_ICONS = {
  'compas': '🧭', 'liston': '📏', 'hublots': '🪟', 'sieges': '🪑',
  'davier': '⚓', 'echelles': '🪜', 'taquets': '🔩', 'loquets': '🔒',
  'accastillage-inox': '⚙️', 'quincaillerie': '🔧', 'navigation': '💡',
  'electricite': '⚡', 'plomberie': '💧', 'pare-battages': '⭕',
  'securite': '🛡️', 'trappes-coffres': '📦', 'remorque': '🚛',
};

const STATUS_STYLES = {
  'disponible': { label: 'En stock', color: '#16a34a', bg: '#dcfce7' },
  'sur-devis': { label: 'Sur devis', color: '#ea580c', bg: '#fff7ed' },
  'a-confirmer': { label: 'À confirmer', color: '#92400e', bg: '#fef3c7' },
};

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: '', telephone: '', quantity: 1 });
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const resetOrderForm = () => {
    setOrderForm({ name: '', telephone: '', quantity: 1 });
    setOrderSuccess(false);
    setOrderError('');
    setOrderSubmitting(false);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!orderForm.name.trim() || !orderForm.telephone.trim()) {
      setOrderError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setOrderSubmitting(true);
    setOrderError('');

    try {
      const orderPayload = {
        product_id: product.id,
        product_name: product.nameFr,
        product_price: product.price || 0,
        client_name: orderForm.name.trim(),
        client_telephone: orderForm.telephone.trim(),
        quantity: parseInt(orderForm.quantity) || 1,
        status: 'nouvelle',
        source: 'web-direct',
      };
      const { data, error } = await ordersApi.create(orderPayload);
      if (error) {
        console.warn('Supabase error, using local order number:', error);
      }
      const num = data?.id || `CMD-${Date.now().toString(36).toUpperCase()}`;
      setOrderNumber(num);
      setOrderSuccess(true);

      // Store in localStorage for confirmation page
      const orderData = {
        id: num,
        product_name: product.nameFr,
        quantity: parseInt(orderForm.quantity) || 1,
        price: product.price || 0,
        client_name: orderForm.name.trim(),
        client_telephone: orderForm.telephone.trim(),
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric', month: 'long', year: 'numeric'
        }),
      };
      try {
        localStorage.setItem('ikabay_last_order', JSON.stringify(orderData));
      } catch (e) { /* ignore */ }

      // Navigate to confirmation page after short delay
      setTimeout(() => {
        navigate(`/commande-confirmee?id=${num}&product=${encodeURIComponent(product.nameFr)}&qty=${orderForm.quantity}&price=${product.price || 0}`);
      }, 2000);
    } catch (err) {
      setOrderError('Erreur réseau. Veuillez réessayer ou nous contacter sur WhatsApp.');
      console.error(err);
    } finally {
      setOrderSubmitting(false);
    }
  };

  if (!product) {
    return (
      <section className="pageSection" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Produit non trouvé</h2>
        <p>Référence "{id}" introuvable dans notre catalogue.</p>
        <Link to="/catalogue" style={{ color: '#0f766e', fontWeight: 800 }}>← Retour au catalogue</Link>
      </section>
    );
  }

  const statusInfo = STATUS_STYLES[product.status] || STATUS_STYLES['a-confirmer'];
  const catIcon = CATEGORY_ICONS[product.category] || '📦';
  const category = categories.find(c => c.id === product.category);

  const handleWhatsAppOrder = (supplier) => {
    const msg = `Bonjour ${supplier.name},\n\nJe suis Ikabay Sourcing. Je souhaite commander :\n\n*${product.nameFr}*\nRéf: ${product.id}\nQuantité: ${product.unit}\nPrix: ${supplier.price}\n\nMerci de confirmer disponibilité et délai.\n\nIkabay Sourcing`;
    window.open(waMessage(msg), '_blank');
  };

  return (
    <section className="pageSection">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 14, fontWeight: 600, color: '#60716f' }}>
        <Link to="/" style={{ color: '#60716f', textDecoration: 'none' }}>Accueil</Link>
        <span>/</span>
        <Link to="/catalogue" style={{ color: '#60716f', textDecoration: 'none' }}>Catalogue</Link>
        <span>/</span>
        <span style={{ color: '#0a4a5c' }}>{product.nameFr}</span>
      </div>

      {/* ─── PRODUCT MAIN SECTION (OSCULATI STYLE) ─── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32,
        background: 'rgba(255,255,255,0.95)', borderRadius: 24,
        border: '1px solid rgba(16,32,34,0.1)', padding: 32,
        boxShadow: '0 18px 50px rgba(26,72,70,0.09)',
        marginBottom: 32
      }}>
        {/* LEFT: Product Image */}
        <div style={{
          background: 'linear-gradient(135deg, #f8faf9, #edf3f1)',
          borderRadius: 20, minHeight: 400,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(16,32,34,0.06)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 80, opacity: 0.15 }}>{catIcon}</span>
            <p style={{ fontSize: 14, color: '#8aa09c', marginTop: 8 }}>
              Photo produit disponible sur demande
            </p>
          </div>
          {/* Float badge */}
          <span style={{
            position: 'absolute', top: 16, left: 16,
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: statusInfo.bg, color: statusInfo.color,
            borderRadius: 999, padding: '6px 14px', fontSize: 13, fontWeight: 800
          }}>
            {product.status === 'disponible' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
            {statusInfo.label}
          </span>
          {/* Reference badge */}
          <span style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(15,118,110,0.1)', color: '#0f766e',
            borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 800,
            fontFamily: 'monospace'
          }}>
            {product.id.toUpperCase()}
          </span>
        </div>

        {/* RIGHT: Product Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>{catIcon}</span>
            <span style={{
              background: 'rgba(15,118,110,0.08)', color: '#0f766e',
              borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 700
            }}>
              {category?.name || product.category}
            </span>
            <span style={{ fontSize: 11, color: '#8aa09c', fontWeight: 600 }}>
              Réf: {product.id.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(24px, 3vw, 34px)', lineHeight: 1.2, margin: 0 }}>
            {product.nameFr}
          </h1>
          {product.nameEn && (
            <p style={{ fontSize: 15, color: '#60716f', margin: '-8px 0 0', fontStyle: 'italic' }}>
              {product.nameEn}
            </p>
          )}

          {/* Price block */}
          <div style={{
            background: 'linear-gradient(135deg, #0a4a5c, #0f766e)',
            borderRadius: 16, padding: '20px 24px', color: 'white'
          }}>
            <div style={{ fontSize: 13, opacity: 0.85, fontWeight: 600 }}>Prix à partir de</div>
            <div style={{ fontSize: 36, fontWeight: 900, margin: '4px 0' }}>
              {product.price > 0 ? `${product.price} €` : 'Sur devis'}
            </div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>
              par {product.unit} — {statusInfo.label}
            </div>
          </div>

          {/* Specs */}
          <div style={{
            background: '#f8faf9', borderRadius: 14, padding: 16,
            border: '1px solid rgba(16,32,34,0.06)'
          }}>
            <h4 style={{ fontSize: 13, fontWeight: 800, color: '#435956', textTransform: 'uppercase', margin: '0 0 8px' }}>
              Caractéristiques techniques
            </h4>
            <p style={{ fontSize: 14, color: '#34514f', lineHeight: 1.6, margin: 0 }}>
              {product.comment}
            </p>
          </div>

          {/* Quick actions */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to={`/devis?add=${product.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#f97316', color: 'white', border: 0, borderRadius: 14,
                padding: '12px 24px', fontWeight: 800, fontSize: 15, cursor: 'pointer',
                textDecoration: 'none', boxShadow: '0 8px 24px rgba(249,115,22,0.3)'
              }}>
              <ShoppingCart size={18} /> Ajouter au devis
            </Link>
            <button onClick={() => { resetOrderForm(); setShowOrderModal(true); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#ea580c', color: 'white', border: 0, borderRadius: 14,
                padding: '12px 24px', fontWeight: 800, fontSize: 15, cursor: 'pointer',
                textDecoration: 'none', boxShadow: '0 8px 24px rgba(234,88,12,0.3)'
              }}>
              <Send size={18} /> Commander maintenant
            </button>
            <a href={waMessage(`Bonjour Ikabay, je suis intéressé par ${product.nameFr} (${product.id}).`)}
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#25d366', color: 'white', border: 0, borderRadius: 14,
                padding: '12px 24px', fontWeight: 800, fontSize: 15, cursor: 'pointer',
                textDecoration: 'none'
              }}>
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ─── SUPPLIERS COMPARISON TABLE ─── */}
      <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', marginBottom: 16 }}>
        Comparatif fournisseurs
      </h2>
      {product.suppliers && product.suppliers.length > 0 ? (
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {product.suppliers.map((s, i) => {
            const isBest = s.reco || i === 0;
            return (
              <div key={i} style={{
                background: isBest ? 'rgba(15,118,110,0.04)' : 'rgba(255,255,255,0.92)',
                border: isBest ? '2px solid #0f766e' : '1px solid rgba(16,32,34,0.1)',
                borderRadius: 18, padding: 20, position: 'relative'
              }}>
                {isBest && (
                  <div style={{
                    position: 'absolute', top: -10, right: 16,
                    background: '#0f766e', color: 'white', borderRadius: 999,
                    padding: '3px 12px', fontSize: 11, fontWeight: 800,
                    display: 'inline-flex', alignItems: 'center', gap: 4
                  }}>
                    <Star size={11} /> Recommandé
                  </div>
                )}
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>
                  {s.name}
                </div>
                <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#60716f' }}>💰 Prix</span>
                    <span style={{ fontWeight: 800, color: '#0a4a5c' }}>{s.price}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#60716f' }}><Clock size={14} style={{ verticalAlign: 'middle' }} /> Délai</span>
                    <span style={{ fontWeight: 700 }}>{s.delivery}</span>
                  </div>
                  {s.link && (
                    <a href={s.link} target="_blank" rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        color: '#0f766e', fontWeight: 700, fontSize: 13, textDecoration: 'none',
                        marginTop: 4
                      }}>
                      <ExternalLink size={13} /> Voir la fiche produit
                    </a>
                  )}
                </div>
                <button onClick={() => handleWhatsAppOrder(s)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    width: '100%', marginTop: 12,
                    background: isBest ? '#0f766e' : 'rgba(15,118,110,0.1)',
                    color: isBest ? 'white' : '#0f766e',
                    border: 0, borderRadius: 12,
                    padding: '10px', fontWeight: 700, fontSize: 13, cursor: 'pointer'
                  }}>
                  <MessageCircle size={15} /> Commander via WhatsApp
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ color: '#60716f' }}>Aucun fournisseur référencé pour ce produit.</p>
      )}

      {/* ─── BACK LINK ─── */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <Link to="/catalogue" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: '#0f766e', fontWeight: 800, fontSize: 15, textDecoration: 'none',
          padding: '12px 20px', borderRadius: 14,
          background: 'rgba(15,118,110,0.06)'
        }}>
          <ArrowLeft size={18} /> Retour au catalogue
        </Link>
      </div>

      {/* ─── ORDER MODAL ─── */}
      {showOrderModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20
        }} onClick={(e) => { if (e.target === e.currentTarget && !orderSubmitting) { setShowOrderModal(false); resetOrderForm(); } }}>
          <div style={{
            background: 'white', borderRadius: 24, maxWidth: 500, width: '100%',
            padding: 32, boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
            position: 'relative'
          }}>
            {/* Close */}
            <button onClick={() => { if (!orderSubmitting) { setShowOrderModal(false); resetOrderForm(); } }}
              style={{
                position: 'absolute', top: 16, right: 16, background: 'none',
                border: 'none', cursor: 'pointer', color: '#60716f', padding: 4
              }} aria-label="Fermer">
              <X size={22} />
            </button>

            {orderSuccess ? (
              /* ─── SUCCESS STATE ─── */
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: '#dcfce7', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 16px'
                }}>
                  <Check size={32} color="#16a34a" />
                </div>
                <h3 style={{ margin: '0 0 8px', color: '#16a34a', fontSize: 22 }}>
                  Commande envoyée !
                </h3>
                <p style={{ color: '#435956', fontSize: 15, margin: '0 0 6px' }}>
                  Nous vous confirmons sous 24h.
                </p>
                <p style={{ color: '#60716f', fontSize: 13, margin: '0 0 20px' }}>
                  Réf: <strong>{orderNumber}</strong>
                </p>
                <a href={waMessage(`Bonjour Ikabay, je viens de commander ${product.nameFr} (réf: ${orderNumber}). Suivi de commande SVP.`)}
                  target="_blank" rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#25d366', color: 'white', border: 0, borderRadius: 14,
                    padding: '12px 24px', fontWeight: 800, fontSize: 15, cursor: 'pointer',
                    textDecoration: 'none'
                  }}>
                  <MessageCircle size={18} /> Suivi WhatsApp
                </a>
              </div>
            ) : (
              /* ─── FORM STATE ─── */
              <>
                <h3 style={{ margin: '0 0 4px', color: '#0a4a5c', fontSize: 22 }}>
                  Commander
                </h3>
                <p style={{ color: '#60716f', fontSize: 14, margin: '0 0 20px' }}>
                  {product.nameFr} — {product.price > 0 ? `${product.price} €` : 'Sur devis'}
                </p>

                <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#435956', marginBottom: 4 }}>
                      Nom complet *
                    </label>
                    <input type="text" required value={orderForm.name}
                      onChange={e => setOrderForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Votre nom"
                      style={{
                        width: '100%', padding: '12px 14px', border: '1px solid #d0dbd8',
                        borderRadius: 12, fontSize: 15, outline: 'none',
                        boxSizing: 'border-box'
                      }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#435956', marginBottom: 4 }}>
                      Téléphone *
                    </label>
                    <input type="tel" required value={orderForm.telephone}
                      onChange={e => setOrderForm(p => ({ ...p, telephone: e.target.value }))}
                      placeholder="+596 XXX XXX XX"
                      style={{
                        width: '100%', padding: '12px 14px', border: '1px solid #d0dbd8',
                        borderRadius: 12, fontSize: 15, outline: 'none',
                        boxSizing: 'border-box'
                      }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#435956', marginBottom: 4 }}>
                      Quantité
                    </label>
                    <input type="number" min="1" value={orderForm.quantity}
                      onChange={e => setOrderForm(p => ({ ...p, quantity: e.target.value }))}
                      style={{
                        width: '100%', padding: '12px 14px', border: '1px solid #d0dbd8',
                        borderRadius: 12, fontSize: 15, outline: 'none',
                        boxSizing: 'border-box'
                      }} />
                  </div>

                  {orderError && (
                    <p style={{ color: '#dc2626', fontSize: 13, margin: 0 }}>{orderError}</p>
                  )}

                  <button type="submit" disabled={orderSubmitting}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      background: '#ea580c', color: 'white', border: 0, borderRadius: 14,
                      padding: '14px 24px', fontWeight: 800, fontSize: 16, cursor: 'pointer',
                      opacity: orderSubmitting ? 0.7 : 1, marginTop: 4
                    }}>
                    {orderSubmitting ? <Loader size={20} className="loadingSpin" /> : <Send size={20} />}
                    {orderSubmitting ? 'Envoi en cours…' : 'Confirmer la commande'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetailPage;