import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AdminSchedule from '../screens/Admin/Schedule/AdminSchedule';
import AcademicSchedule from '../screens/Admin/Schedule/AcademicSchedule'; // Adjust the path as needed

const Stack = createStackNavigator();

const ScheduleStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="AdminScheduleHome" 
        component={AdminSchedule} 
      />
      <Stack.Screen 
        name="AcademicSchedule" 
        component={AcademicSchedule} 
      />
    </Stack.Navigator>
  );
};

export default ScheduleStackNavigator;