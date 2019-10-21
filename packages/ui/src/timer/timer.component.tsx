import React, { Component } from 'react';

export interface ITimerProps {
  onMinutesPerRoundChange: (e: any) => void;
  minutesPerRound: number;
  secondsLeft: number;
}

interface ITimerState {
  isEditing: boolean;
  edit: { minutes: number };
  minutes: number;
  seconds: number;
  secondsLeft: number;
}

const styles = {
  minuteChanger: {
    outline: 0,
    border: 0,
    width: '50px',
    fontSize: '1em',
    fontWeight: 100,
  },
  name: {
    padding: '20px 0',
    height: '40px',
    flex: 1,
  },
};

export class Timer extends Component<ITimerProps, ITimerState> {
  public state = {
    minutes: 0,
    seconds: 0,
    secondsLeft: 0,
    isEditing: false,
    edit: {
      minutes: 0,
    },
  };

  get minutes() {
    return this.state.minutes.toString().padStart(2, '0');
  }

  get seconds() {
    return this.state.seconds.toString().padStart(2, '0');
  }

  get timeText() {
    return `${this.minutes}:${this.seconds}`;
  }

  public componentWillReceiveProps(next: ITimerProps) {
    this.setState({
      ...this.getTimeInMinutesAndSeconds(next.secondsLeft),
      secondsLeft: next.secondsLeft,
      edit: {
        minutes: next.minutesPerRound,
      },
    });
  }

  public render() {
    return (
      <div style={{ textAlign: 'right', marginRight: '10px', ...styles.name }}>
        {this.state.isEditing ? this.renderEdit() : this.renderView()}
      </div>
    );
  }

  private renderEdit = () => (
    <>
      <input
        id="minuteChanger"
        style={styles.minuteChanger}
        type="number"
        value={this.state.edit.minutes}
        onBlur={() => this.exitEditMode()}
        onKeyPress={e => this.handleKeyPress(e)}
        min={1}
        max={100}
        onChange={e => this.handleMinutesPerRoundChange(e)}
      />
      <span>min</span>
    </>
  );

  private handleKeyPress = (e: any) => {
    if (e.key.toLowerCase() !== 'enter') {
      return;
    }
    this.exitEditMode();
  };

  private getCircumference() {
    return 37 * 2 * Math.PI;
  }

  private getProgress() {
    return (
      this.getCircumference() - (this.state.secondsLeft / (this.state.edit.minutes * 60)) * this.getCircumference()
    );
  }

  private renderView = () => (
    <div onClick={() => this.enterEditMode()}>
      <svg height={80} width={80}>
        <circle
          strokeWidth={4}
          stroke="orange"
          fill="transparent"
          r={37}
          cx={40}
          cy={40}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          strokeDasharray={`${this.getCircumference()} ${this.getCircumference()}`}
          strokeDashoffset={this.getProgress()}
        />
        <text x={40} y={46} color="black" textAnchor={'middle'} fontSize="20" strokeWidth="2">
          {this.timeText}
        </text>
      </svg>
      {/* {this.timeText} */}
    </div>
  );

  private enterEditMode = () => {
    this.setState({ isEditing: true });
    setTimeout(() => (document.getElementById('minuteChanger') as any).focus(), 0);
  };

  private exitEditMode = () => {
    this.setState({ isEditing: false });
  };

  private handleMinutesPerRoundChange = (e: any) => {
    const minutes = parseInt(e.currentTarget.value);
    if (isNaN(minutes)) {
      return;
    }
    this.setState({ edit: { minutes } });
    this.props.onMinutesPerRoundChange(minutes);
  };

  private getTimeInMinutesAndSeconds(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return { minutes, seconds };
  }
}
