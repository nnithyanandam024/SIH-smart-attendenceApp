import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Animated
} from 'react-native';

// Import your SVG icons here (placeholders)
import BackArrow from '../../assets/Parent/back-arrow.svg';

const ParentDashboard = ({ navigation }) => {
    const [showSurvey, setShowSurvey] = useState(false);

    const SurveyModal = ({ visible, onClose }) => {
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [answers, setAnswers] = useState({});
        const [generalComments, setGeneralComments] = useState('');
        
        const surveyQuestions = [
            {
                id: 1,
                question: "How satisfied are you with your child's academic progress this semester?",
                type: "radio",
                options: [
                    "Very dissatisfied - significant improvement needed",
                    "Somewhat dissatisfied - more support required", 
                    "Neutral - average progress",
                    "Satisfied - good progress shown",
                    "Very satisfied - excellent academic growth"
                ]
            },
            {
                id: 2,
                question: "How effectively does the school communicate your child's performance and activities?",
                type: "radio",
                options: [
                    "Very poor - rarely receive updates",
                    "Poor - communication lacks detail",
                    "Average - basic information provided",
                    "Good - regular and informative updates", 
                    "Excellent - comprehensive communication"
                ]
            },
            {
                id: 3,
                question: "How well does the school address your child's individual learning needs?",
                type: "radio",
                options: [
                    "Not at all - one-size-fits-all approach",
                    "Minimal attention to individual needs",
                    "Some consideration of learning differences",
                    "Good personalized attention provided",
                    "Excellent individualized support"
                ]
            },
            {
                id: 4,
                question: "How satisfied are you with the school's extracurricular activities and overall development programs?",
                type: "radio",
                options: [
                    "Very poor - limited opportunities",
                    "Below average - few engaging activities",
                    "Average - basic programs available",
                    "Good - variety of quality programs",
                    "Excellent - outstanding development opportunities"
                ]
            },
            {
                id: 5,
                question: "How would you rate the teacher's accessibility for parent consultations and feedback?",
                type: "radio",
                options: [
                    "Very difficult to reach teachers",
                    "Teachers occasionally available",
                    "Average accessibility for meetings",
                    "Teachers are generally accessible",
                    "Excellent teacher availability and responsiveness"
                ]
            }
        ];

        const handleAnswerSelect = (questionId, answer) => {
            setAnswers(prev => ({
                ...prev,
                [questionId]: answer
            }));
        };

        const handleNext = () => {
            if (currentQuestion < surveyQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setCurrentQuestion(surveyQuestions.length);
            }
        };

        const handlePrevious = () => {
            if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
            }
        };

        const handleCompleteSurvey = () => {
            Alert.alert(
                "Survey Submitted Successfully!",
                "Thank you for your valuable feedback. Your responses help us improve our educational services and better support your child's development.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setCurrentQuestion(0);
                            setAnswers({});
                            setGeneralComments('');
                            onClose();
                        }
                    }
                ]
            );
        };

        const isCurrentQuestionAnswered = () => {
            if (currentQuestion < surveyQuestions.length) {
                return answers[surveyQuestions[currentQuestion].id] !== undefined;
            }
            return true;
        };

        const getProgressPercentage = () => {
            return ((currentQuestion + 1) / (surveyQuestions.length + 1)) * 100;
        };

        if (!visible) return null;

        return (
            <Modal visible={visible} animationType="slide" transparent={false}>
                <SafeAreaView style={styles.surveyContainer}>
                    <View style={styles.surveyModalHeader}>
                        <TouchableOpacity style={styles.backButton} onPress={onClose}>
                            <Text style={styles.backArrow}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.surveyModalTitle}>Parent Feedback Survey</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressBackground}>
                            <View style={[
                                styles.progressFill, 
                                { width: `${getProgressPercentage()}%` }
                            ]} />
                        </View>
                        <Text style={styles.progressText}>
                            Question {currentQuestion + 1} of {surveyQuestions.length + 1}
                        </Text>
                    </View>

                    <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                        {currentQuestion < surveyQuestions.length ? (
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>
                                    {surveyQuestions[currentQuestion].question}
                                </Text>
                                
                                <View style={styles.optionsContainer}>
                                    {surveyQuestions[currentQuestion].options.map((option, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.optionItem,
                                                answers[surveyQuestions[currentQuestion].id] === option && styles.selectedOption
                                            ]}
                                            onPress={() => handleAnswerSelect(surveyQuestions[currentQuestion].id, option)}
                                        >
                                            <View style={[
                                                styles.radioButton,
                                                answers[surveyQuestions[currentQuestion].id] === option && styles.selectedRadio
                                            ]}>
                                                {answers[surveyQuestions[currentQuestion].id] === option && (
                                                    <View style={styles.radioInner} />
                                                )}
                                            </View>
                                            <Text style={[
                                                styles.optionText,
                                                answers[surveyQuestions[currentQuestion].id] === option && styles.selectedOptionText
                                            ]}>
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        ) : (
                            <View style={styles.commentsContainer}>
                                <Text style={styles.commentsTitle}>Additional Comments (Optional)</Text>
                                <Text style={styles.commentsSubtitle}>
                                    Please share any additional thoughts, suggestions, or concerns about your child's education or the school's services.
                                </Text>
                                
                                <TextInput
                                    style={styles.commentsInput}
                                    value={generalComments}
                                    onChangeText={setGeneralComments}
                                    placeholder="Share your thoughts here..."
                                    placeholderTextColor="#999"
                                    multiline
                                    textAlignVertical="top"
                                    maxLength={500}
                                />
                                
                                <Text style={styles.characterCount}>
                                    {generalComments.length}/500 characters
                                </Text>
                            </View>
                        )}
                    </ScrollView>

                    <View style={styles.navigationContainer}>
                        {currentQuestion > 0 && (
                            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
                                <Text style={styles.navButtonText}>Previous</Text>
                            </TouchableOpacity>
                        )}
                        
                        <View style={styles.navButtonSpacer} />
                        
                        {currentQuestion < surveyQuestions.length ? (
                            <TouchableOpacity 
                                style={[
                                    styles.navButton, 
                                    styles.nextButton,
                                    !isCurrentQuestionAnswered() && styles.disabledButton
                                ]} 
                                onPress={handleNext}
                                disabled={!isCurrentQuestionAnswered()}
                            >
                                <Text style={[
                                    styles.navButtonText, 
                                    styles.nextButtonText,
                                    !isCurrentQuestionAnswered() && styles.disabledButtonText
                                ]}>
                                    Next
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity 
                                style={[styles.navButton, styles.completeButton]} 
                                onPress={handleCompleteSurvey}
                            >
                                <Text style={[styles.navButtonText, styles.completeButtonText]}>
                                    Submit Survey
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Parent Dashboard</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                   <BackArrow height={24} width={24} />
                </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Main Dashboard Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.userInfo}>
                            <View style={styles.profileIcon}>
                                <Text style={styles.profileIconText}>R</Text>
                            </View>
                            <View>
                                <Text style={styles.userName}>Ram Kumar</Text>
                                <Text style={styles.userRole}>Parent</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.attendanceSection}>
                        <View style={styles.attendanceHeader}>
                            <Text style={styles.attendanceLabel}>Child's Attendance</Text>
                            <Text style={styles.attendancePercentage}>70%</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressFillGreen, { width: '70%' }]} />
                            </View>
                            <View style={styles.circularProgress}>
                                <Text style={styles.circularProgressText}>7/10</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Survey Card */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Parent Feedback Survey</Text>
                    <View style={styles.surveyContent}>
                        <View style={styles.userInfo}>
                            <View style={styles.profileIcon}>
                                <Text style={styles.profileIconText}>R</Text>
                            </View>
                            <View>
                                <Text style={styles.userName}>Ram Kumar</Text>
                                <Text style={styles.userRole}>Parent</Text>
                            </View>
                        </View>
                        <View style={styles.feedbackInfo}>
                            <Text style={styles.feedbackLabel}>Feedback</Text>
                            <Text style={styles.feedbackCount}>5 questions</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.startNowButton} onPress={() => setShowSurvey(true)}>
                        <Text style={styles.startNowText}>Start Survey</Text>
                    </TouchableOpacity>
                </View>

                {/* Performance Graph Card */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Child's Performance Overview</Text>
                    
                    {/* Filter Tabs */}
                    <View style={styles.filterTabs}>
                        <TouchableOpacity style={styles.filterTab}>
                            <Text style={styles.filterTabText}>Monthly</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterTab}>
                            <Text style={styles.filterTabText}>Overall</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filterTab, styles.activeFilterTab]}>
                            <Text style={[styles.filterTabText, styles.activeFilterTabText]}>Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterTab}>
                            <Text style={styles.filterTabText}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.filterTab}>
                            <Text style={styles.filterTabText}>Math</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Performance Bars */}
                    <View style={styles.performanceBars}>
                        <View style={styles.barContainer}>
                            <View style={styles.barStack}>
                                <View style={[styles.barSegment, styles.redBar, { height: 60 }]} />
                                <View style={[styles.barSegment, styles.blueBar, { height: 40 }]} />
                            </View>
                            <Text style={styles.barPercentage}>75%</Text>
                            <Text style={styles.barLabel}>Day 2</Text>
                        </View>
                        
                        <View style={styles.barContainer}>
                            <View style={styles.barStack}>
                                <View style={[styles.barSegment, styles.redBar, { height: 50 }]} />
                                <View style={[styles.barSegment, styles.blueBar, { height: 30 }]} />
                            </View>
                            <Text style={styles.barPercentage}>65%</Text>
                            <Text style={styles.barLabel}>Day 3</Text>
                        </View>
                        
                        <View style={styles.barContainer}>
                            <View style={styles.barStack}>
                                <View style={[styles.barSegment, styles.redBar, { height: 55 }]} />
                                <View style={[styles.barSegment, styles.blueBar, { height: 35 }]} />
                            </View>
                            <Text style={styles.barPercentage}>65%</Text>
                            <Text style={styles.barLabel}>Day 4</Text>
                        </View>
                        
                        <View style={styles.barContainer}>
                            <View style={styles.barStack}>
                                <View style={[styles.barSegment, styles.orangeBar, { height: 70 }]} />
                                <View style={[styles.barSegment, styles.yellowBar, { height: 30 }]} />
                            </View>
                            <Text style={styles.barPercentage}>85%</Text>
                            <Text style={styles.barLabel}>Day 5</Text>
                        </View>
                        
                        <View style={styles.barContainer}>
                            <View style={styles.barStack}>
                                <View style={[styles.barSegment, styles.grayBar, { height: 20 }]} />
                            </View>
                            <Text style={styles.barPercentage}>-</Text>
                            <Text style={styles.barLabel}>Day 6</Text>
                        </View>
                        
                        <View style={styles.barContainer}>
                            <View style={styles.barStack}>
                                <View style={[styles.barSegment, styles.grayBar, { height: 20 }]} />
                            </View>
                            <Text style={styles.barPercentage}>-</Text>
                            <Text style={styles.barLabel}>Day 7</Text>
                        </View>
                    </View>

                    {/* Feedback Status */}
                    <View style={styles.feedbackStatus}>
                        <View style={styles.checkmarkIcon} />
                        <Text style={styles.feedbackStatusText}>Last feedback submitted</Text>
                    </View>
                </View>

                {/* Quick Actions Card */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsContainer}>
                        <TouchableOpacity 
                            style={styles.quickActionButton}
                            onPress={() => navigation.navigate('ChildProgress')}
                        >
                            <View style={styles.quickActionIcon}>
                                <Text style={styles.quickActionIconText}>📊</Text>
                            </View>
                            <Text style={styles.quickActionText}>View Progress</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.quickActionButton}
                            onPress={() => navigation.navigate('Messages')}
                        >
                            <View style={styles.quickActionIcon}>
                                <Text style={styles.quickActionIconText}>💬</Text>
                            </View>
                            <Text style={styles.quickActionText}>Messages</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.quickActionButton}
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <View style={styles.quickActionIcon}>
                                <Text style={styles.quickActionIconText}>⚙️</Text>
                            </View>
                            <Text style={styles.quickActionText}>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.quickActionButton}
                            onPress={() => setShowSurvey(true)}
                        >
                            <View style={styles.quickActionIcon}>
                                <Text style={styles.quickActionIconText}>📝</Text>
                            </View>
                            <Text style={styles.quickActionText}>Take Survey</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Child's Recent Activities Card */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Recent Activities</Text>
                    <View style={styles.activitiesList}>
                        <View style={styles.activityItem}>
                            <View style={styles.activityIcon}>
                                <Text style={styles.activityIconText}>📚</Text>
                            </View>
                            <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>Math Assignment Completed</Text>
                                <Text style={styles.activityTime}>2 hours ago</Text>
                            </View>
                            <View style={styles.activityScore}>
                                <Text style={styles.scoreText}>95%</Text>
                            </View>
                        </View>

                        <View style={styles.activityItem}>
                            <View style={styles.activityIcon}>
                                <Text style={styles.activityIconText}>🎯</Text>
                            </View>
                            <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>Science Quiz</Text>
                                <Text style={styles.activityTime}>1 day ago</Text>
                            </View>
                            <View style={styles.activityScore}>
                                <Text style={styles.scoreText}>88%</Text>
                            </View>
                        </View>

                        <View style={styles.activityItem}>
                            <View style={styles.activityIcon}>
                                <Text style={styles.activityIconText}>📖</Text>
                            </View>
                            <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>English Reading</Text>
                                <Text style={styles.activityTime}>2 days ago</Text>
                            </View>
                            <View style={styles.activityScore}>
                                <Text style={styles.scoreText}>92%</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomSpacing} />
            </ScrollView>

            {/* Survey Modal */}
            <SurveyModal 
                visible={showSurvey}
                onClose={() => setShowSurvey(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f4ff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 8,
        shadowColor: '#6f42c1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000ff',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    backButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#fafafaff',
    },
    backArrow: {
        fontSize: 24,
        color: '#ff0000ff',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#6f42c1',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e8d8ff',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#6f42c1',
    },
    profileIconText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6f42c1',
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 2,
    },
    userRole: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    attendanceSection: {
        alignItems: 'flex-start',
    },
    attendanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    attendanceLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    attendancePercentage: {
        fontSize: 18,
        color: '#6f42c1',
        fontWeight: 'bold',
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    progressBar: {
        flex: 1,
        height: 10,
        backgroundColor: '#e9ecef',
        borderRadius: 5,
        marginRight: 20,
    },
    progressFillGreen: {
        height: '100%',
        backgroundColor: '#28a745',
        borderRadius: 5,
    },
    circularProgress: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e8d8ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#6f42c1',
    },
    circularProgressText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6f42c1',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 18,
    },
    surveyContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    feedbackInfo: {
        alignItems: 'flex-end',
    },
    feedbackLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    feedbackCount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 2,
    },
    startNowButton: {
        backgroundColor: '#6f42c1',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        shadowColor: '#6f42c1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    startNowText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    filterTabs: {
        flexDirection: 'row',
        marginBottom: 25,
        flexWrap: 'wrap',
    },
    filterTab: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
        marginRight: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    activeFilterTab: {
        backgroundColor: '#6f42c1',
        borderColor: '#6f42c1',
    },
    filterTabText: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
    },
    activeFilterTabText: {
        color: '#fff',
        fontWeight: '600',
    },
    performanceBars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 140,
        marginBottom: 25,
    },
    barContainer: {
        alignItems: 'center',
        flex: 1,
    },
    barStack: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 110,
        width: 35,
        marginBottom: 8,
    },
    barSegment: {
        width: 35,
        borderRadius: 6,
    },
    redBar: {
        backgroundColor: '#dc3545',
    },
    blueBar: {
        backgroundColor: '#007bff',
    },
    orangeBar: {
        backgroundColor: '#fd7e14',
    },
    yellowBar: {
        backgroundColor: '#ffc107',
    },
    grayBar: {
        backgroundColor: '#e9ecef',
    },
    barPercentage: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    barLabel: {
        fontSize: 11,
        color: '#6c757d',
        fontWeight: '500',
    },
    feedbackStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    checkmarkIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#28a745',
        marginRight: 10,
    },
    feedbackStatusText: {
        fontSize: 14,
        color: '#28a745',
        fontWeight: '600',
    },
    quickActionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickActionButton: {
        width: '48%',
        backgroundColor: '#f8f4ff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e8d8ff',
    },
    quickActionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#6f42c1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    quickActionIconText: {
        fontSize: 20,
    },
    quickActionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6f42c1',
        textAlign: 'center',
    },
    activitiesList: {
        flex: 1,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f4ff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#6f42c1',
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    activityIconText: {
        fontSize: 16,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    activityTime: {
        fontSize: 12,
        color: '#666',
    },
    activityScore: {
        backgroundColor: '#28a745',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    scoreText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    bottomSpacing: {
        height: 30,
    },

    // Survey Modal Styles
    surveyContainer: {
        flex: 1,
        backgroundColor: '#f8f4ff',
    },
    surveyModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 6,
        shadowColor: '#6f42c1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    surveyModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6f42c1',
        textAlign: 'center',
        flex: 1,
    },
    placeholder: {
        width: 32,
    },
    progressContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
    },
    progressBackground: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginBottom: 10,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#6f42c1',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
    },
    modalContent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    questionContainer: {
        flex: 1,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 30,
        lineHeight: 26,
    },
    optionsContainer: {
        flex: 1,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedOption: {
        borderColor: '#6f42c1',
        backgroundColor: '#f8f4ff',
        shadowColor: '#6f42c1',
        shadowOpacity: 0.3,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#CCC',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedRadio: {
        borderColor: '#6f42c1',
        backgroundColor: '#6f42c1',
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFF',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        lineHeight: 20,
    },
    selectedOptionText: {
        color: '#6f42c1',
        fontWeight: '600',
    },
    commentsContainer: {
        flex: 1,
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    commentsSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
        lineHeight: 20,
    },
    commentsInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        fontSize: 16,
        color: '#333',
        minHeight: 150,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    characterCount: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
        marginTop: 8,
    },
    navigationContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    navButton: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        minWidth: 100,
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#6f42c1',
        borderColor: '#6f42c1',
    },
    completeButton: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    disabledButton: {
        backgroundColor: '#F5F5F5',
        borderColor: '#E0E0E0',
    },
    navButtonSpacer: {
        flex: 1,
    },
    navButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    nextButtonText: {
        color: '#FFF',
    },
    completeButtonText: {
        color: '#FFF',
    },
    disabledButtonText: {
        color: '#CCC',
    },

});

export default ParentDashboard;