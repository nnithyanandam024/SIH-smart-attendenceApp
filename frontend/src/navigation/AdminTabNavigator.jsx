import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, Keyboard, Platform} from 'react-native';

import AdminHome from '../screens/Admin/AdminHome/AdminHome';
import AdminAddUser from '../screens/Admin/AddUser/AddUser';
import ScheduleStackNavigator from './ScheduleStackNavigator'; // Import the new stack navigator
import AdminProgress from '../screens/Admin/Progress/AdminProgress';
import AdminCalendar from '../screens/Admin/Calendar/CalendarHome';

import Home from '../assets/Navbar/house.svg';
import AddUser from '../assets/Navbar/user-plus.svg';
import Schedule from '../assets/Navbar/calendar.svg';
import Progress from '../assets/Navbar/bar-chart.svg';
import Calendar from '../assets/Navbar/calendar-days.svg';

import HomeClicked from '../assets/Navbar/houseClicked.svg';
import AddUserClicked from '../assets/Navbar/user-plusClicked.svg';
import ScheduleClicked from '../assets/Navbar/calendarClicked.svg';
import ProgressClicked from '../assets/Navbar/bar-chartClicked.svg';
import CalendarClicked from '../assets/Navbar/calendar-daysClicked.svg';

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Set up keyboard event listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
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
      }}>
      <Tab.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            const Icon = focused ? HomeClicked : Home;
            return <Icon width={20} height={20} />;
          },
        }}
      />
      <Tab.Screen
        name="AdminAddUser"
        component={AdminAddUser}
        options={{
          tabBarLabel: 'Add User',
          tabBarIcon: ({focused}) => {
            const Icon = focused ? AddUserClicked : AddUser;
            return <Icon width={20} height={20} />;
          },
        }}
      />
      <Tab.Screen
        name="AdminSchedule"
        component={ScheduleStackNavigator} // Use the stack navigator instead of direct component
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({focused}) => {
            const Icon = focused ? ScheduleClicked : Schedule;
            return <Icon width={20} height={20} />;
          },
        }}
      />
      <Tab.Screen
        name="AdminProgress"
        component={AdminProgress}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({focused}) => {
            const Icon = focused ? ProgressClicked : Progress;
            return <Icon width={20} height={20} />;
          },
        }}
      />
      <Tab.Screen
        name="AdminCalendar"
        component={AdminCalendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({focused}) => {
            const Icon = focused ? CalendarClicked : Calendar;
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
  },
});

export default AdminTabNavigator;
