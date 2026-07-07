import { useState } from 'react';
import {
  Search, Target, FileText, MessageCircle, ClipboardCheck,
  CheckCircle, Truck, ShoppingCart, BarChart3, Phone, Mail,
  Clock, AlertCircle, Upload, ArrowRight
} from 'lucide-react';
import { WHATSAPP_URL, APP_NAME, APP_EMAIL, waMessage } from '../utils/constants';
import { categories } from '../data/products';
import { supabase, hasSupabaseConfig } from '../lib/supabase';

const methodSteps = [
  { num: '01', icon: Search, label: 'Qualification', desc: 'Analyse précise de votre besoin technique et commercial' },
  { num: '02', icon: Target, label: 'Recherche', desc: 'Mobilisation de notre réseau fournisseurs vérifiés' },
  { num: '03', icon: BarChart3, label: 'Comparaison', desc: 'Tableau comparatif prix / délais / qualité' },
  { num: '04', icon: MessageCircle, label: 'Négociation', desc: 'Optimisation rapport qualité-prix pour vous' },
  { num: '05', icon: FileText, label: 'Devis', desc: 'Jusqu\'à 3 propositions détaillées et personnalisées' },
  { num: '06', icon: CheckCircle, label: 'Validation', desc: 'Vous validez l\'offre qui vous convient' },
  { num: '07', icon: ShoppingCart, label: 'Commande', desc: 'Passation et confirmation auprès du fournisseur' },
  { num: '08', icon: Truck, label: 'Suivi', desc: 'Tracking transport et coordination logistique' },
  { num: '09', icon: ClipboardCheck, label: 'SAV', desc: 'Support après-vente et suivi satisfaction' },
];

const kanbanStages = [
  { id: 'nouveau', label: 'Nouveau', icon: AlertCircle, color: '#6b7280' },
  { id: 'a-qualifier', label: 'À qualifier', icon: Search, color: '#f97316' },
  { id: 'fournisseurs-consultes', label: 'Fournisseurs consultés', icon: Target, color: '#0f766e' },
  { id: 'devis-envoye', label: 'Devis envoyé', icon: FileText, color: '#2563eb' },
  { id: 'valide', label: 'Validé', icon: CheckCircle, color: '#16a34a' },
  { id: 'commande', label: 'Commandé', icon: ShoppingCart, color: '#7c3aed' },
  { id: 'en-transit', label: 'En transit', icon: Truck, color: '#0891b2' },
  { id: 'livre', label: 'Livré', icon: ClipboardCheck, color: '#059669' },
  { id: 'archive', label: 'Archivé', icon: Clock, color: '#6b7280' },
];

const deliveryOptions = [
  'Express aérien',
  'Maritime',
  'Retrait sur place',
  'Point relais',
];

export function SourcingPage() {
  const [form, setForm] = useState({
    nom: '',
    telephone: '',
    email: '',
    categorie: '',
    description: '',
    budget: '',
    urgence: '',
    quantite: '',
    lien: '',
    destination: '',
    livraison: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // 1. Sauvegarder dans Supabase
      if (hasSupabaseConfig && supabase) {
        const payload = {
          client_name: form.nom,
          telephone: form.telephone,
          email: form.email,
          category: form.categorie,
          description: form.description,
          budget: form.budget,
          urgence: form.urgence,
          quantite: form.quantite,
          lien: form.lien,
          destination: form.destination,
          livraison: form.livraison,
          status: 'nouveau',
          notified: false,
        };
        const { error: dbError } = await supabase
          .from('sourcing_requests')
          .insert(payload);
        if (dbError && !dbError.message?.includes('does not exist')) {
          console.warn('Supabase:', dbError.message);
        }
      }

      // 2. Envoyer notification WhatsApp (au propriétaire)
      const msg = `*NOUVELLE DEMANDE SOURCING*\\n\\n` +
        `👤 *${form.nom}*\\n` +
        `📞 ${form.telephone}\\n` +
        `📧 ${form.email}\\n` +
        `📂 ${form.categorie}\\n` +
        `📝 ${form.description}\\n` +
        `💰 Budget: ${form.budget}\\n` +
        `⚡ Urgence: ${form.urgence}\\n` +
        `📍 Destination: ${form.destination}\\n` +
        `🚚 Livraison: ${form.livraison}`;

      // Backup WhatsApp direct
      window.open(waMessage(msg), '_blank');

      setSubmitted(true);
      setForm({
        nom: '', telephone: '', email: '', categorie: '',
        description: '', budget: '', urgence: '', quantite: '',
        lien: '', destination: '', livraison: '',
      });
    } catch (e) {
      setError("Erreur lors de l'envoi. Contactez-nous directement sur WhatsApp.");
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pageSection">
      {/* ─── HERO ─── */}
      <div className="hero" style={{ marginBottom: 32, textAlign: 'center' }}>
        <div className="badge">Sur-mesure</div>
        <h1 style={{ fontSize: 'clamp(36px, 7vw, 68px)' }}>Sourcing<br />Opérationnel</h1>
        <p style={{ maxWidth: 620, margin: '12px auto 0', fontSize: 'clamp(16px, 2vw, 19px)' }}>
          Vous avez un besoin spécifique ? Notre équipe mobilise son réseau de partenaires vérifiés
          pour trouver le produit idéal au meilleur prix, livré en Martinique ou dans la Caraïbe.
        </p>
      </div>

      {/* ─── 9-STEP MÉTHODE IKABAY ─── */}
      <div style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: 18 }}>Méthode Ikabay</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12
        }}>
          {methodSteps.map((step) => (
            <div
              key={step.num}
              style={{
                background: 'rgba(255,255,255,0.88)',
                border: '1px solid rgba(16,32,34,0.08)',
                borderRadius: 20,
                padding: 18,
                textAlign: 'center',
                transition: 'box-shadow 0.3s, transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26,72,70,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: 'linear-gradient(135deg, #e7fbf7, #d0f0ec)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 10px', color: '#0f766e'
              }}>
                <step.icon size={22} />
              </div>
              <div style={{
                fontSize: 12, fontWeight: 900, color: '#e8d5b7', letterSpacing: '0.04em',
                marginBottom: 4
              }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: 14, margin: '0 0 4px' }}>{step.label}</h3>
              <p style={{ fontSize: 12, color: '#516866', margin: 0, lineHeight: 1.4 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SOURCING FORM ─── */}
      <div style={{
        background: 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(16,32,34,0.1)',
        borderRadius: 24,
        padding: '28px 24px',
        marginBottom: 36,
        boxShadow: '0 18px 50px rgba(26,72,70,0.09)'
      }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', marginBottom: 20 }}>
          Formulaire de sourcing
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
            marginBottom: 14
          }}>
            {/* Nom */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Nom complet <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                required
                value={form.nom}
                onChange={handleChange('nom')}
                placeholder="Votre nom"
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              />
            </div>

            {/* Téléphone */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Téléphone <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                required
                type="tel"
                value={form.telephone}
                onChange={handleChange('telephone')}
                placeholder="+596 6XX XX XX XX"
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Email <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="vous@exemple.fr"
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              />
            </div>

            {/* Catégorie */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Catégorie de besoin <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <select
                required
                value={form.categorie}
                onChange={handleChange('categorie')}
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              >
                <option value="">Sélectionnez...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Budget estimé (€)
              </label>
              <input
                type="number"
                value={form.budget}
                onChange={handleChange('budget')}
                placeholder="Ex: 500"
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              />
            </div>

            {/* Urgence */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Niveau d'urgence
              </label>
              <select
                value={form.urgence}
                onChange={handleChange('urgence')}
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              >
                <option value="">Sélectionnez...</option>
                <option value="Immédiat">Immédiat (- de 48h)</option>
                <option value="Urgent">Urgent (1 semaine)</option>
                <option value="Normal">Normal (2-4 semaines)</option>
                <option value="Pas urgent">Pas urgent (+ d'1 mois)</option>
              </select>
            </div>

            {/* Quantité */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Quantité
              </label>
              <input
                type="number" min="1"
                value={form.quantite}
                onChange={handleChange('quantite')}
                placeholder="Ex: 10"
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              />
            </div>

            {/* Lien produit */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Lien produit / référence
              </label>
              <input
                value={form.lien}
                onChange={handleChange('lien')}
                placeholder="URL ou référence"
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              />
            </div>

            {/* Destination */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Destination
              </label>
              <input
                value={form.destination}
                onChange={handleChange('destination')}
                placeholder="Ville / pays"
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              />
            </div>

            {/* Mode livraison */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                Mode de livraison
              </label>
              <select
                value={form.livraison}
                onChange={handleChange('livraison')}
                style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                  padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
              >
                <option value="">Sélectionnez...</option>
                {deliveryOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description (full width) */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
              Description détaillée du besoin <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <textarea
              required
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Décrivez précisément ce que vous recherchez : type de produit, spécifications techniques, quantité, usage..."
              rows={4}
              style={{ width: '100%', borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                padding: '12px 14px', background: 'white', outline: 'none', fontWeight: 600,
                fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          {/* File upload placeholder */}
          <div style={{
            marginBottom: 18, padding: 20, borderRadius: 14,
            border: '2px dashed rgba(15,118,110,0.3)', background: 'rgba(231,251,247,0.4)',
            textAlign: 'center', cursor: 'pointer'
          }}>
            <Upload size={28} color="#0f766e" style={{ marginBottom: 6 }} />
            <p style={{ margin: 0, fontWeight: 700, color: '#0f766e', fontSize: 14 }}>
              Ajouter un fichier (devis, photo, cahier des charges...)
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#60716f' }}>
              Format accepté : PDF, JPG, PNG — max 10 Mo
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>

            {/* Success message */}
            {submitted && (
              <div style={{
                width: '100%', padding: 16, borderRadius: 14,
                background: '#dcfce7', color: '#166534',
                display: 'flex', alignItems: 'center', gap: 10,
                fontWeight: 700, fontSize: 14
              }}>
                <CheckCircle size={20} />
                Demande envoyée ! Nous vous répondrons sous 24h.
              </div>
            )}

            {/* Error message */}
            {error && (
              <div style={{
                width: '100%', padding: 16, borderRadius: 14,
                background: '#fef2f2', color: '#dc2626',
                display: 'flex', alignItems: 'center', gap: 10,
                fontWeight: 700, fontSize: 14
              }}>
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: submitting ? '#bccfcc' : '#f97316', color: 'white', border: 0, borderRadius: 16,
                padding: '14px 24px', fontWeight: 800, fontSize: 16, cursor: submitting ? 'not-allowed' : 'pointer',
                boxShadow: submitting ? 'none' : '0 12px 32px rgba(249,115,22,0.28)'
              }}
            >
              <Send size={18} /> {submitting ? 'Envoi en cours...' : 'Envoyer la demande'}
            </button>
            <a
              href={waMessage('Bonjour Ikabay, je souhaite faire une demande de sourcing.')}
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'white', border: '1px solid rgba(16,32,34,0.14)',
                borderRadius: 16, padding: '14px 24px', fontWeight: 800, fontSize: 16,
                textDecoration: 'none', color: '#102022'
              }}
            >
              <MessageCircle size={18} /> WhatsApp direct
            </a>
          </div>
        </form>
      </div>

      {/* ─── KANBAN VIEW ─── */}
      <div style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', marginBottom: 18 }}>
          Suivi de vos dossiers
        </h2>
        <p style={{ color: '#516866', fontSize: 15, marginBottom: 16 }}>
          Visualisez l'état d'avancement de vos demandes de sourcing en temps réel.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 10
        }}>
          {kanbanStages.map((stage) => (
            <div
              key={stage.id}
              style={{
                background: 'rgba(255,255,255,0.88)',
                border: `2px solid ${stage.color}20`,
                borderRadius: 18,
                padding: 16,
                textAlign: 'center',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: `${stage.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 8px', color: stage.color
              }}>
                <stage.icon size={20} />
              </div>
              <div style={{
                fontSize: 12, fontWeight: 800, color: stage.color,
                textTransform: 'uppercase', letterSpacing: '0.03em'
              }}>
                {stage.label}
              </div>
              <div style={{
                marginTop: 8, fontSize: 11, color: '#60716f',
                background: '#f4f7f5', borderRadius: 999, padding: '3px 8px',
                display: 'inline-block'
              }}>
                0 dossier
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── WHATSAPP CTA ─── */}
      <div style={{
        background: 'linear-gradient(135deg, #0a4a5c 0%, #0f766e 100%)',
        borderRadius: 30, padding: '36px 28px', textAlign: 'center', color: 'white'
      }}>
        <h2 style={{ color: 'white', fontSize: 'clamp(24px, 4vw, 36px)', margin: '0 0 10px' }}>
          Une question immédiate ?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, maxWidth: 500, margin: '0 auto 22px' }}>
          Notre équipe est disponible 7j/7 par WhatsApp pour répondre à toutes vos demandes.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank" rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#25d366', color: 'white', border: 0, borderRadius: 16,
            padding: '16px 32px', fontWeight: 800, fontSize: 18, textDecoration: 'none',
            boxShadow: '0 12px 32px rgba(37,211,102,0.4)'
          }}
        >
          <MessageCircle size={22} /> Nous contacter sur WhatsApp
        </a>
      </div>
    </section>
  );
}

// Local Send icon (lucide-react doesn't export it directly in all versions)
function Send(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

export default SourcingPage;