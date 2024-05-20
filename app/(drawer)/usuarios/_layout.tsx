import { Stack } from 'expo-router'

const UsuariosLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="[id]"/>
    </Stack>
  )
}

export default UsuariosLayout