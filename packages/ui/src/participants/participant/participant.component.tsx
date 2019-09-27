import React from "react";
import {
    MdMenu,
    MdDelete,
    MdCheck,
    MdClose,
    MdStar,
    MdVerticalAlignTop as MdMoveUp,
} from "react-icons/md";

import { IParticipantProps } from "./participant.props";
import { styles } from './participant.style';

export class Participant extends React.Component<IParticipantProps> {
    render() {
        const { person }: any = this.props;
        return (
            <div className="person" key={person.name}>
                <div className="arrange" style={{ cursor: 'move' }}>
                    <MdMenu></MdMenu>
                </div>
                <div className="name">
                    {person.name}
                </div>
                <div className="actions">
                    <button type="button" onClick={() => this.props.onDelete(person)}>
                        <MdDelete />
                    </button>
                    {this.renderOrderButton(person)}
                    <button
                        style={this.getStatusStyle(person)}
                        type="button"
                        onClick={this.props.onChange}
                    >
                        {this.renderStatusButton(person)}
                    </button>
                </div>
            </div>
        );
    }

    private getStatusStyle(person: any): React.CSSProperties {
        return {
            color: person.active
                ? '#6aa98c'
                : '#a96a6e',
        };
    }

    private renderStatusButton = (person: any) => person.active
        ? <MdCheck />
        : <MdClose />;


    private renderOrderButton(person: any) {
        return this.props.isDriving
            ? <MdStar style={styles.driverIcon} />
            : <button type="button" onClick={() => this.props.onChange(person)}>
                <MdMoveUp />
            </button>;
    }
}

