import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ChatIcon from '../../../assets/Student/ChatIcon';


const Pass = () => {
    const [reason, setReason] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date(Date.now() + 30 * 60000)); // 30 minutes later
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [remainingPasses] = useState(2);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const onStartTimeChange = (event, selectedTime) => {
        setShowStartTimePicker(false);
        if (selectedTime) {
            setStartTime(selectedTime);
            // Automatically set end time to 30 minutes later
            const newEndTime = new Date(selectedTime.getTime() + 30 * 60000);
            setEndTime(newEndTime);
        }
    };

    const onEndTimeChange = (event, selectedTime) => {
        setShowEndTimePicker(false);
        if (selectedTime) {
            setEndTime(selectedTime);
        }
    };

    const showStartTimePickerHandler = () => {
        setShowStartTimePicker(true);
    };

    const showEndTimePickerHandler = () => {
        setShowEndTimePicker(true);
    };

    const attendanceData = [
        {
            reason: 'Medical Room',
            date: '12/4/25',
            time: '11:23 AM',
            status: 'Ongoing'
        },
        {
            reason: 'Lab Signature',
            date: '14/5/25',
            time: '11:23 AM',
            status: 'Ongoing'
        },
        {
            reason: 'Medical Room',
            date: '12/4/25',
            time: '11:23 AM',
            status: 'Ongoing'
        },
        {
            reason: 'Lab Signature',
            date: '',
            time: '',
            status: 'Ongoing'
        }
    ];

    const handleGeneratePass = () => {
        console.log('Generating pass for:', { 
            reason, 
            startTime: formatTime(startTime),
            endTime: formatTime(endTime)
        });
        // Add your pass generation logic here
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Campus Pass</Text>
                {/* SVG Placeholder for chat/message icon */}
                <View style={styles.iconPlaceholder}>
                     <ChatIcon width={24} height={24} color="#666" /> 
                </View>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Reason</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter reason"
                        value={reason}
                        onChangeText={setReason}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Starting Time:</Text>
                    <TouchableOpacity style={styles.timeInput} onPress={showStartTimePickerHandler}>
                        <Text style={styles.timeText}>
                            {formatTime(startTime)}
                        </Text>
                    </TouchableOpacity>
                    {showStartTimePicker && (
                        <DateTimePicker
                            value={startTime}
                            mode="time"
                            display="default"
                            onChange={onStartTimeChange}
                        />
                    )}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ending Time:</Text>
                    <TouchableOpacity style={styles.timeInput} onPress={showEndTimePickerHandler}>
                        <Text style={styles.timeText}>
                            {formatTime(endTime)}
                        </Text>
                    </TouchableOpacity>
                    {showEndTimePicker && (
                        <DateTimePicker
                            value={endTime}
                            mode="time"
                            display="default"
                            onChange={onEndTimeChange}
                        />
                    )}
                </View>

                <Text style={styles.remainingPass}>
                    Remaining Pass : {remainingPasses}
                </Text>

                <TouchableOpacity style={styles.generateButton} onPress={handleGeneratePass}>
                    <Text style={styles.generateButtonText}>Generate Pass</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.attendanceSection}>
                <Text style={styles.sectionTitle}>Live Attendance Activity</Text>
                
                {attendanceData.map((item, index) => (
                    <View key={index} style={styles.attendanceItem}>
                        <View style={styles.attendanceInfo}>
                            <Text style={styles.attendanceReason}>
                                <Text style={styles.reasonLabel}>Reason: </Text>
                                {item.reason}
                            </Text>
                            {item.date && (
                                <Text style={styles.attendanceDate}>
                                    <Text style={styles.dateLabel}>Date: </Text>
                                    {item.date}
                                </Text>
                            )}
                        </View>
                        
                        <View style={styles.statusContainer}>
                            {/* SVG Placeholder for green dot */}
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>{item.status}</Text>
                            {item.time && (
                                <Text style={styles.timeText}>{item.time}</Text>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    iconPlaceholder: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    iconText: {
        fontSize: 16,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    remainingPass: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        fontWeight: '500',
    },
    generateButton: {
        backgroundColor: '#9b59b6',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
    },
    generateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    attendanceSection: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    attendanceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    attendanceInfo: {
        flex: 1,
    },
    attendanceReason: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    reasonLabel: {
        fontWeight: '600',
    },
    attendanceDate: {
        fontSize: 14,
        color: '#333',
    },
    dateLabel: {
        fontWeight: '600',
    },
    statusContainer: {
        alignItems: 'flex-end',
    },
    statusDot: {
        width: 8,
        height: 8,
        backgroundColor: '#2ecc71',
        borderRadius: 4,
        marginBottom: 4,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 14,
        color: '#2ecc71',
        fontWeight: '500',
        marginBottom: 2,
    },
    timeText: {
        fontSize: 12,
        color: '#666',
    },
});

export default Pass;