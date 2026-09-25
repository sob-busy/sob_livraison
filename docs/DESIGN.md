# DESIGN — Sob Livraison

## Ambiance
Élégante, moderne et fluide. Inspire la confiance et la rapidité. Pensé d'abord pour le mobile.

## Couleurs
Palette « Bleu nuit & Ambre » : le bleu nuit inspire confiance et sérieux, l'ambre évoque la rapidité et attire l'œil sur les boutons d'action. (À ajuster si le logo impose d'autres teintes.)

| Rôle | Clair | Sombre |
|---|---|---|
| Primaire (bleu nuit) — titres, header, liens | `#0B2545` | `#8DB3E2` |
| Accent (ambre) — boutons d'action, prix, badges | `#F2A900` | `#F5B82E` |
| Texte sur bouton ambre | `#0B2545` | `#0B2545` |
| Bordures | `#E4E4E7` | `#2A2A2E` |
| Fond | `#FFFFFF` | `#0F0F10` |
| Surface (cartes) | `#F6F6F7` | `#1A1A1C` |
| Texte principal | `#111111` | `#F5F5F5` |
| Texte secondaire | `#5F6368` | `#A1A1AA` |
| Succès | `#16A34A` | `#22C55E` |
| Erreur | `#DC2626` | `#EF4444` |

Les couleurs sont définies comme variables CSS dans Tailwind pour basculer entre les thèmes.

## Thème
- Clair et sombre, choisi par l'utilisateur via un bouton dans le header
- Par défaut : suit le réglage du téléphone
- Le choix est mémorisé

## Typographie (Google Fonts via next/font)
- Titres : **Playfair Display** (élégante)
- Texte : **Inter** (lisible sur petit écran)
- Taille minimum du texte : 16px sur mobile

## Visuels
- Vraies photos (livreurs, rues de Lomé, colis, repas)
- Photos optimisées avec `next/image` (format WebP, chargement différé)
- Icônes : lucide-react

## Écran de chargement
- Petite moto animée qui traverse l'écran avec le logo
- Durée maximum : 2 secondes
- Affiché seulement au premier chargement du site

## Composants
- Boutons arrondis (rounded-xl), grands et faciles à toucher (hauteur min. 44px)
- Cartes avec ombres légères
- Bouton WhatsApp flottant en bas à droite sur toutes les pages publiques
- Header : logo, menu, sélecteur de langue, sélecteur de thème, bouton « Commander »
- Menu hamburger sur mobile

## Animations
- Apparition douce des sections au défilement (Framer Motion)
- Transitions courtes (200–400 ms)
- Respecter le réglage « réduire les animations » du téléphone

## États de l'interface
- Chargement : squelettes (skeletons) plutôt que des écrans vides
- Liste vide : message clair + bouton d'action (ex. « Aucune commande — Commander »)
- Erreur : message compréhensible + bouton « Réessayer »
- Succès : notification courte (toast)

## Identité
- Favicon et icône d'application aux couleurs de la marque
- Image de partage (Open Graph 1200×630) pour WhatsApp et Facebook
- Ton des textes : professionnel, chaleureux, vouvoiement

## Accessibilité
- Contraste suffisant dans les deux thèmes
- Tous les champs ont un label
- Navigation possible au clavier