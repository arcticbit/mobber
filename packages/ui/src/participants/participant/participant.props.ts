import { IPerson } from '../../../../model/person.model';

export interface IParticipantProps {
  person: IPerson;
  isCurrentDriver: boolean;
  onDelete: (person: any) => void;
  moveParticipant: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}
