import React, { useState } from "react";
import styles from "./installMeter.style";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomInput from "../../../components/customInput/CustomInput";

const InfoUser = () => {
  const [address, setAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [typeWaterMeter, setTypeWaterMeter] = useState(1);

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4, paddingHorizontal: 16 }}>
        <Ionicons name="information-circle" size={28} color="#F4B400" />
        <Text style={styles.objectTitle}>Thông tin thiết bị</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontWeight: 600 }}>ID thiết bị: </Text>123456
        </Text>
      </View>
      <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 20 }}>
        <CustomInput containerStyle={{ marginVertical: 4 }} placeholder={"Địa chỉ"} onChangeText={setAddress} />
        <CustomInput containerStyle={{ marginVertical: 4 }} placeholder={"Tên hộ dân"} onChangeText={setUserName} />
        <CustomInput
          containerStyle={{ marginVertical: 4 }}
          placeholder={"Số điện thoại"}
          onChangeText={setPhoneNumber}
        />
      </View>
    </>
  );
};

export default InfoUser;
