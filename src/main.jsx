import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, MapPin, MessageCircle, Star, ShieldCheck, Truck, Wrench, Store, Utensils, BriefcaseBusiness } from 'lucide-react';
import { supabase, hasSupabaseConfig } from './lib/supabase';
import './styles.css';

const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/596696653589';

const fallbackProviders = [
  {
    id: 'demo-1',
    name: 'IKABAY Sourcing Démo',
    slug: 'ikabay-sourcing-demo',
    vertical: 'IKABAY SOURCING',
    short_description: 'Sourcing, bons plans, commandes groupées.',
    description: 'Prestataire fictif pour tester les demandes de sourcing, bons plans et commandes groupées.',
    whatsapp_url: WHATSAPP_URL,
    rating: 4.8,
    reviews_count: 2,
    partner_status: 'premium',
    category_name: 'Sourcing produit',
    municipality_name: 'Fort-de-France'
  },
  {
    id: 'demo-2',
    name: 'SOS Galère Dépannage Démo',
    slug: 'sos-galere-depannage-demo',
    vertical: 'SOS GALÈRE',
    short_description: 'Dépannage urgent et assistance.',
    description: 'Prestataire fictif pour dépannage urgent, petits travaux et assistance.',
    whatsapp_url: WHATSAPP_URL,
    rating: 4.7,
    reviews_count: 1,
    partner_status: 'verified',
    category_name: 'Dépannage urgent',
    municipality_name: 'Le Lamentin'
  },
  {
    id: 'demo-3',
    name: 'Délikréol Traiteur Démo',
    slug: 'delikreol-traiteur-demo',
    vertical: 'DELIKREOL',
    short_description: 'Traiteur local et repas créoles.',
    description: 'Traiteur fictif pour tester restaurants, producteurs et commandes repas.',
    whatsapp_url: WHATSAPP_URL,
    rating: 4.9,
    reviews_count: 1,
    partner_status: 'premium',
    category_name: 'Restaurant & traiteur',
    municipality_name: 'Rivière-Pilote'
  }
];

const verticalIcons = {
  'IKABAY SOURCING': Store,
  'SOS GALÈRE': Wrench,
  DELIKREOL: Utensils,
  IKABARJOB: BriefcaseBusiness,
  'IKABAY LOGISTIQUE': Truck
};

function normalize(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function App() {
  const [providers, setProviders] = useState(fallbackProviders);
  const [status, setStatus] = useState(hasSupabaseConfig ? 'Connexion Supabase...' : 'Mode démo local : ajoute la clé Supabase pour charger la base.');
  const [query, setQuery] = useState('');
  const [vertical, setVertical] = useState('Tous');

  useEffect(() => {
    async function loadProviders() {
      if (!supabase) return;
      const { data, error } = await supabase
        .from('ikabay_public_providers')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error(error);
        setStatus('Supabase répond, mais la vue publique est indisponible. Mode démo affiché.');
        return;
      }

      if (data?.length) {
        setProviders(data);
        setStatus(`${data.length} prestataire(s) chargé(s) depuis Supabase.`);
      } else {
        setStatus('Supabase connecté, aucune donnée publique trouvée. Mode démo affiché.');
      }
    }
    loadProviders();
  }, []);

  const verticals = useMemo(() => ['Tous', ...Array.from(new Set(providers.map((p) => p.vertical).filter(Boolean)))], [providers]);

  const filteredProviders = useMemo(() => {
    const q = normalize(query);
    return providers.filter((provider) => {
      const matchesVertical = vertical === 'Tous' || provider.vertical === vertical;
      const haystack = normalize([
        provider.name,
        provider.vertical,
        provider.short_description,
        provider.description,
        provider.category_name,
        provider.municipality_name
      ].join(' '));
      return matchesVertical && haystack.includes(q);
    });
  }, [providers, query, vertical]);

  return (
    <main>
      <section className="hero">
        <div className="badge">MVP Martinique / Caraïbe</div>
        <h1>IKABAY Local</h1>
        <p>
          Annuaire local pour trouver rapidement un prestataire, demander un devis, lancer un sourcing,
          organiser une livraison ou contacter SOS Galère par WhatsApp.
        </p>
        <div className="heroActions">
          <a className="primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> Devis WhatsApp
          </a>
          <a className="secondary" href="#annuaire">Voir l’annuaire</a>
        </div>
        <p className="status">{status}</p>
      </section>

      <section className="stats" aria-label="Statistiques MVP">
        <div><strong>{providers.length}</strong><span>prestataires</span></div>
        <div><strong>5</strong><span>communes seed</span></div>
        <div><strong>WhatsApp</strong><span>conversion rapide</span></div>
      </section>

      <section id="annuaire" className="directory">
        <div className="sectionTitle">
          <h2>Annuaire local</h2>
          <p>Filtre par verticale ou recherche une commune, un service, un besoin.</p>
        </div>

        <div className="filters">
          <label className="searchBox">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex : dépannage, Fort-de-France, traiteur..." />
          </label>
          <select value={vertical} onChange={(event) => setVertical(event.target.value)}>
            {verticals.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        <div className="cards">
          {filteredProviders.map((provider) => {
            const Icon = verticalIcons[provider.vertical] || Store;
            return <ProviderCard key={provider.id} provider={provider} Icon={Icon} />;
          })}
        </div>
      </section>
    </main>
  );
}

function ProviderCard({ provider, Icon }) {
  const whatsapp = provider.whatsapp_url || WHATSAPP_URL;
  return (
    <article className="card">
      <div className="cardTop">
        <div className="icon"><Icon size={22} /></div>
        <div>
          <p className="vertical">{provider.vertical || 'IKABAY LOCAL'}</p>
          <h3>{provider.name}</h3>
        </div>
      </div>
      <p className="description">{provider.short_description || provider.description}</p>
      <div className="meta">
        <span><MapPin size={15} /> {provider.municipality_name || 'Martinique'}</span>
        <span><Star size={15} /> {Number(provider.rating || 0).toFixed(1)} ({provider.reviews_count || 0})</span>
        <span><ShieldCheck size={15} /> {provider.partner_status || 'new'}</span>
      </div>
      <div className="cardActions">
        <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
        <button type="button" onClick={() => alert('Formulaire devis à brancher en étape suivante.')}>Demander un devis</button>
      </div>
    </article>
  );
}

createRoot(document.getElementById('root')).render(<App />);
