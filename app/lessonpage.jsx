import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Platform, KeyboardAvoidingView, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';
import LessonData from '../data/lessons.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from "react-native-progress/Bar";

const lessonpage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { width, height } = useWindowDimensions();

    let textFontSize;
    if (height > 750) {
        textFontSize = 32;
    } else if (height > 600) {
        textFontSize = 16;
    }


    const dynamicStyles = getDynamicStyles(textFontSize);

    let currentLesson;
    let lessonEnglishWords = [];
    let lessonKKYWords = [];
    for (var i = 0; i < LessonData.length; i++) {
        if (LessonData[i].id == id) {
            currentLesson = LessonData[i];
            break;
        }
    }

    for (var word of currentLesson.lesson_words) {
        lessonEnglishWords.push(word.eng_word);
        lessonKKYWords.push(word.kky_word);
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
            queue.push(
                {
                    LessonType: "WriteAnswerToKKYType",
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

            router.replace({
                pathname: 'congratspage',
                params: {
                    score: ((questionCorrectAmount / questionShownAmount) * 100).toFixed(2),
                    unlockedLessonId: currentLesson.unlock_lesson_id
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

        if (answerText.toLowerCase().trim() === currentQuestion?.WordData.kky_word.toLowerCase()
            && currentQuestion?.LessonType == "WriteAnswerToKKYType") {
            setShowAnswer(true);
        } else if (currentQuestion?.LessonType == "WriteAnswerToKKYType") {
            for (var word of lessonKKYWords) {
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
            <View style={dynamicStyles.lesson_body}>
                <View style={dynamicStyles.lesson_content}>
                    <Text style={dynamicStyles.lesson_text}>Kalaw Kawaw Ya</Text>
                    <View style={dynamicStyles.learn_word_container}>
                        <Text style={dynamicStyles.learn_word}>{currentQuestion.WordData.kky_word}</Text>
                    </View>
                    <Text style={dynamicStyles.lesson_text}>English</Text>
                    <View style={dynamicStyles.learn_word_container}>
                        <Text style={dynamicStyles.learn_word}>{currentQuestion.WordData.eng_word}</Text>
                    </View>
                </View>
                <View style={dynamicStyles.user_interact}>
                    <TouchableOpacity style={dynamicStyles.interact_button} onPress={() => {
                        const updatedCurrentQuestion = {
                            ...currentQuestion, 
                            HasShown: currentQuestion.HasShown + 1
                        };

                        nextQuestion(updatedCurrentQuestion);
                    }}>
                        <Text style={dynamicStyles.interact_button_text}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    else if (currentQuestion.LessonType == "WriteAnswerToEngType") {
        lessonBody = (
            <View style={dynamicStyles.lesson_body}>
                <View style={dynamicStyles.lesson_content}>
                    <Text style={dynamicStyles.lesson_text}>Translate this word into English</Text>
                    <View style={dynamicStyles.learn_word_container}>
                        <Text style={dynamicStyles.learn_word}>{currentQuestion.WordData.kky_word}</Text>
                    </View>
                    {(showAnswer || userShowedAnswer) && (
                        <View>
                            <Text style={dynamicStyles.lesson_text}>Answer</Text>
                            <View style={dynamicStyles.learn_word_container}>
                                <Text style={dynamicStyles.learn_word}>{currentQuestion.WordData.eng_word}</Text>
                            </View>
                        </View>
                    )}
                </View>
                <View style={dynamicStyles.user_interact}>
                    {answerText.toLowerCase().trim() !== currentQuestion.WordData.eng_word && !userShowedAnswer && (
                        <View>
                            <View style={dynamicStyles.text_field_answer_container}>
                                <TextInput
                                    multiline={true}
                                    style={{fontSize: 32}}
                                    onChangeText={setAnswerText}
                                    value={answerText}
                                    placeholder="Type Answer..."
                                />
                            </View>
                            <TouchableOpacity style={[dynamicStyles.interact_button, {backgroundColor: "rgb(194, 23, 23)"}]} onPress={() => setUserShowedAnswer(true)}>
                                <Text style={dynamicStyles.interact_button_text}>
                                    Show Answer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {answerText.toLowerCase().trim() === currentQuestion.WordData.eng_word && (
                        <View style={[dynamicStyles.text_field_answer_container, {borderColor: "rgb(44, 192, 18)"}]}>
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
                        <View style={[dynamicStyles.text_field_answer_container, {borderColor: "rgb(194, 23, 23)"}]}>
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
                        <TouchableOpacity style={dynamicStyles.interact_button} onPress={() => {
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
                            <Text style={dynamicStyles.interact_button_text}>Next</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    } else if (currentQuestion.LessonType == "WriteAnswerToKKYType") {
        lessonBody = (
            <View style={dynamicStyles.lesson_body}>
                <View style={dynamicStyles.lesson_content}>
                    <Text style={dynamicStyles.lesson_text}>Translate this word into Kalaw Kawaw Ya</Text>
                    <View style={dynamicStyles.learn_word_container}>
                        <Text style={dynamicStyles.learn_word}>{currentQuestion.WordData.eng_word}</Text>
                    </View>
                    {(showAnswer || userShowedAnswer) && (
                        <View>
                            <Text style={dynamicStyles.lesson_text}>Answer</Text>
                            <View style={dynamicStyles.learn_word_container}>
                                <Text style={dynamicStyles.learn_word}>{currentQuestion.WordData.kky_word}</Text>
                            </View>
                        </View>
                    )}
                </View>
                <View style={dynamicStyles.user_interact}>
                    {answerText.toLowerCase().trim() !== currentQuestion.WordData.kky_word && !userShowedAnswer && (
                        <View>
                            <View style={dynamicStyles.text_field_answer_container}>
                                <TextInput
                                    multiline={true}
                                    style={{fontSize: 32}}
                                    onChangeText={setAnswerText}
                                    value={answerText}
                                    placeholder="Type Answer..."
                                />
                            </View>
                            <TouchableOpacity style={[dynamicStyles.interact_button, {backgroundColor: "rgb(194, 23, 23)"}]} onPress={() => setUserShowedAnswer(true)}>
                                <Text style={dynamicStyles.interact_button_text}>
                                    Show Answer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {answerText.toLowerCase().trim() === currentQuestion.WordData.kky_word && (
                        <View style={[dynamicStyles.text_field_answer_container, {borderColor: "rgb(44, 192, 18)"}]}>
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
                        <View style={[dynamicStyles.text_field_answer_container, {borderColor: "rgb(194, 23, 23)"}]}>
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
                    {(answerText.toLowerCase().trim() === currentQuestion.WordData.kky_word || userShowedAnswer) && (
                        <TouchableOpacity style={dynamicStyles.interact_button} onPress={() => {
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
                            <Text style={dynamicStyles.interact_button_text}>Next</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View style={{ flex: 1 }}>
                <View style={dynamicStyles.title_container}>
                    <TouchableOpacity style={dynamicStyles.back_button} onPress={() => 
                        router.push({
                            pathname: '(tabs)',
                        })
                    }>
                        <Image
                            style={dynamicStyles.back_button_image}
                            source={require('../assets/back_arrow.png')}
                        />
                    </TouchableOpacity>
                    <View style={dynamicStyles.title_text_container}>
                        <Text style={dynamicStyles.title_text}>{currentLesson.title}</Text>
                    </View>
                    <View style={dynamicStyles.back_button_image} />
                </View>
                <ProgressBar 
                    style={dynamicStyles.progress_bar} 
                    progress={0.3} 
                    width={width}
                    borderRadius={0}
                    height={10}
                />
                {lessonBody}
            </View>
        </KeyboardAvoidingView>
    )
}

export default lessonpage

const getDynamicStyles = (textFontSize) => StyleSheet.create({
    lesson_body: {
        flex: 1,
        paddingVertical: 10,
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
        fontSize: textFontSize,
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
        marginBottom: 20,
    },
    learn_word: {
        fontSize: textFontSize,
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
        height: 70,
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
        marginBottom: 20,
        justifyContent:  "center"
    },
    progress_bar: {
        alignSelf: "center",
    }
})