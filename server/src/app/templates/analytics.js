import React from 'react';
import ReactServer from 'react-dom/server';

const renderAnalyticsPage = (stringifyHTML, initialState) => {
  return `<!doctype html>${ReactServer.renderToStaticMarkup(
    <html>
      <head>
        <title>Andromeda - Analytics</title>
        <link href="./assets/css/font.css" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/build/style/common.css" />
        <link rel="stylesheet" type="text/css" href="/build/style/analyticsApp.css" />
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBnkZGjyuESiZ6_WdjRU3locmTgm5IeVDM"></script>
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: stringifyHTML }} />
        <script type="text/javascript" src="/build/common.bundle.js"></script>
        <script type="text/javascript" src="/build/analyticsApp.bundle.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)};` }}></script>
      </body>
    </html>
  )}`;
};

export default renderAnalyticsPage;