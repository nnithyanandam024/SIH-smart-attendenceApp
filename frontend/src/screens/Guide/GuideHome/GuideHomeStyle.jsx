import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    padding: 8,
    marginLeft: 8,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 16,
    height: 16, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: '#000',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  invitationsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  invitationsList: {
    minHeight: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#6200EE',
    fontSize: 14,
    fontWeight: '500',
  },
  // Styles for team progress items
  teamProgressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
  },
  teamProgress: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  // Pie chart placeholder styles
  progressChart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  pieChartPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  pieSegment: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  pieSegmentTeamA: {
    backgroundColor: '#27AE60',
    right: '50%',
    bottom: '50%',
    transform: [{ translateX: 100 }, { translateY: 100 }, { rotate: '45deg' }],
    width: 100,
    height: 100,
  },
  pieSegmentTeamB: {
    backgroundColor: '#E74C3C',
    left: '50%',
    bottom: '50%',
    transform: [{ translateX: -100 }, { translateY: 100 }, { rotate: '45deg' }],
    width: 100,
    height: 100,
  },
  pieSegmentTeamC: {
    backgroundColor: '#3498DB',
    right: '50%',
    top: '50%',
    transform: [{ translateX: 100 }, { translateY: -100 }, { rotate: '45deg' }],
    width: 100,
    height: 100,
  },
  pieSegmentTeamD: {
    backgroundColor: '#F39C12',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }, { rotate: '45deg' }],
    width: 100,
    height: 100,
  },
  chartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#616161',
  },
  // Styles for invitation items (from the image provided)
  invitationItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  invitationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invitationName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentCount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  projectName: {
    fontSize: 14,
    color: '#212121',
    marginBottom: 12,
  },
  invitationLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  invitationDescription: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 16,
    lineHeight: 20,
  },
  invitationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  declineButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#975AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  declineButtonText: {
    color: '#616161',
    fontSize: 14,
    fontWeight: '500',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  // Loading state styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF5FF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6200EE',
  },
  // Empty state style
  emptyListText: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 14,
    fontStyle: 'italic',
    paddingVertical: 16,
  },
});

export default styles;