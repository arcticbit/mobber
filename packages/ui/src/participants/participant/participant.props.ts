import { IPerson } from "../../../../model/person.model";

export interface IParticipantProps {
  person: IPerson;
  onDelete: (person: any) => void;
  onDriverPromotion: (person: any) => void;
}
