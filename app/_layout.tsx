import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  NavigationBar.setBackgroundColorAsync('#1E1E25')
  return (
    <View className='flex-1 bg-background'>
      <Stack>
        <Stack.Screen name="index" options={{headerShown:false, animation:'fade_from_bottom'}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation:'fade_from_bottom' }} />
        <Stack.Screen name="profile" options={{ headerShown:false, animation:'ios'}}/>
        <Stack.Screen name='userdetails' options={{headerShown:false, animation:'ios'}}/>
        <Stack.Screen name='exercise' options={{headerShown:false, animation:'ios'}}/>
        <Stack.Screen name='statGraphs' options={{headerShown:false, animation:'ios'}}/>
        <Stack.Screen name='mealData' options={{headerShown:false, animation:'ios'}}/>
        <Stack.Screen name='performWorkouts' options={{headerShown:false, animation:'ios'}}/>
      </Stack>
    </View>
  )
}
