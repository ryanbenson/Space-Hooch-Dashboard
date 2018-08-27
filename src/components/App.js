import React from 'react';
import _ from 'lodash';
import Satellite from './Satellite';
import Filter from './Filter';
import Sorting from './Sorting';

class App extends React.Component {

  state = {
    satellites: [],
    filter: ''
  };

  componentDidMount() {
    this.getData();
  };

  setFilter = (filter) => {
    this.setState({filter: filter});
  }

  getApiUrl = () => {
    const apiUrl = 'https://safe-coast-56540.herokuapp.com/api/satellites';
    return apiUrl;
  }

  getData = ()  => {
    let that = this;
    fetch(this.getApiUrl())
      .then((resp) => resp.json())
      .then(function(data) {
        // set status levels
        data.forEach((sat) => {
          // rank 3 = normal
          // rank 2 = expired
          // rank 1 = error
          let barrel_status_ranks = [];

          // rank 2 = no error
          // rank 1 = error
          let barrel_error_ranks = [];

          sat.barrels.forEach((barrel) => {
            if(barrel.status === 'expired') {
              barrel_status_ranks.push(2);
            } else if(barrel.status === 'error') {
              barrel_status_ranks.push(1);
            } else {
              barrel_status_ranks.push(3);
            }

            if(barrel.errors && barrel.errors.length > 0) {
              barrel_error_ranks.push(1);
            } else {
              barrel_error_ranks.push(2);
            }
            const lowest_rank_status = Math.min(...barrel_status_ranks);
            const lowest_rank_errors = Math.min(...barrel_error_ranks);
            sat.status_rank = lowest_rank_status;
            sat.error_rank = lowest_rank_errors;
          })
        });
        that.setState({satellites: data});
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  filterSats = (el) => {
    let valid = false;
    const searchString = this.state.filter;
    if(searchString === '') return true; //nothing to filter, always show
    el.barrels.forEach(function(b) {
      if(b.status.indexOf(searchString) >= 0) valid = true;
      if(b.last_flavor_sensor_result.indexOf(searchString) >= 0) valid = true;
      if(b.errors.join('').indexOf(searchString) >= 0) valid = true;
    });
    return valid;
  };

  sortBy = (type) => {
    let order = 'asc';
    let sorted;
    if(type === 'telemetry_timestamp') {
       order = 'desc';
       sorted = _.orderBy(this.state.satellites, type, order);
    }
    if(type === 'status') {
      sorted = _.orderBy(this.state.satellites, 'status_rank', order);
    }
    if(type === 'errors') {
      sorted = _.orderBy(this.state.satellites, 'error_rank', order);
    }
    this.setState({satellites: sorted});
  }

  render() {
    return (
      <div className="space-hooch">
        <h1>Moon Shots</h1>
        <Filter setFilter={this.setFilter} />
        <Sorting sortBy={this.sortBy} />
        {this.state.satellites.filter(this.filterSats).map(sat => <Satellite key={sat.satellite_id} index={sat.satellite_id} data={sat} />)}
      </div>
    );
  }
}

export default App;
