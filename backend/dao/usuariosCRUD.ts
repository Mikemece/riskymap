import { User, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_DB } from '../config/firebaseConfig'
import { FIREBASE_AUTH } from '../config/firebaseConfig'
import { collection, deleteDoc, getDocs, getDoc, setDoc, doc, updateDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

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
    const usuarioDevuelto: Usuario = {
      nombre: usuario.data().nombre,
      email: usuario.data().email,
      contraseña: usuario.data().contraseña,
      fotoURL: usuario.data().fotoURL,
      registros: usuario.data().registros,
      votos: usuario.data().votos,
      listaVotados: usuario.data().listaVotados
    }
    return usuarioDevuelto;
  } else {
    console.log("NO EXISTE USUARIO: ", id);
    return null;
  }
}

// Crear un usuario
export const createUser = async (email: string, password: string, username: string) => {
  try {
    const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const usuario: Usuario = {
      nombre: username,
      email: email,
      contraseña: password,
      fotoURL: '',
      registros: 0,
      votos: 0,
      listaVotados: []
    }
    await setDoc(doc(usuarios_collection, response.user.uid), usuario);
    console.log("Usuario creado con ID: ", response.user.uid);
    Alert.alert("¡Bienvenido, " + username + ", a Riskymap!"," Podrás completar tu perfil pulsando en tu nombre de usuario en el menú de la izquierda");
    return usuario;

  } catch (e: any) {
    console.log(e);
    Alert.alert('ERROR','Error al crear usuario: ' + e.message);
  }
}

// Actualizar un usuario por ID (perfil)
export const updateUser = async (id: string, newName: string, newImage: string) => {
  const usuarioAActualizar = doc(usuarios_collection, id);
  await updateDoc(usuarioAActualizar, {
    nombre: newName,
    fotoURL: newImage
  });
}

// Actualizar un usuario por ID (numero de registros)
export const updateUserRisks = async (id: string, newRisks: number) => {
  const usuarioAActualizar = doc(usuarios_collection, id);
  await updateDoc(usuarioAActualizar, {
    registros: newRisks,
  });
}

// Actualizar un usuario por ID (votos del usuario votado)
export const updateUserVoted = async (id: string, newVotes: number) => {
  const usuarioAActualizar = doc(usuarios_collection, id);
  await updateDoc(usuarioAActualizar, {
    votos: newVotes
  });
}

// Actualizar un usuario por ID (lista de votados propia)
export const updateTargetVotes = async (id: string, newVotedList: string[]) => {
  const usuarioAActualizar = doc(usuarios_collection, id);
  await updateDoc(usuarioAActualizar, {
    listaVotados: newVotedList
  });
}

// Borrar un usuario por ID
export const eraseUser = async (id: string) => {
  const usuarioAUTH = FIREBASE_AUTH.currentUser;
  const usuarioSTORE = doc(usuarios_collection, id);
  if(usuarioAUTH){
    deleteUser(usuarioAUTH).then(() => {
      deleteDoc(usuarioSTORE);
    }).catch((e: any) => {
      console.log(e);
      alert('Error al borrar usuario: ' + e.message);
    });
  } else {
    console.log("No hay usuario autenticado");
  }
}

// Iniciar sesión
export const login = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    return (response.user)
  } catch (e: any) {
    console.log(e);
    alert('Error al iniciar sesión: ' + e.message);
  }
}

// Cerrar sesión
export const logout = async () => {
  try {
    FIREBASE_AUTH.signOut();
  } catch (e: any) {
    console.log(e);
    alert('Error al cerrar sesión: ' + e.message);
  }
}

//Recarga un usuario
export const reloadUser = async (id: string) => {
  const usuario = await getUser(id);
  if (usuario) {
    await logout();
    await login(usuario.email, usuario.contraseña);
  }
}