import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const DepartmentProgress = ({navigation}) => {
  const [selectedYear, setSelectedYear] = useState('2nd YEAR');

  const years = ['1st YEAR', '2nd YEAR', '3rd YEAR', '4th YEAR'];
  
  // Sample data for the selected department (CSE)
  const departmentData = {
    name: 'CSE Progress',
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

  const renderYearTab = (year) => (
    <TouchableOpacity
      key={year}
      style={[
        styles.yearTab,
        selectedYear === year && styles.selectedYearTab,
      ]}
      onPress={() => setSelectedYear(year)}
    >
      <Text
        style={[
          styles.yearTabText,
          selectedYear === year && styles.selectedYearTabText,
        ]}
      >
        {year}
      </Text>
    </TouchableOpacity>
  );

  const renderPerformanceBar = (item, index) => (
    <View key={index} style={styles.performanceBarContainer}>
      <Text style={styles.performanceLabel}>{item.dept}</Text>
      <View style={styles.performanceBarBg}>
        <View 
          style={[
            styles.performanceBar, 
            { 
              width: `${item.percentage}%`, 
              backgroundColor: item.color 
            }
          ]} 
        />
      </View>
      <Text style={styles.performancePercentage}>{item.percentage}%</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{departmentData.name}</Text>
          <Text style={styles.subHeader}>HoD Details</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* HOD Profile Section */}
        <View style={styles.hodContainer}>
          <View style={styles.hodProfile}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50x50/4A90E2/FFFFFF?text=RK' }}
              style={styles.hodImage}
            />
            <View style={styles.hodInfo}>
              <Text style={styles.hodName}>{departmentData.hodName}</Text>
              <Text style={styles.hodDesignation}>{departmentData.designation}</Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{departmentData.status}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Year Tabs */}
        <View style={styles.yearTabsContainer}>
          {years.map(renderYearTab)}
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <LinearGradient
              colors={['#A855F7', '#C084FC']}
              style={styles.statCard}
            >
              <Text style={styles.statValue}>{departmentData.totalStudents}</Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={['#A855F7', '#C084FC']}
              style={styles.statCard}
            >
              <Text style={styles.statValue}>{departmentData.attendance}</Text>
              <Text style={styles.statLabel}>Student Attendance</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statsRow}>
            <LinearGradient
              colors={['#A855F7', '#C084FC']}
              style={styles.statCard}
            >
              <Text style={styles.statValue}>{departmentData.lowAttendance}</Text>
              <Text style={styles.statLabel}>Low Attendance</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={['#A855F7', '#C084FC']}
              style={styles.statCard}
            >
              <Text style={styles.statValue}>{departmentData.onDuty}</Text>
              <Text style={styles.statLabel}>On - Duty</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Performance Chart */}
        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>CSE Attendance Performance</Text>
          <View style={styles.performanceChart}>
            {departmentData.performanceData.map(renderPerformanceBar)}
          </View>
        </View>

        {/* Department Performance Section */}
        <View style={styles.departmentPerformanceSection}>
          <Text style={styles.departmentPerformanceTitle}>CSE Department Performance</Text>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📊</Text>
            <Text style={styles.navLabel}>Stat Line</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📅</Text>
            <Text style={styles.navLabel}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <Text style={styles.navIcon}>📈</Text>
            <Text style={[styles.navLabel, styles.activeNavLabel]}>Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>📱</Text>
            <Text style={styles.navLabel}>Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  subHeader: {
    fontSize: 14,
    color: '#6B7280',
    position: 'absolute',
    top: 25,
    left: 0,
  },
  moreButton: {
    padding: 5,
  },
  moreButtonText: {
    fontSize: 20,
    color: '#6B7280',
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
  hodImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
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
    padding: 20,
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
    padding: 20,
    marginBottom: 20,
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
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
  },
  activeNavItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#A855F7',
    fontWeight: 'bold',
  },
});

export default DepartmentProgress;