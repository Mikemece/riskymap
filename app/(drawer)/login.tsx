import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'tamagui'
import { createUser, login } from '~/backend/usuariosCRUD';
import { FormInput } from '~/components/FormInput';
import { theme } from '~/components/theme';
import { Container } from '~/tamagui.config'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

  const startSinging = () => {
    setLoading(true);
    login(email, password).then((user) => {
      alert(user?.email);
      setLoading(false);
      if (user) {
        router.navigate('/');
        setEmail('');
        setPassword('');
      }
    });
  }

  const startSingingUp = () => {
    setLoading(true);
    if (password !== password2) {
      alert('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    createUser(email, password, username).then((user) => {
      setLoading(false);
      if (user) {
        router.navigate('/');
        setEmail('');
        setPassword('');
        setPassword2('');
        setUsername('');
      }
    });
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}>
      <Container alignItems='center' justifyContent='center'>
        <FormInput size="$5" placeholder='Introduce tu email...' value={email} onChangeText={(text) => setEmail(text)} />
        <FormInput size="$5" placeholder='Introduce tu contraseña...' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        {registerMode && <>
          <FormInput size="$5" placeholder='Repite la contraseña...' value={password2} onChangeText={(text) => setPassword2(text)} secureTextEntry={true} />
          <FormInput size="$5" placeholder='Escoge un nombre de usuario...' value={username} onChangeText={(text) => setUsername(text)} />
        </>
        }
        {loading ? <ActivityIndicator size='large' color='black' />
          : <>
            {registerMode ? <>
              <Button margin={20} alignSelf='center' minWidth={100} onPress={() => startSingingUp()}>Registrarse</Button>
              <Text>¿Ya tienes una cuenta? Inicia sesión pulsando <Text onPress={() => setRegisterMode(false)} style={styles.linkText}>AQUÍ</Text></Text>
            </>
              : <>
                <Button margin={20} alignSelf='center' minWidth={100} onPress={() => startSinging()}>Iniciar sesión</Button>
                <Text>¿No tienes cuenta? Regístrate pulsando <Text onPress={() => setRegisterMode(true)} style={styles.linkText}>AQUÍ</Text></Text>
              </>
            }
          </>
        }
      </Container>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  linkText: {
    color: theme.colors.blueLink,
    fontWeight: 'bold',
    fontSize: 16
  }
})