function isBrowserstackEnvironment (browser) {
    return browser.options.selenium_host === 'hub.browserstack.com'
}

module.exports = {
    storeSessionId: function (browser, done) {
      browser.session(function (session) {
        browser.browserStackSessionId = session.sessionId
        done()
      })
    },
    updateStatus: function (browser, done) {
      if (browser.currentTest.results.failed) {
        let caps = browser.options.desiredCapabilities
        let user = caps['browserstack.user']
        let key = caps['browserstack.key']
        let options = {
          host: 'www.browserstack.com',
          path: `/automate/sessions/${browser.browserStackSessionId}.json`,
          method: 'PUT',
          auth: `${user}:${key}`,
          headers: {'Content-Type': 'application/json'}
        }
        require('https')
          .request(options, function () { done() })
          .on('error', function (error) { throw error })
          .end(JSON.stringify({status: 'error'}))
      } else {
        done()
      }
    }
  }