import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config.js';
import authRoutes from './routes/authRoutes.js';
import User from './models/User.js';
import cors from 'cors';

const app = express();

const { db, app: appConfig, session: sessionConfig, google: googleConfig } = config;

app.use(cors());
app.use(express.json());
app.use(session(sessionConfig));

mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected Successfully'))
    .catch(err => console.log(err));

app.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser){
          done(null, currentUser);
        } else{
            new User({
              googleId: profile.id,
              username: profile.displayName,
            }).save().then((newUser) => {
              done(null, newUser);
            });
          }
      });
    }
  )
);

app.use(authRoutes);

app.listen(appConfig.port, () => console.log(`Server started on port ${appConfig.port}`));


// import express from 'express';
// import session from 'express-session';
// import mongoose from 'mongoose';
// import authRoutes from './routes/authRoutes.js';
// import passengerRoutes from './routes/passengerRoutes.js';
// import config from './config.js';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());

// const { db, session: sessionConfig, app: appConfig } = config;

// mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Database Connected Successfully'))
//     .catch(err => console.log(err));

// app.use(session(sessionConfig));

// app.use(authRoutes);
// app.use('/passengers', passengerRoutes);

// app.listen(appConfig.port, () => console.log(`Server started on port ${appConfig.port}`));
