import { Button, Dialog, View, XStack } from "tamagui";
import { ActivityIndicator, StyleSheet } from 'react-native';
import { theme, categoriasFirebase, gravedad } from "../theme";
import { FormInput } from "../FormInput";
import { useContext, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { createRisk } from "~/backend/emergenciasCRUD";
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from '~/components/UserContext';
import { getUser, updateUserRisks } from "~/backend/usuariosCRUD";


export const NewRiskButton = ({ onUpdate }: { onUpdate: () => void }) => {

    const user = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [severity, setSeverity] = useState(-1);


    const newRisk = async () => {
        setLoading(true);
        if (title === '' || category === '' || severity < 1) {
            alert('Por favor, rellena todos los campos');
            setLoading(false);
            return;
        }
        let location = await Location.getCurrentPositionAsync({ accuracy: 2 });
        let coords: Coord = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        getUser(user?.uid ?? '').then((userData) => {
            createRisk(title, category, coords, user?.uid ?? '', severity).then(() => {
                updateUserRisks(user?.uid ?? '', userData?.registros !== undefined ? userData.registros + 1 : 1).then(() => {
                    setLoading(false);
                    close();
                    onUpdate();
                });
            });
        });
    }

    const close = () => {
        setOpen(false);
        setTitle('');
        setCategory('');
        setSeverity(-1);
    }

    return (
        <>
            <Dialog open={open}>
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
                        onPress={user ? () => setOpen(true) : () => alert('Debes iniciar sesión para poder crear un riesgo')}
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
                        onPress={close}
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
                        <Button
                            position="absolute"
                            top={13}
                            right={15}
                            size="$2"
                            circular
                            icon={<Ionicons name="close" size={20}></Ionicons>}
                            onPress={close}
                        />
                        <View>
                            <FormInput
                                size="$5"
                                placeholder='Título...'
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                            />
                            <XStack justifyContent="center" >
                                <Dropdown
                                    style={styles.dropdown}
                                    data={categoriasFirebase}
                                    search
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Categoría"
                                    placeholderStyle={styles.placeholder}
                                    searchPlaceholder="Buscar..."
                                    value={category}
                                    onChange={item => { setCategory(item.value); }} />
                                <Dropdown
                                    style={styles.dropdown}
                                    data={gravedad}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Gravedad"
                                    placeholderStyle={styles.placeholder}
                                    value={category}
                                    onChange={item => { setSeverity(item.value); }} />
                            </XStack>
                        </View>
                        <Dialog.Close marginTop={10}>
                            {loading ? <ActivityIndicator size='large' color={theme.colors.greenPrimary} />
                                :
                                <>
                                    <Button
                                        textAlign='center'
                                        width={200}
                                        alignSelf="center"
                                        fontSize={20}
                                        height={50}
                                        borderRadius={20}
                                        backgroundColor={theme.colors.greenPrimary}
                                        pressStyle={{ backgroundColor: theme.colors.greenPrimaryPressed, borderColor: theme.colors.greenPrimaryPressed }}
                                        onPress={newRisk}
                                    >Crear
                                    </Button>
                                </>
                            }

                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        width: 150,
        marginVertical: 15,
        marginHorizontal: 10,
        height: 52,
        borderColor: theme.colors.black,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,

    },
    placeholder: {
        fontWeight: '500',
        color: theme.colors.greyPrimary
    }
});