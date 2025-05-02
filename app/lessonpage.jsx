import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
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

    const [questionQueue, setQuestionQueue] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);

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

    let lessonBody;

    const router = useRouter();

    const [answerText, setAnswerText] = useState("");
    const [showAnswer, setShowAnswer] = useState(false)
    const [userShowedAnswer, setUserShowedAnswer] = useState(false);

    useEffect(() => {
        if (answerText.toLowerCase() === currentQuestion?.WordData.eng_word.toLowerCase()) {
            setShowAnswer(true);
        }
    }, [answerText, currentQuestion]);

    if (!currentLesson || !currentQuestion) {
        return <Text>Loading...</Text>
    } 

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
                <TouchableOpacity style={styles.next_button} onPress={() => {
                    const updatedCurrentQuestion = {
                        ...currentQuestion, 
                        HasShown: currentQuestion.HasShown + 1
                    };

                    if (updatedCurrentQuestion.HasShown == updatedCurrentQuestion.ShowAmount) {
                        const queue = [...questionQueue];
                        queue.shift();

                        setQuestionQueue(queue);
                        setCurrentQuestion(queue[0]);
                    } else {
                        const queue = [...questionQueue, updatedCurrentQuestion];
                        queue.shift();

                        setQuestionQueue(queue);
                        setCurrentQuestion(queue[0]);
                    }
                }}>
                    <Text style={styles.next_button_text}>Next</Text>
                </TouchableOpacity>
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
                {answerText.toLowerCase() !== currentQuestion.WordData.eng_word && !userShowedAnswer && (
                    <View>
                        <View style={styles.text_field_answer_container}>
                            <TextInput
                                multiline={true}
                                style={styles.text_field_answer}
                                onChangeText={setAnswerText}
                                value={answerText}
                                placeholder="Type Answer..."
                            />
                        </View>
                        {!userShowedAnswer && (
                            <TouchableOpacity style={styles.skip_question_button}>
                                <Text 
                                    style={styles.skip_question_button_text} 
                                    onPress={() => setUserShowedAnswer(true)}
                                >
                                    Show Answer
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                {answerText.toLowerCase() === currentQuestion.WordData.eng_word && (
                    <View>
                        <View style={styles.correct_answer_container}>
                            <Text style={styles.correct_answer}>{answerText}</Text>
                        </View>
                    </View>
                )}
                {userShowedAnswer && (
                    <View>
                        <View style={styles.incorrect_answer_container}>
                            <Text style={styles.incorrect_answer}>{answerText}</Text>
                        </View>
                    </View>
                )}
                {(answerText.toLowerCase() === currentQuestion.WordData.eng_word || userShowedAnswer) && (
                    <TouchableOpacity style={styles.next_button} onPress={() => {

                        let updatedCurrentQuestion;
                        if (userShowedAnswer) {
                            updatedCurrentQuestion = {
                                ...currentQuestion, 
                            };
                        } else {
                            updatedCurrentQuestion = {
                                ...currentQuestion, 
                                HasShown: currentQuestion.HasShown + 1
                            };
                        }

                        if (updatedCurrentQuestion.HasShown == updatedCurrentQuestion.ShowAmount) {
                            const queue = [...questionQueue];
                            queue.shift();
    
                            setQuestionQueue(queue);
                            setCurrentQuestion(queue[0]);
                        } else {
                            const queue = [...questionQueue, updatedCurrentQuestion];
                            queue.shift();
    
                            setQuestionQueue(queue);
                            setCurrentQuestion(queue[0]);
                        }

                        setAnswerText("");
                        setUserShowedAnswer(false);
                        setShowAnswer(false);
                        
                    }}>
                        <Text style={styles.next_button_text}>Next</Text>
                    </TouchableOpacity>
                )}
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
        justifyContent: "space-between",
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
    next_button: {
        backgroundColor: "rgb(97, 194, 23)",
        alignSelf: "center",
        paddingHorizontal: 64,
        paddingVertical: 16,
        borderRadius: 16,
        justifyContent: "flex-end"
    },
    next_button_text: {
        color: "white",
        fontSize: 24,
        fontFamily: "Asap-Bold",
    },
    text_field_answer_container: {
        borderWidth: 4,
        borderRadius: 16,
        borderColor: "rgb(194, 194, 194)",
        backgroundColor: "rgb(227, 227, 227)",
        padding: 10,
        height: 250,
        marginHorizontal: 8,
        marginBottom: 16,
    },
    text_field_answer: {
        fontSize: 32,
    },
    correct_answer_container: {
        borderWidth: 4,
        borderRadius: 16,
        borderColor: "rgb(44, 192, 18)",
        backgroundColor: "rgb(227, 227, 227)",
        padding: 10,
        height: 250,
        marginHorizontal: 8,
        marginBottom: 16,
    },
    correct_answer: {
        fontSize: 32,
    },
    incorrect_answer_container: {
        borderWidth: 4,
        borderRadius: 16,
        borderColor: "rgb(194, 23, 23)",
        backgroundColor: "rgb(227, 227, 227)",
        padding: 10,
        height: 250,
        marginHorizontal: 8,
        marginBottom: 16,
    },
    incorrect_answer: {
        fontSize: 32,
    },
    skip_question_button: {
        backgroundColor: "rgb(194, 23, 23)",
        alignSelf: "center",
        paddingHorizontal: 64,
        paddingVertical: 16,
        borderRadius: 16,
        justifyContent: "flex-end"
    },
    skip_question_button_text: {
        color: "white",
        fontSize: 24,
        fontFamily: "Asap-Bold",
    }
})