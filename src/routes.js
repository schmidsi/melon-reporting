import pathToRegexp from 'path-to-regexp';

const routes = {
  redirect: '/report/:fundAddress/:timeSpanStart?',
  report: '/report/:fundAddress/:timeSpanStart/:timeSpanEnd',
};

const getPath = (route, data) => pathToRegexp.compile(route)(data);

export { getPath, routes };
export default routes;
