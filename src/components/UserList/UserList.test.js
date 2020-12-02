import { shallow } from 'enzyme/build';
import UserList from '@/components/UserList/UserList';
import React from 'react';
import renderer from 'react-test-renderer';

describe('UserList', () => {
  test('add 3 elements', () => {
    const users = [
      { nickname: 'first', id: '1' },
      { nickname: 'second', id: '2' },
      { nickname: 'second', id: '3' },
    ];
    const handler = jest.fn();
    const component = shallow(<UserList list={users} handleClick={handler} />);
    expect(component.find('User')).toHaveLength(3);
  });

  test('add empty array', () => {
    const users = [];
    const handler = jest.fn();
    const component = shallow(<UserList list={users} handleClick={handler} />);
    expect(component.find('User')).toHaveLength(0);
  });

  test('UserList test with snapshot (empty user list)', () => {
    const users = [];
    const handler = jest.fn();
    const component = renderer.create(<UserList list={users} handleClick={handler} />);
    let componentSnapshot = component.toJSON();
    expect(componentSnapshot).toMatchSnapshot();
  });

  test('UserList test with snapshot (user list with 3 messages)', () => {
    const users = [
      { nickname: 'first', id: '1' },
      { nickname: 'second', id: '2' },
      { nickname: 'second', id: '3' },
    ];
    const handler = jest.fn();
    const component = renderer.create(<UserList list={users} handleClick={handler} />);
    let componentSnapshot = component.toJSON();
    expect(componentSnapshot).toMatchSnapshot();
  });
});
