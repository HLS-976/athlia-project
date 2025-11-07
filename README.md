# Athlia - Plateforme Fitness Personnalisée

![React](https://img.shields.io/badge/React-19.1.0-61DAFB)
![Django](https://img.shields.io/badge/Django-5.2.3-092E20)

## 📋 Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Documentation](#api-documentation)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Contribuer](#contribuer)
- [Équipe](#équipe)
- [Licence](#licence)

---

## 🎯 À propos

**Athlia** est une plateforme web moderne de coaching fitness personnalisé qui combine technologie de pointe et expertise scientifique pour offrir une expérience utilisateur exceptionnelle. Le projet utilise React pour le frontend et Django REST Framework pour le backend.

### Objectifs du projet
- Proposer des exercices personnalisés adaptés aux contraintes physiques de chaque utilisateur
- Suivre la progression avec des graphiques et statistiques détaillées
- Fournir des conseils contextuels basés sur l'activité de l'utilisateur
- Offrir une interface moderne, accessible (RGAA) et responsive

---

## ✨ Fonctionnalités

### Gestion des utilisateurs
- ✅ Inscription et connexion sécurisées (JWT)
- ✅ Profil utilisateur personnalisable
- ✅ Gestion des contraintes physiques
- ✅ Protection des routes avec authentification

### Exercices
- ✅ Catalogue d'exercices par catégorie (zones musculaires)
- ✅ Exercices adaptatifs selon les contraintes de l'utilisateur
- ✅ Filtrage dynamique par zones avec modèle 3D interactif
- ✅ Historique des exercices réalisés (sets, reps, durée)
- ✅ Enregistrement des performances

### Dashboard
- ✅ Historique détaillé des séances d'exercices
- ✅ Graphiques de fréquence d'entraînement (barres personnalisées)
- ✅ Visualisation de l'utilisation musculaire avec système de niveaux
- ✅ Suivi de progression avec graphiques circulaires
- ✅ Conseils personnalisés dynamiques
- ✅ Interface Material-UI responsive

### Expérience utilisateur
- ✅ Interface moderne avec animations CSS/Three.js
- ✅ Modèle 3D de squelette interactif (Three.js + GLB)
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Accessibilité RGAA (labels, role, alt)
- ✅ Thème sombre moderne avec dégradés
- ✅ Navigation intuitive avec React Router
- ✅ Animations fluides et particules

---

## 🏗 Architecture

Le projet suit une architecture **client-serveur** avec séparation claire des responsabilités :

```
athlia-project/
├── backend/                    # API Django REST Framework
│   ├── src/
│   │   ├── athlia_project/    # Configuration principale
│   │   ├── user_account/      # Gestion des utilisateurs
│   │   ├── exercises_app/     # Exercices et catégories
│   │   ├── sport_profile/     # Profils sportifs et contraintes
│   │   └── advices_app/       # Système de conseils
│   └── requirements.txt
│
├── frontend/                   # Application React + Vite
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   ├── Pages/            # Pages de l'application
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Dashboard/
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── docs/                       # Documentation
│   ├── DEPLOIEMENT.md
│   ├── ARCHITECTURE.md
│   └── WIREFRAMES.md
│
└── README.md
```

**Technologies utilisées :**

### Backend
- **Django 5.2.3** - Framework web Python
- **Django REST Framework 3.16.0** - API REST
- **PostgreSQL** - Base de données relationnelle
- **SimpleJWT 5.5.0** - Authentification JWT
- **Django CORS Headers 4.7.0** - Gestion CORS
- **Python Decouple** - Gestion des variables d'environnement

### Frontend
- **React 19.1.0** - Bibliothèque UI
- **Vite 6.3.5** - Build tool moderne et rapide
- **React Router DOM 7.6.2** - Navigation SPA
- **Three.js 0.177.0** - Modèle 3D interactif (squelette)
- **@react-three/fiber** - Intégration Three.js avec React
- **@react-three/drei** - Helpers Three.js
- **Material-UI 7.2.0** - Composants Dashboard
- **CSS personnalisé** - Animations et styling

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** >= 18.0.0 (pour React 19 et Vite)
- **npm** (inclus avec Node.js)
- **Python** >= 3.10 (requis pour Django 5.2.3)
- **pip** (gestionnaire de paquets Python)
- **PostgreSQL** >= 14.0 (base de données locale) ou **Supabase** (production)
- **Git** (contrôle de version)

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/HLS-976/athlia-project.git
cd athlia-project
```

### 2. Installation du Backend

```bash
cd backend

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement virtuel
# Sur Linux/Mac :
source venv/bin/activate
# Sur Windows :
venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Créer le fichier .env (voir Configuration)
cp .env.example .env

# Appliquer les migrations
cd src
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Lancer le serveur
python manage.py runserver
```

Le backend sera accessible sur `http://localhost:8000`

### 3. Installation du Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

---

## ⚙️ Configuration

### Backend (.env)

Créez un fichier `.env` dans `/backend/` :

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True

# Base de données PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/athlia_db

# CORS (Frontend URL)
CORS_ALLOWED_ORIGINS=http://localhost:5173

# JWT
ACCESS_TOKEN_LIFETIME=20
REFRESH_TOKEN_LIFETIME=1
```

**⚠️ Générer une SECRET_KEY sécurisée :**

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**🔒 Sécurité :**
- ⚠️ **Ne jamais committer le fichier `.env`** (déjà dans `.gitignore`)
- Utilisez des mots de passe forts pour la base de données
- En production : `DEBUG=False` et changez toutes les clés

### Frontend

Le frontend utilise les variables d'environnement directement dans le code :

```javascript
// API Backend par défaut : http://localhost:8000/api
// Modifiable dans les composants si nécessaire pour production
```

### Base de données

**Développement local (PostgreSQL) :**

```bash
# Créer la base de données locale
createdb athlia_db

# Ou avec psql :
psql -U postgres
CREATE DATABASE athlia_db;
CREATE USER votre_user WITH PASSWORD 'votre_mot_de_passe_securise';
GRANT ALL PRIVILEGES ON DATABASE athlia_db TO votre_user;
\q
```

**Production (Supabase) :**

1. Créez un projet sur [Supabase](https://supabase.com)
2. Récupérez l'URL de connexion PostgreSQL dans les paramètres
3. Ajoutez-la dans votre `.env` :
```env
DATABASE_URL=postgresql://[supabase-connection-string]
```

**⚠️ Sécurité :** Utilisez un mot de passe fort et ne le partagez jamais dans le code

---

## 💻 Utilisation

### Commandes Backend

```bash
# Lancer le serveur de développement
python manage.py runserver

# Créer des migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Accéder à l'admin Django
# http://localhost:8000/admin

# Lancer les tests
python manage.py test

# Collecter les fichiers statiques
python manage.py collectstatic
```

### Commandes Frontend

```bash
# Développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview

# Linter
npm run lint
```

---

## 📚 API Documentation

### Authentification

#### Obtenir un token JWT
```http
POST /api/token/
Content-Type: application/json

{
  "email": "votre_email@example.com",
  "password": "votre_mot_de_passe"
}
```

**Réponse :**
```json
{
  "access": "<ACCESS_TOKEN_JWT>",
  "refresh": "<REFRESH_TOKEN_JWT>"
}
```

**🔒 Sécurité :** 
- Les tokens JWT sont sensibles et personnels
- Ne jamais partager ou exposer vos tokens
- Les stocker de manière sécurisée côté client

#### Rafraîchir le token
```http
POST /api/token/refresh/
Content-Type: application/json

{
  "refresh": "<VOTRE_REFRESH_TOKEN>"
}
```

**Réponse :**
```json
{
  "access": "<NOUVEAU_ACCESS_TOKEN>"
}
```

### Utilisateurs

#### Créer un compte
```http
POST /api/register/
Content-Type: application/json

{
  "email": "votre_email@example.com",
  "user_name": "votre_username",
  "first_name": "Prenom",
  "last_name": "Nom",
  "password": "MotDePasseSecurise123!"
}
```

**🔒 Le mot de passe doit contenir au moins 8 caractères**

#### Récupérer le profil utilisateur
```http
GET /api/user/
Authorization: Bearer <VOTRE_ACCESS_TOKEN>
```

**⚠️ Important :** Remplacez `<VOTRE_ACCESS_TOKEN>` par le token obtenu lors de la connexion

### Exercices

#### Liste des catégories
```http
GET /api/categories/
```

#### Liste des exercices
```http
GET /api/exercises/
Authorization: Bearer <VOTRE_ACCESS_TOKEN>
```

#### Créer une entrée d'exercice
```http
POST /api/entries/
Authorization: Bearer <VOTRE_ACCESS_TOKEN>
Content-Type: application/json

{
  "exercise": 1,
  "sets": 3,
  "reps": 12,
  "duration_minutes": 15,
  "notes": "Bon ressenti"
}
```

**⚠️ Remplacez `<VOTRE_ACCESS_TOKEN>` par votre token JWT**

### Profil Sportif

#### Créer/Mettre à jour le profil sportif
```http
POST /api/sport-profiles/
Authorization: Bearer <VOTRE_ACCESS_TOKEN>
Content-Type: application/json

{
  "age": 25,
  "goals": "Prise de masse",
  "level_user": "intermediate",
  "constraints": [1, 2, 3]
}
```

**⚠️ Authentification requise**

**Pour plus d'endpoints :** Consultez le code dans `/backend/src/*/urls.py`

---

## 🧪 Tests

### Backend

```bash
cd backend/src

# Lancer tous les tests
python manage.py test

# Lancer les tests d'une app spécifique
python manage.py test user_account

# Avec couverture
coverage run --source='.' manage.py test
coverage report
```

### Frontend

```bash
cd frontend

# Linting
npm run lint

# (Tests unitaires à implémenter)
```

---

## 🚢 Déploiement

### Solutions gratuites recommandées

**Frontend (React) :**
- **Vercel** (recommandé) : Déploiement automatique depuis GitHub, gratuit
  - Connectez votre repo GitHub
  - Build command : `npm run build`
  - Output directory : `dist`
  
**Backend (Django) :**
- **Render.com** (recommandé) : Service gratuit avec limitations (spin down après inactivité)
  - Connectez votre repo GitHub
  - Build command : `pip install -r requirements.txt`
  - Start command : `gunicorn athlia_project.wsgi:application`

**Base de données :**
- **Supabase** : PostgreSQL hébergé gratuit (500 MB)
  - URL de connexion fournie automatiquement
  - Configuration : `DATABASE_URL=postgresql://[supabase-connection-string]?sslmode=require`

### Variables d'environnement en production

```env
DEBUG=False
SECRET_KEY=<nouvelle-cle-generee>
DATABASE_URL=<url-supabase>
ALLOWED_HOSTS=votre-app.onrender.com
CORS_ALLOWED_ORIGINS=https://votre-app.vercel.app
```

**⚠️ Important :** Changez toutes les clés et mots de passe pour la production

---

## 👥 Équipe

- **Hilliass** - Backend Developer - [@HLS-976](https://github.com/HLS-976)
- **Brenda** - Frontend Developer - [@BreeVerse](https://github.com/BreeVerse)
- **Charlène** - UI/UX Designer - [@Knarta](https://github.com/Knarta)

---

## 📞 Contact

Pour toute question ou suggestion :

- GitHub Issues : [athlia-project/issues](https://github.com/HLS-976/athlia-project/issues)

---

**Projet développé dans le cadre d'une formation**

