import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Keyboard, Platform } from 'react-native';

// Import screens - replace with your actual Guide screens
import GuideHome from '../screens/Guide/GuideHome/GuideHome';
import Attendance from '../screens/Guide/Attendance/Attendance';
import Pass from '../screens/Guide/Pass/Pass';
import Activity from '../screens/Guide/Activity/Activity';

// Import Material screens from AppLayout
import MaterialHome from '../screens/Guide/Materials/MaterialHomePage/MaterialHome';
import Tamil from '../screens/Guide/Materials/Tamil/Tamil';
import English from '../screens/Guide/Materials/English/English';
import Mathematics from '../screens/Guide/Materials/Mathematics/Mathematics';
import Science from '../screens/Guide/Materials/Science/Science';
import SocialScience from '../screens/Guide/Materials/SocialScience/SocialScience';
// Note: LevelPromotion excluded as requested

// Import SVG icons - make sure these paths match your actual SVG files
import Home from '../assets/Navbar/house.svg';
import AttendanceIcon from '../assets/Navbar/user-plus.svg';
import PassIcon from '../assets/Navbar/file-text.svg';
import ActivityIcon from '../assets/Navbar/bar-chart.svg';
import MaterialsIcon from '../assets/Navbar/materials.svg';

import HomeClicked from '../assets/Navbar/houseClicked.svg';
import AttendanceClicked from '../assets/Navbar/user-plusClicked.svg';
import PassClicked from '../assets/Navbar/file-textClicked.svg';
import ActivityClicked from '../assets/Navbar/bar-chartClicked.svg';
import MaterialsClicked from '../assets/Navbar/materialsClicked.svg';

const Tab = createBottomTabNavigator();
const MaterialStack = createStackNavigator();

// Create a stack navigator for Materials section
const MaterialStackNavigator = () => {
  return (
    <MaterialStack.Navigator>
      <MaterialStack.Screen
        name="MaterialHome"
        component={MaterialHome}
        options={{ headerShown: false }}
      />
      <MaterialStack.Screen 
        name="Tamil" 
        component={Tamil} 
        options={{ headerShown: false }}
      />
      <MaterialStack.Screen 
        name="English" 
        component={English} 
        options={{ headerShown: false }}
      />
      <MaterialStack.Screen 
        name="Mathematics" 
        component={Mathematics} 
        options={{ headerShown: false }}
      />
      <MaterialStack.Screen 
        name="Science" 
        component={Science} 
        options={{ headerShown: false }}
      />
      <MaterialStack.Screen 
        name="SocialScience" 
        component={SocialScience} 
        options={{ headerShown: false }}
      />
    </MaterialStack.Navigator>
  );
};

const GuideTabNavigator = () => {
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
        name="GuideHome"
        component={GuideHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? HomeClicked : Home;
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
        name="MaterialsStack"
        component={MaterialStackNavigator}
        options={{
          tabBarLabel: 'Materials',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? MaterialsClicked : MaterialsIcon;
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

export default GuideTabNavigator;