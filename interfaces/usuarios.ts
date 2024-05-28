interface Usuario {
    nombre: string;
    email: string;
    contraseña: string;
    fotoURL: string;
    registros: number;
    votos: number;
    listaVotados: Array<string>;
}