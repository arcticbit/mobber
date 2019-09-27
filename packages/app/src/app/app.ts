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

    createWindow() {
        const options = {
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
        };

        this.window = new BrowserWindow(options);
        this.window.loadURL('http://localhost:3000')
        this.window.show();
        this.window.on('blur', () => this.window.hide());
    }

    public toggleInterface() {
        if (this.window.isVisible()) {
            this.window.hide();
            return;
        }
        this.recalculatePosition();
        this.window.show();
        this.window.focus();
    }

    private recalculatePosition() {
        const { x, y, width } = this.tray.getBounds();
        const newX = Math.round(x - (width / 2));
        this.window.setPosition(newX, y);
    }
}