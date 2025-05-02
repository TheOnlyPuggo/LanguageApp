import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';
import LessonData from '../data/lessons.json';

const lessonpage = () => {
    const { id } = useLocalSearchParams();

    let currentLesson;
    for (var i = 0; i < LessonData.length; i++) {
        if (LessonData[i].id == id) {
            currentLesson = LessonData[i];
        }
    }

    const [currentLessonType, setCurrentLessonType] = useState("LearnType")

    const [shownWords, setShownWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(currentLesson.lesson_words[0]);

    let lessonBody;

    const router = useRouter();

    if (currentLessonType == "LearnType") {
        lessonBody = (
            <View>
                <Text style={styles.lesson_text}>Kalaw Kawaw Ya Word</Text>
                <Text>{currentWord.kky_word}</Text>
                <Text style={styles.lesson_text}>English Word</Text>
                <Text>{currentWord.eng_word}</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.title_container}>
                <TouchableOpacity style={styles.back_button} onPress={() => router.back()}>
                    <Image
                        style={styles.back_button_image}
                        source={require('../assets/back_arrow.png')}
                    />
                </TouchableOpacity>
                <View style={styles.title_text_container}>
                    <Text style={styles.title_text}>{currentLesson.title}</Text>
                </View>
                <View style={styles.back_button_image} />
            </View>
            {lessonBody}
        </View>
    )
}

export default lessonpage

const styles = StyleSheet.create({
    title_container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 199, 116, 0.84)",
        paddingVertical: 10,
    },
    title_text_container: {
        flex: 1,
    },
    title_text: {
        fontSize: 28,
        alignSelf: "center",
        color: "white",
    },
    back_button: {
        alignSelf: "center",
        paddingLeft: 16,
    },
    back_button_image: {
        width: 48,
        height: 48,
    },
    lesson_text: {
        fontSize: 32,
        marginVertical: 16,
    }
})