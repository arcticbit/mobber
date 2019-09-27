import { KeyboardLayout, Keyboard } from "../keyboard";

export class Config {
  static get() {
    return {
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
}

export interface IConfig {
  current?: IPerson;
  persons: IPerson[];
}

export interface IPerson {
  name: string;
  active: boolean;
  language: KeyboardLayout;
  scroll: ScrollDirection;
}

export enum ScrollDirection {
  Natural = "Natural",
  Inverted = "Inverted"
}
