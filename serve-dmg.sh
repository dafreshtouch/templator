#!/bin/bash

echo "🚀 Serveur de téléchargement local pour Templator DMG..."

# Créer un dossier pour les téléchargements
mkdir -p downloads

# Copier les fichiers DMG
echo "📦 Copie des fichiers DMG..."
if [ -f "../adobe-template-generator-app/dist/Adobe Template Generator-1.0.0.dmg" ]; then
    cp "../adobe-template-generator-app/dist/Adobe Template Generator-1.0.0.dmg" downloads/
    echo "✅ DMG Intel copié"
else
    echo "❌ DMG Intel non trouvé"
fi

if [ -f "../adobe-template-generator-app/dist/Adobe Template Generator-1.0.0-arm64.dmg" ]; then
    cp "../adobe-template-generator-app/dist/Adobe Template Generator-1.0.0-arm64.dmg" downloads/
    echo "✅ DMG Apple Silicon copié"
else
    echo "❌ DMG Apple Silicon non trouvé"
fi

# Créer une page de téléchargement locale
cat > downloads/index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Téléchargements Templator</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 40px; }
        .download-item { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .download-btn { display: inline-block; background: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .download-btn:hover { background: #0056CC; }
        .size { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <h1>🎨 Templator - Téléchargements</h1>
    <p>Choisissez la version correspondant à votre Mac :</p>
    
    <div class="download-item">
        <h3>Mac Apple Silicon (M1/M2/M3)</h3>
        <p class="size">Taille : ~87 MB</p>
        <a href="Adobe Template Generator-1.0.0-arm64.dmg" class="download-btn" download>
            📥 Télécharger pour Apple Silicon
        </a>
    </div>
    
    <div class="download-item">
        <h3>Mac Intel</h3>
        <p class="size">Taille : ~92 MB</p>
        <a href="Adobe Template Generator-1.0.0.dmg" class="download-btn" download>
            📥 Télécharger pour Intel
        </a>
    </div>
    
    <div style="margin-top: 40px; padding: 20px; background: #f0f0f0; border-radius: 8px;">
        <h3>📦 Installation</h3>
        <ol>
            <li>Téléchargez le fichier .dmg approprié</li>
            <li>Double-cliquez sur le fichier téléchargé</li>
            <li>Glissez l'application vers le dossier Applications</li>
            <li><strong>Première ouverture</strong> : Clic droit > Ouvrir (contournement sécurité macOS)</li>
        </ol>
    </div>
    
    <p style="margin-top: 20px;">
        <a href="../index.html">🌐 Ou utilisez la version web</a>
    </p>
</body>
</html>
EOF

echo "📁 Structure créée :"
ls -la downloads/

# Démarrer un serveur web local
echo ""
echo "🌐 Démarrage du serveur local..."
echo "📍 URLs disponibles :"
echo "   • Page principale : http://localhost:8000"
echo "   • Téléchargements : http://localhost:8000/downloads"
echo "   • Version web : http://localhost:8000/index.html"
echo ""
echo "⚠️  Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

# Ouvrir automatiquement dans le navigateur
sleep 2 && open "http://localhost:8000/downloads" &

# Démarrer le serveur Python
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python non trouvé. Installez Python pour utiliser le serveur local."
    echo "💡 Alternative : Ouvrez downloads/index.html directement dans votre navigateur"
fi
