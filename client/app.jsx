/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Graph from './components/graph.jsx';
import Rec from './components/rec.jsx';

const GlobalStyles = createGlobalStyle`
  html{
    scroll-behavior: smooth;
  }
  body {
    padding-left: 60px;
    top: -200px;
    z-index: 100;
  }
`;
const InfoText = styled.div`
  margin-top: 25px;
  font-size: 11px;
  color: rgb(84,84,84);
  margin-left: 40px;
  margin-bottom: 20px;
  font-family: 'Libre Franklin', sans-serif;
`;
const InfoIcon = styled.span`
  font-size: 12px;
  color: rgb(214,214,214);
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
        <GlobalStyles />
        <Graph getZip={this.getZip} />
        <InfoText>
          Redfins Estimate based on recent home sales.&nbsp;
          <InfoIcon className="fas" onClick={()=>{}}>&#xf05a;</InfoIcon>
        </InfoText>
        <Rec zipcode={this.state.zip} />
      </div>
    );
  }
}
export default App;
