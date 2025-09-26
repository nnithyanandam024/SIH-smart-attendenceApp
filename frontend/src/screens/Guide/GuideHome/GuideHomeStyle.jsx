import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  statsContainer: {
    marginBottom: 24,
  },
  topStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bottomStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 80,
    justifyContent: 'center',
  },
  largeStatBox: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 100,
    justifyContent: 'center',
  },
  statTitle: {
    fontSize: 12,
    marginBottom: 8,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  largeStatValue: {
    fontSize: 36,
  },
  
  // Schedule Section Styles
  scheduleSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  
  sectionHeader: {
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },

  // Date Navigation Styles
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  
  dateNavButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  
  dateNavText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  
  dateInfo: {
    flex: 1,
    alignItems: 'center',
  },
  
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  // Schedule Items Styles
  scheduleContainer: {
    flex: 1,
  },
  
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  
  timeContainer: {
    width: 70,
    alignItems: 'flex-start',
    paddingTop: 4,
  },
  
  timeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  
  scheduleContent: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
  },
  
  subjectBar: {
    width: 4,
    backgroundColor: '#FF9800',
    borderRadius: 2,
    marginRight: 12,
  },
  
  scheduleDetails: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 12,
  },
  
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  
  subjectText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  
  moreButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  moreButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  
  gradeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  
  typeText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
    marginBottom: 4,
  },
  
  durationText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
  },

  // Chart Section Styles
  chartSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
    textAlign: 'left',
  },
  chart: {
    borderRadius: 12,
    marginLeft: -16,
  },
  
  // Loading state styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6200EE',
    fontWeight: '500',
  },
});

export default styles;