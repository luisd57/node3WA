import Company from '../models/Company.js';

const createCompany = async (req, res) => {
    const { name } = req.body;

    try {
        const company = new Company({ name });
        await company.save();

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export { createCompany };
