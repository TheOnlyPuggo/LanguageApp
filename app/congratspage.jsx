import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router'
import React, { useState } from 'react';
import LessonData from '../data/lessons.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const congratspage = () => {
    const { score, pointsEarned, unlockedLessonId } = useLocalSearchParams();
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
            <Text style={styles.congrats_text}>Lesson Complete!</Text>
            <View style={styles.stats_containier}>
                <View style={styles.stats_inline}>
                    <Text style={styles.stats_text}>Accuracy: </Text>
                    <Text style={styles.stats_result_text}>{score}%</Text>
                </View>
                <View style={styles.stats_inline}>
                    <Text style={styles.stats_text}>Points Earned: </Text>
                    <Text style={styles.stats_result_text}>{pointsEarned}</Text>
                </View>
                <View style={styles.stats_inline}>
                    <Text style={styles.stats_text}>Unlocked: </Text>
                    {unlockedLessonTitle && (<Text style={styles.stats_result_text}>{unlockedLessonTitle}</Text>)}
                </View>
            </View>
            {unlockedLessonId && (<View style={styles.next_lesson_button_container}>
                <TouchableOpacity 
                    style={[styles.home_button, {backgroundColor: "rgb(97, 194, 23)"}]}
                    onPress={() => {
                        router.navigate({
                            pathname: 'lessonpage',
                            params: {
                                id: unlockedLessonId,
                            }
                        });
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
                            pathname: 'index',
                        });
                        router.dismissAll();
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
        backgroundColor: "rgba(253, 179, 68, 0.84)",
        //alignItems: "center"
    },
    congrats_text: {
        color: "white",
        fontFamily: "Asap-Bold",
        fontSize: 40,
        textAlign: "center",
        marginTop: 100,
        borderBottomWidth: 4,
        borderBottomColor: "white",
        paddingHorizontal: 8,
        alignSelf: "center",
    },
    stats_containier: {
        marginTop: 20,
        marginLeft: 38,
    },
    stats_text: {
        color: "white",
        fontSize: 28,
        fontFamily: "Asap-Bold",
    },
    stats_inline: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    stats_result_text: {
        fontSize: 28,
        color: "white",
        paddingHorizontal: 10,
        backgroundColor: "rgba(255, 163, 24, 0.84)",
        borderRadius: 8,
        marginLeft: 12,
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
        backgroundColor: "rgb(150, 150, 150)",
        alignSelf: "center",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        width: 250,
        height: 60,
    },
    home_button_text: {
        color: "white",
        fontSize: 24,
        fontFamily: "Asap-Bold",
        textAlign: "center",
    },
})