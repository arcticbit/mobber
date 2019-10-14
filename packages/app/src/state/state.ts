import { KeyboardLayout } from "../../../model/keyboard.enum";
import { ScrollDirection } from "../../../model/scroll-direction.model";
import { IMobberState } from "../../../model/mobber-state.model";
import { MobberApp } from "../app/app";
import { IPerson } from "../../../model/person.model";

export class State {
  public getTimeLeft() {
    return this.state.timeLeft;
  }

  public resetTimeLeft() {
    this.state.timeLeft = this.state.timePerRound;
  }

  constructor(private readonly parent: MobberApp) {}

  public get(): IMobberState {
    return this.state;
  }

  public addPerson(person: IPerson) {
    if (this.hasPerson(person)) {
      return;
    }

    console.log("adding a person", person);
    this.state.persons.push({
      ...person,
      scroll: ScrollDirection.Natural
    });
    this.parent.pushState();
  }

  private hasPerson(person: IPerson) {
    return this.state.persons.some(
      p => p.name.toLowerCase() === person.name.toLowerCase()
    );
  }

  public removePerson(person: IPerson) {
    this.state.persons = this.state.persons.filter(p => p.name !== person.name);
    this.parent.pushState();
  }

  public setDriverByName(name: string) {
    const driver = this.state.persons.find(x => x.name === name);
    const rest = this.state.persons.filter(x => x.name !== name);
    this.state.persons = [driver, ...rest];
    this.parent.pushState();
  }

  public next() {
    const previousDriver = this.state.persons.shift();
    this.state.persons.push(previousDriver);
    const driver = this.state.persons[0];
    this.startNewDriverSession();
  }

  public previous() {
    const previousDriver = this.state.persons.pop();
    this.state.persons.unshift(previousDriver);
    this.startNewDriverSession();
  }

  startNewDriverSession() {
    this.resetTimeLeft();
    this.parent.keyboard.switchLayout(this.state.persons[0].language);
    this.parent.pushState();
  }

  public decreaseTimeLeft() {
    this.state.timeLeft--;
  }

  private state: IMobberState = {
    timeLeft: 7 * 60,
    timePerRound: 7 * 60,
    persons: [
      {
        name: "Daniel",
        language: KeyboardLayout.English,
        scroll: ScrollDirection.Natural
      },
      {
        name: "Simon",
        language: KeyboardLayout.Swedish,
        scroll: ScrollDirection.Natural
      }
    ]
  };
}
