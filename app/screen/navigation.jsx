import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login/Login";
import Home from "./home/Home";
import UpdateMeter from "./updatemeter/UpdateMeter";
import QrScanner from "./qrscanner/QrScanner";
import UpdateInfo from "./updateinfo/UpdateInfo";
import InstallMeter from "./installmeter/InstallMeter";
import { useContext } from "react";
import AuthenticationAPI from "../context/authContext";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isLogin } = useContext(AuthenticationAPI);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          height: 60,
        },
        headerShadowVisible: true,
        headerStatusBarHeight: 0,
      }}
    >
      {isLogin === false ? (
        <Stack.Screen name="Đăng nhập" component={Login} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Trang chủ" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Quét mã QR" component={QrScanner} />
          <Stack.Screen name="Ghi chỉ số nước" component={UpdateMeter} />
          <Stack.Screen name="Cập nhật thông tin" component={UpdateInfo} />
          <Stack.Screen name="Lắp đồng hồ mới" component={InstallMeter} />
        </>
      )}
    </Stack.Navigator>
  );
}
