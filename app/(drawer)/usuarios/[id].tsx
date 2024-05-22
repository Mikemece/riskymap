import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, ScrollView, Text, View } from 'tamagui'
import { UserContext } from '~/components/UserContext';
import { useLocalSearchParams } from 'expo-router';
import { getUser } from '~/backend/usuariosCRUD';
import theme from '~/components/theme';
import { Ionicons } from '@expo/vector-icons';
import { RankSlider } from '~/components/RankSlider';
import { EditInfoButton } from '~/components/EditInfoButton';

const Usuario = () => {
  const myUser = useContext(UserContext);
  const { id } = useLocalSearchParams<{ id: string }>();
  const editable = myUser?.uid === id;
  const [editMode, setEditMode] = useState(false);
  const [activeUser, setActiveUser] = useState<Usuario | null>(null);

  useEffect(() => {
    if (id && !editMode) {
      getUser(id).then(user => setActiveUser(user || null));
    }
  }, [id, editMode]);

  return (
    <>
      {(editable && !editMode) && <Button
        position='absolute'
        zIndex={1}
        width={65}
        height={65}
        alignSelf='center'
        bottom={55}
        elevate
        fontSize={25}
        borderRadius={50}
        backgroundColor={theme.colors.greenPrimary}
        pressStyle={{ backgroundColor: theme.colors.greenPrimaryPressed, borderColor: theme.colors.greenPrimaryPressed }}
        onPress={() => setEditMode(true)}
      >
        <Ionicons name='brush' size={25} color={theme.colors.white} />
      </Button>
      }
      {editMode && <>
        <Button
          position='absolute'
          zIndex={1}
          width={65}
          height={65}
          right={25}
          bottom={55}
          elevate
          borderRadius={50}
          backgroundColor={theme.colors.greenPrimary}
          pressStyle={{ backgroundColor: theme.colors.greenPrimaryPressed, borderColor: theme.colors.greenPrimaryPressed }}
          onPress={() => setEditMode(false)}
        >
          <Ionicons name='save' size={25} color={theme.colors.white} />
        </Button>
        <Button
          position='absolute'
          zIndex={1}
          width={65}
          height={65}
          left={25}
          bottom={55}
          elevate
          borderRadius={50}
          backgroundColor={theme.colors.redPrimary}
          pressStyle={{ backgroundColor: theme.colors.redPressed, borderColor: theme.colors.redPressed }}
          onPress={() => setEditMode(false)}
        >
          <Ionicons name='close' size={25} color={theme.colors.white} />
        </Button>
      </>
      }

      <ScrollView>
        <View alignItems='center' marginBottom={30}>
          <Avatar 
            circular 
            borderWidth={2} 
            size='$13' 
            top={30} 
            marginBottom={35}
            >
            <Avatar.Image
              accessibilityLabel="Avatar"
              src={activeUser?.fotoURL}
            />
          </Avatar>

          {editMode && <EditInfoButton marginTop={5}>
            Cambiar foto de perfil
          </EditInfoButton>}

          <Text
            fontSize={30}
            color="black"
            marginBottom={10}
          >
            {activeUser?.nombre} <Text fontSize={22}>({activeUser?.rango})</Text>
          </Text>

          <RankSlider votes={activeUser?.votos || 0} />
          {editMode && <EditInfoButton marginTop={20} >
            Cambiar nombre de usuario
          </EditInfoButton>
          }
          

          <View
            animation='bouncy'
            pressStyle={{ scale: 1.2 }}
            padding={15}
            marginTop={30}
            borderColor={theme.colors.greenPrimary}
            borderWidth={2}
            borderRadius={20}
            backgroundColor={theme.colors.greenLight}
          >
            <Text fontSize={25} >Riesgos registrados</Text>
            <Text fontSize={40} textAlign='center' >{activeUser?.registros}</Text>
          </View>
        </View>

        {editable && <View paddingLeft={20}>
          <Text padding={5} fontSize={20} color="black" textDecorationLine="underline">Información personal:</Text>
          <Text padding={10} fontSize={15} >Correo: {activeUser?.email}</Text>
          <Text padding={10} fontSize={15} >Contraseña: {activeUser?.contraseña}</Text>
        </View>}

        <View id='safeArea' height={130} />
      </ScrollView>

    </>
  )
}

export default Usuario