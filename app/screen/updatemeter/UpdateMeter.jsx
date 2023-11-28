import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import MyCamera from "../../../components/camera/Camera";
import styles from "./updatemeter.style";

const UpdateMeter = () => {
  const [resultOfAI, setResultOfAI] = useState(0);
  const [confirmResult, setconfirmResult] = useState(0);

  const handleGetResultFromAI = (valueAIDetect) => {
    console.log("value: ", valueAIDetect);
    setResultOfAI(valueAIDetect);
    setconfirmResult(valueAIDetect);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>GHI CHỈ SỐ NƯỚC</Text>
      <MyCamera onChangeResultAI={handleGetResultFromAI} />
      <View style={styles.resultGroup}>
        <View style={styles.resultItem}>
          <Text style={styles.resultTitle}>AI nhận diện</Text>
          <Text style={styles.result}>{resultOfAI}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultTitle}>Thực tế</Text>
          <Text style={styles.result}>{confirmResult}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>HỦY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmText}>XÁC NHẬN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateMeter;
