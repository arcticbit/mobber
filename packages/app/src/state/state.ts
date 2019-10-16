import { KeyboardLayout } from '../../../model/keyboard.enum';
import { ScrollDirection } from '../../../model/scroll-direction.model';
import { IMobberState } from '../../../model/mobber-state.model';
import { MobberApp } from '../app/app';
import { IPerson } from '../../../model/person.model';

export class State {
  public getTimeLeft() {
    return this.state.timeLeft;
  }

  public togglePause = () => {
    this.state.isPaused = !this.state.isPaused;
  };

  constructor(private readonly parent: MobberApp) {}

  public get(): IMobberState {
    return this.state;
  }

  public addPerson(person: IPerson) {
    if (this.hasPerson(person)) {
      return;
    }

    console.log('adding a person', person);
    this.state.persons.push({
      ...person,
      scroll: ScrollDirection.Natural
    });
  }

  private hasPerson(person: IPerson) {
    return this.state.persons.some(p => p.name.toLowerCase() === person.name.toLowerCase());
  }

  public removePerson(person: IPerson) {
    this.state.persons = this.state.persons.filter(p => p.name !== person.name);
  }

  public setDriverByName(name: string) {
    const driver = this.state.persons.find(x => x.name === name);
    const rest = this.state.persons.filter(x => x.name !== name);
    this.state.persons = [driver, ...rest];
  }

  public isBreak = () => {
    return this.state.roundCounter % this.state.roundsBetweenBreaks === 0;
  };

  public isPaused = () => {
    return this.state.isPaused;
  };

  public getCurrentDriver = () => {
    const driverIndex = Math.abs(this.state.roundCounter) % this.state.persons.length;
    return this.state.persons[driverIndex];
  };

  public next = () => {
    this.state.roundCounter++;
    this.startNewDriverSession();
  };

  private resetTimer = () => {
    if (this.isBreak()) {
      this.state.timeLeft = this.state.breakTime;
    } else {
      this.state.timeLeft = this.state.timePerRound;
    }
  };

  public previous = () => {
    this.state.roundCounter--;
    this.startNewDriverSession();
  };

  private startNewDriverSession = () => {
    this.resetTimer();
    this.parent.keyboard.switchLayout(this.getCurrentDriver().language);
  };

  public tick = () => {
    if (this.isPaused()) {
      return;
    }
    this.state.timeLeft--;
    if (this.state.timeLeft <= 0) {
      this.next();
    }
  };

  private state: IMobberState = {
    timeLeft: 7 * 60,
    timePerRound: 7 * 60,
    breakTime: 12 * 60,
    roundsBetweenBreaks: 4,
    roundCounter: 0,
    isPaused: false,
    persons: [
      {
        name: 'Daniel',
        language: KeyboardLayout.English,
        scroll: ScrollDirection.Natural
      },
      {
        name: 'Simon',
        language: KeyboardLayout.Swedish,
        scroll: ScrollDirection.Natural
      }
    ]
  };
}
