import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/graph.jsx'
import Rec from './components/rec.jsx'
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
    console.log(this.state.zip + 'REC')
  }
  render(){
    return(
      <div>
        <Graph getZip = {this.getZip}/>
        <Rec/>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));