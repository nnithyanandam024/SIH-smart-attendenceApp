// import React, {useEffect, useState} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {View, Text, StyleSheet, Keyboard, Platform} from 'react-native';

// // Import the existing components or create placeholder components
// import DepartmentProgress from '../screens/Admin/Progress/AdminProgress'; // Using your existing component

// // Placeholder components - you'll need to create these
// const TeacherHome = () => (
//   <View style={styles.placeholder}>
//     <Text style={styles.placeholderText}>Teacher Home</Text>
//   </View>
// );

// const TeacherAddProject = () => (
//   <View style={styles.placeholder}>
//     <Text style={styles.placeholderText}>Add Project</Text>
//   </View>
// );

// const TeacherProjects = () => (
//   <View style={styles.placeholder}>
//     <Text style={styles.placeholderText}>Projects</Text>
//   </View>
// );

// const TeacherProgress = () => (
//   <View style={styles.placeholder}>
//     <Text style={styles.placeholderText}>Progress Home</Text>
//   </View>
// );

// // Import SVG icons - make sure these paths are correct
// import Home from '../assets/Navbar/house.svg';
// import AddProject from '../assets/Navbar/upload.svg';
// import Project from '../assets/Navbar/file-text.svg';
// import Progress from '../assets/Navbar/graph.svg';

// import HomeClicked from '../assets/Navbar/houseClicked.svg';
// import AddProjectClicked from '../assets/Navbar/uploadClicked.svg';
// import ProjectClicked from '../assets/Navbar/file-textClicked.svg';
// import ProgressClicked from '../assets/Navbar/graphClicked.svg';

// const Tab = createBottomTabNavigator();

// const TeacherTabNavigator = () => {
//   const [keyboardVisible, setKeyboardVisible] = useState(false);

//   // Set up keyboard event listeners
//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
//       () => {
//         setKeyboardVisible(true);
//       },
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
//       () => {
//         setKeyboardVisible(false);
//       },
//     );

//     // Clean up listeners when component unmounts
//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           ...styles.tabBar,
//           display: keyboardVisible ? 'none' : 'flex',
//         },
//         tabBarShowLabel: true,
//         tabBarActiveTintColor: '#c884fc',
//         tabBarInactiveTintColor: '#CDCDCD',
//         tabBarLabelStyle: styles.tabLabel,
//       }}>
//       <Tab.Screen
//         name="TeacherHome"
//         component={TeacherHome}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({focused}) => {
//             const Icon = focused ? HomeClicked : Home;
//             return <Icon width={24} height={24} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="TeacherAddProject"
//         component={TeacherAddProject}
//         options={{
//           tabBarLabel: 'Add Project',
//           tabBarIcon: ({focused}) => {
//             const Icon = focused ? AddProjectClicked : AddProject;
//             return <Icon width={24} height={24} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="TeacherProjects"
//         component={TeacherProjects}
//         options={{
//           tabBarLabel: 'Projects',
//           tabBarIcon: ({focused}) => {
//             const Icon = focused ? ProjectClicked : Project;
//             return <Icon width={24} height={24} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="TeacherProgress"
//         component={DepartmentProgress} // Using your existing component
//         options={{
//           tabBarLabel: 'Progress',
//           tabBarIcon: ({focused}) => {
//             const Icon = focused ? ProgressClicked : Progress;
//             return <Icon width={24} height={24} />;
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     height: 70,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingHorizontal: 10,
//   },
//   tabLabel: {
//     fontSize: 12,
//     marginTop: 0,
//     marginBottom: 5,
//   },
//   placeholder: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//   },
//   placeholderText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#6B7280',
//   },
// });

// export default TeacherTabNavigator;
