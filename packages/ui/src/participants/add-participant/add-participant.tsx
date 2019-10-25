import React from 'react';

import { FlagIcon } from '../../flag-icon/flag-icon.component';
import { Api } from '../../api/api.service';
import { IPerson } from '../../../../model/person.model';
import { KeyboardLayout } from '../../../../model/keyboard.enum';

const styles = {
  flag: {
    width: '20px',
    padding: '0 5px',
  },
  formInput: {
    flex: 'auto',
    boxSizing: 'border-box' as any,
    padding: '8px',
    outline: 'none',
    border: 0,
  },
  formSubmitButton: {
    flex: '1',
    maxWidth: '30px',
    background: '#eee',
  },
  form: {
    border: '1px solid #eee',
    background: '#fff',
    margin: '0 10px',
    flex: 'auto',
    minHeight: '30px',
    maxHeight: '30px',
    display: 'flex',
  },
  formFlags: {
    padding: '4px',
    cursor: 'pointer',
  },
};

export class AddParticipant extends React.Component {
  private api = new Api();
  public state: Partial<{ name: string; layout: string }> = { name: '', layout: 'Swedish-Pro' };

  private toggleLayout = () => {
    this.setState({
      layout: this.state.layout === 'US' ? 'Swedish-Pro' : 'US',
    });
  };

  private handleFormKeydown = (e: any) => {
    if (e.key.toLowerCase() !== 'enter') {
      return;
    }
    this.handleFormSubmit();
  };

  private handleFormSubmit = () => {
    const newParticipant: IPerson = {
      name: this.state.name || '',
      language: this.state.layout as KeyboardLayout,
      scroll: 'Natural' as any,
    };
    this.setState({ name: '' });
    this.api.add(newParticipant);
  };

  private handleFormChange = (e: any) => {
    this.setState({
      ...this.state,
      name: e.target.value,
      layout: this.state.layout,
    });
  };
  render() {
    return (
      <div style={styles.form}>
        <div style={styles.formFlags} onClick={this.toggleLayout}>
          {this.state.layout === 'US' ? (
            <FlagIcon country={'US' as any} size={20} />
          ) : (
            <FlagIcon country={'Swedish-Pro' as any} size={20} />
          )}
          {/* <img onClick={() => this.setState({layout: 'US'})} src={usFlag} style={{ ...this.getFlagStyle('US'), ...styles.flag}} />
      <img onClick={() => this.setState({layout: 'Swedish-Pro'})} src={seFlag} style={{ ...this.getFlagStyle('Swedish-Pro'), ...styles.flag}} /> */}
        </div>
        <input
          id="inputField"
          style={styles.formInput}
          type="text"
          placeholder="New participant"
          onKeyPress={this.handleFormKeydown}
          onChange={this.handleFormChange}
          value={this.state.name}
        />
      </div>
    );
  }
}
