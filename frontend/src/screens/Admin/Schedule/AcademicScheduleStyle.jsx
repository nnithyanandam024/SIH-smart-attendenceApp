import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E5FF',
  },

  headerTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 10,
  },

  BackIcon: {
    width: 19,
    height: 17,
  },

  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Days Calendar Styles
  daysTabs: {
    flexGrow: 0,
    marginVertical: 20,
    marginLeft: 15,
  },

  daysTabsContent: {
    paddingRight: 15,
  },

  dayTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minWidth: 50,
  },

  activeDay: {
    backgroundColor: '#8B5CF6',
  },

  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },

  activeDayNumber: {
    color: '#FFFFFF',
  },

  dayName: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },

  activeDayName: {
    color: '#E8E5FF',
  },

  // Sessions Container
  sessionsContainer: {
    paddingHorizontal: 15,
  },

  sessionItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  // Time Column
  timeColumn: {
    alignItems: 'center',
    marginRight: 15,
    minWidth: 80,
  },

  timeSlot: {
    paddingVertical: 4,
  },

  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },

  timeSeparator: {
    width: 2,
    height: 20,
    backgroundColor: '#8B5CF6',
    marginVertical: 5,
  },

  disabledTimeSlot: {
    opacity: 0.5,
  },

  disabledText: {
    color: '#AAAAAA',
  },

  // Session Details
  sessionDetails: {
    flex: 1,
  },

  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  subjectIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
    marginRight: 8,
  },

  subjectButton: {
    flex: 1,
  },

  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },

  disabledSubjectButton: {
    opacity: 0.5,
  },

  // Faculty Information
  facultyInfo: {
    marginBottom: 8,
  },

  facultyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  facultyIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    marginRight: 8,
  },

  facultyText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },

  assistantText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 16,
  },

  // Session Type Information
  sessionTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  typeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
    marginRight: 8,
  },

  typeText: {
    fontSize: 13,
    color: '#8B5CF6',
    fontWeight: '500',
  },

  // Class Type Information
  classTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  classTypeIcon: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#10B981',
    marginRight: 8,
  },

  classTypeText: {
    fontSize: 13,
    color: '#666666',
  },

  // Edit Button
  editButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },

  EditIcon: {
    width: 16,
    height: 16,
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subjectModalContainer: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    maxHeight: 300,
  },

  subjectModalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  subjectModalText: {
    fontSize: 16,
    color: '#333333',
  },

  // Time Modal Styles
  timeModalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    width: '90%',
    maxWidth: 350,
    alignSelf: 'center',
    maxHeight: '80%',
  },

  timeModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333333',
  },

  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  timePickerColumn: {
    height: 200,
    width: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E5FF',
    overflow: 'hidden',
  },

  timeSeparatorText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#333333',
  },

  timePickerItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  selectedTimePickerItem: {
    backgroundColor: '#8B5CF6',
  },

  timePickerText: {
    fontSize: 16,
  },

  selectedTimePickerText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  unselectedTimePickerText: {
    color: '#333333',
  },

  periodPickerColumn: {
    marginLeft: 15,
    height: 200,
    justifyContent: 'center',
  },

  periodPickerItem: {
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,
  },

  selectedPeriodPickerItem: {
    backgroundColor: '#8B5CF6',
  },

  periodPickerText: {
    fontSize: 16,
  },

  selectedPeriodPickerText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  unselectedPeriodPickerText: {
    color: '#333333',
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  cancelButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#666666',
    fontWeight: '500',
  },

  selectButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },

  selectButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  unsavedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F87171',
    marginLeft: 8,
  },

  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Days Calendar Styles
  daysTabs: {
    flexGrow: 0,
    marginVertical: 20,
    marginLeft: 15,
  },

  daysTabsContent: {
    paddingRight: 15,
  },

  dayTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minWidth: 50,
  },

  activeDay: {
    backgroundColor: '#8B5CF6',
  },

  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },

  activeDayNumber: {
    color: '#FFFFFF',
  },

  dayName: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },

  activeDayName: {
    color: '#E8E5FF',
  },

  // Sessions Container
  sessionsContainer: {
    paddingHorizontal: 15,
  },

  sessionItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },

  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F87171',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },

  // Time Column
  timeColumn: {
    alignItems: 'center',
    marginRight: 15,
    minWidth: 80,
  },

  timeSlot: {
    paddingVertical: 4,
  },

  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },

  timeSeparator: {
    width: 2,
    height: 20,
    backgroundColor: '#8B5CF6',
    marginVertical: 5,
  },

  disabledTimeSlot: { opacity: 0.5 },
  disabledText: { color: '#AAAAAA' },

  // Session Details
  sessionDetails: { flex: 1 },

  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  subjectIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
    marginRight: 8,
  },

  subjectButton: { flex: 1 },

  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },

  disabledSubjectButton: { opacity: 0.5 },
  incompleteField: { borderBottomWidth: 1, borderBottomColor: '#F87171' },
  incompleteText: { color: '#F87171' },

  // Faculty Information
  facultyInfo: { marginBottom: 8 },

  facultyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  facultyIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    marginRight: 8,
  },

  facultyText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },

  assistantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  assistantText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 16,
  },

  // Session Type Information
  sessionTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  typeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
    marginRight: 8,
  },

  typeText: {
    fontSize: 13,
    color: '#8B5CF6',
    fontWeight: '500',
  },

  // Class Type Information
  classTypeInfo: { flexDirection: 'row', alignItems: 'center' },

  classTypeIcon: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#10B981',
    marginRight: 8,
  },

  classTypeText: { fontSize: 13, color: '#666666' },

  // Add Session Button
  addSessionContainer: { paddingHorizontal: 15, marginBottom: 10 },
  addSessionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FE',
    padding: 10,
    borderRadius: 8,
  },
  addSessionText: {
    marginLeft: 6,
    color: '#6D28D9',
    fontWeight: '600',
  },

  // Action Buttons
  actionButtonsContainer: { alignItems: 'center', marginVertical: 20 },

  editModeButtons: { flexDirection: 'row', justifyContent: 'space-between' },

  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  saveButtonText: { color: '#FFFFFF', fontWeight: '600', marginLeft: 6 },

  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },

  cancelButtonText: { color: '#666666', fontWeight: '500' },

  // Modals
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  addNewText: { marginLeft: 4, color: '#6D28D9', fontWeight: '600' },

  addSubjectModalContainer: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },

  subjectInput: {
    borderWidth: 1,
    borderColor: '#E8E5FF',
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    fontSize: 14,
  },

  addModalButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },

  addModalButtonText: { color: '#FFFFFF', fontWeight: '600' },

  cancelModalButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },

  cancelModalButtonText: { color: '#666666', fontWeight: '500' },

  selectModalButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },

  selectModalButtonText: { color: '#FFFFFF', fontWeight: '600' },
});

export default styles;