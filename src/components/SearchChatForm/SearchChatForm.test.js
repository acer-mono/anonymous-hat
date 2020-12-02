import { mount } from 'enzyme/build';
import SearchChatForm from '@/components/SearchChatForm/SearchChatForm';
import React from 'react';

describe('SearchChatForm', () => {
  test('runs callback with proper value', () => {
    const mock = jest.fn();
    const spy = jest.spyOn(SearchChatForm.prototype, 'validate');
    const component = mount(<SearchChatForm handleSubmit={mock} />);
    const searchText = component.find('input[type="text"]');
    const value = { title: 'Search' };
    searchText.simulate('change', {
      persist: () => {},
      target: { value: value.title },
    });
    const input = component.find('button[type="submit"]').first();
    input.simulate('submit');

    expect(spy).toHaveReturnedWith(true);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(value);
  });

  test('runs callback with empty search field', () => {
    const mock = jest.fn();
    const component = mount(<SearchChatForm handleSubmit={mock} />);
    const searchText = component.find('input[type="text"]');
    const value = { title: '' };
    searchText.simulate('change', {
      persist: () => {},
      target: { value: value.title },
    });
    const input = component.find('button[type="submit"]').first();
    input.simulate('submit');

    expect(mock).not.toHaveBeenCalled();
    expect(component.text()).toContain('Введите название чата');
  });
});
