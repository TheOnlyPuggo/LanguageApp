import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'Asap': require('../assets/fonts/Asap.ttf'),
        'Asap-Italic': require('../assets/fonts/Asap-Italic.ttf'),
        'Asap-Bold': require('../assets/fonts/Asap-Bold.ttf')
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
            <Stack.Screen name="lessonpage" options={{headerShown: false}} />
        </Stack>
    )
}