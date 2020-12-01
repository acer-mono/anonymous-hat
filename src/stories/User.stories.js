import React from 'react';
import User from '@/components/User';
import { action } from '@storybook/addon-actions';

export default {
  title: 'User',
  component: User,
};

const Template = args => <User {...args} />;

export const Main = Template.bind({});
Main.args = {
  id: '71510b8acb82f',
  nickname: 'Iosif',
  handleClick: action('click'),
};
