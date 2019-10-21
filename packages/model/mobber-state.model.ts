import { IPerson } from './person.model';
export interface IMobberState {
  secondsLeft: number;
  minutesPerRound: number;
  minutesPerBreak: number;
  roundsBetweenBreaks: number;
  roundCounter: number;
  persons: IPerson[];
  isPaused: boolean;
  isBreak: boolean;
}
