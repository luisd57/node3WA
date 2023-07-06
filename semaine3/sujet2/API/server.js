import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import furnitureRoutes from './routes/furnitureRoutes.js';

dotenv.config();
const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch((err) => console.log('MongoDB connection error: ', err));

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000 //2 hours
      }
}));

app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/material', materialRoutes);
app.use('/furniture', furnitureRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
