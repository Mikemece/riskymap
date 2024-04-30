import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';


const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href='/usuarios/'>Ir a lista usuarios</Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {}
});
