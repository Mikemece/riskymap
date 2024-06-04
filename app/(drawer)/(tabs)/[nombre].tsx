import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';


export const Recomendacion = () => {

    const { nombre } = useLocalSearchParams<{ nombre: string }>();

    return (
        <View>
            <Text>[nombre]</Text>
        </View>
    )
}
