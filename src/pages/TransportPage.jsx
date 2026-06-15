import { useState } from 'react';
import {
  Ship, Package, Truck, Plane, Warehouse, MapPin,
  CheckCircle2, Clock, AlertTriangle, Anchor, Luggage,
  Calculator, Send, FileText
} from 'lucide-react';
import { APP_EMAIL, waMessage } from '../utils/constants';

/* ─── MODE ICONS ─── */
const modeIcons = {
  Maritime: Ship,
  Aérien: Plane,
  'Express aérien': Plane,
  Terrestre: Truck,
  MaritimeFr: Anchor,
  Relais: Warehouse,
};

/* ─── STATUTS ─── */
const statuses = [
  'À récupérer',
  'En préparation',
  'En transit',
  'Arrivé Martinique',
  'En contrôle/douane',
  'En point relais',
  'Livré',
];

/* ─── POINTS RELAIS ─── */
const relayPoints = [
  'Fort-de-France',
  'Ducos',
  'Le Lamentin',
  'Rivière-Pilote',
  'Sainte-Luce',
  'Le Marin',
];

const statusColor = (s) => {
  const map = {
    'À récupérer': '#f97316',
    'En préparation': '#2563eb',
    'En transit': '#0891b2',
    'Arrivé Martinique': '#7c3aed',
    'En contrôle/douane': '#ea580c',
    'En point relais': '#0f766e',
    Livré: '#16a34a',
  };
  return map[s] || '#6b7280';
};

const statusBg = (s) => {
  const map = {
    'À récupérer': '#fff7ed',
    'En préparation': '#eff6ff',
    'En transit': '#ecfeff',
    'Arrivé Martinique': '#f5f3ff',
    'En contrôle/douane': '#fff7ed',
    'En point relais': '#f0fdf4',
    Livré: '#f0fdf4',
  };
  return map[s] || '#f9fafb';
};

/* ─── SHIPMENTS DEMO ─── */
const demoShippings = [
  {
    id: 1,
    fournisseur: 'MarineTech SARL',
    pays: 'France',
    transporteur: 'CMA CGM',
    tracking: 'CMAU123456789',
    mode: 'Maritime',
    cout: 1450,
    delai: '21 jours',
    eta: '28/06/2026',
    destination: 'Fort-de-France',
    pointRelais: 'Le Lamentin',
    statut: 'En transit',
  },
  {
    id: 2,
    fournisseur: 'NauticParts GmbH',
    pays: 'Allemagne',
    transporteur: 'DHL Freight',
    tracking: 'DHL987654321',
    mode: 'Express aérien',
    cout: 890,
    delai: '5 jours',
    eta: '18/06/2026',
    destination: 'Fort-de-France',
    pointRelais: 'Ducos',
    statut: 'Arrivé Martinique',
  },
  {
    id: 3,
    fournisseur: 'BoatSupply Italia',
    pays: 'Italie',
    transporteur: 'MSC',
    tracking: 'MSC456789123',
    mode: 'Maritime',
    cout: 620,
    delai: '14 jours',
    eta: '22/06/2026',
    destination: 'Le Marin',
    pointRelais: 'Le Marin',
    statut: 'En préparation',
  },
  {
    id: 4,
    fournisseur: 'SeaPro BV',
    pays: 'Pays-Bas',
    transporteur: 'Geodis',
    tracking: 'GEO321654987',
    mode: 'Terrestre',
    cout: 320,
    delai: '7 jours',
    eta: '15/06/2026',
    destination: 'Sainte-Luce',
    pointRelais: 'Sainte-Luce',
    statut: 'Livré',
  },
];

export function TransportPage() {
  const [calc, setCalc] = useState({
    prixAchat: '',
    fraisFournisseur: '',
    transport: '',
    marge: '30',
  });

  const prixAchat = parseFloat(calc.prixAchat) || 0;
  const fraisFournisseur = parseFloat(calc.fraisFournisseur) || 0;
  const transport = parseFloat(calc.transport) || 0;
  const margePct = parseFloat(calc.marge) || 0;
  const coutTotal = prixAchat + fraisFournisseur + transport;
  const margeMontant = coutTotal * (margePct / 100);
  const prixFinal = coutTotal + margeMontant;

  const handleCalc = (field) => (e) => {
    setCalc((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const ModeIcon = ({ mode, size = 16 }) => {
    const Icon = modeIcons[mode] || Package;
    return <Icon size={size} />;
  };

  return (
    <section className="pageSection">
      {/* ─── HEADER ─── */}
      <div className="badge">Logistique</div>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '8px 0 4px' }}>
        Transport & Suivi
      </h1>
      <p style={{ color: '#516866', margin: '0 0 28px', fontSize: 'clamp(14px, 2vw, 16px)' }}>
        Coordonnez vos expéditions depuis l'Europe jusqu'à la Martinique — fret maritime, aérien,
        terrestre et suivi en temps réel de vos livraisons.
      </p>

      {/* ─── TABLEAU DE SUIVI ─── */}
      <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', margin: '0 0 6px' }}>
        <Package size={24} style={{ color: '#0f766e', verticalAlign: 'middle', marginRight: 8 }} />
        Suivi des expéditions
      </h2>
      <p style={{ color: '#516866', margin: '0 0 18px', fontSize: 14 }}>
        Visualisez et gérez toutes vos expéditions en cours.
      </p>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 36 }}>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 13,
              minWidth: 1000,
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(16,32,34,0.06)', background: '#f4f9f7' }}>
                {[
                  'Fournisseur',
                  'Pays départ',
                  'Transporteur',
                  'N° suivi',
                  'Mode',
                  'Coût',
                  'Délai',
                  'ETA',
                  'Destination',
                  'Point relais',
                  'Statut',
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '12px 10px',
                      fontWeight: 800,
                      color: '#435956',
                      fontSize: 11,
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demoShippings.map((s) => (
                <tr
                  key={s.id}
                  style={{ borderBottom: '1px solid rgba(16,32,34,0.04)' }}
                >
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0a4a5c' }}>
                    {s.fournisseur}
                  </td>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#516866' }}>
                    {s.pays}
                  </td>
                  <td style={{ padding: '12px 10px', fontWeight: 600 }}>{s.transporteur}</td>
                  <td style={{ padding: '12px 10px', fontFamily: 'monospace', fontSize: 12 }}>
                    {s.tracking}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        background: '#e7fbf7',
                        color: '#0f766e',
                        borderRadius: 999,
                        padding: '3px 10px',
                        fontSize: 12,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <ModeIcon mode={s.mode} size={13} />
                      {s.mode}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', fontWeight: 700 }}>{s.cout} €</td>
                  <td style={{ padding: '12px 10px', color: '#516866' }}>{s.delai}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 600 }}>{s.eta}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 600 }}>{s.destination}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        color: '#0f766e',
                        fontWeight: 600,
                      }}
                    >
                      <MapPin size={12} />
                      {s.pointRelais}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        background: statusBg(s.statut),
                        color: statusColor(s.statut),
                        borderRadius: 999,
                        padding: '3px 10px',
                        fontSize: 11,
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.statut === 'Livré' && <CheckCircle2 size={12} />}
                      {s.statut === 'En transit' && <Truck size={12} />}
                      {s.statut === 'En préparation' && <Clock size={12} />}
                      {s.statut === 'Arrivé Martinique' && <Warehouse size={12} />}
                      {s.statut === 'En contrôle/douane' && <AlertTriangle size={12} />}
                      {s.statut === 'En point relais' && <MapPin size={12} />}
                      {s.statut === 'À récupérer' && <Package size={12} />}
                      {s.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── LÉGENDE DES STATUTS ─── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 36,
          padding: '16px 18px',
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(16,32,34,0.08)',
          borderRadius: 16,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 800, color: '#60716f', textTransform: 'uppercase', marginRight: 4 }}>
          Statuts :
        </span>
        {statuses.map((st) => (
          <span
            key={st}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              background: statusBg(st),
              color: statusColor(st),
              borderRadius: 999,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {st === 'Livré' && <CheckCircle2 size={11} />}
            {st === 'En transit' && <Truck size={11} />}
            {st === 'En préparation' && <Clock size={11} />}
            {st === 'Arrivé Martinique' && <Warehouse size={11} />}
            {st === 'En contrôle/douane' && <AlertTriangle size={11} />}
            {st === 'En point relais' && <MapPin size={11} />}
            {st === 'À récupérer' && <Package size={11} />}
            {st}
          </span>
        ))}
      </div>

      {/* ─── CALCULATEUR DE PRIX ─── */}
      <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', margin: '0 0 6px' }}>
        <Calculator size={24} style={{ color: '#0f766e', verticalAlign: 'middle', marginRight: 8 }} />
        Calculateur de prix final
      </h2>
      <p style={{ color: '#516866', margin: '0 0 18px', fontSize: 14 }}>
        Estimez le prix final rendu Martinique à partir du prix d'achat fournisseur et des frais
        logistiques.
      </p>

      <div className="card" style={{ padding: 24, marginBottom: 36 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 14,
            marginBottom: 20,
          }}
        >
          <div className="formGroup">
            <label
              style={{
                display: 'block',
                fontWeight: 800,
                fontSize: 12,
                color: '#435956',
                marginBottom: 4,
                textTransform: 'uppercase',
              }}
            >
              Prix achat (€)
            </label>
            <input
              className="input"
              type="number"
              min="0"
              step="0.01"
              value={calc.prixAchat}
              onChange={handleCalc('prixAchat')}
              placeholder="Ex: 100"
              style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)', padding: '0 14px', fontWeight: 600, outline: 'none', fontSize: 14 }}
            />
          </div>
          <div className="formGroup">
            <label
              style={{
                display: 'block',
                fontWeight: 800,
                fontSize: 12,
                color: '#435956',
                marginBottom: 4,
                textTransform: 'uppercase',
              }}
            >
              Frais fournisseur (€)
            </label>
            <input
              className="input"
              type="number"
              min="0"
              step="0.01"
              value={calc.fraisFournisseur}
              onChange={handleCalc('fraisFournisseur')}
              placeholder="Ex: 20"
              style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)', padding: '0 14px', fontWeight: 600, outline: 'none', fontSize: 14 }}
            />
          </div>
          <div className="formGroup">
            <label
              style={{
                display: 'block',
                fontWeight: 800,
                fontSize: 12,
                color: '#435956',
                marginBottom: 4,
                textTransform: 'uppercase',
              }}
            >
              Transport (€)
            </label>
            <input
              className="input"
              type="number"
              min="0"
              step="0.01"
              value={calc.transport}
              onChange={handleCalc('transport')}
              placeholder="Ex: 35"
              style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)', padding: '0 14px', fontWeight: 600, outline: 'none', fontSize: 14 }}
            />
          </div>
          <div className="formGroup">
            <label
              style={{
                display: 'block',
                fontWeight: 800,
                fontSize: 12,
                color: '#435956',
                marginBottom: 4,
                textTransform: 'uppercase',
              }}
            >
              Marge souhaitée (%)
            </label>
            <select
              className="select"
              value={calc.marge}
              onChange={handleCalc('marge')}
              style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)', padding: '0 14px', fontWeight: 600, outline: 'none', background: 'white', fontSize: 14 }}
            >
              {[15, 20, 25, 30, 35, 40, 45, 50].map((p) => (
                <option key={p} value={p}>
                  {p}%
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Résultat */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e7fbf7, #d0f0ec)',
            borderRadius: 20,
            padding: '20px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 12,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#60716f', textTransform: 'uppercase', marginBottom: 4 }}>
              Coût total
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#0a4a5c' }}>
              {coutTotal.toFixed(2)} €
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#60716f', textTransform: 'uppercase', marginBottom: 4 }}>
              Marge ({margePct}%)
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#0f766e' }}>
              +{margeMontant.toFixed(2)} €
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#60716f', textTransform: 'uppercase', marginBottom: 4 }}>
              Prix final estimé
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#16a34a' }}>
              {prixFinal.toFixed(2)} €
            </div>
          </div>
        </div>
      </div>

      {/* ─── POINTS RELAIS ─── */}
      <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', margin: '0 0 6px' }}>
        <MapPin size={24} style={{ color: '#0f766e', verticalAlign: 'middle', marginRight: 8 }} />
        Points relais Martinique
      </h2>
      <p style={{ color: '#516866', margin: '0 0 16px', fontSize: 14 }}>
        Nos points de retrait disponibles en Martinique.
      </p>
      <div className="cardGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10, marginBottom: 36 }}>
        {relayPoints.map((pt) => (
          <div
            key={pt}
            className="card"
            style={{
              padding: '14px 10px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.88)',
              border: '1px solid rgba(15,118,110,0.12)',
              borderRadius: 16,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#e7fbf7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 6px',
                color: '#0f766e',
              }}
            >
              <MapPin size={18} />
            </div>
            <div style={{ fontWeight: 800, fontSize: 13 }}>{pt}</div>
          </div>
        ))}
      </div>

      {/* ─── CTA TRANSPORT ─── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0a4a5c 0%, #0f766e 100%)',
          borderRadius: 30,
          padding: '36px 28px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h2 style={{ color: 'white', fontSize: 'clamp(24px, 4vw, 36px)', margin: '0 0 10px' }}>
          Besoin d'un devis transport ?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, maxWidth: 520, margin: '0 auto 22px' }}>
          Notre équipe logistique vous accompagne pour toutes vos expéditions vers la Caraïbe.
          Contactez-nous pour un devis personnalisé.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <a
            href={waMessage(
              'Bonjour Ikabay, je souhaite obtenir un devis pour une expédition transport.'
            )}
            target="_blank"
            rel="noreferrer"
            className="btn btnPrimary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#25d366',
              color: 'white',
              border: 0,
              borderRadius: 16,
              padding: '14px 24px',
              fontWeight: 800,
              fontSize: 16,
              textDecoration: 'none',
              boxShadow: '0 12px 32px rgba(37,211,102,0.4)',
              cursor: 'pointer',
            }}
          >
            <Send size={18} /> Devis WhatsApp
          </a>
          <a
            href={`mailto:${APP_EMAIL}`}
            target="_blank"
            rel="noreferrer"
            className="btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 16,
              padding: '14px 24px',
              fontWeight: 800,
              fontSize: 16,
              textDecoration: 'none',
              color: 'white',
            }}
          >
            <FileText size={18} /> {APP_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

export default TransportPage;