import { useState } from 'react';
import {
  Store, Anchor, Truck, MessageCircle, Ship, Search,
  FileText, ClipboardCheck, BarChart3, Phone, Mail, CheckCircle, 
  Package, Globe2, Star, TrendingUp, DollarSign, ArrowRight, 
  Tags, ShieldCheck, Users, Sparkles, MapPin, Clock, ShoppingCart
} from 'lucide-react';
import { WHATSAPP_URL, APP_NAME, waMessage } from '../utils/constants';
import { Link } from 'react-router-dom';

const stats = [
  { icon: Store, value: '8', label: 'Fournisseurs verifies', detail: 'Europe + Asie' },
  { icon: Package, value: '150+', label: 'Produits au catalogue', detail: 'Nautique & industriel' },
  { icon: Truck, value: '12', label: 'Jours delai moyen', detail: 'Via fret maritime' },
  { icon: MessageCircle, value: '24/7', label: 'Support WhatsApp', detail: 'Reponse immediate' },
];

const suppliers = [
  {
    name: 'SVB Allemagne', country: 'Allemagne', badge: 'TOP',
    products: 'Taquets, eclairage, accastillage, instruments',
    delivery: '10-15j', rating: 5, color: '#0f766e',
    desc: 'Plus grand catalogue nautique europeen avec 50 000+ references. Offre prix ferme recue.',
  },
  {
    name: 'Mantus Marine', country: 'USA', badge: 'Premium',
    products: 'Bow rollers, ancres, accastillage securite',
    delivery: '15-20j', rating: 5, color: '#2563eb',
    desc: 'Reference mondiale pour les ancres et daviers. Prix confirmes : bow roller 439$ / ancre 371$.',
  },
  {
    name: 'Osculati', country: 'Italie', badge: 'Catalogue',
    products: 'Liston, hublots, echelles, taquets, accastillage',
    delivery: 'Stock 5-7j', rating: 4, color: '#7c3aed',
    desc: 'Plus grand catalogue nautique italien. Contact B2B etabli: sales@osculati.it.',
  },
  {
    name: 'Quick Italy', country: 'Italie', badge: 'Reference',
    products: 'Daviers ancre, guindeaux, accastillage',
    delivery: 'Stock 72h', rating: 5, color: '#0891b2',
    desc: 'Reference italienne pour les daviers et equipements d ancrage. Contact direct quick@quickitaly.com.',
  },
  {
    name: 'Besenzoni', country: 'Italie', badge: 'Luxe',
    products: 'Echelles, sieges pilote, accastillage haut de gamme',
    delivery: '3-4 sem', rating: 4, color: '#ea580c',
    desc: 'Fabricant italien haut de gamme. Echelles et sieges sur-mesure. Contact info@besenzoni.it.',
  },
  {
    name: 'Lewmar', country: 'Royaume-Uni', badge: 'Premium',
    products: 'Daviers, guindeaux, accastillage marine',
    delivery: '2-3 sem', rating: 5, color: '#16a34a',
    desc: 'Leader mondial de l accastillage marine. Contact etabli: info@lewmar.com.',
  },
];

const categories = [
  { icon: Anchor, name: 'Accastillage inox', count: 45, color: '#0f766e', img: '/photos/hardware.jpg' },
  { icon: ShieldCheck, name: 'Securite marine', count: 28, color: '#2563eb', img: '/photos/navigation.jpg' },
  { icon: Truck, name: 'Transport & logistique', count: 12, color: '#7c3aed', img: '/photos/cargo.jpg' },
  { icon: Package, name: 'Equipement bateau', count: 35, color: '#0891b2', img: '/photos/seat.jpg' },
  { icon: Ship, name: 'Navigation & pilotage', count: 22, color: '#ea580c', img: '/photos/compass.jpg' },
  { icon: Sparkles, name: 'Sellerie & confort', count: 18, color: '#16a34a', img: '/photos/seat.jpg' },
];

const featuredProducts = [
  { name: 'Compas Plastimo 150mm', price: '186 EUR', supplier: 'SVB', img: '/photos/compass.jpg' },
  { name: 'Taquet inox 316 200mm', price: '32,73 EUR', supplier: 'SVB', img: '/photos/hardware.jpg' },
  { name: 'Bow roller BR1', price: '439 $', supplier: 'Mantus', img: '/photos/anchor.jpg' },
  { name: 'Ancre M1 17lbs', price: '371 $', supplier: 'Mantus', img: '/photos/anchor.jpg' },
  { name: 'Siege pilote double', price: 'Sur devis', supplier: 'Ullman', img: '/photos/seat.jpg' },
  { name: 'Echelle inox 4 marches', price: '125 EUR', supplier: 'Osculati', img: '/photos/ladder.jpg' },
];

export function HomePage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(waMessage(`Bonjour IKABAY, je souhaite recevoir le catalogue complet des fournisseurs. Mon email : ${email}`));
  };

  return (
    <section className="pageSection">

      {/* ─── HERO SECTION WITH REAL PHOTO ─── */}
      <div style={{
        borderRadius: 28, marginBottom: 40, position: 'relative', overflow: 'hidden',
        minHeight: 500, display: 'flex', alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `url('/photos/caribbean.jpg') center/cover no-repeat`,
          filter: 'brightness(0.4)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '60px 48px', maxWidth: 700 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
            padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 16,
            color: 'white', border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Sparkles size={14} /> 8 fournisseurs verifies • Livraison Martinique
          </div>
          <h1 style={{ color: 'white', fontSize: 48, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.1 }}>
            Sourcing nautique<br />pour la Caraibe
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 18, lineHeight: 1.6, marginBottom: 28, maxWidth: 500 }}>
            Trouvez, comparez et commandez vos equipements nautiques aux meilleurs prix. 
            Fournisseurs Europe et Asie verifies, livraison Martinique, support WhatsApp 24/7.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/catalogue" style={{
              background: 'white', color: '#0f766e', padding: '16px 32px',
              borderRadius: 14, fontWeight: 800, fontSize: 15, textDecoration: 'none',
              boxShadow: '0 12px 32px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 8
            }}>
              <Package size={20} /> Decouvrir le catalogue
            </Link>
            <a href={waMessage('Bonjour IKABAY ! Je souhaite un devis pour mon projet.')}
              target="_blank" rel="noreferrer" style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
                color: 'white', padding: '16px 32px', borderRadius: 14, fontWeight: 800, fontSize: 15,
                textDecoration: 'none', border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
              <MessageCircle size={20} /> Devis WhatsApp
            </a>
          </div>
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

      {/* ─── CATEGORIES WITH PHOTOS ─── */}
      <div className="sectionTitle">
        <h2>Categories</h2>
        <Link to="/catalogue" style={{ color: '#0f766e', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          Tout voir <ArrowRight size={16} />
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12, marginBottom: 40 }}>
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Link to="/catalogue" key={i} style={{
              borderRadius: 14, overflow: 'hidden', textDecoration: 'none',
              position: 'relative', height: 160, display: 'block'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `url('${cat.img}') center/cover no-repeat`,
                filter: 'brightness(0.5)',
                transition: 'transform 0.3s',
              }} />
              <div style={{
                position: 'relative', zIndex: 1, padding: 16, height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${cat.color}cc`, color: 'white',
                  display: 'grid', placeItems: 'center', marginBottom: 8
                }}>
                  <Icon size={20} />
                </div>
                <div style={{ fontWeight: 700, color: 'white', fontSize: 15 }}>{cat.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{cat.count} produits</div>
              </div>
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
                <span className="badge" style={{ background: sup.color, fontSize: 11, padding: '3px 10px' }}>{sup.badge}</span>
                <span style={{ fontSize: 12, color: '#8a9b97' }}>
                  {[...Array(5)].map((_, i) => i < sup.rating ? '\u2605' : '\u2606').join('')}
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#60716f', margin: '0 0 6px' }}>{sup.desc}</p>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#8a9b97', flexWrap: 'wrap' }}>
                <span><Globe2 size={12} /> {sup.country}</span>
                <span><Package size={12} /> {sup.products}</span>
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

      {/* ─── FEATURED PRODUCTS WITH REAL PHOTOS ─── */}
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
              height: 200, 
              background: `url('${p.img}') center/cover no-repeat`,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute', top: 10, right: 10,
                background: '#0f766e', color: 'white', padding: '4px 10px',
                borderRadius: 8, fontSize: 11, fontWeight: 700
              }}>
                {p.supplier}
              </div>
            </div>
            <div style={{ padding: 16 }}>
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
            { icon: Search, step: '1', title: 'Besoin', desc: 'Decrivez votre besoin' },
            { icon: Globe2, step: '2', title: 'Sourcing', desc: '8 fournisseurs consultes' },
            { icon: BarChart3, step: '3', title: 'Comparaison', desc: 'Tableau prix / delais' },
            { icon: ClipboardCheck, step: '4', title: 'Devis', desc: '3 propositions detailles' },
            { icon: Truck, step: '5', title: 'Livraison', desc: 'Fret maritime Martinique' },
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
        borderRadius: 24, overflow: 'hidden', marginBottom: 40,
        position: 'relative', minHeight: 300, display: 'flex', alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `url('/photos/cargo.jpg') center/cover no-repeat`,
          filter: 'brightness(0.35)',
        }} />
        <div style={{
          position: 'relative', zIndex: 1, padding: '48px', textAlign: 'center',
          width: '100%', color: 'white'
        }}>
          <MessageCircle size={48} style={{ marginBottom: 12 }} />
          <h2 style={{ color: 'white', margin: '0 0 8px', fontSize: 28 }}>
            Besoin d'un devis ou d'un conseil ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 500, margin: '0 auto 24px', fontSize: 16 }}>
            Notre equipe vous repond sous 24h sur WhatsApp. Devis gratuit, accompagnement personnalise.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 500, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="Votre email" value={email} 
              onChange={e => setEmail(e.target.value)} required style={{
              flex: 1, minWidth: 200, padding: '14px 20px', borderRadius: 12, border: 'none', fontSize: 14
            }} />
            <button type="submit" style={{
              padding: '14px 24px', borderRadius: 12, fontWeight: 800, fontSize: 14,
              background: '#25D366', color: 'white', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <MessageCircle size={18} /> Recevoir le catalogue
            </button>
          </form>
        </div>
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

export default HomePage;
