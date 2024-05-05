import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


const Home = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

