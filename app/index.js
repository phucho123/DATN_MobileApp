import { AuthenticationContext } from "./context/authContext";
import AppNavigator from "./screen/navigation";

export default function App() {
  return (
    <AuthenticationContext>
      <AppNavigator />
    </AuthenticationContext>
  );
}
