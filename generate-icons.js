const fs = require('fs');
const path = require('path');

// Créer une icône PNG simple si les outils de conversion ne sont pas disponibles
const createSimpleIcon = () => {
    const iconSizes = [16, 32, 64, 128, 256, 512];
    
    iconSizes.forEach(size => {
        // Pour l'instant, on copie juste le SVG
        // Dans un vrai projet, on utiliserait une librairie comme sharp ou canvas
        const svgPath = path.join(__dirname, 'assets', 'icon.svg');
        const pngPath = path.join(__dirname, 'assets', `icon-${size}.png`);
        
        if (fs.existsSync(svgPath)) {
            // Copier le SVG comme base (Electron peut gérer les SVG)
            fs.copyFileSync(svgPath, pngPath.replace('.png', '.svg'));
        }
    });
    
    console.log('✅ Icônes de base créées');
};

if (require.main === module) {
    createSimpleIcon();
}

module.exports = { createSimpleIcon };
