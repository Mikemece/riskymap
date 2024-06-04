import React from "react";
import { Image, Text, XStack, YStack } from "tamagui";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import data from "~/documents/recomendaciones.json"
import { theme } from "~/components/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Recomendaciones = () => {
  return (
    <>
      <FlatList
        data={data.categorias}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoria}
            onPress={() => router.push({
              pathname: 'detalles/[name]',
              params: { name: item.nombre.split(' ').join('-') }
            })}
          >
            <XStack alignItems="center">
              <Image
                source={{ uri: item.icono }}
                width={55}
                height={55} />
              <YStack marginLeft={15} width={220}>
                <Text
                  fontSize={18}
                  marginBottom={5}
                >{item.nombre}
                </Text>
                <Text
                  fontSize={14}
                  color={theme.colors.greyPrimary}
                >{item.descripcion}
                </Text>
              </YStack>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={theme.colors.greyPrimary}
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
