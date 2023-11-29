import React, { useState } from "react";
import styles from "./installMeter.style";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import InfoUser from "../../../components/inforUser/InfoUser";
import { Image } from "react-native";

function InstallMeter() {
  const [activeImg, setActiveImg] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <InfoUser />
      <View style={{ paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => setActiveImg(1)}>
          <View
            style={{
              width: 180,
              height: 180,
              backgroundColor: activeImg === 1 ? "#40FBA1" : "#FFF",
              borderColor: activeImg === 1 ? "green" : "#EEE",
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={require("../../../assets/images/waterMeter.png")} style={{ height: 150, width: 150 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveImg(2)}>
          <View
            style={{
              width: 180,
              height: 180,
              backgroundColor: activeImg === 2 ? "#40FBA1" : "#FFF",
              borderColor: activeImg === 2 ? "green" : "#EEE",
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/images/electricWaterMeter.png")}
              style={{ height: 70, width: 150 }}
            />
          </View>
        </TouchableOpacity>
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
  );
}

export default InstallMeter;
