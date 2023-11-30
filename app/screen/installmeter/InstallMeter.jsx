import React, { useEffect, useState } from "react";
import styles from "./installMeter.style";
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import InfoUser from "./InfoUser";

function InstallMeter() {
  const [info, setInfo] = useState({
    address: "",
    userName: "",
    phoneNumber: "",
    typeWaterMeter: 1,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  console.log(location);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {/* INFORMATION */}
        <InfoUser />
        {/* TYPE */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4, paddingHorizontal: 16 }}>
          <Ionicons name="list-circle-sharp" size={28} color="#0F9C58" />
          <Text style={styles.objectTitle}>Chọn loại đồng hồ</Text>
        </View>
        <View style={{ paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
          <TouchableOpacity onPress={() => setInfo({ ...info, typeWaterMeter: 1 })}>
            <View
              style={[
                styles.titleWaterMeter,
                {
                  borderColor: info.typeWaterMeter === 1 ? "green" : "#EEE",
                  left: "22%",
                },
              ]}
            >
              <Text>Đồng hồ cơ</Text>
            </View>
            <View
              style={[
                styles.typeItem,
                {
                  backgroundColor: info.typeWaterMeter === 1 ? "#40FBA1" : "#FFF",
                  borderColor: info.typeWaterMeter === 1 ? "green" : "#EEE",
                },
              ]}
            >
              <Image source={require("../../../assets/images/waterMeter.png")} style={{ height: 120, width: 120 }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInfo({ ...info, typeWaterMeter: 2 })}>
            <View
              style={[
                styles.titleWaterMeter,
                {
                  borderColor: info.typeWaterMeter === 2 ? "green" : "#EEE",
                  left: "18%",
                },
              ]}
            >
              <Text>Đồng hồ xung</Text>
            </View>
            <View
              style={[
                styles.typeItem,
                {
                  backgroundColor: info.typeWaterMeter === 2 ? "#40FBA1" : "#FFF",
                  borderColor: info.typeWaterMeter === 2 ? "green" : "#EEE",
                },
              ]}
            >
              <Image
                source={require("../../../assets/images/electricWaterMeter.png")}
                style={{ height: 70, width: 150 }}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* MAP VIEW */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4, paddingHorizontal: 16 }}>
          <Ionicons name="md-location-sharp" size={28} color="#DB4437" />
          <Text style={styles.objectTitle}>Ví trị lắp đặt</Text>
        </View>
        <View style={{ padding: 20, paddingTop: 0 }}>
          <View style={styles.locationCoordBox}>
            <Text style={styles.locationCoord}>
              Kinh độ: <Text style={styles.locationCoordItem}>{location?.coords.latitude}</Text>
            </Text>
            <Text style={styles.locationCoord}>
              Vĩ độ: <Text style={styles.locationCoordItem}>{location?.coords.longitude}</Text>
            </Text>
          </View>
          {location && (
            <MapView
              style={{ width: "100%", height: 300, marginTop: 12 }}
              initialRegion={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                latitudeDelta: 0.0,
                longitudeDelta: 0.0,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title={info.address}
              />
            </MapView>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancelText}>HỦY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createBtn}>
            <Text style={styles.createText}>TẠO MỚI</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default InstallMeter;
