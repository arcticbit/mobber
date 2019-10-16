import { IPerson } from '../../../../model/person.model';

export interface IParticipantProps {
  person: IPerson;
  isCurrentDriver: boolean;
  onDelete: (person: any) => void;
  onDriverPromotion: (person: any) => void;
}
