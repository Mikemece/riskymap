import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer'
import customDrawer from '~/components/customDrawer';

const DrawerLayout = () => {
    return (
        <Drawer 
        drawerContent={customDrawer} 
        screenOptions={{
            drawerActiveBackgroundColor: '#1a8100',
            drawerActiveTintColor: 'white',
            drawerLabelStyle: {
                marginLeft: -15,
                fontWeight: 'bold'
            }

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
                        backgroundColor: 'green',
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
                        backgroundColor: 'green'
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
                        backgroundColor: 'green'
                    }
                }} />
        </Drawer>
    )
}

export default DrawerLayout;