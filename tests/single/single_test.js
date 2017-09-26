module.exports = {
  beforeEach: function (browser, done) {
    if (this.test_settings.selenium_host === 'hub.browserstack.com') {
      return require('nightwatch-browserstack').storeSessionId(browser, done)
    }
    done()
  },
  afterEach: function (browser, done) {
    if (this.test_settings.selenium_host === 'hub.browserstack.com') {
      return require('nightwatch-browserstack').updateStatus(browser, done)
    }
    done()
  },
  'Google\'s Search Functionality' : function (browser) {
    browser
      .url('https://www.google.com/ncr')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'BrowserStack\n')
      .pause(1000)
      .assert.title('BrowserStack - Google Search')
      .end();
  }
};
