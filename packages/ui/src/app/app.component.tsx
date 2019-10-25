import React, { Component } from 'react';

import { Participants } from '../participants/list/list.component';
import { styles } from './app.styles';
import { initialState, IAppState } from './app.state';

import { IMobberState } from '../../../model/mobber-state.model';
import { IPerson } from '../../../model/person.model';

import { Api } from '../api/api.service';
import { Driver } from '../driver/driver.component';
import { Controls } from '../controls/controls.component';



export class App extends Component<any, IAppState> {
  state: any;
  api: Api;

  get driver() {
    return this.state.persons[this.driverIndex];
  }

  get driverIndex() {
    return Math.abs(this.state.roundCounter) % this.state.persons.length;
  }
  
  constructor(props: any, state: any) {
    super(props, state);
    this.state = initialState;
    this.api = new Api();
  }

  componentDidMount() {
    this.listenForEscapeKey();
    this.listenForStateChanges();
    this.ready();
  }

  ready() {
    this.api.ready();
    (document.getElementById('inputField') as any).focus();
  }

  render() {
    return (
      <div className="App-header" style={styles.wrapper}>
        <div>
          {this.state.isBreak ? (
            <Driver
              title="Break"
              secondsLeft={this.state.secondsLeft}
              minutesPerRound={this.state.minutesPerBreak}
              onMinutesPerRoundChanged={this.handleMinutesPerBreakChanged}
              isPaused={this.state.isPaused}
            />
          ) : (
            <Driver
              title={this.driver ? this.driver.name : 'Mobber'}
              secondsLeft={this.state.secondsLeft}
              minutesPerRound={this.state.minutesPerRound}
              onMinutesPerRoundChanged={this.handleMinutesPerRoundChanged}
              isPaused={this.state.isPaused}
            />
          )}
        </div>
        <div>
          <Participants
            participants={this.state.persons}
            onDelete={this.handleDelete}
            onDriverPromotion={this.handleDriverPromotion}
            driverIndex={this.driverIndex}
          />
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Controls
            onPreviousDriver={this.handlePreviousDriver}
            onNextDriver={this.handleNextDriver}
            onPause={this.handlePause}
          />
        </div>
      </div>
    );
  }

  private listenForStateChanges() {
    this.api.subscribe('state-update', this.handleStateChange);
  }


  private listenForEscapeKey() {
    window.addEventListener('keydown', e => {
      if (e.key !== 'Escape') {
        return;
      }
      this.api.hide();
    });
  }

  private handleStateChange = (s: IMobberState) => {
    this.setState({ ...s });
  };

  private handleMinutesPerRoundChanged = (minutes: number) => {
    this.api.updateMinutesPerRound(minutes);
  };

  private handleMinutesPerBreakChanged = (minutes: number) => {
    this.api.updateMinutesPerBreak(minutes);
  };

  private handlePause = () => {
    this.api.togglePause();
  };

  private handlePreviousDriver = () => {
    this.api.previousDriver();
  };

  private handleNextDriver = () => {
    this.api.nextDriver();
  };

  private readonly handleDriverPromotion = (person: IPerson) => {
    this.api.promote(person);
  };

  private handleDelete = (person: IPerson) => {
    this.api.remove(person);
  };
}

export default App;
