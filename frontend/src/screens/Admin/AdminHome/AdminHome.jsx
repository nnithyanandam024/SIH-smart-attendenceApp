import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Logout from '../../../assets/Admin/log-out.svg';
import styles from './AdminHomeStyle';

const { width: screenWidth } = Dimensions.get('window');

const StatBox = ({ title, value, bgColor, isLarge = false }) => {
  return (
    <View style={[
      isLarge ? styles.largeStatBox : styles.statBox, 
      { backgroundColor: bgColor }
    ]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, isLarge && styles.largeStatValue]}>{value}</Text>
    </View>
  );
};

const ChartSection = ({ title, data }) => {
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(66, 165, 245, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    propsForLabels: {
      fontSize: 10,
      fontWeight: '500',
    },
    propsForVerticalLabels: {
      fontSize: 8,
    },
    propsForHorizontalLabels: {
      fontSize: 8,
    }
  };

  return (
    <View style={styles.chartSection}>
      <Text style={styles.chartTitle}>{title}</Text>
      <BarChart
        data={data}
        width={screenWidth - 64}
        height={150}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        showBarTops={false}
        withInnerLines={true}
        style={styles.chart}
        yAxisSuffix=""
        fromZero={true}
      />
    </View>
  );
};

const AdminHome = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    studentAttendance: '93%',
    totalStudents: '860',
    lowAttendance: '17',
    onDuty: '8'
  });

  const [attendanceData, setAttendanceData] = useState({
    labels: ['CSE', 'IT', 'MECH', 'CIVIL', 'AIDS', 'EEE'],
    datasets: [{
      data: [1.8, 1.9, 1.7, 1.8, 1.4, 1.9],
      colors: [
        () => '#42A5F5', // CSE - Blue
        () => '#66BB6A', // IT - Green  
        () => '#42A5F5', // MECH - Blue
        () => '#42A5F5', // CIVIL - Blue
        () => '#EF5350', // AIDS - Red
        () => '#66BB6A', // EEE - Green
      ]
    }]
  });

  const [departmentData, setDepartmentData] = useState({
    labels: ['CSE', 'IT', 'MECH', 'CIVIL', 'AIDS', 'EEE'],
    datasets: [{
      data: [1.7, 1.8, 1.6, 1.7, 1.3, 1.8],
      colors: [
        () => '#42A5F5', // CSE - Blue
        () => '#66BB6A', // IT - Green
        () => '#42A5F5', // MECH - Blue
        () => '#42A5F5', // CIVIL - Blue
        () => '#EF5350', // AIDS - Red
        () => '#66BB6A', // EEE - Green
      ]
    }]
  });

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      // Simulating API call delay
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      setLoading(false);
    }
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
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
          <Logout width={24} height={24} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.topStatsRow}>
            <StatBox 
              title="Student Attendance" 
              value={stats.studentAttendance} 
              bgColor="#E1BEE7" 
              isLarge={true}
            />
            <StatBox 
              title="Total Students" 
              value={stats.totalStudents} 
              bgColor="#CE93D8" 
              isLarge={true}
            />
          </View>
          
          <View style={styles.bottomStatsRow}>
            <StatBox 
              title="Low Attendance" 
              value={stats.lowAttendance} 
              bgColor="#BA68C8" 
            />  
            <StatBox 
              title="On - Duty" 
              value={stats.onDuty} 
              bgColor="#AB47BC" 
            />
          </View>
        </View>

        <ChartSection 
          title="Attendance Performance" 
          data={attendanceData}
        />

        <ChartSection 
          title="Department Performance" 
          data={departmentData}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminHome;

