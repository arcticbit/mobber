import React, { Component } from 'react';
import './App.css';
import { Participants } from './participants/list/list.component';




export class App extends Component<any, any> {
  state = {
    form: {
      input: '',
      layout: 'SE'
    },
    persons: [
      { name: 'Simme', active: true, layout: 'SE' },
      { name: 'Danny', active: true, layout: 'US' },
      { name: 'Jensa', active: true, layout: 'SE' },
      { name: 'Marty', active: false, layout: 'US' },
    ]
  };

  render() {
    return (
        <div className="App-header" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <div style={{flex: 'auto'}}>
            <Participants
              data={this.state.persons}
              onChange={(p: any) => this.onChange(p)}
              onDelete={this.handleDelete}>
            </Participants>
          </div>
          <div style={{flex: 'auto', minHeight: '30px', maxHeight: '30px', display: 'flex'}}>
            <input
              style={{ flex: 'auto', boxSizing: 'border-box', padding: '8px'}}
              type="text"
              placeholder="New participant"
              onKeyPress={this.handleFormKeydown}
              onChange={ this.handleFormChange }
              value={ this.state.form.input }
            />
            <button style={{flex: '1', maxWidth: '30px', background: '#eee'}} type="button" onClick={this.handleFormSubmit} >+</button>
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

  onChange(item: any) {

    const persons = [...this.state.persons];
    const person: any = persons.find(x => x.name === item.name);
    person.active = !person.active;

    this.setState({
      persons
    });
  }

}
export default App;
