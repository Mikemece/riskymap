import { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Button, Input, SizeTokens, View, XStack, YStack } from 'tamagui'
import { createUser, login } from '~/backend/usuariosCRUD';
import { Container } from '~/tamagui.config'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

  const startSinging = () => {
    setLoading(true);
    login(email, password).then(() => {
      setLoading(false);
    });
  }

  const startSingingUp = () => {
    setLoading(true);
    if (password !== password2) {
      alert('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    createUser(email, password).then(() => {
      setLoading(false);
    });
  }


  return (
    <Container>
      <LoginInput size="$5" placeholder='Introduce tu email...' value={email} onChangeText={(text) => setEmail(text)} />
      <LoginInput size="$5" placeholder='Introduce tu contraseña...' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
      {registerMode && <LoginInput size="$5" placeholder='Repite la contraseña...' value={password2} onChangeText={(text) => setPassword2(text)} secureTextEntry={true} />}
      {loading ? <ActivityIndicator size='large' color='black' />
        : <>
          {registerMode ? <>
            <Button margin={'$2'} alignSelf='center' minWidth={100} onPress={() => startSingingUp()}>Registrarse</Button>
            <Text>¿Ya tienes una cuenta? Inicia sesión pulsando <Text onPress={() => setRegisterMode(false)} style={{ color: 'blue' }}>AQUÍ</Text></Text>
          </>
            : <>
              <Button margin={'$2'} alignSelf='center' minWidth={100} onPress={() => startSinging()}>Iniciar sesión</Button>
              <Text>¿No tienes cuenta? Regístrate pulsando <Text onPress={() => setRegisterMode(true)} style={{ color: 'blue' }}>AQUÍ</Text></Text>
            </>
          }
        </>
      }
    </Container>
  )
}

export default Login

function LoginInput(props: { size: SizeTokens, placeholder: string, value: string, onChangeText: (value: string) => void, secureTextEntry?: boolean }) {
  return (
    <XStack margin='$4'>
      <Input flex={1}
        size={props.size}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        backgroundColor='#ffff'
        color='black' />
    </XStack>
  )
}