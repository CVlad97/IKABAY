import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Check,
  Clipboard,
  ExternalLink,
  Layers3,
  Megaphone,
  MessageCircle,
  Plane,
  RotateCw,
  ScanLine,
  Sparkles,
} from 'lucide-react';
import { products, getProductById } from '../data/products';
import { waMessage } from '../utils/constants';

const CREATIVE_COMMANDS = [
  {
    command: '/360view',
    label: 'Vue 360°',
    description: 'Préparer une rotation complète du produit.',
    icon: RotateCw,
    instruction: 'Créer une rotation 360° propre, centrée, avec une lumière constante et sans changer la géométrie, la couleur ou les accessoires du produit.',
  },
  {
    command: '/X-ray',
    label: 'Vue technique',
    description: 'Montrer l’intérieur ou la structure.',
    icon: ScanLine,
    instruction: 'Créer une vue technique illustrative et clairement étiquetée. Ne pas présenter comme une radiographie réelle et ne pas inventer de composants non confirmés.',
  },
  {
    command: '/explodedview',
    label: 'Vue éclatée',
    description: 'Séparer les pièces et le montage.',
    icon: Layers3,
    instruction: 'Créer une vue éclatée pédagogique en conservant uniquement les pièces confirmées dans la fiche produit, avec repères et ordre de montage lisible.',
  },
  {
    command: '/droneview',
    label: 'Vue aérienne',
    description: 'Mettre en scène le produit dans son environnement.',
    icon: Plane,
    instruction: 'Créer une mise en scène aérienne ou cinématique cohérente avec l’usage nautique, sans modifier le produit ni laisser croire à une photo fournisseur.',
  },
  {
    command: '/premiumshowcase',
    label: 'Présentation premium',
    description: 'Préparer une fiche visuelle haut de gamme.',
    icon: Sparkles,
    instruction: 'Créer une présentation premium sobre : fond propre, lumière maîtrisée, détail matière, échelle lisible et aucun texte commercial non vérifié.',
  },
  {
    command: '/adcreative',
    label: 'Publicité',
    description: 'Décliner le produit pour une campagne.',
    icon: Megaphone,
    instruction: 'Créer une déclinaison publicitaire prête à adapter pour le web et les réseaux sociaux, avec un appel à l’action et uniquement les informations validées.',
  },
];

function buildBrief(product, selectedCommand, customNote) {
  const suppliers = (product.suppliers || [])
    .filter((supplier) => supplier.link)
    .map((supplier) => `- ${supplier.name}: ${supplier.link}`)
    .join('\\n');

  return [
    `Commande: ${selectedCommand.command}`,
    `Produit: ${product.nameFr} (référence ${product.id.toUpperCase()})`,
    `Catégorie: ${product.category}`,
    `Unité: ${product.unit || 'à confirmer'}`,
    `Caractéristiques connues: ${product.comment || 'à confirmer'}`,
    '',
    'Consigne de création:',
    selectedCommand.instruction,
    '',
    'Règles de fiabilité:',
    '- Utiliser la photo ou le plan fournisseur validé comme référence.',
    '- Ne pas inventer une dimension, une matière, une certification, un prix ou une disponibilité.',
    '- Marquer clairement toute vue conceptuelle ou générée.',
    customNote.trim() ? `- Note complémentaire: ${customNote.trim()}` : '',
    '',
    suppliers ? `Liens fournisseurs disponibles:\\n${suppliers}` : 'Liens fournisseurs: aucun lien produit enregistré pour cette référence.',
  ].filter(Boolean).join('\\n');
}

export function CreativeStudioPage() {
  const [searchParams] = useSearchParams();
  const initialProductId = searchParams.get('product');
  const initialProduct = getProductById(initialProductId) || products[0];
  const [selectedProductId, setSelectedProductId] = useState(initialProduct?.id || '');
  const [selectedCommandId, setSelectedCommandId] = useState(CREATIVE_COMMANDS[0].command);
  const [customNote, setCustomNote] = useState('');
  const [copied, setCopied] = useState(false);

  const product = useMemo(
    () => getProductById(selectedProductId) || products[0],
    [selectedProductId],
  );
  const selectedCommand = CREATIVE_COMMANDS.find((item) => item.command === selectedCommandId) || CREATIVE_COMMANDS[0];
  const brief = useMemo(
    () => buildBrief(product, selectedCommand, customNote),
    [product, selectedCommand, customNote],
  );

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const whatsappLink = waMessage(
    `Bonjour IKABAY, je souhaite préparer le visuel ${selectedCommand.command} pour ${product.nameFr} (${product.id}). Merci de me confirmer la photo, les dimensions et les informations fournisseur à utiliser.`,
  );

  return (
    <section className="pageSection creativeStudioPage">
      <div className="creativeStudioIntro">
        <div>
          <span className="badge">IKABAY · CREATIVE STUDIO</span>
          <h1>Sublimer chaque produit, sans perdre la fiabilité</h1>
          <p>
            Choisissez une commande visuelle, un produit et ses contraintes. Le studio prépare un brief
            exploitable pour la création média. Il ne remplace pas une photo fournisseur et ne génère pas
            de média tant qu’aucun moteur de création n’est connecté.
          </p>
        </div>
        <div className="creativeStudioMark" aria-hidden="true">
          <Sparkles size={34} />
        </div>
      </div>

      <div className="creativeStudioGrid">
        <div className="creativeStudioPanel">
          <div className="creativeField">
            <label htmlFor="creative-product">Produit à mettre en valeur</label>
            <select
              id="creative-product"
              className="select"
              value={selectedProductId}
              onChange={(event) => setSelectedProductId(event.target.value)}
            >
              {products.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nameFr} · {item.id.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="creativeCommandHeader">
            <div>
              <h2>Choisir une commande</h2>
              <p>Les six commandes de votre capture sont maintenant structurées dans le site.</p>
            </div>
            <span className="creativeStatus">Brief vérifiable</span>
          </div>

          <div className="creativeCommandGrid">
            {CREATIVE_COMMANDS.map((item) => {
              const Icon = item.icon;
              const active = item.command === selectedCommand.command;
              return (
                <button
                  type="button"
                  key={item.command}
                  className={`creativeCommand${active ? ' isActive' : ''}`}
                  onClick={() => setSelectedCommandId(item.command)}
                  aria-pressed={active}
                >
                  <Icon size={22} />
                  <span>
                    <strong>{item.command}</strong>
                    <small>{item.label}</small>
                    <em>{item.description}</em>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="creativeField">
            <label htmlFor="creative-note">Contrainte ou idée complémentaire (facultatif)</label>
            <textarea
              id="creative-note"
              className="textArea"
              value={customNote}
              onChange={(event) => setCustomNote(event.target.value)}
              placeholder="Ex. : modèle sport double, accoudoir central, coloris bleu marine, usage plaisance 9 m…"
              rows={4}
            />
          </div>
        </div>

        <aside className="creativeBriefPanel">
          <div className="creativeBriefTop">
            <div>
              <span className="creativeEyebrow">{selectedCommand.command}</span>
              <h2>{product.nameFr}</h2>
            </div>
            <span className="creativeRef">{product.id.toUpperCase()}</span>
          </div>

          <div className="creativeNotice">
            <Check size={18} />
            <span>Ce brief distingue les informations confirmées des éléments à vérifier.</span>
          </div>

          <pre className="creativeBrief">{brief}</pre>

          <div className="creativeActions">
            <button type="button" className="btn btnPrimary" onClick={copyBrief}>
              {copied ? <Check size={17} /> : <Clipboard size={17} />}
              {copied ? 'Brief copié' : 'Copier le brief'}
            </button>
            <a className="btn btnSecondary" href={whatsappLink} target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              Préparer WhatsApp
            </a>
          </div>

          <div className="creativeLinks">
            <strong>Fiches fournisseurs enregistrées</strong>
            {(product.suppliers || []).filter((supplier) => supplier.link).length ? (
              product.suppliers.filter((supplier) => supplier.link).map((supplier) => (
                <a key={supplier.name} href={supplier.link} target="_blank" rel="noreferrer">
                  <ExternalLink size={14} />
                  {supplier.name}
                </a>
              ))
            ) : (
              <span>Aucun lien produit enregistré pour cette référence.</span>
            )}
          </div>
        </aside>
      </div>

      <div className="creativeStudioFooter">
        <Link to={`/produit/${product.id}`}>Voir la fiche produit</Link>
        <span>Les rendus conceptuels devront être étiquetés comme tels avant publication.</span>
      </div>
    </section>
  );
}

export default CreativeStudioPage;
