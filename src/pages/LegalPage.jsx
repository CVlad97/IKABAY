import { Building2, FileText, Info, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { APP_EMAIL, waMessage } from '../utils/constants';

const infoRows = [
  ['Nom commercial', 'IKABAY Sourcing'],
  ['Exploitant', 'Vladimir Steeve CLAVEAU — entrepreneur individuel'],
  ['SIREN', '103 128 716'],
  ['Établissement principal', 'Fourgainville, 97211 Rivière-Pilote, Martinique'],
  ['Contact', APP_EMAIL],
  ['Site', 'https://ikabay.store'],
];

const commercialRules = [
  'Le site public présente un catalogue, des services de sourcing et des moyens de demander un devis.',
  'Une demande envoyée depuis le site ne constitue pas une commande payée ni une acceptation automatique.',
  'Le prix final, le stock, le délai, le transport, les taxes et les conditions sont confirmés avant validation.',
  'Aucun paiement en ligne n’est activé dans la version publique actuelle.',
  'Les pages de démonstration, dossiers clients et outils d’administration ne font pas partie du site commercial public.',
];

const privacyRules = [
  'Les informations saisies servent uniquement à traiter la demande commerciale correspondante.',
  'La version publique actuelle privilégie WhatsApp et l’email pour la prise de contact.',
  'Ne transmettez pas de mot de passe, clé API, numéro complet de carte bancaire ou autre secret dans les formulaires.',
  'Pour une demande d’accès, de rectification ou de suppression liée à vos échanges avec IKABAY, utilisez l’adresse de contact ci-dessous.',
];

export default function LegalPage() {
  return (
    <section className="pageSection">
      <div style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
        borderRadius: 24, padding: '32px 40px', marginBottom: 28, color: 'white'
      }}>
        <div className="badge" style={{ background: 'rgba(255,255,255,.18)', marginBottom: 12 }}>
          <ShieldCheck size={15} /> Informations commerciales
        </div>
        <h1 style={{ color: 'white', margin: 0, fontSize: 'clamp(28px,5vw,44px)' }}>
          Informations éditeur & fonctionnement du site
        </h1>
        <p style={{ color: 'rgba(255,255,255,.88)', maxWidth: 780, lineHeight: 1.6 }}>
          IKABAY est actuellement exploité comme site de sourcing et de mise en relation commerciale.
          Les conditions applicables à une vente sont confirmées au devis avant tout engagement.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 18 }}>
        <article className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 24, display: 'flex', gap: 9, alignItems: 'center' }}>
            <Building2 size={22} /> Éditeur
          </h2>
          <div style={{ display: 'grid', gap: 11 }}>
            {infoRows.map(([label, value]) => (
              <div key={label} style={{ borderBottom: '1px solid #e8f0ee', paddingBottom: 10 }}>
                <div style={{ color: '#60716f', fontSize: 12, fontWeight: 700 }}>{label}</div>
                <div style={{ color: '#1a2e2b', fontWeight: 700, marginTop: 2 }}>{value}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 24, display: 'flex', gap: 9, alignItems: 'center' }}>
            <FileText size={22} /> Parcours commercial
          </h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {commercialRules.map((item) => (
              <div key={item} style={{ display: 'flex', gap: 9, color: '#435956', lineHeight: 1.55 }}>
                <Info size={17} color="#0f766e" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="card" style={{ padding: 24, marginTop: 18 }}>
        <h2 style={{ fontSize: 24, display: 'flex', gap: 9, alignItems: 'center' }}>
          <ShieldCheck size={22} /> Données & confidentialité
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {privacyRules.map((item) => (
            <div key={item} style={{ display: 'flex', gap: 9, color: '#435956', lineHeight: 1.55 }}>
              <Info size={17} color="#0f766e" style={{ flexShrink: 0, marginTop: 3 }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </article>

      <div style={{
        marginTop: 18, padding: 20, borderRadius: 16,
        background: '#fff7ed', border: '1px solid #fed7aa', color: '#9a3412'
      }}>
        <strong>Fiscalité et transport :</strong> les taux, frais, droits et délais dépendent notamment du produit,
        de son origine, de sa destination et du transport retenu. Le devis confirmé fait foi pour la proposition IKABAY.
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
        <a className="btn btnPrimary" href={`mailto:${APP_EMAIL}`}>
          <Mail size={18} /> {APP_EMAIL}
        </a>
        <a
          className="btn btnSecondary"
          href={waMessage('Bonjour IKABAY, je souhaite vous contacter au sujet des informations du site.')}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} /> WhatsApp
        </a>
      </div>
    </section>
  );
}
