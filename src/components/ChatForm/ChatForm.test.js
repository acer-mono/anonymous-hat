/* eslint-disable */
import { mount } from 'enzyme/build';
import ChatForm from '@/components/ChatForm/ChatForm';
import React from 'react';

describe('ChatForm', () => {
  test('runs callback with proper value', () => {
    const mock = jest.fn();
    const component = mount(<ChatForm handleSubmit={mock} />);
    const searchText = component.find('input[type="text"]');
    const value = 'Create';
    searchText.simulate('change', {
      persist: () => {},
      target: { value },
    });
    const input = component.find('button[type="submit"]').first();
    input.simulate('submit');

    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('runs callback with empty create field', () => {
    const mock = jest.fn();
    const component = mount(<ChatForm handleSubmit={mock} />);
    const searchText = component.find('input[type="text"]');
    const value = '';
    searchText.simulate('change', {
      persist: () => {},
      target: { value },
    });
    const input = component.find('button[type="submit"]').first();
    input.simulate('submit');

    expect(mock).toHaveBeenCalledTimes(0);
  });

  test('create private chat', () => {
    const mock = jest.fn();
    const component = mount(<ChatForm handleSubmit={mock} />);
    const searchText = component.find('input[type="text"]');
    const isPrivate = component.find('input[type="checkbox"]');
    const value = { isPrivate: true, title: 'create' };
    searchText.simulate('change', {
      persist: () => {},
      target: { value: value.title },
    });
    isPrivate.simulate('change', {
      persist: () => {},
      target: { checked: value.isPrivate },
    });
    const input = component.find('button[type="submit"]').first();
    input.simulate('submit');

    expect(mock).toHaveBeenCalledWith(value);
  });
});
