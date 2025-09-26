import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // ✅ get device width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  yearTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  yearTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },
  selectedYearTab: {
    backgroundColor: '#1E3A8A',
  },
  yearTabText: {
    color: '#374151',
    fontWeight: '500',
  },
  selectedYearTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#111827',
  },
  departmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  departmentCard: {
    width: (width - 60) / 2, // ✅ now works
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  departmentCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
  },
});

export default styles;
