import { Tray } from 'electron';
import { MobberApp } from '../app/app';
import * as path from 'path';

export class MobberTray {

    private tray: Tray;
    private icon: string;

    constructor(private parent: MobberApp) {
        this.icon = path.join(__dirname, '/tray.icon.png');
        this.tray = new Tray(this.icon);
        this.tray.setTitle('Mobber');
        this.tray.on('click', () => {
            this.parent.toggleInterface();
        });
    }

    setTitle = (text: string) =>
        this.tray.setTitle(text);

    getBounds = () =>
        this.tray.getBounds();
}