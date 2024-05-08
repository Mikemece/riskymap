import { useState } from "react";
import { LatLng, Marker } from "react-native-maps";
import {Button, Dialog, Image} from "tamagui";
import theme from "./theme";

export const CustomMarker = (props: { coords: LatLng }) => {

  const [isOpen, setIsOpen] = useState(false);

  function showDialog() {
    setIsOpen(true);
  }

  function hideDialog() {
    setIsOpen(false);
  }

  return (
    <>
      <Dialog modal open={isOpen}>
        <Dialog.Trigger asChild>
          <Marker coordinate={props.coords} pinColor='navy' onPress={showDialog} />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="quick"
            style={{ opacity: 0.5 }}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.Content 
            key="content" 
            elevate 
            animation='quick'
            enterStyle={{ opacity: 0, scale: 0.2 }}
            exitStyle={{ opacity: 0, scale: 0.2 }}
            borderWidth={2}
            borderColor={theme.colors.greenPrimary}
            backgroundColor={theme.colors.greenLight}
          >
            <Dialog.Title color={theme.colors.black}>Ubicación</Dialog.Title>
            <Dialog.Description color={theme.colors.black}>Aquí se encuentra el marcador</Dialog.Description>
            <Image alignSelf="center" source={{ uri: 'https://cdn-1.webcatalog.io/catalog/amogus-fun/amogus-fun-icon-filled-256.png?v=1677038647937', width:50 , height: 50 }} />
            <Dialog.Close displayWhenAdapted paddingTop={10}>
              <Button backgroundColor={theme.colors.greenPrimary} onPress={hideDialog}>Cerrar</Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}