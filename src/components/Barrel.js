import React from 'react';
import BarrelError from './BarrelError';

class Barrel extends React.Component {
  render() {
    return (
      <div className="barrel">
        <p className="barrel__batch"><span>Batch ID</span>{this.props.data.batch_id}</p>
        <p className={`barrel__status barrel__status--${this.props.data.status}`}><span>Status</span>{this.props.data.status}</p>
        <p className="barrel__flavor"><span>Flavor</span>{this.props.data.last_flavor_sensor_result}</p>
        {this.props.data.errors.map((e, i) => <BarrelError key={`${this.props.index}-${i}`} index={`${this.props.index}-${i}`} data={e} />)}
      </div>
    );
  }
}

export default Barrel;
