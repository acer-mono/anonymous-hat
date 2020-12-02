import React from 'react';
import { mount } from 'enzyme';
import Message from './Message';
import renderer from 'react-test-renderer';

describe('Message', () => {
  test('Message shows nick and message', () => {
    const nick = 'test';
    const message = 'test';

    const component = mount(<Message user={nick} message={message} />);
    expect(component.text()).toContain(nick);
    expect(component.text()).toContain(message);
  });

  test('Message test with snapshot', () => {
    const user = 'test';
    const message = 'test';

    const component = renderer.create(<Message user={user} message={message} />);
    let componentSnapshot = component.toJSON();
    expect(componentSnapshot).toMatchSnapshot();
  });
});
