import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const Survey = () => {
    const [responses, setResponses] = useState({
        q1: '',
        q2: '',
        q3: '',
    });

    const handleChange = (key, value) => {
        setResponses(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        // Handle survey submission logic here
        console.log('Survey responses:', responses);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Parent Survey</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. How satisfied are you with the school?</Text>
                <TextInput
                    style={styles.input}
                    value={responses.q1}
                    onChangeText={text => handleChange('q1', text)}
                    placeholder="Your answer"
                />
            </View>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>2. What improvements would you suggest?</Text>
                <TextInput
                    style={styles.input}
                    value={responses.q2}
                    onChangeText={text => handleChange('q2', text)}
                    placeholder="Your answer"
                />
            </View>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>3. Any additional comments?</Text>
                <TextInput
                    style={styles.input}
                    value={responses.q3}
                    onChangeText={text => handleChange('q3', text)}
                    placeholder="Your answer"
                />
            </View>
            <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    questionContainer: {
        marginBottom: 15,
    },
    question: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
});

export default Survey;