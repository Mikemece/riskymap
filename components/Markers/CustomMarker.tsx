import { LatLng, Marker } from "react-native-maps";
import { Button, Dialog, Text, View, XStack } from "tamagui";
import { theme } from "../theme";
import { useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import { getUser, updateTargetVotes, updateUserVoted } from "~/backend/usuariosCRUD";
import { UserContext } from "../UserContext";
import { updateRisk } from "~/backend/emergenciasCRUD";

export const CustomMarker = (props: { coords: LatLng, color: string, titulo: string, categoria: string, fecha: Date, userID: string, votos?: number, riskID?: string }) => {
  const myUser = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [userRisk, setUserRisk] = useState(false);
  const [name, setName] = useState("");
  const [userVotes, setUserVotes] = useState(0);
  const [riskVotes, setRiskVotes] = useState(props.votos ?? 0);
  const [userListVoted, setUserListVoted] = useState<string[]>([]);
  const [deletedUser, setDeletedUser] = useState(false);

  const fecha = props.fecha.getDate() + '/' + (props.fecha.getMonth() + 1) + '/' + props.fecha.getFullYear();
  let gravedad;
  switch (props.color) {
    case 'navy':
      gravedad = 'Desconocida';
      break;
    case 'green':
      gravedad = 'Muy baja';
      break;
    case 'yellow':
      gravedad = 'Baja';
      break;
    case 'orange':
      gravedad = 'Moderada';
      break;
    case 'red':
      gravedad = 'Alta';
      break;
    default:
      gravedad = 'Extrema';
      break;
  }

  useEffect(() => {
    if (props.userID !== "GDACS" && props.userID !== "EONET" && props.userID) {
      if(myUser){
        getUser(myUser?.uid || "").then(user => {
          if (user) {
            setUserListVoted(user.listaVotados);
          }
        });
      }
      getUser(props.userID).then(user => {
        if (user) {
          setUserRisk(true);
          setName(user.nombre);
          setUserVotes(user.votos);
        } else {
          setDeletedUser(true);
          setName("Usuario eliminado");
        }
      });
    }
  }, [userVotes]);

  const isVoted = () => {
    if (userListVoted) {
      if (props.riskID && userListVoted.includes(props.riskID)) {
        return true;
      } else {
        return false;
      }
    }
  }

  const votar = () => {
    setUserVotes(userVotes + 1);
    setUserListVoted([...userListVoted, props.riskID || ""]);
    updateUserVoted(props.userID, userVotes + 1);
    updateTargetVotes(myUser?.uid || "", [...userListVoted, props.riskID || ""])
    setRiskVotes(riskVotes + 1);
    updateRisk(props.riskID ?? "", riskVotes + 1);
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
            zIndex={3}
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
              {userRisk && <XStack>
                <Text fontSize={15}>➤ Reportado por:</Text>
                <Text marginLeft={21} color={theme.colors.blueLink} onPress={navigateToUser}>{name}</Text>
              </XStack>}
              {(!userRisk && !deletedUser) && <Text fontSize={15}>➤ Reportado por:      {props.userID}</Text>}
              {deletedUser && <Text fontSize={15} color={theme.colors.redPressed}>➤ Reportado por:      {name}</Text>}

              {(userRisk || deletedUser) && <View>
                <Text fontSize={15}>➤ Votos:                     {riskVotes}</Text>
              </View>}
            </View>

            {(userRisk && props.userID !== myUser?.uid && myUser && !isVoted()) &&
              <Button
                marginTop={15}
                width={100}
                alignSelf="center"
                borderRadius={50}
                onPress={votar}
              >Votar
              </Button>
            }
            {(userRisk && props.userID !== myUser?.uid && myUser && isVoted()) &&
              <Button
                marginTop={15}
                width={100}
                alignSelf="center"
                borderRadius={50}
                disabled
                backgroundColor={theme.colors.greySecondary}
              >¡Votado!
              </Button>
            }

            <Dialog.Close >
              <Button
                marginTop={20}
                alignSelf="center"
                width={200}
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