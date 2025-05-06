import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const developermenu = () => {
    const router = useRouter();

    return (
        <View>
        <Button
            title="Reset State"
            onPress={async () => {
                await AsyncStorage.clear();
                setUserPoints(0);
            }}
        />
        <Button
            title="Congrats Page Link"
            onPress={() => router.navigate(
                {
                    pathname: 'congratspage',
                    params: {
                        score: 69,
                        unlockedLessonId: 3
                    }
                }
            )}
        />
        <Button 
            title="Add 1000 Points"
            onPress={async () => {
                const currentPoints = await AsyncStorage.getItem(`user_points`);
                if (currentPoints !== null) {
                    const parsed = JSON.parse(currentPoints);
                    await AsyncStorage.setItem(`user_points`, JSON.stringify(parsed + 1000))
                } else {
                    await AsyncStorage.setItem(`user_points`, JSON.stringify(1000))
                }
            }}
        />
        <Button 
            title="Remove 1000 Points"
            onPress={async () => {
                const currentPoints = await AsyncStorage.getItem(`user_points`);
                if (currentPoints !== null) {
                    const parsed = JSON.parse(currentPoints);
                    await AsyncStorage.setItem(`user_points`, JSON.stringify(parsed - 1000))
                } else {
                    await AsyncStorage.setItem(`user_points`, JSON.stringify(-1000))
                }
            }}
        />
        </View>
    );
    }

export default developermenu;

const styles = StyleSheet.create({});