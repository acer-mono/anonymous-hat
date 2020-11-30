import React from 'react';
import PropTypes from 'prop-types';
import User from '@/components/User';

export default class UserList extends React.Component {
  render() {
    const { list, handleClick } = this.props;
    return (
      <ul className="list-group">
        {list.map(user => (
          <User id={user.id} nickname={user.nickname} key={user.id} handleClick={handleClick} />
        ))}
      </ul>
    );
  }
}

UserList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
    }),
  ),
  handleClick: PropTypes.func.isRequired,
};
