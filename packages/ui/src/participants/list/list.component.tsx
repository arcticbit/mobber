import React from 'react';
import { MdCheck, MdClose, MdMenu, MdVerticalAlignTop, MdStar, MdDelete } from 'react-icons/md';

import './list.component.scss';

export class Participants extends React.Component<any, any> {

    render() {
        return this.props && this.props.data && (
            <div className="persons">
                {this.props.data
                    .map((person: any, i: number) => (
                        <div className="person" key={person.name}>
                            <div className="arrange" style={{ cursor: 'move'}}>
                                <MdMenu></MdMenu>
                            </div>
                            <div className="name">
                                {person.name}
                            </div>
                            <div className="actions">
                                <button
                                    type="button"
                                    onClick={() => this.props.onDelete(person)}>
                                    <MdDelete></MdDelete>
                                </button>
                            {i === 0
                                ? 
                                  <MdStar style={{ color: 'orange', padding: '0 2px 0 0' }}></MdStar>
                                : <button type="button" onClick={() => this.props.onChange(person)}>
                                    <MdVerticalAlignTop></MdVerticalAlignTop>
                                  </button>
                            }
                                <button
                                    style={{
                                        color: person.active
                                            ? '#6aa98c'
                                            : '#a96a6e',
                                        }}
                                    type="button"
                                    onClick={() => this.props.onChange(person)}
                                >
                                    {
                                        person.active
                                            ? <MdCheck></MdCheck>
                                            : <MdClose></MdClose>
                                    }
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }


}