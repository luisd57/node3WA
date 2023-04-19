const dotenv = require('dotenv');
dotenv.config();


if (process.env.APP_ENV === 'production') {
    console.log("Je suis en production");
} else {
    console.log("Je suis en développement");
}
