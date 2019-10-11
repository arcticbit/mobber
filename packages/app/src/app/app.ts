import { app, BrowserWindow, App, ipcMain } from "electron";
import { MobberTray } from "../tray/tray.component";
import { Hotkeys } from "../hotkeys/hotkeys.service";
import { State } from "../state/state";
import { Events } from "../events/events";
import { options } from "./app.options";
import { Keyboard } from "../keyboard/keyboard.service";

export class MobberApp {
  app: App;
  tray: MobberTray;
  hotkeys: Hotkeys;
  window: BrowserWindow;
  keyboard: Keyboard;
  state: State;
  events: Events;
  timeLeft = 7 * 60;
  isPaused = false;

  constructor() {
    this.app = app;
  }

  run() {
    this.app.on("ready", () => {
      this.app.dock.hide();
      this.tray = new MobberTray(this);
      this.state = new State(this);
      this.hotkeys = new Hotkeys();
      this.keyboard = new Keyboard();
      this.events = new Events(this);
      this.events.listen();
      this.setupHotkeys();
      this.createWindow();
      this.state.startNewDriverSession();
      setInterval(() => {
        this.refreshTitle();
      }, 1000);
    });
  }

  createWindow() {
    this.window = new BrowserWindow(options);
    this.window.loadURL("http://localhost:3000");

    this.recalculatePosition();

    this.window.show();
    this.window.on("blur", () => this.window.hide());
    this.window.on("ready-to-show", this.handleReadyToShow());
  }

  private handleReadyToShow(): Function {
    return () => {
      console.log("ready to show: sending state update from app");
      ipcMain.emit("state-update", { hello: "world from the app" });
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
        keys: "CommandOrControl+Shift+F2",
        action: () => {
          this.state.previous();
          this.tray.setTitle(this.state.get().persons[0].name);
        }
      },
      {
        keys: "CommandOrControl+Shift+F3",
        action: () => {
          this.isPaused = !this.isPaused;
        }
      },
      {
        keys: "CommandOrControl+Shift+F4",
        action: () => {
          this.state.next();
        }
      },
      {
        keys: "CommandOrControl+Shift+F5",
        action: () => {
          this.toggleInterface();
        }
      }
    ]);
  }

  private refreshTitle() {
    if (this.isPaused) {
      return;
    }

    this.timeLeft--;

    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = Math.floor(this.timeLeft - minutes * 60);

    console.log(this.timeLeft, minutes, seconds);

    const driverName = this.state.get().persons[0].name;
    const title = `[${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}] ${driverName}`;
    if (this.timeLeft <= 0) {
      this.state.next();
      this.timeLeft = 10;
    }
    this.tray.setTitle(title);
  }

  public pushState() {
    this.window.webContents.send("state-update", this.state.get());
  }

  private recalculatePosition() {
    const { x, y, width } = this.tray.getBounds();
    const newX = Math.round(x - width / 2);
    this.window.setPosition(newX, y);
  }
}
