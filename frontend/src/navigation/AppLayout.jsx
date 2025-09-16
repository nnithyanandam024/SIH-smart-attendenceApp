// Simplified AppLayout.jsx without using AuthContext
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';

import Welcome from '../screens/Login/Welcome';
import Login from '../screens/Login/Login';

import TeacherTabNavigator from './TeacherTabNavigator';
import ProjectDetails from '../screens/Teacher/Project/ProjectDetails';
import DepartmentProgress from '../screens/Teacher/Progress/DepartmentProgress';
import DepProjectDetails from '../screens/Teacher/Progress/DepProjectDetails';

import AdminTabNavigator from './AdminTabNavigator';

import GuideTabNavigator from './GuideTabNavigator';
import Invitations from '../screens/Guide/GuideHome/Invitations';
import GuideProject from '../screens/Guide/Project/GuideProject';
import GuideProjectProgress from '../screens/Guide/Project/GuideProjectProgress';
// import StudentTabNavigator from './StudentTabNavigator'; // Make sure to create this

const Stack = createStackNavigator();

const AppLayout = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            {/* Auth screens */}
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />

            {/* Teacher Screens */}
            <Stack.Screen
              name="TeacherDashboard"
              component={TeacherTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProjectDetails"
              component={ProjectDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DepartmentProgress"
              component={DepartmentProgress}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DepProjectDetails"
              component={DepProjectDetails}
              options={{ headerShown: false }}
            />

            {/* Admin Screens */}
            <Stack.Screen
              name="AdminDashboard"
              component={AdminTabNavigator}
              options={{ headerShown: false }}
            />
            
           
            {/* <Stack.Screen
              name="StudentDashboard"
              component={StudentTabNavigator}
              options={{ headerShown: false }}
            /> */}

            {/* Guide Screens */}
            <Stack.Screen
              name="GuideDashboard"
              component={GuideTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Invitations"
              component={Invitations}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GuideProject"
              component={GuideProject}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GuideProjectProgress"
              component={GuideProjectProgress}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default AppLayout;