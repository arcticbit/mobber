import { KeyboardLayout } from './keyboard.enum';
import { ScrollDirection } from './scroll-direction.model';
export interface IPerson {
  name: string;
  language: KeyboardLayout;
  scroll: ScrollDirection;
}
