import { CustomMarker } from "./CustomMarker";

export const FirebaseMarker = (props: { risk: any }) => {

    const riesgo: Riesgo = {
        titulo: props.risk.titulo,
        categoria: props.risk.categoria,
        gravedad: props.risk.gravedad,
        fecha: new Date(props.risk.fecha.seconds * 1000 + props.risk.fecha.nanoseconds / 1000000),
        ubicacion: {latitude: props.risk.ubicacion.latitude, longitude: props.risk.ubicacion.longitude},
        userID: props.risk.userID,
        votos: 0,
    }

    const color = () => {
        switch (riesgo.gravedad) {
            case 1:
                return 'green';
            case 2:
                return 'yellow';
            case 3:
                return 'orange';
            case 4:
                return 'red';
            default:
                return 'violet';
        }
    };

    return(
        <CustomMarker 
            coords={riesgo.ubicacion} 
            color={color()} 
            titulo={riesgo.titulo} 
            categoria={riesgo.categoria} 
            fecha={riesgo.fecha}  
            userID={riesgo.userID} 
            votos={riesgo.votos}
            riskID={props.risk.id}
            />
    )
    
};