const express = require('express');
const soap = require('soap');
const xml2js = require('xml2js');
const md5 = require('md5');

const app = express();
app.use(express.json());

const url = 'http://api.mondialrelay.com/Web_Services.asmx?wsdl';

app.post('/relaysearch', (req, res) => {
    const args = {
        Enseigne: req.body.enseigne,
        Pays: req.body.pays,
        Ville: req.body.ville,
        CP: req.body.cp,
    };

    const unhashedString =
        args.Enseigne +
        args.Pays +
        args.Ville +
        args.CP +
        "PrivateK";

    const Security = md5(unhashedString).toUpperCase();
    args.Security = Security;

    soap.createClientAsync(url).then((client) => {
        return client.WSI3_PointRelais_RechercheAsync(args);
    }).then((result) => {
        console.log(result);
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).send(err.toString());
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
