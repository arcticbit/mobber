import { IPerson } from "./person.model";
export interface IMobberState {
  timeLeft: number;
  timePerRound: number;
  persons: IPerson[];
}
