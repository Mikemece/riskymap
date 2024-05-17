import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_DB } from './firebaseConfig'
import { FIREBASE_AUTH } from './firebaseConfig'
import { collection, deleteDoc, getDocs, getDoc, setDoc, doc } from 'firebase/firestore';

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

// Crear un usuario
export const createUser = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const usuario: Usuario = {
      nombre: email,
      email: email,
      contraseña: password,
      fotoURL: '',
      rango: 'Novato',
      registros: 0,
      votos: 0
    }
    await setDoc(doc(usuarios_collection, response.user.uid), usuario);
    console.log("Usuario creado con ID: ", response.user.uid);
    alert("Usuario creado correctamente");

  } catch (e: any) {
    console.log(e);
    alert('Error al crear usuario: ' + e.message);
  }
}

// Borrar un usuario por ID
export const deleteUser = async (id: string) => {
  const usuarioABorrar = doc(usuarios_collection, id);
  await deleteDoc(usuarioABorrar);
}

// Iniciar sesión
export const login = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    console.log("Usuario logueado: ", response.user);
    alert("Usuario logueado: " + response.user.email);
  } catch (e: any) {
    console.log(e);
    alert('Error al iniciar sesión: ' + e.message);
  }
}

// Cerrar sesión
export const logout = async () => {
  try {
    FIREBASE_AUTH.signOut();
    alert("Sesión cerrada correctamente");
  } catch (e: any) {
    console.log(e);
    alert('Error al cerrar sesión: ' + e.message);
  }
}