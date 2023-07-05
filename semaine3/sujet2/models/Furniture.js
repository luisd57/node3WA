import mongoose from 'mongoose';

const FurnitureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
});

const Furniture = mongoose.model('Furniture', FurnitureSchema);

export default Furniture;
