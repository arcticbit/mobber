import { app, BrowserWindow, App } from 'electron';
import { MobberTray } from '../tray/tray.component';
import { Hotkeys } from '../hotkeys/hotkeys.service';
import { State } from '../state/state';
import { Events } from '../events/events';
import { options } from './app.options';
import { Keyboard } from '../keyboard/keyboard.service';

export class MobberApp {
  app: App;
  tray: MobberTray;
  hotkeys: Hotkeys;
  window: BrowserWindow;
  keyboard: Keyboard;
  state: State;
  events: Events;

  constructor() {
    this.app = app;
  }

  run() {
    this.app.on('ready', () => {
      if (this.app.dock) {
        this.app.dock.hide();
      }
      this.tray = new MobberTray(this);
      this.state = new State(this);
      this.hotkeys = new Hotkeys();
      this.keyboard = new Keyboard();
      this.events = new Events(this);
      this.events.listen();
      this.setupHotkeys();
      this.createWindow();
      setInterval(() => {
        this.refresh();
      }, 1000);
    });
  }

  createWindow() {
    this.window = new BrowserWindow(options);
    this.window.loadURL('http://localhost:3000');

    this.recalculatePosition();

    this.window.show();
    this.window.on('blur', () => this.window.hide());
    this.window.on('ready-to-show', this.handleReadyToShow());
  }

  private handleReadyToShow(): () => void {
    return () => {
      console.log('ready to show: sending state update from app');
    };
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

  private setupHotkeys() {
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
  }

  private updateTrayTitle = () => {
    const title = this.state.getTitle();
    this.tray.setTitle(title);
  };

  private refresh = () => {
    this.state.tick();
    this.updateTrayTitle();
    this.pushState();
  };

  public pushState() {
    this.window.webContents.send('state-update', this.state.get());
  }

  private recalculatePosition() {
    const { x, y, width } = this.tray.getBounds();
    const newX = Math.round(x - width / 2);
    const windowBounds = this.window.getBounds();
    this.window.setPosition(newX, y - windowBounds.height);
  }
}
