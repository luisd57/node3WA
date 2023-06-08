const soap = require('soap');
const md5 = require('md5');
const { formatData, formatHours } = require('../utils/helpers');

const url = 'http://api.mondialrelay.com/Web_Services.asmx?wsdl';

exports.getRelayPoints = async ({ enseigne, pays, ville, cp }) => {
    const unhashedString = enseigne + pays + ville + cp + "PrivateK";
    const Security = md5(unhashedString).toUpperCase();

    const args = {
        Enseigne: enseigne,
        Pays: pays,
        Ville: ville,
        CP: cp,
        Security
    };

    const client = await soap.createClientAsync(url);
    const result = await client.WSI3_PointRelais_RechercheAsync(args);
    const relayPoints = result[0].WSI3_PointRelais_RechercheResult.PointsRelais.PointRelais_Details;
    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    
    return relayPoints.map(relayPoint => {
        daysOfWeek.forEach(day => {
            relayPoint[`Horaires_${day}`] = formatHours(relayPoint[`Horaires_${day}`]);
        });
        return formatData(relayPoint);
    });
};
