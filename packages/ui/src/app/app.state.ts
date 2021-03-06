import { IPerson } from '../../../model/person.model';

export interface IAppState {
  secondsLeft: number;
  minutesPerRound: number;
  minutesPerBreak: number;
  roundsBetweenBreaks: number;
  roundCounter: number;
  isPaused: boolean;
  isBreak: boolean;
  persons: IPerson[];
}

export const initialState = {
  secondsLeft: 0,
  minutesPerRound: 0,
  minutesPerBreak: 0,
  roundsBetweenBreaks: 4,
  roundCounter: 0,
  isPaused: false,
  isBreak: false,
  persons: [
    { name: 'Simme', layout: 'SE' },
    { name: 'Danny', layout: 'US' },
    { name: 'Jensa', layout: 'SE' },
    { name: 'Marty', layout: 'US' },
  ],
};
