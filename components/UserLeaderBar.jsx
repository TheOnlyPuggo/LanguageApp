import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const UserLeaderBar = (props) => {
    let positionColor;
    let positionShadowColor;
    switch (props.position) {
        case 1:
            positionColor = "rgb(255, 187, 0)";
            positionShadowColor = "rgb(200, 147, 0)";
            break;
        case 2:
            positionColor = "rgb(166, 166, 166)";
            positionShadowColor = "rgb(112, 112, 112)"
            break;
        case 3:
            positionColor = "rgb(116, 65, 53)";
            positionShadowColor = "rgb(85, 47, 39)"
            break;
        default:
            positionColor = "#ffa32b";
            positionShadowColor = "rgba(255, 122, 21, 0.75)";
    }

    const dynamicStyles = getDynamicStyles(positionColor, positionShadowColor);

  return (
    <View style={dynamicStyles.leader_bar}>
        <Text style={dynamicStyles.position_text}>#{props.position}</Text>
        <View>
            {props.name != "You" && (<Text style={dynamicStyles.name_text}>{props.name}</Text>)}
            {props.name == "You" && (<Text style={[dynamicStyles.name_text, { color: "white" }]}>{props.name}</Text>)}
            <Text style={dynamicStyles.points_text}>{props.points.toLocaleString('en')} Points</Text>
        </View>
    </View>
  )
}

export default UserLeaderBar;

const getDynamicStyles = (positionColor, positionShadowColor) => StyleSheet.create({
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
        color: positionColor,
        textShadowColor: positionShadowColor,
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 1,
    },
    name_text: {
        fontSize: 24,
        fontFamily: "Asap-Bold"
    },
    points_text: {
        color: "rgb(81, 81, 81)"
    }
});