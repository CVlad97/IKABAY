import { Anchor, BadgeCheck, Box, ExternalLink, FileSpreadsheet, Globe2, PackageSearch, Ship, Tags, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MARINE_FOCUS_CATEGORIES, MARINE_SUPPLIERS } from '../data/marineSuppliers';
import { waMessage } from '../utils/constants';

const statusLabel = {
  'dealer-public': 'Programme revendeur public',
  'catalogue-public': 'Catalogue public',
  'wholesale-public': 'Grossiste / fabricant',
  'a-qualifier': 'Accès pro à qualifier',
};

export default function MarinePage() {
  return (
    <section className="pageSection" style={{ paddingTop: 36 }}>
      <div style={{
        background: 'linear-gradient(135deg,#082f49,#0f766e 60%,#155e75)',
        color: 'white', borderRadius: 28, padding: 'clamp(28px,5vw,54px)', marginBottom: 28
      }}>
        <div className="badge" style={{ background: 'rgba(255,255,255,.14)', color: 'white', border: '1px solid rgba(255,255,255,.25)' }}>
          <Anchor size={15} /> IKABAY Marine
        </div>
        <h1 style={{ color: 'white', fontSize: 'clamp(36px,6vw,62px)', lineHeight: 1.02, margin: '14px 0' }}>
          Le catalogue nautique multi-fournisseurs pour la Martinique
        </h1>
        <p style={{ maxWidth: 820, color: 'rgba(255,255,255,.9)', fontSize: 17, lineHeight: 1.65 }}>
          Un seul point d’entrée pour rechercher une référence, comparer plusieurs fournisseurs, consolider le transport et obtenir un coût rendu Martinique avant validation.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
          <Link to="/catalogue" className="btn" style={{ background: 'white', color: '#0a4a5c', fontWeight: 900 }}>Voir les références déjà intégrées</Link>
          <a href={waMessage('Bonjour IKABAY Marine, je cherche une référence nautique précise.')} className="btn" style={{ background: 'rgba(255,255,255,.14)', color: 'white', border: '1px solid rgba(255,255,255,.25)' }}>Demander un sourcing</a>
        </div>
      </div>

      <div className="sectionTitle"><h2>Rayons prioritaires</h2><p>Les familles issues du sourcing réel déjà réalisé pour des besoins nautiques en Martinique.</p></div>
      <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginBottom: 32 }}>
        {MARINE_FOCUS_CATEGORIES.map((item) => <span key={item} className="badge" style={{ padding: '9px 13px' }}>{item}</span>)}
      </div>

      <div className="sectionTitle"><h2><Globe2 size={24} /> Fournisseurs & fabricants référencés</h2><p>API lorsqu’elle existe ; sinon catalogue, flux revendeur, CSV/XML ou RFQ. Aucun faux connecteur.</p></div>
      <div className="cardGrid" style={{ marginBottom: 34 }}>
        {MARINE_SUPPLIERS.map((supplier) => (
          <article className="card" key={supplier.id} style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
              <div><div style={{ fontSize: 12, color: '#0f766e', fontWeight: 900 }}>{supplier.country}</div><h3 style={{ margin: '4px 0 5px' }}>{supplier.name}</h3><p style={{ margin: 0, color: '#60716f', fontSize: 13 }}>{supplier.role}</p></div>
              <span className="badge" style={{ fontSize: 10 }}>{statusLabel[supplier.status] || supplier.status}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
              {supplier.categories.slice(0, 6).map((category) => <span key={category} style={{ background: '#f3f7f6', padding: '5px 8px', borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{category}</span>)}
            </div>
            <p style={{ color: '#516866', fontSize: 13, lineHeight: 1.5 }}>{supplier.note}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href={supplier.catalogueUrl} target="_blank" rel="noreferrer" className="btn btnSecondary">Catalogue <ExternalLink size={14} /></a>
              <a href={supplier.url} target="_blank" rel="noreferrer" className="btn btnSecondary">Site fournisseur</a>
            </div>
          </article>
        ))}
      </div>

      <div className="sectionTitle"><h2><PackageSearch size={24} /> Comment IKABAY doit fonctionner</h2></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 14, marginBottom: 34 }}>
        {[
          [PackageSearch, '1. Chercher', 'Référence, dimensions, usage ou photo du besoin client.'],
          [FileSpreadsheet, '2. Comparer', 'Prix pro, MOQ, stock, délai, garantie et compatibilité.'],
          [Box, '3. Consolider', 'Regrouper plusieurs fournisseurs dans un même flux lorsque c’est économiquement pertinent.'],
          [Truck, '4. Acheminer', 'Comparer Meridian et les autres solutions selon poids, volume, urgence et destination.'],
          [Tags, '5. Prix rendu', 'Afficher le coût complet avant validation : produit + transport + taxes/frais connus + marge IKABAY.'],
          [BadgeCheck, '6. Sécuriser', 'Ne publier comme disponible que ce qui est vérifié ou clairement marqué à confirmer.'],
        ].map(([Icon, title, text]) => <div className="card" key={title} style={{ padding: 18 }}><Icon size={22} color="#0f766e" /><h3 style={{ margin: '10px 0 6px' }}>{title}</h3><p style={{ color: '#60716f', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{text}</p></div>)}
      </div>

      <section className="card" style={{ padding: 24, background: 'linear-gradient(135deg,#fff7ed,#ffffff)', border: '1px solid #fed7aa' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
          <div><span className="badge" style={{ background: '#ffedd5', color: '#9a3412' }}>Étape suivante</span><h2 style={{ marginBottom: 8 }}>Marque propre IKABAY Marine</h2><p style={{ color: '#6b5b4e', lineHeight: 1.6 }}>À négocier uniquement avec les fabricants qui l’acceptent : emballage IKABAY, gamme courte à rotation forte, MOQ maîtrisé et contrôle qualité. Aucun rebranding sans accord fournisseur.</p></div>
          <div><h3 style={{ marginTop: 0 }}>Positionnement prix</h3><p style={{ color: '#6b5b4e', lineHeight: 1.6 }}>L’objectif n’est pas de casser artificiellement les prix, mais de réduire le coût rendu par négociation pro, consolidation transport et faible structure de coûts. Le comparatif se fait sur le coût total rendu Martinique, pas seulement le prix catalogue.</p></div>
        </div>
      </section>
    </section>
  );
}
