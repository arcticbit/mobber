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
                            onToggleActive={this.props.onToggleActive}
                            onDelete={this.props.onDelete}
                            onDriverPromotion={this.props.onDriverPromotion}
                            isDriving={i === 0}
                        />))
                }
            </div>
        );
    }
}