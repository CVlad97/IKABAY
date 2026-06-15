import { Truck } from 'lucide-react';

export function TransportPage() {
  return (
    <section className="pageSection">
      <div className="badge">Logistique</div>
      <h1>Transport</h1>
      <p>Coordination import/export Caraïbe — fret maritime, aérien et suivi de livraison.</p>
      <div className="placeholderContent">
        <Truck size={48} />
        <p>Devis transport, options fret et suivi de livraison à intégrer.</p>
      </div>
    </section>
  );
}

export default TransportPage;