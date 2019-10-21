import { Tray } from 'electron';
import { MobberApp } from '../app/app';
import * as path from 'path';

export class MobberTray {
  private icon: string = path.join(__dirname, '/tray.icon.png');
  private tray: Tray;

  constructor(private parent: MobberApp) {
    this.tray = new Tray(this.icon);
    this.tray.setTitle('Mobber');
    this.tray.on('click', () => {
      this.parent.toggleInterface();
    });
  }

  setTitle = (text: string) => this.tray.setTitle(text);

  getBounds = () => this.tray.getBounds();
}
