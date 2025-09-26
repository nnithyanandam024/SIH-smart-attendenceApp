import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView as SafeAreaContext } from 'react-native-safe-area-context';
// Import your SVG icons here - placeholders marked
import PdfIcon from '../../assets/Subjects/pdf-icon.svg'; // Your PDF icon SVG
import VideoIcon from '../../assets/Subjects/video-icon.svg'; // Your video icon SVG

const ParentMaterial = ({ route, navigation }) => {
  const { grade } = route.params || {};
  
  // Track active tab for each subject and level
  const [activeTabs, setActiveTabs] = useState({});
  
  // Sample data structure - replace with your actual data
  const materialsData = {
    Tamil: [
      {
        id: 'tamil-1',
        level: 'Level 1',
        pdfs: [
          { name: 'Tamil(7)Level3.pdf', uri: '', type: 'pdf' },
          { name: 'Tamil(7)Level3.pdf', uri: '', type: 'pdf' },
          { name: 'Tamil(7)Level3.pdf', uri: '', type: 'pdf' },
        ],
        videos: []
      },
      {
        id: 'tamil-2',
        level: 'Level 2',
        pdfs: [
          { name: 'Tamil(7)Level3.pdf', uri: '', type: 'pdf' },
          { name: 'Tamil(7)Level3.pdf', uri: '', type: 'pdf' },
          { name: 'Tamil(7)Level3.pdf', uri: '', type: 'pdf' },
          { name: 'Tamil(7)Level3.pdf', uri: '', type: 'pdf' },
        ],
        videos: []
      },
      {
        id: 'tamil-3',
        level: 'Level 3',
        pdfs: [
          { name: 'Tamil(7)Level3.pdf', uri: '', type: 'pdf' },
        ],
        videos: []
      }
    ],
    English: [
      // Add English materials here
    ],
    Maths: [
      // Add Maths materials here
    ],
    Science: [
      // Add Science materials here
    ],
    Computer: [
      // Add Computer materials here
    ]
  };

  const subjects = ['Tamil', 'English', 'Maths', 'Science', 'Computer'];
  const [activeSubject, setActiveSubject] = useState('Tamil');

  // Function to change active tab for a specific material
  const changeActiveTab = (materialId, tabName) => {
    setActiveTabs(prev => ({
      ...prev,
      [materialId]: tabName
    }));
  };

  // Initialize default tabs for materials
  React.useEffect(() => {
    const initialTabs = {};
    Object.keys(materialsData).forEach(subject => {
      materialsData[subject].forEach(material => {
        initialTabs[material.id] = 'PDF';
      });
    });
    setActiveTabs(initialTabs);
  }, []);

  const renderSubjectTabs = () => {
    return (
      <View style={styles.subjectTabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectTabsContent}
        >
          {subjects.map((subject, index) => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.subjectTab,
                activeSubject === subject ? styles.subjectTabActive : null
              ]}
              onPress={() => setActiveSubject(subject)}
            >
              <Text style={[
                styles.subjectTabText,
                activeSubject === subject ? styles.subjectTabActiveText : null
              ]}>
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderLevelCircle = (index) => {
    return (
      <View style={styles.levelCircleContainer}>
        <View style={[styles.levelCircle, { backgroundColor: getLevelColor(index) }]}>
          <Text style={styles.levelCircleText}>{index + 1}</Text>
        </View>
        {index < materialsData[activeSubject].length - 1 && (
          <View style={styles.levelConnector} />
        )}
      </View>
    );
  };

  const getLevelColor = (index) => {
    const colors = ['#4CAF50', '#9C27B0', '#666666'];
    return colors[index % colors.length];
  };

  const renderMaterials = () => {
    const currentSubjectData = materialsData[activeSubject] || [];
    
    if (currentSubjectData.length === 0) {
      return (
        <View style={styles.noMaterialsContainer}>
          <Text style={styles.noMaterialsText}>No materials available for {activeSubject}</Text>
        </View>
      );
    }

    return currentSubjectData.map((material, index) => (
      <View key={material.id} style={styles.materialContainer}>
        <View style={styles.materialRow}>
          {renderLevelCircle(index)}
          <View style={styles.materialContent}>
            <Text style={styles.levelTitle}>{material.level}</Text>
            
            {/* Material Tabs */}
            <View style={styles.materialTabs}>
              <TouchableOpacity 
                style={[
                  styles.materialTab,
                  activeTabs[material.id] === 'PDF' ? styles.materialTabActive : null
                ]}
                onPress={() => changeActiveTab(material.id, 'PDF')}
              >
                <Text style={[
                  styles.materialTabText,
                  activeTabs[material.id] === 'PDF' ? styles.materialTabActiveText : null
                ]}>
                  PDF
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.materialTab,
                  activeTabs[material.id] === 'Video' ? styles.materialTabActive : null
                ]}
                onPress={() => changeActiveTab(material.id, 'Video')}
              >
                <Text style={[
                  styles.materialTabText,
                  activeTabs[material.id] === 'Video' ? styles.materialTabActiveText : null
                ]}>
                  Video
                </Text>
              </TouchableOpacity>
            </View>

            {/* File Content */}
            <View style={styles.filesContainer}>
              {activeTabs[material.id] === 'PDF' ? (
                <>
                  {material.pdfs.length > 0 ? (
                    material.pdfs.map((pdf, pdfIndex) => (
                      <View key={pdfIndex} style={styles.fileRow}>
                        <PdfIcon style={styles.fileIcon} />
                        <Text style={styles.fileName}>{pdf.name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noFilesText}>No PDF files available</Text>
                  )}
                </>
              ) : (
                <>
                  {material.videos && material.videos.length > 0 ? (
                    material.videos.map((video, videoIndex) => (
                      <View key={videoIndex} style={styles.fileRow}>
                        <VideoIcon style={styles.fileIcon} />
                        <Text style={styles.fileName}>{video.name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noFilesText}>No video files available</Text>
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>    Materials</Text>
      </View>

      {/* Subject Tabs */}
      {renderSubjectTabs()}

      {/* Materials Content */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {renderMaterials()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
     fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subjectTabsContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  subjectTabsContent: {
    paddingHorizontal: 15,
  },
  subjectTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  subjectTabActive: {
    backgroundColor: '#C884FC',
  },
  subjectTabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  subjectTabActiveText: {
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  materialContainer: {
    marginBottom: 10,
  },
  materialRow: {
    flexDirection: 'row',
  },
  levelCircleContainer: {
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
    width: 30,
  },
  levelCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  levelCircleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  levelConnector: {
    position: 'absolute',
    width: 2,
    height: 60,
    backgroundColor: '#E5E5E5',
    top: 30,
    left: 14,
    zIndex: 1,
  },
  materialContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  materialTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  materialTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  materialTabActive: {
    backgroundColor: '#C884FC',
  },
  materialTabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  materialTabActiveText: {
    color: 'white',
    fontWeight: '600',
  },
  filesContainer: {
    padding: 15,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  fileIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
  },
  noFilesText: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 14,
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  noMaterialsContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noMaterialsText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
};

export default ParentMaterial;