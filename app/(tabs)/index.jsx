import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LessonBar from '../../components/LessonBar';
import LessonData from '../../data/lessons.json';

const LearningPage = () => {
  var lessons = [];

  return (
    <View>
      <Text style={styles.title}>LEARN</Text>
      <ScrollView>
        {
          LessonData.map((lesson) => (
            <LessonBar
              key={lesson.id}
              title={lesson.title}
              desc={lesson.desc}
              lessonLocked={lesson.locked}
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
    paddingTop: 12,
    textShadowColor: 'rgba(255, 122, 21, 0.75)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
    marginBottom: 24,
  }
});