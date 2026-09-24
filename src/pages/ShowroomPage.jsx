import { useEffect, useState } from 'react';
import { BadgeCheck, Boxes, CheckCircle2, Recycle, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProviderStatus } from '../services/dropshippingApi';
import { waMessage } from '../utils/constants';

export default function ShowroomPage() {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getProviderStatus().then((data) => setProviders(data.providers || [])).catch(() => setError('Backend fournisseur indisponible.'));
  }, []);

  const cjReady = providers.some((p) => p.id === 'cj' && p.status === 'configured');

  return <section className="pageSection" style={{ paddingTop: 36 }}>
    <div style={{ background: 'linear-gradient(135deg,#111827,#0f766e 62%,#f59e0b)', color: 'white', borderRadius: 28, padding: 'clamp(30px,5vw,56px)', marginBottom: 28 }}>
      <div className="badge" style={{ background: 'rgba(255,255,255,.14)', color: 'white' }}>IKABAY Showroom</div>
      <h1 style={{ color: 'white', fontSize: 'clamp(38px,6vw,64px)', lineHeight: 1.02, margin: '14px 0' }}>Disponible, reconditionné, bons plans — sans faux stock</h1>
      <p style={{ maxWidth: 850, color: 'rgba(255,255,255,.9)', fontSize: 17, lineHeight: 1.65 }}>IKABAY sépare le catalogue fournisseur, le stock local réellement contrôlé, le reconditionné et les opportunités. Un produit n’est jamais présenté comme “en stock Martinique” sans preuve.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
        <span className="badge" style={{ background: cjReady ? '#dcfce7' : '#fff7ed', color: cjReady ? '#166534' : '#9a3412' }}><CheckCircle2 size={14} /> CJ {cjReady ? 'connecté' : 'à vérifier'}</span>
        <span className="badge" style={{ background: 'rgba(255,255,255,.12)', color: 'white' }}><ShieldCheck size={14} /> Validation avant commande</span>
      </div>
    </div>

    {error && <div style={{ background: '#fff7ed', color: '#9a3412', padding: 14, borderRadius: 14, marginBottom: 18 }}>{error}</div>}

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 30 }}>
      <div className="card" style={{ padding: 18 }}><Boxes size={22} color="#0f766e" /><h3>Catalogue fournisseur</h3><p style={{ color: '#60716f', fontSize: 13 }}>Stock et fret sont vérifiés dans la fiche avant confirmation.</p><Link to="/marketplace" className="btn btnPrimary">Voir la marketplace</Link></div>
      <div className="card" style={{ padding: 18 }}><BadgeCheck size={22} color="#0f766e" /><h3>Stock local Martinique</h3><p style={{ color: '#60716f', fontSize: 13 }}>Uniquement produits comptés physiquement ou attestés par un partenaire local.</p><span className="badge">Aucune offre certifiée publiée</span></div>
      <div className="card" style={{ padding: 18 }}><Recycle size={22} color="#0f766e" /><h3>Reconditionné</h3><p style={{ color: '#60716f', fontSize: 13 }}>État, photos, défauts et garantie doivent être documentés avant publication.</p><a href={waMessage('Bonjour IKABAY, je souhaite proposer un produit reconditionné / seconde vie.')} className="btn btnSecondary">Proposer un produit</a></div>
      <div className="card" style={{ padding: 18 }}><Truck size={22} color="#0f766e" /><h3>Prix rendu & logistique</h3><p style={{ color: '#60716f', fontSize: 13 }}>Produit + transport + taxes/frais connus + service IKABAY.</p><Link to="/transport" className="btn btnSecondary">Calculer le coût rendu</Link></div>
    </div>

    <section className="card" style={{ padding: 24, background: '#f8fafc' }}>
      <h2 style={{ marginTop: 0 }}>Traçabilité</h2>
      <p style={{ color: '#516866', lineHeight: 1.6 }}>Le backend sait enregistrer une demande et le fournisseur sait retourner stock/fret. Le suivi public d’une commande n’est pas encore exposé par une route sécurisée : il reste donc “à confirmer” tant que cette fonction n’est pas ajoutée.</p>
    </section>
  </section>;
}
