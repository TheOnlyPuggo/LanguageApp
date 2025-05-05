import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from 'expo-router';
import UserLeaderBar from '../../components/UserLeaderBar';
import LeaderBoard from '../../data/leaderboard.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const leaderboard = () => {
  const d = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const [sortedUsers, setSortedUsers] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let username = "";

      const getUsername = async () => {
        const retrievedUsername = await AsyncStorage.getItem(`user_name`);
        if (retrievedUsername !== null) {
          const parsed = JSON.parse(retrievedUsername);
          username = parsed;
        } else {
          await AsyncStorage.setItem(`user_name`, JSON.stringify("User"))
        }
      }

      const getPointsAndSort = async () => {
        const points = await AsyncStorage.getItem(`user_points`);
        const parsed = points ? JSON.parse(points) : 0;

        const users = LeaderBoard.filter(user => user.name !== "You");

        users.push(
          {
            "id": "user",
            "name": username,
            "points": parsed
          }
        );

        users.sort(function(a, b){return b.points - a.points});
  
        const usersWithPositions = users.map((user, index) => ({
          ...user,
          position: index + 1
        }));

        setSortedUsers(usersWithPositions);
      };

      getUsername();
      getPointsAndSort();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.title}>LEADERBOARD</Text>
        <Text style={styles.date_text}>{months[d.getMonth()]} {d.getFullYear()}</Text>
        {
          sortedUsers.map((user) => (
            <UserLeaderBar
              key={user.id}
              id={user.id}
              position={user.position}
              name={user.name}
              points={user.points}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}

export default leaderboard;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffa32b",
    textShadowColor: 'rgba(255, 122, 21, 0.75)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1,
  },
  date_text: {
    fontSize: 20,
    marginLeft: 28,
    color: "#ffa32b",
    fontFamily: "Asap-Bold",
    marginBottom: 16,
  },
});