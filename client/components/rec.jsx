/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';

function formatSoldDate(string) {
  const { length } = string;
  const day = string.substring(length - 2, length);
  const month = string.substring(length - 4, length - 3);
  const year = string.substring(0, 4);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec',
  ];
  return `${months[Number(month) + 1].toUpperCase()} ${day},${year}`;
}
const View = styled.div`
  width: 580px;
  height: 250px;
  align: left;
  .navigation {
    align: left;
    margin: 5px;
    padding-left: 0px;
    position: relative;
    list-style: none;
    background: white;
    display: flex;
    left: 20px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
  }
  #page1 {
  }
  #page2 {
  }
  #page3 {
  }
  img {
    filter: hue-rotate(90deg);
  }
`;
const InfoText = styled.text`
  fill: whitesmoke;
  font-size: 8px;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 500;
  `;
const SoldBox = styled.rect`
  width: 80;
  height: 12;
  fill: rgb(95,140,201);
`;
const Icon = styled.g`
  fill: white;
  transform: scale(0.02);
`;
const IconBox = styled.rect`
  height: 12;
  width: 12;
  fill: rgb(95,140,201);
`;
const Star = styled.text`
  font-size: 10px;
  fill: rgb(254,184,64);
`;
// const Buttons = styled.div`
//    a {
//     text-decoration: none;
//     display: inline-block;
//     padding: 7px 14px;
//     z-index: 100;
//     background-color: white;
//     border-style: solid;
//     border-color: silver;
//     border-width: 0.5px;
//     text-align: center;
//     vertical-align: middle;
//     position: absolute;
//     width: 1%;
//     opacity: 0.5;
//   }
//   .previous {
//     color: black;
//     border-radius: 50%;
//     bottom: 60px;
//     left: -19px;
//   }
//   .next {
//     color: black;
//     border-radius: 50%;
//     bottom: 60px;
//     left: 540px;
//   }
// `;
class Rec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      rec: [],
      page: 1,
      page1: [],
      page2: [],
      page3: [],
    };
    this.separate = this.separate.bind(this);
    this.click = this.click.bind(this);
  }

  componentDidMount() {
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
      success: (data) => {
        const data1 = data.filter((entry) => {
          const property = Number(window.location.pathname[1]);
          if (entry.property_id === property) {
            return null;
          }
          return entry;
        });
        const data2 = data1.sort((a, b) => {
          if (a.sold_date < b.sold_date) {
            return 1;
          } if (a.sold_date > b.sold_date) {
            return -1;
          }
          return 0;
        });
        this.setState({
          rec: data2,
        });
        const group = data2[0].group_id;
        ajax({
          url: `/api/estimates/zipcode/${group}`,
          method: 'GET',
          success: (results) => {
            this.setState({
              zipcode: results[0].zipcode,
            });
            this.separate();
          },
        });
      },
    });
  }

  separate() {
    const arr = this.state.rec;
    const page1 = [arr[0], arr[1]];
    const page2 = [arr[2], arr[3]];
    const page3 = [arr[4], arr[5]];
    this.setState({
      page1,
      page2,
      page3,
    });
    console.log(this.state.page1[0].rating);
  }

  click(e) {
    const direction = e.target.className;
    let pageview;
    if (direction === 'next') {
      pageview = this.state.page;
      pageview += 1;
      this.setState({
        page: pageview,
      });
    } else if (direction === 'previous') {
      pageview = this.state.page;
      pageview -= 1;
      this.setState({
        page: pageview,
      });
    }
  }

  render() {
    let image1;
    let image2;
    let image3;
    if (this.state.rec.length > 0) {
      image1 = this.state.page1.map((rec, key) => {
        let rating;
        if(rec.rating === 1){
          rating = <Star x="40" y="112">&#9733;</Star>
        } else{
          rating = null
        }
        if (key < 6) {
          return (
            <li id="page1">
              <svg width="275px" height="150px" position="absolute" fill="white">
                <filter id="darken">
                  <feColorMatrix
                    type="matrix"
                    values=".75   0   0   0   0
                             0  .75   0   0   0
                             0   0  .75   0   0
                             0   0   0   1   0 "
                  />
                </filter>
                <image href={rec.imgurl} height="200px" width="375px" filter="url(#darken)" />
                <rect />
                <SoldBox x="27" y="6" rx="2" ry="2" />
                <IconBox x='32' y='109' rx="2" ry="2"/>
                <svg x='33' y='110'>
                  <Icon >
                    <path d="M256 19.27L25.637 249.638 19.27 256 32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73 492.73 256l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727l-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z"/>
                  </Icon>
                </svg>
                <InfoText x="30" y="15">
                  SOLD
                  {' '}
                  {formatSoldDate(rec.sold_date)}
                </InfoText>
                {rating}
                <InfoText></InfoText>
              </svg>
            </li>
          );
        }
        return null;
      });
      image2 = this.state.page2.map((rec, key) => {
        if (key < 6) {
          return (
            <li id="page2">
              <svg width="275px" height="150px" position="absolute" fill="white">
                <filter id="darken">
                  <feColorMatrix
                    type="matrix"
                    values=".75   0   0   0   0
                             0  .75   0   0   0
                             0   0  .75   0   0
                             0   0   0   1   0 "
                  />
                </filter>
                <image href={rec.imgurl} height="200px" width="375px" filter="url(#darken)" />
                <InfoText x="30" y="15">
                  SOLD
                  {' '}
                  {formatSoldDate(rec.sold_date)}
                </InfoText>
              </svg>
            </li>
          );
        }
        return null;
      });
      image3 = this.state.page3.map((rec, key) => {
        if (key < 6) {
          console.log(rec);
          return (
            <li id="page3">
              <svg width="275px" height="150px" position="absolute" fill="white">
                <filter id="darken">
                  <feColorMatrix
                    type="matrix"
                    values=".75   0   0   0   0
                             0  .75   0   0   0
                             0   0  .75   0   0
                             0   0   0   1   0 "
                  />
                </filter>
                <image href={rec.imgurl} height="200px" width="375px" filter="url(#darken)" />
                <InfoText x="30" y="15">
                  SOLD
                  {' '}
                  {formatSoldDate(rec.sold_date)}
                </InfoText>
              </svg>
            </li>
          );
        }
        return null;
      });
    }
    return (
      <div>
        <View>
          <ul className="navigation">
            {image1}
            {image2}
            {image3}
          </ul>
        </View>
      </div>
    );
  }
}

export default Rec;
