import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  FlatList,
} from 'react-native';

const StudentActivity = ({ navigation }) => {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'pending', 'Finished', 'Unfinished'
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false); // New state for materials modal
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Sample data - In a real app, this would come from your backend/API
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Mathematics Assignment',
      activityType: 'Assignment',
      fromDate: '15/12/2025',
      toDate: '20/12/2025',
      description: 'Complete calculus problems from chapter 5 and submit by deadline',
      fromTime: '09:00 AM',
      toTime: '11:00 AM',
      week: 2,
      status: 'pending', // 'pending', 'completed', 'incomplete'
      assignedBy: 'Prof. Johnson',
      completedDate: null,
      priority: 'high'
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
      week: 3,
      status: 'completed',
      assignedBy: 'Dr. Smith',
      completedDate: '20/12/2025',
      priority: 'medium'
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
      week: 4,
      status: 'incomplete',
      assignedBy: 'Ms. Davis',
      completedDate: null,
      priority: 'high'
    },
    {
      id: 4,
      title: 'Chemistry Project',
      activityType: 'Project',
      fromDate: '10/12/2025',
      toDate: '15/12/2025',
      description: 'Research project on organic compounds and their applications in daily life',
      fromTime: '11:00 AM',
      toTime: '01:00 PM',
      week: 2,
      status: 'completed',
      assignedBy: 'Dr. Wilson',
      completedDate: '14/12/2025',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'English Essay',
      activityType: 'Assignment',
      fromDate: '20/12/2025',
      toDate: '28/12/2025',
      description: 'Write analytical essay on Shakespeare\'s literary techniques in Hamlet',
      fromTime: '09:00 AM',
      toTime: '10:30 AM',
      week: 4,
      status: 'pending',
      assignedBy: 'Prof. Brown',
      completedDate: null,
      priority: 'low'
    }
  ]);

  // Filter activities based on status
  const getFilteredActivities = (status) => {
    return activities.filter(activity => activity.status === status);
  };

  // Get activity counts
  const getActivityCounts = () => {
    return {
      pending: activities.filter(a => a.status === 'pending').length,
      completed: activities.filter(a => a.status === 'completed').length,
      incomplete: activities.filter(a => a.status === 'incomplete').length,
      total: activities.length
    };
  };

  // Handle materials button click
  const handleMaterialsPress = () => {
    setShowMaterialsModal(true);
  };

  // Handle task completion
  const handleTaskAction = (taskId, action) => {
    setActivities(prev => prev.map(activity => {
      if (activity.id === taskId) {
        const updatedActivity = {
          ...activity,
          status: action,
          completedDate: action === 'completed' ? new Date().toLocaleDateString('en-GB') : null
        };
        return updatedActivity;
      }
      return activity;
    }));
    
    setShowTaskModal(false);
    setSelectedTask(null);
    
    const actionText = action === 'completed' ? 'completed' : 'marked as incomplete';
    Alert.alert('Success', `Task ${actionText} successfully!`);
  };

  // Show task confirmation modal
  const showTaskConfirmation = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'incomplete': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  // Render activity card
  const renderActivityCard = ({ item }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <View style={styles.activityTitleContainer}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <View style={styles.badgeContainer}>
            <View style={[styles.activityTypeBadge, { backgroundColor: '#F3E8FF' }]}>
              <Text style={styles.activityTypeText}>{item.activityType}</Text>
            </View>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                {item.priority.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.activityDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}> Due:</Text>
          <Text style={styles.detailValue}>{item.toDate} at {item.toTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}> Assigned by:</Text>
          <Text style={styles.detailValue}>{item.assignedBy}</Text>
        </View>
        {item.completedDate && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}> Completed on:</Text>
            <Text style={styles.detailValue}>{item.completedDate}</Text>
          </View>
        )}
        <View style={styles.weekRow}>
          <Text style={styles.weekLabel}>Week {item.week}</Text>
        </View>
        {item.description ? (
          <Text style={styles.activityDescription} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
      </View>

      {item.status === 'pending' && (
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => showTaskConfirmation(item)}
          >
            <Text style={styles.completeButtonText}>Mark as Complete</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === 'incomplete' && (
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => handleTaskAction(item.id, 'completed')}
          >
            <Text style={styles.retryButtonText}>Mark as Complete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  // Dashboard stats card
  const renderStatsCard = (title, count, color, onPress) => (
    <TouchableOpacity style={[styles.statsCard, { borderLeftColor: color }]} onPress={onPress}>
      <Text style={styles.statsCount}>{count}</Text>
      <Text style={styles.statsTitle}>{title}</Text>
    </TouchableOpacity>
  );

  // Main dashboard view
  const renderDashboard = () => {
    const counts = getActivityCounts();
    
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Student Activity Dashboard</Text>
          <Text style={styles.headerSubtitle}>Track and complete your assigned activities</Text>
          
          {/* Material Button */}
          <TouchableOpacity style={styles.materialButton} onPress={handleMaterialsPress}>
            <View style={styles.materialButtonContent}>
              {/* <Text style={styles.materialButtonIcon}>📚</Text> */}
              <Text style={styles.materialButtonText}>Materials / PPT</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards - 2x2 Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            {renderStatsCard('Total Tasks', counts.total, '#B794F6', null)}
            {renderStatsCard('Pending', counts.pending, '#F59E0B', () => setCurrentView('pending'))}
          </View>
          <View style={styles.statsRow}>
            {renderStatsCard('Completed', counts.completed, '#10B981', () => setCurrentView('completed'))}
            {renderStatsCard('Incomplete', counts.incomplete, '#EF4444', () => setCurrentView('incomplete'))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {activities.slice(0, 3).map(activity => (
            <View key={activity.id}>
              {renderActivityCard({ item: activity })}
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: '#FEF3C7' }]}
              onPress={() => setCurrentView('pending')}
            >
              <Text style={[styles.quickActionText, { color: '#F59E0B' }]}>Pending Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: '#D1FAE5' }]}
              onPress={() => setCurrentView('completed')}
            >
              <Text style={[styles.quickActionText, { color: '#10B981' }]}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionButton, { backgroundColor: '#FEE2E2' }]}
              onPress={() => setCurrentView('incomplete')}
            >
              <Text style={[styles.quickActionText, { color: '#EF4444' }]}>Incomplete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  // List view for filtered activities
  const renderListView = (status) => {
    const filteredActivities = getFilteredActivities(status);
    const statusTitles = {
      pending: 'Pending Tasks',
      completed: 'Completed Tasks', 
      incomplete: 'Incomplete Tasks'
    };

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.listHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentView('dashboard')}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.listHeaderTitle}>{statusTitles[status]}</Text>
          <Text style={styles.listHeaderCount}>({filteredActivities.length})</Text>
        </View>

        {/* Activity List */}
        {filteredActivities.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📋</Text>
            <Text style={styles.emptyStateTitle}>No {status} tasks</Text>
            <Text style={styles.emptyStateSubtitle}>
              {status === 'pending' && 'All caught up! No pending tasks.'}
              {status === 'completed' && 'Complete some tasks to see them here.'}
              {status === 'incomplete' && 'Great! No incomplete tasks.'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredActivities}
            renderItem={renderActivityCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.activityList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  };

  // Materials modal
  const renderMaterialsModal = () => (
    <Modal
      visible={showMaterialsModal}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.materialsModal}>
          <View style={styles.materialsModalHeader}>
            <Text style={styles.materialsModalIcon}>🚧</Text>
            <Text style={styles.materialsModalTitle}>Materials / PPT</Text>
          </View>
          
          <View style={styles.materialsModalContent}>
            <Text style={styles.materialsModalSubtitle}>
              This feature is currently under development
            </Text>
            <Text style={styles.materialsModalDescription}>
              We're working hard to bring you access to course materials, presentations, and resources. 
              This section will be available soon!
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.materialsModalButton}
            onPress={() => setShowMaterialsModal(false)}
          >
            <Text style={styles.materialsModalButtonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Task confirmation modal
  const renderTaskModal = () => (
    <Modal
      visible={showTaskModal}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.taskModal}>
          <Text style={styles.modalTitle}>Update Task Status</Text>
          <Text style={styles.modalSubtitle}>
            How would you like to mark "{selectedTask?.title}"?
          </Text>
          
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.completeModalButton]}
              onPress={() => handleTaskAction(selectedTask?.id, 'completed')}
            >
              <Text style={styles.completeModalButtonText}>Complete</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.incompleteModalButton]}
              onPress={() => handleTaskAction(selectedTask?.id, 'incomplete')}
            >
              <Text style={styles.incompleteModalButtonText}>Incomplete</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() => {
              setShowTaskModal(false);
              setSelectedTask(null);
            }}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'pending' && renderListView('pending')}
      {currentView === 'Finished' && renderListView('Finished')}
      {currentView === 'Unfinished' && renderListView('Unfinished')}
      {renderTaskModal()}
      {renderMaterialsModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  materialButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#1E3A8A',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  materialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  materialButtonIcon: {
    fontSize: 20,
  },
  materialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statsCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  activityCard: {
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
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  activityTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activityTypeText: {
    color: '#B794F6',
    fontSize: 12,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  activityDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  detailValue: {
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
  activityDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 8,
    fontStyle: 'italic',
  },
  actionButtonsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  completeButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#B794F6',
    fontWeight: '600',
  },
  listHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listHeaderCount: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  activityList: {
    padding: 20,
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
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    width: '85%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalActions: {
    gap: 12,
    marginBottom: 16,
  },
  modalButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeModalButton: {
    backgroundColor: '#10B981',
  },
  completeModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  incompleteModalButton: {
    backgroundColor: '#EF4444',
  },
  incompleteModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalCancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  // Materials Modal Styles
  materialsModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    width: '88%',
    maxWidth: 400,
  },
  materialsModalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  materialsModalIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  materialsModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  materialsModalContent: {
    marginBottom: 24,
  },
  materialsModalSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F59E0B',
    textAlign: 'center',
    marginBottom: 16,
  },
  materialsModalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  materialsModalButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  materialsModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StudentActivity;