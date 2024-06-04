import { Button, Text } from "tamagui"
import { theme } from "../theme"
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";

export const EditImageButton = (props: any) => {


    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        if (!hasPermission) return console.log("No se han otorgado los permisos necesarios");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });
        if (!result.canceled) {
            props.onValueChange(result.assets[0].uri);
        }
    };

    return (
        <Button
            width={150}
            height={70}
            marginBottom={10}
            marginTop={5}
            marginHorizontal={10}
            padding={10}
            onPress={pickImage}
        >
            <Text textAlign="center" color={theme.colors.white} fontSize={15}>Cambiar foto de perfil</Text>
        </Button>
    )

}