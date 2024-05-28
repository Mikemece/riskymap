import { CustomMarker } from "./CustomMarker";

export const GDACSMarker = (props: { risk: any }) => {

    const riesgo: Riesgo = {
        titulo: props.risk.titulo,
        categoria: props.risk.categoria,
        gravedad: props.risk.gravedad,
        fecha: props.risk.fecha,
        ubicacion: {latitude: props.risk.ubicacion.latitude, longitude: props.risk.ubicacion.longitude},
        userID: props.risk.userID,
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
    const color = () => {
        switch (true) {
            case ( 0 <= riesgo.gravedad && riesgo.gravedad <= 1):
                return 'green';
            case ( 1 < riesgo.gravedad && riesgo.gravedad <= 1.5):
                return 'yellow';
            case ( 1.5 < riesgo.gravedad && riesgo.gravedad <= 2):
                return 'orange';
            case ( 2 < riesgo.gravedad && riesgo.gravedad <= 2.5):
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
            categoria={categoria()} 
            fecha={riesgo.fecha}  
            userID={riesgo.userID} 
            />
    )
    
};