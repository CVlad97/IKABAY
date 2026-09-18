import { test, expect } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173';

const publicRoutes = [
  '/',
  '/catalogue',
  '/sourcing',
  '/partenaires',
  '/contact',
  '/transport',
  '/legal',
  '/devis',
  '/destockage',
  '/produit/p1',
];

for (const route of publicRoutes) {
  test(`public route renders without page errors: ${route}`, async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator('#root')).not.toBeEmpty();
    expect(pageErrors).toEqual([]);
  });
}

for (const route of ['/admin', '/dropshipping', '/dossier-joel-dufeal', '/dossier-jules-defel', '/presentation']) {
  test(`internal route is not exposed: ${route}`, async ({ page }) => {
    const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText('Page introuvable')).toBeVisible();
  });
}

test('legacy client presentation no longer exposes client quote', async ({ page }) => {
  await page.goto(`${baseURL}/presentation/joel-dufeal.html`, { waitUntil: 'networkidle' });
  await expect(page.getByText('Page introuvable')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Devis Final — Joël Dufeal');
});

test('contact page renders FAQ and commercial contact form', async ({ page }) => {
  await page.goto(`${baseURL}/contact`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Contactez-nous' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Questions fréquentes' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Envoyer le message' })).toBeVisible();
});

test('product page clearly presents a request, not a paid checkout', async ({ page }) => {
  await page.goto(`${baseURL}/produit/p1`, { waitUntil: 'networkidle' });
  await expect(page.getByRole('button', { name: /Demander maintenant/i })).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Paiement sécurisé');
});
