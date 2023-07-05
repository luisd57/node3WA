import Material from '../models/Material.js';
import Company from '../models/Company.js';

const createMaterial = async (req, res) => {
    const { name, company: companyId, stock } = req.body;

    const allowedMaterials = ['ash', 'oak', 'walnut', 'stainless steel', 'aluminum', 'plastic'];
    const allowedCompanies = ['bbois', 'metalo', 'pplastique'];

    const company = await Company.findById(companyId);

    if (!company) {
        return res.status(400).json({ error: 'Company does not exist' });
    }

    try {
        if (!allowedMaterials.includes(name.toLowerCase()) || !allowedCompanies.includes(company.name.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid material name or company' });
        }

        const material = new Material({ name, company: companyId, stock });
        await material.save();

        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getMaterial = async (req, res) => {
    const { id } = req.params;

    try {
        const material = await Material.findById(id).populate('company');

        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};


export { createMaterial, getMaterial };
