import React, { useContext, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./login.style";
import AuthenticationAPI from "../../context/authContext";
import CustomInput from "../../../components/customInput/CustomInput";
import { apiCaller } from "../../../api";
import Toast from "../../../components/toast/Toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [errorInput, setErrorInput] = useState({
    email: "",
    password: "",
  });

  const { setIsLogin, setAccessToken } = useContext(AuthenticationAPI);

  const toastRef = useRef();
  const showToast = (content, type, delay, redirectTo) => {
    if (toastRef.current) {
      toastRef.current.hide(() => {
        toastRef.current.show(content, type, delay, redirectTo);
      });
    }
  };

  const validateInput = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;

    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.trim() !== "";

    let newErrorInput = { email: "", password: "" };

    if (!isValidEmail) newErrorInput = { ...newErrorInput, email: "Email không hợp lệ" };
    if (!isValidPassword) {
      newErrorInput = { ...newErrorInput, password: "Mật khẩu không được bỏ trống" };
    } else if (password.length < 6) {
      newErrorInput = { ...newErrorInput, password: "Mật khẩu tối thiểu 6 ký tự" };
    }

    setErrorInput(newErrorInput);

    return isValidEmail && isValidPassword;
  };

  const handleLogin = async () => {
    if (validateInput()) {
      console.log("Call Api to login");
      const data = {
        email,
        password,
      };

      const response = await apiCaller("POST", "/auth/login", data);

      if (response.status === 200) {
        setIsLogin(true);
        setAccessToken(response.data.accessToken);
        showToast("Đăng nhập thành công", "success", 200, "Trang chủ");
      } else {
        showToast("Đăng nhập thất bại", "error", 200);
      }
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.sloganBlock}>
            <Text style={styles.sloganText}>
              <Text style={styles.sloganTextRed}>Protect</Text> Our Water,
            </Text>
            <Text style={styles.sloganText}>
              <Text style={styles.sloganTextRed}>Sustain</Text> Our Future,
            </Text>
            <Text style={[styles.sloganText, styles.sloganTextRed]}>Every Drop Matters!</Text>
            <Image
              source={require("../../../assets/images/hcmut.png")}
              style={{ height: 150, width: 150, marginLeft: -28 }}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>ĐĂNG NHẬP</Text>
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              placeholder={"Email"}
              onChangeText={setEmail}
              error={errorInput.email}
            />
            <CustomInput
              containerStyle={{ marginVertical: 4 }}
              placeholder={"Mật khẩu"}
              onChangeText={setPasword}
              error={errorInput.password}
              secureTextEntry
            />
            <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
              <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={{ height: 150, width: 150, alignSelf: "center" }}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Login;
