import React from 'react';

class Sorting extends React.Component {
  sortType = React.createRef();

  activateSort = (e) => {
    e.preventDefault();
    const sortBy = this.sortType.value.value;
    this.props.sortBy(sortBy);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.activateSort}>
          <select ref={this.sortType}>
            <option value="telemetry_timestamp">Latest</option>
            <option value="status">Status</option>
            <option value="errors">Errors</option>
          </select>
          <button type="submit">Sort</button>
        </form>
      </div>
    );
  }
}

export default Sorting;
