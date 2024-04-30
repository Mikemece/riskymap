import { Drawer } from 'expo-router/drawer'

const DrawerLayout = () => {
    return (
        <Drawer>
            <Drawer.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: 'green',
                    }
                }} />

            <Drawer.Screen
                name="usuarios"
                options={{
                    title: 'Usuarios',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: 'green'
                    }
                }} />
            
            <Drawer.Screen
                name="login"
                options={{
                    title: 'Iniciar sesión',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: 'green'
                    }
                }} />
        </Drawer>
    )
}

export default DrawerLayout;