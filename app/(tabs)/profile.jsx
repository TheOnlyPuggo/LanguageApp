import { Button, StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const profile = () => {
  return (
    <View>
      <Button
        title="Reset State"
        onPress={async () => await AsyncStorage.clear()}
      />
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})