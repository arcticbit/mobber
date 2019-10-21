import { IPerson } from '../../../model/person.model';
const { ipcRenderer } = window.require('electron');

export class Api {
  public promote(person: IPerson) {
    ipcRenderer.send('new-driver', person.name);
  }
  public add(person: IPerson) {
    ipcRenderer.send('new-participant', person);
  }
  public toggle(person: IPerson) {
    ipcRenderer.send('toggle-participant', person);
  }
  public remove(person: IPerson) {
    ipcRenderer.send('remove-participant', person);
  }
  public nextDriver() {
    ipcRenderer.send('next-driver');
  }
  public previousDriver() {
    ipcRenderer.send('previous-driver');
  }
  public togglePause() {
    ipcRenderer.send('toggle-pause');
  }
  public updateMinutesPerRound = (minutes: number) => {
    ipcRenderer.send('update-minutes-per-round', minutes);
  };
  public updateMinutesPerBreak = (minutes: number) => {
    ipcRenderer.send('update-minutes-per-break', minutes);
  };
}
