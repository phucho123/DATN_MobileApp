import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import MyCamera from "../../../components/camera/Camera";
import styles from "./updatemeter.style";

const UpdateMeter = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>GHI CHỈ SỐ NƯỚC</Text>
            <MyCamera />
            <View style={styles.resultGroup}>
                <View style={styles.resultItem}>
                    <Text style={styles.resultTitle}>AI nhận diện</Text>
                    <Text style={styles.result}>0046</Text>
                </View>
                <View style={styles.resultItem}>
                    <Text style={styles.resultTitle}>Thực tế</Text>
                    <Text style={styles.result}>0046</Text>
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