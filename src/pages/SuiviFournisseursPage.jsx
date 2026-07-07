import { useState, useMemo } from 'react';
import {
  Mail, CheckCircle, Clock, AlertCircle, Archive,
  RefreshCw, Send, TrendingUp, DollarSign, Truck,
  Search, Filter, BarChart3, FileText, Star, Phone, MessageCircle
} from 'lucide-react';

const STATUS_COLORS = {
  'envoye': { bg: '#dbeafe', color: '#1e40af', label: 'Envoye' },
  'relance': { bg: '#fff7ed', color: '#9a3412', label: 'Relance' },
  'repondu': { bg: '#f0fdf4', color: '#0f766e', label: 'Repondu' },
  'negociation': { bg: '#fef3c7', color: '#92400e', label: 'Negociation' },
  'archive': { bg: '#f3f4f6', color: '#4b5563', label: 'Archive' },
};

const INITIAL_RFQS = [
  {
    id: 1, supplier: 'X-Vision Marine', country: 'France', contact: 'contact@x-vision-marine.com',
    product: 'Bolsters doubles + sellerie', qty: 5, amount: '8 450 EUR', sentDate: '24/06/2026',
    status: 'envoye', followUpDate: '01/07/2026', responseDate: null,
    offer: null, score: null, notes: '',
  },
  {
    id: 2, supplier: 'Osculati', country: 'Italie', contact: 'info@osculati.com',
    product: 'Catalogue general (liston, hublots, echelles...)', qty: '-', amount: '5 659 EUR',
    sentDate: '24/06/2026', status: 'envoye', followUpDate: '01/07/2026', responseDate: null,
    offer: null, score: null, notes: '',
  },
  {
    id: 3, supplier: 'AD Nautic', country: 'France', contact: 'contact@adnautic.com',
    product: 'Compas + quincaillerie lot', qty: '-', amount: '1 780 EUR',
    sentDate: '24/06/2026', status: 'envoye', followUpDate: '01/07/2026', responseDate: null,
    offer: null, score: null, notes: '',
  },
  {
    id: 4, supplier: 'Quick', country: 'Italie', contact: 'info@quicknautical.com',
    product: 'Daviers ancre inox', qty: 5, amount: '640 EUR',
    sentDate: '24/06/2026', status: 'envoye', followUpDate: '01/07/2026', responseDate: null,
    offer: null, score: null, notes: '',
  },
  {
    id: 5, supplier: 'Qingdao Alastin', country: 'Chine', contact: 'sales@qalastin.com',
    product: 'Taquets + porte-gobelets', qty: 55, amount: '165 EUR',
    sentDate: '24/06/2026', status: 'envoye', followUpDate: '01/07/2026', responseDate: null,
    offer: null, score: null, notes: '',
  },
  {
    id: 6, supplier: 'Wudi Xinxiangju', country: 'Chine', contact: 'sales@wdxinxiangju.com',
    product: 'Loquets inox', qty: 35, amount: '80 EUR',
    sentDate: '24/06/2026', status: 'envoye', followUpDate: '01/07/2026', responseDate: null,
    offer: null, score: null, notes: '',
  },
  {
    id: 7, supplier: 'Shenxian Shenghui', country: 'Chine', contact: 'sales@shhenghui.com',
    product: 'Echelles inox', qty: 10, amount: '510 EUR',
    sentDate: '24/06/2026', status: 'envoye', followUpDate: '01/07/2026', responseDate: null,
    offer: null, score: null, notes: '',
  },
  {
    id: 8, supplier: 'GEODIS', country: 'France', contact: 'devis.martinique@geodis.com',
    product: 'Transport LCL France/Chine vers Martinique', qty: '-', amount: '700 EUR',
    sentDate: '24/06/2026', status: 'envoye', followUpDate: '01/07/2026', responseDate: null,
    offer: null, score: null, notes: '',
  },
];

const COMPARISON_PRODUCTS = [
  { name: 'Taquet inox 200mm', eu: '18 EUR', euSup: 'Osculati', cn: '2.85 EUR', cnSup: 'Alastin', diff: '-84%', best: '🇨🇳 Chine' },
  { name: 'Loquet inox simple', eu: '12 EUR', euSup: 'Osculati', cn: '2.50 EUR', cnSup: 'Wudi', diff: '-79%', best: '🇨🇳 Chine' },
  { name: 'Porte-gobelet inox', eu: '12.50 EUR', euSup: 'Osculati', cn: '3.25 EUR', cnSup: 'Alastin', diff: '-74%', best: '🇨🇳 Chine' },
  { name: 'Echelle inox 4 marches', eu: '125 EUR', euSup: 'Osculati', cn: '51 EUR', cnSup: 'Shenghui', diff: '-59%', best: '🇨🇳 Chine' },
];

export function SuiviFournisseursPage() {
  const [rfqs, setRfqs] = useState(INITIAL_RFQS);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('suivi');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => {
    return rfqs.filter(r => {
      const matchStatus = filterStatus === 'all' || r.status === filterStatus;
      const matchSearch = !search || r.supplier.toLowerCase().includes(search.toLowerCase()) || r.product.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [rfqs, filterStatus, search]);

  const stats = useMemo(() => {
    const total = rfqs.length;
    const sent = rfqs.filter(r => r.status === 'envoye').length;
    const answered = rfqs.filter(r => r.status === 'repondu' || r.status === 'negociation').length;
    const pending = rfqs.filter(r => r.status === 'envoye' || r.status === 'relance').length;
    return { total, sent, answered, pending };
  }, [rfqs]);

  const updateStatus = (id, newStatus) => {
    setRfqs(prev => prev.map(r => r.id === id ? { ...r, status: newStatus, responseDate: newStatus === 'repondu' ? new Date().toLocaleDateString() : r.responseDate } : r));
  };

  const selectedRfq = rfqs.find(r => r.id === selectedId);

  const getDaysSince = (dateStr) => {
    if (!dateStr) return 0;
    const [d, m, y] = dateStr.split('/');
    const sent = new Date(+y, +m-1, +d);
    return Math.floor((new Date() - sent) / (1000*60*60*24));
  };

  return (
    <div className="pageSection">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', borderRadius: 24, padding: '32px 40px', marginBottom: 32, color: 'white' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: 28 }}>
          <Mail size={24} style={{ verticalAlign: 'middle', marginRight: 12 }} />
          Suivi des fournisseurs
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', margin: '8px 0 0', fontSize: 15 }}>
          8 RFQ envoyes le 24/06/2026 depuis contactcvs@ikabay.store
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        {[
          { icon: Send, label: 'RFQ envoyes', value: stats.total, color: '#2563eb' },
          { icon: Clock, label: 'En attente', value: stats.pending, color: '#f97316' },
          { icon: CheckCircle, label: 'Reponses recues', value: stats.answered, color: '#16a34a' },
          { icon: BarChart3, label: 'Taux de reponse', value: `${Math.round(stats.answered/stats.total*100)}%`, color: '#7c3aed' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 14, padding: 20, flex: 1, minWidth: 150, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}18`, display: 'grid', placeItems: 'center' }}>
                <s.icon size={20} color={s.color} />
              </div>
              <span style={{ fontSize: 13, color: '#60716f', fontWeight: 600 }}>{s.label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#1a2e2b' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { id: 'suivi', label: 'Suivi des envois', icon: Mail },
          { id: 'comparateur', label: 'Comparateur prix', icon: BarChart3 },
          { id: 'calendrier', label: 'Calendrier relances', icon: RefreshCw },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', border: 'none',
            borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 13,
            background: activeTab === t.id ? '#0f766e' : '#e8f0ee',
            color: activeTab === t.id ? 'white' : '#1a2e2b'
          }}>
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {/* ===== TAB SUIVI ===== */}
      {activeTab === 'suivi' && (
        <div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', borderRadius: 10, padding: '8px 14px', flex: 1, minWidth: 200, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <Search size={16} color="#8a9b97" />
              <input type="text" placeholder="Rechercher fournisseur..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14 }} />
            </div>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid #d0dbd8', fontSize: 14 }}>
              <option value="all">Tous les statuts</option>
              {Object.entries(STATUS_COLORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>

          <div style={{ overflowX: 'auto', background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f0f5f3' }}>
                  {['Fournisseur', 'Produit', 'Envoye le', 'Jours', 'Statut', 'Relance', 'Action'].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 12, color: '#60716f' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => {
                  const st = STATUS_COLORS[r.status] || STATUS_COLORS['envoye'];
                  const days = getDaysSince(r.sentDate);
                  return (
                    <tr key={r.id} style={{ borderBottom: '1px solid #e8f0ee', cursor: 'pointer' }}
                      onClick={() => setSelectedId(selectedId === r.id ? null : r.id)}
                    >
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#1a2e2b', fontSize: 14 }}>{r.supplier}</div>
                        <div style={{ fontSize: 11, color: '#8a9b97' }}>{r.contact}</div>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: 13, color: '#1a2e2b' }}>{r.product}</td>
                      <td style={{ padding: '12px 14px', fontSize: 13, color: '#60716f' }}>{r.sentDate}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: days > 5 ? '#fef2f2' : '#f0fdf4', color: days > 5 ? '#dc2626' : '#16a34a', padding: '3px 8px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{days}j</span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ background: st.bg, color: st.color, padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{st.label}</span>
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: 13, color: '#60716f' }}>{r.followUpDate}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <select value={r.status} onChange={e => { e.stopPropagation(); updateStatus(r.id, e.target.value); }}
                          style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #d0dbd8', fontSize: 12, cursor: 'pointer' }}>
                          {Object.entries(STATUS_COLORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selectedRfq && (
            <div style={{ marginTop: 20, background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px', color: '#0f766e' }}>{selectedRfq.supplier} - Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14 }}>
                <div><strong>Contact :</strong> {selectedRfq.contact}</div>
                <div><strong>Pays :</strong> {selectedRfq.country}</div>
                <div><strong>Produit :</strong> {selectedRfq.product}</div>
                <div><strong>Montant :</strong> {selectedRfq.amount}</div>
                <div><strong>Envoye le :</strong> {selectedRfq.sentDate}</div>
                <div><strong>Relance le :</strong> {selectedRfq.followUpDate}</div>
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button className="btn btnPrimary" style={{ fontSize: 12, padding: '8px 16px' }}><Mail size={14} /> Envoyer une relance</button>
                <button className="btn btnSecondary" style={{ fontSize: 12, padding: '8px 16px' }}><Phone size={14} /> Appeler</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== TAB COMPARATEUR ===== */}
      {activeTab === 'comparateur' && (
        <div>
          <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 16px', color: '#1a2e2b' }}>Comparatif Europe vs Chine</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f0f5f3' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: 12, color: '#60716f' }}>Produit</th>
                    <th style={{ padding: '12px', textAlign: 'right', fontSize: 12, color: '#60716f' }}>Prix Europe</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: 12, color: '#60716f' }}>Fournisseur</th>
                    <th style={{ padding: '12px', textAlign: 'right', fontSize: 12, color: '#60716f' }}>Prix Chine</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: 12, color: '#60716f' }}>Fournisseur</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontSize: 12, color: '#60716f' }}>Ecart</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontSize: 12, color: '#60716f' }}>Meilleur</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_PRODUCTS.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e8f0ee' }}>
                      <td style={{ padding: '12px', fontWeight: 700, fontSize: 14, color: '#1a2e2b' }}>{p.name}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700 }}>{p.eu}</td>
                      <td style={{ padding: '12px', fontSize: 13, color: '#60716f' }}>{p.euSup}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#16a34a' }}>{p.cn}</td>
                      <td style={{ padding: '12px', fontSize: 13, color: '#60716f' }}>{p.cnSup}</td>
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: '#16a34a' }}>{p.diff}</td>
                      <td style={{ padding: '12px', textAlign: 'center', fontSize: 18 }}>{p.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 16px', color: '#1a2e2b' }}>Planning de relance</h3>
            {[
              { day: 'J+3 (27/06)', action: 'Premiere relance amicale', done: false },
              { day: 'J+7 (01/07)', action: 'Relance formelle + deadline', done: false },
              { day: 'J+10 (04/07)', action: 'Derniere relance avant alternatives', done: false },
              { day: 'J+15 (09/07)', action: "Cloture - demande alternative fournisseur", done: false },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < 3 ? '1px solid #e8f0ee' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.done ? '#dcfce7' : '#fff7ed', display: 'grid', placeItems: 'center', color: r.done ? '#16a34a' : '#ea580c', fontWeight: 700, fontSize: 12 }}>
                  {i+1}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1a2e2b', fontSize: 14 }}>{r.day}</div>
                  <div style={{ fontSize: 13, color: '#60716f' }}>{r.action}</div>
                </div>
                {r.done && <CheckCircle size={18} color="#16a34a" style={{ marginLeft: 'auto' }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== TAB CALENDRIER ===== */}
      {activeTab === 'calendrier' && (
        <div style={{ background: 'white', borderRadius: 16, padding: 32, textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <RefreshCw size={48} color="#8a9b97" style={{ marginBottom: 12 }} />
          <h3 style={{ color: '#60716f', margin: '0 0 8px' }}>Relance automatique configuree</h3>
          <p style={{ fontSize: 14, color: '#8a9b97', maxWidth: 400, margin: '0 auto' }}>
            Un cron job envoie une relance automatique aux fournisseurs qui n'ont pas repondu sous 7 jours.
          </p>
          <div style={{ marginTop: 20, background: '#1e293b', borderRadius: 12, padding: 16, fontFamily: "'Fira Code', monospace", fontSize: 13, color: '#e2e8f0', maxWidth: 500, margin: '20px auto 0' }}>
            <div><span style={{ color: '#a5f3fc' }}>IKABAY_EMAIL_USER</span>=contactcvs@ikabay.store</div>
            <div><span style={{ color: '#a5f3fc' }}>IKABAY_SMTP_HOST</span>=smtp.hostinger.com</div>
            <div><span style={{ color: '#a5f3fc' }}>Cron</span>: tous les jours a 9h</div>
          </div>
        </div>
      )}
    </div>
  );
}