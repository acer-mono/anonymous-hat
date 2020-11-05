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
  list: [
    {
      id: '1',
      title: 'First Chat',
    },
    {
      id: '2',
      title: 'Second Chat',
    },
    {
      id: '3',
      title: 'Third Chat',
    },
  ],
  clickHandle: action('Chatlist choose'),
};

export const EmptyList = Template.bind({});

EmptyList.args = {
  list: [],
  clickHandle: action('Chatlist choose'),
};
