/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';

const View = styled.div`
  width: 600px;
  height: 250px;
  z-index: 1;
  .navigation {
    margin: 5px;
    position: relative;
    list-style: none;
    background: white;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  #page2 {
    display: none;
  }
  #page3 {
    display: none;
  }
  .image img {
    width: 100px;
    height: 200px;
  }
`;
const Buttons = styled.div`
   a {
    text-decoration: none;
    display: inline-block;
    padding: 8px 16px;
    z-index: 100;
    background-color: white;
    border-style: solid;
    border-color: gray;
    border-width: 0.5px;
    width: 10px;
    height: 20px;
    text-align: center;
    vertical-align: middle;
  }
  .previous {
    color: black;
    border-radius: 50%;
    bottom: 70px;
  }
  .next {
    color: black;
    border-radius: 50%;
    bottom: 70px;
  }
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
  }
  click(e) {
    console.log(e.target);
  }

  render() {
    let image1;
    let image2;
    let image3;
    if (this.state.rec.length > 0) {
      image1 = this.state.page1.map((rec, key) => {
        if (key < 6) {
          return (
            <li className="navigation" id="page1"><img width="100" height="100" src={rec.imgurl} /></li>
          );
        }
        return null;
      });
      image2 = this.state.page2.map((rec, key) => {
        if (key < 6) {
          return (
            <li className="navigation" id="page2"><img width="100" height="100" src={rec.imgurl} /></li>
          );
        }
        return null;
      });
      image3 = this.state.page3.map((rec, key) => {
        if (key < 6) {
          return (
            <li className="navigation" id="page3"><img className="image" src={rec.imgurl} /></li>
          );
        }
        return null;
      });
    }
    return (
      <div>
        <View>
          <ul className="navigation">
            <Buttons>
              <a href="#" className="previous" onClick={this.click}>&lt;</a>
            </Buttons>
            {image1}
            {image2}
            {image3}
            <Buttons>
              <a href="#" className="next" onClick={this.click}>&gt;</a>
            </Buttons>
          </ul>
        </View>
        <h1>{this.state.zipcode}</h1>
      </div>
    );
  }
}

export default Rec;
