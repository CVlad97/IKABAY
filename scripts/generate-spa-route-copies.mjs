import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const distDir = 'dist';
const indexPath = join(distDir, 'index.html');

const routes = [
  'catalogue',
  'destockage',
  'dropshipping',
  'marketplace',
  'transport',
  'suivi',
  'showroom',
  'marine',
  'contact',
  'legal',
  'commande-confirmee',
];

if (!existsSync(indexPath)) {
  throw new Error(`Missing ${distDir}/index.html. Run vite build before generating SPA route copies.`);
}

for (const route of routes) {
  const target = join(distDir, route, 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(indexPath, target);
}

copyFileSync(indexPath, join(distDir, '404.html'));
console.log(`Generated ${routes.length} public SPA route copies + 404.html`);
