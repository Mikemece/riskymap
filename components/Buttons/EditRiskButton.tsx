import { useEffect, useState } from "react";
import { Dialog, Button } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { FormInput } from "../FormInput";
import { Dropdown } from "react-native-element-dropdown";
import { ActivityIndicator, Alert, Platform, StyleSheet } from 'react-native';
import { categoriasFirebase, gravedad, theme } from "../theme";
import { updateRiskInfo } from "~/backend/dao/emergenciasCRUD";

export const EditRiskButton = (props: { id: string, titulo: string, categoria: string }) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [newTitulo, setNewTitulo] = useState('');
    const [newCategoria, setNewCategoria] = useState('');
    const [newGravedad, setNewGravedad] = useState(-1);

    const onSubmit = () => {
        setLoading(true);
        if (newTitulo === '') setNewTitulo(props.titulo);
        if (newCategoria === '') setNewCategoria(props.categoria);
    }

    const close = () => {
        setNewTitulo('');
        setNewCategoria('');
        setNewGravedad(-1);
        setOpen(false);
    }

    useEffect(() => {
        if (newTitulo !== '' && newCategoria !== ''  && loading) updateRiskInfo(props.id, newTitulo, newCategoria, newGravedad).then(() => {
            close();
            setLoading(false);
            Alert.alert('Riesgo actualizado', 'Recarga el mapa para ver los cambios');
        });

    }, [newTitulo, newCategoria, loading]);

    return (
        <Dialog open={open}>
            <Dialog.Trigger>
                <Button
                    width={140}
                    borderRadius={50}
                    marginHorizontal={5}
                    onPress={() => setOpen(true)}
                >Editar
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    key="overlay"
                    animation="fast"
                    style={{ opacity: 0.5 }}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                    onPress={close} />
                <Dialog.Content
                    width={"95%"}
                    key="content"
                    elevate
                    animation='fast'
                    enterStyle={{ opacity: 0, scale: 0.2 }}
                    exitStyle={{ opacity: 0, scale: 0.2 }}
                    borderWidth={2}
                >
                    <Dialog.Title textAlign="center" fontSize={23}>Edita el riesgo</Dialog.Title>
                    <Button
                        position="absolute"
                        top={13}
                        right={15}
                        size="$2"
                        circular
                        icon={<Ionicons name="close" size={20}></Ionicons>}
                        onPress={close}
                    />
                    <FormInput
                        size="$5"
                        placeholder="Nuevo título..."
                        value={newTitulo}
                        onChangeText={(text) => { setNewTitulo(text) }}
                    >
                    </FormInput>
                    <Dropdown
                        style={styles.dropdown}
                        data={categoriasFirebase}
                        search
                        labelField="label"
                        valueField="value"
                        placeholder="Nueva categoría"
                        placeholderStyle={styles.placeholder}
                        searchPlaceholder="Buscar..."
                        value={newCategoria}
                        selectedTextStyle={styles.selectedText}
                        onChange={item => { setNewCategoria(item.value); }} />

                    <Dropdown
                        style={styles.dropdown}
                        data={gravedad}
                        labelField="label"
                        valueField="value"
                        placeholder="Nueva gravedad"
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        onChange={item => { setNewGravedad(item.value); }} />

                    <Dialog.Close marginTop={10}>
                        {loading ? <ActivityIndicator size="large" color={theme.colors.white} /> :
                            <Button
                                textAlign='center'
                                width={200}
                                alignSelf="center"
                                fontSize={20}
                                height={50}
                                borderRadius={20}
                                onPress={onSubmit}
                            >Cambiar
                            </Button>
                        }
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>

    )

}

const styles = StyleSheet.create({
    dropdown: {
        alignSelf: 'center',
        width: 290,
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
    },
    selectedText: {
        height: 40,
        paddingTop: Platform.OS === "ios" ? 10 : 0,
        textAlignVertical: 'center'
    }
});