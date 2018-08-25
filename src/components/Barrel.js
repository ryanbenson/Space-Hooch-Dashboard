import React from 'react';
import BarrelError from './BarrelError';

class Barrel extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.data.batch_id}</p>
        <p>{this.props.data.last_flavor_sensor_result}</p>
        <p>{this.props.data.status}</p>
        {this.props.data.errors.map((e, i) => <BarrelError key={`${this.props.index}-${i}`} index={`${this.props.index}-${i}`} data={e} />)}
      </div>
    );
  }
}

export default Barrel;
