import { IPerson } from "./person.model";
export interface IMobberState {
  current?: IPerson;
  persons: IPerson[];
}
