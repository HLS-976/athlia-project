# Guide de Déploiement - Athlia

Ce document détaille toutes les étapes nécessaires pour déployer l'application Athlia en production sur Railway avec Supabase.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [État actuel du déploiement](#état-actuel-du-déploiement)
- [Architecture de production prévue](#architecture-de-production-prévue)
- [Prérequis](#prérequis)
- [Configuration Supabase](#configuration-supabase)
- [Préparation du projet](#préparation-du-projet)
- [Déploiement sur Railway](#déploiement-sur-railway)
- [Configuration post-déploiement](#configuration-post-déploiement)
- [Maintenance et monitoring](#maintenance-et-monitoring)
- [Rollback](#rollback)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Vue d'ensemble

Athlia utilise une architecture moderne cloud-native avec **Railway** pour l'hébergement de l'application et **Supabase** pour la base de données PostgreSQL.

### Architecture de déploiement

```
┌─────────────────────────────────────────────────────┐
│                   UTILISATEURS                      │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ HTTPS (443)
                        ▼
┌─────────────────────────────────────────────────────┐
│              RAILWAY (PaaS)                         │
│  ┌──────────────────────────────────────────────┐   │
│  │  HTTPS Auto-managé par Railway               │   │
│  └────────────────┬─────────────────────────────┘   │
│                   │                                  │
│  ┌────────────────▼──────────────┐                  │
│  │   Backend Django + Frontend   │                  │
│  │                               │                  │
│  │  • Gunicorn (WSGI Server)    │                  │
│  │  • React Build (Static)       │                  │
│  │  • WhiteNoise (Static files)  │                  │
│  │  • API REST                   │                  │
│  └────────────────┬──────────────┘                  │
│                   │                                  │
└───────────────────┼──────────────────────────────────┘
                    │
                    │ SSL/TLS Connection
                    ▼
┌─────────────────────────────────────────────────────┐
│              SUPABASE (DBaaS)                       │
│  ┌──────────────────────────────────────────────┐   │
│  │        PostgreSQL Database                   │   │
│  │  • Connexion SSL sécurisée                  │   │
│  │  • Sauvegardes automatiques                 │   │
│  │  • Haute disponibilité                      │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 État actuel du déploiement

L'application fonctionne actuellement en **architecture hybride** :

- **Base de données** : PostgreSQL sur **Supabase** (production)
- **Backend** : Serveur de développement Django sur `localhost:8000`
- **Frontend** : Serveur de développement Vite sur `localhost:5173`

Cette approche permet de travailler en conditions quasi-production tout en conservant la flexibilité du développement local.

---

## 🚀 Architecture de production prévue

L'application sera déployée sur **Railway** dans une architecture **tout-en-un** :

### Composants

**1. Backend Django**
   - Serveur WSGI Gunicorn
   - API REST avec Django REST Framework
   - Authentification JWT

**2. Frontend React**
   - Build de production intégré via fichiers statiques
   - Servi par Django via WhiteNoise
   - SPA avec React Router

**3. Base de données PostgreSQL**
   - Hébergée sur Supabase
   - Connexion SSL sécurisée
   - Sauvegardes automatiques

**4. Gestion des fichiers statiques**
   - WhiteNoise pour compression et distribution optimisée
   - Caching navigateur avec headers appropriés

**5. Sécurité**
   - HTTPS automatiquement géré par Railway
   - Variables d'environnement sécurisées
   - CORS configuré pour la production

### Stack technique

| Composant | Technologie | Hébergement |
|-----------|-------------|-------------|
| **Frontend** | React 19.1.0 + Vite | Railway (static) |
| **Backend** | Django 5.2.3 + DRF | Railway |
| **Serveur WSGI** | Gunicorn | Railway |
| **Base de données** | PostgreSQL | Supabase |
| **Fichiers statiques** | WhiteNoise | Railway |
| **SSL/HTTPS** | Automatique | Railway |
| **CDN** | Intégré | Railway |

---

## 📦 Prérequis

### Comptes nécessaires

**1. Compte Railway**
   - Créer un compte sur [railway.app](https://railway.app)
   - Lier votre compte GitHub (recommandé)
   - Plan gratuit : 500h/mois + $5 crédit

**2. Compte Supabase**
   - Créer un compte sur [supabase.com](https://supabase.com)
   - Plan gratuit : 500 MB database

**3. Repository GitHub**
   - Code source hébergé sur GitHub
   - Accès en lecture pour Railway

### Outils de développement

- Git
- Node.js 18+
- Python 3.10+
- npm ou yarn

---

## 🗄️ Configuration Supabase

### Étape 1 : Créer un projet

1. Se connecter sur [supabase.com](https://supabase.com)
2. Cliquer sur **"New Project"**
3. Configurer :
   - **Name** : `athlia-db`
   - **Database Password** : Générer un mot de passe fort
   - **Region** : `West EU (Ireland)` (ou la plus proche)
   - **Plan** : Free ou Pro

4. Attendre ~2 minutes (création du projet)

### Étape 2 : Récupérer l'URL de connexion

1. **Settings** → **Database**
2. Section **Connection string** → **URI**
3. Copier l'URL :

```
postgresql://postgres.xxxxx:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

⚠️ **Important** : Remplacer `[PASSWORD]` par votre mot de passe

### Étape 3 : Sécurité

- ✅ SSL/TLS activé par défaut
- ✅ Connection pooling (port 6543)
- ✅ Sauvegardes quotidiennes automatiques
- ✅ Firewall configurable

---

## 🔧 Préparation du projet

### Configuration nécessaire pour Railway

**1. Dépendances backend**

Ajouter dans `backend/requirements.txt` :

```txt
gunicorn==23.0.0
whitenoise==6.8.2
```

**2. Configuration Django**

Dans `backend/src/athlia_project/settings.py` :

```python
from decouple import config, Csv

# Production
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

# Middleware WhiteNoise
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ← Ajouter
    # ... reste
]

# Static files
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# CORS
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv())
CORS_ALLOW_CREDENTIALS = True
```

**3. URLs Django**

Dans `backend/src/athlia_project/urls.py` :

```python
from django.views.generic import TemplateView
from django.urls import re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('...')),
    
    # Catch-all pour React Router
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
```

**4. Fichiers de configuration Railway**

Créer `backend/Procfile` :

```
web: cd src && gunicorn athlia_project.wsgi:application --bind 0.0.0.0:$PORT
release: cd src && python manage.py migrate && python manage.py collectstatic --noinput
```

Créer `backend/runtime.txt` :

```
python-3.11.0
```

**5. Build du frontend**

```bash
cd frontend
npm run build
cp -r dist/* ../backend/src/staticfiles/
```

---

## 🚂 Déploiement sur Railway

### Étape 1 : Créer le projet

1. Aller sur [railway.app](https://railway.app)
2. **"New Project"** → **"Deploy from GitHub repo"**
3. Sélectionner `athlia-project`
4. Railway détecte automatiquement Django

### Étape 2 : Configuration

**Settings :**
- **Root Directory** : `/backend`
- **Start Command** : `cd src && gunicorn athlia_project.wsgi:application --bind 0.0.0.0:$PORT`

### Étape 3 : Variables d'environnement

Onglet **"Variables"** :

```env
SECRET_KEY=<générer-ci-dessous>
DEBUG=False
ALLOWED_HOSTS=*.up.railway.app
PORT=8000
DATABASE_URL=<url-supabase>
CORS_ALLOWED_ORIGINS=https://athlia-production.up.railway.app
```

**Générer SECRET_KEY :**

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Étape 4 : Déploiement

Railway déploie automatiquement. Suivre dans **"Deployments"**.

### Étape 5 : Migrations

Terminal Railway :

```bash
cd src
python manage.py migrate
python manage.py createsuperuser
```

### Étape 6 : URL publique

Votre app est sur : `https://athlia-production-xxxx.up.railway.app`

---

## 🌐 Configuration post-déploiement

### Domaine personnalisé (optionnel)

1. **Settings** → **Domains** → **Add Domain**
2. Configurer DNS :

```
Type: CNAME
Name: athlia
Value: athlia-production.up.railway.app
```

3. Mettre à jour les variables :

```env
ALLOWED_HOSTS=*.up.railway.app,athlia.votredomaine.com
CORS_ALLOWED_ORIGINS=https://athlia.votredomaine.com
```

### Tests

✅ Page d'accueil : `https://votre-app.up.railway.app/`  
✅ Admin Django : `https://votre-app.up.railway.app/admin/`  
✅ API : `https://votre-app.up.railway.app/api/`

---

## 📊 Maintenance et monitoring

### Railway Dashboard

- **Logs** : Temps réel dans Deployments
- **Métriques** : CPU, RAM, bande passante
- **Uptime** : Disponibilité

### CLI Railway

```bash
npm i -g @railway/cli
railway login
railway logs
```

### Supabase

- **Database Health** : Métriques de performance
- **Backups** : Sauvegardes automatiques quotidiennes

### Mises à jour

```bash
git add .
git commit -m "update"
git push origin main
# Railway redéploie automatiquement
```

---

## ⏮️ Rollback

### Option 1 : Dashboard

1. **Deployments** → Trouver version précédente
2. **⋮** → **Redeploy**

### Option 2 : Git

```bash
git revert HEAD
git push origin main
```

### Option 3 : CLI

```bash
railway rollback
```

---

## 🔧 Troubleshooting

### Application ne démarre pas

```bash
railway logs
```

**Erreurs courantes :**
- `ModuleNotFoundError` → Vérifier `requirements.txt`
- `SECRET_KEY not found` → Vérifier variables Railway
- `Connection refused` → Vérifier `DATABASE_URL`

### Erreur 500

```bash
# Activer DEBUG temporairement
DEBUG=True
railway logs
# Puis remettre DEBUG=False
```

### Migrations

```bash
python src/manage.py showmigrations
python src/manage.py migrate
```

### Fichiers statiques

```bash
python src/manage.py collectstatic --noinput --clear
```

### CORS

Vérifier :
```env
CORS_ALLOWED_ORIGINS=https://votre-app.up.railway.app
ALLOWED_HOSTS=*.up.railway.app
```

### Supabase inaccessible

```bash
psql "postgresql://postgres.xxxxx:[PASSWORD]@...com:6543/postgres"
```

Vérifier :
- Connection pooling activé
- URL correcte
- Mot de passe valide

---

## 📝 Checklist de déploiement

### Avant

- [ ] Code testé localement
- [ ] Frontend build fonctionne
- [ ] Compte Railway créé
- [ ] Compte Supabase créé
- [ ] `requirements.txt` à jour (gunicorn, whitenoise)
- [ ] WhiteNoise configuré
- [ ] CORS configuré
- [ ] Procfile créé
- [ ] Frontend buildé

### Variables Railway

- [ ] SECRET_KEY
- [ ] DEBUG=False
- [ ] ALLOWED_HOSTS
- [ ] DATABASE_URL
- [ ] CORS_ALLOWED_ORIGINS

### Après

- [ ] URL accessible
- [ ] Routes React fonctionnent
- [ ] API fonctionne
- [ ] Admin accessible
- [ ] HTTPS actif
- [ ] Superuser créé
- [ ] Logs consultés

---

## 🚀 Optimisations

### Performance

- **Redis** : Caching (service Railway)
- **CDN** : Railway CDN intégré
- **Scaling** : Automatique dans Railway

### Sécurité

```python
# settings.py production
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

---

## 📞 Support

**Documentation :**
- Railway : [docs.railway.app](https://docs.railway.app)
- Supabase : [supabase.com/docs](https://supabase.com/docs)
- Django : [docs.djangoproject.com](https://docs.djangoproject.com)
