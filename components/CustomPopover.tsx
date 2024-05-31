import { Button, XStack } from "tamagui";
import { theme } from "./theme";
import Popover from 'react-native-popover-view';
import { Dropdown } from "react-native-element-dropdown";
import { StatusBar, StyleSheet } from "react-native"
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export const CustomPopover = () => {
    const [categoria, setCategoria] = useState("");
    const [gravedad, setGravedad] = useState("");

    const categoriaFilter = [
        { label: "Accidente", value: "Accidente en carretera" },
        { label: "Ciclón tropical", value: "Ciclón tropical" },
        { label: "Color del agua", value: "Color del agua" },
        { label: "Deslizamiento de tierra", value: "Deslizamiento de tierra" },
        { label: "Glaciar", value: "Hielo en mares y lagos" },
        { label: "Humano", value: "Causado por el hombre" },
        { label: "Incendio", value: "Incendio" },
        { label: "Incendio forestal", value: "Incendio forestal" },
        { label: "Inundación", value: "Inundación" },
        { label: "Nieve", value: "Nieve" },
        { label: "Polvo y neblina", value: "Polvo y neblina" },
        { label: "Sequia", value: "Sequia" },
        { label: "Temperaturas extremas", value: "Temperaturas extremas" },
        { label: "Terremoto", value: "Terremoto" },
        { label: "Tormenta severa", value: "Tormenta severa" },
        { label: "Volcán", value: "Volcán" },
    ]
    const gravedadFilter = [
        { label: "Muy baja", value: "Muy baja" },
        { label: "Baja", value: "Baja" },
        { label: "Moderada", value: "Moderada" },
        { label: "Alta", value: "Alta" },
        { label: "Extrema", value: "Extrema" }
    ]

    return (
        <Popover
            popoverStyle={styles.popover}
            arrowSize={{ width: 25, height: 10 }}
            from={(
                <Button
                    icon={<Ionicons name="earth" size={15} color={theme.colors.white} />}
                    backgroundColor={theme.colors.greenPrimary}
                    width={105}
                    height={45}
                    borderRadius={10}
                    marginRight={10}
                    pressStyle={{ backgroundColor: theme.colors.greenPrimaryPressed, borderColor: theme.colors.greenPrimaryPressed }}
                >Filtros</Button>
            )}>
            <XStack>
                <Dropdown
                    keyboardAvoiding={false}
                    style={styles.dropdown}
                    data={categoriaFilter}
                    labelField="label"
                    valueField="value"
                    placeholder="Categoría"
                    placeholderStyle={styles.placeholder}
                    value={categoria}
                    //search
                    //searchPlaceholder="Buscar..."
                    selectedTextProps={{ numberOfLines: 2 }}
                    selectedTextStyle={styles.selectedText}
                    onChange={item => setCategoria(item.value)} />
                <Dropdown
                    style={styles.dropdown}
                    data={gravedadFilter}
                    labelField="label"
                    valueField="value"
                    placeholder="Gravedad"
                    placeholderStyle={styles.placeholder}
                    value={gravedad}
                    onChange={item => setGravedad(item.value)} />
            </XStack>
        </Popover>

    );
}

const styles = StyleSheet.create({
    popover: {
        backgroundColor: theme.colors.greenLight,
        borderRadius: 10,
    },
    dropdown: {
        width: 155,
        height: 52,
        marginVertical: 15,
        marginHorizontal: 10,
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
        textAlignVertical: 'center'
    }
});