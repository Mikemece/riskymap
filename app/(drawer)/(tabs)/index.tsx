import React from "react";
import { Image, Text, XStack, YStack } from "tamagui";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import data from "~/documents/recomendaciones.json"
import { theme } from "~/components/theme";

const Recomendaciones = () => {
  return (
    <>
      <FlatList
        data={data.categorias}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoria}>
            <XStack>
              <YStack>
                <Text
                  fontSize={17}
                  marginBottom={5}
                  >{item.nombre}
                </Text>
                <Text
                  fontSize={13}
                  color={theme.colors.greyPrimary}
                  >{item.descripcion}
                </Text>
              </YStack>
              <Image
                source={{uri: "~/assets/xxdesqui"}}
                width={100}
                height={100}
              />
            </XStack>
          </TouchableOpacity>

        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  categoria: {
    borderTopWidth: 1,
    borderColor: theme.colors.greyPrimary,
    padding: 20,
  }
});

export default Recomendaciones;
