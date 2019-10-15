import './list.component.scss';

import React from 'react';

import { Participant } from '../participant/participant.component';
import { AddParticipant } from '../add-participant/add-participant';

export class Participants extends React.Component<any, any> {
  render() {
    return (
      this.props &&
      this.props.data && (
        <div className="persons">
          {this.props.data.map((person: any, i: number) => (
            <Participant
              person={person}
              onDelete={this.props.onDelete}
              onDriverPromotion={this.props.onDriverPromotion}
            />
          ))}
          <AddParticipant />
        </div>
      )
    );
  }
}
