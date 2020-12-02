/* eslint-disable */
import { mount } from 'enzyme/build';
import { waitFor } from '@testing-library/react';
import Form from './Form';
import React from 'react';

describe('Form', () => {
  test('runs callback with proper values', async () => {
    const mock = jest.fn();
    const component = mount(<Form postMessage={mock} />);
    const messageControl = component.find('textarea[name="content"]');
    const value = 'Message';

    await waitFor(() =>
      messageControl.simulate('change', {
        persist: () => {},
        target: { name: 'content', value },
      }),
    );
    const input = component.find('input[type="submit"]').first();
    await waitFor(() => input.simulate('submit'));

    expect(mock).toHaveBeenCalledTimes(1);
  });

  test('runs callback with empty message field', async () => {
    const value = '';
    const mock = jest.fn();
    const component = mount(<Form postMessage={mock} />);
    const messageControl = component.find('textarea[name="content"]');
    await waitFor(() =>
      messageControl.simulate('change', {
        persist: () => {},
        target: { name: 'content', value },
      }),
    );
    const input = component.find('input[type="submit"]').first();
    await waitFor(() => input.simulate('submit'));

    expect(component.text()).toContain('Сообщение не может быть пустым');
    expect(mock).not.toHaveBeenCalled();
  });
});
