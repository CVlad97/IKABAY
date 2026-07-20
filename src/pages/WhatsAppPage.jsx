import { useState, useCallback } from 'react';
import {
  MessageCircle, Send, Settings, Smartphone, QrCode,
  CheckCircle, AlertCircle, Clock, RefreshCw, Copy,
  Users, Bell, FileText, Truck, Package, BarChart3
} from 'lucide-react';

const STATUS_COLORS = {
  connected: '#16a34a',
  disconnected: '#dc2626',
  connecting: '#f97316',
  not_configured: '#6b7280'
};

export function WhatsAppPage() {
  const [status] = useState('not_configured');
  const [activeTab, setActiveTab] = useState('setup');
  const [copyId, setCopyId] = useState(null);

  const handleCopy = useCallback(async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyId(id);
      setTimeout(() => setCopyId(null), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyId(id);
      setTimeout(() => setCopyId(null), 2000);
    }
  }, []);

  const commands = [
    { cmd: 'hermes whatsapp', desc: 'Lance le wizard de connexion WhatsApp', color: '#a5f3fc' },
    { cmd: 'hermes gateway', desc: 'Demarre le bot (gateway)', color: '#a5f3fc' },
    { cmd: 'WHATSAPP_ALLOWED_USERS=*', desc: 'Autorise tous les contacts dans .env', color: '#fbbf24' },
  ];

  const features = [
    { icon: Users, label: 'Reception demandes clients', status: 'A configurer' },
    { icon: FileText, label: 'Envoi devis automatique', status: 'A configurer' },
    { icon: Truck, label: 'Suivi commandes fournisseurs', status: 'A configurer' },
    { icon: Bell, label: 'Alertes transport', status: 'A configurer' },
    { icon: Package, label: 'Catalogue dropshipping', status: 'Disponible' },
    { icon: BarChart3, label: 'Stats sourcing quotidiennes', status: 'Disponible' },
  ];

  return (
    <div className="pageSection">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #075e54 0%, #128C7E 100%)',
        borderRadius: 24, padding: '40px 48px', marginBottom: 32,
        color: 'white', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', margin: 0, fontSize: 32 }}>
            <MessageCircle size={28} style={{ verticalAlign: 'middle', marginRight: 12 }} />
            WhatsApp Bot
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', margin: '8px 0 0', fontSize: 16, maxWidth: 500 }}>
            Gate gere le sourcing, les commandes et les clients depuis ton telephone.
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 20,
              fontSize: 13, fontWeight: 700
            }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: STATUS_COLORS[status], display: 'inline-block'
              }} />
              {status === 'not_configured' ? 'Non configure' : status}
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 20,
              fontSize: 13, fontWeight: 700
            }}>
              0 messages aujourd'hui
            </span>
          </div>
        </div>
        <div style={{
          position: 'absolute', right: -20, top: -20, opacity: 0.08,
          fontSize: 200, fontWeight: 900, lineHeight: 1
        }}>
          <MessageCircle size={200} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {[
          { id: 'setup', label: 'Configuration', icon: Settings },
          { id: 'features', label: 'Fonctionnalites', icon: Smartphone },
          { id: 'messages', label: 'Messages recents', icon: MessageCircle },
        ].map(tab => (
          <button key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
              border: 'none', borderRadius: 10, cursor: 'pointer',
              background: activeTab === tab.id ? '#075e54' : '#e8f0ee',
              color: activeTab === tab.id ? 'white' : '#1a2e2b',
              fontWeight: 700, fontSize: 14
            }}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      {/* === TAB CONFIG === */}
      {activeTab === 'setup' && (
        <div>
          <div style={{
            background: '#fef3c7', borderRadius: 16, padding: 20, marginBottom: 24,
            display: 'flex', gap: 12, alignItems: 'flex-start'
          }}>
            <AlertCircle size={20} color="#92400e" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong style={{ color: '#92400e' }}>Configuration requise sur ton poste</strong>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#92400e' }}>
                Ouvre un terminal sur TON ordinateur et execute ces commandes :
              </p>
            </div>
          </div>

          <div style={{
            background: '#1e293b', borderRadius: 16, padding: 24, marginBottom: 24,
            fontFamily: "'Fira Code', monospace", fontSize: 14, color: '#e2e8f0'
          }}>
            {commands.map((c, i) => (
              <div key={i} style={{ marginBottom: i < commands.length - 1 ? 16 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: '#94a3b8' }}>{i + 1}. </span>
                    <span style={{ color: c.color }}>$ {c.cmd}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(c.cmd, `cmd-${i}`)}
                    style={{
                      background: copyId === `cmd-${i}` ? '#166534' : '#334155',
                      border: 'none', borderRadius: 8, padding: '6px 12px',
                      color: 'white', cursor: 'pointer', fontSize: 12,
                      display: 'flex', alignItems: 'center', gap: 4
                    }}
                  >
                    {copyId === `cmd-${i}` ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copyId === `cmd-${i}` ? 'Copie' : 'Copier'}
                  </button>
                </div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4, marginLeft: 20 }}>
                  {c.desc}
                </div>
              </div>
            ))}
          </div>

          {/* QR Code simulation */}
          <div style={{
            background: 'white', borderRadius: 16, padding: 32,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)', textAlign: 'center'
          }}>
            <div style={{
              width: 200, height: 200, margin: '0 auto 16px',
              background: 'white', border: '2px dashed #d0dbd8',
              borderRadius: 16, display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexDirection: 'column', gap: 8
            }}>
              <QrCode size={64} color="#075e54" />
              <span style={{ fontSize: 12, color: '#8a9b97' }}>
                {status === 'not_configured' ? "QR code apparatra ici" : "QR code actif"}
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#60716f' }}>
              Apres avoir lance <strong>hermes whatsapp</strong>, un QR code apparait dans ton terminal.
              Scanne-le avec ton telephone (WhatsApp → Appareils lies → Lier un appareil).
            </p>
          </div>
        </div>
      )}

      {/* === TAB FEATURES === */}
      {activeTab === 'features' && (
        <div className="cardGrid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16
        }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card" style={{ padding: 24 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: '#e7fbf7', display: 'grid',
                  placeItems: 'center', color: '#075e54', marginBottom: 14
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: 16, marginBottom: 6 }}>{f.label}</h3>
                <span style={{
                  display: 'inline-block', padding: '4px 12px', borderRadius: 8,
                  fontSize: 12, fontWeight: 700,
                  background: f.status === 'Disponible' ? '#dcfce7' : '#fff7ed',
                  color: f.status === 'Disponible' ? '#16a34a' : '#ea580c'
                }}>
                  {f.status}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* === TAB MESSAGES === */}
      {activeTab === 'messages' && (
        <div style={{
          background: 'white', borderRadius: 16, padding: 40,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)', textAlign: 'center'
        }}>
          <MessageCircle size={48} color="#8a9b97" style={{ marginBottom: 12 }} />
          <h3 style={{ color: '#60716f', margin: '0 0 8px' }}>Aucun message pour l'instant</h3>
          <p style={{ fontSize: 13, color: '#8a9b97', margin: 0 }}>
            Configure le bot WhatsApp pour commencer a recevoir des messages.
          </p>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 32, padding: 20, background: '#f0f5f3', borderRadius: 16 }}>
        <h3 style={{ fontSize: 15, marginBottom: 8 }}>Prochaines etapes</h3>
        <ol style={{ fontSize: 13, color: '#60716f', lineHeight: 2, margin: 0, paddingLeft: 20 }}>
          <li>Ouvre un terminal sur ton poste</li>
          <li>Execute <strong>hermes whatsapp</strong></li>
          <li>Scanne le QR code avec ton telephone</li>
          <li>Le bot est connecte — tu peux gerer ton sourcing depuis WhatsApp</li>
        </ol>
      </div>
    </div>
  );
}

export default WhatsAppPage;
