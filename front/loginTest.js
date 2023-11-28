module.exports = {
    'Login Page Test': function (browser) {
      browser
        .url('http://localhost:3000/login')
        .waitForElementVisible('.login', 1000)
        .setValue('.custom-input[type=text]', 'user')
        .setValue('.custom-input[type=password]', '123')
        .click('.button')
        .pause(1000)
        .assert.urlEquals('http://localhost:3000/menu')
        .end()
    }
  }
  