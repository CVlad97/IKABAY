import { useState } from 'react';
import { FileText, MessageCircle, Send, CheckCircle, Clock, Truck, Package, Calculator, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL, waMessage } from '../utils/constants';
import { Link } from 'react-router-dom';

const categories = [
  'Accastillage inox', 'Securite marine', 'Navigation', 'Electricite', 
  'Plomberie', 'Mouillage', 'Sellerie', 'Transport', 'Autre'
];

const urgencies = ['Tres urgente (< 1 sem)', 'Urgente (1-2 sem)', 'Normale (3-4 sem)', 'Pas urgente'];

export default function DevisPage() {
  const [form, setForm] = useState({
    nom: '', email: '', telephone: '', societe: '',
    categorie: '', produit: '', quantite: '', budget: '',
    urgence: '', description: '', livraison: 'Martinique'
  });
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Bonjour IKABAY, je souhaite un devis pour :
Produit : ${form.produit}
Quantite : ${form.quantite}
Categorie : ${form.categorie}
Budget : ${form.budget} EUR
Urgence : ${form.urgence}
Description : ${form.description}
Livraison : ${form.livraison}
Contact : ${form.nom} - ${form.email} - ${form.telephone}`;
    // Open WhatsApp first (no signup, low-friction), then offer email as a fallback.
    window.open(waMessage(msg), '_blank', 'noopener,noreferrer');
    const subject = encodeURIComponent(`Demande de devis — ${form.categorie || 'Nautique'} — ${form.nom}`);
    const body = encodeURIComponent(msg);
    setTimeout(() => {
      if (window.confirm('Vous n\'utilisez pas WhatsApp ? Cliquez OK pour nous envoyer la demande par email à contactcvs@ikabay.store')) {
        window.location.href = `mailto:contactcvs@ikabay.store?subject=${subject}&body=${body}`;
      }
    }, 800);
    setSubmitted(true);
    setShowForm(false);
  };

  return (
    <div className="pageSection">

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
        borderRadius: 24, padding: '32px 40px', marginBottom: 32, color: 'white'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <FileText size={24} /> Demande de devis
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', margin: '8px 0 0', fontSize: 15 }}>
          Recevez jusqua 3 propositions detailles sous 48h
        </p>
      </div>

      {/* Steps */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
        {[
          { icon: FileText, step: '1', title: 'Decrivez', desc: 'Votre besoin en 2 min' },
          { icon: MessageCircle, step: '2', title: 'Sourcing', desc: 'Nous consultons nos fournisseurs' },
          { icon: Calculator, step: '3', title: 'Devis', desc: '3 propositions comparees' },
          { icon: Truck, step: '4', title: 'Livraison', desc: 'Fret maritime Martinique' },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: 'center', background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#e7fbf7', color: '#0f766e', display: 'grid', placeItems: 'center', margin: '0 auto 8px', fontSize: 20, fontWeight: 800 }}>{item.step}</div>
            <div style={{ fontWeight: 700, color: '#1a2e2b', fontSize: 14 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: '#60716f' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {showForm ? (
        <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Nom complet *</label>
                <input className="input" required value={form.nom} onChange={handleChange('nom')} placeholder="Votre nom" />
              </div>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Email *</label>
                <input className="input" type="email" required value={form.email} onChange={handleChange('email')} placeholder="votre@email.com" />
              </div>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Telephone *</label>
                <input className="input" required value={form.telephone} onChange={handleChange('telephone')} placeholder="+596 XXX XX XX" />
              </div>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Societe (optionnel)</label>
                <input className="input" value={form.societe} onChange={handleChange('societe')} placeholder="Votre societe" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Categorie *</label>
                <select className="select" required value={form.categorie} onChange={handleChange('categorie')}>
                  <option value="">Selectionnez...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Produit recherche *</label>
                <input className="input" required value={form.produit} onChange={handleChange('produit')} placeholder="Ex: Taquets inox 200mm" />
              </div>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Quantite *</label>
                <input className="input" type="number" required value={form.quantite} onChange={handleChange('quantite')} placeholder="Ex: 35" />
              </div>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Budget indicatif (EUR)</label>
                <input className="input" type="number" value={form.budget} onChange={handleChange('budget')} placeholder="Ex: 500" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Urgence *</label>
                <select className="select" required value={form.urgence} onChange={handleChange('urgence')}>
                  <option value="">Selectionnez...</option>
                  {urgencies.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div className="formGroup">
                <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Destination livraison</label>
                <input className="input" value={form.livraison} onChange={handleChange('livraison')} placeholder="Martinique" />
              </div>
            </div>

            <div className="formGroup" style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 700, fontSize: 13, color: '#1a2e2b', display: 'block', marginBottom: 4 }}>Description detaillee</label>
              <textarea className="textArea" rows={4} value={form.description} onChange={handleChange('description')} placeholder="Decrivez precisement votre besoin..." />
            </div>

            <button type="submit" className="btn btnPrimary" style={{
              padding: '16px 32px', borderRadius: 12, fontWeight: 800, fontSize: 16,
              display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer',
              width: '100%', justifyContent: 'center'
            }}>
              <MessageCircle size={20} /> Envoyer la demande sur WhatsApp
            </button>
          </form>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: 20, padding: 48, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <CheckCircle size={64} color="#16a34a" style={{ marginBottom: 16 }} />
          <h2 style={{ margin: '0 0 8px', color: '#1a2e2b' }}>Demande envoyee !</h2>
          <p style={{ fontSize: 14, color: '#60716f', marginBottom: 24 }}>
            Votre demande de devis a ete transmise a notre equipe. Vous recevrez une reponse sous 24h sur WhatsApp.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/catalogue" className="btn btnPrimary" style={{ padding: '12px 24px', borderRadius: 10, fontWeight: 700, textDecoration: 'none' }}>
              <Package size={16} /> Voir le catalogue
            </Link>
            <button onClick={() => { setShowForm(true); setSubmitted(false); }} className="btn btnSecondary" style={{ padding: '12px 24px', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
              <FileText size={16} /> Nouvelle demande
            </button>
          </div>
        </div>
      )}

      {/* Info box */}
      <div style={{ marginTop: 24, padding: 20, background: '#f0f5f3', borderRadius: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Clock size={20} color="#0f766e" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <strong style={{ color: '#1a2e2b', fontSize: 14 }}>Delai de traitement</strong>
          <p style={{ fontSize: 13, color: '#60716f', margin: '4px 0 0' }}>
            Notre equipe vous repond sous 24h avec jusqua 3 propositions comparees. 
            Le sourcing complet prend 48-72h pour les produits standards.
          </p>
        </div>
      </div>

    </div>
  );
}
