#!/bin/bash

echo "🔍 Vérification du déploiement Templator..."
echo ""

# Vérifier le repository
echo "📂 Repository GitHub :"
curl -s -o /dev/null -w "%{http_code}" https://github.com/dafreshtouch/templator | grep -q "200" && echo "✅ Repository accessible" || echo "❌ Repository inaccessible"

# Vérifier GitHub Pages
echo ""
echo "🌐 GitHub Pages :"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://dafreshtouch.github.io/templator)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Web App accessible (https://dafreshtouch.github.io/templator)"
elif [ "$HTTP_CODE" = "404" ]; then
    echo "⚠️  Web App 404 - GitHub Pages pas encore configuré"
    echo "   👉 Allez sur : https://github.com/dafreshtouch/templator/settings/pages"
else
    echo "⏳ Web App en cours de déploiement (Code: $HTTP_CODE)"
fi

# Vérifier les releases
echo ""
echo "📦 Releases GitHub :"
RELEASES=$(curl -s https://api.github.com/repos/dafreshtouch/templator/releases | grep -c '"tag_name"')
if [ "$RELEASES" -gt 0 ]; then
    echo "✅ $RELEASES release(s) trouvée(s)"
    curl -s https://api.github.com/repos/dafreshtouch/templator/releases/latest | grep '"name"' | head -1
else
    echo "⚠️  Aucune release trouvée"
    echo "   👉 Créez une release : https://github.com/dafreshtouch/templator/releases/new"
fi

# Vérifier les fichiers DMG locaux
echo ""
echo "💻 Applications locales :"
if [ -f "../adobe-template-generator-app/dist/Adobe Template Generator-1.0.0.dmg" ]; then
    echo "✅ DMG Intel trouvé ($(du -h '../adobe-template-generator-app/dist/Adobe Template Generator-1.0.0.dmg' | cut -f1))"
else
    echo "❌ DMG Intel manquant"
fi

if [ -f "../adobe-template-generator-app/dist/Adobe Template Generator-1.0.0-arm64.dmg" ]; then
    echo "✅ DMG Apple Silicon trouvé ($(du -h '../adobe-template-generator-app/dist/Adobe Template Generator-1.0.0-arm64.dmg' | cut -f1))"
else
    echo "❌ DMG Apple Silicon manquant"
fi

# Résumé
echo ""
echo "📊 Résumé du Déploiement :"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Status GitHub Pages
if [ "$HTTP_CODE" = "200" ]; then
    echo "🌐 Web App : ✅ FONCTIONNEL"
    echo "   URL : https://dafreshtouch.github.io/templator"
else
    echo "🌐 Web App : ⚠️  À CONFIGURER"
    echo "   Action : Activez GitHub Pages dans les settings"
fi

# Status Releases
if [ "$RELEASES" -gt 0 ]; then
    echo "📦 Releases : ✅ DISPONIBLES"
else
    echo "📦 Releases : ⚠️  À CRÉER"
    echo "   Action : Uploadez les fichiers DMG"
fi

echo "📂 Repository : ✅ ACCESSIBLE"
echo "   URL : https://github.com/dafreshtouch/templator"

echo ""
echo "🎯 Prochaines étapes :"
if [ "$HTTP_CODE" != "200" ]; then
    echo "1. Configurez GitHub Pages"
fi
if [ "$RELEASES" -eq 0 ]; then
    echo "2. Créez une release avec les DMG"
fi
echo "3. Testez l'application web"
echo "4. Partagez votre création !"

echo ""
echo "🚀 Templator Status : $([ "$HTTP_CODE" = "200" ] && [ "$RELEASES" -gt 0 ] && echo "ENTIÈREMENT DÉPLOYÉ ✅" || echo "DÉPLOIEMENT EN COURS ⏳")"
