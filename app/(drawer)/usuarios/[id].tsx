import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, ScrollView, Text, View, XStack } from 'tamagui'
import { UserContext } from '~/components/UserContext';
import { useLocalSearchParams } from 'expo-router';
import { getUser, reloadUser, updateUser } from '~/backend/usuariosCRUD';
import { theme } from '~/components/theme';
import { Ionicons } from '@expo/vector-icons';
import { RankSlider } from '~/components/RankSlider';
import { EditImageButton } from '~/components/Buttons/EditImageButton';
import { EditNameButton } from '~/components/Buttons/EditNameButton';
import { ActivityIndicator } from 'react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import { DeleteUserButton } from '~/components/Buttons/DeleteUserButton';

const Usuario = () => {
  const myUser = useContext(UserContext);
  const { id } = useLocalSearchParams<{ id: string }>();
  const editable = myUser?.uid === id;

  const [editMode, setEditMode] = useState(false);
  const [activeUser, setActiveUser] = useState<Usuario | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (id && !editMode) {
      setLoading(true);
      getUser(id).then(user => {
        setActiveUser(user || null);
        setLoading(false);
      });
    }
  }, [id, editMode]);

  const handleNameValue = (value: string) => {
    setNewUsername(value);
  };
  const handleImageValue = (value: string) => {
    setNewImage(value);
  };

  const getRank = (votes: number) => {
    switch (!!activeUser) {
      case votes < 50:
        return 'Novato';
      case 50 <= votes && votes < 100:
        return 'Itermedio';
      case 100 <= votes && votes < 150:
        return 'Experimentado';
      case 150 <= votes && votes < 200:
        return 'Experto';
      default:
        return 'Risk-Master';
    }
  }

  const onSubmit = () => {
    setLoading(true);
    if (newUsername === '') setNewUsername(activeUser?.nombre || '');
    if (newImage === '') {
      setNewImage(activeUser?.fotoURL || '')
      setSubmit(true)
    } else {
      uploadImage(newImage).then(() => setSubmit(true));
    }
  }

  useEffect(() => {
    if (id !== undefined && newUsername !== '' && newImage !== '' && submit) updateUser(id, newUsername, newImage).then(() => {
      setNewUsername('');
      setNewImage('');
      reloadUser(id).then(() => {
        setEditMode(false);
        setLoading(false);
        setSubmit(false);
      });
    });
  }, [newUsername, newImage, submit]);

  const onCancel = () => {
    setNewImage('');
    setNewUsername('');
    setEditMode(false);
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME
    },
    url: {
      secure: true
    }
  });

  const options = {
    folder: 'riskymap',
    unsigned: true,
    upload_preset: 'riskymap_set'
  };

  const uploadImage = async (uri: string) => {
    await upload(cld, {
      file: uri, options: options, callback: (error: any, response: any) => {
        if (error) {
          console.error('Error al subir la imagen:', error);
          return;
        } else {
          setNewImage(response.secure_url);
        }
      }
    })
  }


  return (
    <>{loading ?
      <ActivityIndicator size="large" color={theme.colors.greenPrimary} />
      : <>
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
            onPress={onSubmit}
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
            onPress={onCancel}
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
                src={newImage !== '' ? newImage : activeUser?.fotoURL ? activeUser.fotoURL : 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'}
              />
            </Avatar>

            {editMode && <XStack>
              <EditImageButton onValueChange={handleImageValue} />
              <EditNameButton onValueChange={handleNameValue} />
            </XStack>}

            <Text
              fontSize={30}
              color="black"
              marginBottom={10}
            >
              {(editMode && newUsername !== '') ? newUsername : activeUser?.nombre} <Text fontSize={22}>({getRank(activeUser?.votos ?? 0)})</Text>
            </Text>

            <RankSlider votes={activeUser?.votos || 0} />

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

          {editable && <DeleteUserButton userID={id || ''} />}
          
          <View id='safeArea' height={130} />
        </ScrollView>

      </>}
    </>
  )
}

export default Usuario