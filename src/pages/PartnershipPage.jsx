import { Link } from 'react-router-dom';
import { Boxes, CheckCircle2, FileCheck2, Handshake, Recycle, ShieldCheck, Truck, Users } from 'lucide-react';

export default function PartnershipPage() {
  return (
    <section className="pageSection" style={{ paddingTop: 36 }}>
      <section className="hero" style={{ marginBottom: 26 }}>
        <div className="badge"><Handshake size={14} /> Proposition de partenariat — à contractualiser</div>
        <h1>Construire une marketplace locale utile,<br />avec une logistique maîtrisée.</h1>
        <p style={{ maxWidth: 820 }}>
          IKABAY organise un pilote de sourcing, stock local, catalogue fournisseur, seconde vie et transport pour la Martinique et la Caraïbe. Cette page présente le cadre de collaboration ; elle ne vaut ni contrat, ni exclusivité, ni engagement de volume.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
          <Link to="/marketplace" className="btn btnPrimary">Voir la marketplace</Link>
          <Link to="/transport" className="btn btnSecondary">Voir la logistique</Link>
        </div>
      </section>

      <div className="sectionTitle"><h2>Ce que chaque partenaire peut apporter</h2><p>Un rôle clair, mesurable et validé avant toute exploitation commerciale.</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 30 }}>
        <div className="card" style={{ padding: 18 }}><Users size={22} /><h3>Réseau & débouchés</h3><p style={{ color: '#60716f' }}>Identifier clients, revendeurs, distributeurs, artisans et besoins réels du territoire.</p></div>
        <div className="card" style={{ padding: 18 }}><Boxes size={22} /><h3>IKABAY</h3><p style={{ color: '#60716f' }}>Centraliser catalogue, demandes, références, stock local vérifié, sourcing et comparaison de coûts.</p></div>
        <div className="card" style={{ padding: 18 }}><Truck size={22} /><h3>Transport & logistique</h3><p style={{ color: '#60716f' }}>Comparer les solutions, consolider les flux et confirmer le coût rendu avant paiement. Meridian est une option identifiée, à contractualiser et comparer.</p></div>
        <div className="card" style={{ padding: 18 }}><Recycle size={22} /><h3>Seconde vie</h3><p style={{ color: '#60716f' }}>Publier du reconditionné ou de l’occasion uniquement avec état, photos, défauts et conditions de garantie documentés.</p></div>
      </div>

      <div className="sectionTitle"><h2>Pilote proposé</h2><p>Valider la chaîne complète sur un périmètre court avant montée en charge.</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 14, marginBottom: 30 }}>
        <div className="card" style={{ padding: 18 }}><span className="badge">1</span><h3>Choisir</h3><p style={{ color: '#60716f' }}>Une sélection courte de produits à besoin réel et marge maîtrisable.</p></div>
        <div className="card" style={{ padding: 18 }}><span className="badge">2</span><h3>Vérifier</h3><p style={{ color: '#60716f' }}>Stock, fournisseur, prix, fret, taxes/frais connus et délai.</p></div>
        <div className="card" style={{ padding: 18 }}><span className="badge">3</span><h3>Vendre</h3><p style={{ color: '#60716f' }}>Tester commandes et retours clients sans automatiser l’achat fournisseur avant validation humaine.</p></div>
        <div className="card" style={{ padding: 18 }}><span className="badge">4</span><h3>Mesurer</h3><p style={{ color: '#60716f' }}>Marge, coût rendu, délai, retours, rotation et satisfaction.</p></div>
      </div>

      <section className="card" style={{ padding: 24, background: '#f8fafc' }}>
        <h2 style={{ marginTop: 0 }}><ShieldCheck size={21} /> Cadre de confiance</h2>
        <p style={{ color: '#516866', lineHeight: 1.65 }}>
          Le partenariat doit préciser responsabilités, données, assurances, facturation, paiement, retours, propriété intellectuelle et règles de communication. Les prévisions restent distinctes des ventes réalisées. Aucun fournisseur, transporteur ou partenaire n’est présenté comme exclusif ou engagé sans accord écrit.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          <span className="badge"><CheckCircle2 size={13} /> API & suivi contrôlés</span>
          <span className="badge"><FileCheck2 size={13} /> Convention pilote à signer</span>
          <span className="badge"><Handshake size={13} /> Décision après résultats</span>
        </div>
      </section>
    </section>
  );
}
