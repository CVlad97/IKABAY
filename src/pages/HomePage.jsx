import { useState } from 'react';
import {
  Store, Anchor, Truck, MessageCircle, Ship, Search,
  FileText, ClipboardCheck, BarChart3, Phone, Mail, CheckCircle, 
  Package, Globe2, Star, TrendingUp, DollarSign, ArrowRight, 
  Tags, ShieldCheck, Users, Sparkles, MapPin, Clock, ShoppingCart,
  Gift, Share2, Heart, Zap, Award, Percent, Copy, ThumbsUp, Calculator
} from 'lucide-react';
import { WHATSAPP_URL, APP_NAME, waMessage } from '../utils/constants';
import { Link } from 'react-router-dom';
import { VIRAL_FEATURES, calculatePoints, pointsToEUR, getLoyaltyTier } from '../data/viral';

const stats = [
  { icon: MapPin, value: 'Martinique', label: 'Base opérationnelle', detail: 'Caraïbe étudiée au cas par cas' },
  { icon: Package, value: 'Catalogue', label: 'Produits & sourcing', detail: 'Prix et disponibilité à confirmer' },
  { icon: Search, value: 'Sourcing', label: 'Recherche multi-fournisseurs', detail: 'Selon votre besoin' },
  { icon: MessageCircle, value: 'WhatsApp', label: 'Canal commercial direct', detail: 'Échange humain avant validation' },
]

const suppliers = [
  { name: 'SVB', country: 'Allemagne', color: '#0f766e', desc: 'Source identifiée pour le nautisme. Prix, stock et délai sont reconfirmés avant devis.' },
  { name: 'Mantus Marine', country: 'USA', color: '#2563eb', desc: 'Source identifiée pour l’ancrage et l’accastillage. Conditions à reconfirmer avant commande.' },
  { name: 'Osculati', country: 'Italie', color: '#7c3aed', desc: 'Source catalogue identifiée pour l’accastillage. Disponibilité et tarif à vérifier au moment du besoin.' },
  { name: 'Quick Group', country: 'Italie', color: '#0891b2', desc: 'Source identifiée pour équipements d’ancrage. Conditions commerciales à confirmer.' },
  { name: 'Besenzoni', country: 'Italie', color: '#ea580c', desc: 'Source identifiée pour équipements nautiques. Devis et délais à confirmer.' },
  { name: 'Lewmar', country: 'Royaume-Uni', color: '#16a34a', desc: 'Source identifiée pour l’accastillage marine. Devis et disponibilité à confirmer.' },
]

const categories = [
  { icon: Anchor, name: 'Accastillage inox', count: 45, color: '#0f766e', img: '/photos/hardware.jpg' },
  { icon: ShieldCheck, name: 'Securite marine', count: 28, color: '#2563eb', img: '/photos/navigation.jpg' },
  { icon: Truck, name: 'Transport & logistique', count: 12, color: '#7c3aed', img: '/photos/cargo.jpg' },
  { icon: Package, name: 'Equipement bateau', count: 35, color: '#0891b2', img: '/photos/seat.jpg' },
  { icon: Ship, name: 'Navigation & pilotage', count: 22, color: '#ea580c', img: '/photos/compass.jpg' },
  { icon: Sparkles, name: 'Sellerie & confort', count: 18, color: '#16a34a', img: '/photos/seat.jpg' },
];

const featuredProducts = [
  { name: 'Compas marine', price: 'Prix à confirmer', supplier: 'Catalogue', img: '/photos/compass.jpg' },
  { name: 'Taquet inox 316', price: 'Prix à confirmer', supplier: 'Catalogue', img: '/photos/hardware.jpg' },
  { name: 'Davier / bow roller', price: 'Sur devis', supplier: 'Sourcing', img: '/photos/anchor.jpg' },
  { name: 'Équipement d’ancrage', price: 'Sur devis', supplier: 'Sourcing', img: '/photos/anchor.jpg' },
  { name: 'Siège pilote', price: 'Sur devis', supplier: 'Sourcing', img: '/photos/seat.jpg' },
  { name: 'Échelle inox', price: 'Prix à confirmer', supplier: 'Catalogue', img: '/photos/ladder.jpg' },
]

export function HomePage() {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [showReferral, setShowReferral] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(waMessage(`Bonjour IKABAY, je souhaite recevoir le catalogue complet des fournisseurs. Mon email : ${email}`));
  };

  const handleCopyReferral = () => {
    const code = 'IKABAY' + Math.random().toString(36).substring(2, 6).toUpperCase();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    window.open(waMessage(VIRAL_FEATURES.sharing.message_whatsapp));
  };

  return (
    <section className="pageSection">

      {/* ─── DOM-TOM COMMERCIAL BANNER ─── */}
      <div style={{ background: 'linear-gradient(90deg, #0b2b3c 0%, #1a7a7d 60%, #e8774e 100%)', color: '#fff', padding: '10px 20px', textAlign: 'center', fontSize: 13, fontWeight: 700, letterSpacing: 0.4, borderRadius: 12, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span>📍 Base Martinique — livraison selon produit et destination</span>
        <span style={{ opacity: 0.7 }}>|</span>
        <span>Fiscalité et frais réels selon produit et destination — à confirmer</span>
        <span style={{ opacity: 0.7 }}>|</span>
        <a href="https://wa.me/596696653589" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 800 }}>WhatsApp +596 696 65 35 89 →</a>
      </div>

      {/* ─── HERO SECTION ─── */}
      <div style={{
        borderRadius: 28, marginBottom: 32, position: 'relative', overflow: 'hidden',
        minHeight: 460, display: 'flex', alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `url('/photos/caribbean.jpg') center/cover no-repeat`,
          filter: 'brightness(0.4)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '48px 40px', maxWidth: 700 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
            padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 16,
            color: 'white', border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Sparkles size={14} /> Sourcing multi-fournisseurs • Base Martinique • Conditions confirmées au devis
          </div>
          <h1 style={{ color: 'white', fontSize: 42, fontWeight: 900, margin: '0 0 12px', lineHeight: 1.1 }}>
            Sourcing nautique<br />pour la Caraibe
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, lineHeight: 1.6, marginBottom: 24, maxWidth: 500 }}>
            Trouvez et comparez des options pour vos équipements nautiques et techniques.
            Les prix, stocks, délais, frais et conditions sont reconfirmés avant toute validation.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/catalogue" style={{
              background: 'white', color: '#0f766e', padding: '14px 28px',
              borderRadius: 14, fontWeight: 800, fontSize: 14, textDecoration: 'none',
              boxShadow: '0 12px 32px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: 8
            }}>
              <Package size={20} /> Decouvrir le catalogue
            </Link>
            <a href={waMessage('Bonjour IKABAY ! Je souhaite un devis.')}
              target="_blank" rel="noreferrer" style={{
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
                color: 'white', padding: '14px 28px', borderRadius: 14, fontWeight: 800, fontSize: 14,
                textDecoration: 'none', border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
              <MessageCircle size={20} /> Demander un devis
            </a>
          </div>
        </div>
      </div>

      {/* ─── STATS ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 32 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: '#e7fbf7', color: '#0f766e',
                display: 'grid', placeItems: 'center', margin: '0 auto 10px'
              }}>
                <Icon size={24} />
              </div>
              <strong style={{ fontSize: 28, color: '#1a2e2b', display: 'block' }}>{s.value}</strong>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#60716f' }}>{s.label}</span>
              <p style={{ fontSize: 11, color: '#8a9b97', margin: '4px 0 0' }}>{s.detail}</p>
            </div>
          );
        })}
      </div>

      {/* ─── CATEGORIES ─── */}
      <div className="sectionTitle">
        <h2>Categories</h2>
        <Link to="/catalogue" style={{ color: '#0f766e', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          Tout voir <ArrowRight size={16} />
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 32 }}>
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Link to="/catalogue" key={i} style={{
              borderRadius: 14, overflow: 'hidden', textDecoration: 'none',
              position: 'relative', height: 150, display: 'block'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `url('${cat.img}') center/cover no-repeat`,
                filter: 'brightness(0.5)',
              }} />
              <div style={{
                position: 'relative', zIndex: 1, padding: 14, height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `${cat.color}cc`, color: 'white',
                  display: 'grid', placeItems: 'center', marginBottom: 6
                }}>
                  <Icon size={18} />
                </div>
                <div style={{ fontWeight: 700, color: 'white', fontSize: 14 }}>{cat.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Voir le catalogue</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── SUPPLIERS ─── */}
      <div className="sectionTitle">
        <h2>Sources fournisseurs étudiées</h2>
        <Link to="/sourcing" style={{ color: '#0f766e', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          Demander une recherche <ArrowRight size={16} />
        </Link>
      </div>
      <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
        {suppliers.slice(0, 3).map((sup, i) => (
          <div key={i} className="card" style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: `${sup.color}15`, color: sup.color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Store size={24} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 16 }}>{sup.name}</div>
              <p style={{ fontSize: 12, color: '#60716f', margin: '2px 0 0' }}>{sup.desc}</p>
            </div>
            <Link to="/sourcing" style={{ background: sup.color, color: 'white', padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 12, textDecoration: 'none' }}>
              Demander <ArrowRight size={12} />
            </Link>
          </div>
        ))}
        <Link to="/sourcing" style={{ textAlign: 'center', padding: 12, color: '#0f766e', fontWeight: 700, fontSize: 14 }}>
          Besoin d’une autre référence ? Lancez une demande de sourcing →
        </Link>
      </div>

      {/* ─── FEATURED PRODUCTS ─── */}
      <div className="sectionTitle">
        <h2>Produits a la une</h2>
        <Link to="/catalogue" style={{ color: '#0f766e', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          Voir tout <ArrowRight size={16} />
        </Link>
      </div>
      <div className="cardGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginBottom: 32 }}>
        {featuredProducts.slice(0, 4).map((p, i) => (
          <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: 160, background: `url('${p.img}') center/cover no-repeat`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 8, right: 8, background: '#0f766e', color: 'white', padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>
                {p.supplier}
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontWeight: 800, color: '#1a2e2b', fontSize: 14, marginBottom: 6 }}>{p.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#0f766e' }}>{p.price}</span>
                <Link to="/catalogue" style={{ background: '#0f766e', color: 'white', padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>Voir</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── PROCESS ─── */}
      <div style={{ background: 'white', borderRadius: 20, padding: 28, marginBottom: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: 24 }}>Comment ca marche</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {[
            { icon: Search, step: '1', title: 'Besoin', desc: 'Decrivez votre besoin' },
            { icon: Globe2, step: '2', title: 'Sourcing', desc: 'Recherche de sources adaptées' },
            { icon: BarChart3, step: '3', title: 'Comparaison', desc: 'Tableau prix / delais' },
            { icon: ClipboardCheck, step: '4', title: 'Devis', desc: 'Proposition selon options disponibles' },
            { icon: Truck, step: '5', title: 'Livraison', desc: 'Transport confirmé avant validation' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 26, background: '#0f766e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: 20, fontWeight: 800 }}>
                  {item.step}
                </div>
                <div style={{ fontWeight: 700, color: '#1a2e2b', marginBottom: 2, fontSize: 14 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#60716f' }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── CTA WHATSAPP ─── */}
      <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 32, position: 'relative', minHeight: 260, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: `url('/photos/cargo.jpg') center/cover no-repeat`, filter: 'brightness(0.35)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '40px 32px', textAlign: 'center', width: '100%', color: 'white' }}>
          <MessageCircle size={40} style={{ marginBottom: 10 }} />
          <h2 style={{ color: 'white', margin: '0 0 6px', fontSize: 24 }}>Besoin d'un devis ?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 450, margin: '0 auto 20px', fontSize: 14 }}>
            Échange commercial via WhatsApp ou email. Prix, disponibilité, transport et conditions sont confirmés au devis.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 450, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="Votre email" value={email} onChange={e => setEmail(e.target.value)} required style={{
              flex: 1, minWidth: 180, padding: '12px 18px', borderRadius: 12, border: 'none', fontSize: 13
            }} />
            <button type="submit" style={{
              padding: '12px 22px', borderRadius: 12, fontWeight: 800, fontSize: 13,
              background: '#25D366', color: 'white', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              <MessageCircle size={18} /> Recevoir le catalogue
            </button>
          </form>
        </div>
      </div>

      {/* ─── BOTTOM LINKS ─── */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
        <Link to="/catalogue" className="btn btnPrimary" style={{ padding: '10px 20px', borderRadius: 12, fontWeight: 800, fontSize: 13 }}>
          <Package size={16} /> Catalogue
        </Link>
        <Link to="/devis" className="btn btnSecondary" style={{ padding: '10px 20px', borderRadius: 12, fontWeight: 800, fontSize: 13 }}>
          <FileText size={16} /> Devis
        </Link>
        <Link to="/legal" className="btn btnSecondary" style={{ padding: '10px 20px', borderRadius: 12, fontWeight: 800, fontSize: 13 }}>
          <Calculator size={16} /> Prix DOM
        </Link>
      </div>

    </section>
  );
}

export default HomePage;