import { useState, useMemo } from 'react';
import { Calculator, Euro, Truck, ShieldCheck, FileText, Scale, AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { calculateFinalPrice, TAXATION, TRANSPORT_PARTNERS, MARGIN_EXAMPLES } from '../data/fiscalite';
import { products } from '../data/products';

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState('calculator');

  // Calculator state
  const [calc, setCalc] = useState({
    purchasePrice: 100,
    shippingCost: 20,
    origin: 'ue',
    marginPercent: 25,
    productType: 'equipement_nautique'
  });

  const result = useMemo(() => {
    try {
      return calculateFinalPrice({
        purchasePrice: Number(calc.purchasePrice),
        shippingCost: Number(calc.shippingCost),
        origin: calc.origin,
        marginPercent: Number(calc.marginPercent),
        productType: calc.productType
      });
    } catch (e) {
      return null;
    }
  }, [calc]);

  const tabs = [
    { id: 'calculator', label: 'Calculateur prix', icon: Calculator },
    { id: 'marges', label: 'Marges IKABAY', icon: TrendingUp },
    { id: 'transport', label: 'Transport & taxes', icon: Truck },
    { id: 'legal', label: 'Conformité légale', icon: ShieldCheck },
  ];

  return (
    <div className="pageSection">

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
        borderRadius: 24, padding: '32px 40px', marginBottom: 32, color: 'white'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Calculator size={24} /> Fiscalité & Conformité DOM
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', margin: '8px 0 0', fontSize: 15 }}>
          Calcul des prix, taxes DOM, transport partenaires et conformité légale française
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px',
            border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 13,
            background: activeTab === t.id ? '#0f766e' : '#e8f0ee',
            color: activeTab === t.id ? 'white' : '#1a2e2b'
          }}>
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {/* ===== CALCULATOR ===== */}
      {activeTab === 'calculator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Inputs */}
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 16px' }}>Paramètres du produit</h3>
            <div className="formGroup" style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Prix d'achat HT (€)</label>
              <input className="input" type="number" value={calc.purchasePrice} onChange={e => setCalc({...calc, purchasePrice: e.target.value})} />
            </div>
            <div className="formGroup" style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Fret unitaire estimé (€)</label>
              <input className="input" type="number" value={calc.shippingCost} onChange={e => setCalc({...calc, shippingCost: e.target.value})} />
            </div>
            <div className="formGroup" style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Origine</label>
              <select className="select" value={calc.origin} onChange={e => setCalc({...calc, origin: e.target.value})}>
                <option value="ue">Union Européenne (0% douane)</option>
                <option value="chine">Chine (4% douane)</option>
                <option value="usa">États-Unis (3.5% douane)</option>
                <option value="autres">Autres hors UE (5% douane)</option>
              </select>
            </div>
            <div className="formGroup" style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Marge IKABAY souhaitée (%)</label>
              <input className="input" type="number" value={calc.marginPercent} onChange={e => setCalc({...calc, marginPercent: e.target.value})} />
            </div>
            <div style={{ marginTop: 16, padding: 12, background: '#fef3c7', borderRadius: 10, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <Info size={16} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ margin: 0, fontSize: 12, color: '#92400e' }}>
                TVA DOM 8.5% • Octroi de mer 4% • Droits de douane selon origine
              </p>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px', color: '#0f766e' }}>Prix final Martinique</h3>
              
              <div style={{ borderBottom: '1px solid #e8f0ee', paddingBottom: 12, marginBottom: 12 }}>
                <Row label="Prix d'achat HT" value={`${result.breakdown.achat_ht.toFixed(2)} €`} />
                <Row label="Transport unitaire" value={`${calc.shippingCost} €`} />
                <Row label={`Douane (${result.breakdown.douane_pct}%)`} value={`${result.douane.toFixed(2)} €`} />
                <Row label={`Octroi de mer (${result.breakdown.octroi_pct}%)`} value={`${result.octroi_mer.toFixed(2)} €`} />
                <Row label={`TVA DOM (${result.breakdown.tva_pct}%)`} value={`${result.tva_dom.toFixed(2)} €`} />
              </div>
              <Row label="Coût de revient" value={`${result.cout_revient.toFixed(2)} €`} bold color="#60716f" />
              <Row label="Marge IKABAY" value={`${result.marge_ikabay.toFixed(2)} €`} bold color="#16a34a" />
              <Row label="Taux marge réel" value={`${result.taux_marge_reel.toFixed(1)}%`} bold color="#16a34a" />
              
              <div style={{
                marginTop: 16, background: '#0f766e', borderRadius: 12, padding: 16,
                textAlign: 'center', color: 'white'
              }}>
                <div style={{ fontSize: 12, opacity: 0.8 }}>Prix vente final TTC DOM</div>
                <div style={{ fontSize: 32, fontWeight: 900 }}>{result.prix_vente_final.toFixed(2)} €</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== MARGES ===== */}
      {activeTab === 'marges' && (
        <div>
          <div style={{
            background: 'white', borderRadius: 16, overflow: 'hidden', marginBottom: 24,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#0f766e', color: 'white' }}>
                    <th style={{ padding: '12px 14px', textAlign: 'left' }}>Produit</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Origine</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Achat</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Transport</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Taxes DOM</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Revient</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Marge</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Prix vente</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Marge %</th>
                  </tr>
                </thead>
                <tbody>
                  {MARGIN_EXAMPLES.map((ex, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e8f0ee' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700 }}>{ex.product}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <span className="badge" style={{
                          background: ex.origine.includes('UE') ? '#dcfce7' : '#fff7ed',
                          color: ex.origine.includes('UE') ? '#16a34a' : '#ea580c',
                          fontSize: 11, padding: '3px 8px'
                        }}>{ex.origine}</span>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>{ex.achat.toFixed(2)}€</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>{ex.transport.toFixed(2)}€</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>{(ex.octroi + ex.tva_dom + ex.douane).toFixed(2)}€</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600 }}>{ex.cout_revient.toFixed(2)}€</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#16a34a', fontWeight: 700 }}>{ex.marge_30pc.toFixed(2)}€</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 800, color: '#0f766e' }}>{ex.prix_vente.toFixed(2)}€</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 800, color: '#16a34a' }}>{ex.marge_nette_pc}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ padding: 16, background: '#f0f5f3', borderRadius: 12, fontSize: 13, color: '#60716f' }}>
            <strong>🔑 Stratégie :</strong> Produits UE → marge 25-30% (prix concurrentiel). Produits Chine → marge 35-40% (meilleure rentabilité). Le taux de marge réel est plus élevé sur le Chine car le coût de base est plus bas.
          </div>
        </div>
      )}

      {/* ===== TRANSPORT ===== */}
      {activeTab === 'transport' && (
        <div>
          <div className="cardGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16, marginBottom: 24 }}>
            {TRANSPORT_PARTNERS.map((p, i) => (
              <div key={i} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 16 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#8a9b97' }}>{p.agence_locale}</div>
                  </div>
                  <span className="badge" style={{
                    background: p.type === 'maritime' ? '#dbeafe' : '#fef3c7',
                    color: p.type === 'maritime' ? '#1e40af' : '#92400e',
                    fontSize: 11, padding: '3px 8px'
                  }}>{p.type === 'maritime' ? '🚢 Maritime' : '✈️ Aérien'}</span>
                </div>
                <p style={{ fontSize: 13, color: '#60716f', margin: '0 0 12px' }}>{p.notes}</p>
                <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
                  <div><strong>Délai:</strong> {p.delai_moyen_jours}j</div>
                  <div><strong>Prix:</strong> {p.prix_estime_par_m3 ? `${p.prix_estime_par_m3}€/m³` : `${p.prix_estime_par_kg}€/kg`}</div>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, display: 'flex', gap: 8 }}>
                  {p.assurance_incluse && <span style={{ color: '#16a34a' }}>✅ Assurance</span>}
                  {p.dedouanement_inclus && <span style={{ color: '#16a34a' }}>✅ Dédouanement</span>}
                  {p.tracking && <span style={{ color: '#16a34a' }}>✅ Tracking</span>}
                  <span style={{ color: p.statut === 'contacte' ? '#ea580c' : '#6b7280', marginLeft: 'auto' }}>
                    {p.statut === 'contacte' ? 'Contacté' : 'À contacter'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: 16, background: '#fef3c7', borderRadius: 12, display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#92400e' }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>Taxes DOM à prévoir :</strong><br />
              • TVA DOM : 8.5% (au lieu de 20% métropole)<br />
              • Octroi de mer : 4% sur la valeur CAF (équipement nautique)<br />
              • Droits de douane : 0% UE / 4% Chine / 3.5% USA<br />
              • Franchise douane DOM : 150€ (contre 700€ métropole)
            </div>
          </div>
        </div>
      )}

      {/* ===== LEGAL ===== */}
      {activeTab === 'legal' && (
        <div>
          <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={20} color="#0f766e" /> Mentions légales obligatoires
            </h3>
            {LEGAL.mentions_legales.contenus.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', fontSize: 14, color: '#1a2e2b' }}>
                <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} /> {item}
              </div>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={20} color="#0f766e" /> CGV — Conditions Générales de Vente
            </h3>
            {LEGAL.cgv.contenus.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', fontSize: 14, color: '#1a2e2b' }}>
                <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} /> {item}
              </div>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Scale size={20} color="#0f766e" /> Protection des données (RGPD)
            </h3>
            {LEGAL.rgpd.contenus.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', fontSize: 14, color: '#1a2e2b' }}>
                <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} /> {item}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 24, padding: 20, background: '#f0f5f3', borderRadius: 16,
            fontSize: 13, color: '#60716f', lineHeight: 1.6
          }}>
            <strong>Cadre légal :</strong> Loi n°2004-575 du 21 juin 2004 (LCEN) • Art. L441-1 et L441-9 du Code de commerce • Art. L111-1, L217-4, L221-18 du Code de la consommation • Règlement UE 2016/679 (RGPD) • Loi n°78-17 du 6 janvier 1978 modifiée • Art. 294 CGI (TVA DOM) • CGCT Art. L4431-1 (Octroi de mer)
          </div>
        </div>
      )}

    </div>
  );
}

function Row({ label, value, bold, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 14 }}>
      <span style={{ color: '#60716f' }}>{label}</span>
      <span style={{ fontWeight: bold ? 800 : 600, color: color || '#1a2e2b' }}>{value}</span>
    </div>
  );
}

const LEGAL = {
  mentions_legales: {
    contenus: [
      'Raison sociale et forme juridique (RCS)',
      'Adresse du siège social',
      'Numéro TVA intracommunautaire',
      'Capital social',
      'Directeur de la publication',
      'Hébergeur du site (nom, adresse)',
    ]
  },
  cgv: {
    contenus: [
      'Prix indiqués en Euros TTC (toutes taxes comprises DOM)',
      'Frais de livraison détaillés par zone',
      'Délai de livraison mentionné avant commande',
      'Droit de rétractation : 14 jours (Art. L221-18)',
      'Garantie légale de conformité 2 ans (Art. L217-4)',
      'Garantie des vices cachés (Art. 1641 Code civil)',
      'Médiation : coordonnées du médiateur',
      'Modalités de paiement et sécurité',
      'Service après-vente et réclamations',
    ]
  },
  rgpd: {
    contenus: [
      'Politique de confidentialité accessible',
      'Consentement actif pour collecte de données',
      'Droit d\'accès, rectification, opposition (Art. 15-22 RGPD)',
      'Délai de conservation : 36 mois max',
      'Sécurité des paiements certifiée PCI-DSS',
      'Cookies : consentement préalable obligatoire',
    ]
  }
};