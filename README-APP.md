# Adobe Template Generator - Application Desktop

## 🚀 Installation

### Méthode 1 : Installation automatique
1. Ouvrez le Terminal
2. Naviguez vers ce dossier : `cd /Users/davidmeyer/Desktop/adobe-template-generator-app`
3. Exécutez : `./build-app.sh`
4. Suivez les instructions à l'écran

### Méthode 2 : Installation manuelle
```bash
# Installer les dépendances
npm install

# Construire l'application macOS
npm run build-mac

# Le fichier .dmg sera dans le dossier dist/
```

## 📱 Fonctionnalités de l'Application

### ✨ Interface Native
- **Fenêtre redimensionnable** : Taille minimum 1200x800
- **Menu natif macOS** : Avec raccourcis clavier
- **Icône dans le Dock** : Application native complète

### 🔄 Mises à Jour Automatiques
- **Vérification automatique** : Au démarrage de l'app
- **Téléchargement en arrière-plan** : Sans interruption
- **Installation au redémarrage** : Mise à jour transparente
- **Menu "Vérifier les mises à jour"** : Vérification manuelle

### 🎨 Toutes les Fonctionnalités Web
- **100+ templates** : Réseaux sociaux, impression, web, vidéo
- **Mode sombre** : Basculement avec Cmd+D
- **Formats personnalisés** : Création et suppression
- **Génération par lots** : Sélection multiple
- **Favoris et historique** : Sauvegarde locale
- **Recherche avancée** : Filtrage en temps réel

## 🛠️ Développement

### Structure du Projet
```
adobe-template-generator-app/
├── main.js              # Processus principal Electron
├── package.json         # Configuration et dépendances
├── build-app.sh         # Script de construction
├── assets/              # Icônes et ressources
├── index.html           # Interface utilisateur
├── styles.css           # Styles de l'application
├── script.js            # Logique JavaScript
├── templates-data.js    # Base de données des templates
└── dist/                # Applications construites
```

### Scripts Disponibles
- `npm start` : Lancer en mode développement
- `npm run build` : Construire pour toutes les plateformes
- `npm run build-mac` : Construire pour macOS uniquement
- `npm run build-win` : Construire pour Windows
- `npm run build-linux` : Construire pour Linux

### Mise à Jour du Code
1. Modifiez les fichiers HTML/CSS/JS
2. Incrémentez la version dans `package.json`
3. Exécutez `npm run build-mac`
4. Le nouveau .dmg sera dans `dist/`

## 📋 Configuration

### Auto-Updater
L'application vérifie automatiquement les mises à jour via GitHub Releases.
Pour configurer vos propres mises à jour :

1. Modifiez `package.json` :
```json
"build": {
  "publish": {
    "provider": "github",
    "owner": "votre-username",
    "repo": "votre-repo"
  }
}
```

2. Créez un token GitHub et configurez les releases

### Icônes Personnalisées
- Remplacez `assets/icon.svg` par votre icône
- Exécutez le script de build pour régénérer les formats

## 🔧 Dépannage

### Erreur "Node.js non trouvé"
Installez Node.js depuis https://nodejs.org/

### Erreur de permissions
```bash
chmod +x build-app.sh
```

### Application non signée
Sur macOS, faites clic droit > Ouvrir la première fois

### Problème de construction
```bash
# Nettoyer et réinstaller
rm -rf node_modules dist
npm install
npm run build-mac
```

## 📞 Support

- **Documentation** : README.md principal
- **Issues** : Créez un ticket GitHub
- **Mises à jour** : Menu Aide > Vérifier les mises à jour

---

🎉 **Votre Adobe Template Generator est maintenant une vraie application macOS !**
