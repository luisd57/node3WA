const config = {
  app: {
    port: 3000
  },
  db: {
    host: '127.0.0.1',
    port: 27017,
    name: 'titanicdb'
  },
  google: {
    clientID: '365282364182-m0701j862f3dnm3ak68rc21l2m0u5fma.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  session: {
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
  }
};

export default config;
