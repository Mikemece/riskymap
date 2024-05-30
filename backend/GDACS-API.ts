
export const fetchRisksGDACS = async () => {
    var convert = require('xml-js');
    const response = await fetch('https://gdacs.org/xml/rss.xml');
    const xml = await response.text()
    var res = convert.xml2json(xml, {compact: true, spaces: 4});
    var data = JSON.parse(res);
    return transformData(data.rss.channel.item);
}

const transformData = (data: any) => {
    const transformedData = data.map((event: any) => {
        return {
            titulo: event.title["_text"],
            categoria: event["gdacs:eventtype"]["_text"],
            gravedad: event["gdacs:alertscore"]["_text"],
            fecha: new Date(event.pubDate["_text"]),
            ubicacion: {
                latitude: parseFloat(event["geo:Point"]["geo:lat"]["_text"]),
                longitude: parseFloat(event["geo:Point"]["geo:long"]["_text"])
            },
            userID: 'GDACS',
            color: color(event["gdacs:alertscore"]["_text"])
        }
    });
    return transformedData;
}

const color = (gravedad:number) => {
    switch (true) {
        case ( 0 <= gravedad && gravedad <= 1):
            return 'green';
        case ( 1 < gravedad && gravedad <= 1.5):
            return 'yellow';
        case ( 1.5 < gravedad && gravedad <= 2):
            return 'orange';
        case ( 2 < gravedad && gravedad <= 2.5):
            return 'red';
        default:
            return 'violet';
    }
};