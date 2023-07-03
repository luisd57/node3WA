import express from 'express';
import mongoose from 'mongoose';

const app = express();

const Cat = mongoose.model('Cat', ({
    name: String,
    age: Number
}));

mongoose.connect('mongodb://127.0.0.1:27017/catdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => console.log('Could not connect to MongoDB: ', error));


app.get("/save", async (req, res) => {
    try {
        const cat = new Cat({ name: "Nara", age: 3 });
        const result = await cat.save();
        console.log(result);        
        res.status(201).send("Saved!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});