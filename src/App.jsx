import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { Suspense, useState } from 'react';
import { Ship, MessageCircle, Menu, X, Mail, Phone, FileText, ClipboardList, LayoutDashboard, Truck } from 'lucide-react';
import { WHATSAPP_URL, APP_NAME, APP_EMAIL } from './utils/constants';
import './styles.css';

// React.lazy page imports
const HomePage = React.lazy(() => import('./pages/HomePage'));
const DestockagePage = React.lazy(() => import('./pages/DestockagePage'));
const SourcingPage = React.lazy(() => import('./pages/SourcingPage'));
const DossierJulesPage = React.lazy(() => import('./pages/DossierJulesPage'));
const FournisseursPage = React.lazy(() => import('./pages/FournisseursPage'));
const DevisPage = React.lazy(() => import('./pages/DevisPage'));
const RfqPage = React.lazy(() => import('./pages/RfqPage'));
const TransportPage = React.lazy(() => import('./pages/TransportPage'));
const DropshippingPage = React.lazy(() => import('./pages/DropshippingPage'));
const WhatsAppPage = React.lazy(() => import('./pages/WhatsAppPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/destockage', label: 'Déstockage' },
    { to: '/sourcing', label: 'Sourcing' },
    { to: '/dossier-jules-defel', label: 'Dossier client' },
    { to: '/devis', label: 'Devis' },
    { to: '/fournisseurs', label: 'Fournisseurs' },
    { to: '/rfq', label: 'RFQ' },
    { to: '/transport', label: 'Transport' },
    { to: '/dropshipping', label: 'Dropshipping' },
    { to: '/whatsapp', label: 'WhatsApp' },
    { to: '/admin', label: 'Admin' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navInner">
          <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
            <Ship size={28} />
            <span>Ikabay Sourcing</span>
          </Link>

          <button
            className="hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`navLinks${menuOpen ? ' open' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="navLink"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="appMain">
        {children}
      </main>

      <footer className="footer">
        <div className="footerInner">
          <div className="footerBrand">
            <Ship size={20} />
            <span>{APP_NAME}</span>
          </div>
          <div className="footerLinks">
            <a href={`mailto:${APP_EMAIL}`} className="footerLink">
              <Mail size={16} /> {APP_EMAIL}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="footerLink"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <p className="footerCopy">
            &copy; {new Date().getFullYear()} {APP_NAME}. Tous droits réservés.
          </p>
        </div>
      </footer>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="waFloating"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="loading">
      <Ship size={32} className="loadingSpin" />
      <p>Chargement…</p>
    </div>
  );
}

export { Layout };

export default function App() {
  return (
    <BrowserRouter basename="/IKABAY">
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destockage" element={<DestockagePage />} />
            <Route path="/sourcing" element={<SourcingPage />} />
            <Route path="/dossier-jules-defel" element={<DossierJulesPage />} />
            <Route path="/fournisseurs" element={<FournisseursPage />} />
            <Route path="/devis" element={<DevisPage />} />
            <Route path="/rfq" element={<RfqPage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/dropshipping" element={<DropshippingPage />} />
            <Route path="/whatsapp" element={<WhatsAppPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}