import { useMemo, useState, useCallback } from 'react';
import { AlertTriangle, CheckCircle, ClipboardCheck, Copy, FileText, Mail, Search, Send, ShieldCheck } from 'lucide-react';
import { exactOrderLines, sentRfqs, sourcingMailbox, blockingPoints } from '../data/sourcingOperations';

const statusStyle = {
  Envoyé: { bg: '#dcfce7', color: '#166534' },
  'À relancer': { bg: '#fff7ed', color: '#9a3412' },
  'À compléter': { bg: '#fef3c7', color: '#92400e' },
  'RFQ envoyée': { bg: '#dbeafe', color: '#1e40af' },
};

function Badge({ children, status }) {
  const style = statusStyle[status] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: style.bg, color: style.color, borderRadius: 999, padding: '5px 9px', fontSize: 12, fontWeight: 800 }}>
      {children}
    </span>
  );
}

function copyToClipboard(text, onDone) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(onDone).catch(() => fallbackCopy(text, onDone));
  } else {
    fallbackCopy(text, onDone);
  }
}

function fallbackCopy(text, onDone) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  onDone?.();
}

function buildFollowUp(rfq) {
  const isEnglish = rfq.subject.toLowerCase().startsWith('rfq');
  if (isEnglish) {
    return `Subject: Follow-up - ${rfq.subject}\n\nHello,\n\nI am following up on our RFQ sent from Ikabay Sourcing regarding: ${rfq.scope}.\n\nFor validation, please send an item-by-item answer with:\n- unit price and total price;\n- EXW / FOB / FCA incoterm;\n- MOQ;\n- production or stock lead time;\n- real product photo or catalogue HD photo;\n- technical datasheet and dimensions;\n- exact material grade;\n- carton weight, dimensions and CBM;\n- payment terms.\n\nWe need comparable data to calculate landed cost to Martinique.\n\nBest regards,\nIkabay Sourcing\n${sourcingMailbox.operational}`;
  }
  return `Objet : Relance - ${rfq.subject}\n\nBonjour,\n\nJe me permets de relancer notre demande de devis Ikabay Sourcing concernant : ${rfq.scope}.\n\nMerci de nous transmettre une réponse ligne par ligne avec :\n- prix unitaire et total HT ;\n- incoterm EXW / FCA / DAP ;\n- MOQ ;\n- disponibilité / délai ;\n- photo réelle ou catalogue HD ;\n- fiche technique et dimensions ;\n- matière exacte ;\n- poids, dimensions colis et volume ;\n- conditions de paiement.\n\nNous devons calculer le coût rendu Martinique avant validation.\n\nCordialement,\nIkabay Sourcing\n${sourcingMailbox.operational}`;
}

export default function RfqPage() {
  const [query, setQuery] = useState('');
  const [activeSupplier, setActiveSupplier] = useState(sentRfqs[0]?.supplier || '');
  const [copied, setCopied] = useState('');

  const filteredRfqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sentRfqs;
    return sentRfqs.filter((rfq) => [rfq.supplier, rfq.to, rfq.subject, rfq.scope].join(' ').toLowerCase().includes(q));
  }, [query]);

  const active = sentRfqs.find((rfq) => rfq.supplier === activeSupplier) || filteredRfqs[0] || sentRfqs[0];
  const followUpText = active ? buildFollowUp(active) : '';

  const handleCopy = useCallback((key, text) => {
    copyToClipboard(text, () => {
      setCopied(key);
      setTimeout(() => setCopied(''), 1700);
    });
  }, []);

  return (
    <section className="pageSection" style={{ paddingTop: 44 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
        <Badge status="RFQ envoyée"><Send size={14} /> RFQ envoyées</Badge>
        <Badge status="À relancer"><AlertTriangle size={14} /> Relances J+2/J+3</Badge>
        <Badge status="Envoyé"><ShieldCheck size={14} /> Sans nom client fournisseur</Badge>
      </div>

      <h1 style={{ marginBottom: 8 }}>Emails & RFQ — dossier nautique Martinique</h1>
      <p style={{ maxWidth: 920, color: '#516866', lineHeight: 1.6 }}>
        Tableau opérationnel des demandes envoyées, lignes exactes à commander et relances prêtes à copier. L’expéditeur opérationnel est <strong>{sourcingMailbox.operational}</strong>. Adresse cible future : <strong>{sourcingMailbox.official}</strong>.
      </p>

      <div className="card" style={{ padding: 18, margin: '22px 0', borderLeft: '5px solid #f97316' }}>
        <strong style={{ color: '#9a3412' }}>Point sécurité / email :</strong>
        <p style={{ margin: '6px 0 0', color: '#516866' }}>{sourcingMailbox.note}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 390px) 1fr', gap: 20 }} className="rfqLayout">
        <aside className="card" style={{ padding: 18, alignSelf: 'start', position: 'sticky', top: 94 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', border: '1px solid rgba(16,32,34,.12)', borderRadius: 14, background: '#f8fafc', marginBottom: 14 }}>
            <Search size={18} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Chercher fournisseur / produit" style={{ flex: 1, border: 0, outline: 0, background: 'transparent' }} />
          </label>

          <div style={{ display: 'grid', gap: 10 }}>
            {filteredRfqs.map((rfq) => (
              <button key={rfq.supplier} onClick={() => setActiveSupplier(rfq.supplier)} style={{ textAlign: 'left', border: active?.supplier === rfq.supplier ? '2px solid #0f766e' : '1px solid rgba(16,32,34,.1)', background: active?.supplier === rfq.supplier ? '#f0fdfa' : 'white', borderRadius: 16, padding: 14, cursor: 'pointer' }}>
                <strong style={{ color: '#0a4a5c' }}>{rfq.supplier}</strong>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{rfq.to}</div>
                <div style={{ marginTop: 8 }}><Badge status={rfq.status}>{rfq.status}</Badge></div>
              </button>
            ))}
          </div>
        </aside>

        <main>
          {active && (
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ margin: 0, color: '#0a4a5c' }}>{active.supplier}</h2>
                  <p style={{ margin: '6px 0', color: '#516866' }}><Mail size={15} style={{ verticalAlign: 'middle' }} /> {active.to}</p>
                  <Badge status={active.status}>{active.status} — {active.sentAt}</Badge>
                </div>
                <button className="btn btnPrimary" onClick={() => handleCopy('relance', followUpText)}>
                  {copied === 'relance' ? <CheckCircle size={18} /> : <Copy size={18} />} Copier relance
                </button>
              </div>

              <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
                <div style={{ background: '#f8fafc', borderRadius: 14, padding: 14 }}>
                  <strong>Objet envoyé</strong>
                  <p style={{ margin: '6px 0 0', color: '#334155' }}>{active.subject}</p>
                </div>
                <div style={{ background: '#f8fafc', borderRadius: 14, padding: 14 }}>
                  <strong>Périmètre demandé</strong>
                  <p style={{ margin: '6px 0 0', color: '#334155' }}>{active.scope}</p>
                </div>
                <pre style={{ whiteSpace: 'pre-wrap', background: '#0f172a', color: '#e2e8f0', padding: 18, borderRadius: 16, overflowX: 'auto' }}>{followUpText}</pre>
              </div>
            </div>
          )}
        </main>
      </div>

      <div className="sectionTitle" style={{ marginTop: 36 }}>
        <h2><ClipboardCheck size={24} /> Lignes exactes à commander</h2>
        <p>Ces lignes servent de base à la comparaison fournisseur et au calcul coût rendu Martinique.</p>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 980, borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f4f9f7' }}>
                {['Lot', 'Famille', 'Qté', 'Spécification exacte', 'Fournisseur cible', 'Statut'].map((h) => <th key={h} style={{ textAlign: 'left', padding: 12, color: '#435956', textTransform: 'uppercase', fontSize: 11 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {exactOrderLines.map((line) => (
                <tr key={`${line.lot}-${line.family}`} style={{ borderTop: '1px solid rgba(16,32,34,.06)' }}>
                  <td style={{ padding: 12, fontWeight: 800, color: '#0f766e' }}>{line.lot}</td>
                  <td style={{ padding: 12, fontWeight: 800 }}>{line.family}</td>
                  <td style={{ padding: 12 }}>{line.qty}</td>
                  <td style={{ padding: 12, color: '#516866' }}>{line.exactSpec}</td>
                  <td style={{ padding: 12 }}>{line.preferred}</td>
                  <td style={{ padding: 12 }}><Badge status={line.status}>{line.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sectionTitle" style={{ marginTop: 36 }}>
        <h2><AlertTriangle size={24} /> Blocages à verrouiller</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {blockingPoints.map((point) => (
          <div className="card" key={point.title} style={{ padding: 18, borderTop: point.severity === 'P0' ? '4px solid #dc2626' : '4px solid #f97316' }}>
            <strong style={{ color: point.severity === 'P0' ? '#dc2626' : '#9a3412' }}>{point.severity} — {point.title}</strong>
            <p style={{ margin: '8px 0 0', color: '#516866', lineHeight: 1.5 }}>{point.action}</p>
          </div>
        ))}
      </div>

      <style>{`@media (max-width: 900px){.rfqLayout{grid-template-columns:1fr!important}.rfqLayout aside{position:static!important}}`}</style>
    </section>
  );
}
