import React, { Component } from 'react';

import ParticipantList from '../participants/list/list.component';
import { styles } from './app.styles';
import { initialState, IAppState } from './app.state';

import { IMobberState } from '../../../model/mobber-state.model';
import { IPerson } from '../../../model/person.model';

import { Api } from '../api/api.service';
import { Driver } from '../driver/driver.component';
import { Controls } from '../controls/controls.component';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
    console.log('app mounted');
    this.api.ready();
    (document.getElementById('inputField') as any).focus();
  }

  render() {
    return (
      <div className="App-header" style={styles.wrapper}>
        <DndProvider backend={HTML5Backend}>
          <div>
            {this.state.isBreak ? (
              <Driver
                title="Breaksaa"
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
            <ParticipantList
              participants={this.state.persons}
              onDelete={this.handleDelete}
              driverIndex={this.driverIndex}
              onMoveParticipant={this.handleMoveParticipant}
            />
          </div>
          <div>
            <label>
              Rounds between breaks
              <input
                type="number"
                min={0}
                max={100}
                value={this.state.roundsBetweenBreaks}
                onChange={e => this.api.updateRoundsBetweenBreaks(parseInt(e.currentTarget.value))}
              />
            </label>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <Controls
              onPreviousDriver={this.handlePreviousDriver}
              onNextDriver={this.handleNextDriver}
              onPause={this.handlePause}
            />
          </div>
        </DndProvider>
      </div>
    );
  }

  private handleMoveParticipant = (dragIndex: number, hoverIndex: number) => {
    const newList = [...this.state.persons];
    const dragPerson = this.state.persons[dragIndex];
    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, dragPerson);
    this.setState({ persons: newList });
    this.api.moveParticipant(dragIndex, hoverIndex);
  };

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

  private handleStateChange = (state: IMobberState) => {
    this.setState({ ...state });
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

  private handleDelete = (person: IPerson) => {
    this.api.remove(person);
  };
}

export default App;
