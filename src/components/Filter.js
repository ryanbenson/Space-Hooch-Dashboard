import React from 'react';

class Filter extends React.Component {
  search = React.createRef();

  filter = (e) => {
    e.preventDefault();
    const filterStr = this.search.value.value;
    this.props.setFilter(filterStr);
  }

  reset = (e) => {
    e.preventDefault();
    this.search.value.value = '';
    this.filter(e);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.filter}>
          <label>Search</label>
          <input type="text" ref={this.search} />
          <button type="submit">Filter</button>
          <button onClick={this.reset}>Reset</button>
        </form>
      </div>
    );
  }
}

export default Filter;
