import React, { Component } from 'react';

import { Timer } from '../timer/timer.component';
import { styles } from './driver.styles';

export interface IDriverProps {
  title: string;
  minutesPerRound: number;
  secondsLeft: number;
  isPaused: boolean;
  onMinutesPerRoundChanged: (minutes: number) => void;
}

export class Driver extends Component<IDriverProps, any> {
  state = {
    isEditingTimer: false,
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
