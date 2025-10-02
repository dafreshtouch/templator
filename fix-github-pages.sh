#!/bin/bash

echo "🔧 Correction des erreurs GitHub Pages et DMG..."

echo ""
echo "📋 État actuel du repository :"
git remote -v
git status --short

echo ""
echo "🌐 URLs à vérifier :"
echo "• Repository : https://github.com/dafreshtouch/templator"
echo "• Settings : https://github.com/dafreshtouch/templator/settings/pages"
echo "• Web App : https://dafreshtouch.github.io/templator"

echo ""
echo "🔧 Solutions aux erreurs courantes :"
echo ""
echo "📄 Erreur 404 GitHub Pages :"
echo "1. Allez sur : https://github.com/dafreshtouch/templator/settings/pages"
echo "2. Source : Deploy from a branch"
echo "3. Branch : main"
echo "4. Folder : / (root)"
echo "5. Sauvegardez"
echo ""
echo "⏳ Attendez 5-10 minutes pour la propagation"

echo ""
echo "📦 Erreur DMG/Release :"
echo "1. Allez sur : https://github.com/dafreshtouch/templator/releases"
echo "2. Cliquez 'Create a new release'"
echo "3. Tag : v1.0.0"
echo "4. Uploadez les fichiers .dmg depuis :"
ls -la ../adobe-template-generator-app/dist/*.dmg 2>/dev/null || echo "   (Pas de fichiers DMG trouvés - construisez d'abord l'app)"

echo ""
echo "🚀 Ouverture des pages de configuration..."
open "https://github.com/dafreshtouch/templator/settings/pages"
sleep 2
open "https://github.com/dafreshtouch/templator/releases/new"
sleep 2
open "https://dafreshtouch.github.io/templator"

echo ""
echo "✅ Pages ouvertes ! Suivez les instructions ci-dessus."
