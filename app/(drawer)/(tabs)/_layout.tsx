import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { theme } from "~/components/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarActiveBackgroundColor: theme.colors.greenLight,
        tabBarStyle: {
          height: "10%",
          paddingBottom: Platform.OS === "ios" ? 5 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '500',
          marginBottom: 15,
          marginTop: -10,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Riesgos',
          tabBarIcon: ({ color }) => <Ionicons name="warning" color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="appInfo"
        options={{
          title: 'Aplicación',
          tabBarIcon: ({ color }) => <Ionicons name="information-circle" color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="condiciones"
        options={{
          title: 'Términos y condiciones',
          tabBarIcon: ({ color }) => <Ionicons name="document-text" color={color} size={25} />,
        }}
      />
      <Tabs.Screen
        name="detalles"
        options={{
          tabBarItemStyle: { display: 'none' }
        }}
      />
    </Tabs>
  );
}
