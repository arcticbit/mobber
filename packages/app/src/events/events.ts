import { ipcMain, BrowserWindow, Tray } from 'electron';
import { State } from '../state/state';
import { IPerson } from '../../../model/person.model';
import { MobberTray } from '../tray/tray.component';
import { MobberApp } from '../app/app';

export class Events {
  constructor(private readonly parent: MobberApp) {}

  listen() {
    ipcMain.on('ready', this.handleReady());
    ipcMain.on('new-participant', this.handleAddParticipant());
    ipcMain.on('remove-participant', this.handleRemoveParticipant());
    ipcMain.on('new-driver', this.handleNewDriver());
    ipcMain.on('hide-interface', () => this.handleHideInterface());
    ipcMain.on('previous-driver', () => this.handlePreviousDriver());
    ipcMain.on('next-driver', () => this.handleNextDriver());
    ipcMain.on('toggle-pause', () => this.handleTogglePause());
    ipcMain.on('update-minutes-per-round', (_, minutes) =>
      this.handleUpdateMinutesPerRound(minutes)
    );
    ipcMain.on('update-minutes-per-break', (_, minutes) =>
      this.handleUpdateMinutesPerBreak(minutes)
    );
  }

  private handleUpdateMinutesPerRound = (minutes: number) => {
    this.parent.state.updateMinutesPerRound(minutes);
  };

  private handleUpdateMinutesPerBreak = (minutes: number) => {
    this.parent.state.updateMinutesPerBreak(minutes);
  };

  private handleTogglePause = () => {
    console.log('renderer: toggle-pause');
    this.parent.state.togglePause();
  };

  private handlePreviousDriver = () => {
    console.log('renderer: previous-driver');
    this.parent.state.previous();
  };

  private handleNextDriver = () => {
    console.log('renderer: next-driver');
    this.parent.state.next();
  };

  private handleNewDriver(): (event: Electron.IpcMainEvent, ...args: any[]) => void {
    return (_event, driverName: string) => {
      console.log('renderer: new-driver ', driverName);
      this.parent.state.setDriverByName(driverName);
    };
  }

  private handleRemoveParticipant(): (event: Electron.IpcMainEvent, ...args: any[]) => void {
    return (_event, person: IPerson) => {
      this.parent.state.removePerson(person);
    };
  }

  private handleAddParticipant(): (event: Electron.IpcMainEvent, ...args: any[]) => void {
    return (_event, person: IPerson) => {
      this.parent.state.addPerson(person);
    };
  }

  private handleReady(): (event: Electron.IpcMainEvent, ...args: any[]) => void {
    return () => {
      console.log('renderer: ready');
      this.parent.window.webContents.send('state-update', this.parent.state.get());
    };
  }

  private handleHideInterface() {
    this.parent.window.hide();
  }
}
