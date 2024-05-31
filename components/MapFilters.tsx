import { gravedad, theme } from "./theme"
import { StyleSheet, View } from "react-native"
import { CustomPopover } from "./CustomPopover";

export const MapFilters = () => {    
    return (
        <View style={styles.container}>
            <CustomPopover/>
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
        height: 60,
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
