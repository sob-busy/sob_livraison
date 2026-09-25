# PRD — Sob Livraison

## 1. Vision
Sob Livraison est un service de livraison à Lomé (Togo). Le site permet aux particuliers de calculer le prix d'une livraison (devis instantané selon la distance) et de passer commande en quelques clics, depuis leur téléphone.

## 2. Cible
- Particuliers habitant Lomé
- Majoritairement sur mobile, avec une connexion parfois lente
- Langues : français (par défaut) et anglais

## 3. Ce que l'on livre
- Colis et documents
- Repas (restaurants)
- Courses (marché, supermarché)

## 4. Acteurs
| Rôle | Description |
|---|---|
| Client | Crée un compte, demande un devis, passe commande, suit ses commandes |
| Livreur partenaire | Livreur indépendant. Voit les courses qui lui sont assignées et met à jour leur statut |
| Administrateur | Gère les commandes, assigne les livreurs, gère les tarifs et les comptes livreurs |

## 5. Fonctionnalités

### Phase 1 — Site public
- Écran de chargement court (moto animée, 2 secondes maximum, sans bloquer l'affichage de la page)
- Pages : Accueil, Services, FAQ, Contact
- Pages légales : Mentions légales, Politique de confidentialité, Conditions générales (CGU/CGV)
  - Rédigées pour un entrepreneur individuel non immatriculé (à mettre à jour après immatriculation)
- Page 404 personnalisée
- Référencement Google (SEO) : titres, descriptions, aperçu de partage WhatsApp/Facebook
- Sélecteur de langue FR / EN (adresses traduites : `/fr/connexion` ↔ `/en/login`)
- Sélecteur de thème clair / sombre (au choix de l'utilisateur)
- Boutons de contact WhatsApp et email (pas encore de formulaire de contact)
- Bouton « Commander » : ouvre WhatsApp en Phase 1, puis le formulaire de commande en Phase 2
- Logo et photos provisoires (remplacés plus tard par les vrais)

### Phase 2 — Comptes, devis et commandes
- Inscription / connexion par email + mot de passe (compte obligatoire pour commander)
- Mot de passe oublié (réinitialisation par email)
- Acceptation des conditions générales à l'inscription
- Formulaire de commande :
  - Catégorie : colis/documents, repas, courses
  - Taille : petit / moyen / grand (influence le prix)
  - Point de départ et point d'arrivée placés sur une carte (ou position GPS)
  - Nom et téléphone du destinataire
  - Livraison immédiate ou programmée (date et heure)
- Devis instantané affiché avant validation
- Paiement : espèces à la livraison uniquement (le livreur marque la commande « payée » à la livraison)
- Espace client : liste des commandes et leur statut
- Annulation par le client tant que la commande n'est pas assignée
- Notification automatique par email au client à la création de la commande (+ lien WhatsApp pour contacter Sob Livraison)
- Formulaire de contact (messages enregistrés dans la base de données)

### Phase 3 — Administration et livreurs
- Tableau de bord admin : toutes les commandes, filtres par statut
- Assignation d'une commande à un livreur
- Gestion des comptes livreurs (créés par l'admin)
- Modification des tarifs sans toucher au code
- Espace livreur (mobile) : courses assignées, mise à jour du statut

## 6. Tarification
Prix = max(prix minimum, frais de base + distance × prix par km) + supplément taille, arrondi à la centaine supérieure.

| Élément | Valeur |
|---|---|
| Frais de base (prise en charge) | 300 FCFA |
| Prix par km (distance par la route) | 150 FCFA |
| Prix minimum | 500 FCFA |
| Supplément taille moyen (sac, carton moyen) | + 200 FCFA |
| Supplément taille grand (gros carton, plusieurs sacs) | + 500 FCFA |
| Distance maximum | 30 km (au-delà : devis sur WhatsApp) |

Exemples :
- 2 km, petit colis : 300 + 300 = 600 FCFA
- 6 km, colis moyen : 300 + 900 + 200 = 1 400 FCFA
- 12 km, grand colis : 300 + 1 800 + 500 = 2 600 FCFA

Tous les tarifs sont modifiables par l'admin sans toucher au code.

## 7. Suivi de commande
Statuts simples : En attente → Confirmée → Assignée → En cours → Livrée (ou Annulée).

## 8. Contact
- WhatsApp / téléphone : +228 92 88 91 12
- Email : salaousobour@gmail.com
- Zone couverte : Grand Lomé (aucun blocage géographique ; seule la distance maximum de 30 km s'applique)
- Commandes : possibles à toute heure et tous les jours (immédiates ou programmées)

## 8 bis. Règles de service
- Livraison immédiate : délai indicatif de 30 à 60 minutes selon la distance
- Livraison programmée : au moins 1 heure à l'avance, jusqu'à 7 jours
- Annulation gratuite tant que la commande n'est pas assignée à un livreur
- Objets interdits : produits illégaux, dangereux ou inflammables, armes, animaux vivants, sommes d'argent importantes
- Le client doit être joignable par téléphone pendant la livraison

## 8 ter. Indicateurs de réussite
- Nombre de commandes par semaine
- Taux de commandes livrées vs annulées
- Délai moyen de livraison
- Nombre de clients qui recommandent

## 9. Hors périmètre (pour l'instant)
- Notification WhatsApp automatique (API WhatsApp Business de Meta : payante, numéro dédié, plus simple une fois l'entreprise immatriculée)
- Paiement Mobile Money (T-Money, Flooz)
- Suivi du livreur en direct sur carte
- Connexion par SMS ou Google
- Adresses favorites
- Application mobile native