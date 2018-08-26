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
    if(type === 'telemetry_timestamp') order = 'desc';
    const sorted = _.orderBy(this.state.satellites, type, order);
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
