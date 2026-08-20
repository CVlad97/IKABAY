import { AlertTriangle, BarChart3, CheckCircle2, Clock, Mail, Package, Route, Send, Settings, ShieldCheck, Truck, Users } from 'lucide-react';
import { blockingPoints, exactOrderLines, logisticsScenarios, sentRfqs, supplierScores, sourcingMailbox } from '../data/sourcingOperations';

const formatEUR = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(value) || 0);

const scoreColor = (score) => (score >= 80 ? '#16a34a' : score >= 70 ? '#f97316' : '#dc2626');
const severityColor = (severity) => (severity === 'P0' ? '#dc2626' : severity === 'P1' ? '#f97316' : '#64748b');

export default function AdminPage() {
  const sentCount = sentRfqs.filter((rfq) => rfq.status === 'Envoyé').length;
  const pendingLines = exactOrderLines.filter((line) => line.status !== 'RFQ envoyée').length;
  const p0Count = blockingPoints.filter((point) => point.severity === 'P0').length;
  const recommendedScenario = logisticsScenarios.find((s) => s.name === 'Équilibré') || logisticsScenarios[0];

  const stats = [
    { label: 'RFQ envoyées', value: sentCount, icon: Send, color: '#0f766e' },
    { label: 'Lignes à commander', value: exactOrderLines.length, icon: Package, color: '#2563eb' },
    { label: 'Fournisseurs scorés', value: supplierScores.length, icon: Users, color: '#7c3aed' },
    { label: 'Blocages P0', value: p0Count, icon: AlertTriangle, color: '#dc2626' },
    { label: 'Lignes à compléter', value: pendingLines, icon: Clock, color: '#f97316' },
    { label: 'Scénario recommandé', value: recommendedScenario.name, icon: BarChart3, color: '#0f766e', text: true },
  ];

  const nextActions = [
    'Vérifier inbox + spam contactcvs@ikabay.store chaque jour.',
    'Relancer Alastin/Wudi si pas de MOQ/CBM/photos sous 48h ouvrées.',
    'Relancer Osculati pour liston PVC 55 mm + embouts inox si pas de réponse.',
    'Ne pas valider hublots sans dimensions de découpe.',
    'Relancer sellerie / bolsters avec échantillon physique obligatoire.',
    'Corriger définitivement sourcing@ikabay.store puis changer le mot de passe actuel.',
  ];

  return (
    <section className="pageSection" style={{ paddingTop: 44 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <span className="badge"><Settings size={15} /> Cockpit sourcing</span>
        <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}><CheckCircle2 size={15} /> Envois confirmés</span>
        <span className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}><AlertTriangle size={15} /> {p0Count} P0</span>
      </div>

      <h1 style={{ marginBottom: 8 }}>Admin Ikabay Sourcing</h1>
      <p style={{ color: '#516866', maxWidth: 920, lineHeight: 1.6 }}>
        Pilotage du dossier nautique Martinique : demandes fournisseurs, commandes exactes, coût rendu, blocages et prochaines relances.
      </p>

      <div className="card" style={{ padding: 18, margin: '22px 0', borderLeft: '5px solid #0f766e' }}>
        <strong>Compte email opérationnel : </strong>{sourcingMailbox.operational}
        <p style={{ margin: '6px 0 0', color: '#516866' }}>{sourcingMailbox.note}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, margin: '24px 0 36px' }}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div className="card" key={s.label} style={{ padding: 18 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, display: 'grid', placeItems: 'center', background: `${s.color}18`, color: s.color }}><Icon size={22} /></div>
              <strong style={{ display: 'block', fontSize: s.text ? 24 : 34, margin: '14px 0 4px', color: '#0a4a5c' }}>{s.value}</strong>
              <span style={{ color: '#60716f', fontWeight: 800, fontSize: 13 }}>{s.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 20 }} className="adminGrid">
        <div>
          <div className="sectionTitle"><h2><Mail size={24} /> RFQ envoyées</h2></div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {sentRfqs.map((rfq, index) => (
              <div key={rfq.subject} style={{ padding: 16, borderBottom: index < sentRfqs.length - 1 ? '1px solid rgba(16,32,34,.06)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <strong style={{ color: '#0a4a5c' }}>{rfq.supplier}</strong>
                  <span style={{ color: '#166534', background: '#dcfce7', padding: '4px 8px', borderRadius: 999, fontSize: 12, fontWeight: 900 }}>{rfq.status}</span>
                </div>
                <p style={{ color: '#516866', margin: '6px 0', lineHeight: 1.45 }}>{rfq.scope}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', color: '#64748b', fontSize: 12 }}>
                  <span>{rfq.to}</span><span>•</span><span>{rfq.sentAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sectionTitle"><h2><BarChart3 size={24} /> Scénario recommandé</h2></div>
          <div className="card" style={{ padding: 20, borderTop: `5px solid ${recommendedScenario.color}` }}>
            <h3 style={{ marginTop: 0, color: recommendedScenario.color }}>{recommendedScenario.name}</h3>
            <p style={{ color: '#516866', lineHeight: 1.5 }}>{recommendedScenario.strategy}</p>
            <div style={{ display: 'grid', gap: 8 }}>
              <div><strong>Achat :</strong> {formatEUR(recommendedScenario.purchase)}</div>
              <div><strong>Transport :</strong> {formatEUR(recommendedScenario.transport)}</div>
              <div><strong>Frais / taxes :</strong> {formatEUR(recommendedScenario.duties)}</div>
              <div style={{ fontSize: 28, fontWeight: 950, color: '#0a4a5c' }}>{formatEUR(recommendedScenario.total)}</div>
              <div><strong>Délai :</strong> {recommendedScenario.delay}</div>
              <div><strong>Risque :</strong> {recommendedScenario.risk}</div>
            </div>
            <p style={{ color: '#60716f', fontSize: 13 }}>{recommendedScenario.note}</p>
          </div>

          <div className="sectionTitle" style={{ marginTop: 22 }}><h2><ShieldCheck size={24} /> Scores fournisseurs</h2></div>
          <div className="card" style={{ padding: 16 }}>
            {supplierScores.map((s) => (
              <div key={s.supplier} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <strong>{s.supplier}</strong>
                  <span style={{ color: scoreColor(s.total), fontWeight: 950 }}>{s.total}/100</span>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: '#e5e7eb', overflow: 'hidden', marginTop: 6 }}>
                  <div style={{ width: `${s.total}%`, height: '100%', background: scoreColor(s.total) }} />
                </div>
                <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: 12 }}>{s.badge} — {s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sectionTitle" style={{ marginTop: 38 }}><h2><AlertTriangle size={24} /> Blocages & actions</h2></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {blockingPoints.map((point) => (
          <div className="card" key={point.title} style={{ padding: 18, borderTop: `4px solid ${severityColor(point.severity)}` }}>
            <strong style={{ color: severityColor(point.severity) }}>{point.severity} — {point.title}</strong>
            <p style={{ color: '#516866', lineHeight: 1.5 }}>{point.action}</p>
          </div>
        ))}
      </div>

      <div className="sectionTitle" style={{ marginTop: 38 }}><h2><Package size={24} /> Commandes exactes</h2></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 920, borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f4f9f7' }}>
                {['Lot', 'Famille', 'Qté', 'Spécification', 'Cible', 'Statut'].map((h) => <th key={h} style={{ padding: 12, textAlign: 'left', color: '#435956', textTransform: 'uppercase', fontSize: 11 }}>{h}</th>)}
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
                  <td style={{ padding: 12 }}>{line.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sectionTitle" style={{ marginTop: 38 }}><h2><Truck size={24} /> Prochaines actions</h2></div>
      <div className="card" style={{ padding: 18 }}>
        <ol style={{ margin: 0, paddingLeft: 20, color: '#516866', lineHeight: 1.8 }}>
          {nextActions.map((action) => <li key={action}>{action}</li>)}
        </ol>
      </div>

      <style>{`@media (max-width: 960px){.adminGrid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
