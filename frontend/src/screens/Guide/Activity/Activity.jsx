import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Modal,
  Platform,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ActivityPlannerDashboard = ({ navigation }) => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'form'
  const [editingPlanner, setEditingPlanner] = useState(null);
  const [planners, setPlanners] = useState([
    {
      id: 1,
      title: 'Mathematics Assignment',
      activityType: 'Assignment',
      fromDate: '15/12/2025',
      toDate: '20/12/2025',
      description: 'Complete calculus problems from chapter 5 and submit by deadline',
      fromTime: '09:00 AM',
      toTime: '11:00 AM',
      week: 2
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      activityType: 'Laboratory',
      fromDate: '18/12/2025',
      toDate: '25/12/2025',
      description: 'Write comprehensive lab report on electromagnetic induction experiment',
      fromTime: '02:00 PM',
      toTime: '04:00 PM',
      week: 3
    },
    {
      id: 3,
      title: 'History Presentation',
      activityType: 'Presentation',
      fromDate: '22/12/2025',
      toDate: '24/12/2025',
      description: 'Prepare 15-minute presentation on World War II timeline and impact',
      fromTime: '10:30 AM',
      toTime: '12:00 PM',
      week: 4
    }
  ]);

  // Form component state
  const [selectedWeek, setSelectedWeek] = useState(2);
  const [showMainModal, setShowMainModal] = useState(false);
  const [currentInputType, setCurrentInputType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    activityType: '',
    fromDate: '',
    toDate: '',
    description: '',
    fromTime: '10:30 PM',
    toTime: '10:30 PM',
  });

  // Modal states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerType, setDatePickerType] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerType, setTimePickerType] = useState('');
  const [tempDate, setTempDate] = useState(new Date());
  const [tempInput, setTempInput] = useState('');

  const weeks = [
    { id: 1, label: 'Week 1' },
    { id: 2, label: 'Week 2' },
    { id: 3, label: 'Week 3' },
    { id: 4, label: 'Week 4' }
  ];

  const activityTypes = [
    'Academic',
    'Assessment',
    'Project',
    'Assignment',
    'Laboratory',
    'Seminar',
    'Workshop',
    'Presentation'
  ];

  // History/Sample data for each input type
  const inputHistory = {
    title: [
      'Mathematics Assignment',
      'Physics Lab Report',
      'History Presentation',
      'Chemistry Project',
      'English Essay',
      'Biology Research',
      'Computer Programming',
      'Art Portfolio Review'
    ],
    description: [
      'Complete calculus problems from chapter 5 and submit by deadline',
      'Write comprehensive lab report on electromagnetic induction experiment',
      'Prepare 15-minute presentation on World War II timeline and impact',
      'Research project on organic compounds and their applications',
      'Analytical essay on Shakespeare\'s literary techniques',
      'Study ecosystem biodiversity in local environment',
      'Develop mobile application using React Native framework',
      'Create digital art portfolio showcasing various techniques'
    ],
    activityType: activityTypes
  };

  // Dashboard functions
  const handleCreatePlanner = () => {
    setCurrentView('form');
    setEditingPlanner(null);
    setFormData({
      title: '',
      activityType: '',
      fromDate: '',
      toDate: '',
      description: '',
      fromTime: '10:30 PM',
      toTime: '10:30 PM',
    });
    setSelectedWeek(2);
  };

  const handleEditPlanner = (planner) => {
    setCurrentView('form');
    setEditingPlanner(planner);
    setFormData({
      title: planner.title,
      activityType: planner.activityType,
      fromDate: planner.fromDate,
      toDate: planner.toDate,
      description: planner.description,
      fromTime: planner.fromTime,
      toTime: planner.toTime,
    });
    setSelectedWeek(planner.week);
  };

  const handleDeletePlanner = (plannerId) => {
    Alert.alert(
      'Delete Planner',
      'Are you sure you want to delete this planner?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPlanners(prev => prev.filter(p => p.id !== plannerId));
          }
        }
      ]
    );
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setEditingPlanner(null);
  };

  // Form functions
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB');
      handleInputChange(datePickerType === 'from' ? 'fromDate' : 'toDate', formattedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      handleInputChange(timePickerType === 'from' ? 'fromTime' : 'toTime', formattedTime);
    }
  };

  const openDatePicker = (type) => {
    setDatePickerType(type);
    setShowDatePicker(true);
  };

  const openTimePicker = (type) => {
    setTimePickerType(type);
    setShowTimePicker(true);
  };

  const openInputModal = (inputType) => {
    setCurrentInputType(inputType);
    if (inputType === 'title') {
      setTempInput(formData.title);
    } else if (inputType === 'description') {
      setTempInput(formData.description);
    }
    setShowMainModal(true);
  };

  const handleHistorySelect = (value) => {
    if (currentInputType === 'title') {
      handleInputChange('title', value);
    } else if (currentInputType === 'description') {
      handleInputChange('description', value);
    } else if (currentInputType === 'activityType') {
      handleInputChange('activityType', value);
    }
    setShowMainModal(false);
    setCurrentInputType('');
    setTempInput('');
  };

  const handleCustomInput = () => {
    if (currentInputType === 'title') {
      handleInputChange('title', tempInput);
    } else if (currentInputType === 'description') {
      handleInputChange('description', tempInput);
    }
    setShowMainModal(false);
    setCurrentInputType('');
    setTempInput('');
  };

  const handleModalCancel = () => {
    setShowMainModal(false);
    setCurrentInputType('');
    setTempInput('');
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return false;
    }
    if (!formData.activityType) {
      Alert.alert('Error', 'Please select an activity type');
      return false;
    }
    if (!formData.fromDate) {
      Alert.alert('Error', 'Please select a from date');
      return false;
    }
    if (!formData.toDate) {
      Alert.alert('Error', 'Please select a to date');
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      const plannerData = {
        ...formData,
        week: selectedWeek,
        id: editingPlanner ? editingPlanner.id : Date.now()
      };

      if (editingPlanner) {
        setPlanners(prev => prev.map(p => p.id === editingPlanner.id ? plannerData : p));
        Alert.alert('Success', 'Activity planner updated successfully!', [
          { text: 'OK', onPress: handleBackToDashboard }
        ]);
      } else {
        setPlanners(prev => [...prev, plannerData]);
        Alert.alert('Success', 'Activity planner created successfully!', [
          { text: 'OK', onPress: handleBackToDashboard }
        ]);
      }
    }
  };

  const handleCancel = () => {
    handleBackToDashboard();
  };

  const WeekSelector = () => (
    <View style={styles.weekSelector}>
      {weeks.map((week) => (
        <TouchableOpacity
          key={week.id}
          style={[
            styles.weekButton,
            selectedWeek === week.id && styles.selectedWeekButton
          ]}
          onPress={() => setSelectedWeek(week.id)}
        >
          <Text style={[
            styles.weekText,
            selectedWeek === week.id && styles.selectedWeekText
          ]}>
            {week.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const getModalTitle = () => {
    switch (currentInputType) {
      case 'title':
        return 'Select or Enter Title';
      case 'description':
        return 'Select or Enter Description';
      case 'activityType':
        return 'Select Activity Type';
      default:
        return 'Select Option';
    }
  };

  const getPlaceholder = () => {
    switch (currentInputType) {
      case 'title':
        return 'Enter custom title...';
      case 'description':
        return 'Enter custom description...';
      default:
        return 'Enter text...';
    }
  };

  const renderHistoryItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleHistorySelect(item)}
    >
      <View style={styles.historyIconContainer}>
        <Text style={styles.historyIcon}>●</Text>
      </View>
      <Text style={styles.historyText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderPlannerCard = ({ item }) => (
    <View style={styles.plannerCard}>
      <View style={styles.plannerHeader}>
        <View style={styles.plannerTitleContainer}>
          <Text style={styles.plannerTitle}>{item.title}</Text>
          <View style={styles.activityTypeBadge}>
            <Text style={styles.activityTypeText}>{item.activityType}</Text>
          </View>
        </View>
        <View style={styles.plannerActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditPlanner(item)}
          >
            <Text style={styles.editButtonText}>✎</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeletePlanner(item.id)}
          >
            <Text style={styles.deleteButtonText}>🗑</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.plannerDetails}>
        <View style={styles.dateTimeRow}>
          <Text style={styles.dateTimeLabel}> From:</Text>
          <Text style={styles.dateTimeValue}>{item.fromDate} at {item.fromTime}</Text>
        </View>
        <View style={styles.dateTimeRow}>
          <Text style={styles.dateTimeLabel}> To:</Text>
          <Text style={styles.dateTimeValue}>{item.toDate} at {item.toTime}</Text>
        </View>
        <View style={styles.weekRow}>
          <Text style={styles.weekLabel}>Week {item.week}</Text>
        </View>
        {item.description ? (
          <Text style={styles.plannerDescription} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
      </View>
    </View>
  );

  // Dashboard View
  if (currentView === 'dashboard') {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardTitle}>Activity Planner Dashboard</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreatePlanner}
          >
            <Text style={styles.createButtonText}>+ Create Planner</Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Content */}
        {planners.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}></Text>
            <Text style={styles.emptyStateTitle}>No planners yet</Text>
            <Text style={styles.emptyStateSubtitle}>
              Create your first activity planner to get started
            </Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={handleCreatePlanner}
            >
              <Text style={styles.emptyStateButtonText}>Create Your First Planner</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={planners}
            renderItem={renderPlannerCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.plannersList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    );
  }

  // Form View (your original Activity Planner form)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToDashboard}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {editingPlanner ? 'Edit Activity Planner' : 'Activity Planner'}
          </Text>
        </View>

        {/* Week Selector */}
        <WeekSelector />

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TouchableOpacity
              style={styles.modalInput}
              onPress={() => openInputModal('title')}
            >
              <Text style={[
                styles.inputText,
                !formData.title && styles.placeholderText
              ]}>
                {formData.title || 'Enter Title'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Activity Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Activity Type</Text>
            <TouchableOpacity
              style={styles.modalInput}
              onPress={() => openInputModal('activityType')}
            >
              <Text style={[
                styles.inputText,
                !formData.activityType && styles.placeholderText
              ]}>
                {formData.activityType || 'Select Activity type'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* From Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>From</Text>
            <TouchableOpacity
              style={styles.modalInput}
              onPress={() => openDatePicker('from')}
            >
              <Text style={[
                styles.inputText,
                !formData.fromDate && styles.placeholderText
              ]}>
                {formData.fromDate || 'DD/MM/YYYY'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* To Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>To</Text>
            <TouchableOpacity
              style={styles.modalInput}
              onPress={() => openDatePicker('to')}
            >
              <Text style={[
                styles.inputText,
                !formData.toDate && styles.placeholderText
              ]}>
                {formData.toDate || 'DD/MM/YYYY'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TouchableOpacity
              style={[styles.modalInput, styles.descriptionInput]}
              onPress={() => openInputModal('description')}
            >
              <Text style={[
                styles.inputText,
                !formData.description && styles.placeholderText
              ]}>
                {formData.description || 'Enter Description'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time</Text>
            <View style={styles.timeContainer}>
              <View style={styles.timeGroup}>
                <Text style={styles.timeLabel}>From</Text>
                <TouchableOpacity
                  style={styles.timeInput}
                  onPress={() => openTimePicker('from')}
                >
                  <Text style={styles.timeText}>{formData.fromTime}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.timeGroup}>
                <Text style={styles.timeLabel}>To</Text>
                <TouchableOpacity
                  style={styles.timeInput}
                  onPress={() => openTimePicker('to')}
                >
                  <Text style={styles.timeText}>{formData.toTime}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>
                {editingPlanner ? 'Update' : 'Confirm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Main Input Modal with History */}
      <Modal
        visible={showMainModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.mainModal}>
            <Text style={styles.modalTitle}>{getModalTitle()}</Text>
            
            {/* History Section */}
            <View style={styles.historySection}>
              <Text style={styles.historySectionTitle}>Recent Activities</Text>
              <FlatList
                data={inputHistory[currentInputType] || []}
                renderItem={renderHistoryItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.historyList}
                showsVerticalScrollIndicator={false}
              />
            </View>

            {/* Custom Input Section (only for title and description) */}
            {(currentInputType === 'title' || currentInputType === 'description') && (
              <View style={styles.customInputSection}>
                <Text style={styles.customInputTitle}>Or enter custom:</Text>
                <TextInput
                  style={[
                    styles.modalTextInput,
                    currentInputType === 'description' && styles.modalTextArea
                  ]}
                  placeholder={getPlaceholder()}
                  value={tempInput}
                  onChangeText={setTempInput}
                  multiline={currentInputType === 'description'}
                  numberOfLines={currentInputType === 'description' ? 3 : 1}
                  textAlignVertical={currentInputType === 'description' ? 'top' : 'center'}
                />
              </View>
            )}

            {/* Modal Action Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleModalCancel}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              
              {(currentInputType === 'title' || currentInputType === 'description') && (
                <TouchableOpacity
                  style={[
                    styles.modalSaveButton,
                    !tempInput.trim() && styles.modalSaveButtonDisabled
                  ]}
                  onPress={handleCustomInput}
                  disabled={!tempInput.trim()}
                >
                  <Text style={[
                    styles.modalSaveText,
                    !tempInput.trim() && styles.modalSaveTextDisabled
                  ]}>
                    Use Custom
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={tempDate}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  // Dashboard Styles
  dashboardHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  createButton: {
    backgroundColor: '#B794F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyStateButton: {
    backgroundColor: '#B794F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  plannersList: {
    padding: 20,
  },
  plannerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  plannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  plannerTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  plannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  activityTypeBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  activityTypeText: {
    color: '#B794F6',
    fontSize: 12,
    fontWeight: '600',
  },
  plannerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 36,
    height: 36,
    backgroundColor: '#F3E8FF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#B794F6',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    width: 36,
    height: 36,
    backgroundColor: '#FEE2E2',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 14,
  },
  plannerDetails: {
    gap: 8,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeLabel: {
    fontSize: 14,
    color: '#666',
    width: 60,
  },
  dateTimeValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  weekRow: {
    marginTop: 4,
  },
  weekLabel: {
    fontSize: 12,
    color: '#B794F6',
    fontWeight: '600',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  plannerDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 8,
    fontStyle: 'italic',
  },
  // Form Styles (from your original component)
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#B794F6',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  weekSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  weekButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedWeekButton: {
    backgroundColor: '#B794F6',
    borderColor: '#B794F6',
  },
  weekText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedWeekText: {
    color: 'white',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'center',
    minHeight: 45,
  },
  descriptionInput: {
    minHeight: 80,
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  timeGroup: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  timeInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 30,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#B794F6',
  },
  cancelButtonText: {
    color: '#B794F6',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#B794F6',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    margin: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  historySection: {
    marginBottom: 20,
  },
  historySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  historyList: {
    maxHeight: 300,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyIconContainer: {
    marginRight: 15,
  },
  historyIcon: {
    fontSize: 16,
    color: '#B794F6',
    fontWeight: 'bold',
  },
  historyText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  customInputSection: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
    marginBottom: 20,
  },
  customInputTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  modalTextInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  modalTextArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modalSaveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#B794F6',
  },
  modalSaveButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  modalCancelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  modalSaveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalSaveTextDisabled: {
    color: '#999',
  },
});

export default ActivityPlannerDashboard;