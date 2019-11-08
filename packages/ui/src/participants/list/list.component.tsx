import './list.component.scss';

import React  from 'react';

import { AddParticipant } from '../add-participant/add-participant';
import Participant from '../participant/participant.component';
import { IPerson } from '../../../../model/person.model';

interface IParticipantListProps {
  participants: Array<IPerson>;
  onDelete: (person: IPerson) => void;
  onMoveParticipant: (dragIndex: number, hoverIndex: number) => void;
  driverIndex: number;
}

const ParticipantList: React.FC<IParticipantListProps> = ({
  participants,
  onDelete,
  driverIndex,
  onMoveParticipant,
}) => {
  const renderParticipant = (person: any, index: number) => {
    return (
      <Participant
        key={person.name}
        person={person}
        onDelete={onDelete}
        isCurrentDriver={index === driverIndex}
        moveParticipant={onMoveParticipant}
        index={index}
      />
    );
  };

  return (
    <div className="persons">
      {participants.map(renderParticipant)}
      <AddParticipant />
    </div>
  );
};

export default ParticipantList;
