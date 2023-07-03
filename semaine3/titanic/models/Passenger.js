import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
  PassengerId: Number,
  Survived: Number,
  Pclass: Number,
  Name: String,
  Sex: String,
  Age: Number,
  SibSp: Number,
  Parch: Number,
  Ticket: String,
  Fare: String,
  Embarked: String
}, { collection : 'passengers' });

const Passenger = mongoose.model('Passenger', passengerSchema);
export default Passenger;
