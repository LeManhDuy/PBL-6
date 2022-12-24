import { createStackNavigator } from "@react-navigation/stack";
import Notifications from "./Notifications";
import SendNotice from "./SendNotice";

const NotificationStack = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator defaultScreenOptions={'Notifications'} screenOptions={{
        headerShown: false
      }}>
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="SendNotice" component={SendNotice} 
          />
      </Stack.Navigator>
    )
  }
export default NotificationStack