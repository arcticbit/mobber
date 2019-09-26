import { app, BrowserWindow, App } from 'electron'
import { MobberTray } from '../tray/tray.component';

export class MobberApp {
    app: App;
    tray: MobberTray;
    window: BrowserWindow;

    constructor() {
        this.app = app;
    }

    run() {
        this.app.on('ready', () => {
            this.tray = new MobberTray(this);
            this.createWindow();
            console.log('ready sir!');
        })
    }

    private createTray() {
        
    }

    createWindow() {
        this.window = new BrowserWindow({
            width: 300,
            height: 300,
            show: true,
            frame: false,
            fullscreenable: false,
            resizable: false,
            transparent: true,
            webPreferences: {
                backgroundThrottling: false
            },
            skipTaskbar: true,
        });
        const trayBounds = this.tray.getBounds();
        this.window.setPosition(Math.round(trayBounds.x - (trayBounds.width / 2)), trayBounds.y);
        this.window.loadURL('http://localhost:3000')
        this.window.show();
        this.window.on('blur', () => {
            this.window.hide();
        })
    }

    toggleInterface() {
        if (this.window.isVisible()) {
            console.log('hiding');
            this.window.hide();
        } else {
            console.log('showing');
            this.window.show();
            this.window.focus();
        }
    }
}