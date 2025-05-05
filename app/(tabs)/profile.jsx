import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';

const profile = () => {
  const router = useRouter();

    const [userPoints, setUserPoints] = useState(0);

    useFocusEffect(
      React.useCallback(() => {
        const getPoints = async () => {
          const points = await AsyncStorage.getItem(`user_points`);
          if (points !== null) {
              const parsed = JSON.parse(points);
              setUserPoints(parsed);
          }
        };
    
        getPoints();
      }, [])
    );

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
        title="Congrats Page Temp Link"
        onPress={() => router.navigate({
          pathname: 'congratspage',
          params: {
            score: 69,
            unlockedLessonId: 3
          }
        })}
      />
      <Text>User Points: {userPoints}</Text>
    </View>
  );
}

export default profile;

const styles = StyleSheet.create({});