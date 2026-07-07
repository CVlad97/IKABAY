import { useState } from 'react';
import {
  User, Clock, FileText, MessageCircle, Truck, CheckCircle,
  Circle, Plus, Send, BarChart3,
  Star, Package, ShoppingCart
} from 'lucide-react';
import { waMessage } from '../utils/constants';

const STAGES = [
  'Demande reçue', 'Analyse stock', 'Recherche fournisseurs',
  'RFQ envoyée', 'Offres reçues', 'Comparaison',
  'Devis envoyé', 'Validation client', 'Commande',
  'Transport', 'Livraison', 'Clôture'
];

const DUMMY_PRODUCTS = [
  { ref: 'JD-COMPAS-01', name: 'Compas magnétique Contest 150', qte: 5, pu: 543.90, pa: 543.90, marge: '0%', total: 2719.50, dispo: 'Disponible', comment: 'Plastimo — Stock 48h', fournisseur: 'Comptoir Nautique 🇫🇷' },
  { ref: 'JD-LISTON-02', name: 'Liston PVC prépercé (barre 6m)', qte: 11, pu: 8.90, pa: 8.90, marge: '0%', total: 97.90, dispo: 'Disponible', comment: 'Osculati 87.203.00 — Stock', fournisseur: 'Osculati 🇮🇹' },
  { ref: 'JD-LISERET-03', name: 'Liseret compatible liston', qte: 17, pu: 3.50, pa: 3.50, marge: '0%', total: 59.50, dispo: 'Disponible', comment: 'Osculati 87.201.00 — Stock', fournisseur: 'Osculati 🇮🇹' },
  { ref: 'JD-HUBLOT-04', name: 'Hublot ovale inox 365x150mm', qte: 10, pu: 85.90, pa: 85.90, marge: '0%', total: 859.00, dispo: 'Disponible', comment: 'Osculati 81.502 — Standard', fournisseur: 'Osculati 🇮🇹' },
  { ref: 'JD-BOLSTER-05', name: 'Bolster double baquet + sellerie', qte: 5, pu: 1800, pa: 0, marge: 'Sur devis', total: 9000, dispo: 'Sur devis', comment: 'Ullman Dynamics 🇸🇪 — Attente devis', fournisseur: 'Ullman Dynamics 🇸🇪' },
  { ref: 'JD-DAVIER-06', name: 'Davier bow roller 8-10kg', qte: 5, pu: 99, pa: 99, marge: '0%', total: 495, dispo: 'Disponible', comment: 'Quick Nemo — Stock 72h', fournisseur: 'Quick Nautical 🇮🇹' },
  { ref: 'JD-ECHELLE-07', name: 'Échelle inox 4 marches 30cm', qte: 10, pu: 112.50, pa: 112.50, marge: '0%', total: 1125, dispo: 'Disponible', comment: 'Osculati 84.840 — Stock', fournisseur: 'Osculati 🇮🇹' },
  { ref: 'JD-TAQUET-08', name: 'Taquet inox 200mm', qte: 35, pu: 18.50, pa: 18.50, marge: '0%', total: 647.50, dispo: 'Disponible', comment: 'Osculati 90.613 — Stock', fournisseur: 'Osculati 🇮🇹' },
  { ref: 'JD-LOQUET-09', name: 'Loquets inox (simple + à clé)', qte: 35, pu: 12.15, pa: 12.15, marge: '0%', total: 425.25, dispo: 'Disponible', comment: 'Osculati 92.100/102 — Stock', fournisseur: 'Osculati 🇮🇹' },
  { ref: 'JD-GOBELET-10', name: 'Porte-gobelet inox', qte: 20, pu: 8.50, pa: 8.50, marge: '0%', total: 170, dispo: 'Disponible', comment: 'Osculati 84.970 — Stock', fournisseur: 'Osculati 🇮🇹' },
  { ref: 'JD-QUINCAIL-11', name: 'Lot quincaillerie marine 5 bateaux', qte: 1, pu: 800, pa: 0, marge: 'Sur devis', total: 800, dispo: 'Sur devis', comment: 'AD Nautic — Attente confirmation', fournisseur: 'AD Nautic 🇫🇷' },
];

export function DossierJulesPage() {
  const [activeStep] = useState(5); // offres reçues
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
          { icon: <FileText size={22} />, label: 'Budget total', value: '~16 400€', color: '#f97316' },
          { icon: <Clock size={22} />, label: 'Délai estimé', value: '8-10 sem', color: '#7c3aed' },
          { icon: <Ship size={22} />, label: 'Fournisseurs', value: '15 vérifiés', color: '#0f766e' },
          { icon: <Truck size={22} />, label: 'Transport', value: 'GEODIS LCL', color: '#2563eb' },
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
                {['Réf', 'Produit', 'Qté', 'Prix unitaire', 'Fournisseur', 'Total', 'Statut', 'Commentaire'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 10px', fontWeight: 800, color: '#435956', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DUMMY_PRODUCTS.map(p => (
                <tr key={p.ref} style={{ borderBottom: '1px solid rgba(16,32,34,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0a4a5c', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{p.ref}</td>
                  <td style={{ padding: '12px 10px', whiteSpace: 'nowrap', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700, textAlign: 'center' }}>{p.qte}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.pu > 0 ? `${p.pu.toFixed(2)} €` : 'Sur devis'}</td>
                  <td style={{ padding: '12px 10px', fontSize: 12, whiteSpace: 'nowrap' }}>
                    <span style={{ fontWeight: 700, color: '#0f766e' }}>{p.fournisseur}</span>
                  </td>
                  <td style={{ padding: '12px 10px', fontWeight: 900, whiteSpace: 'nowrap' }}>{p.total > 0 ? `${p.total.toFixed(2)} €` : '—'}</td>
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
                  <td style={{ padding: '12px 10px', color: '#60716f', fontSize: 12, maxWidth: 160 }}>{p.comment}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid #0f766e', background: 'rgba(15,118,110,0.04)' }}>
                <td colSpan={4} style={{ padding: '14px 10px', fontWeight: 900, textAlign: 'right', fontSize: 14 }}>TOTAL</td>
                <td style={{ padding: '14px 10px' }}></td>
                <td style={{ padding: '14px 10px', fontWeight: 900, fontSize: 18, color: '#0a4a5c' }}>
                  {DUMMY_PRODUCTS.reduce((s, p) => s + p.total, 0).toLocaleString('fr-FR', {minimumFractionDigits: 2})} €
                </td>
                <td colSpan={2} style={{ padding: '14px 10px', color: '#60716f', fontSize: 12 }}>
                  + Transport GEODIS ~970€ / + Douane ~1 900€
                </td>
              </tr>
            </tfoot>
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