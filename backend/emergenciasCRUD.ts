import { FIREBASE_DB } from './firebaseConfig'
import { collection, deleteDoc, getDocs, getDoc, setDoc, doc, addDoc } from 'firebase/firestore';

//<---------------------   CONSTANTES    -------------------------------->
const DB = FIREBASE_DB;
const riesgos_collection = collection(DB, 'riesgos');

//<---------------------   FUNCIONES FIRESTORE    -------------------------------->
// Mostrar todos los riesgos
export const getRisks = async () => {
    const riesgos = await getDocs(riesgos_collection);
    return riesgos.docs.map(doc => doc.data());
  }
  
  // Mostrar detalles de un riesgo por ID
  export const getRisk = async (id: string) => {
    const docRef = doc(riesgos_collection, id);
    const riesgo = await getDoc(docRef);
    if (riesgo.exists()) {
      console.log("riesgo: ", riesgo.data());
    } else {
      console.log("NO EXISTE riesgo: ", id);
    }
  }
  
  // Crear un riesgo
  export const createRisk = async (titulo: string, categoria: string, ubicacion: Coord, userID: string, gravedad: number) => {
    try {
      const riesgo: Riesgo = {
        titulo: titulo,
        categoria: categoria,
        gravedad: gravedad,
        fecha: new Date(),
        ubicacion: ubicacion,
        userID: userID,
        votos: 0,
        duracion: gravedad * gravedad/2
      }
      await addDoc(riesgos_collection, riesgo);
      console.log("Riesgo creado con titulo: ", riesgo.titulo);
      alert("Riesgo creado correctamente");
  
    } catch (e: any) {
      console.log(e);
      alert('Error al crear riesgo: ' + e.message);
    }
  }
  
  // Borrar un riesgo por ID
  export const deleteRisk = async (id: string) => {
    const riesgoABorrar = doc(riesgos_collection, id);
    await deleteDoc(riesgoABorrar);
  }