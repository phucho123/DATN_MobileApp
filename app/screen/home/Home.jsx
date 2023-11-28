import React from "react";
import { Image, Text, View, SafeAreaView } from "react-native";
import Button from "../../../components/button/Button";
import styles from "./home.style";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ padding: 16, display: "flex", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>
          <Text style={{ color: "red" }}>Protect</Text> Our Water,
        </Text>
        <Text style={{ fontSize: 20 }}>
          <Text style={{ color: "red" }}>Sustain</Text> Our Future,
        </Text>
        <Text style={{ fontSize: 20, color: "red" }}>Every Drop Matters!</Text>
        <Image source={require("../../../assets/images/hcmut.png")} style={{ height: 150, width: 150 }} />
      </View>
      <View style={styles.container}>
        <Button text={"Lap Dong Ho Moi"} onPress={() => navigation.navigate("Install New Meter")} />
        <Button text={"Ghi chi so nuoc"} color={"#0F9C58"} onPress={() => navigation.navigate("Qr Scanner")} />
        {/* <Button text={"Ghi chi so nuoc"} color={"#0F9C58"} onPress={() => navigation.navigate("Update Meter")} /> */}
        <Button
          text={"Cap nhat thong tin"}
          color={"#F4B400"}
          onPress={() => navigation.navigate("Update Information")}
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;
