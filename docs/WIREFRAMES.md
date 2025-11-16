# Wireframes et Maquettes - Athlia

Ce document présente les wireframes, maquettes et design système de l'application Athlia.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Charte graphique](#charte-graphique)
- [Wireframes](#wireframes)
- [User Flow](#user-flow)
- [Composants UI](#composants-ui)
- [Responsive Design](#responsive-design)
- [Accessibilité](#accessibilité)

---

## 🎨 Vue d'ensemble

### Objectifs du design

- **Moderne et technologique** : Interface contemporaine avec animations fluides
- **Accessible** : Conforme aux normes RGAA (labels, contraste, navigation clavier)
- **Responsive** : Adaptation parfaite sur mobile, tablette et desktop
- **Minimaliste** : Design épuré sans surcharge visuelle
- **Performance** : Animations légères, temps de chargement optimisés

### Philosophie de design

L'identité visuelle d'Athlia s'articule autour de :
- **Couleurs froides** : Bleu et vert pour véhiculer technologie et santé
- **Animations 3D** : Three.js pour un effet "wow" moderne
- **Glassmorphism** : Effets de transparence et blur subtils
- **Typographie claire** : Inter, Segoe UI pour la lisibilité
- **Espacement généreux** : Interface aérée et respirable

---

## 🎨 Charte graphique

### Palette de couleurs

#### Couleurs primaires

```css
--blue: #2460f2;        /* Bleu principal - CTA, liens */
--green: #4ade80;       /* Vert accent - validation, succès */
--dark: #1f1f1f;        /* Fond principal */
--white: rgba(255, 255, 255, 0.9);  /* Texte principal */
```

#### Couleurs secondaires

```css
--gray: #555;           /* Texte secondaire */
--white-light: rgba(255, 255, 255, 0.7);  /* Texte désactivé */
--white-trans: rgba(255, 255, 255, 0.3);  /* Bordures, séparateurs */
--shadow-blue: rgba(36, 96, 242, 0.3);    /* Ombres colorées */
```

#### Dégradés

```css
--gradient: linear-gradient(135deg, #2460f2 0%, #4ade80 100%);
--gradient-text: linear-gradient(135deg, #1f1f1f 0%, #2460f2 50%, #4ade80 100%);
```

### Typographie

```css
font-family: 'Inter', 'Segoe UI', sans-serif;

/* Titres */
h1: 2.5rem (40px), weight: 700
h2: 2rem (32px), weight: 600
h3: 1.5rem (24px), weight: 600

/* Corps */
body: 1rem (16px), weight: 400
small: 0.875rem (14px), weight: 400
```

### Espacements

```css
--spacing-xs: 0.5rem (8px)
--spacing-sm: 1rem (16px)
--spacing-md: 1.5rem (24px)
--spacing-lg: 2rem (32px)
--spacing-xl: 3rem (48px)
```

### Bordures et arrondis

```css
--radius: 30px;         /* Arrondis principaux */
--radius-sm: 8px;       /* Arrondis secondaires */
border: 1px solid rgba(255, 255, 255, 0.1);  /* Bordures subtiles */
```

### Ombres

```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);  /* Ombre de carte */
box-shadow: 0 4px 16px rgba(36, 96, 242, 0.3);  /* Ombre colorée */
```

---

## 📐 Wireframes

### 1. Page d'accueil (Landing)

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]                          [Connexion] [Inscription]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│         [   VIDEO BACKGROUND FULL SCREEN   ]               │
│                                                             │
│              Transformez votre corps                        │
│                 avec Athlia                                │
│                                                             │
│         Découvrez une approche révolutionnaire...          │
│                                                             │
│                   [  Commencer  →  ]                       │
│                                                             │
│                      ↓ Découvrir                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐                 │
│   │  Card 1 │   │  Card 2 │   │  Card 3 │                 │
│   │ Feature │   │ Feature │   │ Feature │                 │
│   └─────────┘   └─────────┘   └─────────┘                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│            À PROPOS - FONCTIONNALITÉS                       │
│                   CONTACT                                   │
└─────────────────────────────────────────────────────────────┘
```

**Éléments clés :**
- Hero section avec vidéo en background
- Overlay sombre pour la lisibilité
- CTA principal bien visible
- Cards des fonctionnalités principales
- Navigation sticky au scroll

### 2. Page de Connexion

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]                          [Connexion] [Inscription]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                   [  Fond animé subtil  ]                  │
│                                                             │
│              ┌──────────────────────┐                       │
│              │                      │                       │
│              │     Connexion        │                       │
│              │                      │                       │
│              │  Email* :            │                       │
│              │  [________________]  │                       │
│              │                      │                       │
│              │  Mot de passe* :     │                       │
│              │  [________________]  │                       │
│              │                      │                       │
│              │  [  Se connecter  ]  │                       │
│              │                      │                       │
│              │  Pas de compte ?     │                       │
│              │  [S'inscrire]        │                       │
│              │                      │                       │
│              └──────────────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Éléments clés :**
- Formulaire centré, card glassmorphism
- Labels accessibles avec htmlFor
- Messages d'erreur clairs et visibles
- Lien vers inscription
- Animations de transition douces

### 3. Page d'Inscription

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]                          [Connexion] [Inscription]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              ┌──────────────────────┐                       │
│              │                      │                       │
│              │    Inscription       │                       │
│              │                      │                       │
│              │  Prénom*   │  Nom*   │                       │
│              │  [_______] │ [_____] │                       │
│              │                      │                       │
│              │  Nom d'utilisateur*  │                       │
│              │  [________________]  │                       │
│              │                      │                       │
│              │  Email* :            │                       │
│              │  [________________]  │                       │
│              │                      │                       │
│              │  Mot de passe* | Confirmer* │               │
│              │  [___________] | [________] │               │
│              │                      │                       │
│              │  ☐ J'accepte les CGU │                       │
│              │                      │                       │
│              │  [   S'inscrire   ]  │                       │
│              │                      │                       │
│              └──────────────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Éléments clés :**
- Layout deux colonnes pour nom/prénom et mots de passe
- Validation en temps réel (8 caractères min)
- Checkbox CGU obligatoire
- Message de succès avec redirection automatique

### 4. Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]         Tableau de Bord      [@User ▼] [Logout]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│            Ton dashboard, ton terrain...                    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │         💡 Conseil du jour                        │     │
│  │  Message personnalisé selon activité...           │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐         │
│  │                     │  │                     │         │
│  │  Historique des     │  │   Progression       │         │
│  │    Exercices        │  │   (Graphique)       │         │
│  │                     │  │                     │         │
│  │  - Squat 3x12       │  │   [Courbe]          │         │
│  │  - Bench Press      │  │                     │         │
│  │  ...                │  │                     │         │
│  │                     │  │                     │         │
│  └─────────────────────┘  └─────────────────────┘         │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐         │
│  │  Fréquence          │  │  Muscles            │         │
│  │  d'entraînement     │  │  Utilisés           │         │
│  │  [Graphique bars]   │  │  [Diagramme]        │         │
│  └─────────────────────┘  └─────────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Éléments clés :**
- Grid responsive (2 colonnes desktop, 1 colonne mobile)
- Cards avec glassmorphism
- Graphiques interactifs (Chart.js ou similaire)
- Conseils contextuels en haut

### 5. Page Exercices

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]         Exercices           [@User ▼] [Logout]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [ Skeleton 3D interactif - zones cliquables ]             │
│                                                             │
│  Sélectionnez les zones : [Bras] [Jambes] [Dos] ...       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Exercices disponibles :                                   │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Squat      │  │  Bench      │  │  Deadlift   │        │
│  │             │  │  Press      │  │             │        │
│  │  Difficulté:│  │             │  │             │        │
│  │  Modéré     │  │  Difficulté:│  │  Difficulté:│        │
│  │             │  │  Difficile  │  │  Difficile  │        │
│  │  [Ajouter]  │  │  [Ajouter]  │  │  [Ajouter]  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Éléments clés :**
- Skeleton 3D en Three.js (sélection interactive)
- Filtres par zones musculaires
- Cards d'exercices avec badges de difficulté
- Adaptation automatique selon profil/contraintes

### 6. Page Profil

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]          Mon Profil         [@User ▼] [Logout]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐         │
│  │                     │  │                     │         │
│  │  Informations       │  │  Profil Sportif     │         │
│  │  Personnelles       │  │                     │         │
│  │                     │  │  Âge: [__]          │         │
│  │  Nom: John Doe      │  │  Niveau: ▼          │         │
│  │  Email: john@..     │  │  Objectif: ▼        │         │
│  │                     │  │                     │         │
│  │  [Modifier]         │  │  Contraintes:       │         │
│  │                     │  │  ☐ Genou            │         │
│  │                     │  │  ☐ Dos              │         │
│  │                     │  │                     │         │
│  │                     │  │  [Enregistrer]      │         │
│  │                     │  │                     │         │
│  └─────────────────────┘  └─────────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Éléments clés :**
- Deux sections : infos perso + profil sportif
- Checkboxes pour contraintes physiques
- Validation des données
- Mise à jour en temps réel

---

## 🔄 User Flow

### Parcours utilisateur type

```
┌─────────────┐
│   Landing   │
│    Page     │
└──────┬──────┘
       │
       ├──[Nouveau]──►┌─────────────┐
       │              │ Inscription │
       │              └──────┬──────┘
       │                     │
       └──[Existant]────┐    │
                        │    │
                   ┌────▼────▼───┐
                   │  Connexion  │
                   └──────┬──────┘
                          │
                   ┌──────▼──────┐
                   │  Dashboard  │◄──────┐
                   └──────┬──────┘       │
                          │              │
              ┌───────────┼───────────┐  │
              │           │           │  │
         ┌────▼────┐ ┌───▼────┐ ┌───▼──▼──┐
         │Exercices│ │ Profil │ │Skeleton │
         └─────────┘ └────────┘ └─────────┘
```

### Actions principales

1. **Inscription** → Formulaire → Email de bienvenue → Connexion
2. **Connexion** → Authentification JWT → Dashboard
3. **Ajouter exercice** → Sélection zone → Choix exercice → Enregistrement
4. **Voir progression** → Dashboard → Graphiques interactifs
5. **Modifier profil** → Profil → Update contraintes → Exercices adaptés

---

## 🧩 Composants UI

### Header

```
┌────────────────────────────────────────────────────────┐
│  [Logo]                    [Connexion] [Inscription]   │
└────────────────────────────────────────────────────────┘
```

**Variantes :**
- Header public : Logo + Connexion/Inscription
- Header authentifié : Logo + Menu User + Logout

### Footer

```
┌────────────────────────────────────────────────────────┐
│  Athlia | Liens Utiles | Légal | Développement       │
│  © 2025 Athlia. Tous droits réservés.                 │
└────────────────────────────────────────────────────────┘
```

### Cards

```
┌──────────────────┐
│                  │
│   Titre Card     │
│                  │
│   Contenu...     │
│                  │
│   [CTA]          │
│                  │
└──────────────────┘
```

**Style :** Glassmorphism, bordure subtile, ombre douce

### Boutons

```
Primary:   [ Commencer → ]   (Gradient bleu-vert)
Secondary: [ Annuler ]       (Transparent, bordure)
Danger:    [ Supprimer ]     (Rouge)
```

### Inputs

```
Label associé (htmlFor)
[___________________]
Message d'erreur (si nécessaire)
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First */
--mobile: 320px - 768px
--tablet: 769px - 1024px
--desktop: 1025px+
```

### Adaptations

#### Mobile (< 768px)
- Navigation hamburger
- Cards en colonne unique
- Formulaires pleine largeur
- Font-size réduit de 10%

#### Tablet (768px - 1024px)
- Grid 2 colonnes
- Header complet
- Sidebar optionnelle

#### Desktop (> 1024px)
- Grid 2-3 colonnes
- Sidebar fixe
- Animations complètes

---

## ♿ Accessibilité (RGAA)

### Critères respectés

✅ **Structure sémantique**
- `<main role="main">` pour contenu principal
- `<nav>` pour navigations
- `<header>`, `<footer>` appropriés

✅ **Formulaires**
- Labels avec `htmlFor` associés aux inputs
- Messages d'erreur avec `role="alert"`
- Attributs `autoComplete` pour faciliter la saisie

✅ **Navigation clavier**
- Focus visible (outline)
- Ordre de tabulation logique
- Pas de piège clavier

✅ **Contraste**
- Ratio minimum 4.5:1 pour textes
- Couleurs testées avec outils (WebAIM)

✅ **Images**
- Attributs `alt` descriptifs
- Icônes décoratives avec `aria-hidden="true"`

✅ **Langue**
- `<html lang="fr">`
- Meta description

---

## 🎨 Maquettes finales

### Outils utilisés

- **Figma** : Wireframes et prototypes interactifs
- **Adobe XD** : Maquettes haute fidélité (alternative)
- **InVision** : Tests utilisateurs et feedback

### Fichiers

Les maquettes complètes sont disponibles sur :

🔗 **Figma** : [Lien vers projet Figma](https://figma.com/file/...)
🔗 **Prototype interactif** : [Lien prototype](https://figma.com/proto/...)

---

## 📝 Notes de design

### Principes appliqués

1. **Less is More** : Interface épurée, pas de surcharge
2. **Consistency** : Composants réutilisables, cohérence visuelle
3. **Feedback** : États hover, active, loading clairs
4. **Performance** : Animations 60fps, lazy loading
5. **Mobile First** : Design pensé d'abord pour mobile

### Évolutions futures

- [ ] Dark mode toggle (actuellement dark par défaut)
- [ ] Personnalisation des couleurs par utilisateur
- [ ] Thèmes saisonniers
- [ ] Mode haute accessibilité (contraste renforcé)

---

**Dernière mise à jour :** 2025
**Designer :** Charlène (@Knarta)
**Développement :** Brenda (@Bree-Coding) & Hilliass (@HLS-976)








