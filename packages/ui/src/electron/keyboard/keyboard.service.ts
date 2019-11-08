import { exec } from 'child_process';
import { exists } from 'fs';
import { KeyboardLayout } from '../../../model/keyboard.enum';

export class Keyboard {
  constructor() {
    this.isSwitcherInstalled().catch(() => {
      throw new Error('This app requires xkbswitch to be present in /usr/local/bin');
    });
  }

  public async switchLayout(layout: KeyboardLayout) {
    exec(`xkbswitch -e -s ${layout}`);
  }

  private async isSwitcherInstalled() {
    return await new Promise(resolve => {
      exists('/usr/local/bin/xkbswitch', exists => {
        resolve(exists);
      });
    });
  }
}
