import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/authcontext";
import { useFonts } from "expo-font";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // check if user is authenticated or not
    if (typeof isAuthenticated === "undefined") return;

    if (isAuthenticated) {
      while (router.canGoBack()) {
        router.back();
      }
      router.replace("/home");
    } else if (isAuthenticated === false) {
      while (router.canGoBack()) {
        router.back();
      }
      router.replace("/signin");
    }
  }, [isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/signin"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/signup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/forgotpassword"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(app)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),

    "U-Regular": require("../assets/fonts/Urbanist/Urbanist-Regular.ttf"),
    "U-Bold": require("../assets/fonts/Urbanist/Urbanist-Bold.ttf"),
    "U-SemiBold": require("../assets/fonts/Urbanist/Urbanist-SemiBold.ttf"),
    "U-Medium": require("../assets/fonts/Urbanist/Urbanist-Medium.ttf"),
    "U-Light": require("../assets/fonts/Urbanist/Urbanist-Light.ttf"),
    "U-ExtraLight": require("../assets/fonts/Urbanist/Urbanist-ExtraLight.ttf"),
    "U-ExtraBold": require("../assets/fonts/Urbanist/Urbanist-ExtraBold.ttf"),
    "U-Thin": require("../assets/fonts/Urbanist/Urbanist-Thin.ttf"),
    "U-Black": require("../assets/fonts/Urbanist/Urbanist-Black.ttf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

export default RootLayout;
