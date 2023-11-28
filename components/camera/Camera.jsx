import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import styles from "./camera.style";

const MyCamera = () => {
  const [imageUri, setImageUri] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [framePosition, setFramePosition] = useState({ x: 0, y: 0 });
  const cameraRef = useRef(null);

  const [url, setUrl] = useState("");

  const handleCameraReady = () => {
    console.log("Camera is ready");
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri, width, height } = await cameraRef.current.takePictureAsync();
      // Resize the image to 380x380 pixels
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 380, height: 380 } }],
        { compress: 1, format: "jpeg" } // You can adjust compression and format as needed
      );

      handleUpLoadImg(resizedImage.uri);
      setImageUri({ uri: resizedImage.uri, width, height });
    }
  };

  const handleUpLoadImg = (photoUri) => {
    const data = new FormData();
    data.append("file", {
      uri: photoUri,
      type: "image/jpeg", // Change the type based on the image type (jpeg, png, etc.)
      name: "photo.png",
    });
    data.append("upload_preset", "_DemoDetectNumber");
    data.append("cloud_name", "diuws4bmd");

    fetch("https://api.cloudinary.com/v1_1/diuws4bmd/image/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => Alert.alert("Error while uploading", err));
  };

  useEffect(() => {
    const handleGetResult = async (url) => {
      console.log("url: ", url);
      fetch("http://192.168.1.11:4000", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("data:", data))
        .catch((err) => console.log("error:", err));
    };

    handleGetResult(url);
  }, [url]);

  const handleFrameMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setFramePosition({ x: locationX - 190, y: locationY - 190 }); // Adjust the values based on the frame size
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  });

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permission...</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={Camera.Constants.Type.back}
        ratio={"1:1"}
        onCameraReady={handleCameraReady}
      >
        <ImageBackground
          style={styles.overlay}
          source={{ uri: imageUri?.uri }} // Use ImageBackground instead of Image
        >
          <View
            style={[styles.frame, { transform: [{ translateX: framePosition.x }, { translateY: framePosition.y }] }]}
            onTouchMove={handleFrameMove}
          />
          {/* Add four small frames in the center */}
          <View style={styles.smallFrameGroup}>
            {/* <View style={styles.smallFrame} />
            <View style={styles.smallFrame} />
            <View style={styles.smallFrame} />
            <View style={styles.smallFrame} /> */}
          </View>
        </ImageBackground>
      </Camera>
      <View style={styles.action}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.buttonText}>CHỤP ẢNH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCamera;
