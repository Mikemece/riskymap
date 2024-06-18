import React from "react";
import { FlatList } from "react-native";
import { Text, View } from "tamagui";
import data from "~/documents/appinfo.json";
const AppInfo = () => {
  return (
    <>
      <Text
        fontSize={25}
        fontWeight="500"
        textAlign="center"
        paddingVertical={15}
      >Información de la aplicación
      </Text>
      <FlatList
        data={data.info}
        renderItem={({ item }) => (
          <View>
            <Text
              fontSize={18}
              paddingHorizontal={20}
              paddingVertical={15}
            >{item}
            </Text>
          </View>
        )}>
      </FlatList>
    </>
  );
}

export default AppInfo;