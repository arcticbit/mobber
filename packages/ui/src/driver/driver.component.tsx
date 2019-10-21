import React, { Component } from 'react';

import { Timer } from '../timer/timer.component';

export interface IDriverProps {
  title: string;
  minutesPerRound: number;
  secondsLeft: number;
  isPaused: boolean;
  onMinutesPerRoundChanged: (minutes: number) => void;
}

const styles = {
  minuteChanger: {
    outline: 0,
    border: 0,
    width: '50px',
    fontSize: '1em',
    fontWeight: 100
  },
  name: {
    padding: '20px 0 20px 8px',
    height: '80px',
    lineHeight: '76px',
    fontSize: '20px',
    flex: 1
  },
  card: {
    margin: '10px 10px 0 10px',
    background: '#fff',
    border: '.5px solid #eee',
    fontSize: '2em',
    fontWeight: 100,
    padding: 0
  },
  driver: {
    display: 'flex'
  },
  flagContainer: {
    padding: '20px 10px',
    maxWidth: '40px',
    flex: 1
  },

  border: {
    borderBottom: '4px solid #ccc'
  }
};

export class Driver extends Component<IDriverProps, any> {
  state = {
    isEditingTimer: false
  };

  private handleMinutesPerRoundChange = (minutes: number) => {
    if (isNaN(minutes) || minutes <= 0) {
      return;
    }
    this.props.onMinutesPerRoundChanged(minutes);
  };

  public render() {
    const title = this.props.isPaused ? 'Paused' : this.props.title;
    return (
      <div style={styles.card}>
        <div style={styles.driver}>
          {/* <div style={styles.flagContainer}>
                        <FlagIcon country={this.props.data.language!} />
                    </div> */}

          <div style={styles.name}>{title}</div>
          <Timer
            secondsLeft={this.props.secondsLeft}
            minutesPerRound={this.props.minutesPerRound}
            onMinutesPerRoundChange={(e: any) => this.handleMinutesPerRoundChange(e)}
          />
        </div>
        <div style={styles.border} />
      </div>
    );
  }
}
