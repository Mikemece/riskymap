import { CustomMarker } from "./CustomMarker";

export const APIMarker = (props: { risk: any}) => {

    const riesgo: Riesgo = {
        titulo: props.risk.titulo,
        categoria: props.risk.categoria,
        gravedad: props.risk.gravedad,
        fecha: props.risk.fecha,
        ubicacion: { latitude: props.risk.ubicacion.latitude, longitude: props.risk.ubicacion.longitude },
        userID: props.risk.userID,
        color: props.risk.color
    }
    return (
        <CustomMarker
            coords={riesgo.ubicacion}
            color={riesgo.color ?? 'navy'}
            titulo={riesgo.titulo}
            categoria={riesgo.categoria}
            fecha={riesgo.fecha}
            userID={riesgo.userID}
        />
    )

};