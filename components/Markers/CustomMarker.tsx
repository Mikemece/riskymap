import { LatLng, Marker } from "react-native-maps";
import { Button, Dialog, Text, View } from "tamagui";
import { theme } from "../theme";
import { useEffect, useState } from "react";

export const CustomMarker = (props: { coords: LatLng, color: string, titulo: string, categoria: string, fecha: Date, userID: string, votos?: number }) => {

  const [open, setOpen] = useState(false);
  const [fecha, setFecha] = useState("");
  const [gravedad, setGravedad] = useState("");

  useEffect(() => {
    setFecha(props.fecha.getDate() + '/' + (props.fecha.getMonth()+1) + '/' + props.fecha.getFullYear());
    switch (props.color) {
      case 'green':
        setGravedad('Muy baja');
        break;
      case 'yellow':
        setGravedad('Baja');
        break;
      case 'orange':
        setGravedad('Moderada');
        break;
      case 'red':
        setGravedad('Alta');
        break;
      default:
        setGravedad('Extrema');
        break;
    }
  }, []);

  return (
    <>
      <Dialog open={open} >
        <Dialog.Trigger asChild>
          <Marker
            coordinate={props.coords}
            pinColor={props.color ? props.color : 'plum'}
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
            <Dialog.Title fontSize={25} textAlign="center" color={theme.colors.black}>{props.titulo}</Dialog.Title>
            <Text>Categoría: {props.categoria}</Text>
            <Text>Gravedad: {gravedad}</Text>
            <Text>En riesgo desde: {fecha}</Text>
            {props.votos!== undefined && <View>
              <Text>Votos: {props.votos}</Text>
            </View>}
            <Text>Reportado por: {props.userID}</Text>


            <Dialog.Close >
              <Button
                marginTop={20}
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