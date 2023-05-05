import React from 'react';
import { shallow } from 'enzyme';
import AddService from '../components/AddService';
import '../setupTests'

describe('AddService', () => {
  
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<AddService />);
  });

  it('renders the component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders the form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('renders the input fields for make and model', () => {
    expect(wrapper.find('input[type="text"]')).toHaveLength(2);
  });

  it('renders the Add Service button', () => {
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
  });

  it('sets the state when the input fields change', () => {
    const descriptionInput = wrapper.find('input').at(0);
    const costInput = wrapper.find('input').at(1);
    
    descriptionInput.simulate('change', { target: { value: 'Oil' } });
    costInput.simulate('change', { target: { value: '10.00' } });
  
    expect(wrapper.find('input').at(0).prop('value')).toEqual('Oil');
    expect(wrapper.find('input').at(1).prop('value')).toEqual('10.00');
  });
    
});
