import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },

  // Header Section
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },

  // Date Section
  dateSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  todayLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateContainer: {
    backgroundColor: '#F8F6FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  
  dateArrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BA68C8',
    borderRadius: 20,
  },
  
  arrowText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  dateText: {
    fontSize: 16,
    color: '#2C2C2C',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Department Section
  departmentSection: {
    marginBottom: 25,
    paddingLeft: 20,
  },
  
  departmentContainer: {
    paddingRight: 20,
  },
  
  departmentButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  selectedDepartmentButton: {
    backgroundColor: '#BA68C8',
    borderColor: '#BA68C8',
  },
  
  departmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  
  selectedDepartmentText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Sections Area
  sectionsWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },

  sectionsContainer: {
    flex: 1,
  },

  sectionsContent: {
    paddingBottom: 20,
  },
  
  sectionCard: {
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 3 
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    minHeight: 60,
  },
  
  sectionText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;