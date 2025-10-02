// Variables globales
let selectedTemplate = null;
let currentCategory = 'social';
let selectedTemplates = new Set();
let favorites = JSON.parse(localStorage.getItem('templateFavorites') || '[]');
let recentTemplates = JSON.parse(localStorage.getItem('recentTemplates') || '[]');
let userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
let customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '[]');
let currentFilter = 'all';
let searchQuery = '';

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadTemplates(currentCategory);
    updateGenerateButton();
    loadUserPreferences();
    applyTheme();
}

function setupEventListeners() {
    // Gestion des onglets de catégories
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            switchCategory(category);
        });
    });

    // Bouton de génération
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', generateTemplate);

    // Gestion des changements d'options
    const optionInputs = document.querySelectorAll('#fileFormat, #resolution, #colorMode, #includeGuides, #includeBleed');
    optionInputs.forEach(input => {
        input.addEventListener('change', function() {
            updatePreview();
            saveUserPreferences();
        });
    });

    // Gestion du champ nom de fichier
    const fileNameInput = document.getElementById('fileName');
    fileNameInput.addEventListener('input', updateFileName);

    // Gestion des contrôles d'expansion
    const expandAllBtn = document.getElementById('expandAllBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    expandAllBtn.addEventListener('click', expandAllGroups);
    collapseAllBtn.addEventListener('click', collapseAllGroups);

    // Gestion du mode sombre
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Gestion de la recherche
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);

    // Gestion des filtres rapides
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setFilter(this.dataset.filter);
        });
    });

    // Gestion des formats personnalisés
    const createCustomBtn = document.getElementById('createCustomBtn');
    createCustomBtn.addEventListener('click', createCustomTemplate);

    // Gestion de la sélection par lots
    const selectAllBtn = document.getElementById('selectAllBtn');
    const clearSelectionBtn = document.getElementById('clearSelectionBtn');
    const batchGenerateBtn = document.getElementById('batchGenerateBtn');
    
    selectAllBtn.addEventListener('click', selectAllTemplates);
    clearSelectionBtn.addEventListener('click', clearSelection);
    batchGenerateBtn.addEventListener('click', generateBatchTemplates);

    // Raccourcis clavier
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function switchCategory(category) {
    currentCategory = category;
    
    // Mise à jour des onglets
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Affichage/masquage de la section custom
    const customSection = document.getElementById('customFormatSection');
    if (category === 'custom') {
        customSection.style.display = 'block';
    } else {
        customSection.style.display = 'none';
    }
    
    // Chargement des templates
    if (category === 'custom') {
        filterAndDisplayTemplates();
    } else {
        loadTemplates(category);
    }
    
    // Reset de la sélection
    selectedTemplate = null;
    clearSelection();
    updatePreview();
    updateGenerateButton();
}

function loadTemplates(category) {
    const templatesGrid = document.getElementById('templatesGrid');
    const templates = getTemplatesByCategory(category);
    const expandControls = document.getElementById('expandControls');
    
    templatesGrid.innerHTML = '';
    
    if (category === 'social' || category === 'platforms') {
        // Afficher les contrôles d'expansion
        expandControls.style.display = 'flex';
        
        // Grouper par réseau/plateforme
        const groupedTemplates = groupTemplatesByNetwork(templates);
        
        Object.keys(groupedTemplates).forEach(network => {
            const networkGroup = createNetworkGroup(network, groupedTemplates[network]);
            templatesGrid.appendChild(networkGroup);
        });
    } else {
        // Cacher les contrôles d'expansion
        expandControls.style.display = 'none';
        
        // Affichage standard pour les autres catégories
        templates.forEach((template, index) => {
            const templateCard = createTemplateCard(template);
            templateCard.style.animationDelay = `${index * 0.1}s`;
            templatesGrid.appendChild(templateCard);
        });
    }
}

function groupTemplatesByNetwork(templates) {
    const groups = {};
    
    templates.forEach(template => {
        let network = extractNetworkName(template.name);
        
        if (!groups[network]) {
            groups[network] = [];
        }
        groups[network].push(template);
    });
    
    return groups;
}

function extractNetworkName(templateName) {
    // Extraction du nom du réseau depuis le nom du template
    const networkMap = {
        'Facebook': ['Facebook', 'Marketplace'],
        'Instagram': ['Instagram', 'Story', 'Highlights'],
        'X/Twitter': ['Twitter', 'X/Twitter'],
        'YouTube': ['YouTube', 'Shorts'],
        'LinkedIn': ['LinkedIn'],
        'TikTok': ['TikTok'],
        'Pinterest': ['Pinterest', 'Épingle'],
        'Snapchat': ['Snapchat', 'Geofilter'],
        'Discord': ['Discord'],
        'Twitch': ['Twitch', 'Overlay'],
        'Steam': ['Steam', 'Capsule'],
        'Reddit': ['Reddit'],
        'Spotify': ['Spotify', 'Playlist', 'Podcast'],
        'WhatsApp': ['WhatsApp', 'Statut'],
        'Telegram': ['Telegram'],
        'Clubhouse': ['Clubhouse']
    };
    
    for (const [network, keywords] of Object.entries(networkMap)) {
        if (keywords.some(keyword => templateName.includes(keyword))) {
            return network;
        }
    }
    
    return 'Autres';
}

function createNetworkGroup(networkName, templates) {
    const group = document.createElement('div');
    group.className = 'network-group collapsed'; // Démarrer replié
    group.dataset.network = networkName.toLowerCase().replace(/[^a-z]/g, ''); // Pour le CSS
    
    const header = document.createElement('div');
    header.className = 'network-header';
    header.addEventListener('click', () => toggleNetworkGroup(group));
    
    const headerContent = document.createElement('div');
    headerContent.className = 'network-header-content';
    
    const logo = document.createElement('img');
    logo.className = 'network-logo';
    logo.src = getNetworkLogo(networkName);
    logo.alt = `${networkName} logo`;
    logo.onerror = () => { logo.style.display = 'none'; }; // Cache si l'image n'existe pas
    
    const title = document.createElement('h3');
    title.textContent = networkName;
    
    const count = document.createElement('span');
    count.className = 'template-count';
    count.textContent = `${templates.length} format${templates.length > 1 ? 's' : ''}`;
    
    const chevron = document.createElement('div');
    chevron.className = 'chevron';
    chevron.innerHTML = '▶'; // Commencer avec la flèche vers la droite
    
    headerContent.appendChild(logo);
    headerContent.appendChild(title);
    headerContent.appendChild(count);
    header.appendChild(headerContent);
    header.appendChild(chevron);
    
    const templatesContainer = document.createElement('div');
    templatesContainer.className = 'network-templates';
    templatesContainer.style.maxHeight = '0'; // Commencer replié
    templatesContainer.style.opacity = '0';
    
    templates.forEach((template, index) => {
        const templateCard = createTemplateCard(template);
        templateCard.style.animationDelay = `${index * 0.05}s`;
        templatesContainer.appendChild(templateCard);
    });
    
    group.appendChild(header);
    group.appendChild(templatesContainer);
    return group;
}

function toggleNetworkGroup(group) {
    const templatesContainer = group.querySelector('.network-templates');
    const chevron = group.querySelector('.chevron');
    
    group.classList.toggle('collapsed');
    
    if (group.classList.contains('collapsed')) {
        templatesContainer.style.maxHeight = '0';
        templatesContainer.style.opacity = '0';
        chevron.innerHTML = '▶';
    } else {
        templatesContainer.style.maxHeight = templatesContainer.scrollHeight + 'px';
        templatesContainer.style.opacity = '1';
        chevron.innerHTML = '▼';
    }
}

function getNetworkLogo(networkName) {
    const logoMap = {
        'Facebook': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg',
        'Instagram': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg',
        'X/Twitter': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg',
        'YouTube': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg',
        'LinkedIn': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg',
        'TikTok': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg',
        'Pinterest': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg',
        'Snapchat': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/snapchat.svg',
        'Discord': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/discord.svg',
        'Twitch': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitch.svg',
        'Steam': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/steam.svg',
        'Reddit': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/reddit.svg',
        'Spotify': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/spotify.svg',
        'WhatsApp': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg',
        'Telegram': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg',
        'Clubhouse': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/clubhouse.svg'
    };
    
    return logoMap[networkName] || '';
}

function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.dataset.templateId = template.id;
    
    const isFavorite = favorites.includes(template.id);
    const isSelected = selectedTemplates.has(template.id);
    
    // Ajouter bouton de suppression pour les templates personnalisés
    const deleteButton = template.category === 'custom' ? 
        `<button class="delete-btn" onclick="event.stopPropagation(); deleteCustomTemplate('${template.id}')" title="Supprimer ce format personnalisé">
            <svg class="delete-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3,6 5,6 21,6"></polyline>
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
        </button>` : '';

    card.innerHTML = `
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${template.id}')">
            <svg class="favorite-icon" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
            </svg>
        </button>
        ${deleteButton}
        <h4>${template.name}</h4>
        <div class="dimensions">${template.dimensions}</div>
        <div class="description">${template.description}</div>
    `;
    
    if (isSelected) {
        card.classList.add('batch-selected');
    }
    
    card.addEventListener('click', function(event) {
        if (event.ctrlKey || event.metaKey) {
            // Sélection multiple avec Ctrl/Cmd
            toggleTemplateSelection(template.id);
        } else {
            // Sélection normale
            selectTemplate(template.id);
        }
    });
    
    return card;
}

function selectTemplate(templateId) {
    // Mise à jour de la sélection visuelle
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-template-id="${templateId}"]`).classList.add('selected');
    
    // Mise à jour du template sélectionné
    selectedTemplate = getTemplateById(templateId);
    addToRecent(templateId);
    updatePreview();
    updateGenerateButton();
    updateDefaultFileName();
}

function updateDefaultFileName() {
    const fileNameInput = document.getElementById('fileName');
    if (selectedTemplate && !fileNameInput.value) {
        const defaultName = selectedTemplate.name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
        fileNameInput.placeholder = defaultName;
    }
}

function updateFileName() {
    // Cette fonction peut être utilisée pour valider le nom de fichier en temps réel
    const fileNameInput = document.getElementById('fileName');
    const fileName = fileNameInput.value;
    
    // Supprimer les caractères non autorisés
    const cleanFileName = fileName.replace(/[<>:"/\\|?*]/g, '');
    if (cleanFileName !== fileName) {
        fileNameInput.value = cleanFileName;
    }
}

function expandAllGroups() {
    const networkGroups = document.querySelectorAll('.network-group');
    networkGroups.forEach(group => {
        if (group.classList.contains('collapsed')) {
            toggleNetworkGroup(group);
        }
    });
}

function collapseAllGroups() {
    const networkGroups = document.querySelectorAll('.network-group');
    networkGroups.forEach(group => {
        if (!group.classList.contains('collapsed')) {
            toggleNetworkGroup(group);
        }
    });
}

function updatePreview() {
    const previewCanvas = document.getElementById('previewCanvas');
    const templateInfo = document.getElementById('templateInfo');
    
    if (!selectedTemplate) {
        previewCanvas.innerHTML = '<p>Sélectionnez un template pour voir l\'aperçu</p>';
        previewCanvas.classList.remove('has-preview');
        templateInfo.innerHTML = '';
        return;
    }
    
    // Création de l'aperçu visuel
    createVisualPreview(previewCanvas, selectedTemplate);
    
    // Mise à jour des informations
    updateTemplateInfo(templateInfo, selectedTemplate);
}

function createVisualPreview(container, template) {
    container.classList.add('has-preview');
    
    // Calcul des dimensions pour l'aperçu (max 300px de largeur)
    const maxWidth = 280;
    const scale = Math.min(maxWidth / template.width, maxWidth / template.height);
    const previewWidth = template.width * scale;
    const previewHeight = template.height * scale;
    
    container.innerHTML = `
        <div class="preview-template" style="
            width: ${previewWidth}px;
            height: ${previewHeight}px;
            background: #ffffff;
            border: 2px solid #e2e8f0;
            position: relative;
            margin: 0 auto;
        ">
            ${createPreviewGuides(template, scale)}
            <div class="preview-content" style="
                position: absolute;
                top: ${template.margins.top * scale}px;
                left: ${template.margins.left * scale}px;
                right: ${template.margins.right * scale}px;
                bottom: ${template.margins.bottom * scale}px;
                background: rgba(102, 126, 234, 0.1);
                border: 1px dashed #667eea;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                color: #667eea;
            ">
                Zone de contenu
            </div>
        </div>
    `;
}

function createPreviewGuides(template, scale) {
    const includeGuides = document.getElementById('includeGuides').checked;
    const includeBleed = document.getElementById('includeBleed').checked;
    
    if (!includeGuides) return '';
    
    let guides = '';
    
    // Marges
    const marginTop = template.margins.top * scale;
    const marginLeft = template.margins.left * scale;
    const marginRight = template.margins.right * scale;
    const marginBottom = template.margins.bottom * scale;
    
    guides += `
        <div style="position: absolute; top: 0; left: 0; right: 0; height: ${marginTop}px; background: rgba(255, 0, 0, 0.1); border-bottom: 1px dashed #ff0000;"></div>
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: ${marginBottom}px; background: rgba(255, 0, 0, 0.1); border-top: 1px dashed #ff0000;"></div>
        <div style="position: absolute; top: 0; bottom: 0; left: 0; width: ${marginLeft}px; background: rgba(255, 0, 0, 0.1); border-right: 1px dashed #ff0000;"></div>
        <div style="position: absolute; top: 0; bottom: 0; right: 0; width: ${marginRight}px; background: rgba(255, 0, 0, 0.1); border-left: 1px dashed #ff0000;"></div>
    `;
    
    // Zone de sécurité (si définie)
    if (template.safeZone) {
        const safeTop = template.safeZone.top * scale;
        const safeLeft = template.safeZone.left * scale;
        const safeRight = template.safeZone.right * scale;
        const safeBottom = template.safeZone.bottom * scale;
        
        guides += `
            <div style="position: absolute; top: ${safeTop}px; left: ${safeLeft}px; right: ${safeRight}px; bottom: ${safeBottom}px; border: 1px dashed #00aa00; pointer-events: none;"></div>
        `;
    }
    
    // Fonds perdus (pour l'impression)
    if (includeBleed && template.bleed && template.category === 'print') {
        const bleedTop = template.bleed.top * scale;
        const bleedLeft = template.bleed.left * scale;
        const bleedRight = template.bleed.right * scale;
        const bleedBottom = template.bleed.bottom * scale;
        
        guides += `
            <div style="position: absolute; top: -${bleedTop}px; left: -${bleedLeft}px; right: -${bleedRight}px; bottom: -${bleedBottom}px; border: 2px solid #ff6600; pointer-events: none;"></div>
        `;
    }
    
    return guides;
}

function updateTemplateInfo(container, template) {
    const fileFormat = document.getElementById('fileFormat').value;
    const resolution = document.getElementById('resolution').value;
    const colorMode = document.getElementById('colorMode').value;
    
    // Calcul de la taille de fichier estimée (approximation)
    const pixelCount = template.width * template.height;
    let estimatedSize;
    
    switch(fileFormat) {
        case 'psd':
            estimatedSize = Math.round(pixelCount * 4 / 1024 / 1024); // ~4 bytes par pixel
            break;
        case 'ai':
            estimatedSize = Math.round(pixelCount * 0.5 / 1024 / 1024); // Vectoriel, plus petit
            break;
        case 'jpg':
            estimatedSize = Math.round(pixelCount * 0.3 / 1024 / 1024); // Compression JPEG
            break;
        case 'png':
            estimatedSize = Math.round(pixelCount * 3 / 1024 / 1024); // PNG sans compression
            break;
        case 'pdf':
            estimatedSize = Math.round(pixelCount * 1 / 1024 / 1024); // PDF compressé
            break;
        default:
            estimatedSize = 'N/A';
    }
    
    container.innerHTML = `
        <div class="info-item">
            <strong>Dimensions :</strong>
            <span>${template.dimensions}</span>
        </div>
        <div class="info-item">
            <strong>Pixels :</strong>
            <span>${template.width} × ${template.height} px</span>
        </div>
        <div class="info-item">
            <strong>Format :</strong>
            <span>${fileFormat.toUpperCase()}</span>
        </div>
        <div class="info-item">
            <strong>Résolution :</strong>
            <span>${resolution} DPI</span>
        </div>
        <div class="info-item">
            <strong>Mode couleur :</strong>
            <span>${colorMode.toUpperCase()}</span>
        </div>
        <div class="info-item">
            <strong>Taille estimée :</strong>
            <span>${estimatedSize} MB</span>
        </div>
        ${template.margins ? `
        <div class="info-item">
            <strong>Marges :</strong>
            <span>${template.margins.top}px (T/B), ${template.margins.left}px (L/R)</span>
        </div>
        ` : ''}
        ${template.bleed ? `
        <div class="info-item">
            <strong>Fonds perdus :</strong>
            <span>${template.bleed.top}px</span>
        </div>
        ` : ''}
    `;
}

function updateGenerateButton() {
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = !selectedTemplate;
    
    if (selectedTemplate) {
        generateBtn.textContent = `📁 Générer ${selectedTemplate.name}`;
    } else {
        generateBtn.textContent = '📁 Générer le template';
    }
}

function generateTemplate() {
    if (!selectedTemplate) return;
    
    const generateBtn = document.getElementById('generateBtn');
    const originalText = generateBtn.textContent;
    
    // Animation de chargement
    generateBtn.innerHTML = '<span class="loading"></span> Génération en cours...';
    generateBtn.disabled = true;
    
    // Récupération des options
    const options = {
        fileFormat: document.getElementById('fileFormat').value,
        resolution: parseInt(document.getElementById('resolution').value),
        colorMode: document.getElementById('colorMode').value,
        includeGuides: document.getElementById('includeGuides').checked,
        includeBleed: document.getElementById('includeBleed').checked
    };
    
    // Simulation de la génération (remplacer par la vraie logique)
    setTimeout(() => {
        createTemplateFile(selectedTemplate, options);
        
        // Restauration du bouton
        generateBtn.textContent = originalText;
        generateBtn.disabled = false;
        
        // Notification de succès
        const format = document.getElementById('fileFormat').value;
        let message = 'Gabarit généré avec succès !';
        
        if (format === 'psd') {
            message = 'Gabarit PNG généré ! Utilisez-le comme base dans Photoshop.';
        } else if (format === 'ai') {
            message = 'Gabarit SVG généré ! Ouvrez-le directement dans Illustrator.';
        } else if (format === 'pdf') {
            message = 'Gabarit PNG haute résolution généré !';
        }
        
        showNotification(message, 'success');
    }, 2000);
}

function createTemplateFile(template, options) {
    // Récupération du nom de fichier personnalisé ou par défaut
    const fileNameInput = document.getElementById('fileName');
    const customFileName = fileNameInput.value.trim();
    const baseFileName = customFileName || template.name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    
    // Création du contenu du fichier selon le format
    let fileContent;
    let fileName;
    let mimeType;
    
    switch(options.fileFormat) {
        case 'psd':
            // Pour PSD, on génère un PNG gabarit avec guides visuels
            fileContent = createImageTemplate(template, options, 'png');
            fileName = `${baseFileName}_gabarit.png`;
            mimeType = 'image/png';
            break;
            
        case 'ai':
            fileContent = createAITemplate(template, options);
            fileName = `${baseFileName}.svg`;
            mimeType = 'image/svg+xml';
            break;
        case 'jpg':
            fileContent = createImageTemplate(template, options, 'jpeg');
            fileName = `${baseFileName}.jpg`;
            mimeType = 'image/jpeg';
            break;
        case 'png':
            fileContent = createImageTemplate(template, options, 'png');
            fileName = `${baseFileName}.png`;
            mimeType = 'image/png';
            break;
        case 'pdf':
            // Pour PDF, on génère un PNG haute résolution
            fileContent = createImageTemplate(template, options, 'png');
            fileName = `${baseFileName}_gabarit.png`;
            mimeType = 'image/png';
            break;
    }
    
    // Téléchargement du fichier
    downloadFile(fileContent, fileName, mimeType);
}

function createImageTemplate(template, options, format) {
    // Création d'un canvas pour générer l'image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustement de la résolution
    const scaleFactor = options.resolution / 72; // 72 DPI par défaut pour le web
    canvas.width = template.width * scaleFactor;
    canvas.height = template.height * scaleFactor;
    
    // Fond blanc
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ajout des guides si demandé
    if (options.includeGuides) {
        drawGuides(ctx, template, scaleFactor);
    }
    
    // Ajout des fonds perdus si demandé
    if (options.includeBleed && template.bleed) {
        drawBleed(ctx, template, scaleFactor);
    }
    
    // Zone de contenu
    drawContentArea(ctx, template, scaleFactor);
    
    return canvas.toDataURL(`image/${format}`, format === 'jpeg' ? 0.9 : 1.0);
}

function drawGuides(ctx, template, scale) {
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    const margins = template.margins;
    const width = template.width * scale;
    const height = template.height * scale;
    
    // Marges
    ctx.beginPath();
    // Haut
    ctx.moveTo(0, margins.top * scale);
    ctx.lineTo(width, margins.top * scale);
    // Bas
    ctx.moveTo(0, height - margins.bottom * scale);
    ctx.lineTo(width, height - margins.bottom * scale);
    // Gauche
    ctx.moveTo(margins.left * scale, 0);
    ctx.lineTo(margins.left * scale, height);
    // Droite
    ctx.moveTo(width - margins.right * scale, 0);
    ctx.lineTo(width - margins.right * scale, height);
    ctx.stroke();
    
    // Zone de sécurité
    if (template.safeZone) {
        ctx.strokeStyle = '#00aa00';
        ctx.beginPath();
        ctx.rect(
            template.safeZone.left * scale,
            template.safeZone.top * scale,
            width - (template.safeZone.left + template.safeZone.right) * scale,
            height - (template.safeZone.top + template.safeZone.bottom) * scale
        );
        ctx.stroke();
    }
}

function drawBleed(ctx, template, scale) {
    if (!template.bleed) return;
    
    ctx.strokeStyle = '#ff6600';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    
    const bleed = template.bleed;
    const width = template.width * scale;
    const height = template.height * scale;
    
    ctx.beginPath();
    ctx.rect(
        -bleed.left * scale,
        -bleed.top * scale,
        width + (bleed.left + bleed.right) * scale,
        height + (bleed.top + bleed.bottom) * scale
    );
    ctx.stroke();
}

function drawContentArea(ctx, template, scale) {
    const margins = template.margins;
    const width = template.width * scale;
    const height = template.height * scale;
    
    // Zone de contenu
    ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
    ctx.fillRect(
        margins.left * scale,
        margins.top * scale,
        width - (margins.left + margins.right) * scale,
        height - (margins.top + margins.bottom) * scale
    );
    
    // Texte indicatif
    ctx.fillStyle = '#667eea';
    ctx.font = `${Math.max(12, 20 * scale)}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
        'Zone de contenu',
        width / 2,
        height / 2
    );
    
    // Informations du template
    ctx.font = `${Math.max(10, 14 * scale)}px Inter, sans-serif`;
    ctx.fillText(
        `${template.name} - ${template.dimensions}`,
        width / 2,
        height / 2 + 30 * scale
    );
}

function createPSDTemplate(template, options) {
    // Création d'un fichier image PNG avec les spécifications pour Photoshop
    // L'utilisateur pourra ensuite l'ouvrir dans Photoshop et le sauvegarder en PSD
    return createImageTemplate(template, options, 'png');
}


function createAITemplate(template, options) {
    // Création d'un fichier SVG qui peut être ouvert dans Illustrator
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${template.width}" height="${template.height}" viewBox="0 0 ${template.width} ${template.height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <style>
            .content-area { fill: rgba(102, 126, 234, 0.1); stroke: #667eea; stroke-dasharray: 5,5; }
            .margin-guide { fill: none; stroke: #ff0000; stroke-dasharray: 5,5; }
            .safe-zone { fill: none; stroke: #00aa00; stroke-dasharray: 5,5; }
            .bleed-guide { fill: none; stroke: #ff6600; stroke-width: 2; stroke-dasharray: 10,5; }
            .text { font-family: Arial, sans-serif; font-size: 20px; fill: #667eea; text-anchor: middle; }
        </style>
    </defs>
    
    <!-- Fond blanc -->
    <rect width="${template.width}" height="${template.height}" fill="white"/>
    
    <!-- Zone de contenu -->
    <rect x="${template.margins.left}" y="${template.margins.top}" 
          width="${template.width - template.margins.left - template.margins.right}" 
          height="${template.height - template.margins.top - template.margins.bottom}" 
          class="content-area"/>
    
    ${options.includeGuides ? `
    <!-- Guides de marges -->
    <line x1="0" y1="${template.margins.top}" x2="${template.width}" y2="${template.margins.top}" class="margin-guide"/>
    <line x1="0" y1="${template.height - template.margins.bottom}" x2="${template.width}" y2="${template.height - template.margins.bottom}" class="margin-guide"/>
    <line x1="${template.margins.left}" y1="0" x2="${template.margins.left}" y2="${template.height}" class="margin-guide"/>
    <line x1="${template.width - template.margins.right}" y1="0" x2="${template.width - template.margins.right}" y2="${template.height}" class="margin-guide"/>
    ` : ''}
    
    ${options.includeGuides && template.safeZone ? `
    <!-- Zone de sécurité -->
    <rect x="${template.safeZone.left}" y="${template.safeZone.top}" 
          width="${template.width - template.safeZone.left - template.safeZone.right}" 
          height="${template.height - template.safeZone.top - template.safeZone.bottom}" 
          class="safe-zone"/>
    ` : ''}
    
    ${options.includeBleed && template.bleed ? `
    <!-- Fonds perdus -->
    <rect x="${-template.bleed.left}" y="${-template.bleed.top}" 
          width="${template.width + template.bleed.left + template.bleed.right}" 
          height="${template.height + template.bleed.top + template.bleed.bottom}" 
          class="bleed-guide"/>
    ` : ''}
    
    <!-- Texte informatif -->
    <text x="${template.width/2}" y="${template.height/2}" class="text">Zone de contenu</text>
    <text x="${template.width/2}" y="${template.height/2 + 30}" class="text" font-size="14">${template.name} - ${template.dimensions}</text>
</svg>`;
    
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}


function downloadFile(content, fileName, mimeType) {
    const link = document.createElement('a');
    link.href = content;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ========== NOUVELLES FONCTIONNALITÉS ==========

// Mode sombre
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    
    // Sauvegarder la préférence
    userPreferences.darkMode = isDark;
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

function applyTheme() {
    const isDark = userPreferences.darkMode || false;
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (isDark) {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
}

// Recherche et filtrage
function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase();
    filterAndDisplayTemplates();
}

function setFilter(filter) {
    currentFilter = filter;
    
    // Mise à jour des boutons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    filterAndDisplayTemplates();
}

function filterAndDisplayTemplates() {
    const templatesGrid = document.getElementById('templatesGrid');
    const templates = getFilteredTemplates();
    
    templatesGrid.innerHTML = '';
    
    if (currentCategory === 'social' || currentCategory === 'platforms') {
        const groupedTemplates = groupTemplatesByNetwork(templates);
        Object.keys(groupedTemplates).forEach(network => {
            const networkGroup = createNetworkGroup(network, groupedTemplates[network]);
            templatesGrid.appendChild(networkGroup);
        });
    } else {
        templates.forEach((template, index) => {
            const templateCard = createTemplateCard(template);
            templateCard.style.animationDelay = `${index * 0.05}s`;
            templatesGrid.appendChild(templateCard);
        });
    }
}

function getFilteredTemplates() {
    let templates = [];
    
    if (currentCategory === 'custom') {
        templates = customTemplates;
    } else {
        templates = getTemplatesByCategory(currentCategory);
    }
    
    // Filtrage par recherche
    if (searchQuery) {
        templates = templates.filter(template => 
            template.name.toLowerCase().includes(searchQuery) ||
            template.description.toLowerCase().includes(searchQuery)
        );
    }
    
    // Filtrage par type
    switch (currentFilter) {
        case 'favorites':
            templates = templates.filter(template => favorites.includes(template.id));
            break;
        case 'recent':
            templates = templates.filter(template => recentTemplates.includes(template.id));
            break;
    }
    
    return templates;
}

// Favoris
function toggleFavorite(templateId) {
    const index = favorites.indexOf(templateId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(templateId);
    }
    
    localStorage.setItem('templateFavorites', JSON.stringify(favorites));
    
    // Mise à jour de l'affichage si on est dans les favoris
    if (currentFilter === 'favorites') {
        filterAndDisplayTemplates();
    }
    
    // Mettre à jour l'icône du bouton favori
    const favoriteBtn = document.querySelector(`[data-template-id="${templateId}"] .favorite-btn`);
    if (favoriteBtn) {
        const isFavorite = favorites.includes(templateId);
        favoriteBtn.classList.toggle('active', isFavorite);
        const icon = favoriteBtn.querySelector('.favorite-icon');
        if (icon) {
            icon.setAttribute('fill', isFavorite ? 'currentColor' : 'none');
        }
    }
}

// Historique récent
function addToRecent(templateId) {
    const index = recentTemplates.indexOf(templateId);
    
    if (index > -1) {
        recentTemplates.splice(index, 1);
    }
    
    recentTemplates.unshift(templateId);
    
    // Garder seulement les 10 derniers
    if (recentTemplates.length > 10) {
        recentTemplates = recentTemplates.slice(0, 10);
    }
    
    localStorage.setItem('recentTemplates', JSON.stringify(recentTemplates));
}

// Formats personnalisés
function createCustomTemplate() {
    const name = document.getElementById('customName').value;
    const width = parseInt(document.getElementById('customWidth').value);
    const height = parseInt(document.getElementById('customHeight').value);
    const unit = document.getElementById('customUnit').value;
    
    if (!name || !width || !height) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    // Conversion en pixels si nécessaire
    let pixelWidth = width;
    let pixelHeight = height;
    
    if (unit === 'mm') {
        pixelWidth = Math.round(width * 11.811); // 300 DPI
        pixelHeight = Math.round(height * 11.811);
    } else if (unit === 'in') {
        pixelWidth = Math.round(width * 300); // 300 DPI
        pixelHeight = Math.round(height * 300);
    }
    
    const customTemplate = {
        id: 'custom-' + Date.now(),
        name: name,
        dimensions: `${width} × ${height} ${unit}`,
        width: pixelWidth,
        height: pixelHeight,
        description: `Format personnalisé (${width}×${height} ${unit})`,
        margins: { top: Math.round(pixelHeight * 0.05), right: Math.round(pixelWidth * 0.05), bottom: Math.round(pixelHeight * 0.05), left: Math.round(pixelWidth * 0.05) },
        safeZone: { top: Math.round(pixelHeight * 0.1), right: Math.round(pixelWidth * 0.1), bottom: Math.round(pixelHeight * 0.1), left: Math.round(pixelWidth * 0.1) },
        category: 'custom'
    };
    
    customTemplates.push(customTemplate);
    localStorage.setItem('customTemplates', JSON.stringify(customTemplates));
    
    // Réinitialiser le formulaire
    document.getElementById('customName').value = '';
    document.getElementById('customWidth').value = '';
    document.getElementById('customHeight').value = '';
    
    // Recharger l'affichage
    filterAndDisplayTemplates();
    
    showNotification('Format personnalisé créé avec succès !', 'success');
}

// Suppression des formats personnalisés
function deleteCustomTemplate(templateId) {
    // Confirmation avant suppression
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce format personnalisé ?')) {
        return;
    }
    
    // Trouver l'index du template à supprimer
    const index = customTemplates.findIndex(template => template.id === templateId);
    
    if (index > -1) {
        // Supprimer le template du tableau
        const deletedTemplate = customTemplates.splice(index, 1)[0];
        
        // Mettre à jour le localStorage
        localStorage.setItem('customTemplates', JSON.stringify(customTemplates));
        
        // Supprimer des favoris si présent
        const favoriteIndex = favorites.indexOf(templateId);
        if (favoriteIndex > -1) {
            favorites.splice(favoriteIndex, 1);
            localStorage.setItem('templateFavorites', JSON.stringify(favorites));
        }
        
        // Supprimer de l'historique récent si présent
        const recentIndex = recentTemplates.indexOf(templateId);
        if (recentIndex > -1) {
            recentTemplates.splice(recentIndex, 1);
            localStorage.setItem('recentTemplates', JSON.stringify(recentTemplates));
        }
        
        // Supprimer de la sélection si présent
        selectedTemplates.delete(templateId);
        updateBatchSelection();
        
        // Si c'était le template sélectionné, le désélectionner
        if (selectedTemplate && selectedTemplate.id === templateId) {
            selectedTemplate = null;
            updatePreview();
            updateGenerateButton();
        }
        
        // Recharger l'affichage
        if (currentCategory === 'custom') {
            filterAndDisplayTemplates();
        }
        
        showNotification(`Format "${deletedTemplate.name}" supprimé avec succès !`, 'success');
    }
}


// Sélection par lots
function toggleTemplateSelection(templateId) {
    if (selectedTemplates.has(templateId)) {
        selectedTemplates.delete(templateId);
    } else {
        selectedTemplates.add(templateId);
    }
    
    updateBatchSelection();
    updateTemplateCardSelection(templateId);
}

function updateBatchSelection() {
    const batchSelection = document.getElementById('batchSelection');
    const selectedCount = document.getElementById('selectedCount');
    
    if (selectedTemplates.size > 0) {
        batchSelection.style.display = 'block';
        selectedCount.textContent = `${selectedTemplates.size} template(s) sélectionné(s)`;
    } else {
        batchSelection.style.display = 'none';
    }
}

function selectAllTemplates() {
    const templates = getFilteredTemplates();
    templates.forEach(template => {
        selectedTemplates.add(template.id);
    });
    
    updateBatchSelection();
    updateAllTemplateCards();
}

function clearSelection() {
    selectedTemplates.clear();
    updateBatchSelection();
    updateAllTemplateCards();
}

function updateTemplateCardSelection(templateId) {
    const card = document.querySelector(`[data-template-id="${templateId}"]`);
    if (card) {
        if (selectedTemplates.has(templateId)) {
            card.classList.add('batch-selected');
        } else {
            card.classList.remove('batch-selected');
        }
    }
}

function updateAllTemplateCards() {
    document.querySelectorAll('.template-card').forEach(card => {
        const templateId = card.dataset.templateId;
        if (selectedTemplates.has(templateId)) {
            card.classList.add('batch-selected');
        } else {
            card.classList.remove('batch-selected');
        }
    });
}

// Génération par lots avec barre de progression
function generateBatchTemplates() {
    if (selectedTemplates.size === 0) return;
    
    const templates = Array.from(selectedTemplates).map(id => getTemplateById(id));
    const progressContainer = document.getElementById('progressContainer');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressContainer.style.display = 'block';
    
    let completed = 0;
    const total = templates.length;
    
    const options = {
        fileFormat: document.getElementById('fileFormat').value,
        resolution: parseInt(document.getElementById('resolution').value),
        colorMode: document.getElementById('colorMode').value,
        includeGuides: document.getElementById('includeGuides').checked,
        includeBleed: document.getElementById('includeBleed').checked
    };
    
    function generateNext() {
        if (completed >= total) {
            progressContainer.style.display = 'none';
            clearSelection();
            showNotification(`${total} templates générés avec succès !`, 'success');
            return;
        }
        
        const template = templates[completed];
        const progress = ((completed + 1) / total) * 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Génération ${completed + 1}/${total} - ${template.name}`;
        
        // Générer le template
        setTimeout(() => {
            createTemplateFile(template, options);
            completed++;
            generateNext();
        }, 500);
    }
    
    generateNext();
}

// Raccourcis clavier
function handleKeyboardShortcuts(event) {
    if (event.key === 'Enter' && selectedTemplate && !document.getElementById('generateBtn').disabled) {
        generateTemplate();
    } else if (event.key === 'Escape') {
        clearSelection();
    } else if (event.ctrlKey || event.metaKey) {
        if (event.key === 'd') {
            event.preventDefault();
            toggleTheme();
        }
    }
}

// Préférences utilisateur
function loadUserPreferences() {
    // Charger les préférences sauvegardées
    if (userPreferences.fileFormat) {
        document.getElementById('fileFormat').value = userPreferences.fileFormat;
    }
    if (userPreferences.resolution) {
        document.getElementById('resolution').value = userPreferences.resolution;
    }
    if (userPreferences.colorMode) {
        document.getElementById('colorMode').value = userPreferences.colorMode;
    }
}

function saveUserPreferences() {
    userPreferences.fileFormat = document.getElementById('fileFormat').value;
    userPreferences.resolution = document.getElementById('resolution').value;
    userPreferences.colorMode = document.getElementById('colorMode').value;
    
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

function showNotification(message, type = 'info') {
    // Création d'une notification temporaire
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 0.9rem;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animation d'entrée
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Suppression automatique après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
