import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    PretendardThin: require('../assets/fonts/Pretendard-Thin.otf'),
    PretendardLight: require('../assets/fonts/Pretendard-Light.otf'),
    PretendardRegular: require('../assets/fonts/Pretendard-Regular.otf'),
    PretendardMedium: require('../assets/fonts/Pretendard-Medium.otf'),
    PretendardSemiBold: require('../assets/fonts/Pretendard-SemiBold.otf'),
    PretendardBold: require('../assets/fonts/Pretendard-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
}
