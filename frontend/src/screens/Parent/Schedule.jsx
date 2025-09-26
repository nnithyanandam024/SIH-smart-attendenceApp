import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const Schedule = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('academic');
  const [selectedDate, setSelectedDate] = useState('Thu');
  const [selectedClass, setSelectedClass] = useState(null);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const scheduleData = {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [
      {
        id: 1,
        subject: 'Mathematics',
        grade: 'Grade VI - A',
        time: '09:30 - 10:30',
        type: 'Academic class',
        color: '#E8F5E8',
        assessment: {
          date: '23/02/25',
          level: 2,
          rank: 3,
          highestScore: 99,
          score: 90,
          classAverage: 70,
          file: 'Assessment.pdf',
          teacher: 'Ram Kumar'
        }
      },
      {
        id: 2,
        subject: 'Mathematics',
        grade: 'Grade VI - A',
        time: '09:30 - 10:30',
        type: 'Academic class',
        color: '#E8F5E8',
        assessment: {
          date: '23/02/25',
          level: 2,
          rank: null,
          highestScore: null,
          score: null,
          classAverage: null,
          file: 'Level1.pdf',
          teacher: 'Ram Kumar'
        }
      },
      {
        id: 3,
        subject: 'Mathematics',
        grade: 'Grade VI - A',
        time: '09:30 - 10:30',
        type: 'Academic class',
        color: '#FFEBEE',
        assessment: {
          date: '23/02/25',
          level: 2,
          rank: null,
          highestScore: null,
          score: null,
          classAverage: null,
          file: 'Level1.pdf',
          teacher: 'Ram Kumar'
        }
      },
      {
        id: 4,
        subject: 'Mathematics',
        grade: 'Grade VI - A',
        time: '09:30 - 10:30',
        type: 'Academic class',
        color: '#FFF3E0',
        assessment: {
          date: '23/02/25',
          level: 2,
          rank: null,
          highestScore: null,
          score: null,
          classAverage: null,
          file: 'Level1.pdf',
          teacher: 'Ram Kumar'
        }
      },
      {
        id: 5,
        subject: 'Mathematics',
        grade: 'Grade VI - A',
        time: '09:30 - 10:30',
        type: 'Academic class',
        color: '#FFF3E0',
        assessment: {
          date: '23/02/25',
          level: 2,
          rank: null,
          highestScore: null,
          score: null,
          classAverage: null,
          file: 'Level1.pdf',
          teacher: 'Ram Kumar'
        }
      }
    ],
    Fri: [],
    Sat: []
  };

  const examData = {
    currentMonth: 'December 2023',
    calendar: [
      [29, 30, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26],
      [27, 28, 29, 30, 31, 1, 2]
    ],
    examDates: [20, 23, 27], // Dates with exams
    upcomingExams: [
      {
        id: 1,
        date: '20',
        month: 'NOV',
        subject: 'Mathematics',
        time: '9:00 AM - 12:00 PM',
        frequency: 'Every Thu'
      },
      {
        id: 2,
        date: '20',
        month: 'NOV',
        subject: 'Mathematics',
        time: '9:00 AM - 12:00 PM',
        frequency: 'Every Thu'
      },
      {
        id: 3,
        date: '20',
        month: 'NOV',
        subject: 'Mathematics',
        time: '9:00 AM - 12:00 PM',
        frequency: 'Every Thu'
      }
    ]
  };

  const handleClassPress = (classItem) => {
    setSelectedClass(classItem);
  };

  const handleBackToSchedule = () => {
    setSelectedClass(null);
  };

  const renderScheduleItem = (item, index) => (
    <TouchableOpacity 
      key={index} 
      style={[styles.scheduleItem, { backgroundColor: item.color }]}
      onPress={() => handleClassPress(item)}
    >
      <View style={styles.scheduleItemContent}>
        <Text style={styles.subjectText}>{item.subject}</Text>
        <Text style={styles.gradeText}>{item.grade}</Text>
        <Text style={styles.typeText}>{item.type}</Text>
      </View>
      <View style={styles.scheduleRight}>
        <Text style={styles.timeText}>{item.time}</Text>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAssessmentDetail = () => {
    if (!selectedClass) return null;

    const assessment = selectedClass.assessment;

    return (
      <View style={styles.assessmentDetailContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backToScheduleButton} onPress={handleBackToSchedule}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backToScheduleText}>Back to Schedule</Text>
        </TouchableOpacity>

        {/* Assessment Detail Card */}
        <View style={[styles.assessmentCard, { backgroundColor: selectedClass.color }]}>
          {/* Subject Header */}
          <View style={styles.assessmentHeader}>
            <Text style={styles.cardSubjectText}>{selectedClass.subject}</Text>
            <Text style={styles.cardTimeText}>{selectedClass.time}</Text>
          </View>
          <Text style={styles.cardGradeText}>{selectedClass.grade}</Text>
          <Text style={styles.cardTypeText}>{selectedClass.type}</Text>

          {/* Date */}
          <Text style={styles.dateText}>{assessment.date}</Text>

          {/* Assessment Details */}
          <View style={styles.tagsContainer}>
            <View style={styles.levelTag}>
              <Text style={styles.levelTagText}>Level {assessment.level}</Text>
            </View>
            {assessment.rank && (
              <View style={styles.rankTag}>
                <Text style={styles.rankTagText}>Rank - {assessment.rank}</Text>
              </View>
            )}
            <View style={styles.assessmentTag}>
              <Text style={styles.assessmentTagText}>Assessment</Text>
            </View>
          </View>

          {/* Scores */}
          {assessment.score ? (
            <View style={styles.scoresContainer}>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Highest Score:</Text>
                <Text style={styles.scoreValue}>{assessment.highestScore}</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Score:</Text>
                <Text style={styles.scoreValue}>{assessment.score}/100</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Class Average:</Text>
                <Text style={styles.scoreValue}>{assessment.classAverage}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.scoresContainer}>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Highest Score:</Text>
                <Text style={styles.scoreValue}>-</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Score:</Text>
                <Text style={styles.scoreValue}>- /100</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Class Average:</Text>
                <Text style={styles.scoreValue}>-</Text>
              </View>
            </View>
          )}

          {/* File Link */}
          <TouchableOpacity style={styles.fileLink}>
            <Text style={styles.fileLinkText}>{assessment.file}</Text>
          </TouchableOpacity>

          {/* Teacher Info */}
          <View style={styles.teacherInfo}>
            <View style={styles.teacherAvatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <Text style={styles.teacherName}>{assessment.teacher}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCalendar = () => {
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>{examData.currentMonth}</Text>
          <TouchableOpacity style={styles.arrowButton}>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>
        
        {/* Day Headers */}
        <View style={styles.dayHeadersContainer}>
          {dayNames.map((day, index) => (
            <Text key={index} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>
        
        {/* Calendar Days */}
        {examData.calendar.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.calendarWeek}>
            {week.map((day, dayIndex) => {
              const isExamDate = examData.examDates.includes(day);
              const isCurrentMonth = !(weekIndex === 0 && day > 7) && !(weekIndex >= 4 && day < 7);
              
              return (
                <TouchableOpacity
                  key={dayIndex}
                  style={[
                    styles.calendarDay,
                    isExamDate && styles.examDay,
                    day === 20 && styles.selectedExamDay, // Example selected day
                    day === 23 && styles.examDayGreen,
                    day === 27 && styles.examDayRed,
                  ]}
                >
                  <Text style={[
                    styles.calendarDayText,
                    !isCurrentMonth && styles.inactiveDayText,
                    isExamDate && styles.examDayText,
                    day === 20 && styles.selectedExamDayText,
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  const renderExamList = () => (
    <View style={styles.examListContainer}>
      <Text style={styles.examListTitle}>Upcoming Exams</Text>
      {examData.upcomingExams.map((exam) => (
        <View key={exam.id} style={styles.examItem}>
          <View style={styles.examDateContainer}>
            <Text style={styles.examDateNumber}>{exam.date}</Text>
            <Text style={styles.examDateMonth}>{exam.month}</Text>
          </View>
          
          <View style={styles.examDetails}>
            <View style={styles.examCheckbox} />
            <View style={styles.examInfo}>
              <Text style={styles.examSubject}>{exam.subject}</Text>
              <Text style={styles.examTime}>{exam.time}</Text>
              <Text style={styles.examFrequency}>{exam.frequency}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderScheduleView = () => (
    <>
      {/* Weekly Schedule */}
      <View style={styles.scheduleContainer}>
        {/* Week Days */}
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDate === day ? styles.selectedDay : styles.unselectedDay
              ]}
              onPress={() => setSelectedDate(day)}
            >
              <Text style={[
                styles.dayText,
                selectedDate === day ? styles.selectedDayText : styles.unselectedDayText
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Schedule Items */}
        <View style={styles.scheduleItemsContainer}>
          {scheduleData[selectedDate]?.length > 0 ? (
            scheduleData[selectedDate].map(renderScheduleItem)
          ) : (
            <View style={styles.noClassesContainer}>
              <Text style={styles.noClassesText}>No classes scheduled for {selectedDate}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );

  const renderExamScheduleView = () => (
    <>
      {renderCalendar()}
      {renderExamList()}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
         
          <Text style={styles.headerTitle}>  Schedule</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'academic' ? styles.activeTab : styles.inactiveTab
            ]}
            onPress={() => setActiveTab('academic')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'academic' ? styles.activeTabText : styles.inactiveTabText
            ]}>
              Academic schedule
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'exam' ? styles.activeTab : styles.inactiveTab
            ]}
            onPress={() => setActiveTab('exam')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'exam' ? styles.activeTabText : styles.inactiveTabText
            ]}>
              Exam schedule
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Rendering */}
        {selectedClass ? renderAssessmentDetail() : (activeTab === 'academic' ? renderScheduleView() : renderExamScheduleView())}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4ff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#fafafaff',
    marginRight: 12,
  },
  backArrow: {
    fontSize: 20,
    color: '#6f42c1',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: '#6f42c1',
    shadowColor: '#6f42c1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  inactiveTab: {
    backgroundColor: '#E5E7EB',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#6B7280',
  },
  scheduleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#6f42c1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#F97316',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  unselectedDay: {
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  unselectedDayText: {
    color: '#9CA3AF',
  },
  scheduleItemsContainer: {
    gap: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleItemContent: {
    flex: 1,
  },
  scheduleRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  gradeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    fontWeight: '500',
  },
  typeText: {
    fontSize: 14,
    color: '#F97316',
    fontWeight: '600',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 28,
    height: 28,
    backgroundColor: '#e8d8ff',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6f42c1',
  },
  avatarText: {
    fontSize: 12,
    color: '#6f42c1',
  },
  noClassesContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noClassesText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  
  // Assessment Detail Styles
  assessmentDetailContainer: {
    flex: 1,
  },
  backToScheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#6f42c1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backToScheduleText: {
    fontSize: 16,
    color: '#6f42c1',
    fontWeight: '600',
    marginLeft: 8,
  },
  assessmentCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#6f42c1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  assessmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardSubjectText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  cardTimeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  cardGradeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  cardTypeText: {
    fontSize: 16,
    color: '#F97316',
    marginBottom: 16,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 20,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
  },
  levelTag: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  levelTagText: {
    fontSize: 14,
    color: '#15803D',
    fontWeight: '700',
  },
  rankTag: {
    backgroundColor: '#FED7AA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  rankTagText: {
    fontSize: 14,
    color: '#C2410C',
    fontWeight: '700',
  },
  assessmentTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  assessmentTagText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '700',
  },
  scoresContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700',
  },
  fileLink: {
    marginBottom: 20,
  },
  fileLinkText: {
    fontSize: 16,
    color: '#2563EB',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  teacherAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#e8d8ff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#6f42c1',
  },
  teacherName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
  },

  // Calendar Styles
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#6f42c1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 20,
    color: '#6f42c1',
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  dayHeadersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayHeader: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
  },
  calendarWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  examDay: {
    backgroundColor: '#F97316',
  },
  examDayGreen: {
    backgroundColor: '#10B981',
  },
  examDayRed: {
    backgroundColor: '#EF4444',
  },
  selectedExamDay: {
    backgroundColor: '#6f42c1',
  },
  calendarDayText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  inactiveDayText: {
    color: '#CCC',
  },
  examDayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  selectedExamDayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Exam List Styles
  examListContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#6f42c1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  examListTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  examItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  examDateContainer: {
    width: 50,
    alignItems: 'center',
    marginRight: 15,
  },
  examDateNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6f42c1',
  },
  examDateMonth: {
    fontSize: 12,
    color: '#6f42c1',
    fontWeight: '600',
  },
  examDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  examCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#DDD',
    marginRight: 15,
    backgroundColor: '#FFFFFF',
  },
  examInfo: {
    flex: 1,
  },
  examSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  examTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  examFrequency: {
    fontSize: 12,
    color: '#999',
  },
});

export default Schedule;