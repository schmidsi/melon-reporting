import Document, { Head, Main, NextScript } from 'next/document';

import global from '../components/global.css';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body className={global.body}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
