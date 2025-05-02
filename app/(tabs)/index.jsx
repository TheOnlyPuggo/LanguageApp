import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LessonBar from '../../components/LessonBar';
import LessonData from '../../data/lessons.json';

const LearningPage = () => {
  return (
    <View>
      <ScrollView>
        <Text style={styles.title}>LEARN</Text>
        {
          LessonData.map((lesson) => (
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