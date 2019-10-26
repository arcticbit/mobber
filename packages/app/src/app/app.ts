
import { Events } from '../events/events';
import { options } from './app.options';
import { Keyboard } from '../keyboard/keyboard.service';
import { OverlayTimerWindow } from '../overlay-timer-window/overlay-timer-window';
import { app, BrowserWindow, App } from "electron";
import { MobberTray } from "../tray/tray.component";
import { Hotkeys } from "../hotkeys/hotkeys.service";
import { State } from "../state/state";
import * as path from 'path';

export class MobberApp {
  private app: App;
  private tray: MobberTray;
  private hotkeys: Hotkeys;
  public window: BrowserWindow;
  public keyboard: Keyboard;
  public state: State;
  private events: Events;
  private overlayTimerWindow: OverlayTimerWindow;

  constructor() {
    this.app = app;
  }

  public run = () => {
    this.app.on('ready', () => {
      this.app.setAppUserModelId(process.execPath);
      if (this.app.dock) {
        this.app.dock.hide();
      }
      this.tray = new MobberTray(this);
      this.state = new State(this);
      this.hotkeys = new Hotkeys();
      this.keyboard = new Keyboard();
      this.events = new Events(this);
      this.overlayTimerWindow = new OverlayTimerWindow();
      this.events.listen();
      this.setupHotkeys();
      this.createWindow();
      setInterval(() => {
        this.refresh();
      }, 1000);
    });
  };

  private createWindow = () => {
    this.window = new BrowserWindow(options);
    const uiPath = path.join(__dirname, '../../../ui/build/index.html')
    this.window.loadFile(uiPath);
    this.recalculatePosition();

    this.window.on('blur', () => this.window.hide());
    this.window.once('ready-to-show', this.toggleInterface);
  };

  public toggleInterface = () => {
    if (this.window.isVisible()) {
      this.window.hide();
      return;
    }
    this.recalculatePosition();
    this.window.show();
    this.window.focus();
  };

  private setupHotkeys = () => {
    this.hotkeys.registerHotkeys([
      {
        keys: 'CommandOrControl+Shift+F2',
        action: () => {
          this.state.previous();
        },
      },
      {
        keys: 'CommandOrControl+Shift+F4',
        action: () => {
          this.state.next();
        },
      },
      {
        keys: 'CommandOrControl+Shift+F5',
        action: () => {
          this.toggleInterface();
        },
      },
    ]);
  };

  private updateTrayTitle = () => {
    const title = this.state.getTitle();
    this.tray.setTitle(title);
  };

  private refresh = () => {
    this.state.tick();
    this.updateTrayTitle();
    this.pushState();
  };

  public pushState = () => {
    this.window.webContents.send('state-update', this.state.get());
    this.overlayTimerWindow.updateState({ timer: this.state.getTimerLabel(), title: this.state.getDriverLabel() });
  };

  private recalculatePosition = () => {
    const { x, y } = this.tray.getBounds();
    const windowBounds = this.window.getBounds();
    const newX = x - windowBounds.width;
    const newY = y - windowBounds.height;
    console.log(`setting window position: ${newX}, ${newY}`);
    this.window.setPosition(newX, newY);
  };
}
