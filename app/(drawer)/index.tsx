import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button, Dialog } from 'tamagui';
import { Marker, Circle } from 'react-native-maps';
import theme from '~/components/theme';
import { CustomMarker } from '~/components/CustomMarker';
import { NewRiskButton } from '~/components/NewRiskButton';

const Home = () => {

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.5922,
    longitudeDelta: 0.0421
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: 2 });
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }

  useEffect(() => {
    userLocation();
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        region={region}
        style={styles.map}
        rotateEnabled={false}>
        <CustomMarker coords={region} />
        <Circle
          center={region}
          radius={10000}
          fillColor={theme.colors.greenSecondary}
          strokeColor={theme.colors.greenPrimary}
          strokeWidth={2}
        />
      </MapView>
      <Button
        position='absolute'
        bottom={20}
        onPress={userLocation}
      >Actualizar
      </Button>
      <NewRiskButton />
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
  }
});

