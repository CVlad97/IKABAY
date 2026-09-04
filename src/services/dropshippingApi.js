// Passerelle publique vers un backend dropshipping.
// Les clés fournisseurs doivent rester côté serveur (jamais dans VITE_*).
const API_URL = (import.meta.env.VITE_DROPSHIPPING_API_URL || '').replace(/\/$/, '');

export const dropshippingApiConfigured = Boolean(API_URL);

async function request(path, options = {}) {
  if (!API_URL) {
    throw new Error('La passerelle dropshipping n’est pas configurée.');
  }
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  if (!response.ok) throw new Error(`Passerelle dropshipping: HTTP ${response.status}`);
  return response.json();
}

export const getProviderStatus = () => request('/providers');
export const syncCatalog = provider => request(`/providers/${provider}/catalog/sync`, { method: 'POST' });
export const createFulfillmentOrder = payload => request('/orders', {
  method: 'POST',
  body: JSON.stringify(payload)
});
export const getOrderStatus = orderId => request(`/orders/${encodeURIComponent(orderId)}`);
