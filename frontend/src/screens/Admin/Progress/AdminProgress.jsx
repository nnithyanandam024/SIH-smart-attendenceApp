import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

// Mock department icon component
const DepartmentIcon = ({ style }) => (
  <View style={[{
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  }, style]}>
    <Text style={{ fontSize: 24, color: '#666' }}>🏢</Text>
  </View>
);

// Performance Bar Component
const PerformanceBar = ({ dept, percentage, color }) => (
  <View style={departmentStyles.performanceBarContainer}>
    <Text style={departmentStyles.performanceLabel}>{dept}</Text>
    <View style={departmentStyles.performanceBarBg}>
      <View 
        style={[
          departmentStyles.performanceBar, 
          { 
            width: `${percentage}%`, 
            backgroundColor: color 
          }
        ]} 
      />
    </View>
    <Text style={departmentStyles.performancePercentage}>{percentage}%</Text>
  </View>
);

// Mock Linear Gradient Component
const LinearGradient = ({ colors, style, children }) => (
  <View style={[style, { backgroundColor: colors[0] }]}>
    {children}
  </View>
);

const departments = [
  { id: 'cse', name: 'CSE' },
  { id: 'it', name: 'IT' },
  { id: 'eee', name: 'EEE' },
  { id: 'ece', name: 'ECE' },
  { id: 'mech', name: 'MECH' },
  { id: 'agri', name: 'AGRI' },
  { id: 'aids', name: 'AIDS' },
  { id: 'bt', name: 'BT' },
  { id: 'eie', name: 'EIE' },
  { id: 'ft', name: 'FT' },
  { id: 'fd', name: 'FD' },
  { id: 'aero', name: 'AERO' },
  { id: 'aiml', name: 'AIML' },
  { id: 'ct', name: 'CT' },
];

const years = [
  { id: 1, name: '1st YEAR', label: 'First Year' },
  { id: 2, name: '2nd YEAR', label: 'Second Year' },
  { id: 3, name: '3rd YEAR', label: 'Third Year' },
  { id: 4, name: '4th YEAR', label: 'Fourth Year' },
];

// Department Progress Screen Component
const DepartmentProgress = ({ department, year, onBack }) => {
  const [selectedYear, setSelectedYear] = useState(year?.name || '2nd YEAR');

  const departmentData = {
    name: `${department.name} Progress`,
    hodName: 'Ram Kumar Dr',
    designation: 'Professor',
    status: 'Present',
    totalStudents: 320,
    attendance: '86%',
    lowAttendance: 17,
    onDuty: 8,
    performanceData: [
      { dept: 'CSE', percentage: 86, color: '#3B82F6' },
      { dept: 'IT', percentage: 92, color: '#10B981' },
      { dept: 'MECH', percentage: 88, color: '#3B82F6' },
      { dept: 'CIVIL', percentage: 84, color: '#3B82F6' },
      { dept: 'AIDS', percentage: 90, color: '#EF4444' },
      { dept: 'ECE', percentage: 94, color: '#10B981' },
    ]
  };



  return (
    <ScrollView style={departmentStyles.container}>
      <View style={departmentStyles.content}>
        {/* Header */}
        <View style={departmentStyles.headerContainer}>
          <TouchableOpacity onPress={onBack} style={departmentStyles.backButton}>
            <Text style={departmentStyles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={departmentStyles.header}>{departmentData.name}</Text>
          <Text style={departmentStyles.subHeader}>HoD Details</Text>
        </View>

        {/* HOD Profile Section */}
        <View style={departmentStyles.hodContainer}>
          <View style={departmentStyles.hodProfile}>
            <View style={departmentStyles.hodImagePlaceholder}>
              <Text style={departmentStyles.hodInitials}>RK</Text>
            </View>
            <View style={departmentStyles.hodInfo}>
              <Text style={departmentStyles.hodName}>{departmentData.hodName}</Text>
              <Text style={departmentStyles.hodDesignation}>{departmentData.designation}</Text>
              <View style={departmentStyles.statusContainer}>
                <View style={departmentStyles.statusDot} />
                <Text style={departmentStyles.statusText}>{departmentData.status}</Text>
              </View>
            </View>
          </View>
        </View>

   

        {/* Statistics Cards */}
        <View style={departmentStyles.statsContainer}>
          <View style={departmentStyles.statsRow}>
            <LinearGradient
              colors={['#A855F7', '#C084FC']}
              style={departmentStyles.statCard}
            >
              <Text style={departmentStyles.statValue}>{departmentData.totalStudents}</Text>
              <Text style={departmentStyles.statLabel}>Total Students</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={['#A855F7', '#C084FC']}
              style={departmentStyles.statCard}
            >
              <Text style={departmentStyles.statValue}>{departmentData.attendance}</Text>
              <Text style={departmentStyles.statLabel}>Student Attendance</Text>
            </LinearGradient>
          </View>
          
          <View style={departmentStyles.statsRow}>
            <LinearGradient
              colors={['#A855F7', '#C084FC']}
              style={departmentStyles.statCard}
            >
              <Text style={departmentStyles.statValue}>{departmentData.lowAttendance}</Text>
              <Text style={departmentStyles.statLabel}>Low Attendance</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={['#A855F7', '#C084FC']}
              style={departmentStyles.statCard}
            >
              <Text style={departmentStyles.statValue}>{departmentData.onDuty}</Text>
              <Text style={departmentStyles.statLabel}>On - Duty</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Performance Chart */}
        <View style={departmentStyles.performanceSection}>
          <Text style={departmentStyles.performanceTitle}>{department.name} Attendance Performance</Text>
          <View style={departmentStyles.performanceChart}>
            {departmentData.performanceData.map((item, index) => (
              <PerformanceBar 
                key={index}
                dept={item.dept}
                percentage={item.percentage}
                color={item.color}
              />
            ))}
          </View>
        </View>

        {/* Department Performance Section */}
        <View style={departmentStyles.departmentPerformanceSection}>
          <Text style={departmentStyles.departmentPerformanceTitle}>
            {department.name} Department Performance
          </Text>
           <View style={departmentStyles.performanceChart}>
            {departmentData.performanceData.map((item, index) => (
              <PerformanceBar 
                key={index}
                dept={item.dept}
                percentage={item.percentage}
                color={item.color}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Main AdminProgress Component
const AdminProgress = () => {
  const [selectedYear, setSelectedYear] = useState(2);
  const [currentScreen, setCurrentScreen] = useState('main');
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleYearSelect = (yearId) => {
    setSelectedYear(yearId);
  };

  const handleDepartmentSelect = (department) => {
    const year = years.find(y => y.id === selectedYear);
    setSelectedDepartment(department);
    setCurrentScreen('department');
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
    setSelectedDepartment(null);
  };

  if (currentScreen === 'department' && selectedDepartment) {
    return (
      <DepartmentProgress 
        department={selectedDepartment}
        year={years.find(y => y.id === selectedYear)}
        onBack={handleBackToMain}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Student Progress</Text>
      </View>
      
      {/* Year Selection Tabs */}
      <View style={styles.yearTabsContainer}>
        {years.map((year) => (
          <TouchableOpacity
            key={year.id}
            style={[
              styles.yearTab,
              selectedYear === year.id && styles.selectedYearTab
            ]}
            onPress={() => handleYearSelect(year.id)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.yearTabText,
              selectedYear === year.id && styles.selectedYearTabText
            ]}>
              {year.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.subtitle}>Choose Department</Text>
      
      <ScrollView contentContainerStyle={styles.departmentsGrid}>
        {departments.map((dept) => (
          <TouchableOpacity
            key={dept.id}
            style={styles.departmentCard}
            onPress={() => handleDepartmentSelect(dept)}
            activeOpacity={0.7}
          >
            <DepartmentIcon style={styles.departmentIcon} />
            <Text style={styles.departmentName}>{dept.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Styles for AdminProgress
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f0ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000',
  },
  yearTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
  },
  yearTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#a66de9',
    minWidth: 70,
    alignItems: 'center',
  },
  selectedYearTab: {
    backgroundColor: '#a66de9',
    borderColor: '#a66de9',
  },
  yearTabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#a66de9',
    textAlign: 'center',
  },
  selectedYearTabText: {
    color: 'white',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#a66de9',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 15,
  },
  departmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  departmentCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  departmentIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
});

// Styles for DepartmentProgress
const departmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  headerContainer: {
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#a66de9',
    fontWeight: '500',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subHeader: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
    fontWeight: '700',
  },
  hodContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  hodProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hodImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  hodInitials: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hodInfo: {
    flex: 1,
  },
  hodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  hodDesignation: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  yearTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 5,
  },
  yearTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedYearTab: {
    backgroundColor: '#1E3A8A',
  },
  yearTabText: {
    color: '#6B7280',
    fontWeight: '500',
    fontSize: 12,
  },
  selectedYearTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statsContainer: {
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    width: (width - 50) / 2,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  performanceSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 30,
    paddingBottom: 45,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  performanceChart: {
    height: 200,
  },
  performanceBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  performanceLabel: {
    width: 50,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  performanceBarBg: {
    flex: 1,
    height: 25,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  performanceBar: {
    height: '100%',
    borderRadius: 12,
  },
  performancePercentage: {
    width: 40,
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '500',
    textAlign: 'right',
  },
  departmentPerformanceSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 30,
    paddingBottom: 45,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  departmentPerformanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    paddingBottom: 20,
  },
});

export default AdminProgress;