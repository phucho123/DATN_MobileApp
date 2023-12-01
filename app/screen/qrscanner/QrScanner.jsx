import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

function QrScanner({ route }) {
  const { typeAction } = route.params;
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // setModalContent({ type, data });
    // setIsOpenModal(true);
    // Linking.openURL(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    switch (typeAction) {
      case "installMeter":
        navigation.navigate("Install New Meter", { id: data });
        break;
      case "updateMeter":
        navigation.navigate("Update Meter", { id: data });
        break;
      case "updateInfo":
        navigation.navigate("Update Information", { id: data });
        break;
      default:
        navigation.navigate("Home");
        break;
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={{ backgroundColor: "#FFF", padding: 12, borderRadius: 8 }}>
          <Button title={"Nhấn để quét lại QR Code"} onPress={() => setScanned(false)} />
        </View>
      )}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isOpenModal}
        onRequestClose={() => {
          setIsOpenModal(false);
        }}
        style={{ flex: 1, backgroundColor: "blue", width: 200, height: 200 }}
      >
        <Text>{modalContent.type}</Text>
        <Text>{modalContent.content}</Text>
      </Modal> */}
    </View>
  );
}
export default QrScanner;
