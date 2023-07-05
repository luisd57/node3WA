import Furniture from '../models/Furniture.js';
import Material from '../models/Material.js';

const createFurniture = async (req, res) => {
    const { name, category, materials } = req.body;

    const allowedFurniture = ['wardrobe', 'shelf'];

    let allMaterialsExist;
    try {
        allMaterialsExist = await Promise.all(
            materials.map((materialId) => Material.exists({ _id: materialId }))
        );
    } catch (error) {
        return res.status(400).json({ error: 'Invalid material ID provided' });
    }

    if (allMaterialsExist.includes(false)) {
        return res.status(400).json({ error: 'One or more materials do not exist' });
    }

    try {
        if (!allowedFurniture.includes(category.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid furniture category' });
        }

        const furniture = new Furniture({ name, category, materials });
        await furniture.save();

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
