import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  return <>
    <StatusBar
      barStyle='default'
      backgroundColor="#00000080"
      translucent={true}
      animated={true}
      hidden={false}
      showHideTransition="fade"
    />
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="movies/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  </>;
}
