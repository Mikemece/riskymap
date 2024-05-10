import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, StyleSheet} from 'react-native';
import { Button}  from 'tamagui'
import { createUser, login } from '~/backend/usuariosCRUD';
import { FormInput } from '~/components/FormInput';
import theme from '~/components/theme';
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
      <FormInput size="$5" placeholder='Introduce tu email...' value={email} onChangeText={(text) => setEmail(text)} />
      <FormInput size="$5" placeholder='Introduce tu contraseña...' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
      {registerMode && <FormInput size="$5" placeholder='Repite la contraseña...' value={password2} onChangeText={(text) => setPassword2(text)} secureTextEntry={true} />}
      {loading ? <ActivityIndicator size='large' color='black' />
        : <>
          {registerMode ? <>
            <Button margin={'$2'} alignSelf='center' minWidth={100} onPress={() => startSingingUp()}>Registrarse</Button>
            <Text>¿Ya tienes una cuenta? Inicia sesión pulsando <Text onPress={() => setRegisterMode(false)} style={styles.linkText}>AQUÍ</Text></Text>
          </>
            : <>
              <Button margin={'$2'} alignSelf='center' minWidth={100} onPress={() => startSinging()}>Iniciar sesión</Button>
              <Text>¿No tienes cuenta? Regístrate pulsando <Text onPress={() => setRegisterMode(true)} style={styles.linkText}>AQUÍ</Text></Text>
            </>
          }
        </>
      }
    </Container>
  )
}

export default Login

const styles = StyleSheet.create({
  linkText: {
    color: theme.colors.darkBlue,
    fontWeight: 'bold',
    fontSize: 16
  }

})