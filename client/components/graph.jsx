import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
const Xaxis = styled.text`
  font: bold;
  font-size: 10px;
  fill: gray;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;
const Yaxis = styled.text`
  font: italic;
  font-size: 7px;
  fill: gray;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;
const Yline = styled.line`
  z-index: 1;
  stroke: gainsboro;
  stroke-opacity: 0.5;
`;
const GraphLine = styled.line`
  z-index: 50;
  position: absolute;
`;
const PopText = styled.text`
  z-index: 90;
  position: absolute;
  fill: green;
  font-size: 8px;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;
const InfoText = styled.text`
  z-index: 99;
  position: absolute;
  font-size: 10px;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      pop: 0,
      current: {price: 0}
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
    const api1 = function () {
      let result = '/api/estimates/houseinfo/1';
      if (window.location.pathname.length > 1) {
        result = `/api/estimates/houseinfo${window.location.pathname}`;
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
        this.setState({
          prices: data,
        });
      },
    });
    ajax({
      url: api1(),
      method: 'GET',
      success: (data) => {
        this.setState({
          current: data[0]
        })
      }
    })
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
            <g onMouseOver={this.showPrice}>
              <line x1={40 + (10 * price.date_id)} x2 = {40 + (10 * price.date_id)} y1 = '230' y2 = '0' id= {price.date_id} stroke = 'white' position="relative"/>

              <circle cx ={40 + (10 * price.date_id)} cy={250 - (price.price * 0.0001)} r="1" color = 'black' />
              <GraphLine x1={40 + (10 * price.date_id)} x2={50 + (10 * price.date_id)} y1={250 - (price.price * 0.0001)} y2= {250 - (next.price * 0.0001)} stroke="black" strokeWidth='1' fill='none' />
            </g>
          );
        }

        return (
            <g onMouseOver={this.showPrice}>
              <GraphLine x1={40 + (10 * price.date_id)} x2 = {40 + (10 * price.date_id)} y1 = '230' y2 = '0' id= {price.date_id} stroke='white' stroke-width='0.25' />
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
        return `${months[obj.month]} 20${15 + obj.year}`;
      };
      popup = (
        <g>
          <circle cx ={40 + (10 * temp.date_id)} cy={250 - (temp.price * 0.0001)} r="3" color='red' />
          <PopText x ={40 + (10 * temp.date_id)} y="110">
            {date(temp.date_id)}
          </PopText>
          <PopText x ={40 + (10 * temp.date_id)} y="120">
            {temp.price}
          </PopText>
          <GraphLine x1={40 + (10 * temp.date_id)} x2={40 + (10 * temp.date_id)} y1="200" y2="110" id={temp.date_id} stroke="green" strokeWidth="0.25" />
        </g>
      );
    } else {
      popup = null;
    }
    return (
      <div>
        <svg viewBox="0 0 750 250">
          {estimates}
          {popup}
          <InfoText x='90' y='80'>${formatNumber(this.state.current.price)}</InfoText>
          <Xaxis x="90" y="220">2015</Xaxis>
          <Xaxis x="210" y="220">2016</Xaxis>
          <Xaxis x="330" y="220">2017</Xaxis>
          <Xaxis x="450" y="220">2018</Xaxis>
          <Xaxis x="570" y="220">2019</Xaxis>
          <Yaxis x='660' y='192'>$600K</Yaxis>
          <Yaxis x='660' y='172'>$800K</Yaxis>
          <Yaxis x='660' y='152'>$1.0M</Yaxis>
          <Yaxis x='660' y='132'>$1.2M</Yaxis>
          <Yaxis x='660' y='112'>$1.4M</Yaxis>
          <Yline x1='40' x2='650' y1 = '190' y2='190' />
          <Yline x1='40' x2='650' y1 = '170' y2='170' />
          <Yline x1='40' x2='650' y1 = '150' y2='150' />
          <Yline x1='40' x2='650' y1 = '130' y2='130' />
          <Yline x1='40' x2='650' y1 = '110' y2='110' />
        </svg>
      </div>
    );
  }
}

export default Graph;
