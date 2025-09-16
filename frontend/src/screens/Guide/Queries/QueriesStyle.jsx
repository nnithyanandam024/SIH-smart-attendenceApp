import { StyleSheet, Platform, Dimensions } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

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
    backgroundColor: '#FDF5FF',
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FDF5FF',
  },
  queriesList: {
    width: '40%',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  queryDetail: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  queryListContent: {
    padding: 8,
  },
  queryItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedQueryItem: {
    backgroundColor: '#F3E5FF',
    borderLeftWidth: 4,
    borderLeftColor: '#C884FC',
  },
  queryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  queryProject: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  projectIdBadge: {
    backgroundColor: '#E2D0F9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: '500',
    color: '#6b3fa0',
    marginRight: 8,
  },
  projectNameText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    flex: 1,
  },
  queryTimestamp: {
    fontSize: 12,
    color: '#8e8e93',
  },
  studentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  queryText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  queryStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  pendingIndicator: {
    backgroundColor: '#ffcc00',
  },
  respondedIndicator: {
    backgroundColor: '#4CD964',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  pendingText: {
    color: '#cc9900',
  },
  respondedText: {
    color: '#248A3D',
  },
  querySeparator: {
    height: 8,
  },
  emptyDetailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  emptyDetailText: {
    fontSize: 16,
    color: '#8e8e93',
    fontStyle: 'italic',
  },
  queryDetailContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  queryDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#FDF5FF',
  },
  detailProjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  detailProjectId: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  queryDetailContent: {
    flex: 1,
    padding: 16,
  },
  queryDetailContentContainer: {
    paddingBottom: 20,
  },
  studentQueryContainer: {
    marginBottom: 16,
  },
  studentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 6,
  },
  studentQueryBubble: {
    backgroundColor: '#e1f5fe',
    borderRadius: 16,
    padding: 12,
    borderTopLeftRadius: 4,
  },
  studentQueryText: {
    fontSize: 16,
    color: '#000000',
  },
  queryDetailTimestamp: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  guideResponseContainer: {
    marginTop: 24,
  },
  guideLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 6,
  },
  guideResponseBubble: {
    backgroundColor: '#C884FC',
    borderRadius: 16,
    padding: 12,
    borderTopRightRadius: 4,
  },
  guideResponseText: {
    fontSize: 16,
    color: '#ffffff',
  },
  responseTimestamp: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 4,
    alignSelf: 'flex-end',
    opacity: 0.9,
  },
  allResponsesContainer: {
    marginTop: 16,
  },
  responseInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  responseInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    minHeight: 40,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C884FC',
  },
  respondedBanner: {
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  respondedBannerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#43A047',
  }
});

export default styles;