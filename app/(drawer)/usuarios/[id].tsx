import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'tamagui'
import { UserContext } from '~/components/UserContext';
import { useLocalSearchParams } from 'expo-router';
import { getUser } from '~/backend/usuariosCRUD';

const Usuario = () => {
  const myUser = useContext(UserContext);
  const { id } = useLocalSearchParams<{id: string}>();
  const editable = myUser?.uid === id;

  const [activeUser, setActiveUser] = useState<Usuario | null>(null);

  useEffect(() => {
    if (id) {
      getUser(id).then(user => setActiveUser(user || null));
    }
  }, [id]);

  return (
    <View>
      <Text>Usuario {activeUser?.nombre}</Text>
    </View>
  )
}

export default Usuario