import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image
} from 'react-native';
import Logout from '../../../assets/Teacher/log-out.svg';
import InvitationIcon from '../../../assets/Guide/alert.svg';
import styles from './GuideHomeStyle';

const StatBox = ({ title, value, bgColor }) => {
  return (
    <View style={[styles.statBox, { backgroundColor: bgColor }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
};

const TeamProgressItem = ({ team, progress, color }) => {
  return (
    <View style={styles.teamProgressItem}>
      <View style={[styles.teamIndicator, { backgroundColor: color }]} />
      <Text style={styles.teamName}>{team}</Text>
      <Text style={styles.teamProgress}>{progress}%</Text>
    </View>
  );
};

const InvitationItem = ({ item, onAccept, onDecline }) => {
  return (
    <View style={styles.invitationItem}>
      <View style={styles.invitationHeader}>
        <Text style={styles.invitationName}>Name: {item.name}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.studentCount}>{item.students} Students</Text>
        </View>
      </View>
      
      <Text style={styles.projectName}>Project Name: {item.projectName}</Text>
      
      <Text style={styles.invitationLabel}>Description</Text>
      <Text style={styles.invitationDescription}>{item.description}</Text>
      
      <View style={styles.invitationActions}>
        <TouchableOpacity 
          style={styles.declineButton} 
          onPress={() => onDecline(item.id)}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.acceptButton} 
          onPress={() => onAccept(item.id)}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GuideHome = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    assignedTeams: 0,
    completedProjects: 0,
    ongoingProjects: 0,
    feedbacksGiven: 0
  });
  const [teamProgress, setTeamProgress] = useState([]);
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    // Mock API call - replace with actual API calls
    fetchGuideData();
  }, []);

  const fetchGuideData = async () => {
    try {
      // Simulating API calls
      // In a real app, these would be actual fetch or axios calls
      
      // Mock stats data - matching the image provided
      const statsData = {
        assignedTeams: 7,
        completedProjects: 7,
        ongoingProjects: 7,
        feedbacksGiven: 7
      };
      
      // Mock team progress data
      const teamProgressData = [
        { id: '1', team: 'Team A', progress: 45, color: '#27AE60' },
        { id: '2', team: 'Team B', progress: 30, color: '#E74C3C' },
        { id: '3', team: 'Team C', progress: 15, color: '#3498DB' },
        { id: '4', team: 'Team D', progress: 10, color: '#F39C12' },
      ];
      
      // Mock invitations data - matching the image provided
      const invitationsData = [
        { 
          id: '1', 
          name: 'GovindSamy C R',
          projectName: 'AI-Based Attendance System',
          students: 4,
          description: 'A system that uses facial recognition to mark student attendance automatically.',
          status: 'pending'
        },
        { 
          id: '2', 
          name: 'GovindSamy C R',
          projectName: 'AI-Based Attendance System',
          students: 4,
          description: 'A system that uses facial recognition to mark student attendance automatically.',
          status: 'pending'
        },
        { 
          id: '3', 
          name: 'GovindSamy C R',
          projectName: 'AI-Based Attendance System',
          students: 4,
          description: 'A system that uses facial recognition to mark student attendance automatically.',
          status: 'pending'
        },
      ];
      
      // Update state with mock data
      setStats(statsData);
      setTeamProgress(teamProgressData);
      setInvitations(invitationsData);
      
      // Set loading to false
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching guide data:', error);
      setLoading(false);
    }
  };

  const handleAcceptInvitation = (id) => {
    // Handle invitation acceptance
    console.log('Accepted invitation:', id);
    // API call to accept the invitation
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  const handleDeclineInvitation = (id) => {
    // Handle invitation decline
    console.log('Declined invitation:', id);
    // API call to decline the invitation
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  const navigateToInvitations = () => {
    // Navigate to the invitations screen
    navigation.navigate('Invitations');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          {/* Back button would typically go here if needed */}
          <Text style={styles.headerTitle}>Guide Dashboard</Text>
        </View>
        <View style={styles.headerIconsContainer}>
          <TouchableOpacity style={styles.headerIcon} onPress={navigateToInvitations}>
            <InvitationIcon width={24} height={24} />
            {invitations.length > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{invitations.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.headerIcon}>
            <NotificationIcon width={24} height={24} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
            <Logout width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatBox 
              title="Assigned Team" 
              value={stats.assignedTeams.toString()} 
              bgColor="#FFD6FF" 
            />
            <StatBox 
              title="Completed Projects" 
              value={stats.completedProjects.toString()} 
              bgColor="#E7C6FF" 
            />
          </View>
          
          <View style={styles.statsRow}>
            <StatBox 
              title="Ongoing Projects" 
              value={stats.ongoingProjects.toString()} 
              bgColor="#C8B6FF" 
            />  
            <StatBox 
              title="Feedbacks Given" 
              value={stats.feedbacksGiven.toString()} 
              bgColor="#B8C0FF" 
            />
          </View>
        </View>
        
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Team Progress Overview</Text>
          <View style={styles.progressChart}>
            {/* Placeholder for a pie chart in a real app */}
            <View style={styles.chartPlaceholder}>
              {/* In a real app, you would use a charting library like react-native-chart-kit */}
              <View style={styles.pieChartPlaceholder}>
                <View style={[styles.pieSegment, styles.pieSegmentTeamA]} />
                <View style={[styles.pieSegment, styles.pieSegmentTeamB]} />
                <View style={[styles.pieSegment, styles.pieSegmentTeamC]} />
                <View style={[styles.pieSegment, styles.pieSegmentTeamD]} />
              </View>
            </View>
            
            <View style={styles.chartLegend}>
              {teamProgress.map((team) => (
                <View key={team.id} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: team.color }]} />
                  <Text style={styles.legendText}>{team.team}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuideHome;