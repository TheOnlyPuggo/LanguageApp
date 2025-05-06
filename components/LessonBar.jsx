import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

const LessonBar = (props) => {
    const lessonLocked = props.lesson.locked;
    let button;

    const router = useRouter();

    

    let backgroundColor;
    if (props.lesson.review_lesson) {
        backgroundColor = "rgba(255, 171, 46, 0.84)"
    } else {
        backgroundColor = "rgba(255, 199, 116, 0.84)";
    }

    const dynamicStyles = getDynamicStyles(backgroundColor);

    if (!lessonLocked) {
        button = (
            <TouchableOpacity style={dynamicStyles.custom_button_unlocked} onPress={
                () => {
                    router.push({
                        pathname: 'lessonpage',
                        params: {
                            id: props.lesson.id,
                        }
                    });
                }
            }>
                <Text style={dynamicStyles.button_text_unlocked}>Start</Text>
            </TouchableOpacity>
        );
    }
    else {
        button = (
            <TouchableOpacity style={dynamicStyles.custom_button_locked} activeOpacity={1.0}>
                <Text style={dynamicStyles.button_text_locked}>Locked</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={dynamicStyles.message_box}>
            <View style={dynamicStyles.text_container}>
                <Text style={dynamicStyles.title}>{props.lesson.title}</Text>
                <Text style={dynamicStyles.desc}>{props.lesson.desc}</Text>
            </View>
            {button}
        </View>
    )
};

export default LessonBar;

const getDynamicStyles = (backgroundColor) => StyleSheet.create({
    message_box: {
        backgroundColor: backgroundColor,
        paddingVertical: 6,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginHorizontal: 8,
        flexDirection: "row",
        marginVertical: 6,
    },
    text_container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: "Asap-Bold",
    },
    desc: {
        fontSize: 16,
        fontFamily: "Asap"
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
        textAlign: "center",
        fontFamily: "Asap-Bold"
    },
    button_text_locked: {
        color: "rgb(84, 84, 84)",
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Asap-Bold"
    }
});