import {Text, View} from 'react-native';
import * as DB from '~/backend/usuariosCRUD';
import { Button } from 'tamagui';


// Guardar caca usuario en un objeto Usuario y eso meterlo en un array

const ListUsers = () => {
  return (
    <View >
      <Text>Lista de Usuarios:</Text>
      <Button onPress={DB.getUsers}>Mostrar usuarios</Button>
      <Text> </Text>
      <Button onPress={() => DB.getUser('1')}>Mostrar usuario 1</Button>
    </View>
  );
};
export default ListUsers;

