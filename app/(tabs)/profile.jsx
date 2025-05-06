import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';

const profile = () => {
  const router = useRouter();

    const [userPoints, setUserPoints] = useState(0);
    const [username, setUsername] = useState("");

    const [changingUsername, setChangingUsername] = useState(false);

    const [newUsername, setNewUsername] = useState("");

    useFocusEffect(
      React.useCallback(() => {
        const getPoints = async () => {
          const points = await AsyncStorage.getItem(`user_points`);
          if (points !== null) {
              const parsed = JSON.parse(points);
              setUserPoints(parsed);
          } else {
            setUserPoints(0);
          }
        };

        const getUsername = async () => {
          const retrievedUsername = await AsyncStorage.getItem(`user_name`);
          if (retrievedUsername !== null) {
            const parsed = JSON.parse(retrievedUsername);
            setUsername(parsed);
            setNewUsername(parsed);
          } else {
            await AsyncStorage.setItem(`user_name`, JSON.stringify("User"))
            setUsername("User");
            setNewUsername("User");
          }
        }
    
        getPoints();
        getUsername();
        
        setChangingUsername(false);
      }, [])
    );

    async function changeUsername(name) {
      await AsyncStorage.setItem(`user_name`, JSON.stringify(name));
    }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.profile_box}>
        <Image
            source={require('../../assets/user-profile-icon.png')}
        />
        <View style={styles.user_info}>
          {!changingUsername && (<Text style={styles.username_text}>{username}</Text>)}
          {changingUsername && (<Text style={styles.username_text}>{newUsername}</Text>)}
          <Text style={styles.points_text}>Points: {userPoints.toLocaleString('en')}</Text>
        </View>
      </View>
      <View style={styles.options_box}>
        {!changingUsername && (
          <TouchableOpacity style={styles.option}  onPress={() => setChangingUsername(true)}>
            <Text style={styles.option_text}>Change Username</Text>
          </TouchableOpacity>
        )}
        {changingUsername && (
          <View style={[styles.option, { paddingVertical: 7 }]}>
            <TextInput
              style={styles.username_input}
              placeholder="Enter New Username..."
              autoFocus={true}
              value={newUsername}
              onChangeText={setNewUsername}
              onSubmitEditing={() => {
                setChangingUsername(false);
                changeUsername(newUsername);
                setUsername(newUsername);
              }}
              maxLength={10}
              placeholderTextColor={"grey"}
            />
          </View>
        )}
        <TouchableOpacity style={styles.option}>
          <Text style={styles.option_text}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.option_text}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option, { borderBottomWidth: 0 }]} onPress={() => {
          router.navigate({
            pathname: "developermenu"
          });
        }}>
          <Text style={styles.option_text}>Developer Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default profile;

const styles = StyleSheet.create({
  profile_box: {
    backgroundColor: "rgba(255, 199, 116, 0.84)",
    flexDirection: "row",
    padding: 10,
    margin: 20,
    borderRadius: 16,
  },
  user_info: {
    justifyContent: "center"
  },
  username_text: {
    fontSize: 38,
    fontFamily: "Asap-Bold",
    color: "white"
  },
  points_text: {
    fontSize: 24,
    color: "white"
  },
  options_box: {
    borderColor: "rgb(232, 231, 231)",
    borderWidth: 3,
    marginHorizontal: 20,
    borderRadius: 16,
  },
  option: {
    borderBottomColor: "rgb(232, 231, 231)",
    borderBottomWidth: 3,
    padding: 16,
  },
  option_text: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Asap"
  },
  username_input: {
    fontSize: 24,
    fontFamily: "Asap"
  }
});