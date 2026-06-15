import { useState, useMemo } from 'react';
import {
  FileText, Calculator, Send, Printer, Copy,
  CheckCircle, Plus, Trash2
} from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { waMessage, APP_EMAIL } from '../utils/constants';

function generateRef() {
  const n = String(Math.floor(1000 + Math.random() * 9000));
  return `DEV-${n}-IKB`;
}

function today() {
  return new Date().toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

export function DevisPage() {
  const [ref] = useState(generateRef());
  const [clientName, setClientName] = useState('');
  const [items, setItems] = useState([]);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Marges configurables
  const FRAIS_ESTIMES_RATE = 0.08;   // 8% frais estimés
  const MARGE_ESTIMEE_RATE = 0.25;   // 25% marge
  const ACOMPTE_RATE = 0.30;         // 30% acompte

  const addProduct = () => {
    if (!selectedProduct) return;
    const p = products.find(pr => pr.id === selectedProduct);
    if (!p) return;
    setItems(prev => [...prev, {
      id: `${p.id}-${Date.now()}`,
      productId: p.id,
      name: p.nameFr,
      quantite: 1,
      prixAchat: p.price || 0,
      prixVente: p.price ? Math.round(p.price * 1.35) : 0,
    }]);
    setSelectedProduct('');
    setShowAddPanel(false);
  };

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: field === 'quantite' ? Math.max(0, parseInt(value) || 0) : parseFloat(value) || 0 };
      return updated;
    }));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const totals = useMemo(() => {
    const sousTotal = items.reduce((sum, item) => sum + (item.quantite * item.prixVente), 0);
    const fraisEstimés = Math.round(sousTotal * FRAIS_ESTIMES_RATE);
    const margeEstimée = Math.round(sousTotal * MARGE_ESTIMEE_RATE);
    const totalFinal = sousTotal + fraisEstimés;
    const acompte = Math.round(totalFinal * ACOMPTE_RATE);
    return { sousTotal, fraisEstimés, margeEstimée, totalFinal, acompte };
  }, [items]);

  const handleEmail = () => {
    const subject = encodeURIComponent(`Devis ${ref} — Ikabay Sourcing`);
    const body = encodeURIComponent(
      `Bonjour,\n\nVeuillez trouver ci-joint le devis ${ref} établi par Ikabay Sourcing.\n\nTotal : ${totals.totalFinal} €\nAcompte conseillé : ${totals.acompte} €\n\nCordialement,\nL'équipe Ikabay Sourcing`
    );
    window.open(`mailto:${APP_EMAIL}?subject=${subject}&body=${body}`);
  };

  const handleWhatsApp = () => {
    const msg = items.map(i =>
      `- ${i.name} x${i.quantite} : ${i.prixVente}€/pc (total ${i.quantite * i.prixVente}€)`
    ).join('\n');
    window.open(waMessage(
      `*Devis ${ref} — Ikabay Sourcing*\n\nClient : ${clientName || 'À définir'}\n\n${msg}\n\n*Sous-total : ${totals.sousTotal} €*\n*Frais estimés : ${totals.fraisEstimés} €*\n*Total : ${totals.totalFinal} €*\n*Acompte conseillé : ${totals.acompte} €*\n\nDevis sous réserve de disponibilité.`
    ));
  };

  const handlePrint = () => window.print();

  const handleDuplicate = () => {
    setRef(generateRef());
  };

  // HACK: on a besoin de setRef pour dupliquer
  const [, setRef] = useState(ref);

  const handleMarkAccepted = () => {
    alert(`Devis ${ref} marqué comme accepté ✓`);
  };

  return (
    <section className="pageSection">
      {/* ─── HEADER ─── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span className="badge" style={{ background: '#0f766e' }}>Devis</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#fef3c7', color: '#92400e', borderRadius: 999,
          padding: '6px 14px', fontSize: 13, fontWeight: 800
        }}>
          <FileText size={14} /> {ref}
        </span>
      </div>
      <h1 style={{ margin: '0 0 4px', fontSize: 'clamp(28px, 4vw, 44px)' }}>Nouveau devis</h1>
      <p style={{ color: '#60716f', fontWeight: 600, margin: '0 0 24px' }}>Date : {today()}</p>

      {/* ─── CLIENT & REF ─── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24,
        background: 'rgba(255,255,255,0.85)', borderRadius: 20, padding: 18,
        border: '1px solid rgba(16,32,34,0.1)'
      }}>
        <div style={{ flex: '1 1 240px' }}>
          <label style={{ fontSize: 12, fontWeight: 800, color: '#60716f', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 6 }}>Client</label>
          <input
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="Nom du client / entreprise"
            style={{
              width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
              padding: '0 14px', fontWeight: 700, fontSize: 15, outline: 'none', background: 'white'
            }}
          />
        </div>
        <div style={{ flex: '0 1 180px' }}>
          <label style={{ fontSize: 12, fontWeight: 800, color: '#60716f', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 6 }}>Référence</label>
          <div style={{
            width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
            padding: '0 14px', fontWeight: 700, fontSize: 15, background: 'white',
            display: 'flex', alignItems: 'center', color: '#0a4a5c'
          }}>
            {ref}
          </div>
        </div>
      </div>

      {/* ─── ADD PRODUCT PANEL ─── */}
      {showAddPanel && (
        <div style={{
          background: 'rgba(255,255,255,0.95)', borderRadius: 20, padding: 18, marginBottom: 16,
          border: '2px solid #0f766e', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center'
        }}>
          <div style={{ flex: '1 1 280px', display: 'flex', alignItems: 'center', gap: 8,
            background: 'white', border: '1px solid rgba(16,32,34,0.13)', borderRadius: 14,
            padding: '0 12px', minHeight: 48 }}>
            <Plus size={16} color="#60716f" />
            <select
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
              style={{ border: 0, outline: 'none', width: '100%', background: 'transparent', minHeight: 46, fontWeight: 600, fontSize: 14 }}
            >
              <option value="">Choisir un produit...</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nameFr} — {formatPrice(p.price)}
                </option>
              ))}
            </select>
          </div>
          <button onClick={addProduct} disabled={!selectedProduct}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: selectedProduct ? '#0f766e' : '#bccfcc', color: 'white', border: 0,
              borderRadius: 14, padding: '0 20px', fontWeight: 800, cursor: selectedProduct ? 'pointer' : 'not-allowed',
              minHeight: 48
            }}>
            <Plus size={16} /> Ajouter au devis
          </button>
          <button onClick={() => setShowAddPanel(false)}
            style={{
              background: 'none', border: '1px solid rgba(16,32,34,0.13)', borderRadius: 14,
              padding: '0 16px', fontWeight: 700, cursor: 'pointer', minHeight: 48, color: '#435956'
            }}>
            Annuler
          </button>
        </div>
      )}

      {/* ─── ITEMS TABLE ─── */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid rgba(16,32,34,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h3 style={{ fontSize: 17, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calculator size={18} color="#0f766e" /> Lignes du devis
          </h3>
          <button onClick={() => setShowAddPanel(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#0f766e', color: 'white', border: 0, borderRadius: 12,
              padding: '8px 14px', fontWeight: 800, fontSize: 13, cursor: 'pointer', minHeight: 38
            }}>
            <Plus size={15} /> Ajouter
          </button>
        </div>
        {items.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#8aa09c', fontWeight: 600 }}>
            Aucune ligne. Cliquez sur "Ajouter" pour insérer un produit du déstockage.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(16,32,34,0.06)', background: '#f4f9f7' }}>
                  {['Produit', 'Quantité', 'Prix achat', 'Prix vente', 'Marge %', 'Total ligne', ''].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 10px', fontWeight: 800, color: '#435956', fontSize: 12, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  const totalLigne = item.quantite * item.prixVente;
                  const margePct = item.prixAchat > 0
                    ? Math.round(((item.prixVente - item.prixAchat) / item.prixVente) * 100)
                    : 0;
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid rgba(16,32,34,0.04)' }}>
                      <td style={{ padding: '10px', fontWeight: 700, color: '#0a4a5c', minWidth: 160 }}>{item.name}</td>
                      <td style={{ padding: '10px', minWidth: 80 }}>
                        <input type="number" min="1" value={item.quantite}
                          onChange={e => updateItem(item.id, 'quantite', e.target.value)}
                          style={{ width: 60, minHeight: 36, borderRadius: 10, border: '1px solid rgba(16,32,34,0.13)', textAlign: 'center', fontWeight: 700, outline: 'none' }}
                        />
                      </td>
                      <td style={{ padding: '10px', fontWeight: 600 }}>
                        <input type="number" min="0" step="0.01" value={item.prixAchat}
                          onChange={e => updateItem(item.id, 'prixAchat', e.target.value)}
                          style={{ width: 80, minHeight: 36, borderRadius: 10, border: '1px solid rgba(16,32,34,0.13)', textAlign: 'center', fontWeight: 700, outline: 'none' }}
                        /> €
                      </td>
                      <td style={{ padding: '10px', fontWeight: 600 }}>
                        <input type="number" min="0" step="0.01" value={item.prixVente}
                          onChange={e => updateItem(item.id, 'prixVente', e.target.value)}
                          style={{ width: 80, minHeight: 36, borderRadius: 10, border: '1px solid rgba(16,32,34,0.13)', textAlign: 'center', fontWeight: 700, outline: 'none' }}
                        /> €
                      </td>
                      <td style={{ padding: '10px', fontWeight: 800, color: margePct >= 25 ? '#16a34a' : margePct > 0 ? '#ea580c' : '#60716f' }}>
                        {margePct}%
                      </td>
                      <td style={{ padding: '10px', fontWeight: 900, color: '#0a4a5c' }}>{totalLigne} €</td>
                      <td style={{ padding: '10px' }}>
                        <button onClick={() => removeItem(item.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: 6, borderRadius: 8 }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── TOTAUX ─── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12, marginBottom: 24
      }}>
        {[
          { label: 'Sous-total', value: `${totals.sousTotal} €`, color: '#0a4a5c' },
          { label: 'Frais estimés (8%)', value: `${totals.fraisEstimés} €`, color: '#f97316' },
          { label: 'Marge estimée (25%)', value: `${totals.margeEstimée} €`, color: '#16a34a' },
          { label: 'Total final', value: `${totals.totalFinal} €`, color: '#0a4a5c', bold: true },
          { label: 'Acompte conseillé (30%)', value: `${totals.acompte} €`, color: '#92400e' },
        ].map(t => (
          <div key={t.label} className="card" style={{
            padding: 16, textAlign: 'center',
            border: t.bold ? '2px solid #0a4a5c' : '1px solid rgba(16,32,34,0.1)',
            background: t.bold ? 'rgba(10,74,92,0.06)' : 'rgba(255,255,255,0.88)'
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#60716f', textTransform: 'uppercase', marginBottom: 6 }}>{t.label}</div>
            <div style={{ fontSize: t.bold ? 26 : 22, fontWeight: 900, color: t.color }}>{t.value}</div>
          </div>
        ))}
      </div>

      {/* ─── MENTION LÉGALE ─── */}
      <p style={{
        fontSize: 13, color: '#8aa09c', fontStyle: 'italic',
        margin: '0 0 20px', textAlign: 'center'
      }}>
        Devis sous réserve de disponibilité, confirmation fournisseur et validation finale du client.
      </p>

      {/* ─── ACTIONS ─── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 10,
        background: 'rgba(255,255,255,0.85)', borderRadius: 20, padding: 16,
        border: '1px solid rgba(16,32,34,0.1)', justifyContent: 'center'
      }}>
        {[
          { icon: <Printer size={16} />, label: 'Préparer PDF', bg: '#0a4a5c', onClick: handlePrint },
          { icon: <Send size={16} />, label: 'Envoyer email', bg: '#0f766e', onClick: handleEmail },
          { icon: <MessageCircle size={16} />, label: 'Envoyer WhatsApp', bg: '#25d366', onClick: handleWhatsApp },
          { icon: <CheckCircle size={16} />, label: 'Marquer accepté', bg: '#16a34a', onClick: handleMarkAccepted },
          { icon: <Copy size={16} />, label: 'Dupliquer', bg: '#92400e', onClick: handleDuplicate },
        ].map(btn => (
          <button key={btn.label} onClick={btn.onClick}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: btn.bg, color: 'white', border: 0, borderRadius: 14,
              padding: '10px 18px', fontWeight: 800, fontSize: 13, cursor: 'pointer', minHeight: 44
            }}>
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default DevisPage;