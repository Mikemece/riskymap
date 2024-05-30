import { CustomMarker } from "./CustomMarker";

export const FirebaseMarker = (props: { risk: any }) => {
    
    const riesgo: Riesgo = {
        titulo: props.risk.titulo,
        categoria: props.risk.categoria,
        gravedad: props.risk.gravedad,
        fecha: new Date(props.risk.fecha.seconds * 1000 + props.risk.fecha.nanoseconds / 1000000),
        ubicacion: {latitude: props.risk.ubicacion.latitude, longitude: props.risk.ubicacion.longitude},
        userID: props.risk.userID,
        votos: props.risk.votos,
        color: props.risk.color
    }

    return(
        <CustomMarker 
            coords={riesgo.ubicacion} 
            color={riesgo.color ?? ''} 
            titulo={riesgo.titulo} 
            categoria={riesgo.categoria} 
            fecha={riesgo.fecha}  
            userID={riesgo.userID} 
            votos={riesgo.votos}
            riskID={props.risk.id}
            />
    )
    
};