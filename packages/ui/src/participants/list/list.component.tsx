import React from 'react';
import './list.component.scss';
import { Participant } from '../participant/participant.component';

export class Participants extends React.Component<any, any> {

    render() {
        return this.props && this.props.data && (
            <div className="persons">
                {this.props.data
                   .map((person: any, i: number) => (
                        <Participant
                            person={person}
                            onChange={this.props.onChange}
                            onDelete={this.props.onDelete}
                            isDriving={i === 0}
                        />))
                }
            </div>
        );
    }
}