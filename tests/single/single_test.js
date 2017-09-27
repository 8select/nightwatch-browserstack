module.exports = {
  beforeEach: function (browser, done) {
    return require('nightwatch-browserstack').storeSessionId(browser, done)
  },
  afterEach: function (browser, done) {
    return require('nightwatch-browserstack').updateStatus(browser, done)
  },
  'Google\'s Search Functionality' : function (browser) {
    browser
      .url('https://www.google.com/ncr')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'BrowserStack\n')
      .pause(1000)
      .assert.title('BrowserStack - Google Search this will fail')
      .end();
  }
};
