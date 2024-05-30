import { CustomMarker } from "./CustomMarker";

export const EONETMarker = (props: { risk: any}) => {

    const riesgo: Riesgo = {
        titulo: props.risk.titulo,
        categoria: props.risk.categoria,
        gravedad: props.risk.gravedad,
        fecha: props.risk.fecha,
        ubicacion: { latitude: props.risk.ubicacion.latitude, longitude: props.risk.ubicacion.longitude },
        userID: props.risk.userID,
        color: props.risk.color
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

    return (
        <CustomMarker
            coords={riesgo.ubicacion}
            color={riesgo.color ?? 'navy'}
            titulo={riesgo.titulo}
            categoria={categoria()}
            fecha={riesgo.fecha}
            userID={riesgo.userID}
        />
    )

};