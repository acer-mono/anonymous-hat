import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '@/components/User/styles.module.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default class User extends React.Component {
  render() {
    const { id, nickname, handleClick } = this.props;
    return (
      <ListGroup.Item className={styles['li-wrapper']} key={id}>
        <span>{nickname}</span>
        <Button variant="outline-success" onClick={() => handleClick(id)}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </ListGroup.Item>
    );
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
