export interface IParticipantProps {
  isDriving: boolean;
  person: any;
  onDelete: (person: any) => void;
  onToggleActive: (person: any) => void;
  onDriverPromotion: (person: any) => void;
}
