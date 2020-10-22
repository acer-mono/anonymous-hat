import { shallow } from 'enzyme/build';
import MessagesList from './MessagesList';
import React from 'react';
import renderer from 'react-test-renderer';

describe('MessagesList', () => {
  test('add 3 elements', () => {
    const messages = [
      { user: 'first', message: 'firstMessage' },
      { user: 'second', message: 'secondMessage' },
      { user: 'second', message: 'secondMessage' },
    ];
    const component = shallow(<MessagesList messages={messages} />);
    expect(component.find('Message')).toHaveLength(3);
  });

  test('add empty array', () => {
    const messages = [];
    const component = shallow(<MessagesList messages={messages} />);
    expect(component.find('Message')).toHaveLength(0);
  });

  test('MessageList test with snapshot (empty message list)', () => {
    const messages = [];
    const component = renderer.create(<MessagesList messages={messages} />);
    let componentSnapshot = component.toJSON();
    expect(componentSnapshot).toMatchSnapshot();
  });

  test('MessageList test with snapshot (message list with 3 messages)', () => {
    const messages = [
      { user: 'first', message: 'firstMessage' },
      { user: 'second', message: 'secondMessage' },
      { user: 'second', message: 'secondMessage' },
    ];
    const component = renderer.create(<MessagesList messages={messages} />);
    let componentSnapshot = component.toJSON();
    expect(componentSnapshot).toMatchSnapshot();
  });
});
