const config = {
    app: {
      port: 3000
    },
    db: {
      host: '127.0.0.1',
      port: 27017,
      name: 'titanicdb'
    },
    session: {
      secret: 'my secret',
      resave: false,
      saveUninitialized: false
    }
  };
  
  export default config;
  