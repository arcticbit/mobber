import React from 'react';
import usFlag from '../assets/us-flag.png';
import seFlag from '../assets/se-flag.png';
import { KeyboardLayout } from '../../../model/keyboard.enum';

const styles = {
  flag: {
    verticalAlign: 'middle',
  },
};

export class FlagIcon extends React.Component<{ country: KeyboardLayout; size?: number }, any> {
  public render() {
    return (
      <img
        alt={this.props.country}
        src={this.props.country === 'US' ? usFlag : seFlag}
        style={{ width: `${this.props.size || 40}px`, ...styles.flag }}
      />
    );
  }
}
