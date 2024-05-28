import { LatLng, Marker } from "react-native-maps";
import { Button, Dialog, Text, View, XStack } from "tamagui";
import { theme } from "../theme";
import { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import { getUser } from "~/backend/usuariosCRUD";
import { UserContext } from "../UserContext";

export const CustomMarker = (props: { coords: LatLng, color: string, titulo: string, categoria: string, fecha: Date, userID: string, votos?: number, riskID?: string }) => {
  const myUser = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [fecha, setFecha] = useState("");
  const [gravedad, setGravedad] = useState("");
  const [userRisk, setUserRisk] = useState(false);
  const [name, setName] = useState("");
  const [userVotes, setUserVotes] = useState(0);
  const [userListVoted, setUserListVoted] = useState<string[]>([]);

  useEffect(() => {
    setFecha(props.fecha.getDate() + '/' + (props.fecha.getMonth() + 1) + '/' + props.fecha.getFullYear());
    switch (props.color) {
      case 'navy':
        setGravedad('Desconocida');
        break;
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
    if (props.userID !== "GDACS" && props.userID !== "EONET" && props.userID) {
      getUser(props.userID).then(user => {
        if (user) {
          setUserRisk(true);
          setName(user.nombre);
          setUserVotes(user.votos);
          setUserListVoted(user.listaVotados);
        } else {
          setName("Usuario eliminado");
        }
      });
    }
  }, []);

  const isVoted = () => {
    if(userListVoted){
      if (props.riskID && userListVoted.includes(props.riskID)) {
        return true;
      } else {
        return false;
      }
    }
  }

  const navigateToUser = () => {
    router.push({
      pathname: 'usuarios/[id]',
      params: { id: props.userID }
    });
    setOpen(false);

  }

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
            width={"95%"}
            key="content"
            elevate
            animation='fast'
            enterStyle={{ opacity: 0, scale: 0.2 }}
            exitStyle={{ opacity: 0, scale: 0.2 }}
            borderWidth={2}
            borderColor={theme.colors.greenPrimary}
            backgroundColor={theme.colors.greenLight}
          >
            <Dialog.Title
              fontSize={23}
              textAlign="center"
              color={theme.colors.black}
              marginBottom={5}
              lineHeight={30}
            >{props.titulo}
            </Dialog.Title>

            <View paddingLeft={10}>
              <Text fontSize={15}>➤ Categoría:              {props.categoria}</Text>
              <Text fontSize={15}>➤ Gravedad:               {gravedad}</Text>
              <Text fontSize={15}>➤ En riesgo desde:   {fecha}</Text>
              {userRisk ? <XStack>
                <Text fontSize={15}>➤ Reportado por:</Text>
                <Text marginLeft={21} color={theme.colors.blueLink} onPress={navigateToUser}>{name}</Text>
              </XStack> : <Text fontSize={15}>➤ Reportado por:      {props.userID}</Text>}

              {userRisk && <View>
                <Text fontSize={15}>➤ Votos:                     {props.votos}</Text>
              </View>}
              {(userRisk && props.userID !== myUser?.uid && myUser && !isVoted()) && <Button marginTop={10}>
                Votar
              </Button>
              }
            </View>
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