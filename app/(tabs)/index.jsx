import { StyleSheet, Text, View } from 'react-native'

const LearningPage = () => {
  return (
    <View>
      <Text style={styles.title}>LEARN</Text>
    </View>
  )
}
    
export default LearningPage

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
  }
})