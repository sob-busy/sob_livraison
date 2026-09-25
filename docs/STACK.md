# STACK — Sob Livraison

| Besoin | Outil | Pourquoi |
|---|---|---|
| Framework | Next.js (App Router) | Standard professionnel, rapide, bien connu de Claude Code |
| Langage | TypeScript | Moins d'erreurs grâce au typage |
| Style | Tailwind CSS | Design rapide et responsive |
| Animations | Framer Motion | Animations fluides (écran de chargement, transitions) |
| Thème clair/sombre | next-themes | Sélecteur de thème simple |
| Traduction FR/EN | next-intl | Routes /fr et /en, textes dans des fichiers JSON |
| Formulaires | React Hook Form + Zod | Validation fiable des formulaires |
| Authentification | Supabase Auth (email + mot de passe) | Gratuit au démarrage, sécurisé |
| Base de données | Supabase (PostgreSQL) | Avec règles de sécurité RLS |
| Connexion à Supabase | @supabase/supabase-js + @supabase/ssr | Bibliothèques officielles pour Next.js |
| Emails de commande | Resend (paquet `resend`) | Email de confirmation automatique, gratuit jusqu'à 3 000 emails/mois |
| Carte | Leaflet + react-leaflet + tuiles OpenStreetMap | Gratuit, sans carte bancaire |
| Calcul d'itinéraire | openrouteservice (clé API gratuite) | Distance par la route |
| Icônes | lucide-react | Icônes modernes et légères |
| Notifications à l'écran | sonner | Messages de succès/erreur (toasts) |
| Statistiques | @vercel/analytics | Suivi des visites, respect de la vie privée |
| SEO | Metadata API de Next.js | Titres, descriptions, sitemap intégrés |
| Hébergement | Vercel (adresse gratuite *.vercel.app) | Déploiement automatique depuis GitHub. L'offre gratuite interdit l'usage commercial : on l'utilise pour le développement, et on choisit l'offre payante ou un autre hébergeur avant la mise en ligne |
| Versionnage | Git + GitHub | Sauvegarde et historique du code |

## Variables d'environnement (.env.local — jamais sur GitHub)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ORS_API_KEY=
RESEND_API_KEY=
EMAIL_FROM=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=22892889112
NEXT_PUBLIC_CONTACT_EMAIL=salaousobour@gmail.com
```
Un fichier `.env.example` (sans les valeurs secrètes) est gardé dans le projet comme modèle.

## Environnement
- Windows
- Node.js v24
- Git 2.55
- Éditeur : VS Code
- Assistant : Claude Code