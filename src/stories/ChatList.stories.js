import React from 'react';
import ChatList from '../components/ChatList';
import { action } from '@storybook/addon-actions';

export default {
  title: 'СhatList',
  component: ChatList,
};

const Template = args => <ChatList {...args} />;

export const Common = Template.bind({});

Common.args = {
  userId: '1',
  list: [
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
  ],
  goHandler: action('go'),
  joinHandler: action('join'),
  deleteHandler: action('delete'),
};
