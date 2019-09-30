export interface IParticipantProps {
  isDriving: boolean;
  person: any;
  onDelete: (person: any) => void;
  onChange: (person: any) => void;
  onDriverPromotion: (person: any) => void;
}
