import { gravedad, theme } from "./theme"
import { StyleSheet, View } from "react-native"
import { CustomPopover } from "./CustomPopover";
import Slider from '@react-native-community/slider';
import { useEffect, useState } from "react";
import { YStack, Text } from "tamagui";
export const MapFilters = ({onChange}:any) => {

    const [radius, setRadius] = useState(theme.constants.defaultRadius);
    const [fastRadius, setFastRadius] = useState(theme.constants.defaultRadius);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [severityFilter, setSeverityFilter] = useState("");

    const handleFiltersChange = (categoryFilter:string, severityFilter:string) => {
        setCategoryFilter(categoryFilter);
        setSeverityFilter(severityFilter);
    }

    useEffect(() => {
        onChange(categoryFilter, severityFilter, radius);
    }, [categoryFilter, severityFilter, radius])

    return (
        <View style={styles.container}>
            <CustomPopover onFiltersChange={handleFiltersChange}/>
            <YStack alignItems="center">
                <Text marginBottom={-10}>Radio</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={10000}
                    maximumValue={500000}
                    step={10000}
                    value={radius}
                    minimumTrackTintColor={theme.colors.greenPrimaryPressed}
                    maximumTrackTintColor={theme.colors.black}
                    thumbTintColor={theme.colors.greenPrimary}
                    onSlidingComplete={(value) => setRadius(value)}
                    onValueChange={(value) => setFastRadius(value)}
                />
                <Text marginTop={-10}>{fastRadius/1000} km</Text>
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
