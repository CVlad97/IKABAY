# Intégration dropshipping IKABAY

## État actuel

Le site publié sur GitHub Pages est une application frontend statique. Le catalogue affiché dans `src/data/dropshipping.js` est un **fallback de démonstration** : prix, stock, délais et commandes ne sont pas synchronisés avec un fournisseur.

La vraie synchronisation suit cette architecture :

```text
Site IKABAY -> passerelle backend/Edge Function -> API fournisseur
                         (secrets serveur uniquement)
```

Le frontend accepte seulement l’URL publique `VITE_DROPSHIPPING_API_URL`. Il ne doit jamais recevoir `CJ_ACCESS_TOKEN`, `AUTODS_API_KEY` ou un secret Zendrop.

## Fournisseurs étudiés

- **CJ Dropshipping** : premier fournisseur recommandé pour l’intégration, car son API documente les produits, commandes, paiements, logistique, entrepôts et autorisations de boutique. Créer/générer le token dans le compte CJ, puis le stocker côté backend.
- **Zendrop** : l’aide officielle liste Shopify, TikTok Shop US, ClickFunnels et Wix comme intégrations e-commerce. Une connexion directe à cette application Vite/GitHub Pages n’est donc pas vérifiée ; il faut confirmer un accès API ou utiliser une plateforme supportée.
- **AutoDS** : l’API permet l’import et l’automatisation des commandes, mais l’accès API est un prérequis. Ne pas intégrer par scraping ni mettre une clé AutoDS dans le bundle navigateur.

## Contrat minimal de la passerelle

À implémenter côté backend :

- `GET /providers` : état de connexion et dernière synchronisation ;
- `POST /providers/cj/catalog/sync` (puis adapters Zendrop/AutoDS après validation d’accès) ;
- `POST /orders` : créer une commande fournisseur après validation du paiement et de l’adresse ;
- `GET /orders/:id` : statut et tracking ;
- journaliser les erreurs, dédupliquer avec une référence de commande et ne jamais renvoyer les secrets au navigateur.

## Mise en production

1. Activer les comptes et accès API du fournisseur choisi.
2. Déployer la passerelle sur un environnement serveur/Edge Function avec les secrets côté serveur.
3. Définir `VITE_DROPSHIPPING_API_URL` dans le build GitHub Pages.
4. Tester d’abord le catalogue, puis stock/prix, une commande de test, le tracking, l’annulation et le remboursement.
5. Remplacer le fallback uniquement après vérification des réponses réelles et du comportement en cas d’échec.

Tant que ces étapes ne sont pas réalisées, le site doit continuer à signaler clairement le mode démonstration.
