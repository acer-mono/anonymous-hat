import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export default class ViewHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  render() {
    const { title, children, user } = this.props;
    return (
      <>
        <Navbar fixed="top" bg="primary" variant="dark" expand="true">
          <Navbar.Brand>{title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {user ? (
                <>
                  <Link className={styles.link} to="/profile">
                    Мой профиль
                  </Link>
                  <Link className={styles.link} to="/chatSearch">
                    Поиск чатов
                  </Link>
                  <Link className={styles.link} to="/userSearch">
                    Поиск пользователей
                  </Link>
                </>
              ) : (
                <>
                  <Link className={styles.link} to="/login">
                    Логин
                  </Link>
                  <Link className={styles.link} to="/registration">
                    Регистрация
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {React.cloneElement(children, this.props)}
      </>
    );
  }
}

ViewHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
