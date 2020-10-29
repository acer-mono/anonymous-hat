import React from 'react';
import apiServices from '../../apiServices';

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    apiServices.user
      .profile()
      .then(response => response.data)
      .then(user => this.setState({ user }));
  }

  render() {
    return (
      <>
        <h1>Профиль пользователя</h1>
        {this.state.user && (
          <>
            Никнейм: {this.state.user.nickname}
            Создан: {new Date(this.state.user.createdAt).toLocaleString()}
          </>
        )}
      </>
    );
  }
}
