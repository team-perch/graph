import React from 'react';
import Graph from './components/graph.jsx'
import Rec from './components/rec.jsx'
import styled from 'styled-components';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      zip:''
    }
    this.getZip = this.getZip.bind(this)
  }
  getZip(string){
    this.setState({
      zip: string
    })
  }
  render(){
    return(
      <div>
          <Graph getZip = {this.getZip}/>
          <Rec zipcode = {this.state.zip}/>
      </div>
    )
  }
}
export default App;

