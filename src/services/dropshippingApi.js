// Passerelle publique vers le backend dropshipping IKABAY.
// Les clés fournisseurs restent côté VPS et ne sont jamais exposées au navigateur.
const DEFAULT_API_URL = 'https://api.ikabay.store';
const API_URL = (import.meta.env.VITE_DROPSHIPPING_API_URL || DEFAULT_API_URL).replace(/\/$/, '');

export const dropshippingApiConfigured = Boolean(API_URL);
export const dropshippingApiUrl = API_URL;

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || `Passerelle dropshipping: HTTP ${response.status}`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

export const getProviderStatus = () => request('/providers');
export const getProviderCategories = provider => request(`/providers/${encodeURIComponent(provider)}/categories`);
export const searchProviderProducts = (provider, { query = '', page = 1, size = 24, country = '' } = {}) => {
  const params = new URLSearchParams({ q: query, page: String(page), size: String(size) });
  if (country) params.set('country', country);
  return request(`/providers/${encodeURIComponent(provider)}/products?${params.toString()}`);
};
export const getProviderProduct = (provider, id) => request(`/providers/${encodeURIComponent(provider)}/product/${encodeURIComponent(id)}`);
export const getProviderStock = (provider, vid) => request(`/providers/${encodeURIComponent(provider)}/variant/${encodeURIComponent(vid)}/stock`);
export const getProviderFreight = (provider, { vid, quantity = 1, destinationCode = 'MQ', originCode = 'CN' }) => request(`/providers/${encodeURIComponent(provider)}/freight`, {
  method: 'POST',
  body: JSON.stringify({ vid, quantity, destinationCode, originCode })
});
export const createFulfillmentOrder = payload => request('/orders', {
  method: 'POST',
  body: JSON.stringify(payload)
});

export const getOrderTrace = (id, contact) => request(`/orders/${encodeURIComponent(id)}?contact=${encodeURIComponent(contact)}`);
