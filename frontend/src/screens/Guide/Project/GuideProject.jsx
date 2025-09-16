import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './GuideProjectStyle';

const GuideProject = ({ route, navigation }) => {
  const guide = route?.params?.guide; // ✅ Safe access

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching projects from API
    // In a real app, replace with actual API call
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    // Simulated data - replace with actual API call
    setTimeout(() => {
      const mockProjects = [
        {
          id: '1',
          name: 'AI-Based Attendance System',
          students: 5,
          description: 'A system that uses facial recognition to mark student attendance automatically.',
          teamLead: 'GovindSamy',
          members: ['MunuSamy', 'RamSamy', 'MuthuSamy', 'KuppuSamy'],
          department: 'IT',
          status: 'Ongoing'
        },
        {
          id: '2',
          name: 'Smart Irrigation System',
          students: 4,
          description: 'IoT-based irrigation system that monitors soil moisture and automates watering.',
          teamLead: 'RamSamy',
          members: ['GovindSamy', 'KuppuSamy', 'MuthuSamy'],
          department: 'CSE',
          status: 'Completed'
        },
        {
          id: '3',
          name: 'E-Learning Platform',
          students: 6,
          description: 'Interactive learning platform with video lectures and quizzes.',
          teamLead: 'MuthuSamy',
          members: ['GovindSamy', 'RamSamy', 'MunuSamy', 'KuppuSamy', 'RajaSamy'],
          department: 'ECE',
          status: 'Ongoing'
        },
      ];
      
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  };

  const handleProjectSelect = (project) => {
    navigation.navigate('GuideProjectProgress', { project });
  };

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.projectCard}
      onPress={() => handleProjectSelect(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.projectNameLabel}>Project Name: {item.name}</Text>
      <Text style={styles.studentCount}>{item.students} Students</Text>
      
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.teamSection}>
        <Text style={styles.teamLeadText}>Team Lead: {item.teamLead}</Text>
        <Text style={styles.membersText}>
          Members: {item.members.join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Projects</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading projects...</Text>
        </View>
      ) : (
        <FlatList
          data={projects}
          renderItem={renderProjectItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.projectsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default GuideProject;