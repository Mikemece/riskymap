import { gravedad, theme } from "./theme"
import { StyleSheet, View } from "react-native"
import { CustomPopover } from "./CustomPopover";
import Slider from '@react-native-community/slider';
import { useState } from "react";
import { YStack, Text } from "tamagui";
export const MapFilters = () => {

    const [radius, setRadius] = useState(theme.constants.defaultRadius);

    return (
        <View style={styles.container}>
            <CustomPopover />
            <YStack alignItems="center">
                <Text marginBottom={-10}>Radio</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={100000}
                    maximumValue={400000}
                    step={1000}
                    value={radius}
                    minimumTrackTintColor={theme.colors.greenPrimaryPressed}
                    maximumTrackTintColor={theme.colors.black}
                    thumbTintColor={theme.colors.greenPrimary}
                    onValueChange={value => setRadius(value)}
                />
                <Text marginTop={-10}>{radius/1000} km</Text>
            </YStack>
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
        height: 70,
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
    },
    slider: {
        width: 130,
        height: 40,
        marginHorizontal: -10,
    }
});
