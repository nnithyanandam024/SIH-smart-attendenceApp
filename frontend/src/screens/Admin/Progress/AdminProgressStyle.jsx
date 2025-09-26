import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f0ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000',
  },
  // Year Selection Tabs Styles
  yearTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
  },
  yearTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#a66de9',
    minWidth: 70,
    alignItems: 'center',
  },
  selectedYearTab: {
    backgroundColor: '#a66de9',
    borderColor: '#a66de9',
  },
  yearTabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#a66de9',
    textAlign: 'center',
  },
  selectedYearTabText: {
    color: 'white',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#a66de9',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 15,
  },
  departmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  departmentCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  departmentIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  // Style for the selected department (optional)
  selectedDepartment: {
    borderWidth: 2,
    borderColor: '#4c669f',
  },
});

export default styles;