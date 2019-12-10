/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';

const url = 'http://localhost:3002';
function formatPercent(num) {
  const arr = num.toString().split('');
  let key;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === '.') {
      key = i;
    }
  }
  return num.toString().substring(0, key);
}
function profit(num1, num2) {
  let result;
  num1 = Number(num1);
  num2 = Number(num2);
  if (num1 < num2) {
    result = 'red';
  } else {
    result = 'green';
  }
  return result;
}
function box(num) {
  const arr = [`${num},112`, `${num - 10},102`, `${num - 55},102`, `${num - 55},60`, `${num + 55},60`, `${num + 55},102`, `${num + 10},102`];
  return arr.join(' ');
}
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function formatThousand(num) {
  return num / 1000;
}
const Xaxis = styled.text`
  font: bold;
  font-size: 10px;
  fill: gray;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
`;
const Yaxis = styled.text`
  font: italic;
  font-size: 9px;
  fill: gray;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
`;
const Yline = styled.line`
  z-index: 1;
  stroke: gainsboro;
  stroke-opacity: 0.3;
`;
const GraphLine = styled.line`
  z-index: 2;
  position: absolute;
  stroke: black;
  stroke-width: 1.25;
  fill: black;
`;
const InvisLine = styled.line`
  stroke-opacity: 0;
`;
const PopText = styled.text`
  z-index: 90;
  position: absolute;
  fill: black;
  font-size: 9px;
  font-family: 'Libre Franklin', sans-serif;
`;
const PopCircle = styled.circle`
  position: absolute;
  fill: black;
`;
const PopBox = styled.polygon`
  stroke: gray;
  stroke-width: 0.5;
  stroke-opacity: 0.3;
  fill: white;
`;
const EstimateText = styled.g`
  .net text{
    fill: black;
    font-size: 10px;
    font-family: 'Libre Franklin', sans-serif;
    font-weight: 300;
  }
  .net tspan{
    fill: ${(props) => {
    const prop = props.children.props.children.props.children[0].props.diff;
    if (prop === 'green') {
      return 'green';
    } if (prop === 'red') {
      return 'red';
    }
    return 'blue';
  }}
  }
`;
const InfoText = styled.text`
  z-index: 99;
  position: absolute;
  font-size: 20px;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
`;
const HeadText = styled.text`
  z-index: 99;
  position: absolute;
  font-size: ${(props) => props.fontsize || '12px'};
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
`;
const ClickLink = styled.a`
  fill: darkcyan;
`;
const Selection = styled.g`
  .year text{
    font-size: 9px;
    font-family: 'Libre Franklin', sans-serif;
    font-weight: 400;
  }
  .year a{
    fill: ${(props) => props.color || 'black'};
    text-decoration: ${(props) => props.decoration || 'none'};
  }
`;
const TrackButton = styled.g`
  .button rect {
    z-index: 5;
    stroke: gray;
    stroke-width: 0.5;
    stroke-opacity: 0.1;
    z-index: -1;
    x: 460;
    y: 35;
    rx: 1;
    ry: 1;
    width: 115;
    height: 23;
    fill: darkgray;
    fill-opacity: 0.2;
  }
  .button text{
    z-index: 10;
    fill: black;
    fill-opacity: 0.8;
    font-size: 10px;
    font-family: 'Libre Franklin', sans-serif;
    font-weight: 500;
  }
  .button rect:hover{
    fill: gray;
  }
`;
class Graph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id || 1,
      prices: [],
      pop: 0,
      current: { },
      time: 5,
      five: 'black',
      one: 'lightgray',
      fivedec: 'underline',
      onedec: 'none',
    };
    this.showPrice = this.showPrice.bind(this);
    this.selectGraph = this.selectGraph.bind(this);
    this.hidePrice = this.hidePrice.bind(this);
  }

  componentDidMount() {
    ajax({
      url: `${url}/api/estimates/pricing/${this.state.id}`,
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
      url: `http://localhost:3002/api/estimates/houseinfo/${this.state.id}`,
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

  hidePrice(e) {
    const current = this.state.pop;
    const { id } = e.target;
    if (current > 59 || current < 2 || current === 49) {
      this.setState({
        pop: 0,
      });
    } else {
      this.setState({
        pop: id,
      });
    }
  }

  selectGraph(e) {
    const result = Number(e.target.innerHTML[0]);
    if (result === 5) {
      this.setState({
        five: 'black',
        fivedec: 'underline',
        one: 'lightgray',
        onedec: 'none',
        time: 5,
      });
    } else if (result === 1) {
      this.setState({
        one: 'black',
        onedec: 'underline',
        five: 'lightgray',
        fivedec: 'none',
        time: 1,
      });
    }
    this.setState({
      time: result,
    });
  }

  render() {
    let estimates;
    let xaxis;
    let popup;
    if (this.state.prices.length > 0 && this.state.current.price) {
      if (this.state.time === 5) {
        estimates = this.state.prices.map((price, key) => {
          if (price.date_id < 60) {
            const next = this.state.prices[key + 1];
            return (
              <g onMouseOver={this.showPrice} onMouseOut={this.hidePrice}>
                <InvisLine x1={40 + (8 * price.date_id)} x2={40 + (8 * price.date_id)} y1="230" y2="110" id={price.date_id} stroke="white" strokeWidth="6 " position="relative" />
                <GraphLine x1={40 + (8 * price.date_id)} x2={48 + (8 * price.date_id)} y1={250 - (price.price * 0.0001)} y2={250 - (next.price * 0.0001)} />
              </g>
            );
          }
          return (
            <g onMouseOver={this.showPrice} onMouseOut={this.hidePrice}>
              <InvisLine x1={40 + (8 * price.date_id)} x2={40 + (8 * price.date_id)} y1="230" y2="110" id={price.date_id} stroke="white" stroke-width="6" />
            </g>
          );
        });

        const axis = this.state.prices.map((entry, key) => {
          if (key % 12 === 0) {
            return (
              <Xaxis x={entry.date_id * 8 + 32} y="210">{key / 12 + 1 + 2014}</Xaxis>
            );
          }
          return null;
        });
        xaxis = (
          <g>
            {axis}
            <EstimateText>
              <g className="net">
                <text x="40" y="75">
                  <tspan diff={profit(this.state.current.price, this.state.prices[59].price)}>
                    $
                    {formatThousand(this.state.current.price - this.state.prices[59].price)}
                    K
                  </tspan>
                &nbsp;
                since sold in
                &nbsp;
                  {this.state.current.sold_date.toString().substring(0, 4)}
                </text>
              </g>
            </EstimateText>
          </g>
        );
      } else if (this.state.time === 1) {
        const arr = this.state.prices.slice(48, 60);
        estimates = arr.map((price, key) => {
          if (key < 11) {
            const next = arr[key + 1];
            // eslint-disable-next-line no-param-reassign
            key += 1;
            return (
              <g onMouseOver={this.showPrice} onMouseOut={this.hidePrice}>
                <InvisLine x1={(45 * key)} x2={(45 * key)} y1="230" y2="110" id={price.date_id} stroke="white" strokeWidth="12" position="relative" />
                <GraphLine x1={(45 * key)} x2={45 + (45 * key)} y1={250 - (price.price * 0.0001)} y2={250 - (next.price * 0.0001)} />
              </g>
            );
          }
          return (
            <g onMouseOver={this.showPrice} onMouseOut={this.hidePrice}>
              <InvisLine x1={(45 * key) + 45} x2={(45 * key) + 45} y1="230" y2="110" id={price.date_id} stroke="white" stroke-width="12" />
            </g>
          );
        });
        const axis = arr.map((entry, key) => {
          const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec',
          ];
          const id = key + 1;
          if (id % 2 === 0) {
            return (
              <Xaxis x={id * 45 - 10} y="210">{months[key]}</Xaxis>
            );
          }
          return null;
        });
        xaxis = (
          <g>
            {axis}
            <EstimateText>
              <g className="net">
                <text x="40" y="75">
                  <tspan diff={profit(this.state.prices[59].price, this.state.prices[48].price)}>
                    {formatPercent((this.state.prices[59].price - this.state.prices[48].price) / this.state.prices[48].price * 100)}
                    %
                  </tspan>
                &nbsp;
                last 12 months
                </text>
              </g>
            </EstimateText>
          </g>
        );
      }
    } else { estimates = <h2>none</h2>; }

    if (this.state.pop > 0) {
      const temp = this.state.prices[this.state.pop - 1];
      const date = (num) => {
        const months = [
          'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May',
          'Jun', 'Jul', 'Aug', 'Sep',
          'Oct', 'Nov',
        ];
        const obj = {
          year: Math.floor((num - 1) / 12),
          month: num % 12,
        };
        return `${months[obj.month]} 20${15 + obj.year}`;
      };
      if (this.state.time === 5) {
        const top5 = 40 + (8 * temp.date_id);
        popup = (
          <g>
            <line x1={top5} x2={top5} y1="190" y2="110" id={temp.date_id} stroke="darkcyan" strokeWidth="1.25" />
            <PopBox points={box(top5)} />
            <PopText x={top5 - 45} y="78">
              {date(temp.date_id)}
            </PopText>
            <PopText x={top5 - 45} y="92">
              $
              <tspan fontWeight="500">{formatNumber(temp.price)}</tspan>
              &nbsp;
              <tspan fill="gray">Estimate</tspan>
            </PopText>
            <PopCircle cx={top5} cy={250 - (temp.price * 0.0001)} r="3" />
          </g>
        );
      } else {
        const top1 = 45 * (temp.date_id - 48);
        popup = (
          <g>
            <line x1={top1} x2={top1} y1="190" y2="110" id={temp.date_id} stroke="darkcyan" strokeWidth="1.25" />
            <PopBox points={box(top1)} />
            <PopText x={top1 - 45} y="78">
              {date(temp.date_id)}
            </PopText>
            <PopText x={top1 - 45} y="92">
              $
              <tspan fontWeight="500">{formatNumber(temp.price)}</tspan>
              &nbsp;
              <tspan fill="gray">Estimate</tspan>
            </PopText>
            <PopCircle cx={top1} cy={250 - (temp.price * 0.0001)} r="3" />
          </g>
        );
      }
    } else {
      popup = null;
    }
    let infoprice;
    if (this.state.prices.length > 0) {
      infoprice = formatNumber(this.state.prices[59].price);
    } else {
      infoprice = 'None';
    }
    return (
      <div height="730px">
        <svg width="590" height="300" viewBox="0 -90 590 300" preserveAspectRatio="xMinYMin meet">
          {estimates}
          <TrackButton>
            <g className="button">
              <rect tabIndex="-1" />
              <text x="472" y="50">Track This Estimate</text>
            </g>
          </TrackButton>
          <Selection color={this.state.one} className="1" decoration={this.state.onedec} onClick={this.selectGraph}>
            <g className="year">
              <text x="500" y="75"><a href="#">1 year</a></text>
            </g>
          </Selection>
          <Selection color={this.state.five} className="5" decoration={this.state.fivedec} onClick={this.selectGraph}>
            <g className="year">
              <text x="535" y="75"><a href="#">5 years</a></text>
            </g>
          </Selection>
          <HeadText x="35" y="-50" fontsize="18px">
            Redfin Estimate for
            {' '}
            {this.state.current.address1}
          </HeadText>
          <HeadText x="35" y="-20">
            <ClickLink href="#">Edit Home Facts</ClickLink>
            {' '}
            to improve accuracy.
          </HeadText>
          <HeadText x="35" y="10"><ClickLink href="#">Create an Owner Estimate</ClickLink></HeadText>
          <InfoText x="35" y="50">
            $
            {infoprice}
          </InfoText>
          {xaxis}
          <Yaxis x="550" y="192">$600K</Yaxis>
          <Yaxis x="550" y="172">$800K</Yaxis>
          <Yaxis x="550" y="152">$1.0M</Yaxis>
          <Yaxis x="550" y="132">$1.2M</Yaxis>
          <Yaxis x="550" y="112">$1.4M</Yaxis>
          <Yline x1="40" x2="540" y1="190" y2="190" />
          <Yline x1="40" x2="540" y1="170" y2="170" />
          <Yline x1="40" x2="540" y1="150" y2="150" />
          <Yline x1="40" x2="540" y1="130" y2="130" />
          <Yline x1="40" x2="540" y1="110" y2="110" />
          {popup}
        </svg>
      </div>
    );
  }
}

export default Graph;
