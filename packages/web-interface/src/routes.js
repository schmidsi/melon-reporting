const routes = (module.exports = require('next-routes')());

routes
  .add('report', '/report/:fundAddress/:timeSpanStart/:timeSpanEnd', 'report')
  .add('defaultTimespan', '/report/:fundAddress', 'redirects/toReport');
// .add('noFundAddress', '/report', )
// .add('toReport', '/report', 'browse');
