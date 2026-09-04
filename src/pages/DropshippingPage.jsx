import { useState, useMemo } from 'react';
import {
  Globe, Package, ShoppingCart, TrendingUp, DollarSign,
  Search, Filter, Plus, Copy, CheckCircle, Clock, AlertCircle,
  Truck, ExternalLink, BarChart3, RefreshCw, ArrowRight,
  Globe2, Store, Zap, ZapOff, Download, Upload, Tag
} from 'lucide-react';
import { DROPSHIPPING_SOURCES, DROPSHIPPING_PRODUCTS, DROPSHIPPING_INTEGRATIONS, calcIkabayPrice, calcNetMargin } from '../data/dropshipping';
import { APP_NAME } from '../utils/constants';

const STATUS_COLORS = {
  'en-test': '#f97316',
  'actif': '#16a34a',
  'inactif': '#6b7280',
  'démo': '#64748b',
  'à-configurer': '#f97316',
  'non-connecté': '#64748b'
};

const STOCK_COLORS = {
  'disponible': '#16a34a',
  'rupture': '#dc2626',
  'commande': '#f97316',
  'sur-devis': '#7c3aed'
};

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div style={{
      background: 'white', borderRadius: 16, padding: 24,
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)', flex: 1, minWidth: 180
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: color || '#0f766e', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={22} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 13, color: '#60716f', fontWeight: 600 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#1a2e2b' }}>{value}</div>
        </div>
      </div>
      {sub && <div style={{ fontSize: 13, color: '#8a9b97' }}>{sub}</div>}
    </div>
  );
}

export function DropshippingPage() {
  const [activeTab, setActiveTab] = useState('apercu');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Sources stats
  const totalSources = DROPSHIPPING_SOURCES.length;
  const activeSources = DROPSHIPPING_SOURCES.filter(s => s.status === 'actif').length;
  const testSources = DROPSHIPPING_SOURCES.filter(s => s.status === 'en-test').length;
  
  // Products stats
  const totalProducts = DROPSHIPPING_PRODUCTS.length;
  const avgMargin = DROPSHIPPING_SOURCES.reduce((a, s) => a + s.marginPercent, 0) / totalSources;
  
  // Orders (demo)
  const demoOrders = [
    { id: 'CMD-001', client: 'Jules Defel', source: 'AliExpress', status: 'en-transit', total: 45.80, date: '2026-06-20' },
    { id: 'CMD-002', client: 'Club Nautique FM', source: 'CJ Dropshipping', status: 'livre', total: 28.40, date: '2026-06-18' },
  ];

  // Filtered products
  const filteredProducts = useMemo(() => {
    return DROPSHIPPING_PRODUCTS.filter(p => {
      const matchSearch = !searchTerm || 
        p.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.nameEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSource = filterSource === 'all' || p.sourceId === filterSource;
      const matchCategory = filterCategory === 'all' || p.category === filterCategory;
