import {FIREBASE_DB} from './firebaseConfig'
import {FIREBASE_AUTH} from './firebaseConfig'
import { collection, addDoc, deleteDoc, getDocs, getDoc, setDoc, doc } from 'firebase/firestore';

//<---------------------   CONSTANTES    -------------------------------->
const DB = FIREBASE_DB;
const usuarios_collection = collection(DB, 'usuarios');


//<---------------------   FUNCIONES FIRESTORE    -------------------------------->
// Mostrar todos los usuarios
export const getUsers = async () => {
    const usuarios = await getDocs(usuarios_collection);
    usuarios.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }

// Mostrar detalles de un usuario por ID
export const getUser = async (id: string) => {
    const docRef = doc(usuarios_collection, id);
    const usuario = await getDoc(docRef);
    if (usuario.exists()) {
      console.log("USUARIO: ", usuario.data());
    } else {
      console.log("NO EXISTE USUARIO: ", id);
    }
  }

// Borrar un usuario por ID
export const deleteUser = async (id: string) => { 
    const usuarioABorrar = doc(usuarios_collection, id);
    await deleteDoc(usuarioABorrar);
  }