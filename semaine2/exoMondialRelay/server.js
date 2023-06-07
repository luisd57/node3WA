const express = require('express');
const soap = require('soap');
const md5 = require('md5');
const Joi = require('joi');

const app = express();
app.use(express.json());

const url = 'http://api.mondialrelay.com/Web_Services.asmx?wsdl';

const relaySearchSchema = Joi.object({
    enseigne: Joi.string().uppercase().required(),
    pays: Joi.string().length(2).regex(/^[A-Z]+$/).uppercase().required(),
    ville: Joi.string().required(),
    cp: Joi.string().required(),
});

app.post('/relaysearch', async (req, res) => {
    const { error } = relaySearchSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const { enseigne, pays, ville, cp } = req.body;
    const unhashedString = enseigne + pays + ville + cp + "PrivateK";
    const Security = md5(unhashedString).toUpperCase();

    const args = {
        Enseigne: enseigne,
        Pays: pays,
        Ville: ville,
        CP: cp,
        Security
    };

    try {
        const client = await soap.createClientAsync(url);
        const result = await client.WSI3_PointRelais_RechercheAsync(args);
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
