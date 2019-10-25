import { ipcMain } from 'electron';
import { IPerson } from '../../../model/person.model';
import { MobberApp } from '../app';
import IpcMainEvent = Electron.IpcMainEvent;

export class Events {
  constructor(private readonly parent: MobberApp) {}

  public listen() {
    ipcMain.on('ready', () => this.handleReady());
    ipcMain.on('new-participant', this.handleEvent(this.handleAddParticipant));
    ipcMain.on('remove-participant', this.handleEvent(this.handleRemoveParticipant));
    ipcMain.on('new-driver', this.handleEvent(this.handleNewDriver));
    ipcMain.on('hide-interface', this.handleEvent(this.handleHideInterface));
    ipcMain.on('previous-driver', this.handleEvent(this.handlePreviousDriver));
    ipcMain.on('next-driver', this.handleEvent(this.handleNextDriver));
    ipcMain.on('toggle-pause', this.handleEvent(this.handleTogglePause));
    ipcMain.on('update-minutes-per-round', this.handleEvent(this.handleUpdateMinutesPerRound));
    ipcMain.on('update-minutes-per-break', this.handleEvent(this.handleUpdateMinutesPerBreak));
    ipcMain.on('update-rounds-between-breaks', this.handleEvent(this.handleUpdateRoundsBetweenBreaks));
  }

  private handleEvent = (eventHandler: (...args: any[]) => void) => {
    return (event: IpcMainEvent, ...args: any[]) => {
      eventHandler(...args);
      this.parent.pushState();
    };
  };

  private handleUpdateRoundsBetweenBreaks = (roundsBetweenBreaks: number) => {
    this.parent.state.updateRoundsBetweenBreaks(roundsBetweenBreaks);
  };

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

  private handleNewDriver = (driverName: string) => {
    console.log('renderer: new-driver ', driverName);
    this.parent.state.setDriverByName(driverName);
  };

  private handleRemoveParticipant = (person: IPerson) => {
    this.parent.state.removePerson(person);
  };

  private handleAddParticipant = (person: IPerson) => {
    this.parent.state.addPerson(person);
  };

  private handleReady = () => {
    console.log('renderer: ready');
    this.parent.pushState();
  };

  private handleHideInterface = () => {
    this.parent.window.hide();
  };
}
