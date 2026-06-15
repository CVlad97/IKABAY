import { useState, useCallback } from 'react';
import {
  Send, FileText, Copy, Mail, Settings, Clock,
  CheckCircle, AlertCircle, Archive
} from 'lucide-react';

const SOURCING_EMAIL = 'sourcing@ikabay.store';

const statusList = [
  { id: 'brouillon', label: 'Brouillon', icon: Clock, color: '#92400e', bg: '#fef3c7' },
  { id: 'pret', label: 'Prêt à envoyer', icon: FileText, color: '#166534', bg: '#dcfce7' },
  { id: 'envoye', label: 'Envoyé', icon: Send, color: '#1e40af', bg: '#dbeafe' },
  { id: 'relance', label: 'Relance nécessaire', icon: AlertCircle, color: '#9a3412', bg: '#fff7ed' },
  { id: 'repondu', label: 'Répondu', icon: CheckCircle, color: '#0f766e', bg: '#f0fdf4' },
  { id: 'archive', label: 'Archivé', icon: Archive, color: '#4b5563', bg: '#f3f4f6' },
];

const templates = [
  {
    id: 'prix-fournisseur',
    title: 'Demande de prix fournisseur',
    subject: 'Demande de prix — Ikabay Sourcing — [Produit/Référence]',
    body: `Bonjour,

Nous sommes Ikabay Sourcing, spécialiste en approvisionnement et sourcing de produits nautiques et accessoires maritimes.

Nous souhaitons obtenir votre meilleur tarif pour les produits suivants :

1. [Produit 1] — Quantité : [XX]
2. [Produit 2] — Quantité : [XX]
3. [Produit 3] — Quantité : [XX]

Merci de nous communiquer :
- Prix unitaire HT
- Délais de livraison
- Conditions de paiement
- Disponibilité

Dans l'attente de votre retour, cordialement.`,
  },
  {
    id: 'relance-fournisseur',
    title: 'Relance fournisseur',
    subject: 'Relance — Demande de prix — Ikabay Sourcing',
    body: `Bonjour,

Je me permets de faire suite à ma précédente demande de prix du [Date].

Avez-vous eu l'occasion de l'étudier ? Nous sommes toujours intéressés par vos produits et prêts à passer commande.

Merci de me tenir informé dès que possible.

Cordialement.`,
  },
  {
    id: 'devis-client',
    title: 'Envoi devis client',
    subject: 'Devis — Ikabay Sourcing — [Produit]',
    body: `Bonjour [Client],

Nous vous remercions de votre intérêt pour nos produits.

Suite à votre demande, veuillez trouver ci-joint notre devis pour :

[Description des articles / prestations]

Total HT : [Montant]
Délai de livraison estimé : [Date]
Validité de l'offre : 15 jours

Restant à votre disposition pour toute question.

Cordialement,
Ikabay Sourcing`,
  },
  {
    id: 'confirmation-commande',
    title: 'Confirmation commande',
    subject: 'Confirmation de commande — Ikabay Sourcing — [Réf Commande]',
    body: `Bonjour [Client],

Nous avons le plaisir de vous confirmer votre commande n°[Réf Commande].

Récapitulatif :
- [Article 1] — Qté : [X] — [Prix]
- [Article 2] — Qté : [X] — [Prix]

Total TTC : [Montant]
Livraison prévue le : [Date]

Vous recevrez un email de suivi dès l'expédition.

Merci de votre confiance !
Cordialement,
Ikabay Sourcing`,
  },
  {
    id: 'suivi-transport',
    title: 'Suivi transport',
    subject: 'Suivi d\'expédition — Ikabay Sourcing — [Réf Commande]',
    body: `Bonjour [Client],

Votre commande a bien été expédiée !

Transporteur : [Nom du transporteur]
Numéro de suivi : [Tracking Number]
Date d'expédition : [Date]
Livraison estimée : [Date]

Lien de suivi : [URL de suivi]

N'hésitez pas à nous contacter pour toute question.

Cordialement,
Ikabay Sourcing`,
  },
  {
    id: 'disponibilite-produit',
    title: 'Demande disponibilité produit',
    subject: 'Disponibilité produit — Ikabay Sourcing — [Produit/Référence]',
    body: `Bonjour,

Nous sommes intéressés par le(s) produit(s) suivant(s) et souhaiterions connaître leur disponibilité actuelle :

1. [Référence 1] — [Désignation] — Qté souhaitée : [XX]
2. [Référence 2] — [Désignation] — Qté souhaitée : [XX]

Merci de nous indiquer :
- Stock disponible
- Délai de réapprovisionnement si rupture
- Prix unitaire

Dans l'attente de votre retour.

Cordialement,
Ikabay Sourcing`,
  },
  {
    id: 'tarif-transport',
    title: 'Demande tarif transport',
    subject: 'Demande de tarif transport — Ikabay Sourcing',
    body: `Bonjour,

Nous souhaiterions obtenir un devis pour l'expédition suivante :

Origine : [Ville, Pays]
Destination : [Ville, Pays]
Type de marchandise : [Accessoires nautiques / Équipements maritimes]
Poids estimé : [XX] kg
Volume : [XX] m³
Mode de transport souhaité : [Mer / Air / Route]
Délai souhaité : [Date]

Merci de nous faire parvenir votre meilleure offre.

Cordialement,
Ikabay Sourcing`,
  },
];

const rfqExample = {
  subject: 'Demande de prix — Ikabay Sourcing — Accessoires nautiques',
  body: `Bonjour,

Je vous contacte pour une demande de prix concernant des accessoires nautiques pour notre activité de sourcing et d'approvisionnement.

Nous recherchons des fournisseurs fiables pour les catégories suivantes :
- Accastillage et quincaillerie marine
- Équipements de sécurité (gilets, fusées)
- Cordages et amarres
- Pièces détachées moteurs hors-bord

Pourriez-vous nous faire parvenir votre catalogue et vos tarifs détaillés ? Nous sommes également intéressés par vos conditions générales de vente et délais de livraison.

Dans l'attente de votre retour, nous vous remercions par avance.

Cordialement,`,
  signature: 'Ikabay Sourcing / sourcing@ikabay.store',
};

export function RfqPage() {
  const [activeStatus, setActiveStatus] = useState('all');
  const [copyId, setCopyId] = useState(null);

  const getFullEmail = useCallback((tpl) => {
    return `Objet : ${tpl.subject}

${tpl.body}

--
${rfqExample.signature}`;
  }, []);

  const handleCopy = useCallback(async (tpl) => {
    const text = getFullEmail(tpl);
    try {
      await navigator.clipboard.writeText(text);
      setCopyId(tpl.id);
      setTimeout(() => setCopyId(null), 2000);
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyId(tpl.id);
      setTimeout(() => setCopyId(null), 2000);
    }
  }, [getFullEmail]);

  const handleCopyExample = useCallback(async () => {
    const text = `Objet : ${rfqExample.subject}

${rfqExample.body}

--
${rfqExample.signature}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyId('example');
      setTimeout(() => setCopyId(null), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyId('example');
      setTimeout(() => setCopyId(null), 2000);
    }
  }, []);

  return (
    <section className="pageSection">
      {/* BADGE + TITLE */}
      <div className="badge" style={{ marginBottom: 12 }}>
        <Mail size={14} style={{ marginRight: 6 }} />
        RFQ &amp; Emails
      </div>
      <h1>Demandes de prix &amp; Emails</h1>
      <p style={{ marginBottom: 28 }}>
        Templates email prêts à copier pour vos échanges fournisseurs et clients.
        Expéditeur unique : {SOURCING_EMAIL}
      </p>

      {/* ── STATUS FILTERS ── */}
      <div
        style={{
          display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28,
        }}
      >
        <button
          onClick={() => setActiveStatus('all')}
          className={activeStatus === 'all' ? 'btn btnPrimary' : 'btn btnSecondary'}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            minHeight: 42, borderRadius: 14, padding: '10px 16px',
            fontWeight: 800, fontSize: 13, border: 0, cursor: 'pointer',
            background: activeStatus === 'all' ? '#0f766e' : 'white',
            color: activeStatus === 'all' ? 'white' : '#435956',
            border: activeStatus === 'all' ? 'none' : '1px solid rgba(16,32,34,0.13)',
          }}
        >
          <Mail size={14} /> Tous
        </button>
        {statusList.map((s) => {
          const Icon = s.icon;
          const isActive = activeStatus === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStatus(s.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                minHeight: 42, borderRadius: 14, padding: '10px 16px',
                fontWeight: 800, fontSize: 13, border: 0, cursor: 'pointer',
                background: isActive ? s.color : s.bg,
                color: isActive ? 'white' : s.color,
                border: isActive ? 'none' : '1px solid rgba(16,32,34,0.08)',
              }}
            >
              <Icon size={14} /> {s.label}
            </button>
          );
        })}
      </div>

      {/* ── TEMPLATES GRID ── */}
      <div
        className="cardGrid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 16,
          marginBottom: 48,
        }}
      >
        {templates.map((tpl) => {
          const iconColor = '#0f766e';
          return (
            <div key={tpl.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: '#e7fbf7', display: 'grid',
                    placeItems: 'center', color: iconColor, flexShrink: 0,
                  }}
                >
                  <Mail size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 17, marginBottom: 4, lineHeight: 1.2 }}>
                    {tpl.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 12, color: '#516866', margin: 0,
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tpl.subject}
                  </p>
                </div>
              </div>

              {/* Email preview */}
              <div
                style={{
                  background: '#f8faf9', borderRadius: 12, padding: 14,
                  flex: 1, marginBottom: 14,
                }}
              >
                <p style={{ fontSize: 12, fontWeight: 700, color: '#435956', margin: '0 0 6px' }}>
                  <FileText size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  Aperçu
                </p>
                <p
                  style={{
                    fontSize: 13, color: '#34514f', lineHeight: 1.5, margin: 0,
                    display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {tpl.body}
                </p>
              </div>

              {/* Copy button */}
              <button
                onClick={() => handleCopy(tpl)}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  gap: 8, width: '100%', minHeight: 46, borderRadius: 14,
                  fontWeight: 800, fontSize: 14, border: 0, cursor: 'pointer',
                  background: copyId === tpl.id ? '#dcfce7' : '#0f766e',
                  color: copyId === tpl.id ? '#166534' : 'white',
                  transition: 'all 0.2s',
                }}
              >
                {copyId === tpl.id ? (
                  <><CheckCircle size={18} /> Copié !</>
                ) : (
                  <><Copy size={18} /> Copier l'email</>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── RFQ EXAMPLE ── */}
      <div
        className="card"
        style={{
          marginBottom: 48, padding: 0, overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #0a4a5c, #0f766e)',
            padding: '20px 24px', color: 'white',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <FileText size={20} />
            <h3 style={{ fontSize: 18, color: 'white' }}>Exemple RFQ complet</h3>
          </div>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>
            Modèle prêt à envoyer — expéditeur : {SOURCING_EMAIL}
          </p>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#60716f' }}>Objet :</span>
            <p style={{ fontSize: 15, fontWeight: 600, margin: '4px 0 0', color: '#102022' }}>
              {rfqExample.subject}
            </p>
          </div>

          <div
            style={{
              background: '#f8faf9', borderRadius: 12, padding: 16, marginBottom: 16,
            }}
          >
            <pre
              style={{
                fontFamily: 'inherit', fontSize: 14, lineHeight: 1.6,
                color: '#34514f', margin: 0, whiteSpace: 'pre-wrap',
              }}
            >
              {rfqExample.body}
            </pre>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(16,32,34,0.08)', paddingTop: 14, marginBottom: 18,
            }}
          >
            <p style={{ fontSize: 14, color: '#516866', margin: 0 }}>
              --<br />
              {rfqExample.signature}
            </p>
          </div>

          <button
            onClick={handleCopyExample}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, minHeight: 46, borderRadius: 14, padding: '12px 24px',
              fontWeight: 800, fontSize: 14, border: 0, cursor: 'pointer',
              background: copyId === 'example' ? '#dcfce7' : '#0f766e',
              color: copyId === 'example' ? '#166534' : 'white',
              transition: 'all 0.2s',
            }}
          >
            {copyId === 'example' ? (
              <><CheckCircle size={18} /> Copié !</>
            ) : (
              <><Copy size={18} /> Copier l'exemple RFQ</>
            )}
          </button>
        </div>
      </div>

      {/* ── SMTP CONFIG ── */}
      <div className="card" style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: 14,
              background: '#e7fbf7', display: 'grid',
              placeItems: 'center', color: '#0f766e',
            }}
          >
            <Settings size={22} />
          </div>
          <h3 style={{ fontSize: 18 }}>Configuration SMTP</h3>
        </div>

        <p style={{ fontSize: 14, color: '#516866', marginBottom: 16, lineHeight: 1.5 }}>
          Ces variables d'environnement sont utilisées pour l'envoi des emails depuis
          l'application. Aucun mot de passe n'est affiché ici pour des raisons de sécurité.
        </p>

        <div
          style={{
            background: '#1e293b', borderRadius: 12, padding: 16,
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
            fontSize: 13, lineHeight: 1.8, color: '#e2e8f0',
          }}
        >
          <div>
            <span style={{ color: '#94a3b8' }}>IKABAY_EMAIL_USER</span>
            <span style={{ color: '#64748b' }}>=</span>
            <span style={{ color: '#a5f3fc' }}>{SOURCING_EMAIL}</span>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>IKABAY_SMTP_HOST</span>
            <span style={{ color: '#64748b' }}>=</span>
            <span style={{ color: '#a5f3fc' }}>smtp.hostinger.com</span>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>IKABAY_EMAIL_PASSWORD</span>
            <span style={{ color: '#64748b' }}>=</span>
            <span style={{ color: '#fbbf24' }}>&nbsp;(à configurer dans .env)</span>
          </div>
          <div>
            <span style={{ color: '#94a3b8' }}>IKABAY_SMTP_PORT</span>
            <span style={{ color: '#64748b' }}>=</span>
            <span style={{ color: '#a5f3fc' }}>465</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 14, padding: 12, borderRadius: 12,
            background: '#fef3c7', display: 'flex', alignItems: 'flex-start', gap: 10,
          }}
        >
          <AlertCircle size={18} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ margin: 0, fontSize: 13, color: '#92400e', lineHeight: 1.4 }}>
            <strong>Sécurité :</strong> Le mot de passe SMTP n'est <strong>jamais</strong> stocké
            dans le code source. Configurez-le uniquement dans le fichier <code>.env</code> à la
            racine du projet.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RfqPage;