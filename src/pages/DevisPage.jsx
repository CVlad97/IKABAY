import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle, Copy, FileText, Mail, MessageCircle, Printer, RefreshCw, Send, Trash2 } from 'lucide-react';
import { exactOrderLines, logisticsScenarios, sourcingMailbox } from '../data/sourcingOperations';
import { waMessage } from '../utils/constants';

const initialQuoteLines = [
  { id: 'compas', product: 'Compas magnétique 135/150 mm', qty: 5, unitBuy: 350, unitSell: 455, freight: 60, source: 'Comptoir Nautique / Plastimo', status: 'RFQ envoyée' },
  { id: 'liston', product: 'Liston PVC prépercé 55 mm — barres 6 m', qty: 66, unitBuy: 8, unitSell: 13, freight: 180, source: 'Osculati', status: 'À confirmer exact 55 mm' },
  { id: 'liseret', product: 'Liseret compatible liston', qty: 100, unitBuy: 4, unitSell: 7, freight: 90, source: 'Osculati', status: 'RFQ envoyée' },
  { id: 'embouts', product: 'Embouts inox 316 compatibles liston', qty: 40, unitBuy: 9, unitSell: 15, freight: 40, source: 'Osculati', status: 'RFQ envoyée' },
  { id: 'hublots', product: 'Hublots inox/alu max 150 × 365 mm', qty: 10, unitBuy: 72, unitSell: 115, freight: 120, source: 'Osculati 81.502 / backup Gebo', status: 'Découpe à verrouiller' },
  { id: 'bolsters', product: 'Bolster / siège baquet double', qty: 5, unitBuy: 1500, unitSell: 1950, freight: 600, source: 'Sellier FR/EU à relancer', status: 'Échantillon obligatoire' },
  { id: 'sellerie', product: 'Sellerie bleu/gris + gris premium', qty: 5, unitBuy: 550, unitSell: 750, freight: 250, source: 'Sellier FR/EU', status: 'Nuancier + échantillon' },
  { id: 'daviers', product: 'Davier / bow roller ancre 8 kg', qty: 5, unitBuy: 99, unitSell: 155, freight: 90, source: 'Quick / Mantus', status: 'RFQ envoyée' },
  { id: 'echelles', product: 'Échelle inox 4 marches largeur 30 cm', qty: 10, unitBuy: 112, unitSell: 165, freight: 180, source: 'Alastin / Osculati backup', status: 'MOQ à confirmer' },
  { id: 'taquets', product: 'Taquets inox 200 mm', qty: 35, unitBuy: 18, unitSell: 29, freight: 100, source: 'Alastin / Osculati backup', status: 'MOQ à confirmer' },
  { id: 'loquets', product: 'Loquets inox avec/sans clé', qty: 40, unitBuy: 10, unitSell: 18, freight: 80, source: 'Wudi / Osculati backup', status: 'Plans de découpe' },
  { id: 'pg', product: 'Porte-gobelets inox', qty: 20, unitBuy: 9, unitSell: 16, freight: 50, source: 'Alastin / Osculati backup', status: 'MOQ à confirmer' },
  { id: 'quincaillerie', product: 'Quincaillerie / plomberie / menuiserie à ventiler', qty: 1, unitBuy: 2500, unitSell: 3300, freight: 300, source: 'À ventiler ligne par ligne', status: 'À compléter' },
];

const formatEUR = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(value) || 0);
const today = () => new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
const newRef = () => `DEV-${Math.floor(1000 + Math.random() * 9000)}-IKB`;

export default function DevisPage() {
  const [quoteRef, setQuoteRef] = useState(newRef());
  const [clientName, setClientName] = useState('Joël Dufeal');
  const [items, setItems] = useState(initialQuoteLines);
  const [depositPct, setDepositPct] = useState(30);

  const totals = useMemo(() => {
    const buy = items.reduce((sum, item) => sum + item.qty * item.unitBuy + item.freight, 0);
    const sell = items.reduce((sum, item) => sum + item.qty * item.unitSell + item.freight, 0);
    const margin = sell - buy;
    const marginPct = sell > 0 ? (margin / sell) * 100 : 0;
    const deposit = sell * ((Number(depositPct) || 0) / 100);
    return { buy, sell, margin, marginPct, deposit };
  }, [items, depositPct]);

  const updateItem = (id, field, value) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, [field]: field === 'product' || field === 'source' || field === 'status' ? value : Number(value) || 0 } : item));
  };

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));

  const quoteText = useMemo(() => {
    const lines = items.map((item) => `- ${item.product} x${item.qty} : ${formatEUR(item.unitSell)} / unité + ${formatEUR(item.freight)} frais — ${item.source}`).join('\n');
    return `Devis ${quoteRef} — Ikabay Sourcing\nClient : ${clientName || 'À compléter'}\nDate : ${today()}\n\n${lines}\n\nTotal estimatif : ${formatEUR(totals.sell)}\nAcompte conseillé (${depositPct}%) : ${formatEUR(totals.deposit)}\n\nDevis sous réserve de disponibilité, confirmation fournisseur, photos/fiches techniques et validation finale du client.`;
  }, [items, quoteRef, clientName, totals.sell, totals.deposit, depositPct]);

  const copyQuote = async () => navigator.clipboard?.writeText(quoteText);
  const sendEmail = () => window.open(`mailto:${sourcingMailbox.operational}?subject=${encodeURIComponent(`Devis ${quoteRef} — Ikabay Sourcing`)}&body=${encodeURIComponent(quoteText)}`);
  const sendWhatsApp = () => window.open(waMessage(quoteText));
  const duplicate = () => setQuoteRef(newRef());

  const recommended = logisticsScenarios.find((s) => s.name === 'Équilibré');

  return (
    <section className="pageSection" style={{ paddingTop: 44 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <span className="badge"><FileText size={15} /> Devis client</span>
        <span className="badge" style={{ background: '#fff7ed', color: '#9a3412' }}><AlertTriangle size={15} /> Estimation avant retours fournisseurs</span>
        <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}><CheckCircle size={15} /> Cahier des charges exact</span>
      </div>

      <h1 style={{ marginBottom: 8 }}>Devis professionnel — sourcing nautique</h1>
      <p style={{ maxWidth: 920, color: '#516866', lineHeight: 1.6 }}>
        Devis prérempli à partir des lignes exactes du cahier des charges. Les prix restent estimatifs tant que les fournisseurs n’ont pas renvoyé prix, MOQ, photos, fiches, CBM et délais.
      </p>

      <div className="card" style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, margin: '22px 0' }}>
        <label><strong>Client</strong><input value={clientName} onChange={(e) => setClientName(e.target.value)} style={inputStyle} /></label>
        <label><strong>Référence</strong><input value={quoteRef} onChange={(e) => setQuoteRef(e.target.value)} style={inputStyle} /></label>
        <label><strong>Date</strong><input value={today()} disabled style={{ ...inputStyle, background: '#f8fafc' }} /></label>
        <label><strong>Acompte conseillé %</strong><input value={depositPct} onChange={(e) => setDepositPct(e.target.value)} type="number" style={inputStyle} /></label>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 1100, borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f4f9f7' }}>
                {['Produit / service', 'Qté', 'Prix achat', 'Prix vente', 'Frais', 'Marge ligne', 'Source', 'Statut', ''].map((h) => <th key={h} style={{ padding: 12, textAlign: 'left', color: '#435956', textTransform: 'uppercase', fontSize: 11 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const buyLine = item.qty * item.unitBuy + item.freight;
                const sellLine = item.qty * item.unitSell + item.freight;
                const marginLine = sellLine - buyLine;
                return (
                  <tr key={item.id} style={{ borderTop: '1px solid rgba(16,32,34,.06)' }}>
                    <td style={{ padding: 8, minWidth: 260 }}><input value={item.product} onChange={(e) => updateItem(item.id, 'product', e.target.value)} style={smallInput} /></td>
                    <td style={{ padding: 8 }}><input value={item.qty} onChange={(e) => updateItem(item.id, 'qty', e.target.value)} type="number" style={smallInput} /></td>
                    <td style={{ padding: 8 }}><input value={item.unitBuy} onChange={(e) => updateItem(item.id, 'unitBuy', e.target.value)} type="number" style={smallInput} /></td>
                    <td style={{ padding: 8 }}><input value={item.unitSell} onChange={(e) => updateItem(item.id, 'unitSell', e.target.value)} type="number" style={smallInput} /></td>
                    <td style={{ padding: 8 }}><input value={item.freight} onChange={(e) => updateItem(item.id, 'freight', e.target.value)} type="number" style={smallInput} /></td>
                    <td style={{ padding: 12, fontWeight: 900, color: marginLine >= 0 ? '#166534' : '#dc2626' }}>{formatEUR(marginLine)}</td>
                    <td style={{ padding: 8, minWidth: 180 }}><input value={item.source} onChange={(e) => updateItem(item.id, 'source', e.target.value)} style={smallInput} /></td>
                    <td style={{ padding: 8, minWidth: 160 }}><input value={item.status} onChange={(e) => updateItem(item.id, 'status', e.target.value)} style={smallInput} /></td>
                    <td style={{ padding: 8 }}><button onClick={() => removeItem(item.id)} title="Supprimer" style={iconButton}><Trash2 size={15} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 20 }}>
        <Metric label="Coût achat estimé" value={formatEUR(totals.buy)} />
        <Metric label="Prix vente estimé" value={formatEUR(totals.sell)} highlight />
        <Metric label="Marge brute estimée" value={`${formatEUR(totals.margin)} (${totals.marginPct.toFixed(1)}%)`} />
        <Metric label="Acompte conseillé" value={formatEUR(totals.deposit)} />
      </div>

      {recommended && (
        <div className="card" style={{ padding: 18, marginTop: 20, borderLeft: '5px solid #0f766e' }}>
          <strong>Scénario conseillé actuel : {recommended.name}</strong>
          <p style={{ margin: '6px 0 0', color: '#516866' }}>{recommended.strategy} — total rendu indicatif {formatEUR(recommended.total)}, délai {recommended.delay}.</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
        <button className="btn btnPrimary" onClick={sendEmail}><Mail size={18} /> Envoyer email</button>
        <button className="btn" onClick={sendWhatsApp}><MessageCircle size={18} /> WhatsApp</button>
        <button className="btn" onClick={copyQuote}><Copy size={18} /> Copier</button>
        <button className="btn" onClick={duplicate}><RefreshCw size={18} /> Dupliquer ref</button>
        <button className="btn" onClick={() => window.print()}><Printer size={18} /> Imprimer / PDF</button>
        <button className="btn" onClick={() => alert(`Devis ${quoteRef} marqué accepté — à confirmer après paiement acompte.`)}><Send size={18} /> Marquer accepté</button>
      </div>

      <div className="sectionTitle" style={{ marginTop: 34 }}><h2>Lignes cahier des charges couvertes</h2></div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {exactOrderLines.map((line) => <span key={line.family} className="badge" style={{ background: '#f8fafc', color: '#0a4a5c' }}>{line.family}</span>)}
      </div>

      <div className="card" style={{ padding: 18, marginTop: 24, borderLeft: '5px solid #f97316' }}>
        <strong>Mention obligatoire</strong>
        <p style={{ margin: '6px 0 0', color: '#516866' }}>Devis sous réserve de disponibilité, confirmation fournisseur, MOQ réel, photos/fiches techniques, transport GEODIS et validation finale du client.</p>
      </div>
    </section>
  );
}

function Metric({ label, value, highlight }) {
  return (
    <div className="card" style={{ padding: 18, background: highlight ? 'linear-gradient(135deg,#0a4a5c,#0f766e)' : 'white', color: highlight ? 'white' : '#0a4a5c' }}>
      <div style={{ fontSize: 12, fontWeight: 900, opacity: .75, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 950, marginTop: 8 }}>{value}</div>
    </div>
  );
}

const inputStyle = { width: '100%', marginTop: 6, padding: '11px 12px', borderRadius: 12, border: '1px solid rgba(16,32,34,.14)', background: '#fff', outline: 'none' };
const smallInput = { width: '100%', padding: '8px 9px', borderRadius: 10, border: '1px solid rgba(16,32,34,.12)', outline: 'none', background: 'white' };
const iconButton = { border: 0, background: '#fee2e2', color: '#dc2626', borderRadius: 10, width: 34, height: 34, display: 'grid', placeItems: 'center', cursor: 'pointer' };
