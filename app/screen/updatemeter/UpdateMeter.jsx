import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import MyCamera from "../../../components/camera/Camera";
import styles from "./updatemeter.style";
import InfoUser from "../../../components/inforUser/InfoUser";

const UpdateMeter = () => {
  const [isDisplayResult, setIsDisplayResult] = useState(false);
  const [resultOfAI, setResultOfAI] = useState(0);
  const [confirmResult, setconfirmResult] = useState(0);

  const handleGetResultFromAI = (valueAIDetect) => {
    console.log("value: ", valueAIDetect);
    setResultOfAI(valueAIDetect);
    setconfirmResult(valueAIDetect);
  };

  const displayResult = () => {
    setIsDisplayResult(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <InfoUser />

        <View>
          <MyCamera onChangeResultAI={handleGetResultFromAI} displayResult={displayResult} />

          {isDisplayResult && (
            <>
              <View style={styles.resultGroup}>
                <View style={styles.resultItem}>
                  <Text style={styles.resultTitle}>AI nhận diện</Text>
                  <Text style={styles.result}>{resultOfAI}</Text>
                  <Text style={styles.resultUnit}>m³</Text>
                </View>
                <View style={styles.resultItem}>
                  <Text style={styles.resultTitle}>Thực tế</Text>
                  <Text style={styles.result}>{confirmResult}</Text>
                  <Text style={styles.resultUnit}>m³</Text>
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
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateMeter;
