# DATABASE — Sob Livraison (Supabase / PostgreSQL)

## Types (enums)
- `user_role` : client, courier, admin
- `order_category` : parcel, meal, groceries
- `package_size` : small, medium, large
- `delivery_type` : immediate, scheduled
- `order_status` : pending, confirmed, assigned, in_progress, delivered, cancelled
- `payment_status` : unpaid, paid

## Tables

### profiles
Lié à `auth.users` (créé automatiquement à l'inscription par un trigger).
| Colonne | Type | Notes |
|---|---|---|
| id | uuid PK | = auth.users.id |
| full_name | text | obligatoire |
| phone | text | obligatoire, format +228 |
| email | text | |
| role | user_role | défaut : client |
| preferred_locale | text | fr ou en, défaut fr |
| terms_accepted_at | timestamptz | date d'acceptation des conditions |
| created_at | timestamptz | défaut now() |

### courier_details
| Colonne | Type | Notes |
|---|---|---|
| profile_id | uuid PK, FK profiles | |
| vehicle | text | moto, vélo, voiture... |
| is_available | boolean | défaut true |
| is_active | boolean | l'admin peut désactiver |

### orders
| Colonne | Type | Notes |
|---|---|---|
| id | uuid PK | |
| reference | text unique | ex : SOB-2026-0001 |
| client_id | uuid FK profiles | |
| courier_id | uuid FK profiles | nullable |
| category | order_category | |
| package_size | package_size | |
| description | text | |
| pickup_address | text | description libre (repère) |
| pickup_lat / pickup_lng | numeric | |
| dropoff_address | text | |
| dropoff_lat / dropoff_lng | numeric | |
| recipient_name | text | |
| recipient_phone | text | |
| delivery_type | delivery_type | |
| scheduled_at | timestamptz | si programmée |
| distance_km | numeric(6,2) | calculée côté serveur |
| price_fcfa | integer | calculé côté serveur |
| payment_method | text | 'cash' uniquement pour l'instant |
| payment_status | payment_status | défaut unpaid |
| status | order_status | défaut pending |
| cancellation_reason | text | si annulée |
| created_at / updated_at | timestamptz | |

### order_status_history
| Colonne | Type | Notes |
|---|---|---|
| id | uuid PK | |
| order_id | uuid FK orders | |
| status | order_status | |
| changed_by | uuid FK profiles | |
| created_at | timestamptz | |

### pricing_settings (une seule ligne)
| Colonne | Type | Valeur initiale |
|---|---|---|
| id | int PK | 1 |
| base_fee_fcfa | integer | 300 |
| price_per_km_fcfa | integer | 150 |
| minimum_fcfa | integer | 500 |
| surcharge_medium_fcfa | integer | 200 |
| surcharge_large_fcfa | integer | 500 |
| max_distance_km | integer | 30 |
| updated_at | timestamptz | |

### contact_messages
| Colonne | Type |
|---|---|
| id | uuid PK |
| name | text |
| phone | text |
| email | text |
| message | text |
| created_at | timestamptz |

### rate_limits
Compteur d'appels pour limiter `/api/quote`. Utilisée uniquement côté serveur.
| Colonne | Type | Notes |
|---|---|---|
| key | text PK | ex : `quote:<id utilisateur ou adresse IP>` |
| count | integer | nombre d'appels dans la fenêtre en cours |
| window_start | timestamptz | début de la fenêtre |

## Sécurité (RLS activé sur toutes les tables)
Important : RLS protège des lignes entières, pas des colonnes. Les modifications sensibles passent donc par des fonctions de la base de données (voir plus bas), et non par des modifications directes des tables.

- **profiles** : chacun lit son propre profil et modifie seulement `full_name`, `phone` et `preferred_locale` ; l'admin lit tout. Un trigger empêche tout non-admin de changer `role`.
- **orders** : le client lit ses propres commandes ; le livreur lit les commandes qui lui sont assignées ; l'admin lit tout. Aucune modification directe : la création passe par le serveur (prix recalculé), les changements passent par les fonctions ci-dessous.
- **order_status_history** : lecture selon l'accès à la commande ; écriture uniquement par le trigger.
- **pricing_settings** : lecture publique ; modification admin uniquement.
- **courier_details** : admin tous droits ; le livreur lit sa fiche et modifie seulement `is_available` (via fonction).
- **contact_messages** : insertion publique ; lecture admin uniquement.
- **rate_limits** : aucun accès depuis le navigateur ; uniquement côté serveur.

## Fonctions de la base de données (RPC)
| Fonction | Qui | Ce qu'elle fait |
|---|---|---|
| `cancel_order(order_id, reason)` | Client propriétaire | Annule si le statut est `pending` ou `confirmed` |
| `confirm_order(order_id)` | Admin | `pending` → `confirmed` |
| `assign_courier(order_id, courier_id)` | Admin | `confirmed` → `assigned` |
| `update_order_status(order_id, status)` | Livreur assigné ou admin | `assigned` → `in_progress` → `delivered` (admin : aussi `cancelled`) |
| `mark_order_paid(order_id)` | Livreur assigné ou admin | `payment_status` → `paid` |
| `set_courier_availability(is_available)` | Livreur | Change sa disponibilité |
| `check_rate_limit(key, max, window_seconds)` | Serveur | Compte les appels, renvoie vrai/faux |

## Automatismes (triggers)
- Création automatique du profil à l'inscription
- Mise à jour automatique de `updated_at`
- Génération de la référence `SOB-AAAA-0001` (le numéro repart à 0001 chaque année)
- Blocage du changement de `role` par un non-admin
- Ajout d'une ligne dans `order_status_history` à chaque changement de statut

## Index
- `orders(client_id)`, `orders(courier_id)`, `orders(status)`, `orders(created_at)`

## Formule de prix
```
prix = max(minimum_fcfa, base_fee_fcfa + distance_km × price_per_km_fcfa) + supplément_taille
```
Arrondi à la centaine de FCFA supérieure.