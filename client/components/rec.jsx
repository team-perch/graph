import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';

class Rec extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      zipcode: '',
      rec: [],
    }
  }
  componentDidMount(){
    const api = function () {
      let result = '/api/estimates/recentsales/1';
      if (window.location.pathname.length > 1) {
        result = `/api/estimates/recentsales${window.location.pathname}`;
      }
      return result;
    };
    ajax({
      url: api(),
      method: 'GET',
      success: (data) =>{
        data.sort((a, b) => {
          if (a.sold_date < b.sold_date) {
            return 1;
          } if (a.sold_date > b.sold_date) {
            return -1;
          }
          return 0;
        });
        this.setState({
          rec: data
        })
        let group = data[0].group_id
        ajax({
          url: `/api/estimates/zipcode/${group}`,
          method: 'GET',
          success: (results) => {
            this.setState({
              zipcode: results[0].zipcode
            })
          }
        })
      }
    })
  }
  render(){
    return(
      <h1>{this.state.zipcode}</h1>
    )
  }
}

export default Rec;