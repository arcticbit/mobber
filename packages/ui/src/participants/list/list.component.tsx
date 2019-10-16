import './list.component.scss';

import React from 'react';

import { Participant } from '../participant/participant.component';
import { AddParticipant } from '../add-participant/add-participant';

export class Participants extends React.Component<any, any> {
  render() {
    const participants = this.props.participants.map((person: any, i: number) => {
      return (
        <Participant
          person={person}
          onDelete={this.props.onDelete}
          onDriverPromotion={this.props.onDriverPromotion}
        />
      );
    });

    return (
      <div className="persons">
        {participants}
        <AddParticipant />
      </div>
    );
  }
}
