import { useState } from "react";
import { Button, Dialog, Text, XStack } from "tamagui";
import { theme } from "../theme";
import { ActivityIndicator, Alert } from "react-native";
import { closeRisk } from "~/backend/dao/emergenciasCRUD";

export const CloseRiskButton = (props: {id: string}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = async (id: string) => {
        await closeRisk(id).then(() => {
            setLoading(true);
            setOpen(false);
            setLoading(false);
            Alert.alert('Riesgo cerrado', 'Recarga el mapa para ver los cambios');
        });
    }

    return (
        <Dialog open={open}>
            <Dialog.Trigger>
                <Button
                    width={140}
                    borderRadius={50}
                    marginHorizontal={5}
                    onPress={() => setOpen(true)}
                    backgroundColor={theme.colors.redPrimary}
                    pressStyle={{ backgroundColor: theme.colors.redPressed, borderColor: theme.colors.redPressed }}
                >
                    <Text textAlign="center" color={theme.colors.white} fontSize={16}>Cerrar riesgo</Text>
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    key="overlay"
                    animation="fast"
                    style={{ opacity: 0.5 }}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                    onPress={() => setOpen(false)} />
                <Dialog.Content
                    width={"95%"}
                    key="content"
                    elevate
                    animation='fast'
                    enterStyle={{ opacity: 0, scale: 0.2 }}
                    exitStyle={{ opacity: 0, scale: 0.2 }}
                    borderWidth={2}
                    backgroundColor={theme.colors.redLight}
                    borderColor={theme.colors.redPrimary}
                >
                    <Dialog.Title textAlign="center" color={theme.colors.black} fontSize={20}>El riesgo se cerrará</Dialog.Title>
                    <Dialog.Description textAlign="center" color={theme.colors.black} fontSize={15}>También dejará de mostrarse en el mapa ¿Desea continuar?</Dialog.Description>
                    <Dialog.Close marginTop={10}>
                        {loading ? <ActivityIndicator size="large" color={theme.colors.redPrimary}/> : 
                        <XStack>
                            <Button
                                textAlign='center'
                                width={150}
                                alignSelf="center"
                                fontSize={20}
                                height={50}
                                borderRadius={20}
                                marginHorizontal={5}
                                onPress={() => setOpen(false)}
                            >No
                            </Button>
                            <Button
                                textAlign='center'
                                width={150}
                                alignSelf="center"
                                fontSize={20}
                                height={50}
                                borderRadius={20}
                                marginHorizontal={5}
                                backgroundColor={theme.colors.redPrimary}
                                pressStyle={{ backgroundColor: theme.colors.redPressed, borderColor: theme.colors.redPressed }}
                                onPress={() => handleClose(props.id)}
                            >Sí
                            </Button>
                        </XStack>
                        }
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    )
}