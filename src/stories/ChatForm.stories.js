import React from 'react';
import ChatForm from '../components/ChatForm';
import { action } from '@storybook/addon-actions';

export default {
  title: 'СhatForm',
  component: ChatForm,
};

const Template = args => <ChatForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  handleSubmit: action('submit'),
};
