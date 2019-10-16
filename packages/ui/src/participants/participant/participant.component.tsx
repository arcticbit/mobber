import React from 'react';
import { MdDelete } from 'react-icons/md';
import dragIcon from '../../drag.icon.png';
import { IParticipantProps } from './participant.props';

import usFlag from '../../assets/us-flag.png';
import seFlag from '../../assets/se-flag.png';

export class Participant extends React.Component<IParticipantProps> {
  render() {
    const { person } = this.props;
    return (
      <div className="person" key={person.name} style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
        <div className="arrange" style={{ cursor: 'move' }}>
          <img alt="" src={dragIcon} style={{ height: '.6em', marginBottom: '1px' }} />
        </div>
        <div className="name" style={{ fontSize: '.8em', marginLeft: '1em' }}>
          <img
            alt={person.language}
            src={person.language === 'US' ? usFlag : seFlag}
            style={{ height: '16px', verticalAlign: 'middle', marginRight: '5px' }}
          />
          {person.name}
        </div>
        <div className="actions">
          <button type="button" onClick={() => this.props.onDelete(person)}>
            <MdDelete />
          </button>
        </div>
      </div>
    );
  }
}
