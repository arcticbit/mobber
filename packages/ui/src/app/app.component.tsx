import React, { Component } from 'react';

import { Participants } from '../participants/list/list.component';
import { styles } from './app.styles';
import { initialState } from './app.state';

import { IMobberState } from "../../../model/mobber-state.model";
import { IPerson } from '../../../model/person.model';
import { MdPlusOne } from 'react-icons/md';

import { Api } from './api';

const { ipcRenderer } = window.require('electron');

export class App extends Component<any, any> {
  
  state = initialState;
  api = new Api();

  componentDidMount() {

    ipcRenderer.on('state-update', (_event: any, state: IMobberState) => {
      this.setState({
        ...state,
        form: this.state.form,
      });
    });
    ipcRenderer.send('ready', null);
  }

  render() {
    console.log('state render', this.state);

    return (
      <div className="App-header" style={styles.wrapper}>
        <div style={styles.autoFlex}>
          <Participants
            data={this.state.persons}
            onChange={this.handleChange}
            onDelete={this.handleDelete}
            onDriverPromotion={this.handleDriverPromotion}
          />
        </div>
        <div style={styles.form}>
          <input
            style={styles.formInput}
            type="text"
            placeholder="New participant"
            onKeyPress={this.handleFormKeydown}
            onChange={this.handleFormChange}
            value={this.state.form.input}
          />
          <button
            style={styles.formSubmitButton}
            type="button"
            onClick={this.handleFormSubmit}>
            <MdPlusOne/>
          </button>
        </div>
      </div>
    )
  }

  private readonly handleDriverPromotion = (person: IPerson) => {
    this.api.promote(person);
  };

  private handleFormKeydown = (e: any) => {
    if (e.key.toLowerCase() !== 'enter') {
      return;
    }
    this.handleFormSubmit();
  }

  private handleDelete = (person: IPerson) => {
    this.api.remove(person);
  }

  private handleFormSubmit = () => {
    const newParticipant: IPerson = {
      name: this.state.form.input,
      active: true,
      language: "Swedish-Pro" as any,
      scroll: "Natural" as any
    };
    this.api.add(newParticipant);
    
  }

  private handleFormChange = (e: any) => {
    this.setState({
      ...this.state,
      form: {
        input: e.target.value,
        layout: this.state.form.layout,
      }
    });
  }

  private handleChange = (item: any) => {

    const persons = [...this.state.persons];
    const person = persons.find(x => x.name === item.name);

    if (person == null) {
      throw new Error('not impl');
    }

    person.active = !person.active;

    localStorage.setItem('state', JSON.stringify(this.state));
    this.setState({
      persons });
  }

}
export default App;
