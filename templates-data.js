// Base de données des templates avec dimensions et spécifications
const TEMPLATES_DATA = {
    social: [
        // FACEBOOK
        {
            id: 'facebook-profile',
            name: 'Photo de Profil Facebook',
            dimensions: '400 × 400 px',
            width: 400,
            height: 400,
            description: 'Photo de profil Facebook (format carré)',
            margins: { top: 20, right: 20, bottom: 20, left: 20 },
            safeZone: { top: 40, right: 40, bottom: 40, left: 40 },
            category: 'social'
        },
        {
            id: 'facebook-cover',
            name: 'Couverture Facebook',
            dimensions: '820 × 312 px',
            width: 820,
            height: 312,
            description: 'Photo de couverture Facebook (16:9)',
            margins: { top: 16, right: 41, bottom: 16, left: 41 },
            safeZone: { top: 31, right: 82, bottom: 31, left: 82 },
            category: 'social'
        },
        {
            id: 'facebook-post-square',
            name: 'Post Facebook (Carré)',
            dimensions: '1080 × 1080 px',
            width: 1080,
            height: 1080,
            description: 'Post Facebook format carré (1:1)',
            margins: { top: 54, right: 54, bottom: 54, left: 54 },
            safeZone: { top: 27, right: 27, bottom: 27, left: 27 },
            category: 'social'
        },
        {
            id: 'facebook-post-portrait',
            name: 'Post Facebook (Portrait)',
            dimensions: '1080 × 1350 px',
            width: 1080,
            height: 1350,
            description: 'Post Facebook format portrait (4:5)',
            margins: { top: 68, right: 54, bottom: 68, left: 54 },
            safeZone: { top: 34, right: 27, bottom: 34, left: 27 },
            category: 'social'
        },
        {
            id: 'facebook-story',
            name: 'Story Facebook',
            dimensions: '1080 × 1920 px',
            width: 1080,
            height: 1920,
            description: 'Story Facebook format vertical (9:16)',
            margins: { top: 96, right: 54, bottom: 96, left: 54 },
            safeZone: { top: 250, right: 54, bottom: 250, left: 54 },
            category: 'social'
        },
        {
            id: 'facebook-marketplace',
            name: 'Facebook Marketplace',
            dimensions: '1200 × 1200 px',
            width: 1200,
            height: 1200,
            description: 'Photo pour Facebook Marketplace',
            margins: { top: 60, right: 60, bottom: 60, left: 60 },
            safeZone: { top: 30, right: 30, bottom: 30, left: 30 },
            category: 'social'
        },

        // TWITTER/X
        {
            id: 'twitter-profile',
            name: 'Photo de Profil X/Twitter',
            dimensions: '400 × 400 px',
            width: 400,
            height: 400,
            description: 'Photo de profil X/Twitter (format carré)',
            margins: { top: 20, right: 20, bottom: 20, left: 20 },
            safeZone: { top: 40, right: 40, bottom: 40, left: 40 },
            category: 'social'
        },
        {
            id: 'twitter-header',
            name: 'En-tête X/Twitter',
            dimensions: '1500 × 500 px',
            width: 1500,
            height: 500,
            description: 'Bannière pour profil X/Twitter',
            margins: { top: 25, right: 75, bottom: 25, left: 75 },
            safeZone: { top: 50, right: 150, bottom: 50, left: 150 },
            category: 'social'
        },
        {
            id: 'twitter-post-square',
            name: 'Post X/Twitter (Carré)',
            dimensions: '1200 × 1200 px',
            width: 1200,
            height: 1200,
            description: 'Post X/Twitter format carré',
            margins: { top: 60, right: 60, bottom: 60, left: 60 },
            safeZone: { top: 30, right: 30, bottom: 30, left: 30 },
            category: 'social'
        },
        {
            id: 'twitter-post-landscape',
            name: 'Post X/Twitter (Paysage)',
            dimensions: '1200 × 628 px',
            width: 1200,
            height: 628,
            description: 'Post X/Twitter format paysage',
            margins: { top: 31, right: 60, bottom: 31, left: 60 },
            safeZone: { top: 63, right: 120, bottom: 63, left: 120 },
            category: 'social'
        },
        {
            id: 'twitter-ad',
            name: 'Publicité X/Twitter',
            dimensions: '1200 × 675 px',
            width: 1200,
            height: 675,
            description: 'Tweet sponsorisé X/Twitter',
            margins: { top: 34, right: 60, bottom: 34, left: 60 },
            safeZone: { top: 68, right: 120, bottom: 68, left: 120 },
            category: 'social'
        },

        // INSTAGRAM
        {
            id: 'instagram-profile',
            name: 'Photo de Profil Instagram',
            dimensions: '320 × 320 px',
            width: 320,
            height: 320,
            description: 'Photo de profil Instagram (format circulaire)',
            margins: { top: 16, right: 16, bottom: 16, left: 16 },
            safeZone: { top: 48, right: 48, bottom: 48, left: 48 },
            category: 'social'
        },
        {
            id: 'instagram-post-square',
            name: 'Post Instagram (Carré)',
            dimensions: '1080 × 1080 px',
            width: 1080,
            height: 1080,
            description: 'Post Instagram format carré (1:1)',
            margins: { top: 54, right: 54, bottom: 54, left: 54 },
            safeZone: { top: 27, right: 27, bottom: 27, left: 27 },
            category: 'social'
        },
        {
            id: 'instagram-post-portrait',
            name: 'Post Instagram (Portrait)',
            dimensions: '1080 × 1350 px',
            width: 1080,
            height: 1350,
            description: 'Post Instagram format portrait (4:5)',
            margins: { top: 68, right: 54, bottom: 68, left: 54 },
            safeZone: { top: 34, right: 27, bottom: 34, left: 27 },
            category: 'social'
        },
        {
            id: 'instagram-post-landscape',
            name: 'Post Instagram (Paysage)',
            dimensions: '1080 × 628 px',
            width: 1080,
            height: 628,
            description: 'Post Instagram format paysage',
            margins: { top: 31, right: 54, bottom: 31, left: 54 },
            safeZone: { top: 63, right: 108, bottom: 63, left: 108 },
            category: 'social'
        },
        {
            id: 'instagram-story',
            name: 'Story Instagram',
            dimensions: '1080 × 1920 px',
            width: 1080,
            height: 1920,
            description: 'Story Instagram format vertical (9:16)',
            margins: { top: 96, right: 54, bottom: 96, left: 54 },
            safeZone: { top: 250, right: 54, bottom: 250, left: 54 },
            category: 'social'
        },
        {
            id: 'instagram-story-highlight',
            name: 'Vignette Story à la Une',
            dimensions: '1080 × 1080 px',
            width: 1080,
            height: 1080,
            description: 'Vignette pour Stories à la Une Instagram',
            margins: { top: 54, right: 54, bottom: 54, left: 54 },
            safeZone: { top: 162, right: 162, bottom: 162, left: 162 },
            category: 'social'
        },

        // YOUTUBE
        {
            id: 'youtube-profile',
            name: 'Photo de Chaîne YouTube',
            dimensions: '800 × 800 px',
            width: 800,
            height: 800,
            description: 'Photo de profil chaîne YouTube',
            margins: { top: 40, right: 40, bottom: 40, left: 40 },
            safeZone: { top: 120, right: 120, bottom: 120, left: 120 },
            category: 'social'
        },
        {
            id: 'youtube-banner',
            name: 'Bannière YouTube',
            dimensions: '2560 × 1440 px',
            width: 2560,
            height: 1440,
            description: 'Bannière de chaîne YouTube',
            margins: { top: 72, right: 128, bottom: 72, left: 128 },
            safeZone: { top: 144, right: 256, bottom: 144, left: 256 },
            category: 'social'
        },
        {
            id: 'youtube-thumbnail',
            name: 'Miniature YouTube',
            dimensions: '1280 × 720 px',
            width: 1280,
            height: 720,
            description: 'Miniature pour vidéos YouTube (16:9)',
            margins: { top: 36, right: 64, bottom: 36, left: 64 },
            safeZone: { top: 72, right: 128, bottom: 72, left: 128 },
            category: 'social'
        },
        {
            id: 'youtube-shorts',
            name: 'YouTube Shorts',
            dimensions: '1080 × 1920 px',
            width: 1080,
            height: 1920,
            description: 'Format pour YouTube Shorts (9:16)',
            margins: { top: 96, right: 54, bottom: 96, left: 54 },
            safeZone: { top: 192, right: 108, bottom: 192, left: 108 },
            category: 'social'
        },

        // LINKEDIN
        {
            id: 'linkedin-profile',
            name: 'Photo de Profil LinkedIn',
            dimensions: '400 × 400 px',
            width: 400,
            height: 400,
            description: 'Photo de profil LinkedIn',
            margins: { top: 20, right: 20, bottom: 20, left: 20 },
            safeZone: { top: 40, right: 40, bottom: 40, left: 40 },
            category: 'social'
        },
        {
            id: 'linkedin-cover',
            name: 'Couverture LinkedIn',
            dimensions: '1584 × 396 px',
            width: 1584,
            height: 396,
            description: 'Photo de couverture LinkedIn',
            margins: { top: 20, right: 79, bottom: 20, left: 79 },
            safeZone: { top: 40, right: 158, bottom: 40, left: 158 },
            category: 'social'
        },
        {
            id: 'linkedin-company-logo',
            name: 'Logo Page LinkedIn',
            dimensions: '300 × 300 px',
            width: 300,
            height: 300,
            description: 'Logo pour pages entreprise LinkedIn',
            margins: { top: 15, right: 15, bottom: 15, left: 15 },
            safeZone: { top: 30, right: 30, bottom: 30, left: 30 },
            category: 'social'
        },
        {
            id: 'linkedin-company-cover',
            name: 'Couverture Page LinkedIn',
            dimensions: '1400 × 425 px',
            width: 1400,
            height: 425,
            description: 'Couverture pour pages entreprise LinkedIn',
            margins: { top: 21, right: 70, bottom: 21, left: 70 },
            safeZone: { top: 43, right: 140, bottom: 43, left: 140 },
            category: 'social'
        },
        {
            id: 'linkedin-post',
            name: 'Post LinkedIn',
            dimensions: '552 × 276 px',
            width: 552,
            height: 276,
            description: 'Image pour post LinkedIn',
            margins: { top: 14, right: 28, bottom: 14, left: 28 },
            safeZone: { top: 28, right: 55, bottom: 28, left: 55 },
            category: 'social'
        },

        // TIKTOK
        {
            id: 'tiktok-profile',
            name: 'Photo de Profil TikTok',
            dimensions: '200 × 200 px',
            width: 200,
            height: 200,
            description: 'Photo de profil TikTok',
            margins: { top: 10, right: 10, bottom: 10, left: 10 },
            safeZone: { top: 20, right: 20, bottom: 20, left: 20 },
            category: 'social'
        },
        {
            id: 'tiktok-video',
            name: 'Vidéo TikTok',
            dimensions: '1080 × 1920 px',
            width: 1080,
            height: 1920,
            description: 'Format vidéo TikTok (9:16)',
            margins: { top: 96, right: 54, bottom: 96, left: 54 },
            safeZone: { top: 192, right: 108, bottom: 192, left: 108 },
            category: 'social'
        },

        // PINTEREST
        {
            id: 'pinterest-profile',
            name: 'Photo de Profil Pinterest',
            dimensions: '180 × 180 px',
            width: 180,
            height: 180,
            description: 'Photo de profil Pinterest',
            margins: { top: 9, right: 9, bottom: 9, left: 9 },
            safeZone: { top: 18, right: 18, bottom: 18, left: 18 },
            category: 'social'
        },
        {
            id: 'pinterest-cover',
            name: 'Couverture Pinterest',
            dimensions: '800 × 450 px',
            width: 800,
            height: 450,
            description: 'Photo de couverture Pinterest',
            margins: { top: 23, right: 40, bottom: 23, left: 40 },
            safeZone: { top: 45, right: 80, bottom: 45, left: 80 },
            category: 'social'
        },
        {
            id: 'pinterest-pin',
            name: 'Épingle Pinterest',
            dimensions: '1000 × 1500 px',
            width: 1000,
            height: 1500,
            description: 'Épingle Pinterest format 2:3',
            margins: { top: 75, right: 50, bottom: 75, left: 50 },
            safeZone: { top: 150, right: 100, bottom: 150, left: 100 },
            category: 'social'
        },
        {
            id: 'pinterest-story',
            name: 'Story Pinterest',
            dimensions: '1080 × 1920 px',
            width: 1080,
            height: 1920,
            description: 'Story pour épingle Pinterest',
            margins: { top: 96, right: 54, bottom: 96, left: 54 },
            safeZone: { top: 192, right: 108, bottom: 192, left: 108 },
            category: 'social'
        },

        // SNAPCHAT
        {
            id: 'snapchat-profile',
            name: 'Image de Tête Snapchat',
            dimensions: '375 × 569 px',
            width: 375,
            height: 569,
            description: 'Image de tête Snapchat',
            margins: { top: 28, right: 19, bottom: 28, left: 19 },
            safeZone: { top: 57, right: 38, bottom: 57, left: 38 },
            category: 'social'
        },
        {
            id: 'snapchat-geofilter',
            name: 'Geofilter Snapchat',
            dimensions: '1080 × 1920 px',
            width: 1080,
            height: 1920,
            description: 'Geofilter Snapchat (fond transparent)',
            margins: { top: 96, right: 54, bottom: 96, left: 54 },
            safeZone: { top: 192, right: 108, bottom: 192, left: 108 },
            category: 'social'
        },
        {
            id: 'snapchat-ad',
            name: 'Publicité Snapchat',
            dimensions: '1080 × 1920 px',
            width: 1080,
            height: 1920,
            description: 'Snapchat Ads format 9:16',
            margins: { top: 96, right: 54, bottom: 96, left: 54 },
            safeZone: { top: 192, right: 108, bottom: 192, left: 108 },
            category: 'social'
        }
    ],
    print: [
        // FORMATS A (ISO 216)
        {
            id: 'poster-a0',
            name: 'Affiche A0',
            dimensions: '841 × 1189 mm',
            width: 9933, // 841mm à 300 DPI
            height: 14043, // 1189mm à 300 DPI
            description: 'Format A0 pour très grandes affiches (841 × 1189 mm)',
            margins: { top: 472, right: 472, bottom: 472, left: 472 }, // 40mm à 300 DPI
            bleed: { top: 118, right: 118, bottom: 118, left: 118 }, // 10mm à 300 DPI
            category: 'print'
        },
        {
            id: 'poster-a1',
            name: 'Affiche A1',
            dimensions: '594 × 841 mm',
            width: 7016, // 594mm à 300 DPI
            height: 9933, // 841mm à 300 DPI
            description: 'Format A1 pour grandes affiches (594 × 841 mm)',
            margins: { top: 354, right: 354, bottom: 354, left: 354 }, // 30mm à 300 DPI
            bleed: { top: 118, right: 118, bottom: 118, left: 118 }, // 10mm à 300 DPI
            category: 'print'
        },
        {
            id: 'poster-a2',
            name: 'Affiche A2',
            dimensions: '420 × 594 mm',
            width: 4961, // 420mm à 300 DPI
            height: 7016, // 594mm à 300 DPI
            description: 'Format A2 standard pour affiches (420 × 594 mm)',
            margins: { top: 354, right: 354, bottom: 354, left: 354 }, // 30mm à 300 DPI
            bleed: { top: 118, right: 118, bottom: 118, left: 118 }, // 10mm à 300 DPI
            category: 'print'
        },
        {
            id: 'poster-a3',
            name: 'Affiche A3',
            dimensions: '297 × 420 mm',
            width: 3508, // 297mm à 300 DPI
            height: 4961, // 420mm à 300 DPI
            description: 'Format A3 standard pour affiches (297 × 420 mm)',
            margins: { top: 236, right: 236, bottom: 236, left: 236 }, // 20mm à 300 DPI
            bleed: { top: 118, right: 118, bottom: 118, left: 118 },
            category: 'print'
        },
        {
            id: 'flyer-a4',
            name: 'Flyer A4',
            dimensions: '210 × 297 mm',
            width: 2480, // 210mm à 300 DPI
            height: 3508, // 297mm à 300 DPI
            description: 'Format A4 pour flyers et documents (210 × 297 mm)',
            margins: { top: 236, right: 236, bottom: 236, left: 236 }, // 20mm à 300 DPI
            bleed: { top: 118, right: 118, bottom: 118, left: 118 },
            category: 'print'
        },
        {
            id: 'flyer-a5',
            name: 'Flyer A5',
            dimensions: '148 × 210 mm',
            width: 1748, // 148mm à 300 DPI
            height: 2480, // 210mm à 300 DPI
            description: 'Format A5 pour petits flyers (148 × 210 mm)',
            margins: { top: 177, right: 177, bottom: 177, left: 177 }, // 15mm à 300 DPI
            bleed: { top: 118, right: 118, bottom: 118, left: 118 },
            category: 'print'
        },
        {
            id: 'flyer-a6',
            name: 'Flyer A6',
            dimensions: '105 × 148 mm',
            width: 1240, // 105mm à 300 DPI
            height: 1748, // 148mm à 300 DPI
            description: 'Format A6 pour cartes postales (105 × 148 mm)',
            margins: { top: 118, right: 118, bottom: 118, left: 118 }, // 10mm à 300 DPI
            bleed: { top: 59, right: 59, bottom: 59, left: 59 }, // 5mm à 300 DPI
            category: 'print'
        },

        // CARTES DE VISITE
        {
            id: 'business-card-eu',
            name: 'Carte de Visite (Europe)',
            dimensions: '85 × 55 mm',
            width: 1004, // 85mm à 300 DPI
            height: 650, // 55mm à 300 DPI
            description: 'Format standard européen pour cartes de visite',
            margins: { top: 59, right: 59, bottom: 59, left: 59 }, // 5mm à 300 DPI
            bleed: { top: 35, right: 35, bottom: 35, left: 35 }, // 3mm à 300 DPI
            category: 'print'
        },
        {
            id: 'business-card-us',
            name: 'Carte de Visite (USA)',
            dimensions: '89 × 51 mm',
            width: 1051, // 89mm à 300 DPI
            height: 602, // 51mm à 300 DPI
            description: 'Format standard américain pour cartes de visite',
            margins: { top: 59, right: 59, bottom: 59, left: 59 }, // 5mm à 300 DPI
            bleed: { top: 35, right: 35, bottom: 35, left: 35 }, // 3mm à 300 DPI
            category: 'print'
        },

        // BROCHURES
        {
            id: 'brochure-tri-a4',
            name: 'Brochure Tri-fold A4',
            dimensions: '297 × 210 mm (déplié)',
            width: 3508,
            height: 2480,
            description: 'Brochure à trois volets format A4 déplié',
            margins: { top: 177, right: 177, bottom: 177, left: 177 }, // 15mm à 300 DPI
            bleed: { top: 118, right: 118, bottom: 118, left: 118 },
            category: 'print'
        },
        {
            id: 'brochure-bi-a4',
            name: 'Brochure Bi-fold A4',
            dimensions: '420 × 297 mm (déplié)',
            width: 4961,
            height: 3508,
            description: 'Brochure à deux volets format A4 déplié',
            margins: { top: 177, right: 177, bottom: 177, left: 177 }, // 15mm à 300 DPI
            bleed: { top: 118, right: 118, bottom: 118, left: 118 },
            category: 'print'
        },

        // FORMATS LIVRE/MAGAZINE
        {
            id: 'magazine-a4',
            name: 'Magazine A4',
            dimensions: '210 × 297 mm',
            width: 2480,
            height: 3508,
            description: 'Format magazine A4 standard',
            margins: { top: 354, right: 236, bottom: 354, left: 236 }, // 30mm haut/bas, 20mm côtés
            bleed: { top: 118, right: 118, bottom: 118, left: 118 },
            category: 'print'
        },
        {
            id: 'livre-poche',
            name: 'Livre de Poche',
            dimensions: '110 × 178 mm',
            width: 1299, // 110mm à 300 DPI
            height: 2102, // 178mm à 300 DPI
            description: 'Format livre de poche standard',
            margins: { top: 177, right: 118, bottom: 177, left: 177 }, // 15mm haut/bas, 10mm ext, 15mm int
            bleed: { top: 59, right: 59, bottom: 59, left: 59 }, // 5mm à 300 DPI
            category: 'print'
        },

        // FORMATS PUBLICITAIRES
        {
            id: 'kakemono-85x200',
            name: 'Kakémono 85×200',
            dimensions: '850 × 2000 mm',
            width: 10039, // 850mm à 300 DPI
            height: 23622, // 2000mm à 300 DPI
            description: 'Kakémono publicitaire 85×200 cm',
            margins: { top: 590, right: 354, bottom: 590, left: 354 }, // 50mm haut/bas, 30mm côtés
            bleed: { top: 118, right: 118, bottom: 118, left: 118 },
            category: 'print'
        },
        {
            id: 'roll-up-85x200',
            name: 'Roll-up 85×200',
            dimensions: '850 × 2000 mm',
            width: 10039,
            height: 23622,
            description: 'Roll-up publicitaire 85×200 cm',
            margins: { top: 1181, right: 354, bottom: 354, left: 354 }, // 100mm haut (mécanisme), 30mm autres
            bleed: { top: 118, right: 118, bottom: 118, left: 118 },
            category: 'print'
        },

        // FORMATS ENVELOPPES
        {
            id: 'envelope-dl',
            name: 'Enveloppe DL',
            dimensions: '220 × 110 mm',
            width: 2598, // 220mm à 300 DPI
            height: 1299, // 110mm à 300 DPI
            description: 'Enveloppe DL standard (220 × 110 mm)',
            margins: { top: 118, right: 118, bottom: 118, left: 118 }, // 10mm à 300 DPI
            bleed: { top: 59, right: 59, bottom: 59, left: 59 }, // 5mm à 300 DPI
            category: 'print'
        },
        {
            id: 'envelope-c4',
            name: 'Enveloppe C4',
            dimensions: '324 × 229 mm',
            width: 3827, // 324mm à 300 DPI
            height: 2705, // 229mm à 300 DPI
            description: 'Enveloppe C4 pour documents A4 (324 × 229 mm)',
            margins: { top: 118, right: 118, bottom: 118, left: 118 }, // 10mm à 300 DPI
            bleed: { top: 59, right: 59, bottom: 59, left: 59 }, // 5mm à 300 DPI
            category: 'print'
        }
    ],
    web: [
        // BANNIÈRES PUBLICITAIRES STANDARDS
        {
            id: 'web-banner-leaderboard',
            name: 'Bannière Leaderboard',
            dimensions: '728 × 90 px',
            width: 728,
            height: 90,
            description: 'Bannière publicitaire standard (728×90)',
            margins: { top: 9, right: 36, bottom: 9, left: 36 },
            safeZone: { top: 5, right: 5, bottom: 5, left: 5 },
            category: 'web'
        },
        {
            id: 'web-banner-large-leaderboard',
            name: 'Grande Bannière Leaderboard',
            dimensions: '970 × 90 px',
            width: 970,
            height: 90,
            description: 'Grande bannière publicitaire (970×90)',
            margins: { top: 9, right: 49, bottom: 9, left: 49 },
            safeZone: { top: 5, right: 5, bottom: 5, left: 5 },
            category: 'web'
        },
        {
            id: 'web-banner-rectangle',
            name: 'Rectangle Moyen',
            dimensions: '300 × 250 px',
            width: 300,
            height: 250,
            description: 'Format rectangle moyen (300×250)',
            margins: { top: 25, right: 15, bottom: 25, left: 15 },
            safeZone: { top: 10, right: 10, bottom: 10, left: 10 },
            category: 'web'
        },
        {
            id: 'web-banner-large-rectangle',
            name: 'Grand Rectangle',
            dimensions: '336 × 280 px',
            width: 336,
            height: 280,
            description: 'Grand rectangle publicitaire (336×280)',
            margins: { top: 28, right: 17, bottom: 28, left: 17 },
            safeZone: { top: 10, right: 10, bottom: 10, left: 10 },
            category: 'web'
        },
        {
            id: 'web-banner-skyscraper',
            name: 'Gratte-ciel',
            dimensions: '160 × 600 px',
            width: 160,
            height: 600,
            description: 'Bannière verticale gratte-ciel (160×600)',
            margins: { top: 30, right: 8, bottom: 30, left: 8 },
            safeZone: { top: 15, right: 5, bottom: 15, left: 5 },
            category: 'web'
        },
        {
            id: 'web-banner-wide-skyscraper',
            name: 'Gratte-ciel Large',
            dimensions: '300 × 600 px',
            width: 300,
            height: 600,
            description: 'Bannière verticale large (300×600)',
            margins: { top: 30, right: 15, bottom: 30, left: 15 },
            safeZone: { top: 15, right: 10, bottom: 15, left: 10 },
            category: 'web'
        },

        // FORMATS HERO/HEADER
        {
            id: 'web-hero-desktop-fhd',
            name: 'Hero Desktop Full HD',
            dimensions: '1920 × 1080 px',
            width: 1920,
            height: 1080,
            description: 'Hero banner desktop Full HD (16:9)',
            margins: { top: 108, right: 192, bottom: 108, left: 192 },
            safeZone: { top: 54, right: 96, bottom: 54, left: 96 },
            category: 'web'
        },
        {
            id: 'web-hero-desktop-wide',
            name: 'Hero Desktop Ultra-large',
            dimensions: '1920 × 800 px',
            width: 1920,
            height: 800,
            description: 'Hero banner desktop format large',
            margins: { top: 80, right: 192, bottom: 80, left: 192 },
            safeZone: { top: 40, right: 96, bottom: 40, left: 96 },
            category: 'web'
        },
        {
            id: 'web-hero-tablet',
            name: 'Hero Tablette',
            dimensions: '1024 × 768 px',
            width: 1024,
            height: 768,
            description: 'Hero banner pour tablettes (4:3)',
            margins: { top: 77, right: 51, bottom: 77, left: 51 },
            safeZone: { top: 38, right: 26, bottom: 38, left: 26 },
            category: 'web'
        },
        {
            id: 'web-hero-mobile',
            name: 'Hero Mobile',
            dimensions: '375 × 667 px',
            width: 375,
            height: 667,
            description: 'Hero banner mobile iPhone (16:9)',
            margins: { top: 67, right: 19, bottom: 67, left: 19 },
            safeZone: { top: 33, right: 15, bottom: 33, left: 15 },
            category: 'web'
        },
        {
            id: 'web-hero-mobile-android',
            name: 'Hero Mobile Android',
            dimensions: '360 × 640 px',
            width: 360,
            height: 640,
            description: 'Hero banner mobile Android standard',
            margins: { top: 64, right: 18, bottom: 64, left: 18 },
            safeZone: { top: 32, right: 15, bottom: 32, left: 15 },
            category: 'web'
        },

        // FORMATS E-COMMERCE
        {
            id: 'web-product-square',
            name: 'Image Produit Carrée',
            dimensions: '800 × 800 px',
            width: 800,
            height: 800,
            description: 'Image produit e-commerce format carré',
            margins: { top: 40, right: 40, bottom: 40, left: 40 },
            safeZone: { top: 80, right: 80, bottom: 80, left: 80 },
            category: 'web'
        },
        {
            id: 'web-product-landscape',
            name: 'Image Produit Paysage',
            dimensions: '1200 × 800 px',
            width: 1200,
            height: 800,
            description: 'Image produit e-commerce format paysage (3:2)',
            margins: { top: 40, right: 60, bottom: 40, left: 60 },
            safeZone: { top: 80, right: 120, bottom: 80, left: 120 },
            category: 'web'
        },

        // FORMATS BLOG/ARTICLE
        {
            id: 'web-blog-featured',
            name: 'Image Article Blog',
            dimensions: '1200 × 630 px',
            width: 1200,
            height: 630,
            description: 'Image mise en avant pour articles de blog',
            margins: { top: 32, right: 60, bottom: 32, left: 60 },
            safeZone: { top: 63, right: 120, bottom: 63, left: 120 },
            category: 'web'
        },
        {
            id: 'web-blog-thumbnail',
            name: 'Miniature Article',
            dimensions: '400 × 300 px',
            width: 400,
            height: 300,
            description: 'Miniature pour liste d\'articles (4:3)',
            margins: { top: 15, right: 20, bottom: 15, left: 20 },
            safeZone: { top: 30, right: 40, bottom: 30, left: 40 },
            category: 'web'
        }
    ],
    video: [
        // FORMATS HORIZONTAUX (16:9)
        {
            id: 'video-hd-720p',
            name: 'Vidéo HD 720p',
            dimensions: '1280 × 720 px',
            width: 1280,
            height: 720,
            description: 'Format HD 720p pour YouTube, streaming (16:9)',
            margins: { top: 72, right: 128, bottom: 72, left: 128 },
            safeZone: { top: 108, right: 192, bottom: 108, left: 192 },
            category: 'video'
        },
        {
            id: 'video-fhd-1080p',
            name: 'Vidéo Full HD 1080p',
            dimensions: '1920 × 1080 px',
            width: 1920,
            height: 1080,
            description: 'Format Full HD 1080p standard (16:9)',
            margins: { top: 108, right: 192, bottom: 108, left: 192 },
            safeZone: { top: 162, right: 288, bottom: 162, left: 288 },
            category: 'video'
        },
        {
            id: 'video-4k-uhd',
            name: 'Vidéo 4K Ultra HD',
            dimensions: '3840 × 2160 px',
            width: 3840,
            height: 2160,
            description: 'Format 4K Ultra HD pour vidéos haute qualité (16:9)',
            margins: { top: 216, right: 384, bottom: 216, left: 384 },
            safeZone: { top: 324, right: 576, bottom: 324, left: 576 },
            category: 'video'
        },
        {
            id: 'video-8k-uhd',
            name: 'Vidéo 8K Ultra HD',
            dimensions: '7680 × 4320 px',
            width: 7680,
            height: 4320,
            description: 'Format 8K Ultra HD pour vidéos très haute qualité (16:9)',
            margins: { top: 432, right: 768, bottom: 432, left: 768 },
            safeZone: { top: 648, right: 1152, bottom: 648, left: 1152 },
            category: 'video'
        },

        // FORMATS VERTICAUX (9:16)
        {
            id: 'video-vertical-hd',
            name: 'Vidéo Verticale HD',
            dimensions: '720 × 1280 px',
            width: 720,
            height: 1280,
            description: 'Format vertical HD pour stories, shorts (9:16)',
            margins: { top: 128, right: 72, bottom: 128, left: 72 },
            safeZone: { top: 192, right: 108, bottom: 192, left: 108 },
            category: 'video'
        },
        {
            id: 'video-vertical-fhd',
            name: 'Vidéo Verticale Full HD',
            dimensions: '1080 × 1920 px',
            width: 1080,
            height: 1920,
            description: 'Format vertical Full HD pour TikTok, Instagram Reels (9:16)',
            margins: { top: 192, right: 108, bottom: 192, left: 108 },
            safeZone: { top: 288, right: 162, bottom: 288, left: 162 },
            category: 'video'
        },
        {
            id: 'video-vertical-4k',
            name: 'Vidéo Verticale 4K',
            dimensions: '2160 × 3840 px',
            width: 2160,
            height: 3840,
            description: 'Format vertical 4K pour contenu premium (9:16)',
            margins: { top: 384, right: 216, bottom: 384, left: 216 },
            safeZone: { top: 576, right: 324, bottom: 576, left: 324 },
            category: 'video'
        },

        // FORMATS CARRÉS (1:1)
        {
            id: 'video-square-hd',
            name: 'Vidéo Carrée HD',
            dimensions: '720 × 720 px',
            width: 720,
            height: 720,
            description: 'Format carré HD pour posts vidéo (1:1)',
            margins: { top: 72, right: 72, bottom: 72, left: 72 },
            safeZone: { top: 108, right: 108, bottom: 108, left: 108 },
            category: 'video'
        },
        {
            id: 'video-square-fhd',
            name: 'Vidéo Carrée Full HD',
            dimensions: '1080 × 1080 px',
            width: 1080,
            height: 1080,
            description: 'Format carré Full HD pour Instagram, Facebook (1:1)',
            margins: { top: 108, right: 108, bottom: 108, left: 108 },
            safeZone: { top: 162, right: 162, bottom: 162, left: 162 },
            category: 'video'
        },

        // FORMATS CINÉMA
        {
            id: 'video-cinema-2k',
            name: 'Vidéo Cinéma 2K',
            dimensions: '2048 × 1080 px',
            width: 2048,
            height: 1080,
            description: 'Format cinéma 2K DCI (17:9)',
            margins: { top: 108, right: 205, bottom: 108, left: 205 },
            safeZone: { top: 162, right: 307, bottom: 162, left: 307 },
            category: 'video'
        },
        {
            id: 'video-cinema-4k',
            name: 'Vidéo Cinéma 4K',
            dimensions: '4096 × 2160 px',
            width: 4096,
            height: 2160,
            description: 'Format cinéma 4K DCI (17:9)',
            margins: { top: 216, right: 410, bottom: 216, left: 410 },
            safeZone: { top: 324, right: 614, bottom: 324, left: 614 },
            category: 'video'
        },

        // FORMATS SPÉCIAUX
        {
            id: 'video-ultrawide',
            name: 'Vidéo Ultra-large',
            dimensions: '2560 × 1080 px',
            width: 2560,
            height: 1080,
            description: 'Format ultra-large 21:9 pour écrans larges',
            margins: { top: 108, right: 256, bottom: 108, left: 256 },
            safeZone: { top: 162, right: 384, bottom: 162, left: 384 },
            category: 'video'
        },
        {
            id: 'video-podcast',
            name: 'Vidéo Podcast',
            dimensions: '1920 × 1080 px',
            width: 1920,
            height: 1080,
            description: 'Format optimisé pour podcasts vidéo (16:9)',
            margins: { top: 108, right: 192, bottom: 108, left: 192 },
            safeZone: { top: 216, right: 384, bottom: 216, left: 384 },
            category: 'video'
        },

        // FORMATS LIVE STREAMING
        {
            id: 'video-stream-720p',
            name: 'Stream 720p',
            dimensions: '1280 × 720 px',
            width: 1280,
            height: 720,
            description: 'Format streaming 720p pour Twitch, YouTube Live',
            margins: { top: 72, right: 128, bottom: 72, left: 128 },
            safeZone: { top: 144, right: 256, bottom: 144, left: 256 },
            category: 'video'
        },
        {
            id: 'video-stream-1080p',
            name: 'Stream 1080p',
            dimensions: '1920 × 1080 px',
            width: 1920,
            height: 1080,
            description: 'Format streaming 1080p pour plateformes live',
            margins: { top: 108, right: 192, bottom: 108, left: 192 },
            safeZone: { top: 216, right: 384, bottom: 216, left: 384 },
            category: 'video'
        }
    ],
    platforms: [
        // DISCORD
        {
            id: 'discord-server-icon',
            name: 'Icône Serveur Discord',
            dimensions: '512 × 512 px',
            width: 512,
            height: 512,
            description: 'Icône pour serveur Discord (format carré)',
            margins: { top: 26, right: 26, bottom: 26, left: 26 },
            safeZone: { top: 51, right: 51, bottom: 51, left: 51 },
            category: 'platforms'
        },
        {
            id: 'discord-banner',
            name: 'Bannière Discord',
            dimensions: '960 × 540 px',
            width: 960,
            height: 540,
            description: 'Bannière de serveur Discord (16:9)',
            margins: { top: 54, right: 96, bottom: 54, left: 96 },
            safeZone: { top: 81, right: 144, bottom: 81, left: 144 },
            category: 'platforms'
        },

        // TWITCH
        {
            id: 'twitch-profile',
            name: 'Photo de Profil Twitch',
            dimensions: '256 × 256 px',
            width: 256,
            height: 256,
            description: 'Photo de profil Twitch (format carré)',
            margins: { top: 13, right: 13, bottom: 13, left: 13 },
            safeZone: { top: 26, right: 26, bottom: 26, left: 26 },
            category: 'platforms'
        },
        {
            id: 'twitch-banner',
            name: 'Bannière Twitch',
            dimensions: '1920 × 480 px',
            width: 1920,
            height: 480,
            description: 'Bannière de chaîne Twitch',
            margins: { top: 48, right: 192, bottom: 48, left: 192 },
            safeZone: { top: 72, right: 288, bottom: 72, left: 288 },
            category: 'platforms'
        },
        {
            id: 'twitch-overlay',
            name: 'Overlay Twitch',
            dimensions: '1920 × 1080 px',
            width: 1920,
            height: 1080,
            description: 'Overlay pour stream Twitch (Full HD)',
            margins: { top: 108, right: 192, bottom: 108, left: 192 },
            safeZone: { top: 216, right: 384, bottom: 216, left: 384 },
            category: 'platforms'
        },

        // STEAM
        {
            id: 'steam-capsule',
            name: 'Capsule Steam',
            dimensions: '460 × 215 px',
            width: 460,
            height: 215,
            description: 'Image capsule pour jeu Steam',
            margins: { top: 22, right: 46, bottom: 22, left: 46 },
            safeZone: { top: 32, right: 69, bottom: 32, left: 69 },
            category: 'platforms'
        },
        {
            id: 'steam-header',
            name: 'En-tête Steam',
            dimensions: '460 × 215 px',
            width: 460,
            height: 215,
            description: 'Image d\'en-tête pour page Steam',
            margins: { top: 22, right: 46, bottom: 22, left: 46 },
            safeZone: { top: 32, right: 69, bottom: 32, left: 69 },
            category: 'platforms'
        },

        // REDDIT
        {
            id: 'reddit-banner',
            name: 'Bannière Reddit',
            dimensions: '1920 × 384 px',
            width: 1920,
            height: 384,
            description: 'Bannière pour subreddit',
            margins: { top: 38, right: 192, bottom: 38, left: 192 },
            safeZone: { top: 58, right: 288, bottom: 58, left: 288 },
            category: 'platforms'
        },
        {
            id: 'reddit-icon',
            name: 'Icône Reddit',
            dimensions: '256 × 256 px',
            width: 256,
            height: 256,
            description: 'Icône pour subreddit (format carré)',
            margins: { top: 13, right: 13, bottom: 13, left: 13 },
            safeZone: { top: 26, right: 26, bottom: 26, left: 26 },
            category: 'platforms'
        },

        // SPOTIFY
        {
            id: 'spotify-playlist',
            name: 'Couverture Playlist Spotify',
            dimensions: '300 × 300 px',
            width: 300,
            height: 300,
            description: 'Couverture pour playlist Spotify',
            margins: { top: 15, right: 15, bottom: 15, left: 15 },
            safeZone: { top: 30, right: 30, bottom: 30, left: 30 },
            category: 'platforms'
        },
        {
            id: 'spotify-podcast',
            name: 'Couverture Podcast Spotify',
            dimensions: '640 × 640 px',
            width: 640,
            height: 640,
            description: 'Couverture pour podcast Spotify',
            margins: { top: 32, right: 32, bottom: 32, left: 32 },
            safeZone: { top: 64, right: 64, bottom: 64, left: 64 },
            category: 'platforms'
        },

        // WHATSAPP BUSINESS
        {
            id: 'whatsapp-status',
            name: 'Statut WhatsApp',
            dimensions: '1080 × 1920 px',
            width: 1080,
            height: 1920,
            description: 'Image pour statut WhatsApp (9:16)',
            margins: { top: 192, right: 108, bottom: 192, left: 108 },
            safeZone: { top: 288, right: 162, bottom: 288, left: 162 },
            category: 'platforms'
        },

        // TELEGRAM
        {
            id: 'telegram-channel',
            name: 'Photo Chaîne Telegram',
            dimensions: '512 × 512 px',
            width: 512,
            height: 512,
            description: 'Photo pour chaîne Telegram',
            margins: { top: 26, right: 26, bottom: 26, left: 26 },
            safeZone: { top: 51, right: 51, bottom: 51, left: 51 },
            category: 'platforms'
        },

        // CLUBHOUSE
        {
            id: 'clubhouse-profile',
            name: 'Photo Profil Clubhouse',
            dimensions: '400 × 400 px',
            width: 400,
            height: 400,
            description: 'Photo de profil Clubhouse',
            margins: { top: 20, right: 20, bottom: 20, left: 20 },
            safeZone: { top: 60, right: 60, bottom: 60, left: 60 },
            category: 'platforms'
        }
    ]
};

// Fonction pour obtenir tous les templates d'une catégorie
function getTemplatesByCategory(category) {
    return TEMPLATES_DATA[category] || [];
}

// Fonction pour obtenir un template par son ID
function getTemplateById(id) {
    // Chercher d'abord dans les templates personnalisés (définis dans script.js)
    if (typeof customTemplates !== 'undefined') {
        const customTemplate = customTemplates.find(t => t.id === id);
        if (customTemplate) {
            return customTemplate;
        }
    }
    
    // Puis dans les templates standards
    for (const category in TEMPLATES_DATA) {
        const templates = TEMPLATES_DATA[category];
        const template = templates.find(t => t.id === id);
        if (template) {
            return template;
        }
    }
    return null;
}

// Fonction pour convertir les pixels en millimètres (à 300 DPI)
function pxToMm(px, dpi = 300) {
    return Math.round((px * 25.4) / dpi * 100) / 100;
}

// Fonction pour convertir les millimètres en pixels (à 300 DPI)
function mmToPx(mm, dpi = 300) {
    return Math.round((mm * dpi) / 25.4);
}
