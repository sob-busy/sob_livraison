# TASKS — Sob Livraison

Rythme : 1 à 2 h par jour. Une case = environ une session.
Règle : on ne passe à la tâche suivante que si la précédente fonctionne. Commit Git après chaque tâche terminée.

## Phase 0 — Mise en place
- [x] Créer le projet Next.js (TypeScript, Tailwind, App Router, dossier src) — mettre `CLAUDE.md` et `docs/` de côté pendant l'installation, puis les remettre
- [x] Créer le dépôt GitHub et faire le premier push
- [x] Installer les dépendances (next-intl, next-themes, framer-motion, lucide-react, react-hook-form, zod)
- [x] Configurer les polices (Playfair Display + Inter) et les couleurs du thème
- [x] Créer `.env.example` et vérifier que `.env.local` est dans `.gitignore`
- [ ] Ajouter favicon et logo (provisoires)

## Phase 1 — Site public
- [ ] Configurer next-intl (routes /fr et /en, adresses traduites, fichiers de traduction)
- [ ] Header + footer + menu mobile (bouton « Commander » → WhatsApp pour l'instant)
- [ ] Sélecteur de langue
- [ ] Sélecteur de thème clair/sombre
- [ ] Écran de chargement (moto animée)
- [ ] Page Accueil (hero, services, comment ça marche, appel à l'action)
- [ ] Page Services
- [ ] Page Contact (WhatsApp + email ; le formulaire viendra en Phase 2)
- [ ] Bouton WhatsApp flottant
- [ ] Page FAQ
- [ ] Pages légales (mentions légales, confidentialité, conditions générales) — version entrepreneur non immatriculé
- [ ] Page 404 personnalisée
- [ ] SEO : métadonnées FR/EN, image de partage, sitemap, robots
- [ ] Installer Vercel Analytics
- [ ] Vérification mobile de toute la Phase 1
- [ ] Premier déploiement sur Vercel (adresse gratuite, pour les tests)

## Phase 2 — Comptes, devis et commandes
- [ ] Créer le projet Supabase et connecter les variables d'environnement
- [ ] Créer les tables, types, règles RLS et fonctions (voir DATABASE.md)
- [ ] Inscription / connexion / déconnexion
- [ ] Mot de passe oublié
- [ ] Acceptation des conditions à l'inscription
- [ ] Protection des routes par rôle (`proxy.ts`)
- [ ] Carte Leaflet : choix départ et arrivée + bouton « ma position »
- [ ] Route API `/api/quote` (openrouteservice + formule de prix + distance max + limitation d'appels via Supabase)
- [ ] Formulaire de commande complet avec devis instantané
- [ ] Enregistrement de la commande (prix recalculé côté serveur)
- [ ] Email de confirmation automatique au client (Resend)
- [ ] Espace client : liste et statut des commandes
- [ ] Annulation par le client (avant assignation)
- [ ] Formulaire de contact (enregistré dans `contact_messages`, protection anti-spam)
- [ ] Bouton « Commander » du header → formulaire de commande
- [ ] États de chargement, liste vide et erreurs sur toutes les pages
- [ ] Liens WhatsApp pré-remplis pour contacter Sob Livraison

## Phase 3 — Administration et livreurs
- [ ] Tableau de bord admin : liste des commandes + filtres
- [ ] Changement de statut + historique
- [ ] Assignation d'un livreur
- [ ] Gestion des comptes livreurs
- [ ] Page de gestion des tarifs
- [ ] Espace livreur mobile (courses assignées, mise à jour du statut, marquer « payée »)

## Phase 4 — Tests
- [ ] Parcours complet client (inscription → commande → livrée)
- [ ] Parcours livreur et admin
- [ ] Test de sécurité : un client ne voit pas les commandes des autres
- [ ] Test sur plusieurs téléphones et connexion lente
- [ ] Test FR / EN et thème clair / sombre
- [ ] Score Lighthouse 90+ (performance, accessibilité, SEO)
- [ ] Relecture de tous les textes FR et EN

## Phase 5 — Mise en ligne
- [ ] Choisir l'hébergement de production (Vercel payant ou autre, car l'offre gratuite interdit l'usage commercial)
- [ ] Variables d'environnement sur l'hébergeur
- [ ] Déploiement final
- [ ] Compte admin créé en production
- [ ] Déclarer le site sur Google Search Console
- [ ] Créer la fiche Google Business Profile « Sob Livraison »
- [ ] (Plus tard) Nom de domaine personnalisé
- [ ] (Plus tard) Remplacer logo et photos provisoires
- [ ] (Plus tard) Mettre à jour les mentions légales après immatriculation
- [ ] (Plus tard) Notification WhatsApp automatique (API WhatsApp Business)