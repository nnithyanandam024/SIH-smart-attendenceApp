import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CalendarHome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Calendar Home</Text>
            <Button
                title="Go to Calendar Details"
                onPress={() => navigation.navigate('CalendarDetails')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
});

export default CalendarHome;