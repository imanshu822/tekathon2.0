import MapView from "react-native-maps";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Button,
  TextInput,
} from "react-native";
import { Marker } from "react-native-maps";

import * as Location from "expo-location";

const Mapview = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="auto" />
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
        showsCompass={true}
        showsBuildings={false}
        showsScale={true}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <View style={styles.buttons}>
        <Button
          title="Set Marker"
          onPress={() => {
            setMarker({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          }}
        />
        <Button
          title="Get Location"
          onPress={() => {
            alert(
              "Latitude: " +
                location.coords.latitude +
                "\nLongitude: " +
                location.coords.longitude
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "95%",
  },
  buttons: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    backgroundColor: "white",
    paddingVertical: 10,
    width: "100%",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  input: {
    position: "absolute",
    top: 0,
    backgroundColor: "white",
    paddingVertical: 10,
    width: "100%",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
});

export default Mapview;
