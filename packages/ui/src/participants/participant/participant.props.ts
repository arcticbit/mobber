export interface IParticipantProps {
    isDriving: boolean;
    person: any;
    onDelete: (person: any) => void;
    onChange: (person: any) => void;
}