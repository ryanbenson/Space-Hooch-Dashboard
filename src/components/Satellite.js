import React from 'react';
import Barrel from './Barrel';

class Satellite extends React.Component {
  render() {
    return (
      <div>
        {this.props.data.barrels.map(barrel => <Barrel key={`${this.props.data.satellite_id}-${barrel.batch_id}`} index={`${this.props.data.satellite_id}-${barrel.batch_id}`} data={barrel} />)}
      </div>
    )
  }
}

export default Satellite;
