import { CustomMarker } from "./CustomMarker";

export const EONETMarker = (props: { risk: any}) => {

    const riesgo: Riesgo = {
        titulo: props.risk.titulo,
        categoria: props.risk.categoria,
        gravedad: props.risk.gravedad,
        fecha: props.risk.fecha,
        ubicacion: { latitude: props.risk.ubicacion.latitude, longitude: props.risk.ubicacion.longitude },
        userID: props.risk.userID,
    }


    const categoria = () => {
        switch (riesgo.categoria) {
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
    const color = () => {
        switch (true) {
            case (riesgo.gravedad === 0):
                return 'navy';
            case (1 <= riesgo.gravedad && riesgo.gravedad <= 50):
                return 'green';
            case (50 < riesgo.gravedad && riesgo.gravedad <= 200):
                return 'yellow';
            case (201 < riesgo.gravedad && riesgo.gravedad <= 500):
                return 'orange';
            case (501 < riesgo.gravedad && riesgo.gravedad <= 900):
                return 'red';
            default:
                return 'violet';
        }
    };

    return (
        <CustomMarker
            coords={riesgo.ubicacion}
            color={color()}
            titulo={riesgo.titulo}
            categoria={categoria()}
            fecha={riesgo.fecha}
            userID={riesgo.userID}
        />
    )

};