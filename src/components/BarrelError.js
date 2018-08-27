import React from 'react';

class BarrelError extends React.Component {
  render() {
    return (
      <div className="barrel__error">
        <p>{this.props.data}</p>
      </div>
    )
  }
}

export default BarrelError;
