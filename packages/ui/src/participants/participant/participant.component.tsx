import React from "react";
import { MdDelete } from "react-icons/md";
import dragIcon from '../../drag.icon.png';
import { IParticipantProps } from "./participant.props";

export class Participant extends React.Component<IParticipantProps> {
    render() {
        const { person }: any = this.props;
        return (
            <div className="person" key={person.name} style={{ fontWeight: 'bold', fontStyle: 'italic'}}>
                <div className="arrange" style={{ cursor: 'move' }}>
                    <img src={dragIcon} style={{height: '.6em', marginBottom: '1px'}}/>
                </div>
                <div className="name" style={{fontSize: '.8em', marginLeft: '1em'}}>
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

