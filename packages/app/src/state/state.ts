import { KeyboardLayout } from "../../../model/keyboard.enum";
import { ScrollDirection } from "../../../model/scroll-direction.model";
import { IMobberState } from "../../../model/mobber-state.model";
import { MobberApp } from "../app/app";
import { IPerson } from "../../../model/person.model";

export class State {
  constructor(private readonly parent: MobberApp) {}

  public get(): IMobberState {
    return this.state;
  }

  public addPerson(person: IPerson) {
    if (
      this.state.persons.some(
        p => p.name.toLowerCase() === person.name.toLowerCase()
      )
    ) {
      return;
    }
    this.state.persons.push({
      ...person,
      scroll: ScrollDirection.Natural
    });
  }

  public removePerson(person: IPerson) {
    this.state.persons = this.state.persons.filter(p => p.name !== person.name);
  }

  public setDriverByName(name: string) {
    const driver = this.state.persons.find(x => x.name === name);
    const rest = this.state.persons.filter(x => x.name !== name);
    this.state.persons = [driver, ...rest];
  }

  public next() {
    const previousDriver = this.state.persons.shift();
    this.state.persons.push(previousDriver);
  }
  public previous() {
    const previousDriver = this.state.persons.pop();
    this.state.persons.unshift(previousDriver);
  }

  public toggle(person: IPerson) {
    const item = this.state.persons.find(p => p.name === person.name);
    item.active = !item.active;
  }

  private state: IMobberState = {
    persons: [
      {
        name: "Simon",
        active: true,
        language: KeyboardLayout.Swedish,
        scroll: ScrollDirection.Natural
      },
      {
        name: "Jonas",
        active: true,
        language: KeyboardLayout.Swedish,
        scroll: ScrollDirection.Inverted
      },
      {
        name: "Kim",
        active: true,
        language: KeyboardLayout.Swedish,
        scroll: ScrollDirection.Inverted
      },
      {
        name: "Daniel",
        active: false,
        language: KeyboardLayout.English,
        scroll: ScrollDirection.Natural
      },
      {
        name: "Martin",
        active: true,
        language: KeyboardLayout.English,
        scroll: ScrollDirection.Inverted
      }
    ]
  };
}
