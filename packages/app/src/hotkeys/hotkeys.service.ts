import { globalShortcut } from "electron";

type hotkey = { keys: string; action: () => void };

export class Hotkeys {
  registerHotkeys = (map: hotkey[]) =>
    map.forEach(entry => this.registerHotkey(entry.keys, entry.action));

  registerHotkey(key: string, action: () => void) {
    globalShortcut.register(key, action);
  }
}
