import React from 'react';
import Chat from '../components/Chat';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Сhat',
  component: Chat,
};

const Template = args => <Chat {...args} />;

export const Common = Template.bind({});

Common.args = {
  id: '123',
  title: 'First Chat',
  clickHandle: action('Chat clicked'),
};
