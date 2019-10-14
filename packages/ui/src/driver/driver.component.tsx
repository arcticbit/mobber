import React, { Component } from 'react';
import { IPerson } from "../../../model/person.model";

import { Timer } from '../timer/timer.component';
import { FlagIcon } from '../flag-icon/flag-icon.component';

export interface IDriverProps {
    data: Partial<IPerson>;
    timePerRound: number;
    timeLeft: number;
}

const styles = {
    minuteChanger: {
        outline: 0, border: 0, width: '50px', fontSize: '1em',
        fontWeight: 100
    },
    name: {
        padding: '20px 0 20px 8px',
        height: '80px',
        lineHeight: '76px',
        fontSize: '20px',
        flex: 1,
    },
    card: {
        margin: '10px 10px 0 10px',
        background: '#fff',
        border: '.5px solid #eee',
        fontSize: '2em',
        fontWeight: 100,
        padding: 0,
    },
    driver: {
        display: 'flex'
    },
    flagContainer: {
        padding: '20px 10px',
        maxWidth: '40px',
        flex: 1, 
    },
    
    border: {
        borderBottom: '4px solid #ccc',
    },
}

export class Driver extends Component<IDriverProps, any> {
    state = {
        isEditingTimer: false,
        minutesPerRound: 7
    }

    private handleMinutesPerRoundChange = (minutes: number) => {
        if(isNaN(minutes) || minutes <= 0) {
            return;  
        }
        this.setState({ minutesPerRound: minutes});
    }

    

    public render() {
        return (
            <div style={styles.card}>
                <div style={styles.driver}>
                    {/* <div style={styles.flagContainer}>
                        <FlagIcon country={this.props.data.language!} />
                    </div> */}
                        
                    <div style={styles.name}>
                        {this.props.data.name}
                    </div>
                    <Timer
                        remaining={this.props.timeLeft}
                        round={this.state.minutesPerRound}
                        onTimerChange={(e: any) => this.handleMinutesPerRoundChange(e)}/>
                </div>
                <div style={styles.border} />
            </div>
        )
    }
}