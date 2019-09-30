import { KeyboardLayout } from "./keyboard.enum";
import { ScrollDirection } from "./scroll-direction.model";
export interface IPerson {
  name: string;
  active: boolean;
  language: KeyboardLayout;
  scroll: ScrollDirection;
}
