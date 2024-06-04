import { View, Text } from 'tamagui'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import data from "~/documents/recomendaciones.json"

const Recomendacion = () => {
    const { name } = useLocalSearchParams<{ name: string }>();
    const nombre = name ? name.split('-').join(' ') : 'Desconocido';
    const recomendacion = data.categorias.find((categoria) => categoria.nombre === nombre);

    return (
        <View>
            <Text 
                marginTop={20} 
                fontSize={25} 
                textAlign='center'
                >{recomendacion?.nombre}
            </Text>
            <Text 
                marginTop={20} 
                fontSize={18}
                paddingHorizontal={30}
                >{recomendacion?.descripcion}
            </Text>
        </View>
    )
}

export default Recomendacion