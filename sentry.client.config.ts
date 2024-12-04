// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0d8ecc25119ed85bd2a5a7af06bf76c3@o4508409694257153.ingest.us.sentry.io/4508409717915648",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
