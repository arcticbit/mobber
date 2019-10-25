import React from 'react';

interface IControlsProps {
  onPreviousDriver: () => void;
  onNextDriver: () => void;
  onPause: () => void;
}

const styles = {
  button: {
    flexGrow: 1,
    height: '30px'
  },
  container: {
      padding: '10px',
      display: 'flex'
  }
};

export class Controls extends React.Component<IControlsProps> {
  public render = () => {

    const items = [
      { action: this.props.onPreviousDriver, content: '«' },
      { action: this.props.onPause,          content: 'pause'   },
      { action: this.props.onNextDriver,     content: '»' },
    ]

    return (
      <div style={styles.container}>
        {
	  items.map(i => (
            <button style={styles.button} onClick={i.action}>
              {i.content}
            </button>
	  ))
	}
      </div>
    );
  };
}
