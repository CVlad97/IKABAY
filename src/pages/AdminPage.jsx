import {
  BarChart3, Package, FileText, Users, Truck,
  UserCheck, Activity, Settings, Mail, Clock, ArrowRight
} from 'lucide-react';
import { APP_EMAIL } from '../utils/constants';

/* ─── Données de démonstration ─── */
const stats = [
  { label: 'Produits au catalogue', value: 19, icon: Package, color: '#0f766e' },
  { label: 'Demandes sourcing',     value: 7,  icon: FileText, color: '#f97316' },
  { label: 'Devis en cours',        value: 3,  icon: BarChart3, color: '#2563eb' },
  { label: 'Fournisseurs',          value: 12, icon: Users, color: '#7c3aed' },
  { label: 'Expéditions en transit', value: 2, icon: Truck, color: '#0891b2' },
  { label: 'Clients actifs',        value: 8,  icon: UserCheck, color: '#16a34a' },
];

const quickActions = [
  { label: 'Ajouter un produit',   icon: Package,  href: '#ajouter-produit',   primary: true },
  { label: 'Nouveau fournisseur',  icon: Users,    href: '#nouveau-fournisseur',primary: false },
  { label: 'Voir les logs email',  icon: Mail,     href: '#logs-email',         primary: false },
  { label: 'Configurer email',     icon: Settings, href: '#config-email',       primary: false },
];

const recentActivities = [
  { action: 'Nouveau produit ajouté',   detail: 'Smart TV 55" – Réf. TV-5524',  time: 'Il y a 12 min',  user: 'Jules' },
  { action: 'Demande sourcing créée',   detail: 'Pièces détachées moto – 15 réf.', time: 'Il y a 35 min', user: 'Sophie' },
  { action: 'Devis envoyé',             detail: 'Climatisation industrielle – 3 unités', time: 'Il y a 2 h', user: 'Jules' },
  { action: 'Nouveau fournisseur',      detail: 'TechSupply SARL – Électronique', time: 'Il y a 4 h',    user: 'Marie' },
  { action: 'Expédition en transit',    detail: 'Colis EXP-2026-042 – Port de Fort-de-France', time: 'Hier', user: 'Système' },
  { action: 'Client inscrit',           detail: 'BTP Caraïbes – Fort-de-France', time: 'Hier',  user: 'Sophie' },
  { action: 'Email automatique envoyé', detail: `Confirmation devis → ${APP_EMAIL}`, time: 'Hier', user: 'Système' },
];

export function AdminPage() {
  return (
    <section className="pageSection">

      {/* ─── EN-TÊTE ─── */}
      <div className="badge">Administration</div>
      <h1>Panneau d'administration</h1>
      <p>Gérez produits, fournisseurs, devis et utilisateurs depuis un tableau de bord centralisé.</p>

      {/* ─── CARTES STATISTIQUES ─── */}
      <div
        className="cardGrid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16,
          margin: '24px 0 40px',
        }}
      >
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div className="card" key={i}>
              <div className="cardTop">
                <div className="icon" style={{ background: `${s.color}18`, color: s.color }}>
                  <Icon size={22} />
                </div>
              </div>
              <strong style={{ display: 'block', fontSize: 'clamp(24px,4vw,34px)', margin: '12px 0 4px' }}>
                {s.value}
              </strong>
              <span style={{ color: '#60716f', fontWeight: 700, fontSize: 14 }}>{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* ─── ACTIONS RAPIDES ─── */}
      <div className="sectionTitle">
        <h2>Actions rapides</h2>
      </div>
      <div
        className="cardGrid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 14,
          marginBottom: 40,
        }}
      >
        {quickActions.map((a, i) => {
          const Icon = a.icon;
          return (
            <a
              key={i}
              href={a.href}
              className={a.primary ? 'btn btnPrimary' : 'btn'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                minHeight: 50,
                borderRadius: 16,
                padding: '12px 18px',
                fontWeight: 800,
                fontSize: 14,
                border: 0,
                cursor: 'pointer',
                textDecoration: 'none',
                background: a.primary ? '#0f766e' : '#fff',
                color: a.primary ? '#fff' : '#102022',
                boxShadow: a.primary ? '0 12px 32px rgba(15,118,110,.28)' : '0 2px 8px rgba(0,0,0,0.06)',
                border: a.primary ? 'none' : '1px solid rgba(16,32,34,.12)',
              }}
            >
              <Icon size={18} />
              {a.label}
              <ArrowRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
            </a>
          );
        })}
      </div>

      {/* ─── DERNIÈRES ACTIVITÉS ─── */}
      <div className="sectionTitle">
        <h2>Dernières activités</h2>
        <p>Actions récentes effectuées sur la plateforme.</p>
      </div>
      <div className="card" style={{ padding: '8px 0' }}>
        {recentActivities.map((act, i) => {
          const Icon = act.action.includes('email')
            ? Mail
            : act.action.includes('produit')
              ? Package
              : act.action.includes('sourcing')
                ? FileText
                : act.action.includes('Devis')
                  ? BarChart3
                  : act.action.includes('fournisseur')
                    ? Users
                    : act.action.includes('Expédition')
                      ? Truck
                      : act.action.includes('Client')
                        ? UserCheck
                        : Activity;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                padding: '16px 20px',
                borderBottom: i < recentActivities.length - 1 ? '1px solid rgba(16,32,34,.06)' : 'none',
              }}
            >
              <div
                className="icon"
                style={{
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  borderRadius: 12,
                  background: '#f4f7f5',
                  color: '#0f766e',
                }}
              >
                <Icon size={18} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <strong style={{ fontSize: 14 }}>{act.action}</strong>
                  <span style={{ fontSize: 12, color: '#8a9c9a', whiteSpace: 'nowrap' }}>
                    <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                    {act.time}
                  </span>
                </div>
                <p style={{ margin: '2px 0 0', fontSize: 13, color: '#60716f', lineHeight: 1.4 }}>
                  {act.detail}
                </p>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#8a9c9a', marginTop: 4, display: 'inline-block' }}>
                  {act.user}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

export default AdminPage;