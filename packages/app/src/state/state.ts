import { Notification } from 'electron';
import { ScrollDirection } from '../../../model/scroll-direction.model';
import { IMobberState } from '../../../model/mobber-state.model';
import { MobberApp } from '../app';
import { IPerson } from '../../../model/person.model';
import * as fs from 'fs';

export class State {
  private readonly stateFile = 'state.json';

  public getTimerLabel = () => {
    const secondsLeft = this.getSecondsLeft();
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = Math.floor(secondsLeft - minutes * 60);
    return `[${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}]`;
  };

  public getDriverLabel = () => {
    if (this.isPaused()) {
      return 'Paused';
    }
    if (this.isBreak()) {
      return 'Break';
    }
    const currentDriver = this.getCurrentDriver();
    if (currentDriver) {
      return currentDriver.name;
    }
    return 'Mobber';
  };

  public getTitle = () => {
    return `${this.getTimerLabel()} ${this.getDriverLabel()}`;
  };

  public updateRoundsBetweenBreaks = (roundsBetweenBreaks: number) => {
    this.state.roundsBetweenBreaks = roundsBetweenBreaks;
  };

  public getSecondsLeft() {
    return this.state.secondsLeft;
  }

  public togglePause = () => {
    this.state.isPaused = !this.state.isPaused;
  };

  constructor(private readonly parent: MobberApp) {
    this.loadState();
  }

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
      scroll: ScrollDirection.Natural,
    });

    this.saveState();
  }

  private saveState() {
    fs.writeFileSync(this.stateFile, JSON.stringify(this.state));
  }

  private loadState() {
    if (fs.existsSync(this.stateFile)) {
      const savedState = fs.readFileSync(this.stateFile, { encoding: 'utf-8' });
      this.state = JSON.parse(savedState);
      console.log('loaded state');
    }
  }

  private hasPerson(person: IPerson) {
    return this.state.persons.some(p => p.name.toLowerCase() === person.name.toLowerCase());
  }

  public removePerson(person: IPerson) {
    this.state.persons = this.state.persons.filter(p => p.name !== person.name);
    this.saveState();
  }

  public setDriverByName(name: string) {
    const driver = this.state.persons.find(x => x.name === name);
    const rest = this.state.persons.filter(x => x.name !== name);
    this.state.persons = [driver, ...rest];
  }

  public isBreak = () => {
    return this.state.isBreak;
  };

  public isPaused = () => {
    return this.state.isPaused;
  };

  public getCurrentDriver = () => {
    const driverIndex = Math.abs(this.state.roundCounter) % this.state.persons.length;
    return this.state.persons[driverIndex];
  };

  private isTimeForBreak = () => {
    return this.state.roundCounter % this.state.roundsBetweenBreaks === 0;
  };

  public next = () => {
    const wasOnBreak = this.state.isBreak;
    this.state.isBreak = false;

    if (!wasOnBreak) {
      this.state.roundCounter++;

      this.state.isBreak = this.isTimeForBreak();
    }

    this.reset();
    this.showNotification();
  };

  private showNotification = () => {
    const notification = new Notification({
      title: 'Mobber',
      body: this.getTitle(),
    });
    notification.show();
  };

  private resetTimer = () => {
    if (this.isBreak()) {
      this.state.secondsLeft = this.state.minutesPerBreak * 60;
    } else {
      this.state.secondsLeft = this.state.minutesPerRound * 60;
    }
  };

  public previous = () => {
    this.state.roundCounter--;
    this.reset();
  };

  private reset = () => {
    this.resetTimer();
    this.updateKeyboardLayout();
  };

  private updateKeyboardLayout = () => {
    const currentDriver = this.getCurrentDriver();
    if (currentDriver) {
      this.parent.keyboard.switchLayout(currentDriver.language);
    }
  };

  public updateMinutesPerRound = minutes => {
    this.state.minutesPerRound = minutes;
    this.resetTimer();
    this.saveState();
  };

  public updateMinutesPerBreak = minutes => {
    this.state.minutesPerBreak = minutes;
    this.resetTimer();
    this.saveState();
  };

  public tick = () => {
    if (this.isPaused()) {
      return;
    }
    this.state.secondsLeft--;
    if (this.state.secondsLeft <= 0) {
      this.next();
    }
  };

  private state: IMobberState = {
    secondsLeft: 7 * 60,
    minutesPerRound: 7,
    minutesPerBreak: 12,
    roundsBetweenBreaks: 4,
    roundCounter: 0,
    isPaused: false,
    isBreak: false,
    persons: [],
  };
}
