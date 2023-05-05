import React from 'react';
import { shallow } from 'enzyme';
import AddFuel from '../components/FuelUp';
import '../setupTests'

describe('AddFuel', () => {
  
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<AddFuel />);
  });

  it('renders the component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders the form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('renders the input fields for Kilometers driven and Litres, Cost and Calcualte Fuel Economy', () => {
    expect(wrapper.find('input[type="text"]')).toHaveLength(4);
  });

  it('renders the Add Fuel Up button', () => {
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
  });

  it('sets the state when the input fields change', () => {
    const kmDrivenInput = wrapper.find('input').at(0);
    const LitresInput = wrapper.find('input').at(1);
    const CostInput = wrapper.find('input').at(2);

    kmDrivenInput.simulate('change', { target: { value: '100.00' } });
    LitresInput.simulate('change', { target: { value: '10.00' } });
    CostInput.simulate('change', { target: { value: '15.00' } });
  
    expect(wrapper.find('input').at(0).prop('value')).toEqual('100.00');
    expect(wrapper.find('input').at(1).prop('value')).toEqual('10.00');
    expect(wrapper.find('input').at(2).prop('value')).toEqual('15.00');


  });
    
});
