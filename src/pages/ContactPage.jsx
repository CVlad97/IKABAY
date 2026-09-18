import { useState } from 'react';
import {
  Mail, MessageCircle, Phone, MapPin, Clock,
  ChevronDown, ChevronUp, Send, ArrowRight, CheckCircle, AlertCircle, HelpCircle
} from 'lucide-react';
import { WHATSAPP_URL, APP_NAME, APP_EMAIL, waMessage } from '../utils/constants';
import { supabase, hasSupabaseConfig } from '../lib/supabase';

const faqs = [
  {
    q: 'Comment fonctionne le sourcing IKABAY ?',
    a: 'Vous décrivez votre besoin par le formulaire ou WhatsApp. IKABAY qualifie la demande, recherche des fournisseurs adaptés et vous transmet les options disponibles avec les conditions connues au moment du devis.',
  },
  {
    q: 'Quels types de produits pouvez-vous sourcer ?',
    a: 'Le catalogue actuel est orienté nautisme, pièces et équipements techniques. D’autres familles de produits peuvent être étudiées au cas par cas selon la disponibilité des fournisseurs.',
  },
  {
    q: 'Quels sont les délais de traitement ?',
    a: 'Le délai dépend du produit, du fournisseur, du transport et de la destination. Un délai estimatif est communiqué avec chaque proposition lorsqu’il est disponible.',
  },
  {
    q: 'La demande de devis engage-t-elle un paiement ?',
    a: 'Non. Une demande de devis ou de sourcing n’entraîne pas automatiquement un paiement. Les conditions commerciales sont confirmées avant toute validation de commande.',
  },
  {
    q: 'Livrez-vous dans toute la Caraïbe ?',
    a: 'IKABAY est basé en Martinique. Les possibilités de livraison vers d’autres territoires de la Caraïbe sont étudiées selon le produit, le transporteur et les contraintes douanières applicables.',
  },
  {
    q: 'Comment suivre une demande ?',
    a: 'Le suivi commercial se fait actuellement principalement par WhatsApp et email. Les espaces automatisés de suivi ne sont pas présentés comme disponibles tant qu’ils ne sont pas activés.',
  },
]

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', telephone: '', subject: '', message: '' });
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
      // Save to Supabase
      if (hasSupabaseConfig && supabase) {
        const { error: dbError } = await supabase
          .from('contact_messages')
          .insert({
            name: form.name,
            email: form.email,
            telephone: form.telephone,
            subject: form.subject,
            message: form.message,
            status: 'nouveau',
            notified: false,
          });
        if (dbError && !dbError.message?.includes('does not exist')) {
          console.warn('Supabase:', dbError.message);
        }
      }

      // WhatsApp notification
      const msg = `*NOUVEAU MESSAGE CONTACT*\n\n` +
        `👤 ${form.name}\\n📧 ${form.email}\\n📞 ${form.telephone}\\n📝 ${form.subject}\\n${form.message}`;
      window.location.assign(waMessage(msg));

      setSubmitted(true);
      setForm({ name: '', email: '', telephone: '', subject: '', message: '' });
    } catch (e) {
      setError("Erreur lors de l'envoi. Contactez-nous sur WhatsApp.");
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pageSection">
      {/* ─── HEADER ─── */}
      <div style={{ marginBottom: 32 }}>
        <div className="badge" style={{ marginBottom: 12 }}>Contact</div>
        <h1>Contactez-nous</h1>
        <p>Une question, un projet ? Contactez IKABAY par WhatsApp ou email pour qualifier votre besoin.</p>
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
                <span style={{ fontWeight: 600, fontSize: 14 }}>Canaux principaux : WhatsApp et email</span>
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
                  <input type="tel" value={form.telephone} onChange={handleChange('telephone')}
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
              {submitted && (
                <div style={{
                  width: '100%', padding: 16, borderRadius: 14,
                  background: '#dcfce7', color: '#166534',
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontWeight: 700, fontSize: 14
                }}>
                  <CheckCircle size={20} />
                  WhatsApp est ouvert avec votre message préparé. Envoyez-le pour finaliser la prise de contact.
                </div>
              )}
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
              <button type="submit" disabled={submitting}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', background: submitting ? '#bccfcc' : '#f97316', color: 'white', border: 0, borderRadius: 16,
                  padding: '14px 20px', fontWeight: 800, fontSize: 16, cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 12px 32px rgba(249,115,22,0.28)'
                }}
              >
                <Send size={18} /> {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
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
              IKABAY — basé en Martinique<br />
              Livraison Caraïbe étudiée selon produit et destination
            </p>
            <div style={{
              marginTop: 16, padding: '8px 16px', background: 'rgba(255,255,255,0.7)',
              borderRadius: 12, fontSize: 13, color: '#60716f', fontWeight: 600
            }}>
              Zone de livraison confirmée au devis
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
