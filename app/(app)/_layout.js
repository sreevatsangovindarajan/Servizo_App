import React from "react";
import { Stack } from "expo-router";

export default AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="services"
        // rerender the screen when the user navigates to this screen

        options={{}}
      />
      <Stack.Screen
        name="service"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="book" />
      <Stack.Screen name="booking" />
    </Stack>
  );
};
