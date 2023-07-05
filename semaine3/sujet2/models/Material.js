import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

const Material = mongoose.model('Material', MaterialSchema);

export default Material;
