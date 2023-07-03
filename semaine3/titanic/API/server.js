import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import passengerRoutes from './routes/passengerRoutes.js';
import config from './config.js';

const app = express();
app.use(express.json());

const { db, session: sessionConfig, app: appConfig } = config;

mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected Successfully'))
    .catch(err => console.log(err));

app.use(session(sessionConfig));

app.use(authRoutes);
app.use('/passengers', passengerRoutes);

app.listen(appConfig.port, () => console.log(`Server started on port ${appConfig.port}`));
