import React from 'react';

class BarrelError extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.data}</p>
      </div>
    )
  }
}

export default BarrelError;
