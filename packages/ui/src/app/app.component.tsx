import React, { Component } from 'react';

import { Participants } from '../participants/list/list.component';
import { styles } from './app.styles';
import { initialState } from './app.state';

import { IMobberState } from '../../../model/mobber-state.model';
import { IPerson } from '../../../model/person.model';

import { Api } from './api';
import { Driver } from '../driver/driver.component';
import { Controls } from '../controls/controls.component';

const { ipcRenderer } = window.require('electron');

export class App extends Component<any, any> {
  state = initialState;
  api = new Api();

  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.key !== 'Escape') {
        return;
      }

      ipcRenderer.send('hide-interface');
    });
    ipcRenderer.on('state-update', (_event: any, state: IMobberState) => {
      this.setState({
        ...state
      });
    });
    ipcRenderer.send('ready', null);
    (document.getElementById('inputField') as any).focus();
  }

  render() {
    console.log('state render', this.state);
    const currentDriverIndex = Math.abs(this.state.roundCounter) % this.state.persons.length;
    const driver = this.state.persons[currentDriverIndex];

    return (
      <div className="App-header" style={styles.wrapper}>
        <div>
          {this.state.isBreak ? (
            <Driver
              title="Break"
              timeLeft={this.state.timeLeft}
              timePerRound={this.state.breakTime}
              isPaused={this.state.isPaused}
            />
          ) : (
            <Driver
              title={driver ? driver.name : 'Mobber'}
              timeLeft={this.state.timeLeft}
              timePerRound={this.state.timePerRound}
              isPaused={this.state.isPaused}
            />
          )}
        </div>
        <div>
          <Participants
            participants={this.state.persons}
            onDelete={this.handleDelete}
            onDriverPromotion={this.handleDriverPromotion}
            currentDriverIndex={currentDriverIndex}
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
