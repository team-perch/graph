import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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
  stroke-opacity: 0.3;
`;
const GraphLine = styled.line`
  z-index: 2;
  position: absolute;
`;
const InvisLine = styled.line`
  stroke-opacity: 0;
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
  font-size: 12px;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;

const Selection = styled.g`
  .year text{
    font-size: 12px;
    fill: ${props => props.color || 'black'};
    font-family: "Comic Sans MS", cursive, sans-serif;
  }
  .year text:hover{
    fill: dimgray;
    fill-opacity: 0.7
  }
`;
const TrackButton = styled.g`
  .button rect {
    color: blue;
    z-index: 5;
    stroke: gray;
    stroke-width: 0.5;
    stroke-opacity: 0.1:
    z-index: -1;
    x: 560;
    y: 35;
    rx: 1;
    ry: 1;
    width: 120;
    height: 25;
    fill: darkgray;
    fill-opacity: 0.2;
  }
  .button text{
    z-index: 10;
    fill: black;
    fill-opacity: 0.8;
    font-size: 10px;
  }

  .button rect:hover {
    fill: dimgray;
  }
`;
class Graph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      pop: 0,
      current: {price: 0},
      time: 5,
      five: 'black',
      one: 'gray',
    };
    this.showPrice = this.showPrice.bind(this);
    this.selectGraph = this.selectGraph.bind(this);
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
          current: data[0],
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

  selectGraph(e){
    var result = Number(e.target.innerHTML[0])
    if(result === 5){
      this.setState({
        five: 'black',
        one: 'gray',
        time: 5
      })
    } else if(result === 1) {
      this.setState({
        one: 'black',
        five: 'gray',
        time: 1
      })
    }
    this.setState({
      time: result
    })
  }
  render() {
    let estimates;
    let popup;
    let xaxis;
    if (this.state.prices.length > 0) {
      if(this.state.time === 5){
        estimates = this.state.prices.map((price, key) => {
          if (price.date_id < 60) {
            const next = this.state.prices[key + 1];
            return(
              <g onMouseOver={this.showPrice}>
                <InvisLine x1={40 + (10 * price.date_id)} x2 = {40 + (10 * price.date_id)} y1 = '230' y2 = '110' id= {price.date_id} stroke = 'white' strokeWidth='3' position="relative"/>

                <circle cx ={40 + (10 * price.date_id)} cy={250 - (price.price * 0.0001)} r="1" color = 'black' />
                <GraphLine x1={40 + (10 * price.date_id)} x2={50 + (10 * price.date_id)} y1={250 - (price.price * 0.0001)} y2= {250 - (next.price * 0.0001)} stroke="black" strokeWidth='1' fill='none' />
              </g>
            );
          }
          return (
              <g onMouseOver={this.showPrice}>
                <InvisLine x1={40 + (10 * price.date_id)} x2 = {40 + (10 * price.date_id)} y1 = '230' y2 = '110' id= {price.date_id} stroke='white' stroke-width='3'/>
                <circle cx ={40 + (10 * price.date_id)} cy={250 - (price.price * 0.0001)} r="1" color = 'black' />
              </g>
          );
        });
        xaxis = (
          <g>
            <Xaxis x="90" y="220">2015</Xaxis>
            <Xaxis x="210" y="220">2016</Xaxis>
            <Xaxis x="330" y="220">2017</Xaxis>
            <Xaxis x="450" y="220">2018</Xaxis>
            <Xaxis x="570" y="220">2019</Xaxis>
          </g>
        );
      }
      else if (this.state.time===1){
        let arr = this.state.prices.slice(48, 60)
        estimates = arr.map((price, key)=>{
          if(key < 11){
            const next = arr[key + 1];
            key += 1
            return(
              <g onMouseOver={this.showPrice}>
                <InvisLine x1={(50 * key)} x2 = {(50 * key)} y1 = '230' y2 = '110' id= {price.date_id} stroke = 'white' strokeWidth='3' position="relative"/>

                <circle cx ={(50 * key)} cy={250 - (price.price * 0.0001)} r="1" color = 'black' />
                <GraphLine x1={(50 * key)} x2={50 + (50 * key)} y1={250 - (price.price * 0.0001)} y2= {250 - (next.price * 0.0001)} stroke="black" strokeWidth='1' fill='none' />
              </g>
            )
          }
          else {
            return(
              <g onMouseOver={this.showPrice}>
                <InvisLine x1={(50 * key) + 50} x2 = {(50 * key) + 50} y1 = '230' y2 = '110' id= {price.date_id} stroke='white' stroke-width='3'/>
                <circle cx ={(50 * key) + 50} cy={250 - (price.price * 0.0001)} r="1" color = 'black' />
              </g>
            )
          }
        })
        xaxis = (
          <g>
            <Xaxis x="90" y="220">Feb</Xaxis>
            <Xaxis x="190" y="220">Apr</Xaxis>
            <Xaxis x="290" y="220">Jun</Xaxis>
            <Xaxis x="390" y="220">Aug</Xaxis>
            <Xaxis x="490" y="220">Oct</Xaxis>
            <Xaxis x="590" y="220">Dec</Xaxis>
          </g>
        );
      }
    }
    else { estimates = <h2>none</h2>; }
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
      if(this.state.time === 5){
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
        popup = (
        <g>
          <circle cx ={50 * (temp.date_id - 48)} cy={250 - (temp.price * 0.0001)} r="3" color='red' />
          <PopText x ={50 * (temp.date_id - 48)} y="110">
            {date(temp.date_id)}
          </PopText>
          <PopText x ={50 * (temp.date_id - 48)} y="120">
            {temp.price}
          </PopText>
          <GraphLine x1={50 * (temp.date_id - 48)} x2={50 * (temp.date_id - 48)} y1="200" y2="110" id={temp.date_id} stroke="green" strokeWidth="0.25" />
        </g>
        )
      }
    } else {
      popup = null;
    }
    return (
      <div>
        <svg viewBox="0 0 750 250">
          {estimates}
          {popup}
          <TrackButton>
            <g class='button'>
              <rect/>
              <text x='582' y='50'>Track This Estimate</text>
            </g>
          </TrackButton>
          <Selection color={this.state.one} className='1' onClick= {this.selectGraph}>
            <g class = 'year'>
              <text x='580' y='75'>1 year</text>
            </g>
          </Selection>
          <Selection color={this.state.five} className='5' onClick= {this.selectGraph}>
            <g class = 'year'>
              <text x='630' y='75'>5 years</text>
            </g>
          </Selection>
          <InfoText x='90' y='70'>${formatNumber(this.state.current.price)}</InfoText>
          {xaxis}
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
