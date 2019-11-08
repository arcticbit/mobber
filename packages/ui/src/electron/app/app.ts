import { Events } from '../events/events';
import { options } from './app.options';
import { Keyboard } from '../keyboard/keyboard.service';
import { OverlayTimerWindow } from '../overlay-timer-window/overlay-timer-window';
import { app, BrowserWindow } from 'electron';
import { MobberTray } from '../tray/tray.component';
import { Hotkeys } from '../hotkeys/hotkeys.service';
import { State } from '../state/state';
import * as path from 'path';
import isDev from "./isdev";
import {IMobberState} from "../../../../model/mobber-state.model";

export class MobberApp {
  private tray: MobberTray;
  private hotkeys: Hotkeys;
  public window: BrowserWindow;
  public keyboard: Keyboard;
  public state: State;
  private events: Events;
  private overlayTimerWindow: OverlayTimerWindow;

  public run = () => {
    app.on('ready', () => {
      app.setAppUserModelId(process.execPath);
      if (app.dock) {
        app.dock.hide();
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
    this.window.loadURL(
      isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
    );
    if (isDev) {
      // Open the DevTools.
      // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
      this.window.webContents.openDevTools();
    }
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
    this.pushTick();
  };

  private pushTick = () => {
    const { secondsLeft, roundCounter, isBreak } = this.state.get();
    const tickState = {
      secondsLeft,
      roundCounter,
      isBreak,
    };
    this.pushState(tickState);
  };

  public pushState = (state: Partial<IMobberState>) => {
    console.log('pushed state', state);
    this.window.webContents.send('state-update', state);
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
