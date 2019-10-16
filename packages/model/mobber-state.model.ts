import { IPerson } from './person.model';
export interface IMobberState {
  timeLeft: number;
  timePerRound: number;
  breakTime: number;
  roundsBetweenBreaks: number;
  roundCounter: number;
  persons: IPerson[];
  isPaused: boolean;
}
