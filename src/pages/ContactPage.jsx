import { useState } from 'react';
import {
  MessageCircle, Mail, Phone, MapPin, Clock, HelpCircle,
  ChevronDown, ChevronUp, Send, ArrowRight
} from 'lucide-react';
import { WHATSAPP_URL, APP_NAME, APP_EMAIL, waMessage } from '../utils/constants';

const faqs = [
  {
    q: 'Comment fonctionne le sourcing Ikabay ?',
    a: 'Vous nous décrivez votre besoin via le formulaire ou WhatsApp. Notre équipe mobilise son réseau de fournisseurs vérifiés pour trouver le produit idéal. Vous recevez jusqu\'à 3 devis comparés sous 48 à 72h ouvrées.',
  },
  {
    q: 'Quels types de produits pouvez-vous sourcer ?',
    a: 'Équipement nautique, pièces détachées bateau, matériel électrique/plomberie marine, accastillage inox, électronique embarquée, et tout équipement industriel ou technique pour les professionnels de la Caraïbe.',
  },
  {
    q: 'Quels sont les délais de traitement ?',
    a: 'Une demande standard est qualifiée sous 24h. Les premiers devis arrivent sous 48-72h ouvrées. Pour les urgences, notre option "Sourcing express" garantit une réponse en 24h.',
  },
  {
    q: 'Y a-t-il des frais pour une demande de sourcing ?',
    a: 'La demande de sourcing et les devis sont totalement gratuits. Vous ne payez qu\'au moment de valider votre commande. Aucun engagement, aucun frais caché.',
  },
  {
    q: 'Livrez-vous dans toute la Caraïbe ?',
    a: 'Oui ! Nous couvrons la Martinique, la Guadeloupe, la Guyane, Saint-Martin, Saint-Barthélemy et les autres îles de la Caraïbe. Transport maritime, aérien ou point relais selon votre besoin.',
  },
  {
    q: 'Puis-je suivre l\'avancement de ma demande ?',
    a: 'Absolument. Chaque dossier reçoit un identifiant unique et vous pouvez suivre son évolution à tout moment via votre espace dédié ou directement par WhatsApp avec votre chargé de suivi.',
  },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*Message depuis le formulaire Ikabay*%0A%0ANom: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0ATéléphone: ${encodeURIComponent(form.phone)}%0ASujet: ${encodeURIComponent(form.subject)}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(`${WHATSAPP_URL}?text=${msg}`, '_blank');
  };

  return (
    <section className="pageSection">
      {/* ─── HEADER ─── */}
      <div style={{ marginBottom: 32 }}>
        <div className="badge" style={{ marginBottom: 12 }}>Contact</div>
        <h1>Contactez-nous</h1>
        <p>Une question, un projet ? Notre équipe vous répond sous 24h ouvrées.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
        marginBottom: 36
      }}>
        {/* ─── LEFT — INFO + FORM ─── */}
        <div>
          {/* Company info cards */}
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(16,32,34,0.1)',
            borderRadius: 24,
            padding: 24,
            marginBottom: 20,
            boxShadow: '0 18px 50px rgba(26,72,70,0.09)'
          }}>
            <h3 style={{ fontSize: 18, margin: '0 0 16px', color: '#0a4a5c' }}>{APP_NAME}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MapPin size={18} color="#0f766e" />
                <span style={{ fontWeight: 600, fontSize: 14 }}>Martinique, Caraïbe</span>
              </div>
              <a href={`mailto:${APP_EMAIL}`}
                style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#102022', textDecoration: 'none' }}>
                <Mail size={18} color="#0f766e" />
                <span style={{ fontWeight: 600, fontSize: 14 }}>{APP_EMAIL}</span>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#102022', textDecoration: 'none' }}>
                <MessageCircle size={18} color="#25d366" />
                <span style={{ fontWeight: 600, fontSize: 14 }}>WhatsApp Business — réponse rapide</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Clock size={18} color="#0f766e" />
                <span style={{ fontWeight: 600, fontSize: 14 }}>Lun-Ven 8h-18h | Sam 9h-13h (AST)</span>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#25d366', color: 'white', border: 0, borderRadius: 16,
                padding: '14px 20px', fontWeight: 800, fontSize: 15, textDecoration: 'none',
                marginTop: 18, boxShadow: '0 8px 24px rgba(37,211,102,0.3)'
              }}
            >
              <MessageCircle size={20} /> Ouvrir WhatsApp Business
            </a>
          </div>

          {/* Contact form */}
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(16,32,34,0.1)',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 18px 50px rgba(26,72,70,0.09)'
          }}>
            <h3 style={{ fontSize: 18, margin: '0 0 16px', color: '#0a4a5c' }}>Formulaire de contact</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                    Nom complet <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input required value={form.name} onChange={handleChange('name')}
                    placeholder="Votre nom"
                    style={{ width: '100%', minHeight: 46, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                      padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                    Email <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input required type="email" value={form.email} onChange={handleChange('email')}
                    placeholder="vous@exemple.fr"
                    style={{ width: '100%', minHeight: 46, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                      padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                    Téléphone
                  </label>
                  <input type="tel" value={form.phone} onChange={handleChange('phone')}
                    placeholder="+596 6XX XX XX XX"
                    style={{ width: '100%', minHeight: 46, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                      padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                    Sujet <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input required value={form.subject} onChange={handleChange('subject')}
                    placeholder="Objet de votre message"
                    style={{ width: '100%', minHeight: 46, borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                      padding: '0 14px', background: 'white', outline: 'none', fontWeight: 600, fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: 13, color: '#435956', marginBottom: 4 }}>
                    Message <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <textarea required value={form.message} onChange={handleChange('message')}
                    placeholder="Votre message..."
                    rows={4}
                    style={{ width: '100%', borderRadius: 14, border: '1px solid rgba(16,32,34,0.13)',
                      padding: '10px 14px', background: 'white', outline: 'none', fontWeight: 600,
                      fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>
              </div>
              <button type="submit"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', background: '#f97316', color: 'white', border: 0, borderRadius: 16,
                  padding: '14px 20px', fontWeight: 800, fontSize: 16, cursor: 'pointer',
                  boxShadow: '0 12px 32px rgba(249,115,22,0.28)'
                }}
              >
                <Send size={18} /> Envoyer le message
              </button>
            </form>
          </div>
        </div>

        {/* ─── RIGHT — MAP + FAQ ─── */}
        <div>
          {/* Map placeholder */}
          <div style={{
            background: 'linear-gradient(135deg, #d0e8e4, #e7fbf7)',
            borderRadius: 24, padding: 48, textAlign: 'center', marginBottom: 20,
            border: '1px solid rgba(15,118,110,0.2)',
            boxShadow: '0 18px 50px rgba(26,72,70,0.09)',
            minHeight: 240,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <MapPin size={48} color="#0f766e" style={{ marginBottom: 12 }} />
            <h3 style={{ margin: '0 0 4px', color: '#0a4a5c', fontSize: 20 }}>Martinique, Caraïbe</h3>
            <p style={{ color: '#516866', fontSize: 14, margin: 0, maxWidth: 280 }}>
              Ikabay Sourcing — Antilles françaises<br />
              Couverture : Martinique, Guadeloupe, Guyane, Saint-Martin
            </p>
            <div style={{
              marginTop: 16, padding: '8px 16px', background: 'rgba(255,255,255,0.7)',
              borderRadius: 12, fontSize: 13, color: '#60716f', fontWeight: 600
            }}>
              🗺️ Carte interactive à intégrer
            </div>
          </div>

          {/* FAQ */}
          <div style={{
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(16,32,34,0.1)',
            borderRadius: 24, padding: 24,
            boxShadow: '0 18px 50px rgba(26,72,70,0.09)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <HelpCircle size={22} color="#0f766e" />
              <h3 style={{ fontSize: 18, margin: 0, color: '#0a4a5c' }}>Questions fréquentes</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{
                  border: '1px solid rgba(16,32,34,0.08)',
                  borderRadius: 16, overflow: 'hidden'
                }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: 10, padding: '14px 16px', background: openFaq === i ? '#f4fdfa' : 'white',
                      border: 0, cursor: 'pointer', textAlign: 'left', fontWeight: 700,
                      fontSize: 14, color: '#102022', fontFamily: 'inherit'
                    }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={18} color="#0f766e" /> : <ChevronDown size={18} color="#60716f" />}
                  </button>
                  {openFaq === i && (
                    <div style={{
                      padding: '0 16px 14px', fontSize: 14, color: '#516866',
                      lineHeight: 1.6, borderTop: '1px solid rgba(16,32,34,0.06)',
                      paddingTop: 10
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;