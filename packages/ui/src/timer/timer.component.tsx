import React, { Component } from "react";
import { number } from "prop-types";

export interface ITimerProps {
  onTimerChange: (e: any) => void;
  round: number;
  remaining: number;
}

interface ITimerState {
  isEditing: boolean;
  edit: { minutes: number };
  minutes: number;
  seconds: number;
  remaining: number;
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
      padding: '20px 0',
      height: '40px',
      flex: 1,
  },
}

export class Timer extends Component<ITimerProps, ITimerState> {
  
  public state = {
    minutes: 0,
    seconds: 0,
    remaining: 0,
    isEditing: false,
    edit: {
      minutes: 0,
    }
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
      ...this.getTimeInMinutesAndSeconds(next.remaining),
      remaining: next.remaining,
      edit: {
        minutes: next.round,
      }
    });
  }

  public render() {
    return (
      <div style={{ textAlign: 'right', marginRight: '10px', ...styles.name}}>
            {
              this.state.isEditing
                ? this.renderEdit()
                : this.renderView()
            }
          </div>
        )
      }
      
  private renderEdit = () => (
      <>
        <input 
          id="minuteChanger"
          style={styles.minuteChanger}
          type="number"
          value={this.state.edit.minutes} 
          onBlur={() => this.exitEditMode()}
          onChange={(e) => this.handleRoundTimeChange(e)}/>
        <span>
          min
        </span>
      </>
    );

  private getCircumference() {
    return 37 * 2 * Math.PI;
  }

  private getProgress() {
    return this.getCircumference() - (this.state.remaining / (this.state.edit.minutes * 60)) * this.getCircumference();
  }

  private renderView = () => (
      <div onClick={() => this.enterEditMode()}>
        <svg height={80} width={80} >
          <circle
            strokeWidth={4}
            stroke="orange"
            fill="transparent"
            r={37}
            cx={40}
            cy={40}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%'}}
            strokeDasharray={`${this.getCircumference()} ${this.getCircumference()}`}
            strokeDashoffset={this.getProgress()}
          />
          <text x={40} y={46} color="black" textAnchor={"middle"} fontSize="20" strokeWidth="2">
            {this.timeText}
          </text>
        </svg>
        {/* {this.timeText} */}
      </div>
    );

  private enterEditMode = () => {
    this.setState({isEditing: true});
    setTimeout(() => (document.getElementById('minuteChanger') as any).focus(), 0);
  }
  
  private exitEditMode = () => {
    this.setState({ isEditing: false });
  }
  
  private handleRoundTimeChange = (e: any) => {
    this.props.onTimerChange(parseInt(e.currentTarget.value));
  }


  private getTimeInMinutesAndSeconds(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return { minutes, seconds}
  }
}
