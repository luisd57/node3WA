import Company from '../models/Company.js';

const createCompany = async (req, res) => {

    const { name } = req.body;

    const allowedCompanies = ['bbois', 'metalo', 'pplastique'];

    try {
        if (!allowedCompanies.includes(name.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid company name' });
        }
        
        const company = new Company({ name });
        await company.save();

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export { createCompany };
