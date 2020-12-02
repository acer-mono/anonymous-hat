import React from 'react';
import { mount } from 'enzyme';
import User from '@/components/User/User';
import renderer from 'react-test-renderer';

describe('User', () => {
  test('User shows nick', () => {
    const nick = 'test';
    const id = '1';
    const handle = jest.fn();

    const component = mount(<User nickname={nick} id={id} handleClick={handle} />);
    expect(component.text()).toContain(nick);
  });

  test('User start dialog', () => {
    const nick = 'test';
    const id = '1';
    const handle = jest.fn();

    const component = mount(<User nickname={nick} id={id} handleClick={handle} />);

    const startDialog = component.find('button');
    startDialog.simulate('click');

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenCalledWith(id);
  });

  test('User test with snapshot', () => {
    const nick = 'test';
    const id = '1';
    const handle = jest.fn();

    const component = renderer.create(<User nickname={nick} id={id} handleClick={handle} />);
    let componentSnapshot = component.toJSON();
    expect(componentSnapshot).toMatchSnapshot();
  });
});
