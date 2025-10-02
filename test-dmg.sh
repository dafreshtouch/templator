#!/bin/bash

echo "🔍 Test des fichiers DMG Templator..."
echo ""

# Vérifier les DMG dans le dossier de build
BUILD_DIR="../adobe-template-generator-app/dist"
DOWNLOADS_DIR="downloads"

echo "📦 Vérification des DMG construits :"
if [ -f "$BUILD_DIR/Adobe Template Generator-1.0.0.dmg" ]; then
    SIZE_INTEL=$(du -h "$BUILD_DIR/Adobe Template Generator-1.0.0.dmg" | cut -f1)
    echo "✅ DMG Intel : $SIZE_INTEL"
else
    echo "❌ DMG Intel manquant dans $BUILD_DIR"
fi

if [ -f "$BUILD_DIR/Adobe Template Generator-1.0.0-arm64.dmg" ]; then
    SIZE_ARM=$(du -h "$BUILD_DIR/Adobe Template Generator-1.0.0-arm64.dmg" | cut -f1)
    echo "✅ DMG Apple Silicon : $SIZE_ARM"
else
    echo "❌ DMG Apple Silicon manquant dans $BUILD_DIR"
fi

echo ""
echo "📁 Vérification des DMG dans downloads/ :"
if [ -f "$DOWNLOADS_DIR/Adobe Template Generator-1.0.0.dmg" ]; then
    SIZE_INTEL_DL=$(du -h "$DOWNLOADS_DIR/Adobe Template Generator-1.0.0.dmg" | cut -f1)
    echo "✅ DMG Intel (downloads) : $SIZE_INTEL_DL"
else
    echo "❌ DMG Intel manquant dans downloads/"
fi

if [ -f "$DOWNLOADS_DIR/Adobe Template Generator-1.0.0-arm64.dmg" ]; then
    SIZE_ARM_DL=$(du -h "$DOWNLOADS_DIR/Adobe Template Generator-1.0.0-arm64.dmg" | cut -f1)
    echo "✅ DMG Apple Silicon (downloads) : $SIZE_ARM_DL"
else
    echo "❌ DMG Apple Silicon manquant dans downloads/"
fi

echo ""
echo "🔧 Test d'ouverture des DMG :"

# Test du DMG Intel
if [ -f "$BUILD_DIR/Adobe Template Generator-1.0.0.dmg" ]; then
    echo "📀 Test DMG Intel..."
    if hdiutil attach "$BUILD_DIR/Adobe Template Generator-1.0.0.dmg" -quiet; then
        echo "✅ DMG Intel s'ouvre correctement"
        # Vérifier si l'app est présente
        if [ -d "/Volumes/Adobe Template Generator/Adobe Template Generator.app" ]; then
            echo "✅ Application trouvée dans le DMG"
            # Détacher le volume
            hdiutil detach "/Volumes/Adobe Template Generator" -quiet
        else
            echo "❌ Application manquante dans le DMG"
        fi
    else
        echo "❌ Erreur lors de l'ouverture du DMG Intel"
    fi
else
    echo "⚠️  DMG Intel non trouvé pour test"
fi

echo ""
echo "🔄 Mise à jour des DMG dans downloads/ :"
if [ -f "$BUILD_DIR/Adobe Template Generator-1.0.0.dmg" ]; then
    cp "$BUILD_DIR/Adobe Template Generator-1.0.0.dmg" "$DOWNLOADS_DIR/"
    echo "✅ DMG Intel copié vers downloads/"
fi

if [ -f "$BUILD_DIR/Adobe Template Generator-1.0.0-arm64.dmg" ]; then
    cp "$BUILD_DIR/Adobe Template Generator-1.0.0-arm64.dmg" "$DOWNLOADS_DIR/"
    echo "✅ DMG Apple Silicon copié vers downloads/"
fi

echo ""
echo "🌐 Test des URLs de téléchargement :"
echo "• Local Intel : http://localhost:8000/downloads/Adobe%20Template%20Generator-1.0.0.dmg"
echo "• Local Apple Silicon : http://localhost:8000/downloads/Adobe%20Template%20Generator-1.0.0-arm64.dmg"
echo "• GitHub Intel : https://github.com/dafreshtouch/templator/raw/main/downloads/Adobe%20Template%20Generator-1.0.0.dmg"
echo "• GitHub Apple Silicon : https://github.com/dafreshtouch/templator/raw/main/downloads/Adobe%20Template%20Generator-1.0.0-arm64.dmg"

echo ""
echo "📋 Instructions pour l'utilisateur :"
echo "1. Téléchargez le DMG approprié à votre Mac"
echo "2. Double-cliquez sur le fichier .dmg"
echo "3. Glissez l'application vers Applications"
echo "4. IMPORTANT : Clic droit > Ouvrir (première fois)"
echo ""
echo "⚠️  Si l'app ne s'ouvre pas :"
echo "• Vérifiez les Préférences Système > Sécurité"
echo "• Autorisez l'application à s'exécuter"
echo "• Ou utilisez la version web : https://dafreshtouch.github.io/templator"

echo ""
echo "🎯 Status des DMG : $([ -f "$BUILD_DIR/Adobe Template Generator-1.0.0.dmg" ] && [ -f "$BUILD_DIR/Adobe Template Generator-1.0.0-arm64.dmg" ] && echo "✅ FONCTIONNELS" || echo "❌ PROBLÈME")"
