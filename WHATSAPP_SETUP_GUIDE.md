# Configuration WhatsApp Bot — IKABAY Sourcing

## Étape 1 : Installer Hermes sur ton poste (si pas déjà fait)

```bash
pip install hermes-agent
```

## Étape 2 : Lancer la config WhatsApp

```bash
hermes whatsapp
```

→ Un **QR code** s'affiche dans ton terminal
→ Ouvre WhatsApp sur ton téléphone → **Paramètres → Appareils liés → Lier un appareil**
→ Scanne le QR code

## Étape 3 : Activer le bot dans `.env`

Ajoute dans `~/.hermes/.env` :
```
WHATSAPP_ENABLED=true
WHATSAPP_MODE=bot
WHATSAPP_ALLOWED_USERS=*
```

## Étape 4 : Démarrer le gateway

```bash
hermes gateway
```

Le bot WhatsApp est maintenant actif. Tu peux lui parler depuis ton WhatsApp.

---

## Fonctionnalités du bot sourcing

Une fois connecté, le bot peut :
- Recevoir des demandes de devis depuis WhatsApp
- Suivre les commandes fournisseurs
- Recevoir les alertes de suivi transport
- Répondre aux clients automatiquement

## Fichiers de config
- Session : `~/.hermes/platforms/whatsapp/session/`
- Config : `~/.hermes/config.yaml` (section `whatsapp:`)

## Dépannage
Si le QR ne s'affiche pas : terminal trop étroit (min 60 colonnes)
Si la session expire : relancer `hermes whatsapp`