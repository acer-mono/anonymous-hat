import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

export default class User extends React.Component {
  render() {
    const { id, nickname, handleClick } = this.props;
    return (
      <div key={id} className="list-group-item">
        <div className={styles['li-wrapper']}>
          <span>{nickname}</span>
          <button className="btn btn-outline-success" onClick={() => handleClick(id)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
