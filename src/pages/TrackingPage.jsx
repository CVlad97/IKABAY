import { useState } from 'react';
import { PackageCheck, Search, ShieldCheck, Truck } from 'lucide-react';
import { getOrderTrace } from '../services/dropshippingApi';

const labels = {
  pending_manual_fulfillment: 'Demande reçue — validation manuelle',
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  shipped: 'Expédiée',
  in_transit: 'En transit',
  delivered: 'Livrée',
};

export default function TrackingPage() {
  const [id, setId] = useState('');
  const [contact, setContact] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setOrder(null);
    try {
      const data = await getOrderTrace(id.trim(), contact.trim());
      setOrder(data.order || null);
    } catch (err) {
      if (err.status === 403) setError('La référence existe mais le contact ne correspond pas.');
      else if (err.status === 404) setError('Commande introuvable. Vérifiez la référence.');
      else setError('Suivi indisponible pour le moment.');
    } finally { setLoading(false); }
  };

  return <section className="pageSection" style={{ paddingTop: 42 }}>
    <div className="hero" style={{ marginBottom: 28 }}>
      <div className="badge"><Truck size={15} /> Suivi IKABAY</div>
      <h1>Suivre une commande ou une demande</h1>
      <p>Entrez la référence IKABAY et l’email ou le téléphone utilisé lors de la demande.</p>
    </div>

    <form onSubmit={submit} className="card" style={{ maxWidth: 720, padding: 22, marginBottom: 24 }}>
      <label>Référence IKABAY<input className="input" required value={id} onChange={(e) => setId(e.target.value)} placeholder="IKB-..." /></label>
      <label style={{ display: 'block', marginTop: 14 }}>Email ou téléphone<input className="input" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Votre contact" /></label>
      <button className="btn btnPrimary" style={{ marginTop: 16 }} disabled={loading}><Search size={17} /> {loading ? 'Recherche…' : 'Rechercher'}</button>
      <p style={{ marginTop: 12, fontSize: 12, color: '#60716f' }}><ShieldCheck size={14} /> Le contact sert uniquement à vérifier que vous êtes autorisé à consulter ce suivi.</p>
    </form>

    {error && <div style={{ maxWidth: 720, background: '#fff7ed', color: '#9a3412', borderRadius: 14, padding: 14 }}>{error}</div>}
    {order && <div className="card" style={{ maxWidth: 720, padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div><div style={{ fontSize: 12, color: '#0f766e', fontWeight: 900 }}>{order.id}</div><h2 style={{ margin: '4px 0' }}>{order.product?.name || 'Commande IKABAY'}</h2></div>
        <span className="badge"><PackageCheck size={14} /> {labels[order.status] || order.status}</span>
      </div>
      <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
        <div><strong>Quantité :</strong> {order.quantity}</div>
        <div><strong>Fournisseur :</strong> {order.provider || 'À confirmer'}</div>
        <div><strong>Transporteur :</strong> {order.carrier || 'À confirmer'}</div>
        <div><strong>Numéro de suivi :</strong> {order.trackingNumber || 'Pas encore attribué'}</div>
        <div><strong>Livraison estimée :</strong> {order.estimatedDelivery || 'À confirmer'}</div>
        {order.trackingUrl && <a href={order.trackingUrl} target="_blank" rel="noreferrer" className="btn btnSecondary">Ouvrir le suivi transporteur</a>}
      </div>
    </div>}
  </section>;
}
