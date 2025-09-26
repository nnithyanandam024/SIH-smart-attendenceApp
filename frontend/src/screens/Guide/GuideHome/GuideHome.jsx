import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Logout from '../../../assets/Admin/log-out.svg'; // Replace with your guide logout icon
import styles from './GuideHomeStyle';

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

const ScheduleSection = ({ scheduleData }) => {
  const renderScheduleItem = (item) => (
    <View key={item.id} style={styles.scheduleItem}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.scheduleContent}>
        <View style={styles.subjectBar} />
        <View style={styles.scheduleDetails}>
          <View style={styles.scheduleHeader}>
            <Text style={styles.subjectText}>{item.subject}</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>⋮</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.gradeText}>{item.grade}</Text>
          <Text style={styles.typeText}>{item.type}</Text>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.scheduleSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.dateNavButton}>
            <Text style={styles.dateNavText}>‹</Text>
          </TouchableOpacity>
          <View style={styles.dateInfo}>
            <Text style={styles.dayText}>Monday</Text>
            <Text style={styles.dateText}>25/12/24</Text>
          </View>
          <TouchableOpacity style={styles.dateNavButton}>
            <Text style={styles.dateNavText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scheduleContainer}>
        {scheduleData.map(renderScheduleItem)}
      </View>
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

const GuideHome = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: '250',
    activeClasses: '8',
    pendingPass: '17',
    onDuty: '8'
  });

  const [scheduleData, setScheduleData] = useState([
    {
      id: 1,
      time: '09:30 AM',
      subject: 'Mathematics',
      grade: 'Grade VI - A',
      type: 'Academic',
      duration: '60 min',
    },
    {
      id: 2,
      time: '10:30 AM',
      subject: 'Mathematics',
      grade: 'Grade VI - A',
      type: 'Academic',
      duration: '60 min',
    },
  ]);

  const [performanceData, setPerformanceData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      data: [1.2, 1.4, 1.3, 1.2, 0.8, 1.5],
      colors: [
        () => '#42A5F5', // Monday - Blue
        () => '#66BB6A', // Tuesday - Green  
        () => '#66BB6A', // Wednesday - Green
        () => '#42A5F5', // Thursday - Blue
        () => '#EF5350', // Friday - Red
        () => '#66BB6A', // Saturday - Green
      ]
    }]
  });

  useEffect(() => {
    fetchGuideData();
  }, []);

  const fetchGuideData = async () => {
    try {
      // Simulating API call delay
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching guide data:', error);
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
        <Text style={styles.headerTitle}>Staff DashBoard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
          <Logout width={24} height={24} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.topStatsRow}>
            <StatBox 
              title="Total Students" 
              value={stats.totalStudents} 
              bgColor="#E1BEE7" 
              isLarge={true}
            />
            <StatBox 
              title="Active Classes" 
              value={stats.activeClasses} 
              bgColor="#CE93D8" 
              isLarge={true}
            />
          </View>
          
          <View style={styles.bottomStatsRow}>
            <StatBox 
              title="Pending Pass" 
              value={stats.pendingPass} 
              bgColor="#BA68C8" 
            />  
            <StatBox 
              title="On - Duty" 
              value={stats.onDuty} 
              bgColor="#AB47BC" 
            />
          </View>
        </View>

        <ScheduleSection scheduleData={scheduleData} />

        <ChartSection 
          title="Student Performance" 
          data={performanceData}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuideHome;