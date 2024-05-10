import { LatLng, Marker } from "react-native-maps";
import { Button, Dialog, Image } from "tamagui";
import theme from "./theme";

export const CustomMarker = (props: { coords: LatLng }) => {
  return (
    <>
      <Dialog modal >
        <Dialog.Trigger asChild>
          <Marker coordinate={props.coords} pinColor='navy' />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="fast"
            style={{ opacity: 0.5 }}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
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
            <Dialog.Close asChild >
              <Button
                backgroundColor={theme.colors.greenPrimary}
                pressStyle={{ backgroundColor: theme.colors.greenPrimaryPressed, borderColor: theme.colors.greenPrimaryPressed }}
              >Cerrar
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}