import { Dropdown } from "react-native-element-dropdown";
import { theme } from "./theme"
import { StyleSheet, View } from "react-native"
import { Button, Popover } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { CustomPopover } from "./CustomPopover";



export const MapFilters = () => {
    const earthIcon = <Ionicons name="earth" size={20} color={theme.colors.white} />
    const warnIcon = <Ionicons name="warning" size={20} color={theme.colors.white} />
    return (
        <View style={styles.container}>
            <CustomPopover icon={earthIcon} />
            <CustomPopover icon={warnIcon}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        alignSelf: "center",
        width: "71%",
        height: "9%",
        backgroundColor: theme.colors.greenLight,
        top: 10,
        borderRadius: 10,
        elevation: 10,
        alignItems: "center",
        justifyContent: "center",
    },
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
    }
});
