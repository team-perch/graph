import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/app.jsx';
import Graph from '../client/components/graph.jsx';
import Rec from '../client/components/rec.jsx'


describe('App test with enzyme and jest', () => {
  it('renders child components without crashing', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.containsMatchingElement(<Graph></Graph>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<Rec></Rec>)).toEqual(true);
   });
});