export const fetchRisksEONET = async () => {
    const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events');
    const data = await response.json();

    return transformData(data);
}

const transformData = (data: any) => {
    const transformedData = data.events.map((event: any) => {
        let maxMagnitudeGeometry = event.geometry[0];
        if (maxMagnitudeGeometry.magnitudeValue === null) maxMagnitudeGeometry.magnitudeValue = 0;
        if (event.geometry.length > 1) {
            maxMagnitudeGeometry = event.geometry.reduce((max: any, current: any) => {
                return (max.magnitudeValue > current.magnitudeValue) ? max : current;
            }, event.geometry[0]);
        }
        return {
            titulo: event.title,
            categoria: event.categories[0].id,
            gravedad: maxMagnitudeGeometry.magnitudeValue,
            fecha: new Date(maxMagnitudeGeometry.date),
            ubicacion: {
                latitude: maxMagnitudeGeometry.coordinates[1],
                longitude: maxMagnitudeGeometry.coordinates[0]
            },
            userID: 'EONET',
            color: color(maxMagnitudeGeometry.magnitudeValue)
        }
    });
    return transformedData;
}

const color = (gravedad:number) => {
    switch (true) {
        case (gravedad === 0):
            return 'navy';
        case (1 <= gravedad && gravedad <= 50):
            return 'green';
        case (50 < gravedad && gravedad <= 200):
            return 'yellow';
        case (201 < gravedad && gravedad <= 500):
            return 'orange';
        case (501 < gravedad && gravedad <= 900):
            return 'red';
        default:
            return 'violet';
    }
};