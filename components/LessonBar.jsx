import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LessonBar = (props) => {
    const lessonLocked = props.lessonLocked;
    let button;

    if (!lessonLocked) {
        button = (
            <TouchableOpacity style={styles.custom_button_unlocked}>
                <Text style={styles.button_text_unlocked}>Start</Text>
            </TouchableOpacity>
        );
    }
    else {
        button = (
            <TouchableOpacity style={styles.custom_button_locked} activeOpacity={1.0}>
                <Text style={styles.button_text_locked}>Locked</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.message_box}>
            <View style={styles.text_container}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.desc}>{props.desc}</Text>
            </View>
            {button}
        </View>
    )
};

export default LessonBar;

const styles = StyleSheet.create({
    message_box: {
        backgroundColor: "rgba(255, 214, 152, 0.84)",
        paddingVertical: 6,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginHorizontal: 8,
        flexDirection: "row",
        marginBottom: 6,
    },
    text_container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    desc: {
        fontSize: 16,
    },
    custom_button_unlocked: {
        backgroundColor: "rgb(97, 194, 23)",
        alignSelf: "center",
        paddingVertical: 8,
        width: 100,
        borderRadius: 16,
    },
    custom_button_locked: {
        backgroundColor: "rgb(220, 220, 220)",
        alignSelf: "center",
        paddingVertical: 8,
        width: 100,
        borderRadius: 16,
    },
    button_text_unlocked: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    button_text_locked: {
        color: "rgb(84, 84, 84)",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    }
});