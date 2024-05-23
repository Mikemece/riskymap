import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, Avatar } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import theme from '~/components/theme';
import { getUser, logout } from "~/backend/usuariosCRUD";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { router } from "expo-router";


export default function CustomDrawer(props: any) {
    const user = useContext(UserContext);
    const { top, bottom } = useSafeAreaInsets();
    const [myUser, setMyUser] = useState<Usuario | null>(null);

    useEffect(() => {
        if (user) {
            getUser(user.uid).then(user => setMyUser(user || null)); 
        }else{
            setMyUser(null);
        }
    }, [user]);

    const callLogout = () => {
        logout();
        alert('Sesión cerrada correctamente');
        router.navigate('/');
    }

    return (
        <>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: theme.colors.greenSecondary, paddingTop: top }}>
                <TouchableOpacity
                    onPress={user ? () => {
                        router.push({
                            pathname: 'usuarios/[id]',
                            params: { id: user?.uid }
                        });
                    } : () => {
                        router.navigate('/login');
                    }}
                    style={styles.touchable}>
                    <Avatar circular alignSelf="center" size='$10' borderWidth={1}>
                        <Avatar.Image
                            accessibilityLabel="Avatar"
                            src={myUser && myUser.fotoURL !== '' ? myUser.fotoURL
                                : 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
                            }
                        />
                    </Avatar>
                    <Text
                        alignSelf="center"
                        fontSize={20}
                        fontWeight='500'
                        paddingTop={10}
                        color="black">
                        {myUser ? myUser.nombre : 'Anónimo'}
                    </Text>
                </TouchableOpacity>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {user && <View backgroundColor={theme.colors.redSecondary}>
                <DrawerItem
                    label="Cerrar sesión"
                    inactiveTintColor={theme.colors.redPrimary}
                    onPress={() => callLogout()}
                    icon={({ size, color }) => <Ionicons name="exit-outline" size={size} color={color} />}
                />
            </View>}
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