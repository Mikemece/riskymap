import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, Avatar } from "tamagui";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import theme from '~/components/theme';
import { logout } from "~/backend/usuariosCRUD";
import { FIREBASE_AUTH } from "~/backend/firebaseConfig";


export default function CustomDrawer(props: any) {

    const router = useRouter()
    const { top, bottom } = useSafeAreaInsets();

    return (
        <>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: theme.colors.greenSecondary, paddingTop: top }}>
                <TouchableOpacity onPress={() => console.log("TOCADOO")} style={styles.touchable}>
                    <Avatar circular alignSelf="center" size='$10'>
                        <Avatar.Image
                            accessibilityLabel="Avatar"
                            src='https://cdn-1.webcatalog.io/catalog/amogus-fun/amogus-fun-icon-filled-256.png?v=1677038647937'
                        />
                    </Avatar>
                    <Text
                        alignSelf="center"
                        fontSize={20}
                        fontWeight='500'
                        paddingTop={10}
                        color="black">Among Us</Text>
                </TouchableOpacity>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>


            <View backgroundColor='#ff000026'>
                <DrawerItem
                    label="Cerrar sesión"
                    inactiveTintColor="red"
                    onPress={() => logout()}
                    icon={({ size, color }) => <Ionicons name="exit-outline" size={size} color={color} />}
                />
            </View>

            <View borderTopColor='red'
                borderTopWidth={2}
                padding={5}
                paddingBottom={20 + bottom}
            >
                <Text>Riskymap</Text>
            </View>
        </>


    );
}


const styles = StyleSheet.create({
    touchable: {
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.greenPrimary,
    },
});