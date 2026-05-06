# IKABAY Local MVP

MVP React + Vite pour IKABAY Local, SOS Galère, Délikréol, IKABAY Sourcing et IKABAY Logistique.

## Objectif

Créer une première vitrine testable : annuaire local, prestataires, communes, catégories, bouton WhatsApp et connexion Supabase.

## Stack

- React
- Vite
- Supabase
- lucide-react

## Configuration

Copier `.env.example` vers `.env.local` puis remplir :

```env
VITE_SUPABASE_URL=https://luqvqwpglceeqtbbtvuo.supabase.co
VITE_SUPABASE_ANON_KEY=...
VITE_WHATSAPP_URL=https://wa.me/596696653589
```

Ne jamais mettre de clé `service_role` côté frontend.

## Commandes

```bash
npm install
npm run dev
npm run build
```

## Tables utilisées

La page lit la vue Supabase :

```sql
public.ikabay_public_providers
```

Elle peut fonctionner en mode démo si les variables Supabase ne sont pas encore configurées.

## Déploiement Vercel

Variables à ajouter dans Vercel :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_WHATSAPP_URL`

Build command :

```bash
npm run build
```

Output directory :

```bash
dist
```
