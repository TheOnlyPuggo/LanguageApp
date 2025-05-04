import { Button, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const profile = () => {
  const router = useRouter();

  return (
    <View>
      <Button
        title="Reset State"
        onPress={async () => await AsyncStorage.clear()}
      />
      <Button
        title="Congrats Page Temp Link"
        onPress={() => router.push({
          pathname: 'congratspage',
          params: {
            score: 69,
            unlockedLessonTitle: null
          }
        })}
      />
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})