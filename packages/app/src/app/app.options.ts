import { BrowserWindowConstructorOptions } from "electron";

export const options: BrowserWindowConstructorOptions = {
  width: 400,
  height: 300,
  minWidth: 400,
  minHeight: 300,
  show: false,
  frame: false,
  fullscreenable: false,
  resizable: true,
  transparent: true,
  webPreferences: {
    nodeIntegration: true,
    backgroundThrottling: false,
  },
  skipTaskbar: true,
  alwaysOnTop: true,
};
