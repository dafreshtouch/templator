# 🔧 Dépannage DMG - Templator

## ✅ Status Actuel
Les fichiers DMG ont été **testés et sont fonctionnels** ! Si vous rencontrez des problèmes, suivez ce guide.

## 🚨 Problèmes Courants et Solutions

### 1. **"L'application ne peut pas être ouverte"**
**Symptôme** : macOS bloque l'ouverture avec un message de sécurité

**Solution** :
1. **Clic droit** sur l'application dans le dossier Applications
2. **Sélectionnez** "Ouvrir" dans le menu contextuel
3. **Cliquez** "Ouvrir" dans la boîte de dialogue
4. L'application sera autorisée pour les prochaines fois

### 2. **"Application endommagée"**
**Symptôme** : Message indiquant que l'app est endommagée

**Solution** :
```bash
# Supprimer la quarantaine
sudo xattr -rd com.apple.quarantine "/Applications/Adobe Template Generator.app"
```

### 3. **DMG ne s'ouvre pas**
**Symptôme** : Le fichier .dmg ne monte pas

**Solutions** :
1. **Re-téléchargez** le fichier (peut être corrompu)
2. **Vérifiez** l'espace disque disponible
3. **Redémarrez** votre Mac
4. **Essayez** l'autre version (Intel vs Apple Silicon)

### 4. **Mauvaise version téléchargée**
**Symptôme** : L'app ne se lance pas ou crash

**Solution** :
1. **Vérifiez votre processeur** : Menu Apple  > À propos de ce Mac
2. **Téléchargez la bonne version** :
   - **Apple Silicon (M1/M2/M3)** : arm64.dmg
   - **Intel** : version standard.dmg

### 5. **Erreur de permissions**
**Symptôme** : L'app se lance mais ne fonctionne pas correctement

**Solution** :
```bash
# Réparer les permissions
sudo chmod -R 755 "/Applications/Adobe Template Generator.app"
```

## 🔄 Nouvelles Versions DMG

Les DMG ont été **reconstruits et mis à jour** avec les corrections suivantes :
- ✅ **Taille optimisée** : Intel 96MB, Apple Silicon 96MB
- ✅ **Structure corrigée** : Application correctement empaquetée
- ✅ **Test validé** : Ouverture et fonctionnement confirmés

## 📥 Téléchargements Mis à Jour

### **URLs Directes GitHub**
- **Intel** : https://github.com/dafreshtouch/templator/raw/main/downloads/Adobe%20Template%20Generator-1.0.0.dmg
- **Apple Silicon** : https://github.com/dafreshtouch/templator/raw/main/downloads/Adobe%20Template%20Generator-1.0.0-arm64.dmg

### **Serveur Local** (pour tests)
```bash
cd /Users/davidmeyer/Desktop/design
./serve-dmg.sh
```
Puis : http://localhost:8000/downloads

## 🛠️ Diagnostic Automatique

Utilisez le script de test pour vérifier l'état des DMG :
```bash
cd /Users/davidmeyer/Desktop/design
./test-dmg.sh
```

## 🔍 Vérification Manuelle

### **Test d'Intégrité**
```bash
# Vérifier le DMG
hdiutil verify "Adobe Template Generator-1.0.0.dmg"

# Monter le DMG
hdiutil attach "Adobe Template Generator-1.0.0.dmg"

# Vérifier l'application
ls -la "/Volumes/Adobe Template Generator/"
```

### **Test de Lancement**
```bash
# Lancer l'app depuis le Terminal (pour voir les erreurs)
"/Applications/Adobe Template Generator.app/Contents/MacOS/Adobe Template Generator"
```

## 🎯 Solutions Alternatives

### **Si les DMG ne fonctionnent toujours pas**

1. **Version Web** (recommandée) :
   - URL : https://dafreshtouch.github.io/templator
   - Toutes les fonctionnalités disponibles
   - Aucune installation requise

2. **Serveur Local** :
   ```bash
   cd /Users/davidmeyer/Desktop/design
   python3 -m http.server 8000
   ```
   Puis ouvrez : http://localhost:8000

3. **Application Electron en mode dev** :
   ```bash
   cd /Users/davidmeyer/Desktop/adobe-template-generator-app
   npm start
   ```

## 📞 Support

### **Si le problème persiste**
1. **Vérifiez** la version de macOS (minimum 10.12+)
2. **Testez** sur un autre Mac si possible
3. **Utilisez** la version web en attendant
4. **Signalez** le problème avec :
   - Version de macOS
   - Type de processeur (Intel/Apple Silicon)
   - Message d'erreur exact

## ✅ Confirmation de Fonctionnement

Les DMG ont été **testés avec succès** :
- ✅ **Ouverture** : DMG se monte correctement
- ✅ **Application** : Présente dans le volume monté
- ✅ **Installation** : Glisser-déposer fonctionne
- ✅ **Lancement** : Application démarre (après autorisation)

**Les DMG fonctionnent ! Le problème est probablement lié à la sécurité macOS.**

---

🎉 **Votre Templator devrait maintenant fonctionner parfaitement !**
