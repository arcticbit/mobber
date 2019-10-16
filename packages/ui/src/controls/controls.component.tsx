import React from 'react';

interface IControlsProps {
  onPreviousDriver: () => void;
  onNextDriver: () => void;
  onPause: () => void;
}

export class Controls extends React.Component<IControlsProps> {
  public render = () => {
    const containerStyle = {
      padding: '10px',
      display: 'flex'
    };
    const buttonStyle = {
      flexGrow: 1,
      height: '30px'
    };
    return (
      <div style={containerStyle}>
        <button style={buttonStyle} onClick={this.props.onPreviousDriver}>
          &laquo;
        </button>
        <button style={buttonStyle} onClick={this.props.onPause}>
          pause
        </button>
        <button style={buttonStyle} onClick={this.props.onNextDriver}>
          &raquo;
        </button>
      </div>
    );
  };
}
