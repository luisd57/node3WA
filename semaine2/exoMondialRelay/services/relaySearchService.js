const soap = require('soap');
const md5 = require('md5');

const url = 'http://api.mondialrelay.com/Web_Services.asmx?wsdl';

function formatHours(hours) {
    return hours.string
        .filter(time => time !== "0000")
        .map(time => `${time.slice(0, 2)}:${time.slice(2)}`);
}

exports.getRelayPoints = async (data) => {
    const { enseigne, pays, ville, cp } = data;
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
        return relayPoint;
    });
};
