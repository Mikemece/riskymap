import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text } from "tamagui";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function customDrawer(props: any) {

    const router = useRouter()
    const { top, bottom } = useSafeAreaInsets();

    return (
        <>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#236f104f', paddingTop: top }}>
                <TouchableOpacity onPress={() => console.log("TOCADOO")} style={{padding:20}}>
                    <Image
                        source={{ uri: 'https://cdn-1.webcatalog.io/catalog/amogus-fun/amogus-fun-icon-filled-256.png?v=1677038647937' }}
                        style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 50 }}
                    />

                    <Text
                        alignSelf="center"
                        fontSize={20}
                        fontWeight='500'
                        paddingTop={10}
                        color="black">Among Us</Text>
                </TouchableOpacity>
                <DrawerItemList {...props}  />
            </DrawerContentScrollView>


            <View backgroundColor='#ff000026'>
                <DrawerItem
                    label="Cerrar sesión"
                    inactiveTintColor="red"
                    onPress={() => router.navigate('/')}
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