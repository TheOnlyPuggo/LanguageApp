import { Tabs } from "expo-router"

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Learning", headerShown: false}} />
            <Tabs.Screen name="leaderboard" options={{title: "Leaderboard", headerShown: false}} />
            <Tabs.Screen name="profile" options={{title: "Profile", headerShown: false}} />
        </Tabs>
    )
}