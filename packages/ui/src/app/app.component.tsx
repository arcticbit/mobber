import React, { Component } from 'react';

import { Participants } from '../participants/list/list.component';
import { styles } from './app.styles';
import { initialState } from './app.state';

import { IMobberState } from "../../../model/mobber-state.model";
import { IPerson } from '../../../model/person.model';

import { Api } from './api';
import { Driver } from '../driver/driver.component';

const { ipcRenderer } = window.require('electron');

export class App extends Component<any, any> {
  
  state = initialState;
  api = new Api();

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') {
        return;
      }

      ipcRenderer.send('hide-interface');
    })
    ipcRenderer.on('state-update', (_event: any, state: IMobberState) => {
      this.setState({
        ...state,
        form: this.state.form,
      });
    });
    ipcRenderer.send('ready', null);
    (document.getElementById('inputField') as any).focus();
  }

  render() {
    console.log('state render', this.state);
    const [driver, ...rest ] = this.state.persons;
    
    return (
      <div className="App-header" style={styles.wrapper}>
        <div style={{...styles.autoFlex}}>
          <Driver data={driver} />
        </div>
        <div style={styles.autoFlex}>
          <Participants
            data={rest}
            onDelete={this.handleDelete}
            onDriverPromotion={this.handleDriverPromotion}
          />
        </div>
        
      </div>
    )
  }

  private readonly handleDriverPromotion = (person: IPerson) => {
    this.api.promote(person);
  };



  private handleDelete = (person: IPerson) => {
    this.api.remove(person);
  }

}
export default App;
