interface Riesgo {
    titulo: string;
    categoria: string;
    gravedad: number;
    fecha: Date;
    ubicacion: Coord;
    userID: string;
    votos?: number;
    duracion?: number;
}

interface Coord {
    latitude: number;
    longitude: number;
}