import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {  useRouter, useLocalSearchParams } from 'expo-router'
import LessonData from '../data/lessons.json';

const congratspage = () => {
    const { score, unlockedLessonId } = useLocalSearchParams();
    const router = useRouter();

    let unlockedLessonTitle = null;
            
    for (var lesson of LessonData) {
        if (lesson.id == unlockedLessonId) {
            unlockedLessonTitle = lesson.title;
            break;
        }
    }

    return (
        <View style={styles.body}>
            <Text style={styles.congrats_text}>Congratulations!</Text>
            <Text style={styles.score_text}>Score: {score}%</Text>
            {(unlockedLessonTitle == null) && (
                <Text style={[styles.score_text, {fontSize: 25, marginBottom: 100}]}>No lesson was unlocked.</Text>
            )}
            {(unlockedLessonTitle != null) && (
                <Text style={[styles.score_text, {fontSize: 25, marginBottom: 100}]}>{unlockedLessonTitle} was unlocked.</Text>
            )}
            {unlockedLessonId && (<View style={styles.next_lesson_button_container}>
                <TouchableOpacity 
                    style={[styles.home_button, {backgroundColor: "rgb(23, 23, 194)"}]}
                    onPress={() => {
                        router.push({
                            pathname: 'lessonpage',
                            params: {
                                id: unlockedLessonId,
                            }
                        })
                    }}
                >
                    <Text style={styles.home_button_text}>Next Lesson</Text>
                </TouchableOpacity>
            </View>)}
            <View style={styles.home_button_container}>
                <TouchableOpacity 
                    style={styles.home_button}
                    onPress={() => {
                        router.navigate({
                            pathname: '(tabs)',
                        })
                    }}
                >
                    <Text style={styles.home_button_text}>Return Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default congratspage

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "rgba(255, 199, 116, 0.84)",
        justifyContent: "center",
        alignItems: "center"
    },
    congrats_text: {
        color: "rgb(255, 255, 255)",
        fontFamily: "Asap-Bold",
        fontSize: 48,
        textAlign: "center",
    },
    score_text: {
        backgroundColor: "rgba(255, 182, 73, 0.84)",
        color: "rgb(255, 255, 255)",
        padding: 10,
        borderRadius: 16,
        fontSize: 40,
        marginTop: 24,
    },
    next_lesson_button_container: {
        position: "absolute",
        bottom: 120,
        width: "100%",
        alignItems: "center"
    },
    home_button_container: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        alignItems: "center"
    },
    home_button: {
        backgroundColor: "rgb(97, 194, 23)",
        alignSelf: "center",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 70,
    },
    home_button_text: {
        color: "white",
        fontSize: 24,
        fontFamily: "Asap-Bold",
        textAlign: "center",
    },
})