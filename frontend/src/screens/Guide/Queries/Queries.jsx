import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Dimensions
} from 'react-native';
import SendIcon from '../../../assets/Guide/send.svg';
import styles from './QueriesStyle';

// Component that represents a guide responding to student queries
const Queries = ({ navigation }) => {
  // State for tracking the currently selected project query
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputRef = useRef();
  const scrollViewRef = useRef();
  
  // Mock data for student project queries
  const [projectQueries, setProjectQueries] = useState([
    {
      id: '1',
      projectId: 'EXT-CS-P22',
      projectName: 'E-commerce Platform Development',
      studentName: 'Prakash',
      query: 'hi lala',
      responseStatus: 'pending',
      responses: [], // Now storing multiple responses in an array
      timestamp: '12:30 PM'
    },
    {
      id: '2',
      projectId: 'EXT-CS-P22',
      projectName: 'E-commerce Platform Development',
      studentName: 'Prakash',
      query: 'hi',
      responseStatus: 'pending',
      responses: [],
      timestamp: '12:35 PM'
    },
    {
      id: '3',
      projectId: 'MOB-APP-P15',
      projectName: 'Mobile Banking App',
      studentName: 'Anika',
      query: 'How to implement secure authentication for the banking app?',
      responseStatus: 'pending',
      responses: [],
      timestamp: '11:45 AM'
    },
    {
      id: '4',
      projectId: 'DATA-VIZ-P08',
      projectName: 'Data Visualization Dashboard',
      studentName: 'Raj',
      query: 'Which chart library would be best for showing real-time analytics?',
      responseStatus: 'pending',
      responses: [],
      timestamp: '10:20 AM'
    },
    {
      id: '5',
      projectId: 'AI-ML-P03',
      projectName: 'Machine Learning Model Development',
      studentName: 'Priya',
      query: 'Im having issues with model overfitting. Any suggestions?',
      responseStatus: 'responded',
      responses: ['Try implementing regularization techniques like L1/L2 or dropout. Also, consider if you have enough training data or if data augmentation might help.'],
      timestamp: '09:15 AM'
    }
  ]);

  // Add keyboard event listeners
  useEffect(() => {
    const keyboardShowListener = Platform.OS === 'ios' 
      ? Keyboard.addListener('keyboardWillShow', handleKeyboardShow)
      : Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
      
    const keyboardHideListener = Platform.OS === 'ios'
      ? Keyboard.addListener('keyboardWillHide', handleKeyboardHide)
      : Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const handleKeyboardShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    setKeyboardHeight(keyboardHeight);
    setKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardHeight(0);
    setKeyboardVisible(false);
  };

  // Function to handle sending a response to a student query
  const sendResponse = () => {
    if (responseText.trim() && selectedQuery) {
      // Get current time for timestamp
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const timestamp = `${formattedHours}:${formattedMinutes} ${ampm}`;
      
      // Update the responses in the queries list
      const updatedQueries = projectQueries.map(query => {
        if (query.id === selectedQuery.id) {
          // Add new response to the responses array
          const updatedResponses = [...query.responses, {
            text: responseText,
            timestamp: timestamp
          }];
          
          return {
            ...query,
            responseStatus: 'responded',
            responses: updatedResponses
          };
        }
        return query;
      });
      
      setProjectQueries(updatedQueries);
      setResponseText('');
      
      // Update the selected query reference to include the new response
      const updatedQuery = updatedQueries.find(q => q.id === selectedQuery.id);
      setSelectedQuery(updatedQuery);
      
      // Scroll to bottom of the conversation
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  };

  // Render an individual query item in the list
  const renderQueryItem = ({ item }) => {
    const isSelected = selectedQuery && selectedQuery.id === item.id;
    
    return (
      <TouchableOpacity 
        style={[styles.queryItem, isSelected && styles.selectedQueryItem]}
        onPress={() => setSelectedQuery(item)}
      >
        <View style={styles.queryHeader}>
          <View style={styles.queryProject}>
            <Text style={styles.projectIdBadge}>{item.projectId}</Text>
            <Text style={styles.projectNameText} numberOfLines={1}>{item.projectName}</Text>
          </View>
          <Text style={styles.queryTimestamp}>{item.timestamp}</Text>
        </View>
        
        <Text style={styles.studentName}>{item.studentName} asked:</Text>
        <Text style={styles.queryText} numberOfLines={2}>{item.query}</Text>
        
        <View style={styles.queryStatus}>
          <View style={[
            styles.statusIndicator, 
            item.responseStatus === 'responded' ? styles.respondedIndicator : styles.pendingIndicator
          ]} />
          <Text style={[
            styles.statusText,
            item.responseStatus === 'responded' ? styles.respondedText : styles.pendingText
          ]}>
            {item.responseStatus === 'responded' ? `Responded (${item.responses.length})` : 'Pending'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render the query detail view when a query is selected
  const renderQueryDetail = () => {
    if (!selectedQuery) {
      return (
        <View style={styles.emptyDetailContainer}>
          <Text style={styles.emptyDetailText}>Select a query to respond</Text>
        </View>
      );
    }

    return (
      <View style={styles.queryDetailContainer}>
        <View style={styles.queryDetailHeader}>
          <View>
            <Text style={styles.detailProjectName}>{selectedQuery.projectName}</Text>
            <Text style={styles.detailProjectId}>Project ID: {selectedQuery.projectId}</Text>
          </View>
          {/* <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedQuery(null)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity> */}
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.queryDetailContent}
          contentContainerStyle={styles.queryDetailContentContainer}
        >
          <View style={styles.studentQueryContainer}>
            <Text style={styles.studentLabel}>{selectedQuery.studentName} asked:</Text>
            <View style={styles.studentQueryBubble}>
              <Text style={styles.studentQueryText}>{selectedQuery.query}</Text>
              <Text style={styles.queryDetailTimestamp}>{selectedQuery.timestamp}</Text>
            </View>
          </View>

          {selectedQuery.responses.length > 0 && (
            <View style={styles.allResponsesContainer}>
              {selectedQuery.responses.map((response, index) => (
                <View key={index} style={styles.guideResponseContainer}>
                  <Text style={styles.guideLabel}>Your response:</Text>
                  <View style={styles.guideResponseBubble}>
                    <Text style={styles.guideResponseText}>
                      {typeof response === 'string' ? response : response.text}
                    </Text>
                    {typeof response !== 'string' && response.timestamp && (
                      <Text style={styles.responseTimestamp}>{response.timestamp}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Always show the response input */}
        <View style={styles.responseInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.responseInput}
            placeholder="Type your response..."
            placeholderTextColor="#8e8e93"
            value={responseText}
            onChangeText={setResponseText}
            multiline
          />
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              { backgroundColor: responseText.trim() ? '#C884FC' : '#C884FC' }
            ]}
            onPress={sendResponse}
            disabled={responseText.trim() === ''}
          >
            <SendIcon width={20} height={20} fill={responseText.trim() ? "#ffffff" : "#8e8e93"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Queries</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.queriesList}>
          <FlatList
            data={projectQueries}
            renderItem={renderQueryItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.querySeparator} />}
            contentContainerStyle={styles.queryListContent}
          />
        </View>
        
        <View style={styles.queryDetail}>
          {renderQueryDetail()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Queries;