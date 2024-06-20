import { Button, Dialog, Text, XStack } from "tamagui"
import { theme } from "../theme"
import { useState } from "react";
import { eraseUser } from "~/backend/dao/usuariosCRUD";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
export const DeleteUserButton = (props: {userID: string}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id: string) => {
        setLoading(true);
        await eraseUser(id);
        router.navigate('/');
        setOpen(false);
        setLoading(false);
    }

    return (
        <Dialog open={open}>
            <Dialog.Trigger>
                <Button
                    alignSelf="flex-end"
                    width={120}
                    height={50}
                    marginBottom={10}
                    marginTop={5}
                    marginHorizontal={10}
                    padding={10}
                    onPress={() => setOpen(true)}
                    backgroundColor={theme.colors.redPrimary}
                    pressStyle={{ backgroundColor: theme.colors.redPressed, borderColor: theme.colors.redPressed }}
                >
                    <Text textAlign="center" color={theme.colors.white} fontSize={15}>Borrar cuenta</Text>
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
                    <Dialog.Title textAlign="center" color={theme.colors.black} fontSize={20}>Su cuenta quedará eliminada</Dialog.Title>
                    <Dialog.Description textAlign="center" color={theme.colors.black} fontSize={15}>¿Desea continuar?</Dialog.Description>
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
                            >NO
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
                                onPress={() => handleDelete(props.userID)}
                            >ELIMINAR
                            </Button>
                        </XStack>
                        }
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>

    )

}