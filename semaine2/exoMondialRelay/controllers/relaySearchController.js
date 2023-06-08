const relaySearchService = require('../services/relaySearchService');
const relaySearchSchema = require('../validation/relaySearchValidation');

exports.relaySearch = async (req, res) => {
    const { error } = relaySearchSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        const relayPoints = await relaySearchService.getRelayPoints(req.body);
        res.status(200).json(relayPoints);
    } catch (err) {
        res.status(500).send(err.toString());
    }
};
