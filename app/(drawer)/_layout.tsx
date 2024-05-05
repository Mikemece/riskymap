import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer'
import customDrawer from '~/components/customDrawer';
import theme from '~/components/theme';	

const DrawerLayout = () => {
    return (
        <Drawer 
        drawerContent={customDrawer} 
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
                    title: 'Inicio',
                    headerTitleAlign: 'center',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.greenPrimary,
                    }
                }} />

            <Drawer.Screen
                name="usuarios"
                options={{
                    title: 'Usuarios',
                    headerTitleAlign: 'center',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.greenPrimary
                    }
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
                    }
                }} />
        </Drawer>
    )
}

export default DrawerLayout;