import { IPerson } from '../../../model/person.model';
const { ipcRenderer } = window.require('electron');

export class Api {
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
  public updateRoundsBetweenBreaks = (roundsBetweenBreaks: number) => {
    ipcRenderer.send('update-rounds-between-breaks', roundsBetweenBreaks);
  };

  public subscribe = (eventName: string, callback: (data: any) => void) => {
    ipcRenderer.on(eventName, (_: any, data: any) => callback(data));
  };
  public ready = () => {
    ipcRenderer.send('ready');
  };

  public hide = () => {
    ipcRenderer.send('hide-interface');
  };

  public moveParticipant(dragIndex: number, hoverIndex: number) {
    ipcRenderer.send('move-participant', { dragIndex, hoverIndex });
  }
}
