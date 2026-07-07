import { useState } from 'react';
import {
  Store, Anchor, Truck, MessageCircle, Ship, Search,
  FileText, ClipboardCheck, BarChart3, Phone, Mail, CheckCircle, 
  Package, Globe2, Star, TrendingUp, DollarSign, ArrowRight, 
  Tags, ShieldCheck, Users, Sparkles, MapPin, Clock
} from 'lucide-react';
import { WHATSAPP_URL, APP_NAME, waMessage } from '../utils/constants';
import { Link } from 'react-router-dom';

const stats = [
  { icon: Store, value: '8', label: 'Fournisseurs actifs', detail: 'Europe + Asie' },
  { icon: Package, value: '150+', label: 'Produits au catalogue', detail: 'Nautique & industriel' },
  { icon: Truck, value: '12', label: 'Jours delai moyen', detail: 'Via GEODIS' },
  { icon: MessageCircle, value: '24/7', label: 'Support WhatsApp', detail: 'Reponse immediate' },
];

const suppliers = [
  {
    name: 'X-Vision Marine', country: 'France', badge: 'Premium',
    products: 'Bolsters sur-mesure, sellerie cuir UV, sieges baquets',
    delivery: '4-6 sem', rating: 5, color: '#0f766e',
    desc: 'Fabricant francais de sellerie nautique haut de gamme. Sur-mesure, cuir synthetique marine grade anti-UV.',
  },
  {
    name: 'Osculati', country: 'Italie', badge: 'Catalogue',
    products: 'Liston, hublots, echelles, taquets, accastillage complet',
    delivery: 'Stock 5-7j', rating: 4, color: '#2563eb',
    desc: 'Plus grand catalogue nautique europeen. 15 000+ references, livraison DOM possible.',
  },
  {
    name: 'AD Nautic', country: 'France', badge: 'Partenaire',
    products: 'Compas Plastimo, quincaillerie inox lots',
    delivery: 'Stock 48h', rating: 4, color: '#7c3aed',
    desc: 'Specialiste francais de l accastillage et equipement nautique. Expert DOM.',
  },
  {
    name: 'Quick', country: 'Italie', badge: 'Reference',
    products: 'Daviers ancre, bow roller, accastillage securite',
    delivery: 'Stock 72h', rating: 5, color: '#0891b2',
    desc: 'Reference mondiale pour les daviers et equipements d ancrage. Certifie inox 316.',
  },
  {
    name: 'Qingdao Alastin', country: 'Chine', badge: 'Economique',
    products: 'Taquets inox 316, porte-gobelets, quincaillerie',
    delivery: '15-20j', rating: 3, color: '#ea580c',
    desc: 'Fabricant chinois specialiste accastillage inox 316. MOQ flexible, qualite certifiee.',
  },
  {
    name: 'GEODIS', country: 'France/Martinique', badge: 'Logistique',
    products: 'Transport LCL France/Chine, dedouanement, tracking',
    delivery: '8-15j', rating: 5, color: '#0f766e',
    desc: 'Operateur logistique mondial. Agence Fort-de-France. Groupage LCL, assurance incluse.',
  },
];

const categories = [
  { icon: Anchor, name: 'Accastillage inox', count: 45, color: '#0f766e' },
  { icon: ShieldCheck, name: 'Securite marine', count: 28, color: '#2563eb' },
  { icon: Truck, name: 'Transport & logistique', count: 12, color: '#7c3aed' },
  { icon: Package, name: 'Plomberie marine', count: 35, color: '#0891b2' },
  { icon: Ship, name: 'Pilotage & navigation', count: 22, color: '#ea580c' },
  { icon: Sparkles, name: 'Sellerie & confort', count: 18, color: '#16a34a' },
];

const featuredProducts = [
  { name: 'Compas Plastimo 150mm', price: '186 EUR', supplier: 'AD Nautic', img: '/images/01-compas.svg' },
  { name: 'Bolster double baquet', price: '1 690 EUR', supplier: 'X-Vision', img: '/images/04-bolster.svg' },
  { name: 'Echelle inox 4 marches', price: '125 EUR', supplier: 'Osculati', img: '/images/06-echelle.svg' },
  { name: 'Davier ancre Quick', price: '128 EUR', supplier: 'Quick', img: '/images/05-davier.svg' },
  { name: 'Taquet inox 200mm', price: '18 EUR', supplier: 'Osculati', img: '/images/07-taquet.svg' },
  { name: 'Hublot inox 150mm', price: '125 EUR', supplier: 'Osculati', img: '/images/03-hublot.svg' },
];

export function HomePage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(waMessage(`Bonjour IKABAY, je souhaite recevoir le catalogue complet des fournisseurs. Mon email : ${email}`));
  };

  return (
    <section className="pageSection">

      {/* ─── HERO SECTION ─── */}
      <div style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #0891b2 100%)',
        borderRadius: 28, padding: '60px 48px', marginBottom: 40,
        color: 'white', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.15)', padding: '6px 14px',
            borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 16
          }}>
            <Sparkles size={14} /> 8 fournisseurs verifies • Livraison DOM
          </div>
          <h1 style={{ color: 'white', fontSize: 42, fontWeight: 900, margin: '0 0 12px', lineHeight: 1.1 }}>
            Sourcing nautique<br />pour la Caraibe
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, lineHeight: 1.5, marginBottom: 24, maxWidth: 480 }}>
            Trouvez, comparez et commandez vos equipements nautiques aux meilleurs prix. 
            Fournisseurs Europe et Asie verifies, livraison Martinique via GEODIS.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/catalogue" className="btn" style={{
              background: 'white', color: '#0f766e', padding: '14px 28px',
              borderRadius: 14, fontWeight: 800, fontSize: 15, textDecoration: 'none',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
            }}>
              <Package size={18} /> Voir le catalogue
            </Link>
            <a href={waMessage('Bonjour IKABAY ! Je souhaite un devis pour mon projet.')}
              target="_blank" rel="noreferrer" className="btn" style={{
                background: 'rgba(255,255,255,0.15)', color: 'white',
                padding: '14px 28px', borderRadius: 14, fontWeight: 800, fontSize: 15,
                textDecoration: 'none', border: '2px solid rgba(255,255,255,0.3)',
              }}>
              <MessageCircle size={18} /> Devis WhatsApp
            </a>
          </div>
        </div>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', right: -30, top: -30, opacity: 0.06, fontSize: 300, fontWeight: 900 }}>
          <Ship size={300} />
        </div>
      </div>

      {/* ─── STATS ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: '#e7fbf7', color: '#0f766e',
                display: 'grid', placeItems: 'center', margin: '0 auto 12px'
              }}>
                <Icon size={26} />
              </div>
              <strong style={{ fontSize: 30, color: '#1a2e2b', display: 'block' }}>{s.value}</strong>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#60716f' }}>{s.label}</span>
              <p style={{ fontSize: 12, color: '#8a9b97', margin: '4px 0 0' }}>{s.detail}</p>
            </div>
          );
        })}
      </div>

      {/* ─── CATEGORIES ─── */}
      <div className="sectionTitle">
        <h2>Categories fournisseurs</h2>
        <Link to="/catalogue" style={{ color: '#0f766e', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          Tout voir <ArrowRight size={16} />
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12, marginBottom: 40 }}>
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Link to="/catalogue" key={i} style={{
              background: 'white', borderRadius: 14, padding: 20, textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)', cursor: 'pointer',
              transition: 'all 0.2s', display: 'block'
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${cat.color}15`, color: cat.color,
                display: 'grid', placeItems: 'center', marginBottom: 10
              }}>
                <Icon size={22} />
              </div>
              <div style={{ fontWeight: 700, color: '#1a2e2b', fontSize: 14 }}>{cat.name}</div>
              <div style={{ fontSize: 12, color: '#8a9b97' }}>{cat.count} produits</div>
            </Link>
          );
        })}
      </div>

      {/* ─── SUPPLIERS SHOWCASE ─── */}
      <div className="sectionTitle">
        <h2>Nos fournisseurs partenaires</h2>
        <Link to="/fournisseurs" style={{ color: '#0f766e', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          Tous les fournisseurs <ArrowRight size={16} />
        </Link>
      </div>
      <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
        {suppliers.map((sup, i) => (
          <div key={i} className="card" style={{ padding: 24, display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: `${sup.color}15`, color: sup.color,
              display: 'grid', placeItems: 'center', flexShrink: 0
            }}>
              <Store size={28} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 18 }}>{sup.name}</span>
                <span className="badge" style={{
                  background: sup.color, fontSize: 11, padding: '3px 10px'
                }}>{sup.badge}</span>
                <span style={{ fontSize: 12, color: '#8a9b97' }}>
                  {[...Array(5)].map((_, i) => i < sup.rating ? '\u2605' : '\u2606').join('')}
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#60716f', margin: '0 0 6px' }}>{sup.desc}</p>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#8a9b97' }}>
                <span><Globe2 size={12} /> {sup.country}</span>
                <span><Package size={12} /> {sup.products.substring(0, 50)}...</span>
                <span><Clock size={12} /> {sup.delivery}</span>
              </div>
            </div>
            <Link to="/rfq" style={{
              background: sup.color, color: 'white', padding: '10px 20px',
              borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap'
            }}>
              Demander un prix <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      {/* ─── FEATURED PRODUCTS ─── */}
      <div className="sectionTitle">
        <h2>Produits a la une</h2>
        <Link to="/catalogue" style={{ color: '#0f766e', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          Voir tout le catalogue <ArrowRight size={16} />
        </Link>
      </div>
      <div className="cardGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
        {featuredProducts.map((p, i) => (
          <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
              height: 160, background: '#f0f5f3', display: 'grid',
              placeItems: 'center', fontSize: 48
            }}>
              {p.name.includes('Compas') ? '\u{1F9ED}' : p.name.includes('Bolster') ? '\u{1F4BA}' : p.name.includes('Echelle') ? '\u{1FA9C}' : p.name.includes('Davier') ? '\u{2693}' : p.name.includes('Taquet') ? '\u{1F529}' : '\u{1F4CD}'}
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 11, color: '#0f766e', fontWeight: 700, marginBottom: 4 }}>{p.supplier}</div>
              <div style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 15, marginBottom: 8 }}>{p.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#0f766e' }}>{p.price}</span>
                <Link to="/catalogue" style={{
                  background: '#0f766e', color: 'white', padding: '6px 14px',
                  borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none'
                }}>Voir</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── PROCESS ─── */}
      <div style={{
        background: 'white', borderRadius: 20, padding: 32, marginBottom: 40,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ textAlign: 'center', marginTop: 0 }}>Comment ca marche</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginTop: 24 }}>
          {[
            { icon: Search, step: '1', title: 'Besoin', desc: 'Decrivez votre besoin, nous analysons' },
            { icon: Globe2, step: '2', title: 'Sourcing', desc: 'Nous consultons nos 8 fournisseurs partenaires' },
            { icon: BarChart3, step: '3', title: 'Comparaison', desc: 'Tableau comparatif prix / delais / qualite' },
            { icon: ClipboardCheck, step: '4', title: 'Devis', desc: 'Jusqua 3 propositions detailles' },
            { icon: Truck, step: '5', title: 'Livraison', desc: 'GEODIS assure le transport vers la Martinique' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 30,
                  background: '#0f766e', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px', fontSize: 22, fontWeight: 800
                }}>
                  {item.step}
                </div>
                <div style={{ fontWeight: 700, color: '#1a2e2b', marginBottom: 4, fontSize: 15 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#60716f' }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── CTA WHATSAPP ─── */}
      <div style={{
        background: 'linear-gradient(135deg, #075e54, #128C7E)',
        borderRadius: 24, padding: '40px 48px', marginBottom: 40,
        color: 'white', textAlign: 'center'
      }}>
        <MessageCircle size={40} style={{ marginBottom: 12 }} />
        <h2 style={{ color: 'white', margin: '0 0 8px', fontSize: 26 }}>
          Besoin d'un devis ou d'un conseil ?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 500, margin: '0 auto 20px' }}>
          Notre equipe vous repond sous 24h sur WhatsApp. Devis gratuit, accompagnement personnalise.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 450, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input type="email" placeholder="Votre email"
            value={email} onChange={e => setEmail(e.target.value)}
            required style={{
              flex: 1, minWidth: 200, padding: '14px 20px',
              borderRadius: 12, border: 'none', fontSize: 14,
              outline: 'none'
            }} />
          <button type="submit" className="btn btnPrimary" style={{
            padding: '14px 24px', borderRadius: 12, fontWeight: 800, fontSize: 14,
            background: 'white', color: '#075e54', border: 'none', cursor: 'pointer'
          }}>
            <MessageCircle size={18} style={{ marginRight: 6 }} />
            Recevoir le catalogue
          </button>
        </form>
      </div>

      {/* ─── BOTTOM LINKS ─── */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
        <Link to="/catalogue" className="btn btnPrimary" style={{ padding: '12px 24px', borderRadius: 12, fontWeight: 800 }}>
          <Package size={18} /> Catalogue fournisseurs
        </Link>
        <Link to="/devis" className="btn btnSecondary" style={{ padding: '12px 24px', borderRadius: 12, fontWeight: 800 }}>
          <FileText size={18} /> Devis en ligne
        </Link>
        <Link to="/dropshipping" className="btn btnSecondary" style={{ padding: '12px 24px', borderRadius: 12, fontWeight: 800 }}>
          <TrendingUp size={18} /> Dropshipping
        </Link>
      </div>

    </section>
  );
}