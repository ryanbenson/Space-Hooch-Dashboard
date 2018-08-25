import React from 'react';
import Satellite from './Satellite';

class App extends React.Component {
  getApiUrl() {
    const apiUrl = 'https://safe-coast-56540.herokuapp.com/api/satellites';
    return apiUrl;
  }

  getData() {
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

  state = {
    satellites: []
  };

  componentDidMount() {
    this.getData();
  };

  render() {
    return (
      <div className="space-hooch">
        {this.state.satellites.map(sat => <Satellite key={sat.satellite_id} index={sat.satellite_id} data={sat} />)}
      </div>
    );
  }
}

export default App;
