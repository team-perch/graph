import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      pop: 0,
    };
    this.showPrice = this.showPrice.bind(this);
    this.hidePrice = this.hidePrice.bind(this);
  }

  componentDidMount() {
    const api = function () {
      let result = '/api/estimates/pricing/1';
      if (window.location.pathname.length > 1) {
        result = `/api/estimates/pricing${window.location.pathname}`;
      }
      return result;
    };
    ajax({
      url: api(),
      method: 'GET',
      success: (data) => {
        data.sort((a, b) => {
          if (a.date_id < b.date_id) {
            return -1;
          } if (a.date_id > b.date_id) {
            return 1;
          }
          return 0;
        });
        this.props.getZip(data[0].property_id)
        this.setState({
          prices: data,
        });
      },
    });
  }

  showPrice(e) {
    const { id } = e.target;
    e.preventDefault();
    this.setState({
      pop: id,
    });

  }
  hidePrice(e){
    console.log('HIDE')

  }

  render() {
    let estimates;
    let popup;
    if (this.state.prices.length > 0) {
      estimates = this.state.prices.map((price, key) => {
        if (price.date_id < 60) {
          const next = this.state.prices[key + 1];
          return(
            <g onMouseOver={this.showPrice} onMouseOut={this.hidePrice}>
              <line x1={40 + (10 * price.date_id)} x2 = {40 + (10 * price.date_id)} y1 = '230' y2 = '0' id= {price.date_id} stroke = 'white' onMouseOver={this.showPrice} />
              <circle cx ={40 + (10 * price.date_id)} cy={250 - (price.price * 0.0001)} r="1" color = 'black' />
              <line x1={40 + (10 * price.date_id)} x2={50 + (10 * price.date_id)} y1={250 - (price.price * 0.0001)} y2= {250 - (next.price * 0.0001)} stroke="black" strokeWidth='1' fill='none' />
            </g>
          );
        }

        return (
            <g onMouseOver={this.showPrice}>
              <line x1={40 + (10 * price.date_id)} x2 = {40 + (10 * price.date_id)} y1 = '230' y2 = '0' id= {price.date_id} stroke='white' stroke-width='0.25' />
            </g>
        );
      });
    } else { estimates = <h2>none</h2>; }
    if (this.state.pop > 0) {
      const temp = this.state.prices[this.state.pop - 1];
      const date = (num) => {
        const months = [
          'December', 'January', 'February', 'March', 'April', 'May',
          'June', 'July', 'August', 'September',
          'October', 'November',
        ];
        const obj = {
          year: Math.floor((num - 1) / 12),
          month: num % 12,
        };
        return `20${15 + obj.year}-${months[obj.month]}`;
      };
      popup = (
        <g>
          <circle cx ={40 + (10 * temp.date_id)} cy={250 - (temp.price * 0.0001)} r="3" color='red' />
          <text x ={40 + (10 * temp.date_id)} y="100">
            {date(temp.date_id)}
            {temp.price}
          </text>
          <line x1={40 + (10 * temp.date_id)} x2={40 + (10 * temp.date_id)} y1="230" y2="0" id={temp.date_id} stroke="green" strokeWidth="0.25" />
        </g>
      );
    } else {
      popup= null;
    }
    const Xaxis = styled.text`
      font: bold;
      font-size: 10px;
      fill: gray;
    `;
    const Yaxis = styled.text`
      font: italic;
      font-size: 7px;
      fill: gray;
    `;
    const Yline = styled.line`

    `;
    return (
      <div>
        <svg viewBox="0 0 800 250">
          {estimates}
          {popup}
          <Xaxis x="70" y="250">2015</Xaxis>
          <Xaxis x="190" y="250">2016</Xaxis>
          <Xaxis x="310" y="250">2017</Xaxis>
          <Xaxis x="430" y="250">2018</Xaxis>
          <Xaxis x="550" y="250">2019</Xaxis>
          <Yaxis x='700' y='190'>600,000</Yaxis>
          <Yaxis x='700' y='170'>800,000</Yaxis>
          <Yaxis x='700' y='150'>1,000,000</Yaxis>
          <Yaxis x='700' y='130'>1,200,000</Yaxis>
        </svg>
      </div>
    );
  }
}

export default Graph;
