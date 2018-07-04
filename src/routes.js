const routes = (module.exports = require('next-routes')());

routes
  .add('report', '/report/:fundAddress/:timeSpanStart/:timeSpanEnd', 'Report')
  .add(
    'defaultTimespan',
    '/report/:fundAddress/:timeSpanStart?',
    'redirects/toReport',
  )
  .add('noFundAddress', '/report', 'redirects/toBrowse')
  .add('root', '/', 'redirects/toBrowse')
  .add('browse', '/browse', 'Browse');
