import { ScrollView, StyleSheet, Text, View } from 'react-native';
import UserLeaderBar from '../../components/UserLeaderBar';
import LeaderBoard from '../../data/leaderboard.json';

const leaderboard = () => {
  const d = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  let sortedUsers = LeaderBoard;
  sortedUsers.sort(function(a, b){return b.points - a.points});
  
  for (var i = 0; i < sortedUsers.length; i++) {
    sortedUsers[i] = {
      ...sortedUsers[i],
      position: i + 1
    }
  }

  return (
    <View>
      <ScrollView>
        <Text style={styles.title}>LEADERBOARD</Text>
        <Text style={styles.date_text}>{months[d.getMonth()]} {d.getFullYear()}</Text>
        {
          sortedUsers.map((user) => (
            <UserLeaderBar
              key={user.id}
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
  }
});