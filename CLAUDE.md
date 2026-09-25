# CLAUDE.md — Sob Livraison

## Le projet
Site de Sob Livraison, service de livraison à Lomé (Togo) pour les particuliers : devis instantané selon la distance, commandes, comptes clients, espace livreur et espace admin. Français par défaut, anglais disponible.

## Documents de référence (à lire avant toute tâche)
- `docs/PRD.md` : fonctionnalités et règles métier
- `docs/STACK.md` : outils et bibliothèques autorisés
- `docs/ARCHITECTURE.md` : structure des dossiers, rôles, flux des commandes, adresses traduites
- `docs/DATABASE.md` : tables, sécurité RLS, fonctions, formule de prix
- `docs/DESIGN.md` : couleurs, typographie, composants, animations
- `docs/TASKS.md` : liste des tâches par phase (cocher les tâches terminées)

## Qui je suis
Je suis débutant complet en code. Je suis sous Windows et j'utilise VS Code et le terminal.

## Comment travailler avec moi
- Explique chaque étape simplement, en français, avant de la faire
- Avance une tâche de `TASKS.md` à la fois
- Demande ma confirmation avant les grosses modifications ou l'installation de nouveaux paquets
- N'ajoute pas de bibliothèque absente de `STACK.md` sans me demander
- À la fin de chaque tâche : dis-moi comment la tester, puis propose un message de commit Git
- Si une erreur survient, explique sa cause en termes simples

## Règles de code
- TypeScript strict, composants React fonctionnels
- Mobile d'abord (mobile first) avec Tailwind
- Aucun texte écrit en dur : tous les textes passent par next-intl (`messages/fr.json` et `messages/en.json`)
- Respecter les couleurs et polices de `DESIGN.md` dans les deux thèmes
- Le prix est toujours calculé côté serveur
- Ne jamais exposer de clé secrète côté navigateur ni la mettre sur GitHub
- RLS activé sur toutes les tables Supabase
- Noms de fichiers, variables et code en anglais ; interface en français/anglais
- Chaque page a ses métadonnées SEO en FR et EN
- Chaque écran gère les états : chargement, vide, erreur, succès
- Validation Zod côté navigateur ET côté serveur
- Les valeurs de contact viennent des variables d'environnement, jamais écrites en dur
- Vérifier que `npm run build` passe avant de proposer un commit

## Commandes utiles
- `npm run dev` : lancer le site en local (http://localhost:3000)
- `npm run build` : vérifier que le projet compile
- `npm run lint` : vérifier la qualité du code

## Consignes Next.js 16 (générées par create-next-app)
@AGENTS.md