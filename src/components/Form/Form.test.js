import { shallow } from 'enzyme/build';
import Form from './Form';
import React from 'react';

const inputText = 'input[type="text"]';
const inputSubmit = 'input[type="submit"]';

describe('Form', () => {
  test('runs callback with proper values', () => {
    const message = 'Message';
    const user = 'Nick';
    const handler = jest.fn();
    const component = shallow(<Form postMessage={handler} />);
    component.find(inputText).simulate('change', { target: { value: user } });
    component.find('textarea').simulate('change', { target: { value: message } });
    component.find(inputSubmit).simulate('click');
    expect(handler).toHaveBeenCalledWith({
      user,
      message,
    });
  });

  test('runs callback with empty user field', () => {
    const message = 'Message';
    const user = '';
    const handler = jest.fn();
    const component = shallow(<Form postMessage={handler} />);
    component.find(inputText).simulate('change', { target: { value: user } });
    component.find('textarea').simulate('change', { target: { value: message } });
    component.find(inputSubmit).simulate('click');
    expect(handler).not.toHaveBeenCalled();
  });

  test('runs callback with empty message field', () => {
    const message = '';
    const user = 'user';
    const handler = jest.fn();
    const component = shallow(<Form postMessage={handler} />);
    component.find(inputText).simulate('change', { target: { value: user } });
    component.find('textarea').simulate('change', { target: { value: message } });
    component.find(inputSubmit).simulate('click');
    expect(handler).not.toHaveBeenCalled();
  });

  test('runs callback with empty fields', () => {
    const message = '';
    const user = '';
    const handler = jest.fn();
    const component = shallow(<Form postMessage={handler} />);
    component.find(inputText).simulate('change', { target: { value: user } });
    component.find('textarea').simulate('change', { target: { value: message } });
    component.find(inputSubmit).simulate('click');
    expect(handler).not.toHaveBeenCalled();
  });
});
