import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';

const lessonpage = () => {
    const { title } = useLocalSearchParams();

    const router = useRouter();

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
                    <Text style={styles.title_text}>{title}</Text>
                </View>
                <View style={styles.back_button_image} />
            </View>
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
    }
})