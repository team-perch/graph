/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/app.jsx';
import Rec from '../client/components/rec.jsx';
import Graph from '../client/components/graph.jsx';

describe('App test with enzyme and jest', () => {
  it('App renders child components without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Graph />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<Rec />)).toEqual(true);
  });
  it('Graph renders graph element properly', () => {
    const wrapper = shallow(<Graph />);
    const child = wrapper.children();
    expect(child.length).toBe(1);
    expect(child.children().containsAllMatchingElements([<svg />]));
    expect(child.children().children().containsAllMatchingElements([<text />, <line />]));
    console.log(wrapper.debug());
  });
});
