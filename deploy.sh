#!/bin/bash

echo "🚀 Déploiement de Templator sur GitHub..."

# Vérifier la connexion internet
if ! ping -c 1 github.com &> /dev/null; then
    echo "❌ Pas de connexion à GitHub. Vérifiez votre connexion internet."
    exit 1
fi

# Vérifier que le repository existe
echo "📋 Configuration Git actuelle :"
git remote -v

# Ajouter tous les fichiers
echo "📦 Ajout des fichiers..."
git add .

# Demander un message de commit si pas de changements
if git diff --cached --quiet; then
    echo "ℹ️  Aucun changement à commiter."
else
    echo "💾 Commit des changements..."
    git commit -m "🔄 Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Pousser vers GitHub
echo "🌐 Push vers GitHub..."
if git push -u origin main; then
    echo "✅ Déploiement réussi !"
    echo "🔗 Repository : https://github.com/dafreshtouch/templator"
    echo ""
    echo "📱 Prochaines étapes :"
    echo "1. Visitez votre repository sur GitHub"
    echo "2. Configurez GitHub Pages si souhaité"
    echo "3. Ajoutez une description au repository"
    echo "4. Créez des releases pour les versions"
else
    echo "❌ Erreur lors du push"
    echo ""
    echo "🔧 Solutions possibles :"
    echo "1. Vérifiez vos identifiants GitHub"
    echo "2. Assurez-vous que le repository existe"
    echo "3. Vérifiez votre connexion internet"
    echo ""
    echo "💡 Commandes manuelles :"
    echo "git push -u origin main"
    exit 1
fi
