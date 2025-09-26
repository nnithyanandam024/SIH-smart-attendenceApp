import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Keyboard, Platform, TouchableOpacity } from 'react-native';

// Import screens - actual Parent screens
import ParentDashboard from '../screens/Parent/ParentDashboard';
import Schedule from '../screens/Parent/Schedule';
import ParentMaterial from '../screens/Parent/ParentMaterial';
import Settings from '../screens/Parent/Settings';
import Survey from '../screens/Parent/Survey';

// Import the More popup component
import MorePopup from '../Components/MorePopup';

// Import additional screens that might be part of stacks
// import ChildDetails from '../screens/Parent/ChildDetails/ChildDetails';
// import Profile from '../screens/Parent/Profile/Profile';

// Import SVG icons - placeholder paths, replace with your actual SVG files
import Home from '../assets/Navbar/house.svg';
import ScheduleIcon from '../assets/Navbar/calendar.svg';
import MaterialIcon from '../assets/Navbar/book-open.svg';
import MoreIcon from '../assets/Navbar/more-horizontal.svg';

import HomeClicked from '../assets/Navbar/houseClicked.svg';
import ScheduleClicked from '../assets/Navbar/calendarClicked.svg';
import MaterialClicked from '../assets/Navbar/book-openClicked.svg';
import MoreClicked from '../assets/Navbar/more-horizontalClicked.svg';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();

// Create a stack navigator for Home section
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="ParentDashboard"
        component={ParentDashboard}
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen 
        name="ChildDetails" 
        component={ChildDetails} 
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

// Create a stack navigator for Settings section
const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsMain"
        component={Settings}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
};

// More tab component that handles popup
const MoreTab = ({ navigation }) => {
  const [showMorePopup, setShowMorePopup] = useState(false);
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      e.preventDefault();
      setShowMorePopup(true);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <MorePopup
        visible={showMorePopup}
        onClose={() => setShowMorePopup(false)}
        navigation={navigation}
      />
    </>
  );
};

const ParentTabNavigator = () => {
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
        name="Schedule"
        component={Schedule}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? ScheduleClicked : ScheduleIcon;
            return <Icon width={20} height={20} />;
          },
        }}
      />
      
      <Tab.Screen
        name="Materials"
        component={ParentMaterial}
        options={{
          tabBarLabel: 'Materials',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? MaterialClicked : MaterialIcon;
            return <Icon width={20} height={20} />;
          },
        }}
      />
      
      <Tab.Screen
        name="More"
        component={MoreTab}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ focused }) => {
            const Icon = focused ? MoreClicked : MoreIcon;
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

export default ParentTabNavigator;