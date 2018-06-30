import { default as routes, Router } from '../../routes';

const Redirecter = () => <div />;

Redirecter.getInitialProps = async ({ query, res }) => {
  const target = routes.findByName('browse').toPath();

  if (res) {
    res.redirect(target);
  } else {
    Router.push(target);
  }

  return {};
};

export default Redirecter;
