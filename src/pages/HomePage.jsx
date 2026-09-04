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
        <span>📍 Martinique 97200 — Livraison rendue</span>
        <span style={{ opacity: 0.7 }}>|</span>
        <span>TVA 8,5% DOM + Octroi 4% — Exonération IS locale</span>
        <span style={{ opacity: 0.7 }}>|</span>
        <a href="https://wa.me/596696653589" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 800 }}>WhatsApp +596 696 65 35 89 →</a>
      </div>

      {/* ─── REFERRAL BANNER ─── */}
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        borderRadius: 16, padding: '16px 24px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        color: 'white',
      }}>
        <Gift size={24} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <strong style={{ fontSize: 16 }}>🎉 Programme de parrainage</strong>
          <p style={{ margin: '4px 0 0', fontSize: 13, opacity: 0.9 }}>
            Parrainez un ami : {VIRAL_FEATURES.referral.prime_parrain}€ offerts pour vous + {VIRAL_FEATURES.referral.prime_filleul}€ pour votre filleul
          </p>
        </div>
        <button onClick={handleCopyReferral} style={{
          background: 'white', color: '#f97316', border: 'none', padding: '8px 20px',
          borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap'
        }}>
          <Copy size={16} /> {copied ? 'Copie !' : 'Obtenir mon code'}
        </button>
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
            <Sparkles size={14} /> Fournisseurs vérifiés • Livraison Martinique • Prix DOM
          </div>
          <h1 style={{ color: 'white', fontSize: 42, fontWeight: 900, margin: '0 0 12px', lineHeight: 1.1 }}>
            Sourcing nautique<br />pour la Caraibe
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, lineHeight: 1.6, marginBottom: 24, maxWidth: 500 }}>
            Trouvez, comparez et commandez vos equipements nautiques avec un prix étudié et transparent. 
            Fournisseurs Europe et Asie verifies, livraison Martinique, frais réels clarifiés.
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
              <MessageCircle size={20} /> Devis gratuit
            </a>
          </div>
        </div>
      </div>

      {/* ─── LOYALTY POINTS STRIP ─── */}
      <div style={{
        background: 'white', borderRadius: 16, padding: 20, marginBottom: 32,
        display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 200 }}>
          <Award size={28} color="#f59e0b" />
          <div>
            <strong>Ikabay Miles</strong>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#60716f' }}>
              1€ = 1 point • 500 points = 25€ de réduction
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {VIRAL_FEATURES.loyalty.statuts.map((tier, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '4px 10px', borderRadius: 8, background: '#f8f9fa' }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: tier.couleur, margin: '0 auto 2px' }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1a2e2b' }}>{tier.nom}</div>
              <div style={{ fontSize: 10, color: '#8a9b97' }}>{tier.avantages}</div>
            </div>
          ))}
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

      {/* ─── VS CONCURRENCE ─── */}
      <div style={{ background: 'white', borderRadius: 20, padding: 28, marginBottom: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <h2 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={22} color="#f59e0b" /> Pourquoi nous vs la concurrence ?
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 500 }}>
            <thead>
              <tr style={{ background: '#0f766e', color: 'white' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>Critere</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', background: '#0d9488' }}>🔥 IKABAY</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>AutoDS</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Nautech</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Amazon</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Prix DOM (TVA 8.5%)', '✅ Applique', '❌', '✅', '❌'],
                ['Support WhatsApp 24/7', '✅ Gratuit', '❌ Payant', '❌', '❌'],
                ['Sourcing express 24h', '✅ Inclus', '❌', '❌', '❌'],
                ['Parrainage 15€/10€', '✅ Oui', '❌ Non', '❌ Non', '✅ Partiel'],
                ['Points fidelite', '✅ Ikabay Miles', '❌ Non', '❌ Non', '❌ Non'],
                ['Meilleur prix garanti', '✅ -5%', '❌', '❌', '✅ Partiel'],
                ['Paiement 3x/4x sans frais', '✅ Oui', '❌', '❌', '✅ Oui'],
                ['Livraison Martinique pro', '✅ 8-12j', '❌ 15-25j', '✅ 10-15j', '❌ 20-30j'],
                ['Frais caches', '✅ Aucun', '❌ 2% frais', '❌', '❌'],
                ['Abonnement mensuel', '✅ 0€', '❌ 30€/mois', '❌ Sur devis', '✅ 0€'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e8f0ee' }}>
                  <td style={{ padding: '8px 14px', fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ padding: '8px 14px', textAlign: 'center', fontWeight: 700, color: '#16a34a', background: '#f0fdf4' }}>{row[1]}</td>
                  <td style={{ padding: '8px 14px', textAlign: 'center', color: row[2].includes('✅') ? '#16a34a' : '#dc2626' }}>{row[2]}</td>
                  <td style={{ padding: '8px 14px', textAlign: 'center', color: row[3].includes('✅') ? '#16a34a' : '#dc2626' }}>{row[3]}</td>
                  <td style={{ padding: '8px 14px', textAlign: 'center', color: row[4].includes('✅') ? '#16a34a' : '#dc2626' }}>{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── GUARANTEES ─── */}
      <div className="sectionTitle">
        <h2>Nos garanties</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginBottom: 32 }}>
        {VIRAL_FEATURES.guarantees.map((g, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{g.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#1a2e2b', marginBottom: 4 }}>{g.title}</div>
            <p style={{ fontSize: 13, color: '#60716f', margin: '0 0 8px' }}>{g.desc}</p>
            <span className="badge" style={{ background: '#e7fbf7', color: '#0f766e', fontSize: 11, padding: '3px 8px' }}>{g.promo}</span>
          </div>
        ))}
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
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{cat.count} produits</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── SUPPLIERS ─── */}
      <div className="sectionTitle">
        <h2>Nos fournisseurs</h2>
        <Link to="/fournisseurs" style={{ color: '#0f766e', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          Tous <ArrowRight size={16} />
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
            <Link to="/rfq" style={{ background: sup.color, color: 'white', padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 12, textDecoration: 'none' }}>
              Prix <ArrowRight size={12} />
            </Link>
          </div>
        ))}
        <Link to="/fournisseurs" style={{ textAlign: 'center', padding: 12, color: '#0f766e', fontWeight: 700, fontSize: 14 }}>
          + 3 autres fournisseurs (Voir tout) →
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

      {/* ─── SHARE / VIRAL ─── */}
      <div style={{ background: 'white', borderRadius: 20, padding: 28, marginBottom: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <h2 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Share2 size={20} color="#0f766e" /> Partagez et gagnez
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
          <div style={{ padding: 20, background: '#f0fdf4', borderRadius: 14 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🗣️</div>
            <strong>Parrainage</strong>
            <p style={{ fontSize: 13, color: '#60716f', margin: '4px 0' }}>
              Chaque ami parraine = {VIRAL_FEATURES.referral.prime_parrain}€ pour vous + {VIRAL_FEATURES.referral.prime_filleul}€ pour lui
            </p>
            <button onClick={handleCopyReferral} style={{
              background: '#0f766e', color: 'white', border: 'none', padding: '8px 18px',
              borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', marginTop: 8
            }}>
              <Copy size={14} /> {copied ? 'Code copie !' : 'Obtenir mon code'}
            </button>
          </div>
          <div style={{ padding: 20, background: '#fef3c7', borderRadius: 14 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⭐</div>
            <strong>Points Ikabay Miles</strong>
            <p style={{ fontSize: 13, color: '#60716f', margin: '4px 0' }}>
              1€ = 1 point • 500 points = 25€ de réduction • 200 points cadeau à la 1ère commande
            </p>
          </div>
          <div style={{ padding: 20, background: '#f0f5f3', borderRadius: 14 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>💬</div>
            <strong>Partage WhatsApp</strong>
            <p style={{ fontSize: 13, color: '#60716f', margin: '4px 0' }}>
              Partagez Ikabay avec vos contacts maritimes
            </p>
            <button onClick={shareOnWhatsApp} style={{
              background: '#25D366', color: 'white', border: 'none', padding: '8px 18px',
              borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', marginTop: 8,
              display: 'inline-flex', alignItems: 'center', gap: 6
            }}>
              <Share2 size={14} /> Partager
            </button>
          </div>
        </div>
      </div>

      {/* ─── PROCESS ─── */}
      <div style={{ background: 'white', borderRadius: 20, padding: 28, marginBottom: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: 24 }}>Comment ca marche</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
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
            Reponse sous 24h. Devis gratuit. Parrainage : 15€ offerts des la 1ere commande.
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
        <Link to="/dropshipping" className="btn btnSecondary" style={{ padding: '10px 20px', borderRadius: 12, fontWeight: 800, fontSize: 13 }}>
          <TrendingUp size={16} /> Dropshipping
        </Link>
      </div>

    </section>
  );
}

export default HomePage;