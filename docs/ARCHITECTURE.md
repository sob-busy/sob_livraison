# ARCHITECTURE — Sob Livraison

## Vue d'ensemble
```
Navigateur (mobile d'abord)
   │
   ▼
Next.js sur Vercel
   ├── Pages publiques (/fr, /en)
   ├── Espaces protégés : client, livreur, admin
   └── Routes serveur (API) : calcul de distance et de prix
   │
   ├──► Supabase (Auth + PostgreSQL + RLS)
   ├──► openrouteservice (distance par la route)
   └──► Resend (emails de confirmation de commande)
```

## Structure des dossiers
Les dossiers de pages sont nommés en anglais. Les adresses affichées sont traduites grâce à la configuration `pathnames` de next-intl (`src/i18n/routing.ts`).

```
messages/                         # Textes de l'interface (à la racine du projet)
├── fr.json
└── en.json
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              # Accueil
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── legal-notice/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── not-found.tsx         # Page 404
│   │   ├── account/              # Espace client (protégé)
│   │   │   ├── page.tsx          # Mes commandes
│   │   │   └── order/page.tsx    # Nouvelle commande
│   │   ├── courier/page.tsx      # Espace livreur (protégé, rôle courier)
│   │   └── admin/                # Espace admin (protégé, rôle admin)
│   │       ├── page.tsx          # Commandes
│   │       ├── couriers/page.tsx
│   │       └── pricing/page.tsx
│   ├── api/
│   │   └── quote/route.ts        # Calcul distance + prix côté serveur
│   ├── sitemap.ts                # Plan du site pour Google
│   └── robots.ts
├── components/
│   ├── ui/                       # Boutons, champs, cartes...
│   ├── layout/                   # Header, footer, sélecteurs langue/thème
│   ├── loading/                  # Écran de chargement moto
│   └── map/                      # Carte Leaflet
├── i18n/                         # Configuration next-intl (langues, adresses traduites)
├── lib/
│   ├── supabase/                 # Clients Supabase (navigateur et serveur)
│   ├── email/                    # Envoi des emails (Resend)
│   ├── pricing.ts                # Formule de prix
│   └── validations/              # Schémas Zod
└── proxy.ts                      # Langue + protection des routes par rôle
                                  # (s'appelait middleware.ts avant Next.js 16)
```

## Adresses traduites
| Page | Français | Anglais |
|---|---|---|
| Services | /fr/services | /en/services |
| Contact | /fr/contact | /en/contact |
| FAQ | /fr/faq | /en/faq |
| Mentions légales | /fr/mentions-legales | /en/legal-notice |
| Confidentialité | /fr/confidentialite | /en/privacy |
| Conditions | /fr/conditions | /en/terms |
| Connexion | /fr/connexion | /en/login |
| Inscription | /fr/inscription | /en/signup |
| Mot de passe oublié | /fr/mot-de-passe-oublie | /en/forgot-password |
| Espace client | /fr/compte | /en/account |
| Commander | /fr/compte/commander | /en/account/order |
| Espace livreur | /fr/livreur | /en/courier |
| Admin | /fr/admin | /en/admin |
| Admin — livreurs | /fr/admin/livreurs | /en/admin/couriers |
| Admin — tarifs | /fr/admin/tarifs | /en/admin/pricing |

## Rôles et accès
| Espace | Client | Livreur | Admin |
|---|---|---|---|
| Pages publiques | ✅ | ✅ | ✅ |
| Espace client | ✅ | ❌ | ✅ |
| Espace livreur | ❌ | ✅ | ✅ |
| Admin | ❌ | ❌ | ✅ |

La protection se fait à deux niveaux : `proxy.ts` (redirection) ET les règles RLS de Supabase (sécurité réelle des données).

## Flux d'une commande
1. Le client place départ et arrivée sur la carte
2. Le navigateur appelle `/api/quote` avec les coordonnées et la taille
3. Le serveur demande la distance à openrouteservice, lit les tarifs dans `pricing_settings`, calcule le prix
4. Le client voit le devis et valide
5. Le serveur recalcule le prix et enregistre la commande (statut `pending`)
6. Un email de confirmation est envoyé automatiquement au client (Resend)
7. L'admin confirme et assigne un livreur
8. Le livreur passe la commande en `in_progress` puis `delivered`, et la marque « payée »
9. Le client suit le statut dans son espace

## Règles importantes
- Le prix est TOUJOURS recalculé côté serveur (jamais confiance au prix envoyé par le navigateur)
- Les clés openrouteservice, Resend et Supabase service role restent côté serveur
- Notifications : email automatique au client + liens wa.me pour contacter Sob Livraison. WhatsApp automatique plus tard.
- Le devis refuse les distances supérieures à `max_distance_km` et renvoie vers WhatsApp
- Aucun blocage géographique ni horaire : on peut commander à toute heure, partout dans la limite de distance
- Phase 1 (sans base de données) : le bouton « Commander » ouvre WhatsApp, et la page Contact n'a que WhatsApp et email

## Sécurité
- Validation Zod côté navigateur ET côté serveur
- Limitation du nombre d'appels à `/api/quote` (protège le quota gratuit openrouteservice) : compteur stocké dans Supabase (table `rate_limits`)
- Formulaire de contact protégé contre le spam (champ piège invisible)
- Les changements sensibles (statut, assignation, paiement, rôle) passent par des fonctions de la base de données, pas par des modifications directes des tables (voir DATABASE.md)
- En-têtes de sécurité HTTP configurés dans `next.config`
- Données personnelles : collecte minimale, conforme à la loi togolaise sur la protection des données personnelles

## SEO et performance
- Métadonnées (titre, description, Open Graph) pour chaque page, en FR et EN
- Balises hreflang pour les deux langues
- `sitemap.xml` et `robots.txt`
- Images optimisées avec `next/image`
- L'écran de chargement ne bloque pas l'affichage du contenu
- Objectif Lighthouse : 90+ en performance, accessibilité et SEO

## Suivi
- Vercel Analytics (visites, pages vues)
- Journal des erreurs visible dans le tableau de bord Vercel
