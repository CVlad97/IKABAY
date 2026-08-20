import { useMemo, useState } from 'react';
import { AlertTriangle, Award, Building2, CheckCircle2, Mail, Package, Search, Star, TrendingUp } from 'lucide-react';
import { exactOrderLines, sentRfqs, supplierScores, blockingPoints } from '../data/sourcingOperations';

const scoreColor = (score) => (score >= 80 ? '#16a34a' : score >= 70 ? '#f97316' : '#dc2626');
const scoreBadge = (score) => {
  if (score >= 80) return { label: 'Recommandé', bg: '#dcfce7', color: '#166534' };
  if (score >= 70) return { label: 'À tester', bg: '#fff7ed', color: '#9a3412' };
  return { label: 'Risque moyen', bg: '#fef3c7', color: '#92400e' };
};

const offersToCompare = [
  { family: 'Compas 135/150 mm', supplier: 'Comptoir Nautique', zone: 'France', qty: '5 pcs', status: 'RFQ envoyée', recommendation: 'Prioritaire si prix HT export confirmé' },
  { family: 'Liston PVC 55 mm + liseret', supplier: 'Osculati', zone: 'Italie', qty: '60/66 m + 100 m', status: 'RFQ envoyée', recommendation: 'Critique : valider profil exact + photos' },
  { family: 'Embouts inox liston', supplier: 'Osculati', zone: 'Italie', qty: '20/40 pcs option', status: 'RFQ envoyée', recommendation: 'À commander uniquement si compatible liston' },
  { family: 'Hublots 150 × 365 max', supplier: 'Osculati', zone: 'Italie', qty: '10 pcs', status: 'RFQ envoyée', recommendation: 'Valider découpe avant commande' },
  { family: 'Daviers ancre 8 kg', supplier: 'Quick / Mantus', zone: 'Italie / USA', qty: '5 pcs', status: 'RFQ envoyée', recommendation: 'Comparer coût rendu Quick vs Mantus' },
  { family: 'Taquets + échelles + porte-gobelets', supplier: 'Alastin', zone: 'Chine', qty: '35 + 10 + 20 pcs', status: 'RFQ envoyée', recommendation: 'Valable seulement si MOQ pilot accepté' },
  { family: 'Loquets avec/sans clé', supplier: 'Wudi Xinxiangju', zone: 'Chine', qty: '20 + 20 pcs', status: 'RFQ envoyée', recommendation: 'Plans de découpe obligatoires' },
  { family: 'Sellerie / bolsters', supplier: 'X-Vision / sellier FR', zone: 'France / Europe', qty: '5 bateaux', status: 'À relancer', recommendation: 'Échantillon physique obligatoire' },
];

export default function FournisseursPage() {
  const [query, setQuery] = useState('');

  const filteredScores = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return supplierScores;
    return supplierScores.filter((s) => [s.supplier, s.zone, s.badge, s.note].join(' ').toLowerCase().includes(q));
  }, [query]);

  const filteredOffers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return offersToCompare;
    return offersToCompare.filter((o) => [o.family, o.supplier, o.zone, o.recommendation].join(' ').toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="pageSection" style={{ paddingTop: 44 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <span className="badge"><Building2 size={15} /> Fournisseurs</span>
        <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}><CheckCircle2 size={15} /> Contacts vérifiés</span>
        <span className="badge" style={{ background: '#fff7ed', color: '#9a3412' }}><AlertTriangle size={15} /> MOQ à surveiller</span>
      </div>

      <h1 style={{ marginBottom: 8 }}>Fournisseurs & comparateur d’offres</h1>
      <p style={{ maxWidth: 920, color: '#516866', lineHeight: 1.6 }}>
        Vue acheteur senior : fournisseurs réellement contactés, score /100, statut RFQ, risque MOQ et recommandations par famille produit.
      </p>

      <label style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: '1px solid rgba(16,32,34,.13)', borderRadius: 16, padding: '0 14px', minHeight: 50, margin: '22px 0' }}>
        <Search size={18} color="#60716f" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher fournisseur, famille, zone..." style={{ border: 0, outline: 'none', background: 'transparent', width: '100%', fontWeight: 700 }} />
      </label>

      <div className="sectionTitle"><h2><Award size={24} /> Score fournisseur /100</h2></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 34 }}>
        {filteredScores.map((s) => {
          const badge = scoreBadge(s.total);
          return (
            <div className="card" key={s.supplier} style={{ padding: 20, borderTop: `5px solid ${scoreColor(s.total)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <h3 style={{ margin: '0 0 4px', color: '#0a4a5c' }}>{s.supplier}</h3>
                  <span style={{ color: '#64748b', fontSize: 13, fontWeight: 800 }}>{s.zone}</span>
                </div>
                <span style={{ background: badge.bg, color: badge.color, borderRadius: 999, padding: '5px 10px', fontSize: 12, fontWeight: 900 }}>{badge.label}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '16px 0 8px' }}>
                <strong style={{ fontSize: 38, color: scoreColor(s.total) }}>{s.total}</strong>
                <span style={{ color: '#60716f', fontWeight: 800 }}>/100</span>
              </div>
              <div style={{ height: 9, borderRadius: 999, background: '#e5e7eb', overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ height: '100%', width: `${s.total}%`, background: scoreColor(s.total) }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 7, marginBottom: 12 }}>
                {[
                  ['Prix', s.price, 20],
                  ['Rendu', s.landed, 25],
                  ['Délai', s.delay, 15],
                  ['Qualité', s.quality, 20],
                  ['Fiabilité', s.reliability, 20],
                ].map(([label, value, max]) => (
                  <div key={label} style={{ background: '#f8fafc', borderRadius: 12, padding: 8, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 800 }}>{label}</div>
                    <div style={{ fontWeight: 950 }}>{value}/{max}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: '#516866', lineHeight: 1.5, marginBottom: 0 }}>{s.note}</p>
            </div>
          );
        })}
      </div>

      <div className="sectionTitle"><h2><TrendingUp size={24} /> Comparateur d’offres par famille</h2></div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 34 }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 900, borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f4f9f7' }}>
                {['Famille', 'Fournisseur', 'Zone', 'Qté', 'Statut', 'Recommandation'].map((h) => <th key={h} style={{ padding: 12, textAlign: 'left', color: '#435956', textTransform: 'uppercase', fontSize: 11 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer) => (
                <tr key={`${offer.family}-${offer.supplier}`} style={{ borderTop: '1px solid rgba(16,32,34,.06)' }}>
                  <td style={{ padding: 12, fontWeight: 900, color: '#0a4a5c' }}>{offer.family}</td>
                  <td style={{ padding: 12 }}>{offer.supplier}</td>
                  <td style={{ padding: 12 }}>{offer.zone}</td>
                  <td style={{ padding: 12 }}>{offer.qty}</td>
                  <td style={{ padding: 12 }}><span style={{ background: offer.status === 'RFQ envoyée' ? '#dcfce7' : '#fff7ed', color: offer.status === 'RFQ envoyée' ? '#166534' : '#9a3412', borderRadius: 999, padding: '5px 9px', fontWeight: 900, fontSize: 12 }}>{offer.status}</span></td>
                  <td style={{ padding: 12, color: '#516866' }}>{offer.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sectionTitle"><h2><Mail size={24} /> RFQ envoyées</h2></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 34 }}>
        {sentRfqs.map((rfq) => (
          <div className="card" key={rfq.subject} style={{ padding: 16 }}>
            <strong style={{ color: '#0a4a5c' }}>{rfq.supplier}</strong>
            <p style={{ color: '#60716f', fontSize: 13, lineHeight: 1.45 }}>{rfq.scope}</p>
            <div style={{ color: '#64748b', fontSize: 12 }}>{rfq.to}</div>
            <div style={{ color: '#166534', fontSize: 12, fontWeight: 900, marginTop: 6 }}>{rfq.status} — {rfq.sentAt}</div>
          </div>
        ))}
      </div>

      <div className="sectionTitle"><h2><Package size={24} /> Lignes achat couvertes</h2></div>
      <div className="card" style={{ padding: 18 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {exactOrderLines.map((line) => <span key={line.family} className="badge" style={{ background: '#f8fafc', color: '#0a4a5c' }}><Star size={13} /> {line.family}</span>)}
        </div>
      </div>

      <div className="sectionTitle" style={{ marginTop: 34 }}><h2><AlertTriangle size={24} /> Points à vérifier avant commande</h2></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {blockingPoints.slice(0, 5).map((point) => (
          <div className="card" key={point.title} style={{ padding: 16, borderTop: `4px solid ${point.severity === 'P0' ? '#dc2626' : '#f97316'}` }}>
            <strong style={{ color: point.severity === 'P0' ? '#dc2626' : '#9a3412' }}>{point.severity} — {point.title}</strong>
            <p style={{ color: '#516866', lineHeight: 1.5, marginBottom: 0 }}>{point.action}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
