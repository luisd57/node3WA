import Passenger from '../models/Passenger.js';

export const getAlivePassengers = async (req, res) => {
    try {
        const passengers = await Passenger.find({ Survived: 1 });
        res.status(200).send(passengers);
    } catch (error) {
        res.status(500).send({ error: 'Server error.' });
    }
};

export const getAliveMen = async (req, res) => {
    try {
        const passengers = await Passenger.find({ Survived: 1, Sex: 'male' });
        res.status(200).send(passengers);
    } catch (error) {
        res.status(500).send({ error: 'Server error.' });
    }
};

export const getAliveWomen = async (req, res) => {
    try {
        const passengers = await Passenger.find({ Survived: 1, Sex: 'female' });
        res.status(200).send(passengers);
    } catch (error) {
        res.status(500).send({ error: 'Server error.' });
    }
};

export const getAllPassengers = async (req, res) => {
    try {
        const passengers = await Passenger.find();
        res.status(200).send(passengers);
    } catch (error) {
        res.status(500).send({ error: 'Server error.' });
    }
};
