import React from 'react';
import ReactServer from 'react-dom/server';

const renderAuthPage = (stringifyHTML, initialState) => {
  return `<!doctype html>${ReactServer.renderToStaticMarkup(
    <html>
      <head>
        <title>Andromeda - Login</title>
        <link href="./assets/css/font.css" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/build/style/common.css"/>
        <link rel="stylesheet" type="text/css" href="/build/style/authApp.css"/>
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: stringifyHTML }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)};` }}></script>
        <script src="/build/common.bundle.js"></script>
        <script src="/build/authApp.bundle.js"></script>
      </body>
    </html>
  )}`;
};

export default renderAuthPage; 