import { useState } from 'react';
import {
  User, Clock, FileText, MessageCircle, Truck, CheckCircle,
  Circle, Plus, Send, BarChart3,
  Star, Package
} from 'lucide-react';
import { waMessage } from '../utils/constants';

const STAGES = [
  'Demande reçue', 'Analyse stock', 'Recherche fournisseurs',
  'RFQ envoyée', 'Offres reçues', 'Comparaison',
  'Devis envoyé', 'Validation client', 'Commande',
  'Transport', 'Livraison', 'Clôture'
];

const DUMMY_PRODUCTS = [
  { ref: 'P-BUOY-01', name: 'Bouée de sauvetage', qte: 10, pu: 15.00, pa: 9.50, marge: '36.7%', total: 150.00, dispo: 'Disponible', comment: 'Livraison 48h' },
  { ref: 'P-LIGHT-03', name: 'Feu tribord vert LED', qte: 5, pu: 18.00, pa: 12.00, marge: '33.3%', total: 90.00, dispo: 'Disponible', comment: 'Certifié CE' },
  { ref: 'P-INOX-07', name: 'Charnière inox 316L', qte: 20, pu: 0, pa: 0, marge: '—', total: 0, dispo: 'À confirmer', comment: 'Attente devis fournisseur' },
  { ref: 'P-ANCR-02', name: 'Ancre type Danforth', qte: 3, pu: 82.00, pa: 51.00, marge: '37.8%', total: 246.00, dispo: 'Disponible', comment: 'Stock Marseille' },
];

export function DossierJulesPage() {
  const [activeStep] = useState(2); // étape "Recherche fournisseurs"
  const [comment, setComment] = useState('');

  const handleWhatsApp = () => {
    window.open(waMessage(
      'Bonjour Jules, voici les dernières infos sur votre dossier sourcing nautique. Contactez-nous pour plus de détails.'
    ));
  };

  return (
    <section className="pageSection">
      {/* ─── HEADER ─── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span className="badge" style={{ background: '#0f766e' }}>Sourcing Nautique</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#fef3c7', color: '#92400e', borderRadius: 999,
          padding: '6px 14px', fontSize: 13, fontWeight: 800
        }}>
          <Clock size={14} /> En cours
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, marginBottom: 4 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: '#e7fbf7', display: 'grid', placeItems: 'center', color: '#0f766e' }}>
          <User size={28} />
        </div>
        <h1 style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 44px)' }}>Jules Defel</h1>
      </div>
      <p style={{ color: '#60716f', fontWeight: 600, margin: '0 0 28px 68px' }}>
        Dossier suivi par Ikabay Sourcing &mdash; <a href="mailto:sourcing@ikabay.store" style={{ color: '#0f766e', fontWeight: 800, textDecoration: 'none' }}>sourcing@ikabay.store</a>
      </p>

      {/* ─── TIMELINE ─── */}
      <div style={{
        background: 'rgba(255,255,255,0.88)', borderRadius: 24,
        border: '1px solid rgba(16,32,34,0.1)', padding: '24px 20px',
        marginBottom: 24, overflowX: 'auto'
      }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, fontSize: 16 }}>
          <BarChart3 size={18} color="#0f766e" /> Avancement du dossier
        </h3>
        <div style={{ display: 'flex', gap: 0, minWidth: 800 }}>
          {STAGES.map((stage, i) => {
            const isActive = i === activeStep;
            const isPast = i < activeStep;
            return (
              <div key={stage} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                {/* Connector line */}
                {i > 0 && (
                  <div style={{
                    position: 'absolute', top: 14, left: 0, right: '50%',
                    height: 3, background: isPast || isActive ? '#0f766e' : '#dce7e3',
                    zIndex: 0
                  }} />
                )}
                {/* Dot */}
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: isPast ? '#0f766e' : isActive ? '#f97316' : '#e8f0ec',
                  color: isPast || isActive ? 'white' : '#8aa09c',
                  position: 'relative', zIndex: 1, marginBottom: 6,
                  boxShadow: isActive ? '0 0 0 4px rgba(249,115,22,0.2)' : 'none'
                }}>
                  {isPast ? <CheckCircle size={14} /> : isActive ? <Circle size={14} /> : <span style={{ fontSize: 11, fontWeight: 800 }}>{i + 1}</span>}
                </div>
                {/* Label */}
                <div style={{
                  fontSize: 10, fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#0a4a5c' : '#60716f',
                  lineHeight: 1.2, maxWidth: 80, margin: '0 auto',
                  transform: 'scale(0.95)',
                  whiteSpace: 'normal'
                }}>
                  {stage}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── INFO CARDS ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { icon: <FileText size={22} />, label: 'Budget', value: 'À compléter', color: '#f97316' },
          { icon: <Clock size={22} />, label: 'Urgence', value: 'À compléter', color: '#92400e' },
          { icon: <FileText size={22} />, label: 'Documents liés', value: '3 documents', color: '#0f766e' },
        ].map(card => (
          <div key={card.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: '#f4f9f7', display: 'grid', placeItems: 'center', color: card.color }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#60716f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#0a4a5c' }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── ACTIONS RAPIDES ─── */}
      <div className="card" style={{ padding: 16, marginBottom: 24 }}>
        <h3 className="sectionTitle" style={{ fontSize: 16, margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart3 size={18} color="#0f766e" /> Actions rapides
        </h3>
        <div className="cardGrid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10, display: 'grid' }}>
          {[
            { icon: <Package size={16} />, label: 'Ajouter produit du déstockage', variant: 'primary' },
            { icon: <FileText size={16} />, label: 'Créer devis', variant: 'primary' },
            { icon: <Send size={16} />, label: 'Envoyer RFQ fournisseur', variant: 'primary' },
            { icon: <Star size={16} />, label: 'Évaluer fournisseur', variant: 'secondary' },
            { icon: <Truck size={16} />, label: 'Planifier transport', variant: 'primary' },
            { icon: <MessageCircle size={16} />, label: 'Envoyer WhatsApp', variant: 'secondary', onClick: handleWhatsApp },
            { icon: <CheckCircle size={16} />, label: 'Marquer comme validé', variant: 'secondary' },
          ].map(btn => {
            const cls = btn.variant === 'primary' ? 'btn btnPrimary' : 'btn btnSecondary';
            return (
              <button
                key={btn.label}
                className={cls}
                onClick={btn.onClick}
                title={btn.label}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 14px', fontSize: 13, minHeight: 42 }}
              >
                {btn.icon} <span style={{ whiteSpace: 'nowrap' }}>{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── PRODUITS PROPOSÉS ─── */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(16,32,34,0.08)' }}>
          <h3 className="sectionTitle" style={{ fontSize: 17, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart3 size={18} color="#0f766e" /> Produits proposés
          </h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(16,32,34,0.06)', background: '#f4f9f7' }}>
                {['Référence', 'Nom produit', 'Quantité', 'Prix unitaire', 'Prix achat estimé', 'Marge', 'Total', 'Disponibilité', 'Commentaire'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 10px', fontWeight: 800, color: '#435956', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DUMMY_PRODUCTS.map(p => (
                <tr key={p.ref} style={{ borderBottom: '1px solid rgba(16,32,34,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0a4a5c', whiteSpace: 'nowrap' }}>{p.ref}</td>
                  <td style={{ padding: '12px 10px', whiteSpace: 'nowrap' }}>{p.name}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700 }}>{p.qte}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.pu > 0 ? `${p.pu.toFixed(2)} €` : 'Nous contacter'}</td>
                  <td style={{ padding: '12px 10px', whiteSpace: 'nowrap' }}>{p.pa > 0 ? `${p.pa.toFixed(2)} €` : '—'}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700 }}>{p.marge}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.total > 0 ? `${p.total.toFixed(2)} €` : '—'}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      background: p.dispo === 'Disponible' ? '#dcfce7' : '#fff7ed',
                      color: p.dispo === 'Disponible' ? '#16a34a' : '#ea580c',
                      borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap'
                    }}>
                      {p.dispo}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#60716f', fontSize: 12, maxWidth: 140 }}>{p.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(16,32,34,0.06)', fontSize: 12, color: '#60716f', textAlign: 'right' }}>
          Contact fournisseur : <a href="mailto:sourcing@ikabay.store" style={{ color: '#0f766e', fontWeight: 700, textDecoration: 'none' }}>sourcing@ikabay.store</a>
        </div>
      </div>

      {/* ─── COMMENTS / NOTES ─── */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 17 }}>
          <MessageCircle size={18} color="#0f766e" /> Notes et commentaires
        </h3>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Ajouter une note interne..."
            style={{
              flex: 1, minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
              padding: '0 16px', outline: 'none', fontWeight: 600, fontSize: 14, background: 'white'
            }}
          />
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#0f766e', color: 'white', border: 0, borderRadius: 14,
            padding: '0 18px', fontWeight: 800, cursor: 'pointer', minHeight: 48
          }}>
            <Send size={16} /> Envoyer
          </button>
        </div>
        <div style={{ marginTop: 16, padding: 12, background: '#f8faf9', borderRadius: 14, fontSize: 13, color: '#5a6d6b' }}>
          <em>Aucune note pour le moment.</em>
        </div>
      </div>
    </section>
  );
}

export default DossierJulesPage;