import { Alert } from 'react-native';
import { FIREBASE_DB } from './firebaseConfig'
import { collection, deleteDoc, getDocs, getDoc, doc, addDoc, updateDoc, query, where, and } from 'firebase/firestore';

//<---------------------   CONSTANTES    -------------------------------->
const DB = FIREBASE_DB;
const riesgos_collection = collection(DB, 'riesgos');

//<---------------------   FUNCIONES FIRESTORE    -------------------------------->
// Mostrar todos los riesgos
export const getRisks = async (categoria: string, gravedad: string) => {
  const gravedadNumber = parseGravedad(gravedad);
  let q = query(riesgos_collection);
  if (categoria !== "" && gravedad === "") {
    q = query(riesgos_collection, where("categoria", "==", categoria));
  } else if (categoria === "" && gravedad !== "") {
    q = query(riesgos_collection, where("gravedad", "==", gravedadNumber));
  } else if (categoria !== "" && gravedad !== "") {
    q = query(riesgos_collection, and(where("categoria", "==", categoria), where("gravedad", "==", gravedadNumber)));
  }
  const riesgos = await getDocs(q);
  return riesgos.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export function parseGravedad(gravedad: string) {
  switch (gravedad) {
    case "Muy baja":
      return 1;
    case "Baja":
      return 2;
    case "Media":
      return 3;
    case "Alta":
      return 4;
    case "Extrema":
      return 5;
    default:
      return -1;
  }
}

// Mostrar detalles de un riesgo por ID
export const getRisk = async (id: string) => {
  const docRef = doc(riesgos_collection, id);
  const riesgo = await getDoc(docRef);
  if (riesgo.exists()) {
    const riesgoDevuelto: Riesgo = {
      titulo: riesgo.data().titulo,
      categoria: riesgo.data().categoria,
      gravedad: riesgo.data().gravedad,
      fecha: riesgo.data().fecha,
      ubicacion: riesgo.data().ubicacion,
      userID: riesgo.data().userID,
      votos: riesgo.data().votos,
      fechaCierre: riesgo.data().fechaCierre,
      color: riesgo.data().color
    }
    return riesgoDevuelto;
  } else {
    console.log("NO EXISTE RIESGO: ", id);
  }
}

// Crear un riesgo
export const createRisk = async (titulo: string, categoria: string, ubicacion: Coord, userID: string, gravedad: number) => {
  try {
    const fechaActual = new Date();
    const fechaCierre = new Date();
    fechaCierre.setDate(fechaActual.getDate() + Math.round(gravedad * gravedad / 2));
    const riesgo: Riesgo = {
      titulo: titulo,
      categoria: categoria,
      gravedad: gravedad,
      fecha: fechaActual,
      ubicacion: ubicacion,
      userID: userID,
      votos: 0,
      fechaCierre: fechaCierre,
      color: color(gravedad)
    }
    await addDoc(riesgos_collection, riesgo);
    console.log("Riesgo creado con titulo: ", riesgo.titulo);
    Alert.alert("¡Riesgo creado!", 'Tu riesgo "' + riesgo.titulo + '" ha sido creado con éxito');

  } catch (e: any) {
    console.log(e);
    Alert.alert('ERROR','Error al crear riesgo: ' + e.message);
  }
}

const color = (gravedad: number) => {
  switch (gravedad) {
    case 1:
      return 'green';
    case 2:
      return 'yellow';
    case 3:
      return 'orange';
    case 4:
      return 'red';
    case 5:
      return 'violet';
    default:
      return 'navy';
  }
}

// Actualizar un riesgo por ID
export const updateRisk = async (id: string, newVotes: number) => {
  const riesgoAActualizar = doc(riesgos_collection, id);
  await updateDoc(riesgoAActualizar, {
    votos: newVotes
  });
}

// Actualizar un riesgo por ID
export const updateRiskInfo = async (id: string, newTitle: string, newCategory: string, newSeverity: number) => {
  const riesgoAActualizar = doc(riesgos_collection, id);
  const fechaActual = new Date();
  const fechaCierre = new Date();
  if (newSeverity === -1) {
    await updateDoc(riesgoAActualizar, {
      titulo: newTitle,
      categoria: newCategory,
      fecha: fechaActual
    });
  } else {
    fechaCierre.setDate(fechaActual.getDate() + Math.round(newSeverity * newSeverity / 2));
    await updateDoc(riesgoAActualizar, {
      titulo: newTitle,
      categoria: newCategory,
      gravedad: newSeverity,
      color: color(newSeverity),
      fecha: fechaActual,
      fechaCierre: fechaCierre
    });
  }
}

// Cierra un riesgo por ID
export const closeRisk = async (id: string) => {
  const riesgoACerrar = doc(riesgos_collection, id);
  await updateDoc(riesgoACerrar, {
    fechaCierre: new Date(),
  });
}


