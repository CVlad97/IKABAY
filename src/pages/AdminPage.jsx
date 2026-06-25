import {
  BarChart3, Package, FileText, Users, Truck,
  UserCheck, Activity, Settings, Mail, Clock, ArrowRight, Store, ShoppingCart, MessageCircle
} from 'lucide-react';
import { APP_EMAIL } from '../utils/constants';

/* ─── Données de démonstration ─── */
const stats = [
  { label: 'Produits au catalogue', value: 19, icon: Package, color: '#0f766e' },
  { label: 'Demandes sourcing',     value: 7,  icon: FileText, color: '#f97316' },
  { label: 'Devis en cours',        value: 3,  icon: BarChart3, color: '#2563eb' },
  { label: 'Fournisseurs',          value: 12, icon: Users, color: '#7c3aed' },
  { label: 'Dropshipping sources',  value: 6,  icon: Store, color: '#0d9488' },
  { label: 'Produits dropshipping', value: 7,  icon: ShoppingCart, color: '#ea580c' },
];

const quickActions = [
  { label: 'Ajouter un produit',   icon: Package,  href: '#ajouter-produit',   primary: true },
  { label: 'Nouveau fournisseur',  icon: Users,    href: '#nouveau-fournisseur',primary: false },
  { label: 'Voir les logs email',  icon: Mail,     href: '#logs-email',         primary: false },
  { label: 'Configurer email',     icon: Settings, href: '#config-email',       primary: false },
  { label: 'Sync catalogue DS',    icon: Store,    href: '/dropshipping',       primary: false },
  { label: 'Nouveau partenaire',   icon: ShoppingCart, href: '/dropshipping',   primary: false },
];

const recentActivities = [
  { action: 'Nouveau produit ajouté',   detail: 'Smart TV 55" – Réf. TV-5524',  time: 'Il y a 12 min',  user: 'Jules' },
  { action: 'Demande sourcing créée',   detail: 'Pièces détachées moto – 15 réf.', time: 'Il y a 35 min', user: 'Sophie' },
  { action: 'Devis envoyé',             detail: 'Climatisation industrielle – 3 unités', time: 'Il y a 2 h', user: 'Jules' },
  { action: 'Nouveau fournisseur',      detail: 'TechSupply SARL – Électronique', time: 'Il y a 4 h',    user: 'Marie' },
  { action: 'Sync dropshipping CJ OK',  detail: '7 produits mis à jour – CJ Dropshipping', time: 'Il y a 5 h', user: 'Bot' },
  { action: 'Client inscrit',           detail: 'BTP Caraïbes – Fort-de-France', time: 'Hier',  user: 'Sophie' },
  { action: 'Nouvelle source DS ajoutée', detail: 'AliExpress FR – 15j délai, marge 20%', time: 'Hier', user: 'Système' },
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

      {/* ─── WHATSAPP BOT SETUP ─── */}
      <div className="sectionTitle" style={{ marginTop: 40 }}>
        <h2>Configuration WhatsApp</h2>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: '#075e54', display: 'grid',
            placeItems: 'center', color: 'white', flexShrink: 0
          }}>
            <MessageCircle size={28} />
          </div>
          <div style={{ flex: 1, minWidth: 250 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>Bot WhatsApp IKABAY</h3>
            <p style={{ fontSize: 14, color: '#60716f', lineHeight: 1.5, margin: 0 }}>
              Connecte le bot WhatsApp pour recevoir les demandes clients, suivre les commandes
              et gerer le sourcing depuis ton telephone.
            </p>
            <div style={{
              marginTop: 16, background: '#1e293b', borderRadius: 12, padding: 16,
              fontFamily: "'Fira Code', monospace", fontSize: 13, color: '#e2e8f0'
            }}>
              <div>1. <span style={{ color: '#a5f3fc' }}>hermes whatsapp</span></div>
              <div style={{ color: '#94a3b8', marginLeft: 16 }}># Scanne le QR code avec ton tel</div>
              <div>2. <span style={{ color: '#a5f3fc' }}>hermes gateway</span></div>
              <div style={{ color: '#94a3b8', marginLeft: 16 }}># Demarre le bot</div>
              <div>3. <span style={{ color: '#a5f3fc' }}>WHATSAPP_ALLOWED_USERS=*</span></div>
              <div style={{ color: '#94a3b8', marginLeft: 16 }}># Dans ~/.hermes/.env</div>
            </div>
            <p style={{ fontSize: 12, color: '#8a9b97', marginTop: 12 }}>
              Guide complet : <code>WHATSAPP_SETUP_GUIDE.md</code>
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default AdminPage;