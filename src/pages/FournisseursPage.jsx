import { useState } from 'react';
import {
  Building2, Award, Star, TrendingUp, AlertTriangle,
  Plus, Search, RefreshCw
} from 'lucide-react';

const CATEGORIES = [
  'Accastillage', 'Électronique', 'Sécurité', 'Plomberie',
  'Pare-battages', 'Remorque', 'Audio', 'Transport'
];

const COUNTRIES = [
  'France', 'Allemagne', 'Italie', 'Espagne', 'Pays-Bas',
  'Portugal', 'Chine', 'Turquie', 'USA'
];

function generateScore() {
  // Score pondéré sur 100
  const prix = Math.floor(Math.random() * 31);       // 0-30
  const delai = Math.floor(Math.random() * 21);       // 0-20
  const fiabilite = Math.floor(Math.random() * 21);   // 0-20
  const qualite = Math.floor(Math.random() * 16);     // 0-15
  const communication = Math.floor(Math.random() * 16); // 0-15
  return {
    total: prix + delai + fiabilite + qualite + communication,
    details: { prix, delai, fiabilite, qualite, communication }
  };
}

function badgeInfo(score) {
  if (score >= 80) return { label: 'Recommandé', color: '#16a34a', bg: '#dcfce7' };
  if (score >= 60) return { label: 'À tester', color: '#ea580c', bg: '#fff7ed' };
  if (score >= 40) return { label: 'Risque moyen', color: '#92400e', bg: '#fef3c7' };
  return { label: 'À éviter', color: '#dc2626', bg: '#fef2f2' };
}

const INITIAL_SUPPLIERS = [
  { id: 1, name: 'MarineTech SARL', contact: 'Sophie Martin', email: 'sophie@marinetech.fr', phone: '+33 6 12 34 56 78', country: 'France', category: 'Accastillage' },
  { id: 2, name: 'NauticParts GmbH', contact: 'Hans Weber', email: 'hans@nauticparts.de', phone: '+49 170 9876543', country: 'Allemagne', category: 'Électronique' },
  { id: 3, name: 'BoatSupply Italia', contact: 'Marco Rossi', email: 'marco@boatsupply.it', phone: '+39 345 6789012', country: 'Italie', category: 'Sécurité' },
  { id: 4, name: 'SeaPro BV', contact: 'Jan de Vries', email: 'jan@seapro.nl', phone: '+31 6 12345678', country: 'Pays-Bas', category: 'Plomberie' },
];

const OFFERS = [
  { produit: 'Bouée de sauvetage', prixAchat: 12, transport: 3, delai: '10 jours', MOQ: 50, garantie: '2 ans', fournisseur: 'MarineTech SARL' },
  { produit: 'Feu tribord vert', prixAchat: 15, transport: 4, delai: '14 jours', MOQ: 100, garantie: '1 an', fournisseur: 'NauticParts GmbH' },
  { produit: 'Charnière inox', prixAchat: 8, transport: 2, delai: '7 jours', MOQ: 200, garantie: '2 ans', fournisseur: 'BoatSupply Italia' },
];

export function FournisseursPage() {
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS.map(s => ({ ...s, ...generateScore() })));
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', contact: '', email: '', phone: '', country: '', category: '' });

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase()) ||
    s.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    const newSupplier = {
      id: Date.now(),
      ...form,
      ...generateScore()
    };
    setSuppliers(prev => [...prev, newSupplier]);
    setForm({ name: '', contact: '', email: '', phone: '', country: '', category: '' });
    setShowForm(false);
  };

  const handleRefreshScore = (id) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...generateScore() } : s));
  };

  // Calcul marge estimée pour le comparateur
  const getOfferMargin = (offer) => {
    const prixVenteEstime = offer.prixAchat * 1.35;
    return Math.round(((prixVenteEstime - offer.prixAchat) / prixVenteEstime) * 100);
  };

  return (
    <section className="pageSection">
      {/* ─── HEADER ─── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span className="badge" style={{ background: '#0f766e' }}>Réseau</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: '#e7fbf7', color: '#0f766e', borderRadius: 999,
          padding: '6px 14px', fontSize: 13, fontWeight: 800
        }}>
          <Building2 size={14} /> {suppliers.length} fournisseurs
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 'clamp(28px, 4vw, 44px)' }}>Fournisseurs</h1>
        <button onClick={() => setShowForm(!showForm)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: showForm ? '#dc2626' : '#0f766e', color: 'white', border: 0,
            borderRadius: 14, padding: '10px 18px', fontWeight: 800, fontSize: 14, cursor: 'pointer'
          }}>
          <Plus size={16} /> {showForm ? 'Fermer' : 'Ajouter'}
        </button>
      </div>
      <p style={{ color: '#516866', margin: '4px 0 24px' }}>
        Gérez vos fournisseurs partenaires et comparez leurs offres.
      </p>

      {/* ─── ADD SUPPLIER FORM ─── */}
      {showForm && (
        <form onSubmit={handleAdd} style={{
          background: 'rgba(255,255,255,0.95)', borderRadius: 24, padding: 24, marginBottom: 24,
          border: '2px solid #0f766e', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14
        }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#60716f', display: 'block', marginBottom: 4 }}>Nom *</label>
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Nom entreprise" style={{ width: '100%', minHeight: 46, borderRadius: 12, border: '1px solid rgba(16,32,34,0.13)', padding: '0 12px', fontWeight: 600, outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#60716f', display: 'block', marginBottom: 4 }}>Contact</label>
            <input value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })}
              placeholder="Nom du contact" style={{ width: '100%', minHeight: 46, borderRadius: 12, border: '1px solid rgba(16,32,34,0.13)', padding: '0 12px', fontWeight: 600, outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#60716f', display: 'block', marginBottom: 4 }}>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="email@fournisseur.com" style={{ width: '100%', minHeight: 46, borderRadius: 12, border: '1px solid rgba(16,32,34,0.13)', padding: '0 12px', fontWeight: 600, outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#60716f', display: 'block', marginBottom: 4 }}>Téléphone</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="+33 6 ..." style={{ width: '100%', minHeight: 46, borderRadius: 12, border: '1px solid rgba(16,32,34,0.13)', padding: '0 12px', fontWeight: 600, outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#60716f', display: 'block', marginBottom: 4 }}>Pays</label>
            <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
              style={{ width: '100%', minHeight: 46, borderRadius: 12, border: '1px solid rgba(16,32,34,0.13)', padding: '0 10px', fontWeight: 600, outline: 'none', background: 'white' }}>
              <option value="">Sélectionner</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#60716f', display: 'block', marginBottom: 4 }}>Catégorie *</label>
            <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              style={{ width: '100%', minHeight: 46, borderRadius: 12, border: '1px solid rgba(16,32,34,0.13)', padding: '0 10px', fontWeight: 600, outline: 'none', background: 'white' }}>
              <option value="">Sélectionner</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="submit"
              style={{
                background: '#0f766e', color: 'white', border: 0, borderRadius: 14,
                padding: '0 24px', fontWeight: 800, cursor: 'pointer', minHeight: 46
              }}>
              <Plus size={16} style={{ marginRight: 6 }} /> Ajouter
            </button>
          </div>
        </form>
      )}

      {/* ─── SEARCH ─── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
        background: 'white', border: '1px solid rgba(16,32,34,0.13)', borderRadius: 16,
        padding: '0 14px', minHeight: 50
      }}>
        <Search size={18} color="#60716f" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher par nom, catégorie ou pays..."
          style={{ border: 0, outline: 'none', width: '100%', background: 'transparent', fontWeight: 600, fontSize: 14 }}
        />
      </div>

      {/* ─── SUPPLIER CARDS GRID ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 32 }}>
        {filtered.map(s => {
          const badge = badgeInfo(s.total);
          return (
            <div key={s.id} className="card" style={{ padding: 20 }}>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: '#e7fbf7', display: 'grid', placeItems: 'center', color: '#0f766e' }}>
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, margin: 0 }}>{s.name}</h3>
                    <span style={{ fontSize: 12, color: '#60716f', fontWeight: 600 }}>{s.category} · {s.country}</span>
                  </div>
                </div>
                {/* Badge */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: badge.bg, color: badge.color, borderRadius: 999,
                  padding: '4px 10px', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap'
                }}>
                  <Award size={12} /> {badge.label}
                </span>
              </div>

              {/* Score */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 28, fontWeight: 900, color: s.total >= 80 ? '#16a34a' : s.total >= 60 ? '#ea580c' : '#dc2626' }}>
                    {s.total}
                  </span>
                  <span style={{ fontSize: 13, color: '#60716f', fontWeight: 600 }}>/ 100</span>
                </div>
                {/* Score bars */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                  {[
                    { key: 'prix', label: 'Prix', max: 30 },
                    { key: 'delai', label: 'Délai', max: 20 },
                    { key: 'fiabilite', label: 'Fiabilité', max: 20 },
                    { key: 'qualite', label: 'Qualité', max: 15 },
                    { key: 'communication', label: 'Communication', max: 15, fullRow: true },
                  ].map(metric => (
                    <div key={metric.key} style={{ gridColumn: metric.fullRow ? '1 / -1' : 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#60716f', minWidth: 80 }}>{metric.label}</span>
                      <div style={{ flex: 1, height: 6, background: '#e8f0ec', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          width: `${(s.details[metric.key] / metric.max) * 100}%`,
                          height: '100%', background: '#0f766e', borderRadius: 3
                        }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#435956', minWidth: 20, textAlign: 'right' }}>{s.details[metric.key]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div style={{ fontSize: 13, color: '#516866', marginBottom: 14, lineHeight: 1.6 }}>
                {s.contact && <div>📋 {s.contact}</div>}
                {s.email && <div>📧 {s.email}</div>}
                {s.phone && <div>📞 {s.phone}</div>}
              </div>

              {/* Action */}
              <button onClick={() => handleRefreshScore(s.id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'none', border: '1px solid rgba(16,32,34,0.13)', borderRadius: 12,
                  padding: '8px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer', color: '#435956', width: '100%', justifyContent: 'center'
                }}>
                <RefreshCw size={14} /> Recalculer score
              </button>
            </div>
          );
        })}
      </div>

      {/* ─── COMPARATEUR D'OFFRES ─── */}
      <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', margin: '0 0 6px' }}>
        <TrendingUp size={28} style={{ color: '#0f766e', verticalAlign: 'middle', marginRight: 10 }} />
        Comparateur d'offres
      </h2>
      <p style={{ color: '#516866', margin: '0 0 18px' }}>
        Comparez les offres fournisseurs pour chaque produit.
      </p>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(16,32,34,0.06)', background: '#f4f9f7' }}>
                {['Produit', 'Fournisseur', 'Prix achat', 'Transport', 'Délai', 'MOQ', 'Garantie', 'Score', 'Marge est.', 'Recommandation'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 10px', fontWeight: 800, color: '#435956', fontSize: 11, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OFFERS.map((offer, i) => {
                const margin = getOfferMargin(offer);
                const supplier = suppliers.find(s => s.name === offer.fournisseur);
                const score = supplier?.total ?? Math.floor(60 + Math.random() * 40);
                const badge = badgeInfo(score);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(16,32,34,0.04)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0a4a5c' }}>{offer.produit}</td>
                    <td style={{ padding: '12px 10px', fontWeight: 600 }}>{offer.fournisseur}</td>
                    <td style={{ padding: '12px 10px', fontWeight: 700 }}>{offer.prixAchat} €</td>
                    <td style={{ padding: '12px 10px' }}>{offer.transport} €</td>
                    <td style={{ padding: '12px 10px' }}>{offer.delai}</td>
                    <td style={{ padding: '12px 10px' }}>{offer.MOQ}</td>
                    <td style={{ padding: '12px 10px' }}>{offer.garantie}</td>
                    <td style={{ padding: '12px 10px', fontWeight: 800, color: score >= 80 ? '#16a34a' : score >= 60 ? '#ea580c' : '#dc2626' }}>{score}</td>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: margin >= 25 ? '#16a34a' : '#ea580c' }}>{margin}%</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 3,
                        background: badge.bg, color: badge.color, borderRadius: 999,
                        padding: '3px 8px', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap'
                      }}>
                        {badge.label === 'Recommandé' && <Star size={11} />}
                        {badge.label === 'Risque moyen' && <AlertTriangle size={11} />}
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default FournisseursPage;