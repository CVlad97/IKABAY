import { useState, useCallback } from 'react';
import {
  Send, FileText, Copy, Mail, Settings, Clock,
  CheckCircle, AlertCircle, Archive, MessageCircle
} from 'lucide-react';

const SOURCING_EMAIL = 'contactcvs@ikabay.store';

const statusList = [
  { id: 'brouillon', label: 'Brouillon', icon: Clock, color: '#92400e', bg: '#fef3c7' },
  { id: 'pret', label: 'Prêt à envoyer', icon: FileText, color: '#166534', bg: '#dcfce7' },
  { id: 'envoye', label: 'Envoyé', icon: Send, color: '#1e40af', bg: '#dbeafe' },
  { id: 'relance', label: 'Relance nécessaire', icon: AlertCircle, color: '#9a3412', bg: '#fff7ed' },
  { id: 'repondu', label: 'Répondu', icon: CheckCircle, color: '#0f766e', bg: '#f0fdf4' },
  { id: 'archive', label: 'Archivé', icon: Archive, color: '#4b5563', bg: '#f3f4f6' },
];

const templates = [
  // ─── TEMPLATES STANDARDS IKABAY ───
  {
    id: 'prix-fournisseur',
    title: 'Demande de prix fournisseur',
    subject: 'Demande de prix — Ikabay Sourcing — [Produit/Référence]',
    body: `Bonjour,

Nous sommes Ikabay Sourcing, specialiste en approvisionnement et sourcing de produits nautiques et accessoires maritimes.

Nous souhaitons obtenir votre meilleur tarif pour les produits suivants :

1. [Produit 1] — Quantite : [XX]
2. [Produit 2] — Quantite : [XX]
3. [Produit 3] — Quantite : [XX]

Merci de nous communiquer :
- Prix unitaire HT
- Delais de livraison
- Conditions de paiement
- Disponibilite

Dans l'attente de votre retour, cordialement.` },
  {
    id: 'relance-fournisseur',
    title: 'Relance fournisseur',
    subject: 'Relance — Demande de prix — Ikabay Sourcing',
    body: `Bonjour,

Je me permets de faire suite a ma precedente demande de prix du [Date].

Avez-vous eu l'occasion de l'etudier ? Nous sommes toujours interesses par vos produits et prets a passer commande.

Merci de me tenir informe des que possible.

Cordialement.` },
  {
    id: 'devis-client',
    title: 'Envoi devis client',
    subject: 'Devis — Ikabay Sourcing — [Produit]',
    body: `Bonjour [Client],

Nous vous remercions de votre interet pour nos produits.

Suite a votre demande, veuillez trouver ci-joint notre devis pour :

[Description des articles / prestations]

Total HT : [Montant]
Delai de livraison estime : [Date]
Validite de l'offre : 15 jours

Restant a votre disposition pour toute question.

Cordialement,
Ikabay Sourcing` },
  {
    id: 'confirmation-commande',
    title: 'Confirmation commande',
    subject: 'Confirmation de commande — Ikabay Sourcing — [Ref Commande]',
    body: `Bonjour [Client],

Nous avons le plaisir de vous confirmer votre commande n°[Ref Commande].

Recapitulatif :
- [Article 1] — Qte : [X] — [Prix]
- [Article 2] — Qte : [X] — [Prix]

Total TTC : [Montant]
Livraison prevue le : [Date]

Vous recevrez un email de suivi des l'expedition.

Merci de votre confiance !
Cordialement,
Ikabay Sourcing` },
  {
    id: 'suivi-transport',
    title: 'Suivi transport',
    subject: "Suivi d'expedition — Ikabay Sourcing — [Ref Commande]",
    body: `Bonjour [Client],

Votre commande a bien ete expediee !

Transporteur : [Nom du transporteur]
Numero de suivi : [Tracking Number]
Date d'expedition : [Date]
Livraison estimee : [Date]

Lien de suivi : [URL de suivi]

N'hesitez pas a nous contacter pour toute question.

Cordialement,
Ikabay Sourcing` },
  {
    id: 'disponibilite-produit',
    title: 'Demande disponibilite produit',
    subject: 'Disponibilite produit — Ikabay Sourcing — [Produit/Reference]',
    body: `Bonjour,

Nous sommes interesses par le(s) produit(s) suivant(s) et souhaiterions connaitre leur disponibilite actuelle :

1. [Reference 1] — [Designation] — Qte souhaitee : [XX]
2. [Reference 2] — [Designation] — Qte souhaitee : [XX]

Merci de nous indiquer :
- Stock disponible
- Delai de reapprovisionnement si rupture
- Prix unitaire

Dans l'attente de votre retour.

Cordialement,
Ikabay Sourcing` },
  {
    id: 'tarif-transport',
    title: 'Demande tarif transport',
    subject: 'Demande de tarif transport — Ikabay Sourcing',
    body: `Bonjour,

Nous souhaiterions obtenir un devis pour l'expedition suivante :

Origine : [Ville, Pays]
Destination : [Ville, Pays]
Type de marchandise : [Accessoires nautiques / Equipements maritimes]
Poids estime : [XX] kg
Volume : [XX] m3
Mode de transport souhaite : [Mer / Air / Route]
Delai souhaite : [Date]

Merci de nous faire parvenir votre meilleure offre.

Cordialement,
Ikabay Sourcing` },

  // PROJET IKABAY — 8 RFQ SOURCING NAUTIQUE (generiques, sans client)
    {
      id: 'ikabay-xvision',
      title: 'X-Vision Marine — Bolsters doubles',
      subject: 'DEMANDE DE PRIX — Bolsters doubles marine — Catalogue IKABAY Sourcing',
      body: `Bonjour,

  IKABAY Sourcing, specialiste en approvisionnement nautique pour la Martinique, constitue son catalogue et souhaite vos tarifs pour :

  Bolster double (baquet) — cuir synthetique marine grade UV, anti-moisissure
  Coloris : bleu/gris + gris premium
  Pietement aluminium marine grade
  Option glaciere integree OUI/NON

  Merci de preciser : prix HT, delai, options, poids colis, livraison DOM.

  Cordialement,
  IKABAY Sourcing` },
    {
      id: 'ikabay-osculati',
      title: 'Osculati — Catalogue general',
      subject: 'DEMANDE DE PRIX — Equipements nautiques — IKABAY Sourcing',
      body: `Bonjour,

  IKABAY Sourcing sollicite vos tarifs pour (equipement bateaux, livraison Martinique) :

  - 66m Liston PVC preperce marine (barres 6m)
  - 100m Liseret compatible
  - 10 Hublots inox/alu ~150x365mm
  - 10 Echelle inox 4 marches larg. 30cm
  - 35 Taquets inox 316 - 200mm
  - 20+15 Loquets inox (2 modeles)
  - 20 Porte-gobelets inox

  Merci d'indiquer prix HT, disponibilite, remise.

  Cordialement,
  IKABAY Sourcing` },
    {
      id: 'ikabay-adnautic',
      title: 'AD Nautic — Compas + quincaillerie',
      subject: 'DEMANDE DE PRIX — Compas et quincaillerie — IKABAY Sourcing',
      body: `Bonjour,

  IKABAY Sourcing recherche pour son catalogue :

  1. Compas magnetique Plastimo Contest 150 ou Neptune 135 — 5 pcs
  2. Lot quincaillerie bateau complet (visserie inox 316, charnieres, poignees, passe-coque, vannes) — pour 5 bateaux

  Merci d'indiquer prix, delais, transport DOM.

  Cordialement,
  IKABAY Sourcing` },
    {
      id: 'ikabay-quick',
      title: 'Quick — Daviers ancre',
      subject: 'DEMANDE DE PRIX — Daviers ancre inox — IKABAY Sourcing',
      body: `Bonjour,

  IKABAY Sourcing recherche des daviers (bow roller) pour ancre 8 kg (support max 10 kg) — 5 pcs.

  Merci de transmettre : modeles compatibles (gamme Nemo), prix HT, delai, dimensions, poids, certificat inox 316.

  Cordialement,
  IKABAY Sourcing` },
    {
      id: 'ikabay-alastin',
      title: 'Qingdao Alastin — Taquets + porte-gobelets',
      subject: 'PRICE REQUEST — Marine SS fittings — IKABAY Sourcing catalog',
      body: `Dear Alastin Team,

  IKABAY Sourcing is building its marine catalog for Caribbean market. Request your best pricing:

  1. Marine cleat 316 SS — 200mm — 35 pcs
  2. SS cup holder marine grade — 20 pcs

  Please quote FOB Qingdao: unit price, MOQ, lead time, packing, 316 cert, payment terms.

  We use GEODIS for shipping.

  Best regards,
  IKABAY Sourcing` },
    {
      id: 'ikabay-wudi',
      title: 'Wudi Xinxiangju — Loquets',
      subject: 'PRICE REQUEST — Marine SS latches — IKABAY Sourcing',
      body: `Dear Wudi Xinxiangju Team,

  IKABAY Sourcing requests quotation for marine SS latches for our catalog:

  - Latch Model A (simple) — 20 pcs
  - Latch Model B (key-locking) — 15 pcs

  Please quote FOB: unit price per model, MOQ, lead time, packing, 316 cert.

  Best regards,
  IKABAY Sourcing` },
    {
      id: 'ikabay-shenghui',
      title: 'Shenxian Shenghui — Echelles',
      subject: 'PRICE REQUEST — Marine SS ladder — IKABAY Sourcing',
      body: `Dear Shenxian Shenghui Team,

  IKABAY Sourcing requests quotation for marine SS ladder, 4 steps, 30cm width — 10 pcs.

  Please quote FOB: unit price, MOQ, models, lead time, packing, 316 cert.

  Best regards,
  IKABAY Sourcing` },
    {
      id: 'ikabay-geodis',
      title: 'GEODIS — Transport logistique',
      subject: 'DEMANDE DE TARIF — Transport LCL France + Chine vers Martinique',
      body: `Bonjour,

  IKABAY Sourcing prepare des expeditions regulieres vers Fort-de-France (Martinique) :

  A - FRANCE (Le Havre/Marseille) : equipement nautique, 3-4m3, 300-500kg, LCL
  B - CHINE (Qingdao/Ningbo) : quincaillerie inox, 1-2m3, 100-200kg, LCL (option)

  Merci d'indiquer prix par route, delai, prestations incluses (dedouanement, assurance). Possibilite consolider ?

  Cordialement,
  IKABAY Sourcing` },
];

const rfqExample = {
  subject: 'Demande de prix — Ikabay Sourcing — Equipement nautique',
  body: `Bonjour,

Nous preparons l'equipement nautique pour la Martinique et souhaitons obtenir vos meilleurs tarifs.`
};

const vignettesMessage = `BONJOUR,

Voici le recapitulatif complet du sourcing pour vos 5 bateaux.

RECAPITULATIF PRODUITS & PRIX
- Compas magnetique 150mm x5 : ~900 EUR (Plastimo / AD Nautic)
- Liston PVC preperce 66m : ~700 EUR (Osculati)
- Liseret compatible 100m : ~450 EUR (Osculati)
- Hublots 150x365mm x10 : ~1 200 EUR (Osculati)
- Bolsters doubles + sellerie x5 : ~8 500 EUR (X-Vision Marine)
- Daviers ancre 8kg x5 : ~600 EUR (Quick)
- Echelles inox 4 marches x10 : ~1 200 EUR (Osculati)
- Taquets inox 200mm x35 : ~100 EUR (Alastin Chine)
- Loquets inox x30 : ~90 EUR (Wudi Chine)
- Porte-gobelets inox x20 : ~65 EUR (Alastin Chine)
- Quincaillerie lot : ~800 EUR (AD Nautic)
- Transport GEODIS : ~970 EUR
- Assurance + douane : ~290 EUR

TOTAL ESTIME RENDU MARTINIQUE : ~14 810 EUR

3 SCENARIOS :
1. ECONOMIQUE ~8 700 EUR (10-14 sem, risque eleve)
2. EQUILIBRE ~14 800 EUR (7-9 sem, risque faible) - RECOMMANDE
3. RAPIDE ~22 100 EUR (5-7 sem, risque tres faible)

FOURNISSEURS : X-Vision Marine (bolsters FR), Osculati (catalogue IT), Plastimo/AD Nautic (compas FR), Quick (daviers IT), Qingdao Alastin (taquets CN), Wudi Xinxiangju (loquets CN), GEODIS (transport).

PROCHAINES ETAPES :
1. Valider le scenario (EQUILIBRE recommande)
2. Lancer les commandes
3. X-Vision livre sous 4-6 sem (chemin critique)
4. GEODIS reserve le groupage Le Havre vers Fort-de-France
5. Livraison prevue : 7 a 9 semaines

Rapport complet disponible.`;

export function RfqPage() {
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeProject, setActiveProject] = useState('all');
  const [copyId, setCopyId] = useState(null);

  const getFullEmail = useCallback((tpl) => {
    return `Objet : ${tpl.subject}\n\n${tpl.body}\n\n--\n${SOURCING_EMAIL}`;
  }, []);

  const handleCopy = useCallback(async (tpl) => {
    const text = getFullEmail(tpl);
    try {
      await navigator.clipboard.writeText(text);
      setCopyId(tpl.id);
      setTimeout(() => setCopyId(null), 2000);
    } catch {
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

  const handleCopyVignettes = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(vignettesMessage);
      setCopyId('vignettes');
      setTimeout(() => setCopyId(null), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = vignettesMessage;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyId('vignettes');
      setTimeout(() => setCopyId(null), 2000);
    }
  }, []);

  const filteredTemplates = activeProject === 'all'
    ? templates
    : activeProject === 'ikabay'
      ? templates.filter(t => !t.id.startsWith('ikabay-'))
      : templates.filter(t => t.id.startsWith('ikabay-'));

  return (
    <section className="pageSection">
      <div className="badge" style={{ marginBottom: 12 }}>
        <Mail size={14} style={{ marginRight: 6 }} />
        RFQ &amp; Emails
      </div>
      <h1>Demandes de prix &amp; Emails</h1>
      <p style={{ marginBottom: 28 }}>
        Templates email prets a copier. Expediteur : {SOURCING_EMAIL}
      </p>

      {/* ── FILTRES PROJET ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: 'Tous les templates' },
          { id: 'ikabay', label: 'IKABAY Standard' },
          { id: 'ikabay-sourcing', label: 'Sourcing Nautique' },
        ].map(p => (
          <button
            key={p.id}
            onClick={() => setActiveProject(p.id)}
            style={{
              padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: activeProject === p.id ? '#0f766e' : '#e8f0ee',
              color: activeProject === p.id ? 'white' : '#1a2e2b',
              fontWeight: 700, fontSize: 14, transition: 'all 0.2s'
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── TEMPLATES GRID ── */}
      <div className="cardGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16, marginBottom: 48 }}>
        {filteredTemplates.map((tpl) => (
          <div key={tpl.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: '#e7fbf7', display: 'grid', placeItems: 'center', color: '#0f766e', flexShrink: 0 }}>
                <Mail size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 17, marginBottom: 4, lineHeight: 1.2 }}>{tpl.title}</h3>
                <p style={{ fontSize: 12, color: '#516866', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tpl.subject}
                </p>
              </div>
            </div>
            <div style={{ background: '#f8faf9', borderRadius: 12, padding: 14, flex: 1, marginBottom: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#435956', margin: '0 0 6px' }}>
                <FileText size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                Apercu
              </p>
              <p style={{ fontSize: 13, color: '#34514f', lineHeight: 1.5, margin: 0, display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {tpl.body}
              </p>
            </div>
            <button
              onClick={() => handleCopy(tpl)}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', minHeight: 46, borderRadius: 14, fontWeight: 800, fontSize: 14,
                border: 0, cursor: 'pointer',
                background: copyId === tpl.id ? '#dcfce7' : '#0f766e',
                color: copyId === tpl.id ? '#166534' : 'white',
                transition: 'all 0.2s',
              }}
            >
              {copyId === tpl.id ? <><CheckCircle size={18} /> Copie !</> : <><Copy size={18} /> Copier l'email</>}
            </button>
          </div>
        ))}
      </div>

      {/* ── VIGNETTES WHATSAPP POUR JOEL ── */}
      {activeProject !== 'ikabay' && (
        <div className="card" style={{ marginBottom: 48, padding: 0, overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg, #075e54, #128C7E)', padding: '20px 24px', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <MessageCircle size={20} />
              <h3 style={{ fontSize: 18, color: 'white', margin: 0 }}>Vignettes WhatsApp</h3>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.85 }}>
              Message pret a envoyer au client. Copie et colle dans la conversation WhatsApp.
            </p>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ background: '#dcf8c6', borderRadius: 12, padding: 16, marginBottom: 16, maxHeight: 300, overflow: 'auto' }}>
              <pre style={{ fontFamily: 'inherit', fontSize: 13, lineHeight: 1.6, color: '#303030', margin: 0, whiteSpace: 'pre-wrap' }}>
                {vignettesMessage}
              </pre>
            </div>
            <button
              onClick={handleCopyVignettes}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                minHeight: 46, borderRadius: 14, padding: '12px 24px', fontWeight: 800, fontSize: 14,
                border: 0, cursor: 'pointer',
                background: copyId === 'vignettes' ? '#dcfce7' : '#128C7E',
                color: copyId === 'vignettes' ? '#166534' : 'white',
                transition: 'all 0.2s',
              }}
            >
              {copyId === 'vignettes' ? <><CheckCircle size={18} /> Copie !</> : <><MessageCircle size={18} /> Copier le message WhatsApp</>}
            </button>
          </div>
        </div>
      )}

      {/* ── SMTP CONFIG ── */}
      <div className="card" style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: '#e7fbf7', display: 'grid', placeItems: 'center', color: '#0f766e' }}>
            <Settings size={22} />
          </div>
          <h3 style={{ fontSize: 18 }}>Configuration SMTP</h3>
        </div>
        <p style={{ fontSize: 14, color: '#516866', marginBottom: 16, lineHeight: 1.5 }}>
          Ces variables sont utilisees pour l'envoi des emails. Aucun mot de passe n'est affiche.
        </p>
        <div style={{ background: '#1e293b', borderRadius: 12, padding: 16, fontFamily: "'Fira Code', 'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.8, color: '#e2e8f0' }}>
          <div><span style={{ color: '#94a3b8' }}>IKABAY_EMAIL_USER</span><span style={{ color: '#64748b' }}>=</span><span style={{ color: '#a5f3fc' }}>{SOURCING_EMAIL}</span></div>
          <div><span style={{ color: '#94a3b8' }}>IKABAY_SMTP_HOST</span><span style={{ color: '#64748b' }}>=</span><span style={{ color: '#a5f3fc' }}>smtp.hostinger.com</span></div>
          <div><span style={{ color: '#94a3b8' }}>IKABAY_EMAIL_PASSWORD</span><span style={{ color: '#64748b' }}>=</span><span style={{ color: '#fbbf24' }}>&nbsp;(a configurer dans .env)</span></div>
          <div><span style={{ color: '#94a3b8' }}>IKABAY_SMTP_PORT</span><span style={{ color: '#64748b' }}>=</span><span style={{ color: '#a5f3fc' }}>465</span></div>
        </div>
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: '#fef3c7', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <AlertCircle size={18} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ margin: 0, fontSize: 13, color: '#92400e', lineHeight: 1.4 }}>
            <strong>Securite :</strong> Le mot de passe SMTP n'est <strong>jamais</strong> stocke dans le code source. Configurez-le uniquement dans le fichier <code>.env</code>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RfqPage;