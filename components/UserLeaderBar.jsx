import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const UserLeaderBar = (props) => {
    let positionColor;
    switch (props.position) {
        case 1:
            positionColor = "rgb(255, 187, 0)";
            break;
        case 2:
            positionColor = "rgb(166, 166, 166)";
            break;
        case 3:
            positionColor = "rgb(116, 65, 53)";
            break;
        default:
            positionColor = "rgba(255, 122, 21, 0.75)";
    }

    const dynamicStyles = getDynamicStyles(positionColor);

  return (
    <View style={dynamicStyles.leader_bar}>
        <Text style={dynamicStyles.position_text}>#{props.position}</Text>
        <View>
            <Text style={dynamicStyles.name_text}>{props.name}</Text>
            <Text style={dynamicStyles.points_text}>{props.points.toLocaleString('en')} Points</Text>
        </View>
    </View>
  )
}

export default UserLeaderBar;

const getDynamicStyles = (positionColor) => StyleSheet.create({
    leader_bar: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "rgba(255, 199, 116, 0.84)",
        paddingVertical: 4,
        paddingHorizontal: 14,
        marginHorizontal: 20,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 4,
    },
    position_text: {
        fontSize: 32,
        fontFamily: "Asap-Bold",
        marginRight: 10,
        color: positionColor
    },
    name_text: {
        fontSize: 24,
        fontFamily: "Asap-Bold"
    },
    points_text: {
        color: "rgb(81, 81, 81)"
    }
});