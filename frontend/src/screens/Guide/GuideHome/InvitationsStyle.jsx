import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF5FF',
  },
 header: {
    flexDirection: 'row',
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
 backButton: {
    marginRight: 10,
 },
 
  content: {
    flex: 1,
    padding: 16,
  },
  invitationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  invitationName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 6,
  },
  projectName: {
    fontSize: 14,
    color: '#212121',
    marginBottom: 6,
  },
  studentCount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 12,
  },
  descriptionLabel: {
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
    marginTop: 8,
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
    backgroundColor: '#C884FC',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF5FF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#975AFF',
  },
  emptyListText: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 16,
    fontStyle: 'italic',
    paddingVertical: 24,
  },
});

export default styles;