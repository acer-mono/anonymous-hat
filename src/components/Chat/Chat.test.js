/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import Chat from './Chat';

const deleteHandler = jest.fn();
const goHandler = jest.fn();
const joinHandler = jest.fn();
const leaveHandler = jest.fn();
const user = { owner: '1', participant: '2', another: '3' };
const chat = {
  id: '08215d6c1f5c2',
  createdAt: '2020-11-19T03:27:30.735Z',
  title: 'Chat',
  userId: '1',
  participants: ['2', '0'],
  isPrivate: false,
};

describe('Chat', () => {
  test('Chat view for owner', () => {
    const component = mount(
      <Chat
        userId={user.owner}
        chat={chat}
        goHandler={goHandler}
        joinHandler={joinHandler}
        deleteHandler={deleteHandler}
        leaveHandler={leaveHandler}
        key={chat.id}
      />,
    );

    const input = component.find('#delete').first();
    input.simulate('click');
    expect(component.text()).toContain(chat.title);
    expect(deleteHandler).toHaveBeenCalled();
  });

  test('Chat view for participant', () => {
    const component = mount(
      <Chat
        userId={user.participant}
        chat={chat}
        goHandler={goHandler}
        joinHandler={joinHandler}
        deleteHandler={deleteHandler}
        leaveHandler={leaveHandler}
        key={chat.id}
      />,
    );

    const input = component.find('button').first();
    input.simulate('click');
    expect(component.text()).toContain(chat.title);
    expect(leaveHandler).toHaveBeenCalled();
  });

  test('Chat view for another user', () => {
    const component = mount(
      <Chat
        userId={user.another}
        chat={chat}
        goHandler={goHandler}
        joinHandler={joinHandler}
        deleteHandler={deleteHandler}
        leaveHandler={leaveHandler}
        key={chat.id}
      />,
    );

    const input = component.find('button').first();
    input.simulate('click');
    expect(component.text()).toContain(chat.title);
    expect(joinHandler).toHaveBeenCalled();
  });
});
