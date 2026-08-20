import { useMemo, useState } from 'react';
import { AlertTriangle, Anchor, Calculator, CheckCircle2, Package, Plane, Route, Ship, Truck, Warehouse } from 'lucide-react';
import { computeLandedCost, logisticsScenarios, sentRfqs, martiniqueCostDefaults } from '../data/sourcingOperations';

const relayPoints = ['Fort-de-France', 'Ducos', 'Le Lamentin', 'Rivière-Pilote', 'Sainte-Luce', 'Le Marin'];

const operationalShipments = [
  { supplier: 'Osculati', origin: 'Italie / Europe', mode: 'Maritime LCL Europe', carrier: 'GEODIS / CMA CGM à confirmer', cbm: '1.0–2.0', status: 'Réponse RFQ attendue', eta: 'À calculer après devis', risk: 'Faible' },
  { supplier: 'Comptoir Nautique', origin: 'France', mode: 'Colis / groupage Europe', carrier: 'GEODIS ou transporteur fournisseur', cbm: '0.1–0.3', status: 'Réponse RFQ attendue', eta: 'À calculer après devis', risk: 'Faible' },
  { supplier: 'Quick Group', origin: 'Italie', mode: 'Maritime / route + groupage', carrier: 'GEODIS / forwarder EU', cbm: '0.2–0.5', status: 'Réponse RFQ attendue', eta: 'À calculer après devis', risk: 'Faible' },
  { supplier: 'Alastin Marine', origin: 'Chine / Qingdao', mode: 'LCL maritime', carrier: 'GEODIS Chine → FDF', cbm: '2 CBM minimum', status: 'MOQ + CBM attendus', eta: '35–65 jours', risk: 'Moyen' },
  { supplier: 'Wudi Xinxiangju', origin: 'Chine / Wudi', mode: 'Consolidation Shandong', carrier: 'Alastin ou forwarder Qingdao', cbm: 'À confirmer', status: 'MOQ + CBM attendus', eta: '35–65 jours', risk: 'Moyen' },
  { supplier: 'Mantus Marine', origin: 'USA', mode: 'Miami forwarder / air partiel', carrier: 'À confirmer', cbm: '0.2–0.5', status: 'Transport USA à chiffrer', eta: '7–21 jours', risk: 'Moyen' },
];

const formatEUR = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(value) || 0);

function RiskBadge({ risk }) {
  const color = risk === 'Faible' ? '#166534' : risk === 'Moyen' ? '#9a3412' : '#dc2626';
  const bg = risk === 'Faible' ? '#dcfce7' : risk === 'Moyen' ? '#fff7ed' : '#fee2e2';
  return <span style={{ background: bg, color, padding: '5px 9px', borderRadius: 999, fontSize: 12, fontWeight: 800 }}>{risk}</span>;
}

export default function TransportPage() {
  const [calc, setCalc] = useState({
    origin: 'europe',
    mode: 'maritime',
    purchase: '15000',
    supplierFees: '250',
    cbm: '2',
    weightKg: '300',
    marginPct: '25',
  });

  const landed = useMemo(() => computeLandedCost(calc), [calc]);

  const update = (field) => (event) => setCalc((prev) => ({ ...prev, [field]: event.target.value }));

  return (
    <section className="pageSection" style={{ paddingTop: 44 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <span className="badge"><Ship size={15} /> Logistique Martinique</span>
        <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}><CheckCircle2 size={15} /> GEODIS prioritaire</span>
        <span className="badge" style={{ background: '#fff7ed', color: '#9a3412' }}><AlertTriangle size={15} /> MOQ Chine inclus</span>
      </div>

      <h1 style={{ marginBottom: 8 }}>Transport & coût rendu Martinique</h1>
      <p style={{ maxWidth: 920, color: '#516866', lineHeight: 1.6 }}>
        Calcule le vrai coût rendu : achat HT/FOB, MOQ, volume CBM, transport, assurance, frais dossier, taxes import et marge. Le prix facial fournisseur ne suffit jamais.
      </p>

      <div className="sectionTitle" style={{ marginTop: 30 }}>
        <h2><Route size={24} /> Scénarios logistiques</h2>
        <p>Base de comparaison avant retours fournisseurs définitifs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 34 }}>
        {logisticsScenarios.map((scenario) => (
          <div className="card" key={scenario.name} style={{ padding: 20, borderTop: `5px solid ${scenario.color}` }}>
            <h3 style={{ margin: '0 0 8px', color: scenario.color }}>{scenario.name}</h3>
            <p style={{ color: '#516866', minHeight: 64 }}>{scenario.strategy}</p>
            <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
              <div><strong>Achat :</strong> {formatEUR(scenario.purchase)}</div>
              <div><strong>Transport :</strong> {formatEUR(scenario.transport)}</div>
              <div><strong>Taxes/frais :</strong> {formatEUR(scenario.duties)}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#0a4a5c' }}>{formatEUR(scenario.total)}</div>
              <div><strong>Délai :</strong> {scenario.delay}</div>
              <div><strong>Risque :</strong> <RiskBadge risk={scenario.risk.includes('Faible') ? 'Faible' : scenario.risk.includes('moyen') || scenario.risk.includes('Moyen') ? 'Moyen' : 'Élevé'} /></div>
            </div>
            <p style={{ color: '#60716f', fontSize: 13, lineHeight: 1.5 }}>{scenario.note}</p>
          </div>
        ))}
      </div>

      <div className="sectionTitle">
        <h2><Calculator size={24} /> Calculateur coût rendu</h2>
        <p>À utiliser dès qu’un fournisseur répond avec prix, poids et CBM.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 420px) 1fr', gap: 20 }} className="transportCalcGrid">
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'grid', gap: 14 }}>
            <label>
              <strong>Origine</strong>
              <select value={calc.origin} onChange={update('origin')} style={inputStyle}>
                <option value="europe">Europe / France / Italie</option>
                <option value="china">Chine / Turquie / hors UE</option>
                <option value="usa">USA</option>
              </select>
            </label>
            <label>
              <strong>Mode</strong>
              <select value={calc.mode} onChange={update('mode')} style={inputStyle}>
                <option value="maritime">Maritime / LCL</option>
                <option value="air">Aérien partiel</option>
              </select>
            </label>
            <label><strong>Achat marchandise HT/FOB (€)</strong><input value={calc.purchase} onChange={update('purchase')} type="number" style={inputStyle} /></label>
            <label><strong>Frais fournisseur / emballage (€)</strong><input value={calc.supplierFees} onChange={update('supplierFees')} type="number" style={inputStyle} /></label>
            <label><strong>Volume CBM</strong><input value={calc.cbm} onChange={update('cbm')} type="number" step="0.1" style={inputStyle} /></label>
            <label><strong>Poids kg</strong><input value={calc.weightKg} onChange={update('weightKg')} type="number" style={inputStyle} /></label>
            <label><strong>Marge Ikabay %</strong><input value={calc.marginPct} onChange={update('marginPct')} type="number" style={inputStyle} /></label>
          </div>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0, color: '#0a4a5c' }}>Résultat estimatif</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              ['Achat', landed.purchase],
              ['Frais fournisseur', landed.supplierFees],
              ['Fret estimé', landed.freight],
              ['Assurance', landed.insurance],
              ['Taxes import', landed.importTaxes],
              ['Frais dossier', landed.fileFee],
              ['Livraison finale', landed.finalDelivery],
              ['Marge', landed.marginValue],
            ].map(([label, value]) => (
              <div key={label} style={{ background: '#f8fafc', padding: 14, borderRadius: 14 }}>
                <div style={{ color: '#64748b', fontSize: 12, fontWeight: 800 }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 900 }}>{formatEUR(value)}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, padding: 18, borderRadius: 18, background: 'linear-gradient(135deg,#0a4a5c,#0f766e)', color: 'white' }}>
            <div style={{ opacity: .85, fontWeight: 800 }}>Prix final estimatif rendu Martinique</div>
            <div style={{ fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 950 }}>{formatEUR(landed.finalPrice)}</div>
          </div>
          <p style={{ color: '#60716f', fontSize: 13, lineHeight: 1.5 }}>
            Hypothèses : Europe {formatEUR(martiniqueCostDefaults.europeLclPerCbm)}/CBM, Chine {martiniqueCostDefaults.chinaLclPerCbmUsd}$/CBM min {martiniqueCostDefaults.chinaLclMinCbm} CBM, assurance {martiniqueCostDefaults.insurancePct}%, TVA/import hors UE {martiniqueCostDefaults.martiniqueVatPct}% + droits {martiniqueCostDefaults.importDutyPct}%.
          </p>
        </div>
      </div>

      <div className="sectionTitle" style={{ marginTop: 38 }}>
        <h2><Package size={24} /> Suivi opérationnel des lots</h2>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 900, borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f4f9f7' }}>
                {['Fournisseur', 'Origine', 'Mode', 'Transporteur', 'CBM', 'Statut', 'ETA', 'Risque'].map((h) => <th key={h} style={{ padding: 12, textAlign: 'left', color: '#435956', textTransform: 'uppercase', fontSize: 11 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {operationalShipments.map((s) => (
                <tr key={s.supplier} style={{ borderTop: '1px solid rgba(16,32,34,.06)' }}>
                  <td style={{ padding: 12, fontWeight: 900, color: '#0a4a5c' }}>{s.supplier}</td>
                  <td style={{ padding: 12 }}>{s.origin}</td>
                  <td style={{ padding: 12 }}>{s.mode}</td>
                  <td style={{ padding: 12 }}>{s.carrier}</td>
                  <td style={{ padding: 12 }}>{s.cbm}</td>
                  <td style={{ padding: 12 }}>{s.status}</td>
                  <td style={{ padding: 12 }}>{s.eta}</td>
                  <td style={{ padding: 12 }}><RiskBadge risk={s.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sectionTitle" style={{ marginTop: 38 }}>
        <h2><Warehouse size={24} /> Points relais Martinique</h2>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {relayPoints.map((point) => <span className="badge" key={point}>{point}</span>)}
      </div>

      <div className="sectionTitle" style={{ marginTop: 38 }}>
        <h2><Truck size={24} /> RFQ envoyées à raccorder aux lots transport</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {sentRfqs.map((rfq) => (
          <div className="card" key={rfq.subject} style={{ padding: 16 }}>
            <strong style={{ color: '#0a4a5c' }}>{rfq.supplier}</strong>
            <p style={{ color: '#60716f', fontSize: 13, lineHeight: 1.45 }}>{rfq.scope}</p>
            <span style={{ fontSize: 12, color: '#0f766e', fontWeight: 800 }}>{rfq.status} — {rfq.sentAt}</span>
          </div>
        ))}
      </div>

      <style>{`@media (max-width: 900px){.transportCalcGrid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

const inputStyle = {
  width: '100%',
  marginTop: 6,
  padding: '11px 12px',
  borderRadius: 12,
  border: '1px solid rgba(16,32,34,.14)',
  background: '#fff',
  outline: 'none',
};
