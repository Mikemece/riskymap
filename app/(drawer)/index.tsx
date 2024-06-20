import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button } from 'tamagui';
import { Circle } from 'react-native-maps';
import { theme } from '~/components/theme';
import { NewRiskButton } from '~/components/Buttons/NewRiskButton';
import { fetchRisksEONET } from '~/backend/APIs/EONET-API';
import { fetchRisksGDACS } from '~/backend/APIs/GDACS-API';
import { getRisks } from '~/backend/dao/emergenciasCRUD';
import { DocumentData } from 'firebase/firestore';
import { FirebaseMarker } from '~/components/Markers/FirebaseMarker';
import { UserContext } from '~/components/UserContext';
import { MapFilters } from '~/components/MapFilters';
import { APIMarker } from '~/components/Markers/APIMarker';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const user = useContext(UserContext)
  const [EONETData, setEONETData] = useState([])
  const [GDACSData, setGDACSData] = useState([])
  const [firebaseData, setFirebaseData] = useState<DocumentData[]>([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newRadius, setNewRadius] = useState<number>(theme.constants.defaultRadius);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");

  const radiusInDegrees = newRadius / 111120;

  const updateMap = () => {
    setUpdate(!update);
  };

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 3,
    longitudeDelta: 3
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('El permiso para acceder a la ubicación fue denegado');
      return;
    }
    let location = await Location.getCurrentPositionAsync({ accuracy: 2 });
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 5,
      longitudeDelta: 5
    });
    console.log(location.coords.latitude, location.coords.longitude);
    return location.coords;
  }

  const handleFiltersAndRadiusChange = (categoryFilter: string, severityFilter: string, radius: number, fastRadius: number) => {
    setCategoryFilter(categoryFilter);
    setSeverityFilter(severityFilter);
    setNewRadius(radius);
    updateMap();
    console.log(categoryFilter, severityFilter, radius);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Updating map");
      updateMap();
    }, 300000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setLoading(true);
    setEONETData([]);
    setGDACSData([]);
    setFirebaseData([]);
    userLocation().then((region) => {
      fetchRisksEONET().then(data => {
        let filteredEONET = data.filter((risk: any) => {
          const riskLocation = { latitude: risk.ubicacion.latitude, longitude: risk.ubicacion.longitude };
          const distance = euclideanDistance(region, riskLocation);
          return distance <= radiusInDegrees;
        });
        if (categoryFilter !== "" && severityFilter === "") {
          filteredEONET = filteredEONET.filter((risk: any) => risk.categoria === categoryFilter);
        } else if (categoryFilter === "" && severityFilter !== "") {
          filteredEONET = filteredEONET.filter((risk: any) => risk.gravedad === severityFilter);
        } else if (categoryFilter !== "" && severityFilter !== "") {
          filteredEONET = filteredEONET.filter((risk: any) => risk.categoria === categoryFilter && risk.gravedad === severityFilter);
        }
        setEONETData(filteredEONET);
      });

      fetchRisksGDACS().then(data => {
        let filteredGDACS = data.filter((risk: any) => {
          const riskLocation = { latitude: risk.ubicacion.latitude, longitude: risk.ubicacion.longitude };
          const distance = euclideanDistance(region, riskLocation);
          return distance <= radiusInDegrees;
        });
        if (categoryFilter !== "" && severityFilter === "") {
          filteredGDACS = filteredGDACS.filter((risk: any) => risk.categoria === categoryFilter);
        } else if (categoryFilter === "" && severityFilter !== "") {
          filteredGDACS = filteredGDACS.filter((risk: any) => risk.gravedad === severityFilter);
        } else if (categoryFilter !== "" && severityFilter !== "") {
          filteredGDACS = filteredGDACS.filter((risk: any) => risk.categoria === categoryFilter && risk.gravedad === severityFilter);
        }
        setGDACSData(filteredGDACS);
      });

      getRisks(categoryFilter, severityFilter).then(data => {
        const filteredFirebase = data.filter((risk: any) => {
          const riskLocation = { latitude: risk.ubicacion.latitude, longitude: risk.ubicacion.longitude };
          const distance = euclideanDistance(region, riskLocation);
          const hoy = new Date();
          const fechaCierre = new Date(risk.fechaCierre.seconds * 1000 + risk.fechaCierre.nanoseconds / 1000000);
          return (distance <= radiusInDegrees) && (hoy < fechaCierre);
        });
        setFirebaseData(filteredFirebase);
        setLoading(false);
      });
    });
  }, [update, user]);

  function euclideanDistance(coords1: any, coords2: any) {
    const xDiff = coords2.longitude - coords1.longitude;
    const yDiff = coords2.latitude - coords1.latitude;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        region={region}
        style={styles.map}
        rotateEnabled={false}
        provider={PROVIDER_GOOGLE}
      >

        {EONETData.map((risk: any, index: number) => (
          <APIMarker key={index} risk={risk} />
        ))}

        {GDACSData.map((risk: any, index: number) => (
          <APIMarker key={index} risk={risk} />
        ))}

        {firebaseData.map((risk: any, index: number) => (
          <FirebaseMarker key={index} risk={risk} />
        ))}

        <Circle
          center={region}
          radius={newRadius}
          fillColor={theme.colors.greenSecondary}
          strokeColor={theme.colors.greenPrimary}
          strokeWidth={2}
        />
      </MapView>
      <Button
        icon={<Ionicons name="refresh" size={24} color={theme.colors.white} />}
        position='absolute'
        width={75}
        height={75}
        left={20}
        bottom={65}
        elevate
        fontSize={25}
        borderRadius={50}
        onPress={updateMap}
      >
      </Button>
      <NewRiskButton onUpdate={updateMap} />
      <MapFilters onChange={handleFiltersAndRadiusChange} />
      {loading && <ActivityIndicator size="large" color={theme.colors.black} style={styles.load} />}
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
  load: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    backgroundColor: theme.colors.greenLight,
    borderRadius: 30,
    elevation: 10,
    height: 50,
    width: 50
  }
});

