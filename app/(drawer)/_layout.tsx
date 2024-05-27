import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Drawer } from 'expo-router/drawer'
import { useContext } from 'react';
import CustomDrawer from '~/components/CustomDrawer';
import { UserContext } from '~/components/UserContext';
import { theme } from '~/components/theme';
const DrawerLayout = () => {

    const user = useContext(UserContext);
    const { id } = useLocalSearchParams<{id: string}>();

    return (
        <Drawer
            drawerContent={CustomDrawer}
            screenOptions={{
                drawerActiveBackgroundColor: theme.colors.greenPrimary,
                drawerActiveTintColor: theme.colors.white,
                drawerLabelStyle: {
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginLeft: -15,
                    fontWeight: 'bold'
                },
            }}>
            <Drawer.Screen
                name="index"
                options={{
                    title: 'Mapa',
                    headerTitleAlign: 'center',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name="map-outline" size={size} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.greenPrimary,
                    }
                }} />

            <Drawer.Screen
                name="usuarios"
                options={{
                    title: 'Detalles del usuario',
                    headerTitleAlign: 'center',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.greenPrimary
                    },
                    drawerItemStyle: { display: 'none' }
                }} />

            <Drawer.Screen
                name="login"
                options={{
                    title: 'Iniciar sesión',
                    headerTitleAlign: 'center',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name="finger-print" size={size} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.greenPrimary
                    },
                    drawerItemStyle: user ? { display: 'none' } : {}
                }} />
        </Drawer>
    )
}

export default DrawerLayout;