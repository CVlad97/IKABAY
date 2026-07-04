import { useState } from 'react';
import {
  Building2, Award, Star, TrendingUp, AlertTriangle,
  Plus, Search, RefreshCw, ExternalLink, ShoppingCart
} from 'lucide-react';
import { products } from '../data/products';
import { waMessage } from '../utils/constants';

const CATEGORIES = [
  'Accastillage', 'Électronique', 'Sécurité', 'Plomberie',
  'Pare-battages', 'Remorque', 'Audio', 'Transport'
];

const COUNTRIES = [
  'France', 'Allemagne', 'Italie', 'Espagne', 'Pays-Bas',
  'Portugal', 'Chine', 'Turquie', 'USA'
];

const SUPPLIER_SCORES = {
  'Osculati 🇮🇹':     { total: 94, details: { prix: 25, delai: 20, fiabilite: 19, qualite: 18, communication: 12 } },
  'AD Nautic 🇫🇷':    { total: 88, details: { prix: 22, delai: 19, fiabilite: 18, qualite: 17, communication: 12 } },
  'SVB Allemagne 🇩🇪': { total: 82, details: { prix: 20, delai: 18, fiabilite: 17, qualite: 16, communication: 11 } },
  'Comptoir Nautique 🇫🇷': { total: 85, details: { prix: 23, delai: 17, fiabilite: 17, qualite: 16, communication: 12 } },
  'Quick Nautical 🇮🇹': { total: 91, details: { prix: 26, delai: 20, fiabilite: 18, qualite: 17, communication: 10 } },
  'Ullman Dynamics 🇸🇪': { total: 78, details: { prix: 16, delai: 12, fiabilite: 17, qualite: 19, communication: 14 } },
  'Ros Industrie 🇮🇹':  { total: 70, details: { prix: 18, delai: 13, fiabilite: 15, qualite: 16, communication: 8 } },
  'Tessilmare 🇮🇹':    { total: 88, details: { prix: 23, delai: 18, fiabilite: 18, qualite: 18, communication: 11 } },
  'Plastimo 🇫🇷':     { total: 93, details: { prix: 24, delai: 20, fiabilite: 19, qualite: 19, communication: 11 } },
  'Trend Marine 🇫🇷': { total: 68, details: { prix: 18, delai: 13, fiabilite: 14, qualite: 15, communication: 8 } },
  'Seatrade 🇮🇹':     { total: 70, details: { prix: 19, delai: 12, fiabilite: 15, qualite: 16, communication: 8 } },
  'Mantus Marine 🇺🇸': { total: 75, details: { prix: 20, delai: 14, fiabilite: 17, qualite: 16, communication: 8 } },
  'Qingdao Glory 🇨🇳': { total: 60, details: { prix: 28, delai: 8, fiabilite: 10, qualite: 8, communication: 6 } },
  'Wudi Chine 🇨🇳':   { total: 55, details: { prix: 27, delai: 7, fiabilite: 9, qualite: 7, communication: 5 } },
  'Alastin Chine 🇨🇳': { total: 58, details: { prix: 27, delai: 8, fiabilite: 9, qualite: 8, communication: 6 } },
};

function generateScore() {
  return { total: 0, details: { prix: 0, delai: 0, fiabilite: 0, qualite: 0, communication: 0 } };
}

function badgeInfo(score) {
  if (score >= 80) return { label: 'Recommandé', color: '#16a34a', bg: '#dcfce7' };
  if (score >= 60) return { label: 'À tester', color: '#ea580c', bg: '#fff7ed' };
  if (score >= 40) return { label: 'Risque moyen', color: '#92400e', bg: '#fef3c7' };
  return { label: 'À éviter', color: '#dc2626', bg: '#fef2f2' };
}

const INITIAL_SUPPLIERS = [
  { id: 1, name: 'Osculati 🇮🇹', contact: 'Vendite Export', email: 'vendite@osculati.com', phone: '+39 02 9353 8111', country: 'Italie', category: 'Accastillage', site: 'https://www.osculati.com' },
  { id: 2, name: 'AD Nautic 🇫🇷', contact: 'Service Commercial', email: 'contact@adnautic.com', phone: '+33 2 97 65 00 00', country: 'France', category: 'Accastillage', site: 'https://www.adnautic.com' },
  { id: 3, name: 'SVB Allemagne 🇩🇪', contact: 'Vertrieb', email: 'info@svb.de', phone: '+49 421 5363 0', country: 'Allemagne', category: 'Navigation', site: 'https://www.svb.de' },
  { id: 4, name: 'Comptoir Nautique 🇫🇷', contact: 'contact@comptoirnautique.com', email: 'contact@comptoirnautique.com', phone: '09 67 20 59 40', country: 'France', category: 'Navigation', site: 'https://www.comptoirnautique.fr' },
  { id: 5, name: 'Quick Nautical 🇮🇹', contact: 'Sales Dept', email: 'info@quicknautical.com', phone: '+39 030 373 1000', country: 'Italie', category: 'Davier', site: 'https://www.quicknautical.com' },
  { id: 6, name: 'Ullman Dynamics 🇸🇪', contact: 'Erik / Sales', email: 'sales@ullmandynamics.com', phone: '+46 (0) 8 120 000', country: 'Suède', category: 'Sellerie', site: 'https://www.ullmandynamics.com' },
  { id: 7, name: 'Ros Industrie 🇮🇹', contact: 'Commerciale', email: 'info@rosindustrie.com', phone: '+39 0421 267 411', country: 'Italie', category: 'Sellerie', site: 'https://www.rosindustrie.com' },
  { id: 8, name: 'Plastimo 🇫🇷', contact: 'SAV Plastimo', email: 'sav@plastimo.com', phone: '+33 2 97 02 82 82', country: 'France', category: 'Compas', site: 'https://www.plastimo.com' },
  { id: 9, name: 'GEODIS Logistics 🇫🇷', contact: 'Formulaire web', email: 'https://www.geodis.com/fr/nous-contacter', phone: '+33 1 55 95 30 00', country: 'France', category: 'Transport', site: 'https://www.geodis.com/fr/nous-contacter' },
  { id: 10, name: 'Trend Marine 🇫🇷', contact: 'Service Devis', email: 'devis@trendmarine.com', phone: '+33 2 40 92 31 31', country: 'France', category: 'Sellerie', site: 'https://www.trendmarine.com' },
  { id: 11, name: 'Qingdao Glory 🇨🇳', contact: 'Grace Wang', email: 'grace@gloryhardware.cn', phone: '+86 532 8896 1234', country: 'Chine', category: 'Taquets', site: 'https://gloryhardware.en.alibaba.com' },
  { id: 12, name: 'Mantus Marine 🇺🇸', contact: 'Support', email: 'info@mantusmarine.com', phone: '+1 713 510 5345', country: 'USA', category: 'Davier', site: 'https://www.mantusmarine.com' },
  { id: 13, name: 'Tessilmare 🇮🇹', contact: 'Ufficio Commerciale', email: 'info@tessilmare.com', phone: '+39 0421 267 411', country: 'Italie', category: 'Liston', site: 'https://www.tessilmare.com' },
];

const OFFERS = [
  { produit: 'Compas magnétique Plastimo Contest 150', prixAchat: 543.90, transport: 26, delai: '48h stock', MOQ: 1, garantie: '2 ans', fournisseur: 'Comptoir Nautique 🇫🇷', categorie: 'Navigation', cat: 'compas' },
  { produit: 'Liston PVC prépercé barre 6m', prixAchat: 8.90, transport: 2, delai: '5-7j stock', MOQ: 6, garantie: '1 an', fournisseur: 'Osculati 🇮🇹', categorie: 'Accastillage', cat: 'liston' },
  { produit: 'Liseret PVC compatible liston (barre 6m)', prixAchat: 3.50, transport: 1, delai: '5-7j stock', MOQ: 6, garantie: '1 an', fournisseur: 'Osculati 🇮🇹', categorie: 'Accastillage', cat: 'liston' },
  { produit: 'Hublot ovale inox 365x150mm Osculati 81.502', prixAchat: 85.90, transport: 8, delai: '5-7j stock', MOQ: 4, garantie: '2 ans', fournisseur: 'Osculati 🇮🇹', categorie: 'Accastillage', cat: 'hublots' },
  { produit: 'Bolster double baquet avec sellerie', prixAchat: 1800, transport: 120, delai: '4-6 sem', MOQ: 1, garantie: '2 ans', fournisseur: 'Ullman Dynamics 🇸🇪', categorie: 'Sellerie', cat: 'sieges' },
  { produit: 'Davier bow roller Quick Nemo 10kg', prixAchat: 99, transport: 12, delai: '72h stock', MOQ: 5, garantie: '2 ans', fournisseur: 'Quick Nautical 🇮🇹', categorie: 'Accastillage', cat: 'davier' },
  { produit: 'Échelle inox 4 marches Osculati 84.840', prixAchat: 112.50, transport: 15, delai: '5-7j stock', MOQ: 5, garantie: '2 ans', fournisseur: 'Osculati 🇮🇹', categorie: 'Accastillage', cat: 'echelles' },
  { produit: 'Taquet inox 200mm Osculati 90.613', prixAchat: 18.50, transport: 4, delai: '5-7j stock', MOQ: 35, garantie: '2 ans', fournisseur: 'Osculati 🇮🇹', categorie: 'Accastillage', cat: 'taquets' },
  { produit: 'Loquet inox simple 92.100', prixAchat: 9.80, transport: 2, delai: '5-7j stock', MOQ: 10, garantie: '2 ans', fournisseur: 'Osculati 🇮🇹', categorie: 'Accastillage', cat: 'loquets' },
  { produit: 'Loquet inox à clé 92.102', prixAchat: 14.50, transport: 2, delai: '5-7j stock', MOQ: 10, garantie: '2 ans', fournisseur: 'Osculati 🇮🇹', categorie: 'Accastillage', cat: 'loquets' },
  { produit: 'Porte-gobelet inox Osculati 84.970', prixAchat: 8.50, transport: 2, delai: '5-7j stock', MOQ: 20, garantie: '2 ans', fournisseur: 'Osculati 🇮🇹', categorie: 'Accastillage', cat: 'accastillage-inox' },
  { produit: 'Taquet inox 200mm (MOQ100) Alibaba', prixAchat: 2.50, transport: 3, delai: '15-20j + fret', MOQ: 100, garantie: '1 an', fournisseur: 'Qingdao Glory 🇨🇳', categorie: 'Accastillage', cat: 'taquets' },
  { produit: 'Loquet simple inox (MOQ300) Alibaba', prixAchat: 2.50, transport: 2, delai: '20-30j + fret', MOQ: 300, garantie: '1 an', fournisseur: 'Wudi Chine 🇨🇳', categorie: 'Accastillage', cat: 'loquets' },
];

export function FournisseursPage() {
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS.map(s => {
    const score = SUPPLIER_SCORES[s.name] || { total: 50, details: { prix: 12, delai: 10, fiabilite: 10, qualite: 9, communication: 9 } };
    return { ...s, ...score };
  }));
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
        Gérez vos fournisseurs partenaires et comparez leurs offres. Contact : <strong>sourcing@ikabay.store</strong>
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
      <div className="cardGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 32 }}>
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

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {s.site && (
                  <a href={s.site} target="_blank" rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: '#0f766e', color: 'white', border: 0, borderRadius: 12,
                      padding: '8px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                      textDecoration: 'none', flex: 1, justifyContent: 'center'
                    }}>
                    <ExternalLink size={13} /> Site
                  </a>
                )}
                <button onClick={() => {
                  const msg = `Bonjour ${s.name},\n\nJe suis Ikabay Sourcing, spécialiste en approvisionnement nautique pour la Martinique.\n\nNous avons identifié vos produits comme pertinents pour notre projet d'équipement de 5 bateaux de plaisance.\n\nPourriez-vous nous faire parvenir votre catalogue et vos meilleurs tarifs pour les articles suivants ?\n\nMerci de nous communiquer :\n- Prix unitaire HT (EXW ou FOB)\n- Délais de livraison\n- MOQ\n- Fiche technique et photos produits\n\nDans l'attente de votre retour, cordialement.\n\nIkabay Sourcing`;
                  window.open(waMessage(msg), '_blank');
                }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    background: '#25d366', color: 'white', border: 0, borderRadius: 12,
                    padding: '8px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                    flex: 1, justifyContent: 'center'
                  }}>
                  <ShoppingCart size={13} /> RFQ
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── COMPARATEUR D'OFFRES ─── */}
      <h2 className="sectionTitle" style={{ fontSize: 'clamp(24px, 3vw, 34px)', margin: '0 0 6px' }}>
        <TrendingUp size={28} style={{ color: '#0f766e', verticalAlign: 'middle', marginRight: 10 }} />
        Tableau comparatif des offres
      </h2>
      <p style={{ color: '#516866', margin: '0 0 18px' }}>
        Comparez les offres fournisseurs pour chaque produit. Contact sourcing : <strong>sourcing@ikabay.store</strong>
      </p>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(16,32,34,0.06)', background: '#f4f9f7' }}>
                {['Produit', 'Prix achat', 'Frais transport', 'Délai', 'Minimum commande', 'Garantie', 'Score fournisseur', 'Marge estimée', 'Recommandation'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 10px', fontWeight: 800, color: '#435956', fontSize: 11, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OFFERS.map((offer, i) => {
                const margin = getOfferMargin(offer);
                const supplierScore = SUPPLIER_SCORES[offer.fournisseur] || { total: 50, details: { prix: 12, delai: 10, fiabilite: 10, qualite: 9, communication: 9 } };
                const score = supplierScore.total;
                  const badge = badgeInfo(score);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(16,32,34,0.04)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: '#0a4a5c' }}>{offer.produit}</td>
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