import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import BackIcon from '../../../assets/Guide/back.svg';
import styles from './InvitationsStyle';

const InvitationItem = ({ item, onAccept, onDecline }) => {
  return (
    <View style={styles.invitationItem}>
      <Text style={styles.invitationName}>Name: {item.name}</Text>
      <Text style={styles.projectName}>Project Name: {item.projectName}</Text>
      <Text style={styles.studentCount}>{item.students} Students</Text>
      
      <Text style={styles.descriptionLabel}>Description</Text>
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

const Invitations = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    // Mock API call - replace with actual API calls
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      // Simulating API call delay
      setTimeout(() => {
        // Mock invitations data
        const invitationsData = [
          { 
            id: '1', 
            name: 'GovindSamy C R',
            projectName: 'AI-Based Attendance System',
            students: 4,
            description: 'A system that uses facial recognition to mark student attendance automatically.',
          },
          { 
            id: '2', 
            name: 'GovindSamy C R',
            projectName: 'AI-Based Attendance System',
            students: 4,
            description: 'A system that uses facial recognition to mark student attendance automatically.',
          },
          { 
            id: '3', 
            name: 'GovindSamy C R',
            projectName: 'AI-Based Attendance System',
            students: 4,
            description: 'A system that uses facial recognition to mark student attendance automatically.',
          },
        ];
        
        setInvitations(invitationsData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching invitations:', error);
      setLoading(false);
    }
  };

  const handleAcceptInvitation = (id) => {
    // Handle invitation acceptance
    console.log('Accepted invitation:', id);
    // API call to accept the invitation would go here
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  const handleDeclineInvitation = (id) => {
    // Handle invitation decline
    console.log('Declined invitation:', id);
    // API call to decline the invitation would go here
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#975AFF" />
        <Text style={styles.loadingText}>Loading invitations...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <BackIcon width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invitations</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {invitations.length > 0 ? (
          invitations.map((item) => (
            <InvitationItem 
              key={item.id}
              item={item}
              onAccept={handleAcceptInvitation}
              onDecline={handleDeclineInvitation}
            />
          ))
        ) : (
          <Text style={styles.emptyListText}>No pending invitations</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Invitations;