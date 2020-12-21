import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginView from '@/views/LoginView';
import RegistrationView from '@/views/RegistrationView';
import ChatView from '@/views/ChatView';
import ProfileView from '@/views/ProfileView';
import apiService from '@/apiServices';
import ChatSearchView from '@/views/ChatSearchView/ChatSerachView';
import UserSearchView from '@/views/UserSearchView';
import ViewHeader from '@/views/ViewHeader';

class PrivateRoute extends React.Component {
  render() {
    const { user, children, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={routeProps =>
          user ? (
            React.cloneElement(children, { ...routeProps, user })
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: routeProps.location },
              }}
            />
          )
        }
      />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      initDone: false,
    };
    this.updateAuthState = this.updateAuthState.bind(this);
  }

  componentDidMount() {
    this.updateAuthState();
  }

  updateAuthState() {
    return apiService.user
      .getCurrent()
      .then(user => this.setState({ user, initDone: true }))
      .catch(() => this.setState({ user: null, initDone: true }));
  }

  render() {
    const { user, initDone } = this.state;

    if (!initDone) {
      return <>Loading...</>;
    }

    return (
      <>
        <Switch>
          <Route
            path="/login"
            render={routeProps => (
              <ViewHeader title="Авторизация">
                <LoginView updateAuthHandler={this.updateAuthState} {...routeProps} />
              </ViewHeader>
            )}
          />
          <Route
            path="/registration"
            render={routeProps => (
              <ViewHeader title="Регистрация">
                <RegistrationView {...routeProps} />
              </ViewHeader>
            )}
          />
          <PrivateRoute path="/chat/:id" user={user}>
            <ViewHeader title="Чат">
              <ChatView />
            </ViewHeader>
          </PrivateRoute>
          <PrivateRoute path="/profile" user={user}>
            <ViewHeader title="Профиль пользователя">
              <ProfileView />
            </ViewHeader>
          </PrivateRoute>
          <PrivateRoute path="/chatSearch" user={user}>
            <ViewHeader title="Поиск чатов">
              <ChatSearchView />
            </ViewHeader>
          </PrivateRoute>
          <PrivateRoute path="/userSearch" user={user}>
            <ViewHeader title="Поиск пользователей">
              <UserSearchView />
            </ViewHeader>
          </PrivateRoute>
          <Redirect exact from="/" to="/profile" />
        </Switch>
      </>
    );
  }
}

export default App;
