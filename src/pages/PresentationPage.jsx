import React from 'react';
import { Link } from 'react-router-dom';

export default function PresentationPage() {
  return (
    <section className="pageSection" style={{ paddingTop: 80, paddingBottom: 100 }}>
      <div className="badge" style={{ marginBottom: 14, textAlign: 'center' }}>Projet Joël Dufeal — 5 Bateaux</div>
      <h1 style={{ textAlign: 'center', marginBottom: 8 }}>Présentation Client — Devis Final</h1>
      <p style={{ textAlign: 'center', color: '#516866', maxWidth: 700, margin: '0 auto 32px' }}>
        Dossier complet avec devis, comparatif fournisseur, photos produits et budget rendu Martinique.
      </p>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <a
          href="/presentation/joel-dufeal.html"
          className="btn btnPrimary"
          style={{ fontSize: 18, padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}
        >
          📊 Ouvrir la présentation
        </a>
        <Link
          to="/"
          className="btn btnOutline"
          style={{ marginLeft: 12, fontSize: 16, padding: '10px 20px', textDecoration: 'none', display: 'inline-block' }}
        >
          Retour accueil
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        <a href="/presentation/joel-dufeal.html" style={{ display: 'block', padding: 20, background: '#fff', borderRadius: 10, border: '1px solid #e5ebe8', boxShadow: '0 2px 10px rgba(11,43,60,0.03)', textDecoration: 'none', color: '#0b2b3c' }}>
          <strong>📄 Devis Final</strong><br />
          <span style={{ fontSize: 14, color: '#516866' }}>DEVIS_JOEL_DUFEAL_FINAL.docx — 11 produits — 20 483,59 € TTC</span>
        </a>
        <a href="/presentation/joel-dufeal.html" style={{ display: 'block', padding: 20, background: '#fff', borderRadius: 10, border: '1px solid #e5ebe8', boxShadow: '0 2px 10px rgba(11,43,60,0.03)', textDecoration: 'none', color: '#0b2b3c' }}>
          <strong>📑 Devis final interactif</strong><br />
          <span style={{ fontSize: 14, color: '#516866' }}>Présentation HTML locale — lien fiable en production</span>
        </a>
        <a href="/presentation/joel-dufeal.html" style={{ display: 'block', padding: 20, background: '#fff', borderRadius: 10, border: '1px solid #e5ebe8', boxShadow: '0 2px 10px rgba(11,43,60,0.03)', textDecoration: 'none', color: '#0b2b3c' }}>
          <strong>📊 Version client</strong><br />
          <span style={{ fontSize: 14, color: '#516866' }}>Ouvrir la présentation Joël Dufeal sans dépendre d’un dossier /downloads</span>
        </a>
      </div>
    </section>
  );
}
