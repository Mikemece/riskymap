import { Button, Dialog, View } from "tamagui";
import theme from "./theme";
import { Container } from "~/tamagui.config";
import { FormInput } from "./FormInput";
import { useState } from "react";

export const NewRiskButton = () => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Dialog modal>
                <Dialog.Trigger asChild>
                    <Button
                        position='absolute'
                        width={75}
                        height={75}
                        right={20}
                        bottom={65}
                        elevate
                        fontSize={25}
                        borderRadius={50}
                        backgroundColor={theme.colors.greenPrimary}
                        pressStyle={{ backgroundColor: theme.colors.greenPrimaryPressed, borderColor: theme.colors.greenPrimaryPressed }}
                    >+
                    </Button>
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
                        <Dialog.Title textAlign="center" color={theme.colors.black}>Nuevo riesgo</Dialog.Title>
                        <View>
                            <FormInput size="$5" placeholder='Título...' value={title} onChangeText={(text) => setTitle(text)} />
                            <FormInput size="$5" placeholder='Categoría...' value={title} onChangeText={(text) => setTitle(text)} />
                        </View>
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