import { BrowserWindow, ipcMain, screen } from 'electron';
import * as path from 'path';

export class OverlayTimerWindow {
  private window: Electron.BrowserWindow;
  constructor() {
    this.createWindow();
    ipcMain.on('update-window-size', (_, size: { width: number; height: number }) => this.handleResize(size));
  }

  private handleResize = (size: { width: number; height: number }) => {
    const { width, height } = size;
    if (this.window.isDestroyed()) {
      return;
    }
    this.window.setSize(width, height);
  };

  private toggleOverlay = () => {
    this.recalculateOverlayPosition();
    this.window.show();
  };

  private recalculateOverlayPosition = () => {
    const { width } = screen.getPrimaryDisplay().workAreaSize;
    const windowBounds = this.window.getBounds();
    const newX = width - windowBounds.x;
    const newY = 0;
    console.log(`setting overlay window position: ${newX}, ${newY}`);
    this.window.setPosition(newX, newY);
  };

  private createWindow = () => {
    this.window = new BrowserWindow({
      alwaysOnTop: true,
      frame: false,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
      },
      show: false,
      resizable: true,
    });
    console.log(path.join(__dirname, '..', 'tray', 'tray.icon.png'));
    // this.window.setIgnoreMouseEvents(true);
    this.window.loadURL(`file://${__dirname}/../../../ui/public/overlayTimer.html`);
    this.window.once('ready-to-show', this.toggleOverlay);
  };

  public updateState = (state: { timer: string; title: string }) => {
    if (this.window.isDestroyed()) {
      this.createWindow();
    }
    this.window.webContents.send('state-update', state);
  };
}
