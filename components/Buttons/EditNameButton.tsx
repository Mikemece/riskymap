import { Button, Dialog, Text } from "tamagui"
import theme from "../theme"
import { useState } from "react";
import { FormInput } from "../FormInput";
import { Ionicons } from "@expo/vector-icons";

export const EditNameButton = (props: any) => {

    const [open, setOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    const sendUsername = () => {
        props.onValueChange(newUsername);
        setOpen(false);
        setNewUsername('');
    }

    return (
        <Dialog open={open}>
            <Dialog.Trigger>
                <Button
                    width={150}
                    height={70}
                    marginBottom={10}
                    marginTop={5}
                    marginHorizontal={10}
                    padding={10}
                    onPress={() => setOpen(true)}
                >
                    <Text textAlign="center" color={theme.colors.white} fontSize={15}> Cambiar nombre de usuario</Text>
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
                >
                    <Dialog.Title fontSize={23}>Escribe tu nuevo nombre</Dialog.Title>
                    <Button
                        position="absolute"
                        top={13}
                        right={15}
                        size="$2"
                        circular
                        icon={<Ionicons name="close" size={20}></Ionicons>}
                        onPress={() => setOpen(false)}
                    />
                    <FormInput
                        size="$5"
                        placeholder="Nuevo nombre de usuario..."
                        value={newUsername}
                        onChangeText={(text) => { setNewUsername(text) }}
                    >
                    </FormInput>
                    <Dialog.Close marginTop={10}>
                        <Button
                            textAlign='center'
                            width={200}
                            alignSelf="center"
                            fontSize={20}
                            height={50}
                            borderRadius={20}
                            onPress={sendUsername}
                        >Cambiar
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>

    )

}