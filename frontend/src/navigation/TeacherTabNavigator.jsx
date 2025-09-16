import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Keyboard, Platform } from 'react-native';

import TeacherHome from '../screens/Teacher/TeacherHome/TeacherHome';
import TeacherAddProject from '../screens/Teacher/AddProject/AddProject';
import TeacherProjects from '../screens/Teacher/Project/ProjectHome';
import TeacherProgress from '../screens/Teacher/Progress/ProgressHome';
import TeacherProjectDetails from '../screens/Teacher/Project/ProjectDetails';
import DepartmentProgress from '../screens/Teacher/Progress/DepartmentProgress';


import Home from '../assets/Navbar/house.svg';
import AddProject from '../assets/Navbar/upload.svg';
import Project from '../assets/Navbar/file-text.svg';
import Progress from '../assets/Navbar/graph.svg';

import HomeClicked from '../assets/Navbar/houseClicked.svg';
import AddProjectClicked from '../assets/Navbar/uploadClicked.svg';
import ProjectClicked from '../assets/Navbar/file-textClicked.svg';
import ProgressClicked from '../assets/Navbar/graphClicked.svg';

const Tab = createBottomTabNavigator();

const TeacherTabNavigator = () => {
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
        name="TeacherHome"
        component={TeacherHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? HomeClicked : Home;
            return <Icon width={24} height={24} />;
          },
        }}
      />
      <Tab.Screen
        name="TeacherAddProject"
        component={TeacherAddProject}
        options={{
          tabBarLabel: 'Add Project',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? AddProjectClicked : AddProject;
            return <Icon width={24} height={24} />;
          },
        }}
      />
      <Tab.Screen
        name="TeacherProjects"
        component={TeacherProjects}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? ProjectClicked : Project;
            return <Icon width={24} height={24} />;
          },
        }}
      />
      <Tab.Screen
        name="TeacherProgress"
        component={TeacherProgress}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? ProgressClicked : Progress;
            return <Icon width={24} height={24} />;
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
    paddingHorizontal: 10,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 0,
    marginBottom: 5,
  }
});

export default TeacherTabNavigator;