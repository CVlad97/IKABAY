import { useState } from 'react';
import { Anchor, Building2, CheckCircle, MessageCircle, Package, Send, Ship, Truck, Users } from 'lucide-react';
import { supabase, hasSupabaseConfig } from '../lib/supabase';
import { waMessage } from '../utils/constants';

const partnerTypes = [
  { value: 'vendeur', label: 'Vendeur / producteur', icon: Package, text: 'Publier vos produits et recevoir des demandes qualifiées.' },
  { value: 'transporteur', label: 'Transporteur / relais', icon: Truck, text: 'Proposer des solutions de retrait, aérien ou maritime.' },
  { value: 'fournisseur', label: 'Fournisseur B2B', icon: Building2, text: 'Répondre aux demandes de sourcing et de devis.' },
];

export default function PartnersPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: 'vendeur', description: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus('');
    const message = `Bonjour Ikabay, je souhaite devenir partenaire.\n\nNom : ${form.name}\nEntreprise : ${form.company || 'Non renseignée'}\nType : ${form.type}\nEmail : ${form.email}\nTéléphone : ${form.phone}\nDescription : ${form.description}`;
    try {
      if (!hasSupabaseConfig || !supabase) {
        window.open(waMessage(message), '_blank', 'noopener,noreferrer');
        setStatus('WhatsApp est ouvert. Aucun enregistrement serveur n’est disponible pour le moment.');
        return;
      }

      const payload = {
        full_name: form.name,
        phone: form.phone,
        email: form.email,
        subject: `Candidature partenaire — ${form.type}`,
        message: `${message}\nEntreprise : ${form.company || 'Non renseignée'}`,
        source: 'partenaires-web',
        privacy_consent: true,
        metadata: { partner_type: form.type, company: form.company },
      };
      const { error } = await supabase.from('leads').insert(payload);
      if (error) throw error;

      window.open(waMessage(message), '_blank', 'noopener,noreferrer');
      setStatus('Votre candidature a été enregistrée. WhatsApp est ouvert pour finaliser l’échange.');
      setForm({ name: '', company: '', email: '', phone: '', type: 'vendeur', description: '' });
    } catch (error) {
      console.error('Candidature partenaire non enregistrée :', error);
      window.open(waMessage(message), '_blank', 'noopener,noreferrer');
      setStatus('WhatsApp est ouvert, mais l’enregistrement serveur a échoué. Ne considérez pas la demande comme enregistrée.');
    } finally {
      setSending(false);
    }
  };

  return <section className="pageSection">
    <div className="hero" style={{ marginBottom: 32 }}>
      <span className="badge"><Ship size={15} /> Réseau Ikabay</span>
      <h1>Devenir partenaire</h1>
      <p>Vendeurs, producteurs, fournisseurs et acteurs du transport : construisons une offre fiable pour la Martinique et la Caraïbe.</p>
      <div className="heroActions">
        <a className="primary" href="#candidature">Proposer mon activité <Send size={17} /></a>
        <a className="secondary" href={waMessage('Bonjour Ikabay, je souhaite échanger sur un partenariat.')}>Échanger sur WhatsApp <MessageCircle size={17} /></a>
      </div>
    </div>

    <div className="cards" style={{ marginBottom: 32 }}>
      {partnerTypes.map(({ value, label, icon: Icon, text }) => <div className="card" key={value}>
        <div className="icon"><Icon size={23} /></div><h3 style={{ marginTop: 14 }}>{label}</h3><p className="description">{text}</p>
      </div>)}
    </div>

    <div id="candidature" className="card" style={{ maxWidth: 760, margin: '0 auto' }}>
      <h2 style={{ fontSize: 34, marginBottom: 8 }}>Candidature rapide</h2>
      <p style={{ color: '#516866', lineHeight: 1.5 }}>Les informations servent à qualifier le partenariat. Aucun paiement ni engagement automatique n’est déclenché.</p>
      <form onSubmit={submit} style={{ display: 'grid', gap: 14, marginTop: 20 }}>
        <div className="formGrid">
          <label>Nom complet *<input className="input" required value={form.name} onChange={update('name')} /></label>
          <label>Entreprise / activité<input className="input" value={form.company} onChange={update('company')} /></label>
          <label>Email *<input className="input" required type="email" value={form.email} onChange={update('email')} /></label>
          <label>Téléphone / WhatsApp *<input className="input" required type="tel" value={form.phone} onChange={update('phone')} /></label>
        </div>
        <label>Type de partenariat<select className="select" value={form.type} onChange={update('type')}>{partnerTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label>Décrivez votre offre<textarea className="textArea" required rows={5} value={form.description} onChange={update('description')} placeholder="Produits, zones desservies, capacités, délais, site ou catalogue…" /></label>
        <button className="btn btnPrimary" disabled={sending} type="submit"><Send size={18} /> {sending ? 'Envoi…' : 'Envoyer ma candidature'}</button>
        {status && <p style={{ color: '#166534', background: '#dcfce7', borderRadius: 12, padding: 14, fontWeight: 700, display: 'flex', gap: 8, alignItems: 'center' }}><CheckCircle size={18} /> {status}</p>}
      </form>
    </div>
  </section>;
}
