/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
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
  width: 620px;
  height: 250px;
  .navigation {
    align: left;
    margin: 0px;
    padding-left: 0px;
    position: relative;
    list-style: none;
    background: white;
    display: flex;
    left: 10px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: left;
    overflow: hidden;
  }
  #page1 {
    visibility: ${(props) => {
    const temp = props.children.props.children[0];
    if (temp) {
      if (temp[0]) {
        if (temp[0].props.currentpage === 1) {
          return 'visible';
        }
        return 'hidden';
      }
    }
    return 'hidden';
  }
}
  }
  #page2 {
    visibility: ${(props) => {
    const temp = props.children.props.children[0];
    if (temp) {
      if (temp[0]) {
        if (temp[0].props.currentpage === 2) {
          return 'visible';
        }
        return 'hidden';
      }
    }
    return 'hidden';
  }
}
  }
  #page3 {
    visibility: ${(props) => {
    const temp = props.children.props.children[0];
    if (temp) {
      if (temp[0]) {
        if (temp[0].props.currentpage === 3) {
          return 'visible';
        }
        return 'hidden';
      }
    }
    return 'hidden';
  }
}
  }
  img {
    filter: hue-rotate(90deg);
  }
`;
const InfoText = styled.text`
  fill: whitesmoke;
  font-size: 11px;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 500;
  `;
const AddText = styled.text`
  fill: whitesmoke;
  font-size: 9px;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 400;
  `;
const CityText = styled.text`
  fill: silver;
  font-size: 8px;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
  `;
const SoldText = styled.text`
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
const Arrow = styled.g`
  fill: black;
  strokeWidth: 0.1;
  fill-opacity: 0.6;
  transform: translate(155px, 15px);
`;
const Button = styled.g`
  fill: white;
  stroke: rgb(120,120,120);
  stroke-width: 0.3;
  stroke-opacity: 0.6;
  transform: scale(1.555);
`;
const RefCircle = styled.circle`
  r: 9;
  fill: rgb(95,140,201);
  stroke: white;
  stroke-width: 0.9;
`;
const RefText = styled.text`
  font-size: 12px;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 300;
  fill: white;
`;
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
      id: props.id,
    };
    this.separate = this.separate.bind(this);
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    ajax({
      url: `/api/estimates/recentsales/${this.state.id}`,
      method: 'GET',
      success: (data) => {
        const property = Number(this.state.id);
        const data1 = data.filter((entry) => {
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
  }

  click(e) {
    const direction = e.target.parentNode.parentNode.className.baseVal;
    const arr = document.getElementsByTagName('li');
    let pageview;
    if (direction === 'next') {
      pageview = this.state.page;
      pageview += 1;
      this.setState({
        page: pageview,
      });
      arr[2].style.transform = 'translate(-600.5px)';
      arr[3].style.transform = 'translate(-600.5px)';
      arr[4].style.transform = 'translate(-1200px)';
      arr[5].style.transform = 'translate(-1200px)';
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
        let reftext;
        let rightarrow;
        let rating;
        if (rec.rating === 1) {
          rating = <Star x="40" y="113">&#9733;</Star>;
        } else {
          rating = null;
        }
        if (key === 1) {
          reftext = 'B';
          rightarrow = (
            <svg x="110" y="50" className="next">
              <Button>
                <circle cx="110" cy="20" r="10" onClick={this.click} />
              </Button>
              <Arrow>
                <path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z" onClick={this.click} />
              </Arrow>
            </svg>
          );
        } else {
          reftext = 'A';
          rightarrow = null;
        }
        if (key < 6) {
          return (
            <li id="page1" currentpage={this.state.page} className={`item${key.toString()}`}>
              <svg width="300px" height="150px" position="absolute" fill="white" currentpage={this.state.page}>
                <filter id="darken">
                  <feColorMatrix
                    type="matrix"
                    values=".75   0   0   0   0
                             0  .75   0   0   0
                             0   0  .75   0   0
                             0   0   0   1   0 "
                  />
                </filter>
                <image href={rec.imgurl} height="160px" width="300px" filter="url(#darken)" />
                <rect />
                <SoldBox x="27" y="6" rx="1" ry="1" />
                <IconBox x="32" y="109" rx="2" ry="2" />
                <svg x="33" y="110">
                  <Icon>
                    <path d="M256 19.27L25.637 249.638 19.27 256 32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73 492.73 256l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727l-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z" />
                  </Icon>
                </svg>
                <SoldText x="30" y="15">
                  SOLD
                  {' '}
                  {formatSoldDate(rec.sold_date)}
                </SoldText>
                {rating}
                <InfoText x="50" y="120">
                  $
                  {formatNumber(rec.price)}
                </InfoText>
                <AddText x="30" y="133">{rec.address1}</AddText>
                <CityText x="30" y="145">{`${rec.address2.toUpperCase()} ${this.state.zipcode}`}</CityText>
                <AddText x="175" y="133">Beds&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Baths&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sq. Ft.</AddText>
                <InfoText x="180" y="123">{rec.bed}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rec.bath}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rec.sq_ft}</InfoText>
                <line x1="202" x2="202" y1="133" y2="113" stroke="white" strokeWidth="0.8" stroke1="0.8" />
                <line x1="236" x2="236" y1="133" y2="113" stroke="white" strokeWidth="0.8" strokeOpacity="0.8" />
                <RefCircle cx="260" cy="15" />
                <RefText x="255.75" y="19">
                  {reftext}
                </RefText>
                {rightarrow}
              </svg>
            </li>
          );
        }
        return null;
      });
      image2 = this.state.page2.map((rec, key) => {
        let rating;
        let reftext;
        let rightarrow;
        let leftarrow;
        if (rec.rating === 1) {
          rating = <Star x="40" y="113">&#9733;</Star>;
        } else {
          rating = null;
        }
        if (key === 1) {
          reftext = 'D';
          rightarrow = (
            <svg x="110" y="50" className="next">
              <Button>
                <circle cx="110" cy="20" r="10" onClick={this.click} />
              </Button>
              <Arrow>
                <path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z" onClick={this.click} />
              </Arrow>
            </svg>
          );
          leftarrow = null;
        } else {
          reftext = 'C';
          rightarrow = null;
          leftarrow = (
            <svg x="-154" y="50" className="previous">
              <Button>
                <circle cx="110" cy="20" r="10" onClick={this.click} />
              </Button>
              <Arrow>
                <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z" />
              </Arrow>
            </svg>
          );
        }
        if (key < 6) {
          return (
            <li id="page2" currentpage={this.state.page} className={`item${key.toString()}`}>
              <svg width="300px" height="150px" position="absolute" fill="white">
                <filter id="darken">
                  <feColorMatrix
                    type="matrix"
                    values=".75   0   0   0   0
                             0  .75   0   0   0
                             0   0  .75   0   0
                             0   0   0   1   0 "
                  />
                </filter>
                <image href={rec.imgurl} height="160px" width="300px" filter="url(#darken)" />
                <rect />
                <SoldBox x="27" y="6" rx="1" ry="1" />
                <IconBox x="32" y="109" rx="2" ry="2" />
                <svg x="33" y="110">
                  <Icon>
                    <path d="M256 19.27L25.637 249.638 19.27 256 32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73 492.73 256l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727l-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z" />
                  </Icon>
                </svg>
                <SoldText x="30" y="15">
                  SOLD
                  {' '}
                  {formatSoldDate(rec.sold_date)}
                </SoldText>
                {rating}
                <InfoText x="50" y="120">
                  $
                  {formatNumber(rec.price)}
                </InfoText>
                <AddText x="30" y="133">{rec.address1}</AddText>
                <CityText x="30" y="145">{`${rec.address2.toUpperCase()} ${this.state.zipcode}`}</CityText>
                <AddText x="175" y="133">Beds&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Baths&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sq. Ft.</AddText>
                <InfoText x="180" y="123">{rec.bed}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rec.bath}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rec.sq_ft}</InfoText>
                <line x1="202" x2="202" y1="133" y2="113" stroke="white" strokeWidth="0.8" strokeOpacity="0.8" />
                <line x1="236" x2="236" y1="133" y2="113" stroke="white" strokeWidth="0.8" strokeOpacity="0.8" />
                <RefCircle cx="260" cy="15" />
                <RefText x="255.75" y="19">
                  {reftext}
                </RefText>
                {rightarrow}
                {leftarrow}
              </svg>
            </li>
          );
        }
        return null;
      });
      image3 = this.state.page3.map((rec, key) => {
        let rating;
        let leftarrow;
        let reftext;
        if (rec.rating === 1) {
          rating = <Star x="40" y="113">&#9733;</Star>;
        } else {
          rating = null;
        }
        if (key === 0) {
          reftext = 'E';
          leftarrow = (
            <svg x="-154" y="50" className="previous">
              <Button>
                <circle cx="110" cy="20" r="10" onClick={this.click} />
              </Button>
              <Arrow>
                <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z" />
              </Arrow>
            </svg>
          );
        } else {
          reftext = 'F';
          leftarrow = null;
        }
        if (key < 6) {
          return (
            <li id="page3" currentpage={this.state.page} className={`item${key.toString()}`}>
              <svg width="300px" height="150px" position="absolute" fill="white">
                <filter id="darken">
                  <feColorMatrix
                    type="matrix"
                    values=".75   0   0   0   0
                             0  .75   0   0   0
                             0   0  .75   0   0
                             0   0   0   1   0 "
                  />
                </filter>
                <image href={rec.imgurl} height="160px" width="300px" filter="url(#darken)" />
                <rect />
                <SoldBox x="27" y="6" rx="1" ry="1" />
                <IconBox x="32" y="109" rx="2" ry="2" />
                <svg x="33" y="110">
                  <Icon>
                    <path d="M256 19.27L25.637 249.638 19.27 256 32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73 492.73 256l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727l-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z" />
                  </Icon>
                </svg>
                <SoldText x="30" y="15">
                  SOLD
                  {' '}
                  {formatSoldDate(rec.sold_date)}
                </SoldText>
                {rating}
                <InfoText x="50" y="120">
                  $
                  {formatNumber(rec.price)}
                </InfoText>
                <AddText x="30" y="133">{rec.address1}</AddText>
                <CityText x="30" y="145">{`${rec.address2.toUpperCase()} ${this.state.zipcode}`}</CityText>
                <AddText x="175" y="133">Beds&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Baths&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sq. Ft.</AddText>
                <InfoText x="180" y="123">{rec.bed}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rec.bath}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rec.sq_ft}</InfoText>
                <line x1="202" x2="202" y1="133" y2="113" stroke="white" strokeWidth="0.8" strokeOpacity="0.8" />
                <line x1="236" x2="236" y1="133" y2="113" stroke="white" strokeWidth="0.8" strokeOpacity="0.8" />
                <RefCircle cx="260" cy="15" />
                <RefText x="255.75" y="19">
                  {reftext}
                </RefText>
                {leftarrow}
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
