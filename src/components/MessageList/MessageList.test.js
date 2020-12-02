import { shallow } from 'enzyme/build';
import MessagesList from '@/components/MessageList';
import React from 'react';
import renderer from 'react-test-renderer';

describe('MessagesList', () => {
  test('add 3 elements', () => {
    const messages = [
      { nickname: 'first', content: 'firstMessage', id: 1 },
      { nickname: 'second', content: 'secondMessage', id: 2 },
      { nickname: 'second', content: 'secondMessage', id: 3 },
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
      { nickname: 'first', content: 'firstMessage', id: 1 },
      { nickname: 'second', content: 'secondMessage', id: 2 },
      { nickname: 'second', content: 'secondMessage', id: 3 },
    ];
    const component = renderer.create(<MessagesList messages={messages} />);
    let componentSnapshot = component.toJSON();
    expect(componentSnapshot).toMatchSnapshot();
  });
});
