import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Button } from 'tamagui';
import { Circle } from 'react-native-maps';
import { theme } from '~/components/theme';
import { CustomMarker } from '~/components/Markers/CustomMarker';
import { NewRiskButton } from '~/components/Buttons/NewRiskButton';
import { fetchRisksEONET } from '~/backend/EONET-API';
import { fetchRisksGDACS } from '~/backend/GDACS-API';
import { getRisks } from '~/backend/emergenciasCRUD';
import { DocumentData } from 'firebase/firestore';
import { FirebaseMarker } from '~/components/Markers/FirebaseMarker';
import { EONETMarker } from '~/components/Markers/EONETMarker';
import { GDACSMarker } from '~/components/Markers/GDACSMarker';

const Home = () => {
  const [EONETData, setEONETData] = useState([])
  const [GDACSData, setGDACSData] = useState([])
  const [firebaseData, setFirebaseData] = useState<DocumentData[]>([]);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 3,
    longitudeDelta: 3
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
      latitudeDelta: 3,
      longitudeDelta: 3
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }

  useEffect(() => {
    userLocation();
    fetchRisksEONET().then(data => {
      setEONETData(data);
    });
    fetchRisksGDACS().then(data => {
      setGDACSData(data);
    });
    getRisks().then(data => {
      setFirebaseData(data);
    });
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        provider='google'
        showsUserLocation
        region={region}
        style={styles.map}
        rotateEnabled={false}>
          
        {EONETData.map((risk: any, index: number) => (
          <EONETMarker key={index} risk={risk} />
        ))}

        {GDACSData.map((risk: any, index: number) => (
          <GDACSMarker key={index} risk={risk} />
        ))}

        {firebaseData.map((risk: any, index: number) => (
          <FirebaseMarker key={index} risk={risk} />
        ))}

        <Circle
          center={region}
          radius={theme.constants.defaultRadius}
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

