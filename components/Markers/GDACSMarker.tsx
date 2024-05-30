import { CustomMarker } from "./CustomMarker";

export const GDACSMarker = (props: { risk: any }) => {

    const riesgo: Riesgo = {
        titulo: props.risk.titulo,
        categoria: props.risk.categoria,
        gravedad: props.risk.gravedad,
        fecha: props.risk.fecha,
        ubicacion: {latitude: props.risk.ubicacion.latitude, longitude: props.risk.ubicacion.longitude},
        userID: props.risk.userID,
        color: props.risk.color
    }
    const categoria = ()    => {        
        switch (riesgo.categoria) {
            case "WF":
                return "Incendio forestal";
            case "DR":
                return "Sequía";
            case "EQ":
                return "Terremoto";
            case "FL":
                return "Inundación";
            case "TC":
                return "Ciclón tropical";
            case "VO":
                return "Volcán";
            default:
                return "Desconocido";
    }
}

    return(
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