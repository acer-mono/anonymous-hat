import React from 'react';
import PropTypes from 'prop-types';
import User from '@/components/User';
import ListGroup from 'react-bootstrap/ListGroup';

export default class UserList extends React.Component {
  render() {
    const { list, handleClick } = this.props;
    return (
      <ListGroup>
        {list.map(user => (
          <User id={user.id} nickname={user.nickname} key={user.id} handleClick={handleClick} />
        ))}
      </ListGroup>
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
