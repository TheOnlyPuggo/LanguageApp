import { Tabs } from "expo-router"
import { Image, View } from 'react-native';

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Learning", headerShown: false, tabBarLabel: () => null, tabBarIcon: ({ color, focused }) => (
                <View style={{ paddingTop: "10" }}>
                    <Image
                        source={require('../../assets/LearnPageIcon.png')}
                        style={{
                            width: 24,
                            height: 24,
                            opacity: focused ? 1 : 0.5,
                        }}
                    />
                </View>
            )}} />
            <Tabs.Screen name="leaderboard" options={{title: "Leaderboard", headerShown: false, tabBarLabel: () => null, tabBarIcon: ({ color, focused }) => (
                <View style={{ paddingTop: "10" }}>
                    <Image
                        source={require('../../assets/Leaderboards.png')}
                        style={{
                            width: 30,
                            height: 24,
                            opacity: focused ? 1 : 0.5,
                        }}
                    />
                </View>
            )}} />
            <Tabs.Screen name="profile" options={{title: "Profile", headerShown: false, tabBarLabel: () => null, tabBarIcon: ({ color, focused }) => (
                <View style={{ paddingTop: "10" }}>
                    <Image
                        source={require('../../assets/ProfilePageIcon.png')}
                        style={{
                            width: 24,
                            height: 24,
                            opacity: focused ? 1 : 0.5,
                        }}
                    />
                </View>
            )}} />
        </Tabs>
    )
}