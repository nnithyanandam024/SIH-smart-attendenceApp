// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// // Import normal and clicked icons
// import Home from '../assets/Navbar/house.svg';
// import AddProject from '../assets/Navbar/upload.svg';
// import Project from '../assets/Navbar/file-text.svg';
// import Progress from '../assets/Navbar/graph.svg';

// import HomeClicked from '../assets/Navbar/houseClicked.svg';
// import AddProjectClicked from '../assets/Navbar/uploadClicked.svg';
// import ProjectClicked from '../assets/Navbar/file-textClicked.svg';
// import ProgressClicked from '../assets/Navbar/graphClicked.svg';

// const TeacherNavBar = ({ activeTab }) => {
//   const navigation = useNavigation();

//   const handleTabPress = (tabKey) => {
//     if (activeTab === tabKey) return;
    
//     switch (tabKey) {
//       case 'Home':
//         navigation.replace('TeacherHome');
//         break;
//       case 'AddProject':
//         navigation.replace('TeacherAddProject');
//         break;
//       case 'Projects':
//         navigation.replace('TeacherProjects');
//         break;
//       case 'Progress':
//         navigation.replace('TeacherProgress');
//         break;
//       default:
//         break;
//     }
//   };

//   const tabs = [
//     {
//       key: 'Home',
//       icon: Home,
//       clickedIcon: HomeClicked,
//       label: 'Home',
//     },
//     {
//       key: 'AddProject',
//       icon: AddProject,
//       clickedIcon: AddProjectClicked,
//       label: 'Add Project',
//     },
//     {
//       key: 'Projects',
//       icon: Project,
//       clickedIcon: ProjectClicked,
//       label: 'Projects',
//     },
//     {
//       key: 'Progress',
//       icon: Progress,
//       clickedIcon: ProgressClicked,
//       label: 'Progress',
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       {tabs.map((tab) => {
//         const isActive = activeTab === tab.key;
//         const Icon = isActive ? tab.clickedIcon : tab.icon;

//         return (
//           <TouchableOpacity
//             key={tab.key}
//             style={styles.tabButton}
//             onPress={() => handleTabPress(tab.key)}
//           >
//             <Icon width={24} height={24} />
//             <Text
//               style={[
//                 styles.tabLabel,
//                 isActive && styles.activeTabLabel,
//               ]}
//             >
//               {tab.label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//     paddingHorizontal: 20,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   tabButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   tabLabel: {
//     fontSize: 12,
//     marginTop: 4,
//     color: '#CDCDCD',
//   },
//   activeTabLabel: {
//     color: '#c884fc', // New clicked text color
//   },
// });

// export default TeacherNavBar;