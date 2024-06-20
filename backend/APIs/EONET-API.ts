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
            categoria: categoria(event.categories[0].id),
            gravedad: gravedad(maxMagnitudeGeometry.magnitudeValue),
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

const gravedad = (gravedad:number) => {
    switch (true) {
        case (gravedad === 0):
            return 'Desconocida';
        case (1 <= gravedad && gravedad <= 50):
            return 'Muy baja';
        case (50 < gravedad && gravedad <= 200):
            return 'Baja';
        case (201 < gravedad && gravedad <= 500):
            return 'Moderada';
        case (501 < gravedad && gravedad <= 900):
            return 'Alta';
        default:
            return 'Extrema';
    }
}

const categoria = (categoria:string) => {
    switch (categoria) {
        case "severeStorms":
            return "Tormenta severa";
        case "seaLakeIce":
            return "Hielo en mares y lagos";
        case "volcanoes":
            return "Volcán";
        case "wildfires":
            return "Incendio forestal";
        case "drought":
            return "Sequía";
        case "dustHaze":
            return "Polvo y neblina";
        case "earthquakes":
            return "Terremoto";
        case "floods":
            return "Inundación";
        case "landslides":
            return "Deslizamiento de tierra";
        case "manmade":
            return "Causado por el hombre";
        case "snow":
            return "Nieve";
        case "tempExtremes":
            return "Temperaturas extremas";
        case "waterColor":
            return "Color del agua";
        default:
            return "Desconocido";
    }
}