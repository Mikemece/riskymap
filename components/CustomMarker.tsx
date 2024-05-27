import { LatLng, Marker } from "react-native-maps";
import { Button, Dialog, Image } from "tamagui";
import { theme } from "./theme";
import { useState } from "react";

export const CustomMarker = (props: { coords: LatLng }) => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} >
        <Dialog.Trigger asChild>
          <Marker
            coordinate={props.coords} 
            pinColor='navy' 
            onPress={() => setOpen(true)} 
          />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="fast"
            style={{ opacity: 0.5 }}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            onPress={() => setOpen(false)}
          />
          <Dialog.Content
            key="content"
            elevate
            animation='fast'
            enterStyle={{ opacity: 0, scale: 0.2 }}
            exitStyle={{ opacity: 0, scale: 0.2 }}
            borderWidth={2}
            borderColor={theme.colors.greenPrimary}
            backgroundColor={theme.colors.greenLight}
          >
            <Dialog.Title textAlign="center" color={theme.colors.black}>Ubicación</Dialog.Title>
            <Dialog.Description color={theme.colors.black}>Aquí vendrá toda la info del riesgo </Dialog.Description>
            <Image
              marginBottom={10}
              alignSelf="center"
              source={{ uri: 'https://cdn-1.webcatalog.io/catalog/amogus-fun/amogus-fun-icon-filled-256.png?v=1677038647937', width: 50, height: 50 }}
            />
            <Dialog.Close >
              <Button
                textAlign='center'
                width={200}
                alignSelf="center"
                fontSize={20}
                height={50}
                borderRadius={20}
                backgroundColor={theme.colors.greenPrimary}
                pressStyle={{ backgroundColor: theme.colors.greenPrimaryPressed, borderColor: theme.colors.greenPrimaryPressed }}
                onPress={() => setOpen(false)}
              >Cerrar
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}