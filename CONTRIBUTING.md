# 🤝 Guide de Contribution - Templator

Merci de votre intérêt pour contribuer à Templator ! Ce guide vous aidera à démarrer.

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** 16+ : [Télécharger](https://nodejs.org/)
- **Git** : [Télécharger](https://git-scm.com/)
- **Éditeur de code** : VS Code recommandé

### Installation
```bash
# Cloner le repository
git clone https://github.com/dafreshtouch/templator.git
cd templator

# Installer les dépendances
npm install

# Lancer en mode développement
npm start
```

## 📋 Types de Contributions

### 🎨 Nouveaux Templates
Ajoutez des templates pour de nouvelles plateformes ou formats :

1. **Éditez** `templates-data.js`
2. **Ajoutez** votre template dans la catégorie appropriée :
```javascript
{
    id: 'nouveau-template',
    name: 'Nouveau Template',
    dimensions: '1200 × 800 px',
    width: 1200,
    height: 800,
    description: 'Description du template',
    margins: { top: 60, right: 60, bottom: 60, left: 60 },
    safeZone: { top: 30, right: 30, bottom: 30, left: 30 },
    category: 'social'
}
```

### 🐛 Corrections de Bugs
1. **Créez** une issue décrivant le bug
2. **Forkez** le repository
3. **Créez** une branche : `git checkout -b fix/nom-du-bug`
4. **Corrigez** le problème
5. **Testez** votre correction
6. **Soumettez** une Pull Request

### ✨ Nouvelles Fonctionnalités
1. **Discutez** de la fonctionnalité dans une issue
2. **Forkez** le repository
3. **Créez** une branche : `git checkout -b feature/nouvelle-fonctionnalite`
4. **Développez** la fonctionnalité
5. **Testez** thoroughly
6. **Documentez** les changements
7. **Soumettez** une Pull Request

### 📚 Documentation
- Améliorez le README
- Ajoutez des commentaires au code
- Créez des guides d'utilisation
- Traduisez la documentation

## 🔧 Développement

### Structure du Code
```
templator/
├── index.html          # Interface principale
├── styles.css          # Styles et responsive
├── script.js           # Logique JavaScript
├── templates-data.js   # Base de données templates
├── main.js            # Application Electron
└── assets/            # Ressources (icônes, images)
```

### Standards de Code

#### HTML
- **Indentation** : 4 espaces
- **Sémantique** : Utilisez les balises appropriées
- **Accessibilité** : Ajoutez les attributs ARIA

#### CSS
- **Organisation** : Groupez par composants
- **Nommage** : Utilisez des classes descriptives
- **Responsive** : Mobile-first approach

#### JavaScript
- **ES6+** : Utilisez les fonctionnalités modernes
- **Fonctions pures** : Évitez les effets de bord
- **Commentaires** : Documentez les fonctions complexes

### Tests
```bash
# Tester l'interface web
open index.html

# Tester l'application Electron
npm start

# Construire l'application
npm run build-mac
```

## 📝 Process de Pull Request

### 1. Préparation
- [ ] Forkez le repository
- [ ] Créez une branche descriptive
- [ ] Faites vos modifications
- [ ] Testez localement

### 2. Soumission
- [ ] Titre clair et descriptif
- [ ] Description détaillée des changements
- [ ] Screenshots si changements visuels
- [ ] Référence aux issues liées

### 3. Template de PR
```markdown
## 📋 Description
Brève description des changements

## 🔧 Type de Changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Amélioration
- [ ] Documentation

## ✅ Tests
- [ ] Testé localement
- [ ] Interface web fonctionnelle
- [ ] Application Electron fonctionnelle

## 📸 Screenshots
(Si applicable)
```

## 🎯 Priorités Actuelles

### Templates Manquants
- **BeReal** : Format carré spécial
- **Mastodon** : Posts et bannières
- **Threads** : Nouveau format Meta

### Fonctionnalités Souhaitées
- **Export batch** : Téléchargement multiple
- **Templates animés** : Support GIF/vidéo
- **Thèmes personnalisés** : Couleurs utilisateur
- **Plugins** : Système d'extensions

### Améliorations Techniques
- **Performance** : Optimisation du rendu
- **Accessibilité** : Support clavier complet
- **PWA** : Application web progressive
- **Tests** : Suite de tests automatisés

## 🌍 Internationalisation

Aidez à traduire Templator :
- **Français** : ✅ Complet
- **Anglais** : 🔄 En cours
- **Espagnol** : ❌ À faire
- **Allemand** : ❌ À faire

## 🏆 Reconnaissance

Les contributeurs sont listés dans :
- **README principal**
- **Page About de l'application**
- **Releases GitHub**

## 📞 Contact

- **Issues GitHub** : Pour bugs et fonctionnalités
- **Discussions** : Pour questions générales
- **Email** : Pour contributions majeures

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous licence MIT.

---

🙏 **Merci de contribuer à Templator !**
