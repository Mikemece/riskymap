import React from "react";
import { Text, View } from "tamagui";
import data from "~/documents/terminos.json";
import { FlatList } from "react-native";

const Condiciones = () => {
  return (
    <>
      <Text
        fontSize={25}
        fontWeight="500"
        textAlign="center"
        paddingVertical={15}
      >Términos y Condiciones
      </Text>
      <FlatList
        data={data.terminos}
        renderItem={({ item }) => (
          <View>
            <Text
              fontSize={22}
              fontWeight="500"
              paddingHorizontal={30}
              paddingVertical={15}
            >{item.titulo}
            </Text>
            <Text
              fontSize={17}
              paddingHorizontal={20}
              paddingBottom={20}
            >{item.texto}</Text>
          </View>
        )}>
      </FlatList>
    </>
  );
}

export default Condiciones;