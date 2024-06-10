import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <View className='flex-1 bg-background'>
      <Stack>
        <Stack.Screen name="index" options={{headerShown:false, animation:'fade_from_bottom'}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation:'fade_from_bottom' }} />
      </Stack>
    </View>
  )
}
