const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');

// Auto-updater optionnel (seulement si le module est disponible)
let autoUpdater = null;
try {
    autoUpdater = require('electron-updater').autoUpdater;
    autoUpdater.checkForUpdatesAndNotify();
} catch (error) {
    console.log('Auto-updater non disponible:', error.message);
}

let mainWindow;

function createWindow() {
    // Créer la fenêtre principale
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: true
        },
        icon: path.join(__dirname, 'assets/icon.png'),
        titleBarStyle: 'default',
        show: false
    });

    // Charger l'application
    mainWindow.loadFile('index.html');

    // Afficher la fenêtre quand elle est prête
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Vérifier les mises à jour au démarrage
        if (autoUpdater && (!process.env.NODE_ENV || process.env.NODE_ENV === 'production')) {
            autoUpdater.checkForUpdatesAndNotify();
        }
    });

    // Gérer la fermeture de la fenêtre
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Ouvrir les liens externes dans le navigateur
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

// Menu de l'application
function createMenu() {
    const template = [
        {
            label: 'Adobe Template Generator',
            submenu: [
                {
                    label: 'À propos',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'À propos',
                            message: 'Adobe Template Generator v1.0.0',
                            detail: 'Générateur de templates Adobe avec 100+ formats\nCréé par David Meyer\n\n• Réseaux sociaux (30+ formats)\n• Plateformes spécialisées (15+ formats)\n• Impression (20+ formats)\n• Web (15+ formats)\n• Vidéo (20+ formats)'
                        });
                    }
                },
                {
                    label: 'Vérifier les mises à jour',
                    click: () => {
                        if (autoUpdater) {
                            autoUpdater.checkForUpdatesAndNotify();
                        } else {
                            dialog.showMessageBox(mainWindow, {
                                type: 'info',
                                title: 'Mises à jour',
                                message: 'Système de mise à jour non disponible',
                                detail: 'Veuillez télécharger la dernière version manuellement.'
                            });
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Quitter',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Édition',
            submenu: [
                { label: 'Annuler', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
                { label: 'Rétablir', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
                { type: 'separator' },
                { label: 'Couper', accelerator: 'CmdOrCtrl+X', role: 'cut' },
                { label: 'Copier', accelerator: 'CmdOrCtrl+C', role: 'copy' },
                { label: 'Coller', accelerator: 'CmdOrCtrl+V', role: 'paste' },
                { label: 'Tout sélectionner', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
            ]
        },
        {
            label: 'Affichage',
            submenu: [
                { label: 'Recharger', accelerator: 'CmdOrCtrl+R', role: 'reload' },
                { label: 'Forcer le rechargement', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
                { label: 'Outils de développement', accelerator: 'F12', role: 'toggleDevTools' },
                { type: 'separator' },
                { label: 'Zoom avant', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
                { label: 'Zoom arrière', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
                { label: 'Zoom par défaut', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
                { type: 'separator' },
                { label: 'Plein écran', accelerator: 'F11', role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Fenêtre',
            submenu: [
                { label: 'Réduire', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
                { label: 'Fermer', accelerator: 'CmdOrCtrl+W', role: 'close' }
            ]
        },
        {
            label: 'Aide',
            submenu: [
                {
                    label: 'Documentation',
                    click: () => {
                        shell.openExternal('https://github.com/davidmeyer/adobe-template-generator#readme');
                    }
                },
                {
                    label: 'Signaler un problème',
                    click: () => {
                        shell.openExternal('https://github.com/davidmeyer/adobe-template-generator/issues');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Événements de l'application
app.whenReady().then(() => {
    createWindow();
    createMenu();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Gestion des mises à jour (seulement si autoUpdater est disponible)
if (autoUpdater) {
    autoUpdater.on('checking-for-update', () => {
        console.log('Vérification des mises à jour...');
    });

    autoUpdater.on('update-available', (info) => {
        console.log('Mise à jour disponible.');
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Mise à jour disponible',
            message: `Une nouvelle version (${info.version}) est disponible.`,
            detail: 'Elle sera téléchargée en arrière-plan et installée au prochain redémarrage.',
            buttons: ['OK']
        });
    });

    autoUpdater.on('update-not-available', (info) => {
        console.log('Aucune mise à jour disponible.');
    });

    autoUpdater.on('error', (err) => {
        console.log('Erreur lors de la mise à jour: ', err);
    });

    autoUpdater.on('download-progress', (progressObj) => {
        let log_message = "Vitesse de téléchargement: " + progressObj.bytesPerSecond;
        log_message = log_message + ' - Téléchargé ' + progressObj.percent + '%';
        log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
        console.log(log_message);
    });

    autoUpdater.on('update-downloaded', (info) => {
        console.log('Mise à jour téléchargée');
        dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Mise à jour prête',
            message: 'La mise à jour a été téléchargée.',
            detail: 'Elle sera installée au redémarrage de l\'application.',
            buttons: ['Redémarrer maintenant', 'Plus tard'],
            defaultId: 0
        }).then((result) => {
            if (result.response === 0) {
                autoUpdater.quitAndInstall();
            }
        });
    });
}
