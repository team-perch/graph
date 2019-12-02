import React from 'react';
import {ajax} from 'jquery';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
    };
    this.showPrice = this.showPrice.bind(this);
  }
  componentDidMount(){
    ajax({
      url: '/api/estimates/pricing',
      method: "GET",
      success: (data) => {
        data.sort(function(a,b){
          if(a.date_id < b.date_id){
            return -1
          } else if (a.date_id > b.date_id){
            return 1
          } else {return 0}
        })
        console.log(data)
        this.setState({
          prices: data
        })
      }
    })
  }
  showPrice(e){
    console.log(e.target)
    console.log('hello')
  }
  render() {
    let estimates;
    if(this.state.prices.length > 0){
      estimates = this.state.prices.map((price, key) => {
        console.log(key)
        if(price.date_id < 50){
          let next = this.state.prices[key+1];
          return(
            <g>
              <circle cx = {40 + (10 * price.date_id)} cy = {250 - (price.price * 0.0001)} r='2' fill='red' onMouseEnter= {this.showPrice}></circle>
              <line x1={40 + (10 * price.date_id)} x2={50 + (10 * price.date_id)} y1={250 - (price.price * 0.0001)} y2= {250 - (next.price * 0.0001)} stroke="black"/>
            </g>
          );
        }
      })
    } else {estimates = <h2>none</h2>}
    return (
      <div>
        <svg viewBox="0 0 700 250">
            {estimates}
          <text x='70' y='250'>2015</text>
          <text x='170' y='250'>2016</text>
          <text x='270' y='250'>2017</text>
          <text x='370' y='250'>2018</text>
          <text x='470' y='250'>2019</text>
        </svg>
      </div>
    );
  }
}

export default Graph;
