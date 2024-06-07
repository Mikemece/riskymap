import { View, Text, Image, XStack } from 'tamagui'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import data from "~/documents/recomendaciones.json"
import { FlatList } from 'react-native';
import { theme } from '~/components/theme';

const Recomendacion = () => {
    const { name } = useLocalSearchParams<{ name: string }>();
    const nombre = name ? name.split('-').join(' ') : 'Desconocido';
    const recomendacion = data.categorias.find((categoria) => categoria.nombre === nombre);

    return (
        <View>
            <XStack 
                justifyContent='center' 
                padding={10} 
                borderBottomColor={theme.colors.greyPrimary} 
                borderBottomWidth={1}>
                <Image
                    source={{ uri: recomendacion?.icono }}
                    marginRight={10}
                    marginTop={15}
                    width={35}
                    height={35} />
                <Text
                    marginTop={20}
                    fontSize={25}
                >{recomendacion?.nombre}
                </Text>
                <Image
                    source={{ uri: recomendacion?.icono }}
                    marginLeft={10}
                    marginTop={15}
                    width={35}
                    height={35} />
            </XStack>
            <FlatList
                data={recomendacion?.recomendaciones}
                style={{ marginBottom: 75 }}
                renderItem={({ item }) => (
                    <Text
                        paddingHorizontal={30}
                        paddingVertical={10}
                        fontSize={17}
                    >{item}</Text>
                )}>

            </FlatList>
        </View>
    )
}

export default Recomendacion