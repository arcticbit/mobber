import { globalShortcut } from "electron";

type hotkey = { key: string; action: () => void };

export class Hotkeys {
  registerHotkeys = (map: hotkey[]) =>
    map.forEach(entry => this.registerHotkey(entry.key, entry.action));

  registerHotkey(key: string, action: () => void) {
    globalShortcut.register(`CommandOrControl+Shift+${key}`, action);
  }
}
