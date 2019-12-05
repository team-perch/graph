import React from 'react';
import styled from 'styled-components';
import Graph from './components/graph.jsx'
import Rec from './components/rec.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
    };
    this.getZip = this.getZip.bind(this);
  }

  getZip(string) {
    this.setState({
      zip: string,
    });
  }

  render() {
    return (
      <div>
        <div>Redfin Estimates</div>
        <Graph getZip={this.getZip} />
        <div>Hello</div>
        <Rec zipcode={this.state.zip} />
      </div>
    );
  }
}
export default App;
