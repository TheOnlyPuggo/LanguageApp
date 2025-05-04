import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';
import LessonData from '../data/lessons.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lessonpage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    let currentLesson;
    let lessonEnglishWords = [];
    let lessonKKYWords = [];
    for (var i = 0; i < LessonData.length; i++) {
        if (LessonData[i].id == id) {
            currentLesson = LessonData[i];
        }

        for (var word of LessonData[i].lesson_words) {
            lessonEnglishWords.push(word.eng_word);
            lessonKKYWords.push(word.kky_word);
        }
    }

    const [questionQueue, setQuestionQueue] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const [questionShownAmount, setQuestionShownAmount] = useState(0);
    const [questionCorrectAmount, setQuestionCorrectAmount] = useState(0);

    const [answerText, setAnswerText] = useState("");
    const [showAnswer, setShowAnswer] = useState(false)
    const [userShowedAnswer, setUserShowedAnswer] = useState(false);

    async function unlockNewLesson() {
        const unlockId = currentLesson.unlock_lesson_id;
        if (unlockId != null) {
            await AsyncStorage.setItem(`lesson_unlocked_${unlockId}`, JSON.stringify(true));
        }
    }

    useEffect(() => {
        let queue = [];

        for (const words of currentLesson.lesson_words) {
            queue.push(
                {
                    LessonType: "LearnType",
                    ShowAmount: 1,
                    HasShown: 0,
                    WordData: words,
                }
            );
            queue.push(
                {
                    LessonType: "WriteAnswerToEngType",
                    ShowAmount: 2,
                    HasShown: 0,
                    WordData: words,
                }
            );
        }

        setQuestionQueue(queue);
        setCurrentQuestion(queue[0]);
    }, []);

    function nextQuestion(updatedCurrentQuestion, questionCorrect = null) {
        let queue;

        if (updatedCurrentQuestion.HasShown == updatedCurrentQuestion.ShowAmount) {
            queue = [...questionQueue];
        } else {
            queue = [...questionQueue, updatedCurrentQuestion];
        }

        queue.shift();
        if (queue.length == 0) {
            unlockNewLesson();
            let unlockedLessonTitle = null;
            
            for (var lesson of LessonData) {
                if (lesson.id == currentLesson.unlock_lesson_id) {
                    unlockedLessonTitle = lesson.title;
                    break;
                }
            }

            router.replace({
                pathname: 'congratspage',
                params: {
                    score: ((questionCorrectAmount / questionShownAmount) * 100).toFixed(2),
                    unlockedLessonTitle: unlockedLessonTitle
                }
            });
        }

        let lessonTypeExists = false;
        for (var lesson of queue) {
            if (lesson.LessonType === "LearnType") {
                lessonTypeExists = true;
                break;
            }
            i++;
        }

        if (!lessonTypeExists && queue.length >= 3) {
            if (Math.random() >= 0.2) {
                let temp = queue[1];
                queue[1] = queue[2];
                queue[2] = temp;
            }
        }
        
        setQuestionQueue(queue);
        setCurrentQuestion(queue[0]);

        setAnswerText("");
        setUserShowedAnswer(false);
        setShowAnswer(false);
    }

    useEffect(() => {
        if (answerText.toLowerCase().trim() === currentQuestion?.WordData.eng_word.toLowerCase()
            && currentQuestion?.LessonType == "WriteAnswerToEngType") {
            setShowAnswer(true);
        } else if (currentQuestion?.LessonType == "WriteAnswerToEngType") {
            for (var word of lessonEnglishWords) {
                if (answerText.toLowerCase().trim() === word) {
                    setUserShowedAnswer(true);
                }
            }
        }
    }, [answerText, currentQuestion]);

    if (!currentLesson || !currentQuestion) {
        return <View style={{flex: 1, backgroundColor: "rgba(255, 199, 116, 0.84)"}}></View>
    } 

    let lessonBody;

    if (currentQuestion.LessonType == "LearnType") {
        lessonBody = (
            <View style={styles.lesson_body}>
                <View style={styles.lesson_content}>
                    <Text style={styles.lesson_text}>Kalaw Kawaw Ya</Text>
                    <View style={styles.learn_word_container}>
                        <Text style={styles.learn_word}>{currentQuestion.WordData.kky_word}</Text>
                    </View>
                    <Text style={styles.lesson_text}>English</Text>
                    <View style={styles.learn_word_container}>
                        <Text style={styles.learn_word}>{currentQuestion.WordData.eng_word}</Text>
                    </View>
                </View>
                <View style={styles.user_interact}>
                    <TouchableOpacity style={styles.interact_button} onPress={() => {
                        const updatedCurrentQuestion = {
                            ...currentQuestion, 
                            HasShown: currentQuestion.HasShown + 1
                        };

                        nextQuestion(updatedCurrentQuestion);
                    }}>
                        <Text style={styles.interact_button_text}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    else if (currentQuestion.LessonType == "WriteAnswerToEngType") {
        lessonBody = (
            <View style={styles.lesson_body}>
                <View style={styles.lesson_content}>
                    <Text style={styles.lesson_text}>Translate this word into English</Text>
                    <View style={styles.learn_word_container}>
                        <Text style={styles.learn_word}>{currentQuestion.WordData.kky_word}</Text>
                    </View>
                    {(showAnswer || userShowedAnswer) && (
                        <View>
                            <Text style={styles.lesson_text}>Answer</Text>
                            <View style={styles.learn_word_container}>
                                <Text style={styles.learn_word}>{currentQuestion.WordData.eng_word}</Text>
                            </View>
                        </View>
                    )}
                </View>
                <View style={styles.user_interact}>
                    {answerText.toLowerCase().trim() !== currentQuestion.WordData.eng_word && !userShowedAnswer && (
                        <View>
                            <View style={styles.text_field_answer_container}>
                                <TextInput
                                    multiline={true}
                                    style={{fontSize: 32}}
                                    onChangeText={setAnswerText}
                                    value={answerText}
                                    placeholder="Type Answer..."
                                />
                            </View>
                            <TouchableOpacity style={[styles.interact_button, {backgroundColor: "rgb(194, 23, 23)"}]} onPress={() => setUserShowedAnswer(true)}>
                                <Text style={styles.interact_button_text}>
                                    Show Answer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {answerText.toLowerCase().trim() === currentQuestion.WordData.eng_word && (
                        <View style={[styles.text_field_answer_container, {borderColor: "rgb(44, 192, 18)"}]}>
                            <TextInput
                                multiline={true}
                                style={{fontSize: 32}}
                                onChangeText={setAnswerText}
                                value={answerText}
                                placeholder="Type Answer..."
                                editable={false}
                            />
                        </View>
                    )}
                    {userShowedAnswer && (
                        <View style={[styles.text_field_answer_container, {borderColor: "rgb(194, 23, 23)"}]}>
                        <TextInput
                            multiline={true}
                            style={{fontSize: 32}}
                            onChangeText={setAnswerText}
                            value={answerText}
                            placeholder="Type Answer..."
                            editable={false}
                        />
                    </View>
                    )}
                    {(answerText.toLowerCase().trim() === currentQuestion.WordData.eng_word || userShowedAnswer) && (
                        <TouchableOpacity style={styles.interact_button} onPress={() => {
                            let updatedCurrentQuestion;
                            let questionCorrect;                            

                            if (userShowedAnswer) {
                                updatedCurrentQuestion = {
                                    ...currentQuestion,
                                };
                                questionCorrect = false;
                                setQuestionShownAmount(questionShownAmount + 1);
                            } else {
                                updatedCurrentQuestion = {
                                    ...currentQuestion, 
                                    HasShown: currentQuestion.HasShown + 1
                                };
                                setQuestionCorrectAmount(questionCorrectAmount + 1);
                                setQuestionShownAmount(questionShownAmount + 1);
                            }

                            nextQuestion(updatedCurrentQuestion, questionCorrect);
                        }}>
                            <Text style={styles.interact_button_text}>Next</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
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
    lesson_body: {
        flex: 1,
        paddingVertical: 32,
    },
    lesson_content: {
        alignItems: "center"
    },
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
        fontFamily: "Asap-Bold"
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
        marginBottom: 4,
        fontFamily: "Asap-Bold",
        textAlign: "center"
    },
    learn_word_container: {
        backgroundColor: "rgba(255, 218, 162, 0.84)",
        alignSelf: "center",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 16,
        borderColor: "rgba(255, 199, 116, 0.84)",
        borderWidth: 3,
        marginBottom: 32,
    },
    learn_word: {
        fontSize: 36,
        fontFamily: "Asap"
    },
    user_interact: {
        flex: 1,
        justifyContent: "flex-end",
    },
    interact_button: {
        backgroundColor: "rgb(97, 194, 23)",
        alignSelf: "center",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 70
    },
    interact_button_text: {
        color: "white",
        fontSize: 24,
        fontFamily: "Asap-Bold",
        textAlign: "center",
    },
    text_field_answer_container: {
        borderWidth: 4,
        borderRadius: 16,
        borderColor: "rgb(194, 194, 194)",
        backgroundColor: "rgb(227, 227, 227)",
        padding: 10,
        height: 100,
        marginHorizontal: 8,
        marginBottom: 32,
        justifyContent:  "center"
    },
})