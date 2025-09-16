import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Keyboard, Platform } from 'react-native';

import AdminHome from '../screens/Admin/AdminHome/AdminHome';
import AdminAddUser from '../screens/Admin/AddUser/AddUser';
import AdminProjects from '../screens/Admin/Project/ProjectHome';
import AdminProgress from '../screens/Admin/Progress/ProgressHome';

import Home from '../assets/Navbar/house.svg';
import AddUser from '../assets/Navbar/user-plus.svg';
import Project from '../assets/Navbar/file-text.svg';
import Progress from '../assets/Navbar/graph.svg';

import HomeClicked from '../assets/Navbar/houseClicked.svg';
import AddUserClicked from '../assets/Navbar/user-plusClicked.svg';
import ProjectClicked from '../assets/Navbar/file-textClicked.svg';
import ProgressClicked from '../assets/Navbar/graphClicked.svg';

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
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
        name="AdminHome"
        component={AdminHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? HomeClicked : Home;
            return <Icon width={24} height={24} />;
          },
        }}
      />
      <Tab.Screen
        name="AdminAddUser"
        component={AdminAddUser}
        options={{
          tabBarLabel: 'Add User',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? AddUserClicked : AddUser;
            return <Icon width={24} height={24} />;
          },
        }}
      />
      <Tab.Screen
        name="AdminProjects"
        component={AdminProjects}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? ProjectClicked : Project;
            return <Icon width={24} height={24} />;
          },
        }}
      />
      <Tab.Screen
        name="AdminProgress"
        component={AdminProgress}
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

export default AdminTabNavigator;