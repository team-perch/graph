import React from 'react';
import {ajax} from 'jquery';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      pop: 0,
    };
    this.showPrice = this.showPrice.bind(this);
  }
  componentDidMount(){
    const api = function (){
      let result = '/api/estimates/pricing/1'
      if(window.location.pathname.length > 1){
        result = `/api/estimates/pricing${window.location.pathname}`
      }
      return result
    }
    console.log(api())
    ajax({
      url: api(),
      method: "GET",
      success: (data) => {
        data.sort(function(a,b){
          if(a.date_id < b.date_id){
            return -1
          } else if (a.date_id > b.date_id){
            return 1
          } else {return 0}
        })
        this.setState({
          prices: data
        })
      }
    })
  }
  showPrice(e){
    let id = e.target.id
    e.preventDefault();
    this.setState({
      pop: id
    })
  }
  render() {
    let estimates;
    let popup;
    if(this.state.prices.length > 0){
      estimates = this.state.prices.map((price, key) => {
        if(price.date_id < 60){
          let next = this.state.prices[key+1];
          return(
            <g onMouseEnter= {this.showPrice}>
              <line x1 = {40 + (10 * price.date_id)} x2 = {40 + (10 * price.date_id)} y1 = '230' y2 = '0' id= {price.date_id} stroke = 'white' stroke-width = '0.25'></line>
              <line x1={40 + (10 * price.date_id)} x2={50 + (10 * price.date_id)} y1={250 - (price.price * 0.0001)} y2= {250 - (next.price * 0.0001)} stroke="black"/>
            </g>
          );
        }
        else {
          return(
            <g onMouseEnter= {this.showPrice}>
              <line x1 = {40 + (10 * price.date_id)} x2 = {40 + (10 * price.date_id)} y1 = '230' y2 = '0' id= {price.date_id} stroke = 'white' stroke-width = '0.25'></line>
            </g>
          )
        }
      })
    } else {estimates = <h2>none</h2>}
    if(this.state.pop > 0){
      let temp = this.state.prices[this.state.pop - 1]
      let date = function (num) {
        var months = [
          'December', 'January', 'February', 'March', 'April', 'May',
          'June', 'July', 'August', 'September',
          'October', 'November'
          ];
        let obj = {
          year: Math.floor((num-1)/12),
          month: num%12
        }
        console.log(obj.month)
        return `20${15 + obj.year}-${months[obj.month]}`
      }
      popup = (
        <g>
          <circle cx = {40 + (10 * temp.date_id)} cy= {250 - (temp.price * 0.0001)} r='3' />
          <text x = {40 + (10 * temp.date_id)} y ='100'> {date(temp.date_id)} {temp.price}</text>
          <line x1 = {40 + (10 * temp.date_id)} x2 = {40 + (10 * temp.date_id)} y1 = '230' y2 = '0' id= {temp.date_id} stroke = 'green' stroke-width = '0.25'></line>
        </g>
      )
    }
    return (
      <div>
        <svg viewBox="0 0 700 250">
            {estimates}
            {popup}
          <text x='70' y='250'>2015</text>
          <text x='190' y='250'>2016</text>
          <text x='310' y='250'>2017</text>
          <text x='430' y='250'>2018</text>
          <text x='550' y='250'>2019</text>
        </svg>
      </div>
    );
  }
}

export default Graph;
