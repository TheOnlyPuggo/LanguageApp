import { Tabs } from "expo-router"
import { Image } from 'react-native';

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Learning", headerShown: false, tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={require('../../assets/LearnPageIcon.png')}
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: color,
                                opacity: focused ? 1 : 0.6,
                            }}
                        />
                    ),}} />
            <Tabs.Screen name="leaderboard" options={{title: "Leaderboard", headerShown: false, tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={require('../../assets/Leaderboards.png')}
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: color,
                                opacity: focused ? 1 : 0.6,
                            }}
                        />
                    ),}} />
            <Tabs.Screen name="profile" options={{title: "Profile", headerShown: false, tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={require('../../assets/ProfilePageIcon.png')}
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: color,
                                opacity: focused ? 1 : 0.6,
                            }}
                        />
                    ),}} />
        </Tabs>
    )
}