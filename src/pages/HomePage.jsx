import { Link } from 'react-router-dom';
import { Anchor, CheckCircle, Globe2, MessageCircle, Package, Search, ShoppingCart, Truck } from 'lucide-react';
import { localStockProducts } from '../data/localStock';
import { waMessage } from '../utils/constants';

const HOME_CATEGORIES = [
  ['📱','Téléphone'], ['🏠','Maison'], ['🍳','Cuisine'], ['✨','Beauté'], ['🏋️','Sport'], ['🚗','Auto / Moto'], ['🌴','Jardin'], ['🧳','Voyage'], ['🐾','Animaux'], ['👶','Bébé'], ['⚓','Marine'], ['💻','Bureau'],
];

const euro = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

export default function HomePage() {
  const featuredLocal = localStockProducts.slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="badge"><Anchor size={14} /> IKABAY Martinique</div>
        <h1>Votre marketplace Martinique & Caraïbes<br />du stock local au sourcing international</h1>
        <p style={{ maxWidth: 760 }}>
          Recherchez parmi plusieurs univers : maison, téléphone, cuisine, beauté, sport, auto, voyage, marine et plus encore. Le stock local, le catalogue fournisseur, le reconditionné et le sourcing sont clairement séparés. Disponibilité, livraison et prix final sont confirmés avant paiement.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
          <Link className="btn btnPrimary" to="/destockage"><Package size={17} /> Voir le stock local</Link>
          <Link className="btn btnSecondary" to="/marketplace"><Search size={17} /> Rechercher un produit</Link>
        </div>
      </section>

      <section className="pageSection" style={{ paddingTop: 16 }}>
        <div className="sectionTitle"><h2>Explorer les univers IKABAY</h2><p>Un point d’entrée multi-catégories ; les références fournisseur sont vérifiées avant commande.</p></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: 10 }}>
          {HOME_CATEGORIES.map(([emoji, label]) => (
            <Link key={label} to="/marketplace" className="card" style={{ textDecoration: 'none', color: 'inherit', padding: 14, display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontSize: 25 }}>{emoji}</span><strong style={{ fontSize: 13 }}>{label}</strong>
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 14 }}>
          <Link className="btn btnSecondary" to="/showroom">Showroom & reconditionné</Link>
          <Link className="btn btnSecondary" to="/marine">IKABAY Marine</Link>
          <Link className="btn btnSecondary" to="/suivi">Suivre une demande</Link>
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionTitle">
          <h2>Disponible en Martinique</h2>
          <p>Déstockage et occasion nautique avec quantités enregistrées.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
          {featuredLocal.map((product) => (
            <article key={product.reference} className="card" style={{ padding: 16 }}>
              <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}><CheckCircle size={13} /> En stock</span>
              <h3 style={{ fontSize: 16, margin: '10px 0 4px' }}>{product.name}</h3>
              <div style={{ fontSize: 12, color: '#60716f' }}>Réf. {product.reference} · stock {product.stock}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#0a4a5c', marginTop: 10 }}>{euro(product.price)}</div>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 16 }}><Link className="btn btnPrimary" to="/destockage">Voir tout le stock local</Link></div>
      </section>

      <section className="pageSection" style={{ paddingTop: 10 }}>
        <div className="sectionTitle"><h2>Comment commander</h2><p>Un parcours simple pour les premières commandes.</p></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14 }}>
          <div className="card" style={{ padding: 18 }}><ShoppingCart size={22} /><h3>1. Choisissez</h3><p style={{ color: '#60716f' }}>Sélectionnez un article local ou un produit de la boutique internationale.</p></div>
          <div className="card" style={{ padding: 18 }}><Truck size={22} /><h3>2. Nous vérifions</h3><p style={{ color: '#60716f' }}>Stock, variante, livraison Martinique et prix final sont confirmés.</p></div>
          <div className="card" style={{ padding: 18 }}><MessageCircle size={22} /><h3>3. Confirmez</h3><p style={{ color: '#60716f' }}>Votre commande est reprise sur WhatsApp avant paiement.</p></div>
        </div>
      </section>

      <section className="pageSection" style={{ paddingTop: 10 }}>
        <div className="card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div><div className="badge"><Globe2 size={14} /> Recherche internationale</div><h2 style={{ marginBottom: 6 }}>Vous ne trouvez pas votre produit ?</h2><p style={{ margin: 0, color: '#60716f' }}>Envoyez une photo, une référence ou le nom du produit.</p></div>
          <a className="btn btnPrimary" href={waMessage('Bonjour IKABAY, je recherche ce produit :')} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Demander sur WhatsApp</a>
        </div>
      </section>
    </>
  );
}
