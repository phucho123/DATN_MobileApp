import React, { useState, useRef } from "react";
import styles from "./updateInfo.style";
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomInput from "../../../components/customInput/CustomInput";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Toast from "../../../components/toast/Toast";

function UpdateInfo({ route }) {
  const { id } = route.params;
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [status, setStatus] = useState(1);

  const toastRef = useRef();

  const showToast = (content, type, delay) => {
    if (toastRef.current) {
      toastRef.current.hide(() => {
        toastRef.current.show(content, type, delay);
      });
    }
  };

  const handleUpdateInfo = async () => {
    const data = {
      waterMeterId: id,
      address: address,
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber.toString(),
      status: status,
    };

    const response = await axios.post("http://192.168.1.4:8000/user/update-info", data);

    if (response.status === 200) {
      showToast("Cập nhật thông tin thành công", "success", 200);
    } else {
      showToast("Cập nhật thông tin thất bại", "error", 200);
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {/* <InfoUser /> */}
          <View style={[styles.card, styles.shadowProp]}>
            {/* ID */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="information-circle" size={28} color="green" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>ID thiết bị </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                placeholder={"ID:"}
                onChangeText={setAddress}
                defaultValue={id}
                isOnlySeen={true}
              />
            </View>
            {/* ADDRESS */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="location-sharp" size={28} color="#DB4437" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Địa chỉ </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                placeholder={"Địa chỉ:"}
                onChangeText={setAddress}
                defaultValue={address}
                isOnlySeen={true}
              />
            </View>
            {/* EMAIL */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="mail" size={28} color="purple" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Email </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                placeholder={"Email:"}
                onChangeText={setEmail}
                defaultValue={email}
              />
            </View>
            {/* FULLNAME */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="person-circle" size={28} color="#F4B400" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Tên hộ dân </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                placeholder={"Nhập tên hộ dân"}
                onChangeText={setFullName}
                defaultValue={fullName}
              />
            </View>
            {/* PHONE NUMBER */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="call-sharp" size={28} color="#4285F4" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Số điện thoại </Text>
              </View>
              <CustomInput
                containerStyle={{ marginVertical: 4 }}
                placeholder={"Nhập số điện thoại"}
                onChangeText={setPhoneNumber}
                defaultValue={phoneNumber}
              />
            </View>
            {/* STATUS */}
            <View style={styles.cardItem}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                <Ionicons name="water-sharp" size={30} color="#4285F4" />
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Tình trạng đồng hồ </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center", gap: 12 }}>
                <TouchableOpacity onPress={() => setStatus(1)}>
                  <View
                    style={{
                      backgroundColor: status === 1 ? "#40FBA1" : "#EEE",
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: status === 1 ? "green" : "gray",
                      padding: 12,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="ios-checkmark-circle" size={32} color="green" />
                    <Text>Đang hoạt động</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStatus(0)}>
                  <View
                    style={{
                      backgroundColor: status === 0 ? "#EC9B97" : "#EEE",
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: status === 0 ? "red" : "gray",
                      padding: 12,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="md-close-circle" size={32} color="red" />
                    <Text>Đang sửa chữa</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* //////////////// */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.navigate("Home")}>
              <Text style={styles.cancelText}>HỦY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createBtn} onPress={() => handleUpdateInfo()}>
              <Text style={styles.createText}>CẬP NHẬT</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default UpdateInfo;
