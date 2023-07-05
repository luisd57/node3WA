import Material from '../models/Material.js';

const createMaterial = async (req, res) => {
    const { name, company } = req.body;

    try {
        const material = new Material({ name, company });
        await material.save();

        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export { createMaterial };
