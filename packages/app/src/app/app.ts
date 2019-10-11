import { app, BrowserWindow, App, ipcMain } from "electron";
import { MobberTray } from "../tray/tray.component";
import { Hotkeys } from "../hotkeys/hotkeys.service";
import { State } from "../state/state";
import { tsMethodSignature } from "@babel/types";
import { IPerson } from "../../../model/person.model";

export class MobberApp {
  app: App;
  tray: MobberTray;
  hotkeys: Hotkeys;
  window: BrowserWindow;
  state: State;

  constructor() {
    this.app = app;
  }

  run() {
    this.app.on("ready", () => {
      this.app.dock.hide();
      this.tray = new MobberTray(this);
      this.state = new State(this);
      this.hotkeys = new Hotkeys();
      this.setupHotkeys();
      this.createWindow();
    });
  }

  createWindow() {
    const options = {
      width: 400,
      height: 300,
      show: true,
      frame: false,
      fullscreenable: false,
      resizable: false,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false
      },
      skipTaskbar: true
    };

    this.window = new BrowserWindow(options);
    this.window.loadURL("http://localhost:3000");
    this.recalculatePosition();
    this.window.show();
    this.window.on("blur", () => this.window.hide());
    this.window.on("ready-to-show", () => {
      console.log("ready to show: sending state update from app");
      ipcMain.emit("state-update", { hello: "world from the app" });
    });
    console.log("sending state update from app");
    ipcMain.on("ready", () => {
      console.log("renderer: ready");
      this.window.webContents.send("state-update", this.state.get());
    });
    ipcMain.on("new-participant", (_event, person: IPerson) => {
      this.state.addPerson(person);
      this.pushState();
    });
    ipcMain.on("toggle-participant", (_event, person: IPerson) => {
      this.state.toggle(person);
      this.pushState();
    });
    ipcMain.on("remove-participant", (_event, person: IPerson) => {
      this.state.removePerson(person);
      this.pushState();
    });
    ipcMain.on("new-driver", (_event, driverName: string) => {
      console.log("renderer: new-driver ", driverName);
      this.state.setDriverByName(driverName);
      this.tray.setTitle(driverName);
      this.pushState();
    });
  }

  private pushState() {
    this.window.webContents.send("state-update", this.state.get());
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
        key: "F2",
        action: () => {
          this.state.previous();
          this.tray.setTitle(this.state.get().persons[0].name);
          this.pushState();
        }
      },
      {
        key: "F3",
        action: () => {
          console.log("pause");
        }
      },
      {
        key: "F4",
        action: () => {
          this.state.next();
          this.tray.setTitle(this.state.get().persons[0].name);
          this.pushState();
        }
      },
      {
        key: "F5",
        action: () => {
          console.log("toggle");
          this.toggleInterface();
        }
      }
    ]);
  }

  private recalculatePosition() {
    const { x, y, width } = this.tray.getBounds();
    const newX = Math.round(x - width / 2);
    this.window.setPosition(newX, y);
  }
}
