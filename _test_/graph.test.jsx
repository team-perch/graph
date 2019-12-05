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
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.children().children().containsAllMatchingElements([<svg />]));
    expect(wrapper.children().children().children().containsAllMatchingElements([<g />, <text />, <line />]));
    console.log(wrapper.debug());
  });
});
