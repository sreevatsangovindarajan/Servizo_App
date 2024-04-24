import {
  Entypo,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.background },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarActiveBackgroundColor: Colors.background,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerShadowVisible: false,

        //hide tabs when keyboard is open
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          title: "Home",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          headerTitle: "My Bookings",
          title: "Bookings ",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerTitle: "My Saved",
          title: "Saved ",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          unmountOnBlur: true,
          key: Math.random().toString(),
          tabBarIcon: ({ size, color }) => (
            <Fontisto name="favorite" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Proflie",
          title: "Proflie ",
          headerShown: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
