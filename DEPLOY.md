# IKABAY Sourcing — Guide de déploiement Vercel

## Étape 1 : Connecter Vercel au repo GitHub

1. Va sur https://vercel.com/import
2. Connecte ton compte GitHub
3. Importe le repo `CVlad97/IKABAY`
4. Vercel détecte automatiquement `Vite` (framework) et `npm run build` (build command)
5. Clique **Deploy**

## Étape 2 : Variables d'environnement

Dans Vercel → Projet → Settings → Environment Variables, ajoute :

| Variable | Valeur |
|----------|--------|
| `VITE_SUPABASE_URL` | `https://luqvqwpglceeqtbbtvuo.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Ta clé anon Supabase (commence par `eyJ...`) |
| `VITE_WHATSAPP_URL` | `https://wa.me/596696653589` |
| `VITE_APP_NAME` | `Ikabay Sourcing` |
| `VITE_APP_EMAIL` | `contactcvs@ikabay.store` |

## Étape 3 : Domaine ikabay.store

1. Dans Vercel → Projet → Settings → Domains
2. Ajoute `ikabay.store`
3. Suis les instructions pour configurer les DNS :
   - Ajoute les nameservers Vercel chez ton registrar (Hostinger, Namecheap, etc.)
   - Ou ajoute un enregistrement CNAME si tu gardes les DNS actuels

## Étape 4 : Base de données Supabase

Les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont déjà dans `.env.example`.

Pour appliquer les migrations :
```bash
# Via Supabase CLI
supabase migration up

# Ou manuellement via l'éditeur SQL Supabase :
copier le contenu de supabase/migrations/001_initial_schema.sql
copier le contenu de supabase/migrations/002_dropshipping_schema.sql
copier le contenu de supabase/seed.sql
```