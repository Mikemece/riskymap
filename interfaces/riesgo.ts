interface Riesgo {
    titulo: string;
    categoria: string;
    gravedad: number;
    fecha: Date;
    ubicacion: Coord;
    userID: string;
    votos?: number;
    fechaCierre?: Date;
    color?: string;
}

interface Coord {
    latitude: number;
    longitude: number;
}