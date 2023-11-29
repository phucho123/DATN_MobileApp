import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screen/home/Home";
import UpdateMeter from "./screen/updatemeter/UpdateMeter";
import QrScanner from "./screen/qrscanner/QrScanner";
import UpdateInfo from "./screen/updateinfo/UpdateInfo";
import InstallMeter from "./screen/installmeter/InstallMeter";

const Stack = createStackNavigator();

export default function App() {
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
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Qr Scanner" component={QrScanner} />
      <Stack.Screen name="Update Meter" component={UpdateMeter} />
      <Stack.Screen name="Update Information" component={UpdateInfo} />
      <Stack.Screen name="Install New Meter" component={InstallMeter} />
    </Stack.Navigator>
  );
}
