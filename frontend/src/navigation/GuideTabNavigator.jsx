import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Keyboard, Platform } from 'react-native';

// Import screens - replace with your actual Guide screens
import GuideHome from '../screens/Guide/GuideHome/GuideHome';
import Project from '../screens/Guide/Project/GuideProject';
import Queries from '../screens/Guide/Queries/Queries';

// Import SVG icons
import Home from '../assets/Navbar/house.svg';
import ProjectIcon from '../assets/Navbar/file-text.svg';
import QueriesIcon from '../assets/Navbar/message.svg'; // Assuming you have a message.svg for queries

import HomeClicked from '../assets/Navbar/houseClicked.svg';
import ProjectClicked from '../assets/Navbar/file-textClicked.svg';
import QueriesClicked from '../assets/Navbar/messageClicked.svg'; // Assuming you have a messageClicked.svg

const Tab = createBottomTabNavigator();

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
            return <Icon width={24} height={24} />;
          },
        }}
      />
      <Tab.Screen
        name="Queries"
        component={Queries}
        options={{
          tabBarLabel: 'Queries',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? QueriesClicked : QueriesIcon;
            return <Icon width={24} height={24} />;
          },
        }}
      />
       <Tab.Screen
        name="Project"
        component={Project}
        options={{
          tabBarLabel: 'Project',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? ProjectClicked : ProjectIcon;
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

export default GuideTabNavigator;