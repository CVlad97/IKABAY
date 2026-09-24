import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { products } from '../src/data/products.js';

const distDir = 'dist';
const indexPath = join(distDir, 'index.html');

const staticRoutes = [
  'catalogue',
  'sourcing',
  'partenaires',
  'contact',
  'transport',
  'legal',
  'devis',
  'fournisseurs',
  'rfq',
  'destockage',
  'dropshipping',
  'marketplace',
  'marine',
  'showroom',
  'whatsapp',
  'studio-creatif',
];

const productRoutes = products.map(({ id }) => `produit/${id}`);
const routes = [...staticRoutes, ...productRoutes];

if (!existsSync(indexPath)) {
  throw new Error(`Missing ${distDir}/index.html. Run vite build before generating SPA route copies.`);
}

for (const route of routes) {
  const target = join(distDir, route, 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(indexPath, target);
}

copyFileSync(indexPath, join(distDir, '404.html'));
console.log(`Generated ${routes.length} SPA route copies (${productRoutes.length} product routes) + 404.html`);
