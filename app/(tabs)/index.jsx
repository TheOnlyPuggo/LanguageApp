import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import LessonBar from '../../components/LessonBar';
import LessonData from '../../data/lessons.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const LearningPage = () => {
  const [lessons, setLessons] = useState(LessonData);

  useFocusEffect(
    React.useCallback(() => {
      const loadUnlockedLessons = async () => {
        const updatedLessons = await Promise.all(LessonData.map(async (lesson) => {
          if (!lesson.locked) return lesson;
    
          const unlocked = await AsyncStorage.getItem(`lesson_unlocked_${lesson.id}`);
          if (unlocked !== null) {
            const parsed = JSON.parse(unlocked);

            return {
              ...lesson,
              locked: !parsed
            }
          }
          else {
            return {
              ...lesson,
            }
          }
        }));
    
        setLessons(updatedLessons);
      };
  
      loadUnlockedLessons();
    }, [])
  );

  if (!lessons) {
    return <Text>Loading...</Text>
  }

  return (
    <View>
      <StatusBar hidden />
      <ScrollView>
        <Text style={styles.title}>LEARN</Text>
        {
          lessons.map((lesson) => (
            <LessonBar
              key={lesson.id}
              lesson={lesson}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}
    
export default LearningPage;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffa32b",
    paddingVertical: 8,
    textShadowColor: 'rgba(255, 122, 21, 0.75)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  }
});