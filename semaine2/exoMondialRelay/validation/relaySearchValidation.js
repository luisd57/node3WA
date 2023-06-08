const Joi = require('joi');

const relaySearchSchema = Joi.object({
    enseigne: Joi.string().uppercase().required(),
    pays: Joi.string().length(2).regex(/^[A-Z]+$/).uppercase().required(),
    ville: Joi.string().required(),
    cp: Joi.string().required(),
});

module.exports = relaySearchSchema;
