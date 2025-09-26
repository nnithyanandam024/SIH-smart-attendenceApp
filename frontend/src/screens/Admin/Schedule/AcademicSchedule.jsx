import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
  TextInput
} from 'react-native';
import BackIcon from '../../../assets/Admin/backarrow.svg';
import Tick2Icon from '../../../assets/Admin/tick2.svg';
import Add2Icon from '../../../assets/Admin/Add2.svg';
import Time2Icon from '../../../assets/Admin/Time2.svg';
import Book2Icon from '../../../assets/Admin/Book2.svg';
import EditIcon from '../../../assets/Admin/Edit.svg';
import DeleteIcon from '../../../assets/Admin/delete-icon.svg'; 
import styles from './AcademicScheduleStyle';

const AcademicSchedule = ({ navigation, route }) => {
  // Get parameters from navigation
  const { section: routeSection, department: routeDepartment } = route?.params || {};
  
  const [activeSection, setActiveSection] = useState(routeSection || 'A');
  const [selectedDepartment, setSelectedDepartment] = useState(routeDepartment || 'IT');
  const [activeDay, setActiveDay] = useState('22');
  const [sessions, setSessions] = useState([
    { 
      id: 1, 
      startTime: '9:00 AM', 
      endTime: '9:40 AM', 
      subject: 'Social Science',
      faculty: 'Mr.SajiKumar',
      assistant: 'Mr.Bala',
      type: 'Academic',
      classType: 'Academic class'
    }
  ]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedTime, setSelectedTime] = useState({ hour: '02', minute: '33', period: 'AM' });
  const [activeTimeType, setActiveTimeType] = useState('');
  const [staffType, setStaffType] = useState(''); // 'faculty' or 'assistant'
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [originalSessions, setOriginalSessions] = useState([]);

  // Update section and department when route params change
  useEffect(() => {
    if (routeSection) setActiveSection(routeSection);
    if (routeDepartment) setSelectedDepartment(routeDepartment);
  }, [routeSection, routeDepartment]);

  const sections = ['A', 'B', 'C', 'D','E','F','G'];
  const days = [
    { day: '22', name: 'Wed' },
    { day: '23', name: 'Thu' },
    { day: '24', name: 'Fri' },
    { day: '25', name: 'Sat' },
    { day: '26', name: 'Mon' },
    { day: '27', name: 'Tue' }
  ];
  const [subjects, setSubjects] = useState(['Social Science', 'Mathematics', 'English', 'Physics', 'Chemistry']);
  const faculties = ['Mr.SajiKumar', 'Mrs.Priya', 'Mr.David', 'Dr.Sarah', 'Mr.Johnson', 'Dr.Wilson'];
  const assistants = ['Mr.Bala', 'Ms.Kavya', 'Mr.Raj', 'Ms.Lisa', 'Mr.Kumar'];
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handleAddSession = () => {
    const newSession = {
      id: Date.now(), // Use timestamp for unique ID
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      subject: 'Select Subject',
      faculty: 'Select Faculty',
      assistant: 'Select Assistant',
      type: 'Academic',
      classType: 'Academic class'
    };
    setSessions([...sessions, newSession]);
    setHasUnsavedChanges(true);
  };

  const handleDeleteSession = (sessionId) => {
    Alert.alert(
      "Delete Session",
      "Are you sure you want to delete this session?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            setSessions(sessions.filter(session => session.id !== sessionId));
            setHasUnsavedChanges(true);
          }
        }
      ]
    );
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      // Exiting edit mode - check for validation
      const invalidSessions = sessions.filter(session => 
        session.subject === 'Select Subject' || 
        session.faculty === 'Select Faculty' ||
        session.assistant === 'Select Assistant'
      );

      if (invalidSessions.length > 0) {
        Alert.alert(
          "Incomplete Information",
          "Please complete all session details (subject, faculty, and assistant) before saving.",
          [{ text: "OK" }]
        );
        return;
      }

      // Check for time conflicts
      const timeConflicts = checkTimeConflicts();
      if (timeConflicts.length > 0) {
        Alert.alert(
          "Time Conflicts",
          `The following sessions have overlapping times: ${timeConflicts.join(', ')}`,
          [{ text: "OK" }]
        );
        return;
      }
    } else {
      // Entering edit mode - store original sessions
      setOriginalSessions([...sessions]);
    }
    
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      setHasUnsavedChanges(false);
    }
  };

  const handleSaveChanges = () => {
    Alert.alert(
      "Save Changes",
      "Are you sure you want to save all changes to the schedule?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Save", 
          onPress: () => {
            setIsEditMode(false);
            setHasUnsavedChanges(false);
            setOriginalSessions([]);
            Alert.alert("Success", "Schedule saved successfully!");
          }
        }
      ]
    );
  };

  const handleCancelChanges = () => {
    if (hasUnsavedChanges) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard all unsaved changes?",
        [
          { text: "Keep Editing", style: "cancel" },
          { 
            text: "Discard", 
            style: "destructive",
            onPress: () => {
              setSessions([...originalSessions]);
              setIsEditMode(false);
              setHasUnsavedChanges(false);
              setOriginalSessions([]);
            }
          }
        ]
      );
    } else {
      setIsEditMode(false);
    }
  };

  const checkTimeConflicts = () => {
    const conflicts = [];
    for (let i = 0; i < sessions.length; i++) {
      for (let j = i + 1; j < sessions.length; j++) {
        const session1 = sessions[i];
        const session2 = sessions[j];
        
        if (isTimeOverlap(session1.startTime, session1.endTime, session2.startTime, session2.endTime)) {
          conflicts.push(`Session ${i + 1} and Session ${j + 1}`);
        }
      }
    }
    return conflicts;
  };

  const isTimeOverlap = (start1, end1, start2, end2) => {
    const convertToMinutes = (time) => {
      const [timeStr, period] = time.split(' ');
      const [hours, minutes] = timeStr.split(':');
      let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
      if (period === 'PM' && parseInt(hours) !== 12) totalMinutes += 12 * 60;
      if (period === 'AM' && parseInt(hours) === 12) totalMinutes -= 12 * 60;
      return totalMinutes;
    };

    const start1Min = convertToMinutes(start1);
    const end1Min = convertToMinutes(end1);
    const start2Min = convertToMinutes(start2);
    const end2Min = convertToMinutes(end2);

    return start1Min < end2Min && start2Min < end1Min;
  };

  const openSubjectModal = (session) => {
    if (isEditMode) {
      setSelectedSession(session);
      setShowSubjectModal(true);
    }
  };

  const selectSubject = (subject) => {
    const updatedSessions = sessions.map(session => 
      session.id === selectedSession.id ? { ...session, subject } : session
    );
    setSessions(updatedSessions);
    setShowSubjectModal(false);
    setHasUnsavedChanges(true);
  };

  const openStaffModal = (session, type) => {
    if (isEditMode) {
      setSelectedSession(session);
      setStaffType(type);
      setShowStaffModal(true);
    }
  };

  const selectStaff = (staff) => {
    const updatedSessions = sessions.map(session => {
      if (session.id === selectedSession.id) {
        if (staffType === 'faculty') {
          return { ...session, faculty: staff };
        } else {
          return { ...session, assistant: staff };
        }
      }
      return session;
    });
    setSessions(updatedSessions);
    setShowStaffModal(false);
    setHasUnsavedChanges(true);
  };
  
  const openTimeModal = (session, type) => {
    if (isEditMode) {
      setSelectedSession(session);
      setActiveTimeType(type);
      
      const timeString = type === 'start' ? session.startTime : session.endTime;
      const [timeValue, period] = timeString.split(' ');
      const [hour, minute] = timeValue.split(':');
      
      setSelectedTime({
        hour: hour,
        minute: minute,
        period: period
      });
      
      setShowTimeModal(true);
    }
  };

  const confirmTimeSelection = () => {
    const newTime = `${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`;
    const updatedSessions = sessions.map(session => {
      if (session.id === selectedSession.id) {
        if (activeTimeType === 'start') {
          return { ...session, startTime: newTime };
        } else {
          return { ...session, endTime: newTime };
        }
      }
      return session;
    });
    setSessions(updatedSessions);
    setShowTimeModal(false);
    setHasUnsavedChanges(true);
  };

  const addNewSubject = () => {
    if (newSubjectName.trim()) {
      setSubjects([...subjects, newSubjectName.trim()]);
      setNewSubjectName('');
      setShowAddSubjectModal(false);
      Alert.alert("Success", "New subject added successfully!");
    } else {
      Alert.alert("Error", "Please enter a valid subject name.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackIcon width={styles.BackIcon.width} height={styles.BackIcon.height} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTxt}>{selectedDepartment} - Section {activeSection}</Text>
        {hasUnsavedChanges && <View style={styles.unsavedIndicator} />}
      </View>
      
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.scrollViewContent}>
        {/* Days Calendar */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.daysTabsContent}
          style={styles.daysTabs}
        >
          {days.map(dayObj => (
            <TouchableOpacity
              key={dayObj.day}
              style={[styles.dayTab, activeDay === dayObj.day && styles.activeDay]}
              onPress={() => setActiveDay(dayObj.day)}
            >
              <Text style={[styles.dayNumber, activeDay === dayObj.day && styles.activeDayNumber]}>
                {dayObj.day}
              </Text>
              <Text style={[styles.dayName, activeDay === dayObj.day && styles.activeDayName]}>
                {dayObj.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Add Session Button */}
        {isEditMode && (
          <View style={styles.addSessionContainer}>
            <TouchableOpacity style={styles.addSessionButton} onPress={handleAddSession}>
              <Add2Icon width={16} height={16} />
              <Text style={styles.addSessionText}>Add New Session</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Sessions */}
        <View style={styles.sessionsContainer}>
          {sessions.map((session, index) => (
            <View key={session.id} style={styles.sessionItem}>
              {isEditMode && (
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteSession(session.id)}
                >
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
              )}
              
              <View style={styles.timeColumn}>
                <TouchableOpacity 
                  style={[styles.timeSlot, !isEditMode && styles.disabledTimeSlot]}
                  onPress={() => openTimeModal(session, 'start')}
                  disabled={!isEditMode}
                >
                  <Time2Icon width={12} height={12} style={styles.timeIcon} />
                  <Text style={[styles.timeText, !isEditMode && styles.disabledText]}>
                    {session.startTime}
                  </Text>
                </TouchableOpacity>
                <View style={styles.timeSeparator} />
                <TouchableOpacity 
                  style={[styles.timeSlot, !isEditMode && styles.disabledTimeSlot]}
                  onPress={() => openTimeModal(session, 'end')}
                  disabled={!isEditMode}
                >
                  <Time2Icon width={12} height={12} style={styles.timeIcon} />
                  <Text style={[styles.timeText, !isEditMode && styles.disabledText]}>
                    {session.endTime}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.sessionDetails}>
                <View style={styles.subjectHeader}>
                  <View style={styles.subjectIndicator} />
                  <TouchableOpacity 
                    style={[
                      styles.subjectButton, 
                      !isEditMode && styles.disabledSubjectButton,
                      session.subject === 'Select Subject' && styles.incompleteField
                    ]}
                    onPress={() => openSubjectModal(session)}
                    disabled={!isEditMode}
                  >
                    <Book2Icon width={14} height={14} style={styles.subjectIcon} />
                    <Text style={[
                      styles.subjectText, 
                      !isEditMode && styles.disabledText,
                      session.subject === 'Select Subject' && styles.incompleteText
                    ]}>
                      {session.subject}
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.facultyInfo}>
                  <TouchableOpacity 
                    style={[
                      styles.facultyItem,
                      session.faculty === 'Select Faculty' && styles.incompleteField
                    ]}
                    onPress={() => openStaffModal(session, 'faculty')}
                    disabled={!isEditMode}
                  >
                    <View style={styles.facultyIcon} />
                    <Text style={[
                      styles.facultyText,
                      session.faculty === 'Select Faculty' && styles.incompleteText
                    ]}>
                      {session.faculty}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.assistantContainer,
                      session.assistant === 'Select Assistant' && styles.incompleteField
                    ]}
                    onPress={() => openStaffModal(session, 'assistant')}
                    disabled={!isEditMode}
                  >
                    <Text style={[
                      styles.assistantText,
                      session.assistant === 'Select Assistant' && styles.incompleteText
                    ]}>
                      {session.assistant}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.sessionTypeInfo}>
                  <View style={styles.typeIndicator} />
                  <Text style={styles.typeText}>{session.type}</Text>
                </View>

                <View style={styles.classTypeInfo}>
                  <View style={styles.classTypeIcon} />
                  <Text style={styles.classTypeText}>{session.classType}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {!isEditMode ? (
            <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
              <EditIcon width={styles.EditIcon.width} height={styles.EditIcon.height} />
              <Text style={styles.editButtonText}>Edit Schedule</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editModeButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelChanges}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Tick2Icon width={16} height={16} />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Subject Selection Modal */}
      <Modal
        transparent={true}
        visible={showSubjectModal}
        animationType="fade"
        onRequestClose={() => setShowSubjectModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowSubjectModal(false)}
        >
          <View style={styles.subjectModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Subject</Text>
              <TouchableOpacity 
                style={styles.addNewButton}
                onPress={() => {
                  setShowSubjectModal(false);
                  setShowAddSubjectModal(true);
                }}
              >
                <Add2Icon width={14} height={14} />
                <Text style={styles.addNewText}>Add New</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {subjects.map(subject => (
                <TouchableOpacity
                  key={subject}
                  style={styles.subjectModalItem}
                  onPress={() => selectSubject(subject)}
                >
                  <Text style={styles.subjectModalText}>{subject}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Staff Selection Modal */}
      <Modal
        transparent={true}
        visible={showStaffModal}
        animationType="fade"
        onRequestClose={() => setShowStaffModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowStaffModal(false)}
        >
          <View style={styles.subjectModalContainer}>
            <Text style={styles.modalTitle}>
              Select {staffType === 'faculty' ? 'Faculty' : 'Assistant'}
            </Text>
            <ScrollView style={styles.modalScrollView}>
              {(staffType === 'faculty' ? faculties : assistants).map(staff => (
                <TouchableOpacity
                  key={staff}
                  style={styles.subjectModalItem}
                  onPress={() => selectStaff(staff)}
                >
                  <Text style={styles.subjectModalText}>{staff}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Add Subject Modal */}
      <Modal
        transparent={true}
        visible={showAddSubjectModal}
        animationType="fade"
        onRequestClose={() => setShowAddSubjectModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowAddSubjectModal(false)}
        >
          <View style={styles.addSubjectModalContainer}>
            <Text style={styles.modalTitle}>Add New Subject</Text>
            <TextInput
              style={styles.subjectInput}
              placeholder="Enter subject name"
              value={newSubjectName}
              onChangeText={setNewSubjectName}
              autoFocus={true}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelModalButton}
                onPress={() => {
                  setShowAddSubjectModal(false);
                  setNewSubjectName('');
                }}
              >
                <Text style={styles.cancelModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.addModalButton}
                onPress={addNewSubject}
              >
                <Text style={styles.addModalButtonText}>Add Subject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        transparent={true}
        visible={showTimeModal}
        animationType="slide"
        onRequestClose={() => setShowTimeModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowTimeModal(false)}
        >
          <View style={styles.timeModalContainer} onStartShouldSetResponder={() => true}>
            <Text style={styles.timeModalTitle}>
              Select {activeTimeType === 'start' ? 'Starting' : 'Ending'} time
            </Text>
            
            <View style={styles.timePickerContainer}>
              <FlatList
                data={hours}
                keyExtractor={(item) => `hour-${item}`}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.timePickerItem,
                      selectedTime.hour === item && styles.selectedTimePickerItem
                    ]}
                    onPress={() => setSelectedTime({...selectedTime, hour: item})}
                  >
                    <Text 
                      style={[
                        styles.timePickerText,
                        selectedTime.hour === item ? styles.selectedTimePickerText : styles.unselectedTimePickerText
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                style={styles.timePickerColumn}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={hours.indexOf(selectedTime.hour) !== -1 ? hours.indexOf(selectedTime.hour) : 0}
                getItemLayout={(data, index) => (
                  {length: 40, offset: 40 * index, index}
                )}
              />
              
              <Text style={styles.timeSeparatorText}>:</Text>
              
              <FlatList
                data={minutes}
                keyExtractor={(item) => `minute-${item}`}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.timePickerItem,
                      selectedTime.minute === item && styles.selectedTimePickerItem
                    ]}
                    onPress={() => setSelectedTime({...selectedTime, minute: item})}
                  >
                    <Text 
                      style={[
                        styles.timePickerText,
                        selectedTime.minute === item ? styles.selectedTimePickerText : styles.unselectedTimePickerText
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                style={styles.timePickerColumn}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={minutes.indexOf(selectedTime.minute) !== -1 ? minutes.indexOf(selectedTime.minute) : 0}
                getItemLayout={(data, index) => (
                  {length: 40, offset: 40 * index, index}
                )}
              />
              
              <View style={styles.periodPickerColumn}>
                {['AM', 'PM'].map(period => (
                  <TouchableOpacity
                    key={period}
                    style={[
                      styles.periodPickerItem,
                      selectedTime.period === period && styles.selectedPeriodPickerItem
                    ]}
                    onPress={() => setSelectedTime({...selectedTime, period})}
                  >
                    <Text 
                      style={[
                        styles.periodPickerText,
                        selectedTime.period === period ? styles.selectedPeriodPickerText : styles.unselectedPeriodPickerText
                      ]}
                    >
                      {period}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelModalButton}
                onPress={() => setShowTimeModal(false)}
              >
                <Text style={styles.cancelModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.selectModalButton}
                onPress={confirmTimeSelection}
              >
                <Text style={styles.selectModalButtonText}>Select</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default AcademicSchedule;