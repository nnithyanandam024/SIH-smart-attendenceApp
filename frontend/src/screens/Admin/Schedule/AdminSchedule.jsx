import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import styles from './ScheduleHomeStyle';

const AdminSchedule = ({ navigation }) => {

  const [selectedDepartment, setSelectedDepartment] = useState('IT');

  const departments = ['CSE', 'IT', 'AIDS', 'CSBS', 'MECH', 'CIVIL', 'AIML'];
  
  const sections = [
    {
      id: 1,
      name: 'Section A',
      section: 'A',
      backgroundColor: '#B8F2E6',
      textColor: '#00A693',
    },
    {
      id: 2,
      name: 'Section B',
      section: 'B',
      backgroundColor: '#E8D5FF',
      textColor: '#8B5CF6',
    },
    {
      id: 3,
      name: 'Section C',
      section: 'C',
      backgroundColor: '#FEF3C7',
      textColor: '#F59E0B',
    },
  ];

  const handleDateNavigation = (direction) => {
    // Here you would implement date navigation logic
    console.log(`Navigate ${direction}`);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  const handleSectionPress = (section) => {
    console.log(`Selected section: ${section.name}`);
    // Navigate to AcademicSchedule with section and department parameters
    navigation.navigate('AcademicSchedule', {
      section: section.section,
      department: selectedDepartment
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
      </View>

      {/* Department Selection */}
      <View style={styles.departmentSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.departmentContainer}
        >
          {departments.map((department) => (
            <TouchableOpacity
              key={department}
              style={[
                styles.departmentButton,
                selectedDepartment === department && styles.selectedDepartmentButton,
              ]}
              onPress={() => handleDepartmentSelect(department)}
            >
              <Text
                style={[
                  styles.departmentText,
                  selectedDepartment === department && styles.selectedDepartmentText,
                ]}
              >
                {department}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sections */}
      <View style={styles.sectionsWrapper}>
        <ScrollView 
          style={styles.sectionsContainer}
          contentContainerStyle={styles.sectionsContent}
          showsVerticalScrollIndicator={false}
        >
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionCard,
                { backgroundColor: section.backgroundColor },
              ]}
              onPress={() => handleSectionPress(section)}
            >
              <Text
                style={[
                  styles.sectionText,
                  { color: section.textColor },
                ]}
              >
                {section.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AdminSchedule;