const user = {
  nickname: 'nightwatch' + new Date().getTime(),
  password: 'nightwatch',
  passwordConfirm: 'nightwatche',
};

module.exports = {
  'User can`t register because of password is not confirm': function (browser) {
    browser
      // eslint-disable-next-line
            .url('http://localhost:3000/')
      // eslint-disable-next-line
            .waitForElementVisible('body')
      // eslint-disable-next-line
            .assert.visible('body')
      // eslint-disable-next-line
            .click('a[href="/registration"]')
      // eslint-disable-next-line
            .waitForElementVisible('#register-form')
      // eslint-disable-next-line
            .assert.visible('input[name="nickname"]')
      // eslint-disable-next-line
            .setValue('input[name="nickname"]', user.nickname)
      // eslint-disable-next-line
            .assert.visible('input[name="password"]')
      // eslint-disable-next-line
            .setValue('input[name="password"]', user.password)
      // eslint-disable-next-line
            .assert.visible('input[name="passwordConfirm"]')
      // eslint-disable-next-line
            .setValue('input[name="passwordConfirm"]', user.passwordConfirm)
      // eslint-disable-next-line
            .assert.visible('input[type=submit]')
      // eslint-disable-next-line
            .submitForm('form')
      // eslint-disable-next-line
            .waitForElementVisible('div.errorPasswordConfirm')
      .assert.containsText('div.errorPasswordConfirm', 'Введенные пароли не совпадают')
      .end();
  },

  'User can`t register because of empty nickname': function (browser) {
    browser
      // eslint-disable-next-line
            .url('http://localhost:3000/')
      // eslint-disable-next-line
            .waitForElementVisible('body')
      // eslint-disable-next-line
            .click('a[href="/registration"]')
      .waitForElementVisible('#register-form')
      // eslint-disable-next-line
            .setValue('input[name="nickname"]', '')
      // eslint-disable-next-line
            .setValue('input[name="password"]', user.password)
      // eslint-disable-next-line
            .setValue('input[name="passwordConfirm"]', user.passwordConfirm)
      // eslint-disable-next-line
            .submitForm('form')
      // eslint-disable-next-line
            .waitForElementVisible('div.errorEmptyNickname')
      .assert.containsText('div.errorEmptyNickname', 'Введите никнейм')
      .end();
  },
  'User can`t register because of short password': function (browser) {
    browser
      // eslint-disable-next-line
            .url('http://localhost:3000/')
      // eslint-disable-next-line
            .waitForElementVisible('body')
      // eslint-disable-next-line
            .click('a[href="/registration"]')
      // eslint-disable-next-line
            .waitForElementVisible('#register-form')
      // eslint-disable-next-line
            .setValue('input[name="nickname"]', user.password)
      // eslint-disable-next-line
            .setValue('input[name="password"]', '')
      // eslint-disable-next-line
            .setValue('input[name="passwordConfirm"]', user.passwordConfirm)
      // eslint-disable-next-line
            .submitForm('form')
      // eslint-disable-next-line
            .waitForElementVisible('div.errorShortPassword')
      .assert.containsText('div.errorShortPassword', 'Длина пароля должна быть больше 6 символов')
      .end();
  },
};
