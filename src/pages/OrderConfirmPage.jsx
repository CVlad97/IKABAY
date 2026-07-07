import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle, MessageCircle, ArrowLeft, Package,
  Calendar, Phone, ShoppingCart
} from 'lucide-react';
import { WHATSAPP_URL, waMessage, APP_NAME, APP_EMAIL } from '../utils/constants';

export function OrderConfirmPage() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);

  const orderId = searchParams.get('id');
  const product = searchParams.get('product');
  const qty = searchParams.get('qty');
  const price = searchParams.get('price');

  useEffect(() => {
    // Try to load from localStorage for the most recent order
    try {
      const stored = localStorage.getItem('ikabay_last_order');
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const displayOrder = order || {
    id: orderId || 'CMD-' + Date.now().toString(36).toUpperCase(),
    product_name: product || 'Produit commandé',
    quantity: parseInt(qty) || 1,
    price: parseFloat(price) || 0,
    date: new Date().toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    }),
  };

  return (
    <section className="pageSection">
      <div style={{
        maxWidth: 560, margin: '0 auto',
        background: 'rgba(255,255,255,0.95)', borderRadius: 24,
        border: '1px solid rgba(16,32,34,0.1)', padding: 40,
        boxShadow: '0 18px 50px rgba(26,72,70,0.09)',
        textAlign: 'center'
      }}>
        {/* Confirmation badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#dcfce7', color: '#16a34a',
          borderRadius: 999, padding: '8px 20px',
          fontSize: 14, fontWeight: 800, marginBottom: 20
        }}>
          <CheckCircle size={18} />
          Confirmation
        </div>

        {/* Icon */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <Package size={36} color="#16a34a" />
        </div>

        <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: '#0a4a5c', margin: '0 0 8px' }}>
          Commande confirmée !
        </h1>
        <p style={{ color: '#60716f', fontSize: 16, margin: '0 0 24px' }}>
          Merci pour votre commande. Nous vous confirmons sous 24h par WhatsApp ou email.
        </p>

        {/* Order number */}
        <div style={{
          background: '#f0f5f3', borderRadius: 16, padding: '16px 24px',
          marginBottom: 24, display: 'inline-block'
        }}>
          <span style={{ fontSize: 12, color: '#60716f', fontWeight: 600, display: 'block', marginBottom: 4 }}>
            Numéro de commande
          </span>
          <span style={{
            fontSize: 20, fontWeight: 900, color: '#0a4a5c',
            fontFamily: 'monospace', letterSpacing: 1
          }}>
            {displayOrder.id}
          </span>
        </div>

        {/* Order summary */}
        <div style={{
          background: '#f8faf9', borderRadius: 16, padding: 24,
          border: '1px solid rgba(16,32,34,0.06)',
          textAlign: 'left', marginBottom: 24
        }}>
          <h4 style={{
            fontSize: 13, fontWeight: 800, color: '#435956',
            textTransform: 'uppercase', margin: '0 0 16px',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <ShoppingCart size={14} /> Résumé de la commande
          </h4>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#60716f' }}>Produit</span>
              <span style={{ fontWeight: 700, color: '#0a4a5c', textAlign: 'right', maxWidth: '60%' }}>
                {displayOrder.product_name}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#60716f' }}>Quantité</span>
              <span style={{ fontWeight: 700 }}>{displayOrder.quantity}</span>
            </div>
            {displayOrder.price > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#60716f' }}>Prix unitaire</span>
                <span style={{ fontWeight: 700 }}>{displayOrder.price} €</span>
              </div>
            )}
            <div style={{
              display: 'flex', justifyContent: 'space-between', fontSize: 14,
              borderTop: '1px solid #e0e8e5', paddingTop: 12, marginTop: 4
            }}>
              <span style={{ color: '#60716f', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={14} /> Date
              </span>
              <span style={{ fontWeight: 700 }}>{displayOrder.date}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp support button */}
        <a href={waMessage(`Bonjour Ikabay, je suis ${displayOrder.client_name || ''} et j'ai passé commande (réf: ${displayOrder.id}). Suivi SVP.`)}
          target="_blank" rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#25d366', color: 'white', border: 0, borderRadius: 14,
            padding: '14px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer',
            textDecoration: 'none', width: '100%', marginBottom: 12
          }}>
          <MessageCircle size={20} /> Suivi sur WhatsApp
        </a>

        {/* Back to catalogue */}
        <Link to="/catalogue"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            color: '#0f766e', fontWeight: 800, fontSize: 15, textDecoration: 'none',
            padding: '12px 20px', borderRadius: 14,
            background: 'rgba(15,118,110,0.06)', width: '100%'
          }}>
          <ArrowLeft size={18} /> Retour au catalogue
        </Link>
      </div>
    </section>
  );
}

export default OrderConfirmPage;