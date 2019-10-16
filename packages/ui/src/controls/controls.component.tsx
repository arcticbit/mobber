import React from 'react';

interface IControlsProps {
  onPreviousDriver: () => void;
  onNextDriver: () => void;
  onPause: () => void;
}

export class Controls extends React.Component<IControlsProps> {
  public render = () => {
    return (
      <>
        <button onClick={this.props.onPreviousDriver}>&laquo;</button>
        <button onClick={this.props.onNextDriver}>&raquo;</button>
        <button onClick={this.props.onPause}>pause</button>
      </>
    );
  };
}
