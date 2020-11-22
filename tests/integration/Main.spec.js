/* eslint-disable */
const user = {
  nickname: 'nightwatch' + new Date().getTime(),
  password: 'nightwatch',
  passwordConfirm: 'nightwatche',
};

module.exports = {
  'User can`t register because of password is not confirm': function (browser) {
    browser
            .url('http://localhost:3000/')
            .waitForElementVisible('body')
            .assert.visible('body')
            .click('a[href="/registration"]')
            .waitForElementVisible('#register-form')
            .assert.visible('input[name="nickname"]')
            .setValue('input[name="nickname"]', user.nickname)
            .assert.visible('input[name="password"]')
            .setValue('input[name="password"]', user.password)
            .assert.visible('input[name="passwordConfirm"]')
            .setValue('input[name="passwordConfirm"]', user.passwordConfirm)
            .assert.visible('input[type=submit]')
            .submitForm('form')
            .waitForElementVisible('div.errorPasswordConfirm')
      .assert.containsText('div.errorPasswordConfirm', 'Введенные пароли не совпадают')
      .end();
  },

  'User can`t register because of empty nickname': function (browser) {
    browser
            .url('http://localhost:3000/')
            .waitForElementVisible('body')
            .click('a[href="/registration"]')
      .waitForElementVisible('#register-form')
            .setValue('input[name="nickname"]', '')
            .setValue('input[name="password"]', user.password)
            .setValue('input[name="passwordConfirm"]', user.passwordConfirm)
            .submitForm('form')
            .waitForElementVisible('div.errorEmptyNickname')
      .assert.containsText('div.errorEmptyNickname', 'Введите никнейм')
      .end();
  },
  'User can`t register because of short password': function (browser) {
    browser
            .url('http://localhost:3000/')
            .waitForElementVisible('body')
            .click('a[href="/registration"]')
            .waitForElementVisible('#register-form')
            .setValue('input[name="nickname"]', user.password)
            .setValue('input[name="password"]', '')
            .setValue('input[name="passwordConfirm"]', user.passwordConfirm)
            .submitForm('form')
            .waitForElementVisible('div.errorShortPassword')
      .assert.containsText('div.errorShortPassword', 'Длина пароля должна быть больше 6 символов')
      .end();
  },
};
