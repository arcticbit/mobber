import { app, Menu, Tray, App } from 'electron'

export class MobberApp {
    app: App;

    constructor() {
        this.app = app;
        this.app.on('ready', () => {
            console.log('ready sir!');
        })
    }
}