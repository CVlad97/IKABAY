import {
  Store, Anchor, Truck, MessageCircle, Ship, Search,
  FileText, ClipboardCheck, BarChart3, Phone, Mail, CheckCircle
} from 'lucide-react';
import { WHATSAPP_URL, APP_NAME, waMessage } from '../utils/constants';

const stats = [
  { icon: Store, value: '38', label: 'Partenaires fournisseurs' },
  { icon: Ship, value: '12', label: 'Communes couvertes' },
  { icon: ClipboardCheck, value: '150+', label: 'Commandes traitées' },
];

const services = [
  {
    icon: Search,
    title: 'Sourcing express',
    desc: 'Trouvez le produit nautique ou industriel qu\'il vous faut, au meilleur prix, livré en Caraïbe.',
  },
  {
    icon: Tag,
    title: 'Déstockage disponible',
    desc: 'Consultez notre inventaire actualisé de lots à prix coûtant — maritime, BTP, électronique.',
  },
  {
    icon: Ship,
    title: 'Import/Export Caraïbe',
    desc: 'Coordination logistique complète entre la France hexagonale, la Martinique et les îles voisines.',
  },
  {
    icon: ClipboardCheck,
    title: 'Coordination projet',
    desc: 'Suivi de dossier dédié, devis multi-prestataires, planning et reporting intégrés.',
  },
];

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Contactez-nous',
    desc: 'Un WhatsApp, un email ou un formulaire et votre besoin nous parvient en quelques secondes.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Nous sourçons',
    desc: 'Notre équipe mobilise son réseau de fournisseurs pour trouver les meilleures offres.',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Devis comparé',
    desc: 'Recevez jusqu\'à 3 propositions détaillées avec délais et prix rendu Caraïbe.',
  },
  {
    number: '04',
    icon: Truck,
    title: 'Livré suivi',
    desc: 'Coordination transport, suivi en temps réel et réception garantie.',
  },
];

function Tag(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

export function HomePage() {
  return (
    <>
      {/* ──────────── HERO ──────────── */}
      <section className="hero homeHero">
        <div className="badge">Martinique &bull; Caraïbe</div>
        <h1>{APP_NAME}</h1>
        <p className="heroTagline">
          Trouvez, comparez, achetez et livrez plus intelligemment dans la Caraïbe.
        </p>
        <p className="heroSubtitle">
          Sourcing professionnel, déstockage nautique &amp; industriel, devis multi-fournisseurs,
          coordination transport et suivi de dossier — le tout depuis une plateforme unique.
        </p>
        <div className="heroActions">
          <a className="primary" href="/sourcing">
            <Search size={18} /> Demander un sourcing
          </a>
          <a className="secondary" href="/destockage">
            <Store size={18} /> Voir le déstockage
          </a>
          <a className="secondary" href="/dossier-jules-defel">
            <FileText size={18} /> Suivre un dossier
          </a>
        </div>
      </section>

      {/* ──────────── STATS ──────────── */}
      <section className="stats homeStats" aria-label="Chiffres clés">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="statCard">
            <Icon size={28} className="statIcon" />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      {/* ──────────── SERVICES ──────────── */}
      <section className="section homeServices" aria-label="Nos services">
        <div className="sectionTitle">
          <h2>Nos services</h2>
          <p>Ce que Ikabay Sourcing vous apporte au quotidien.</p>
        </div>
        <div className="servicesGrid">
          {services.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="serviceCard">
              <div className="serviceIcon"><Icon size={28} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ──────────── HOW IT WORKS ──────────── */}
      <section className="section homeHow" aria-label="Comment ça marche">
        <div className="sectionTitle">
          <h2>Comment ça marche</h2>
          <p>De votre demande à la livraison, en 4 étapes simples.</p>
        </div>
        <div className="stepsGrid">
          {steps.map(({ number, icon: Icon, title, desc }) => (
            <div key={number} className="stepCard">
              <div className="stepNumber">{number}</div>
              <div className="stepContent">
                <div className="stepIcon"><Icon size={24} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────── CTA CONTACT ──────────── */}
      <section className="section homeCta" aria-label="Contactez-nous">
        <div className="ctaCard">
          <h2>Prêt à sourcer vos produits ?</h2>
          <p>
            Posez-nous votre besoin par WhatsApp ou par email. Réponse garantie sous 24h ouvrées.
          </p>
          <div className="ctaActions">
            <a
              className="primary"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> WhatsApp direct
            </a>
            <a className="secondary" href="/contact">
              <Mail size={18} /> Formulaire contact
            </a>
          </div>
        </div>
      </section>
    </>
  );
}