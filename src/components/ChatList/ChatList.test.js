import { shallow } from 'enzyme/build';
import ChatList from '@/components/ChatList';
import React from 'react';

const userId = '1';
describe('ChatList', () => {
  test('add 3 elements', () => {
    const list = [
      {
        id: '1',
        createdAt: '2020-12-19T03:27:30.735Z',
        title: 'Chat1',
        userId: '71510b8acb82f',
        participants: ['1'],
        isPrivate: false,
      },
      {
        id: '2',
        createdAt: '2020-10-19T03:27:30.735Z',
        title: 'Chat2',
        userId: '1',
        participants: ['71510b8acb82f', '1'],
        isPrivate: false,
      },
      {
        id: '3',
        createdAt: '2020-01-19T03:27:30.735Z',
        title: 'Chat3',
        userId: '2',
        participants: ['0', '2'],
        isPrivate: false,
      },
    ];
    const component = shallow(<ChatList userId={userId} list={list} />);
    expect(component.find('Chat')).toHaveLength(3);
  });

  test('add empty array', () => {
    const list = [];
    const component = shallow(<ChatList userId={userId} list={list} />);
    expect(component.find('Chat')).toHaveLength(0);
  });
});
