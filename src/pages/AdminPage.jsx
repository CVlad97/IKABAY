import { BarChart3 } from 'lucide-react';

export function AdminPage() {
  return (
    <section className="pageSection">
      <div className="badge">Administration</div>
      <h1>Administration</h1>
      <p>Panneau de gestion — produits, fournisseurs, commandes et utilisateurs.</p>
      <div className="placeholderContent">
        <BarChart3 size={48} />
        <p>Dashboard admin avec statistiques, CRUD et gestion des rôles.</p>
      </div>
    </section>
  );
}

export default AdminPage;