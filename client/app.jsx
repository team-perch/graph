/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
import React from 'react';
import Graph from './components/graph.jsx';
import Rec from './components/rec.jsx';
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`

  body {
    padding-left: 60px;
    top: -200px;
    z-index: 100;
  }
`;
const InfoText = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: rgb(64,64,64);
  margin-left: 40px;
  margin-bottom: 20px;
  font-family: 'Libre Franklin', sans-serif;
`;
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
        <GlobalStyles/>
        <Graph getZip={this.getZip} />
        <InfoText>Redfins Estimate based on recent home sales.</InfoText>
        <Rec zipcode={this.state.zip} />
      </div>
    );
  }
}
export default App;
