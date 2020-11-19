import React from 'react';
import Chat from '../components/Chat';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Сhat',
  component: Chat,
};

const Template = args => <Chat {...args} />;

const chat = {
  id: '08215d6c1f5c2',
  createdAt: '2020-11-19T03:27:30.735Z',
  title: 'Chat',
  userId: '71510b8acb82f',
  participants: ['71510b8acb82f', '1'],
  isPrivate: false,
};

export const Owner = Template.bind({});
Owner.args = {
  userId: '71510b8acb82f',
  chat,
  goHandler: action('Go'),
  joinHandler: action('Join'),
  deleteHandler: action('Delete'),
};

export const Participant = Template.bind({});
Participant.args = {
  userId: '1',
  chat,
  goHandler: action('Go'),
  joinHandler: action('Join'),
  deleteHandler: action('Delete'),
};

export const Another = Template.bind({});
Another.args = {
  userId: '2',
  chat,
  goHandler: action('Go'),
  joinHandler: action('Join'),
  deleteHandler: action('Delete'),
};
