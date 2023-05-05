import React from 'react';
import { shallow } from 'enzyme';
import AddCar from '../components/AddCar';
import '../setupTests'

describe('AddCar', () => {
  
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<AddCar />);
  });

  it('renders the component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders the form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('renders the input fields for make and model', () => {
    expect(wrapper.find('input[type="text"][maxLength="50"]')).toHaveLength(2);
  });

  it('renders the select fields for year, fuel type, and engine', () => {
    expect(wrapper.find('select')).toHaveLength(3);
  });

  it('renders the Add Car button', () => {
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
  });

  it('sets the state when the input fields change', () => {
    const makeInput = wrapper.find('input').at(0);
    const modelInput = wrapper.find('input').at(1);
    
    makeInput.simulate('change', { target: { value: 'Honda' } });
    modelInput.simulate('change', { target: { value: 'Civic' } });
  
    expect(wrapper.find('input').at(0).prop('value')).toEqual('Honda');
    expect(wrapper.find('input').at(1).prop('value')).toEqual('Civic');
  });
    
});
