#!/bin/bash

echo "🚀 Construction de Adobe Template Generator..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi

echo "📦 Installation des dépendances..."
npm install

# Générer les icônes depuis le SVG
echo "🎨 Génération des icônes..."
if command -v rsvg-convert &> /dev/null; then
    # Générer PNG pour Linux
    rsvg-convert -w 512 -h 512 assets/icon.svg > assets/icon.png
    rsvg-convert -w 256 -h 256 assets/icon.svg > assets/icon-256.png
    rsvg-convert -w 128 -h 128 assets/icon.svg > assets/icon-128.png
    echo "✅ Icônes PNG générées"
else
    echo "⚠️  rsvg-convert non trouvé. Utilisation de l'icône SVG par défaut."
    # Copier le SVG comme PNG de base
    cp assets/icon.svg assets/icon.png
fi

# Construire l'application
echo "🔨 Construction de l'application..."
npm run build-mac

if [ $? -eq 0 ]; then
    echo "✅ Application construite avec succès!"
    echo "📁 Fichier DMG disponible dans le dossier 'dist/'"
    
    # Ouvrir le dossier dist
    if [ -d "dist" ]; then
        open dist/
        echo "🎉 Installation terminée! Vous pouvez maintenant installer l'application depuis le fichier .dmg"
    fi
else
    echo "❌ Erreur lors de la construction"
    exit 1
fi
