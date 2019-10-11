import { IPerson } from "../../../model/person.model";
const { ipcRenderer } = window.require("electron");

export class Api {
  public promote(person: IPerson) {
    ipcRenderer.send("new-driver", person.name);
  }
  public add(person: IPerson) {
    ipcRenderer.send("new-participant", person);
  }
  public toggle(person: IPerson) {
    ipcRenderer.send("toggle-participant", person);
  }
  public remove(person: IPerson) {
    ipcRenderer.send("remove-participant", person);
  }
}
