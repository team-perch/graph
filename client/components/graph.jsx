import React from 'react';
import {ajax} from 'jquery';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
    };
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
  render() {
    let estimates;
    if(this.state.prices.length > 0){
      estimates = this.state.prices.map((price, key) => {
        console.log(key)
        if(price.date_id < 50){
          let next = this.state.prices[key+1];
          return(
            <line x1={40 + (10 * price.date_id)} x2={50 + (10 * price.date_id)} y1={250 - (price.price * 0.0001)} y2= {250 - (next.price * 0.0001)} stroke="black"/>
          );
        }
      })
    } else {estimates = <h2>none</h2>}
    return (
      <div>
        <svg viewBox="0 0 700 250">
          <g>
            {estimates}
          </g>

        </svg>
      </div>
    );
  }
}

export default Graph;
