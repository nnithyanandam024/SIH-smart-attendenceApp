// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Home from '../../Assests/house.svg';
// import AddUser from '../../Assests/user-plus.svg';
// import Project from '../../Assests/file-text.svg';
// import Progress from '../../Assests/graph.svg';

// const AdminNavBar = () => {
//   const [activeTab, setActiveTab] = useState('Home');
  
//   const handleTabPress = (tabKey) => {
//     setActiveTab(tabKey);
//   };
  
//   const tabs = [
//     { key: 'Home', icon: Home, label: 'Home' },
//     { key: 'AddUser', icon: AddUser, label: 'Add User' },
//     { key: 'Projects', icon: Project, label: 'Projects' },
//     { key: 'Progress', icon: Progress, label: 'Progress' },
//   ];

//   return (
//     <View style={styles.container}>
//       {tabs.map((tab) => {
//         const isActive = activeTab === tab.key;
//         const Icon = tab.icon;
        
//         return (
//           <TouchableOpacity
//             key={tab.key}
//             style={styles.tabButton}
//             onPress={() => handleTabPress(tab.key)}
//           >
//             <Icon 
//               width={24} 
//               height={24} 
//               fill={isActive ? '#B8C0FF' : '#CDCDCD'} 
//               stroke={isActive ? '#B8C0FF' : '#CDCDCD'}
//             />
//             <Text style={[
//               styles.tabLabel,
//               isActive && styles.activeTabLabel
//             ]}>
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
//     color: '#B8C0FF',
//   },
// });

// export default AdminNavBar;