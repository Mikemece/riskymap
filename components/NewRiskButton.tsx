import { Button, Dialog, Unspaced, View } from "tamagui";
import { ActivityIndicator, StyleSheet } from 'react-native';
import theme from "./theme";
import { FormInput } from "./FormInput";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { createRisk } from "~/backend/emergenciasCRUD";
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";

export const NewRiskButton = () => {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const categorias = [
        { label: 'Accidente en carretera', value: 'accidente' },
        { label: 'Zona de alta sismicidad', value: 'terremoto' },
        { label: 'Riesgo de inundación', value: 'inundación' },
        { label: 'Zona volcánica', value: 'volcán' },
        { label: 'La Palmilla 🔪', value: 'peligroso' },
    ];

    const newRisk = async () => {
        setLoading(true);
        if (title === '' || category === '') {
            alert('Por favor, rellena todos los campos');
            setLoading(false);
            return;
        }
        let location = await Location.getCurrentPositionAsync({ accuracy: 2 });
        let coords: Coord = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        createRisk(title, category, coords).then(() => {
            ;
            setLoading(false);
            setOpen(false);
        });
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
                        onPress={() => setOpen(true)}
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
                        <Dialog.Title textAlign="center" color={theme.colors.black}>Nuevo riesgo</Dialog.Title>
                            <Button
                                position="absolute"
                                top={13}
                                right={15}
                                size="$2"
                                circular
                                icon={<Ionicons name="close" size={20}></Ionicons>}
                                onPress={() => setOpen(false)}
                            />
                        <View>
                            <FormInput
                                size="$5"
                                placeholder='Título...'
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                            />
                            <Dropdown
                                style={styles.dropdown}
                                data={categorias}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Categoría..."
                                placeholderStyle={styles.placeholder}
                                searchPlaceholder="Buscar..."
                                value={category}
                                onChange={item => { setCategory(item.value); }} />
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
        margin: 15,
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