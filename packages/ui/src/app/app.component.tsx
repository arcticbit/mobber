import React, { Component } from 'react';
import './App.css';
import { Participants } from './participants/list/list.component';
import { styles } from './App.styles';
import { initialState } from './App.state';

export class App extends Component<any, any> {

  state = initialState;
  
  componentDidMount() {
    const state = localStorage.getItem('state');
    this.setState(state ? JSON.parse(state) : this.state)
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
            +
          </button>
        </div>
      </div>
    )
  }

  private handleFormKeydown = (e: any) => {
    if (e.key.toLowerCase() !== 'enter') {
      return;
    }
    this.handleFormSubmit();
  }

  private handleDelete = (e: any) => {
    this.setState({
      ...this.state,
      persons: this.state.persons.filter(x => x.name !== e.name)
    })
  }

  private handleFormSubmit = () => {
    this.setState({
      ...this.state,
      persons: [
        ...this.state.persons,
        {
          name: this.state.form.input,
          active: true,
          layout: this.state.form.layout,
        },
      ],
      form: {
        input: '',
        layout: 'SE',
      }
    });
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
    const person: any = persons.find(x => x.name === item.name);
    person.active = !person.active;
    localStorage.setItem('state', JSON.stringify(this.state));

    this.setState({ persons });
  }

}
export default App;
