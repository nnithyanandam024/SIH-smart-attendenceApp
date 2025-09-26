import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Keyboard, Platform } from 'react-native';

// Import screens - replace with your actual Student screens
import StudentHome from '../screens/Student/StudentHome/StudentHome';
import Attendance from '../screens/Student/StudentAttendence/Attendence';
import Pass from '../screens/Student/StudentPass/Pass';
import Activity from '../screens/Student/StudentActivity/Activity';
import Rewards from '../screens/Student/StudentRewards/Rewards';

// Import additional screens that might be part of stacks
// import TimeTable from '../screens/Student/TimeTable/TimeTable';
// import Profile from '../screens/Student/Profile/Profile';

// Import SVG icons - placeholder paths, replace with your actual SVG files
import Home from '../assets/Navbar/house.svg';
import AttendanceIcon from '../assets/Navbar/user-plus.svg';
import PassIcon from '../assets/Navbar/file-text.svg';
import ActivityIcon from '../assets/Navbar/bar-chart.svg';
import RewardsIcon from '../assets/Navbar/rewards.svg';

import HomeClicked from '../assets/Navbar/houseClicked.svg';
import AttendanceClicked from '../assets/Navbar/user-plusClicked.svg';
import PassClicked from '../assets/Navbar/file-textClicked.svg';
import ActivityClicked from '../assets/Navbar/bar-chartClicked.svg';
import RewardsClicked from '../assets/Navbar/rewardsClicked.svg';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// Create a stack navigator for Home section (for TimeTable, Profile, etc.)
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="StudentHome"
        component={StudentHome}
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen 
        name="TimeTable" 
        component={TimeTable} 
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false }}
      /> */}
       
    </HomeStack.Navigator>
  );
};

const StudentTabNavigator = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Set up keyboard event listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          display: keyboardVisible ? 'none' : 'flex',
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#c884fc',
        tabBarInactiveTintColor: '#CDCDCD',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? HomeClicked : Home;
            return <Icon width={20} height={20} />;
          },
        }}
      />
     
      <Tab.Screen
        name="Pass"
        component={Pass}
        options={{
          tabBarLabel: 'Pass',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? PassClicked : PassIcon;
            return <Icon width={20} height={20} />;
          },
        }}
      /> 
      <Tab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarLabel: 'Attendance',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? AttendanceClicked : AttendanceIcon;
            return <Icon width={20} height={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? ActivityClicked : ActivityIcon;
            return <Icon width={20} height={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={Rewards}
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? RewardsClicked : RewardsIcon;
            return <Icon width={20} height={20} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    marginBottom: 5,
    fontWeight: '500',
  }
});

export default StudentTabNavigator;