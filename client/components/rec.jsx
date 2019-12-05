/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';

const View = styled.div`
  width: 500px;
  height: 300px;
  margin: auto;
  .navigation {
    list-style: none;
    margin: 0;
    background: gray;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-align-content: center;
    -webkit-flex-flow: row wrap;
    justify-content: flex-end;
  }

  .navigation li {
    text-decoration: none;
    margin: auto;
    display: block;
    padding: 1em;
    color: black;
    align-content: center;
    align-text: center;
  }
  .navigation li:hover {
    background: darken(deepskyblue, 50%);
    color: black;
  }
`;
class Rec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      rec: [],
      page: 1,
    };
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
        data.sort((a, b) => {
          if (a.sold_date < b.sold_date) {
            return 1;
          } if (a.sold_date > b.sold_date) {
            return -1;
          }
          return 0;
        });
        this.setState({
          rec: data,
        });
        const group = data[0].group_id;
        ajax({
          url: `/api/estimates/zipcode/${group}`,
          method: 'GET',
          success: (results) => {
            this.setState({
              zipcode: results[0].zipcode,
            });
          },
        });
      },
    });
  }

  render() {
    let image;
    if (this.state.rec.length > 0) {
      image = this.state.rec.map((rec, key) => {
        if(key < 6){
          return(
            <img width = '100' height = '100' src={rec.imgurl} />
          )
        }
      });
    } else {
      image = <h2>No images</h2>;
    }
    return (
      <div>
        <h1>{this.state.zipcode}</h1>
        {image}
        <View>
          <ul className="navigation">
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>
        </View>
      </div>
    );
  }
}

export default Rec;
