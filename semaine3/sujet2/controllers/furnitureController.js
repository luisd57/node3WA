import Furniture from '../models/Furniture.js';
import Material from '../models/Material.js';

const createFurniture = async (req, res) => {
    const { name, category, materials } = req.body;

    const allowedCategory = ['wardrobe', 'shelf'];

    let materialsData;
    try {
        materialsData = await Material.find({
            _id: { $in: materials },
        });

        for (let material of materialsData) {
            if (material.stock <= 0) {
                return res.status(400).json({
                    error: `Insufficient stock for material with id ${material._id}`,
                });
            }
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid material ID provided' });
    }

    try {
        if (!allowedCategory.includes(category.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid furniture category' });
        }

        const furniture = new Furniture({ name, category, materials });
        await furniture.save();

        // Decrement stock of each material
        for (let material of materialsData) {
            material.stock -= 1;
            await material.save();
        }


        res.status(200).json(furniture);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const listFurniture = async (req, res) => {
    try {
        const furniture = await Furniture.find().populate({
            path: 'materials',
            populate: { path: 'company' },
        });

        res.status(200).json(furniture);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getFurnitureDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const furniture = await Furniture.findById(id).populate({
            path: 'materials',
            populate: { path: 'company' },
        });

        res.status(200).json(furniture);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export { createFurniture, listFurniture, getFurnitureDetails };
