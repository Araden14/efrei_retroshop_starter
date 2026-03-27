# RetroShop - Micro-Frontends avec Webpack Module Federation

Application e-commerce rétro-gaming construite en **micro-frontends** avec **Webpack Module Federation** et **React 18**.

## Concept

L'idée est de connecter plusieurs applications React indépendantes via Module Federation. Chaque équipe peut développer, déployer et maintenir son micro-frontend de manière autonome, tout en partageant des dépendances et utilitaires communs.

## Architecture

```
┌─────────────────────────────────────────────┐
│              Shell (port 3000)               │
│           Application hôte / layout         │
│                                             │
│  ┌─────────────┐ ┌──────┐ ┌──────────────┐ │
│  │ mfe-product  │ │ cart │ │   mfe-reco   │ │
│  │  (3001)      │ │(3002)│ │   (3003)     │ │
│  └─────────────┘ └──────┘ └──────────────┘ │
└─────────────────────────────────────────────┘
         ▲              ▲             ▲
         └──── shared (eventBus, products) ────┘
```

| App | Port | Rôle |
|-----|------|------|
| **shell** | 3000 | Application hôte, layout et navigation |
| **mfe-product** | 3001 | Catalogue produits (grille de produits) |
| **mfe-cart** | 3002 | Gestion du panier |
| **mfe-reco** | 3003 | Recommandations produits |

## Communication inter-apps

Les micro-frontends communiquent via un **Event Bus** (pattern pub/sub) partagé sur `window.__EVENT_BUS__` :

- `cart:add` — ajout d'un produit au panier
- `cart:update` — mise à jour du compteur panier

## Lancement

Installer les dépendances et démarrer chaque application :

```bash
# Dans chaque dossier (shell, mfe-product, mfe-cart, mfe-reco)
npm install
npm start
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

## Stack technique

- **React 18** — interfaces utilisateur
- **Webpack 5** — bundling et Module Federation
- **Babel** — transpilation JSX/ES6+
