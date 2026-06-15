export const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/596696653589';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Ikabay Sourcing';
export const APP_EMAIL = import.meta.env.VITE_APP_EMAIL || 'sourcing@ikabay.store';

export function waMessage(text) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}