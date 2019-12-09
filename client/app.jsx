/* eslint-disable import/no-duplicates */
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
    padding-left: 30px;
    top: -200px;
    z-index: 100;
  }
`;
const MainDiv = styled.div`
  float: left;
  width: 950;
  height: 2000;
`;
const Div = styled.div`
  float: left;
`;
const Div1 = styled.div`
  float: left;
  position: sticky;
  position:-webkit-sticky;
  top: 0;
  img {
    display: inline;
    position: sticky;
    position:-webkit-sticky;
    top: 0;
  }
`;
const InfoText = styled.div`
  margin-top: 10px;
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
      id: props.id,
    };
    this.getZip = this.getZip.bind(this);
  }

  getZip(string) {
    this.setState({
      zip: string,
    });
  }

  render() {
    console.log(typeof this.state.id);
    return (
      <MainDiv>
        <Div>
          <GlobalStyles />
          <Graph getZip={this.getZip} id={this.state.id} />
          <InfoText>
            Redfins Estimate based on recent home sales.&nbsp;
            <InfoIcon className="fas">&#xf05a;</InfoIcon>
          </InfoText>
          <Rec zipcode={this.state.zip} id={this.state.id} />
        </Div>
        <Div1>
          <img src="https://redfin-estimates.s3.us-east-2.amazonaws.com/Screen+Shot+2019-12-07+at+10.38.41+AM.png" width="250" height="360" alt="sidebar" />
        </Div1>
      </MainDiv>
    );
  }
}
export default App;
