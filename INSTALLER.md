# 🚀 Adobe Template Generator - Installation

## ✅ Application Construite avec Succès !

Votre Adobe Template Generator est maintenant disponible en tant qu'application native macOS.

## 📦 Fichiers Générés

Dans le dossier `dist/` vous trouverez :

### Pour Mac Intel (x64)
- **`Adobe Template Generator-1.0.0.dmg`** - Installateur pour Mac Intel

### Pour Mac Apple Silicon (M1/M2/M3)
- **`Adobe Template Generator-1.0.0-arm64.dmg`** - Installateur pour Mac Apple Silicon

## 🔧 Installation

### Étape 1 : Choisir le bon fichier
- **Mac Intel** : Utilisez `Adobe Template Generator-1.0.0.dmg`
- **Mac Apple Silicon** : Utilisez `Adobe Template Generator-1.0.0-arm64.dmg`
- **Pas sûr ?** : Menu Apple > À propos de ce Mac pour voir votre processeur

### Étape 2 : Installer l'application
1. **Double-cliquez** sur le fichier .dmg approprié
2. **Glissez** l'application vers le dossier Applications
3. **Éjectez** le volume DMG
4. **Lancez** l'application depuis le dossier Applications

### Étape 3 : Première ouverture
⚠️ **Important** : Comme l'application n'est pas signée par Apple :
1. **Clic droit** sur l'application > **Ouvrir**
2. Cliquez **"Ouvrir"** dans la boîte de dialogue
3. L'application se lancera et sera autorisée pour les prochaines fois

## 🔄 Mises à Jour

### Automatiques
- L'application vérifie automatiquement les mises à jour au démarrage
- Menu **"Aide" > "Vérifier les mises à jour"** pour une vérification manuelle

### Manuelles
1. Reconstruisez l'application : `npm run build-mac`
2. Incrémentez la version dans `package.json`
3. Installez le nouveau .dmg

## ✨ Fonctionnalités de l'Application

### 🖥️ Interface Native
- **Fenêtre redimensionnable** avec taille minimum optimisée
- **Menu natif macOS** avec tous les raccourcis
- **Intégration Dock** avec icône personnalisée

### 🎨 Toutes les Fonctionnalités Web
- **100+ templates** : Réseaux sociaux, impression, web, vidéo
- **Mode sombre** : Basculement avec ⌘+D
- **Formats personnalisés** : Création et suppression individuelle
- **Génération par lots** : Sélection multiple avec Ctrl/⌘+clic
- **Favoris et historique** : Sauvegarde automatique
- **Recherche avancée** : Filtrage temps réel

### 🔧 Raccourcis Clavier
- **⌘+R** : Recharger l'application
- **⌘+D** : Basculer le mode sombre
- **⌘+Q** : Quitter l'application
- **⌘+M** : Réduire la fenêtre
- **F11** : Plein écran
- **F12** : Outils de développement

## 🛠️ Développement et Mise à Jour

### Modifier le Code
1. Éditez les fichiers `index.html`, `styles.css`, `script.js`
2. Testez avec `npm start`
3. Construisez avec `npm run build-mac`

### Nouvelle Version
1. Modifiez `"version"` dans `package.json`
2. Exécutez `npm run build-mac`
3. Nouveaux fichiers .dmg dans `dist/`

### Structure des Fichiers
```
adobe-template-generator-app/
├── 📱 main.js              # Logique Electron
├── 📋 package.json         # Configuration
├── 🌐 index.html           # Interface
├── 🎨 styles.css           # Design
├── ⚙️ script.js            # Fonctionnalités
├── 📊 templates-data.js    # Base de données
└── 📦 dist/                # Applications construites
```

## 🎉 Félicitations !

Votre **Adobe Template Generator** est maintenant une vraie application macOS avec :
- ✅ Installation native via .dmg
- ✅ Mises à jour automatiques
- ✅ Interface système intégrée
- ✅ Toutes les fonctionnalités web préservées

**Profitez de votre nouvel outil de création professionnel !** 🚀
