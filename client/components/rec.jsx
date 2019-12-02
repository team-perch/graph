import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';

class Rec extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <h1>{this.props.zipcode}</h1>
    )
  }
}

export default Rec;