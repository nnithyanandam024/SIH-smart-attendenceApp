import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Alert,
  Linking,
  Animated,
} from 'react-native';

// Import your SVG icons here
import BackArrow from '../../../assets/Student/back-arrow.svg';
import ChevronLeft from '../../../assets/Student/chevron-left.svg';
import ChevronRight from '../../../assets/Student/chevron-right.svg';

const StatBox = ({ title, value, bgColor, isLarge = false }) => {
  return (
    <View style={[
      isLarge ? styles.largeStatBox : styles.statBox, 
      { backgroundColor: bgColor }
    ]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, isLarge && styles.largeStatValue]}>{value}</Text>
    </View>
  );
};

const ProfileCard = ({ studentData }) => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarContainer}>
        {studentData.avatar ? (
          <Image source={{ uri: studentData.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Profile</Text>
          </View>
        )}
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>NAME: </Text>
          <Text style={styles.profileValue}>{studentData.name}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>REG.NO: </Text>
          <Text style={styles.profileValueSecondary}>{studentData.regNo}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>DEPARTMENT: </Text>
          <Text style={styles.profileValueSecondary}>{studentData.department}</Text>
        </View>
      </View>
    </View>
  );
};

const VRMeetupCard = ({ onJoinMeeting }) => {
  return (
    <View style={styles.vrCard}>
      <View style={styles.vrHeader}>
        <View style={styles.vrIconContainer}>
          <Text style={styles.vrIcon}>VR</Text>
        </View>
        <View style={styles.vrInfo}>
          <Text style={styles.vrTitle}>VR Meetup</Text>
          <Text style={styles.vrSubtitle}>Immersive Learning Experience</Text>
        </View>
        <View style={styles.vrStatus}>
          <Text style={styles.vrStatusText}>LIVE</Text>
        </View>
      </View>
      
      <View style={styles.vrContent}>
        <Text style={styles.vrMeetingTitle}>Advanced React Concepts</Text>
        <Text style={styles.vrMeetingTime}>2:30 PM - 3:30 PM</Text>
        <Text style={styles.vrParticipants}>12 participants joined</Text>
      </View>
      
      <TouchableOpacity style={styles.joinMeetingButton} onPress={onJoinMeeting}>
        <Text style={styles.joinMeetingText}>Join Meeting</Text>
      </TouchableOpacity>
    </View>
  );
};

const TimeTable = ({ scheduleData, onFreePeriodPress }) => {
  const renderScheduleItem = (item) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.scheduleItem}
      onPress={() => item.subject === 'Free Period' ? onFreePeriodPress() : null}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.scheduleContent}>
        <View style={[styles.subjectBar, { backgroundColor: item.color }]} />
        <View style={[styles.scheduleDetails, { backgroundColor: item.bgColor }]}>
          <View style={styles.scheduleHeader}>
            <Text style={styles.subjectText}>{item.subject}</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>⋮</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.gradeText}>{item.grade}</Text>
          <Text style={[styles.typeText, { color: item.color }]}>{item.type}</Text>
          {item.duration && <Text style={styles.durationText}>{item.duration}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.scheduleSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Time Table</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.dateNavButton}>
            <Text style={styles.dateNavText}>‹</Text>
          </TouchableOpacity>
          <View style={styles.dateInfo}>
            <Text style={styles.dayText}>Monday</Text>
            <Text style={styles.dateText}>25/12/24</Text>
          </View>
          <TouchableOpacity style={styles.dateNavButton}>
            <Text style={styles.dateNavText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scheduleContainer}>
        {scheduleData.map(renderScheduleItem)}
      </View>
    </View>
  );
};

const LearningAnalytics = ({ visible, onClose, onOptionSelect, onStartRecommendation }) => {
  const analyticsData = {
    quiz: { attended: 10, completed: 5 },
    projects: { completed: 15, streaks: 20 }
  };

  const recommendations = [
    { 
      id: 1,
      task: "Intro to AI", 
      date: "25/12/25", 
      status: "Easy", 
      color: "#6ace6dff",
      description: "Learn the basics of Artificial Intelligence"
    },
    { 
      id: 2,
      task: "Operations Research", 
      date: "26/12/25", 
      status: "Medium", 
      color: "#FF9800",
      description: "Advanced mathematical optimization techniques"
    },
    { 
      id: 3,
      task: "Data Structures", 
      date: "27/12/25", 
      status: "Hard", 
      color: "#F44336",
      description: "Complex algorithms and data structures"
    }
  ];

  const options = [
    { id: 'quizes', title: 'Quizes', color: '#E1BEE7', icon: 'Q' },
    { id: 'coding', title: 'Coding Platforms', color: '#CE93D8', icon: 'C' },
    { id: 'learning', title: 'Learning Platforms', color: '#BA68C8', icon: 'L' },
    { id: 'todo', title: 'To-do List', color: '#AB47BC', icon: 'T' }
  ];

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learning Analytics</Text>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <BackArrow width={24} height={24} />          
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <View style={styles.topStatsRow}>
              <StatBox 
                title="Quiz Attended" 
                value="10" 
                bgColor="#E1BEE7" 
                isLarge={true}
              />
              <StatBox 
                title="Challenges Completed" 
                value="5" 
                bgColor="#E1BEE7" 
                isLarge={true}
              />
            </View>
            
            <View style={styles.bottomStatsRow}>
              <StatBox 
                title="Projects Completed" 
                value="15" 
                bgColor="#E1BEE7" 
              />  
              <StatBox 
                title="Streaks Reward" 
                value="20" 
                bgColor="#E1BEE7" 
              />
            </View>
          </View>

          <View style={styles.recommendationsSection}>
            <Text style={styles.sectionTitle}>AI - Powered Recommendations</Text>
            {recommendations.map((item) => (
              <View key={item.id} style={styles.recommendationItem}>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTask}>Task: {item.task}</Text>
                  <Text style={styles.recommendationDescription}>{item.description}</Text>
                  <Text style={styles.recommendationDate}>Date: {item.date}</Text>
                </View>
                <View style={styles.recommendationActions}>
                  <View style={[styles.statusBadge, { backgroundColor: item.color }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.startButton}
                    onPress={() => onStartRecommendation(item)}
                  >
                    <Text style={styles.startButtonText}>  Start  </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity 
                key={option.id}
                style={[styles.optionButton, { backgroundColor: option.color }]}
                onPress={() => onOptionSelect(option.id)}
              >
                <Text style={styles.optionIcon}>{option.icon}</Text>
                <Text style={styles.optionText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const QuizModal = ({ visible, onClose }) => {
  const quizzes = [
    { id: 1, title: "React Fundamentals", questions: 10, duration: "30 min", difficulty: "Easy", icon: "R" },
    { id: 2, title: "JavaScript Basics", questions: 15, duration: "45 min", difficulty: "Medium", icon: "JS" },
    { id: 3, title: "CSS Styling", questions: 8, duration: "20 min", difficulty: "Easy", icon: "CSS" }
  ];

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Available Quizzes</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalContent}>
          {quizzes.map((quiz) => (
            <TouchableOpacity key={quiz.id} style={styles.quizItem}>
              <View style={styles.quizHeader}>
                <Text style={styles.quizIcon}>{quiz.icon}</Text>
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  <Text style={styles.quizDetails}>{quiz.questions} questions • {quiz.duration}</Text>
                  <Text style={styles.quizDifficulty}>Difficulty: {quiz.difficulty}</Text>
                </View>
                <TouchableOpacity style={styles.quizStartButton}>
                  <Text style={styles.quizStartText}>Start</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const CodingPlatformsModal = ({ visible, onClose }) => {
  const platforms = [
    { name: "LeetCode", url: "https://leetcode.com", color: "#FFA116", icon: "LC" },
    { name: "HackerRank", url: "https://hackerrank.com", color: "#2EC866", icon: "HR" },
    { name: "CodeChef", url: "https://codechef.com", color: "#5B4638", icon: "CC" },
    { name: "Codeforces", url: "https://codeforces.com", color: "#1F8ACB", icon: "CF" }
  ];

  const handlePlatformPress = (url) => {
    Linking.openURL(url);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Coding Platforms</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalContent}>
          {platforms.map((platform, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.platformItem, { borderLeftColor: platform.color }]}
              onPress={() => handlePlatformPress(platform.url)}
            >
              <Text style={styles.platformIcon}>{platform.icon}</Text>
              <View style={styles.platformContent}>
                <Text style={styles.platformName}>{platform.name}</Text>
                <Text style={styles.platformUrl}>{platform.url}</Text>
              </View>
              <TouchableOpacity style={[styles.platformButton, { backgroundColor: platform.color }]}>
                <Text style={styles.platformButtonText}>Open</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const LearningPlatformsModal = ({ visible, onClose }) => {
  const platforms = [
    { name: "SWAYAM", url: "https://swayam.gov.in", color: "#FF6B35", icon: "SW" },
    { name: "Coursera", url: "https://coursera.org", color: "#0056D3", icon: "CR" },
    { name: "edX", url: "https://edx.org", color: "#02262B", icon: "edX" },
    { name: "Udemy", url: "https://udemy.com", color: "#A435F0", icon: "UD" }
  ];

  const handlePlatformPress = (url) => {
    Linking.openURL(url);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Learning Platforms</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.modalContent}>
          {platforms.map((platform, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.platformItem, { borderLeftColor: platform.color }]}
              onPress={() => handlePlatformPress(platform.url)}
            >
              <Text style={styles.platformIcon}>{platform.icon}</Text>
              <View style={styles.platformContent}>
                <Text style={styles.platformName}>{platform.name}</Text>
                <Text style={styles.platformUrl}>{platform.url}</Text>
              </View>
              <TouchableOpacity style={[styles.platformButton, { backgroundColor: platform.color }]}>
                <Text style={styles.platformButtonText}>Explore</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const TodoListModal = ({ visible, onClose }) => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete React Assignment", completed: false, priority: "high" },
    { id: 2, text: "Study for Math Quiz", completed: true, priority: "medium" },
    { id: 3, text: "Submit Project Report", completed: false, priority: "high" },
    { id: 4, text: "Read Chapter 5 - Data Structures", completed: false, priority: "low" }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: newTodo.trim(), 
        completed: false,
        priority: selectedPriority
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
          setTodos(todos.filter(todo => todo.id !== id));
        }}
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#9C27B0';
    }
  };

  const getPriorityText = (priority) => {
    switch(priority) {
      case 'high': return 'HIGH';
      case 'medium': return 'MED';
      case 'low': return 'LOW';
      default: return 'NORMAL';
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>To-Do List</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.todoInputSection}>
          <View style={styles.todoInputContainer}>
            <TextInput
              style={styles.todoInput}
              value={newTodo}
              onChangeText={setNewTodo}
              placeholder="Add new task..."
              placeholderTextColor="#999"
              multiline
            />
            <TouchableOpacity style={styles.addButton} onPress={addTodo}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.prioritySelector}>
            <Text style={styles.priorityLabel}>Priority:</Text>
            {['high', 'medium', 'low'].map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.priorityButton,
                  { backgroundColor: selectedPriority === priority ? getPriorityColor(priority) : '#F5F5F5' }
                ]}
                onPress={() => setSelectedPriority(priority)}
              >
                <Text style={[
                  styles.priorityButtonText,
                  { color: selectedPriority === priority ? '#FFF' : '#333' }
                ]}>
                  {getPriorityText(priority)} {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.todoStats}>
            <Text style={styles.todoStatsText}>
              Total: {todos.length} | Completed: {todos.filter(t => t.completed).length} | 
              Pending: {todos.filter(t => !t.completed).length}
            </Text>
          </View>
          
          {todos.map((todo) => (
            <View key={todo.id} style={[
              styles.todoItem,
              { borderLeftColor: getPriorityColor(todo.priority), borderLeftWidth: 4 }
            ]}>
              <TouchableOpacity 
                style={[styles.checkbox, todo.completed && styles.checkboxCompleted]}
                onPress={() => toggleTodo(todo.id)}
              >
                {todo.completed && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              
              <View style={styles.todoContent}>
                <Text style={[
                  styles.todoText, 
                  todo.completed && styles.todoTextCompleted
                ]}>
                  {todo.text}
                </Text>
                <Text style={styles.todoPriority}>
                  {getPriorityText(todo.priority)} PRIORITY
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteTodo(todo.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          {todos.length === 0 && (
            <View style={styles.emptyTodoContainer}>
              <Text style={styles.emptyTodoText}>No Tasks</Text>
              <Text style={styles.emptyTodoMessage}>No tasks yet! Add one above.</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const ChatbotModal = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI learning assistant. How can I help you today?", isBot: true, time: "12:30 PM" },
    { id: 2, text: "Good Morning!", isBot: false, time: "12:31 PM" },
    { id: 3, text: "Great! I can help you with:\n• Study recommendations\n• Assignment guidance\n• Learning resources\n• Academic planning\n\nWhat would you like to explore?", isBot: true, time: "12:31 PM" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputText.trim(),
        isBot: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');
      setIsTyping(true);
      
      // Simulate bot response with more realistic responses
      setTimeout(() => {
        const responses = [
          "That's a great question! Let me help you with that.",
          "I understand your query. Based on your learning pattern, I recommend...",
          "Excellent! Here are some resources that might help you:",
          "Let me analyze your academic progress and suggest the best approach.",
          "Great choice! This aligns perfectly with your learning goals."
        ];
        
        const botResponse = {
          id: Date.now() + 1,
          text: responses[Math.floor(Math.random() * responses.length)],
          isBot: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setIsTyping(false);
        setMessages(prev => [...prev, botResponse]);
      }, 2000);
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.chatContainer}>
        <View style={styles.chatHeader}>
          <View style={styles.chatHeaderLeft}>
            <View>
              <Text style={styles.chatTitle}>AI Learning Assistant</Text>
              <Text style={styles.chatSubtitle}>Online • Ready to help</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {messages.map((message) => (
            <View 
              key={message.id} 
              style={[
                styles.messageRow,
                message.isBot ? styles.botMessageRow : styles.userMessageRow
              ]}
            >
              <View style={[
                styles.messageBubble,
                message.isBot ? styles.botMessage : styles.userMessage
              ]}>
                <Text style={[
                  styles.messageText,
                  message.isBot ? styles.botMessageText : styles.userMessageText
                ]}>
                  {message.text}
                </Text>
              </View>
              <Text style={styles.messageTime}>{message.time}</Text>
            </View>
          ))}
          
          {isTyping && (
            <View style={styles.typingIndicator}>
              <Text style={styles.typingText}>AI is typing...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything about your studies..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendIcon}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const FloatingChatButton = ({ onPress }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.floatingButton, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        style={styles.floatingButtonTouchable}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Text style={styles.floatingButtonText}>AI</Text>
        <View style={styles.floatingButtonBadge}>
          <Text style={styles.floatingButtonBadgeText}>Chat</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SurveyCard = ({ onStartSurvey }) => {
  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#8B5CF6',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 6,
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#8B5CF6' }}>
        📋 Course Feedback Survey
      </Text>
      <Text style={{ fontSize: 14, color: '#666', marginVertical: 10 }}>
        Share your feedback to help us improve learning quality.
      </Text>
      <TouchableOpacity 
        style={{
          backgroundColor: '#8B5CF6',
          padding: 12,
          borderRadius: 12,
          alignItems: 'center'
        }}
        onPress={onStartSurvey}
      >
        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Start Survey</Text>
      </TouchableOpacity>
    </View>
  );
};


const StudentHome = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [showLearningAnalytics, setShowLearningAnalytics] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCodingPlatforms, setShowCodingPlatforms] = useState(false);
  const [showLearningPlatforms, setShowLearningPlatforms] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  

  const [studentData, setStudentData] = useState({
    name: 'GOVINDSAMY C R',
    regNo: '2024UAD8567',
    department: 'CSE',
    avatar: null
  });

  const [stats, setStats] = useState({
    attendancePercentage: '86%',
    activeClasses: '8',
    leave: '5',
    onDuty: '8'
  });

 

  const [scheduleData, setScheduleData] = useState([
    {
      id: 1,
      time: '09:30 AM',
      subject: 'Mathematics',
      grade: 'Grade VI - A',
      type: 'Academic',
      duration: '80 min',
      color: '#FF9800',
      bgColor: '#FFF8E1'
    },
    {
      id: 2,
      time: '10:30 AM',
      subject: 'Mathematics',
      grade: 'Grade VI - A', 
      type: 'Academic',
      duration: '',
      color: '#FF9800',
      bgColor: '#FFF8E1'
    },
    {
      id: 3,
      time: '11:30 AM',
      subject: 'Free Period',
      grade: 'Grade VI - A',
      type: 'Free',
      duration: '60min',
      color: '#9C27B0',
      bgColor: '#F3E5F5'
    }
  ]);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching student data:', error);
      setLoading(false);
    }
  };

  const handleFreePeriodPress = () => {
    setShowLearningAnalytics(true);
  };

  const handleJoinMeeting = () => {
    Alert.alert(
      "Join VR Meeting",
      "Launching VR Meeting for Advanced React Concepts...",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Join Now", onPress: () => {
          // Here you would typically open a VR meeting app or web URL
          Alert.alert("Success", "VR Meeting launched!");
        }}
      ]
    );
  };



  const SurveyModal = ({ visible, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [generalComments, setGeneralComments] = useState('');
  
  const surveyQuestions = [
    {
      id: 1,
      question: "How clear and understandable do you find the faculty's teaching methods?",
      type: "radio",
      options: [
        "Needs significant improvement",
        "Somewhat effective, but lacks engagement", 
        "Clear, but can be improved",
        "Effective and clear",
        "Excellent and highly beneficial"
      ]
    },
    {
      id: 2,
      question: "How clear and understandable are the materials provided by the faculty?",
      type: "radio",
      options: [
        "Needs significant improvement",
        "Somewhat effective, but lacks engagement",
        "Clear, but can be improved", 
        "Effective and clear",
        "Excellent and highly beneficial"
      ]
    },
    {
      id: 3,
      question: "How effectively is time allocated and managed in all activities?",
      type: "radio",
      options: [
        "Needs significant improvement",
        "Somewhat effective, but lacks engagement",
        "Clear, but can be improved",
        "Effective and clear", 
        "Excellent and highly beneficial"
      ]
    },
    {
      id: 4,
      question: "How satisfied are you with this course overall?",
      type: "radio",
      options: [
        "Needs significant improvement",
        "Somewhat effective, but lacks engagement",
        "Clear, but can be improved",
        "Effective and clear",
        "Excellent and highly beneficial"
      ]
    }
  ];

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(surveyQuestions.length);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCompleteSurvey = () => {
    Alert.alert(
      "Survey Completed!",
      "Thank you for your valuable feedback. Your responses have been recorded and will help improve the course quality.",
      [
        {
          text: "OK",
          onPress: () => {
            setCurrentQuestion(0);
            setAnswers({});
            setGeneralComments('');
            onClose();
          }
        }
      ]
    );
  };

  const isCurrentQuestionAnswered = () => {
    if (currentQuestion < surveyQuestions.length) {
      return answers[surveyQuestions[currentQuestion].id] !== undefined;
    }
    return true;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / (surveyQuestions.length + 1)) * 100;
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
       <SafeAreaView style={styles.surveyContainer}>
        <View style={styles.surveyModalHeader}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <BackArrow width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.surveyModalTitle}>Course Feedback Survey</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={[
              styles.progressFill, 
              { width: `${getProgressPercentage()}%` }
            ]} />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} of {surveyQuestions.length + 1}
          </Text>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {currentQuestion < surveyQuestions.length ? (
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {surveyQuestions[currentQuestion].question}
              </Text>
              
              <View style={styles.optionsContainer}>
                {surveyQuestions[currentQuestion].options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionItem,
                      answers[surveyQuestions[currentQuestion].id] === option && styles.selectedOption
                    ]}
                    onPress={() => handleAnswerSelect(surveyQuestions[currentQuestion].id, option)}
                  >
                    <View style={[
                      styles.radioButton,
                      answers[surveyQuestions[currentQuestion].id] === option && styles.selectedRadio
                    ]}>
                      {answers[surveyQuestions[currentQuestion].id] === option && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <Text style={[
                      styles.optionText,
                      answers[surveyQuestions[currentQuestion].id] === option && styles.selectedOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.commentsContainer}>
              <Text style={styles.commentsTitle}>General Comments (Optional)</Text>
              <Text style={styles.commentsSubtitle}>
                Please share any additional feedback or suggestions you have about the course.
              </Text>
              
              <TextInput
                style={styles.commentsInput}
                value={generalComments}
                onChangeText={setGeneralComments}
                placeholder="Enter your comments here..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                maxLength={500}
              />
              
              <Text style={styles.characterCount}>
                {generalComments.length}/500 characters
              </Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.navigationContainer}>
          {currentQuestion > 0 && (
            <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.navButtonSpacer} />
          
          {currentQuestion < surveyQuestions.length ? (
            <TouchableOpacity 
              style={[
                styles.navButton, 
                styles.nextButton,
                !isCurrentQuestionAnswered() && styles.disabledButton
              ]} 
              onPress={handleNext}
              disabled={!isCurrentQuestionAnswered()}
            >
              <Text style={[
                styles.navButtonText, 
                styles.nextButtonText,
                !isCurrentQuestionAnswered() && styles.disabledButtonText
              ]}>
                Next
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.navButton, styles.completeButton]} 
              onPress={handleCompleteSurvey}
            >
              <Text style={[styles.navButtonText, styles.completeButtonText]}>
                Complete Survey
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

  const handleStartRecommendation = (recommendation) => {
    Alert.alert(
      "Start Learning",
      `Ready to start: ${recommendation.task}?\n\n${recommendation.description}`,
      [
        { text: "Later", style: "cancel" },
        { text: "Start Now", onPress: () => {
          Alert.alert("Great!", `Starting ${recommendation.task} now!`);
        }}
      ]
    );
  };

  const handleOptionSelect = (optionId) => {
    setShowLearningAnalytics(false);
    
    switch(optionId) {
      case 'quizes':
        setShowQuiz(true);
        break;
      case 'coding':
        setShowCodingPlatforms(true);
        break;
      case 'learning':
        setShowLearningPlatforms(true);
        break;
      case 'todo':
        setShowTodoList(true);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student DashBoard</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackArrow width={24} height={24} /> 
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileCard 
          studentData={studentData} 
        />
        
        <View style={styles.statsContainer}>
          <View style={styles.topStatsRow}>
            <StatBox 
              title="Attendance Percentage" 
              value={stats.attendancePercentage} 
              bgColor="#E1BEE7" 
              isLarge={true}
            />
            <StatBox 
              title="Active Classes" 
              value={stats.activeClasses} 
              bgColor="#E1BEE7" 
              isLarge={true}
            />
          </View>
          
          <View style={styles.bottomStatsRow}>
            <StatBox 
              title="Leave" 
              value={stats.leave} 
              bgColor="#E1BEE7" 
            />  
            <StatBox 
              title="On - Duty" 
              value={stats.onDuty} 
              bgColor="#E1BEE7" 
            />
          </View>
        </View>

        <SurveyCard onStartSurvey={() => setShowSurvey(true)} />

        <VRMeetupCard onJoinMeeting={handleJoinMeeting} />

        <TimeTable 
          scheduleData={scheduleData}
          onFreePeriodPress={handleFreePeriodPress}
        />

   
        
        <View style={styles.bottomSpacing} />

      </ScrollView>

      {/* Floating AI Chat Button */}
      <FloatingChatButton onPress={() => setShowChatbot(true)} />

      {/* Modals */}
      <LearningAnalytics 
        visible={showLearningAnalytics}
        onClose={() => setShowLearningAnalytics(false)}
        onOptionSelect={handleOptionSelect}
        onStartRecommendation={handleStartRecommendation}
      />

      <ChatbotModal 
        visible={showChatbot}
        onClose={() => setShowChatbot(false)}
      />

      <QuizModal 
        visible={showQuiz}
        onClose={() => setShowQuiz(false)}
      />

      <CodingPlatformsModal 
        visible={showCodingPlatforms}
        onClose={() => setShowCodingPlatforms(false)}
      />

      <LearningPlatformsModal 
        visible={showLearningPlatforms}
        onClose={() => setShowLearningPlatforms(false)}
      />

      <TodoListModal 
        visible={showTodoList}
        onClose={() => setShowTodoList(false)}
      />
      <SurveyModal 
  visible={showSurvey}
  onClose={() => setShowSurvey(false)}
/>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  
  // Profile Card Styles
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#8B5CF6',
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E1BEE7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#8B5CF6',
  },
  avatarText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  profileLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  profileValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  profileValueSecondary: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
    fontWeight: '500',
  },
  
  // VR Meetup Card Styles
  vrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  vrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vrIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  vrIcon: {
    fontSize: 14,
    color: '#00838F',
    fontWeight: 'bold',
  },
  vrInfo: {
    flex: 1,
  },
  vrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00838F',
    marginBottom: 2,
  },
  vrSubtitle: {
    fontSize: 12,
    color: '#00ACC1',
    fontWeight: '500',
  },
  vrStatus: {
    backgroundColor: '#F44336',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vrStatusText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  vrContent: {
    marginBottom: 16,
  },
  vrMeetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  vrMeetingTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  vrParticipants: {
    fontSize: 14,
    color: '#00ACC1',
    fontWeight: '500',
  },
  joinMeetingButton: {
    backgroundColor: '#00BCD4',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#00BCD4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  joinMeetingText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Stats Styles
  statsContainer: {
    marginBottom: 24,
  },
  topStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bottomStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#040404ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    minHeight: 90,
    justifyContent: 'center',
  },
  largeStatBox: {
    width: '48%',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    minHeight: 110,
    justifyContent: 'center',
  },
  statTitle: {
    fontSize: 12,
    marginBottom: 10,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  largeStatValue: {
    fontSize: 40,
  },
  
  // Schedule Section Styles
  scheduleSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  // Date Navigation Styles
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 8,
  },
  dateNavButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  dateNavText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  dateInfo: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  dateText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    fontWeight: '500',
  },
  
  // Schedule Items Styles
  scheduleContainer: {
    flex: 1,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 8,
  },
  timeContainer: {
    width: 80,
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingLeft: 8,
  },
  timeText: {
    fontSize: 13,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  scheduleContent: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
  },
  subjectBar: {
    width: 5,
    borderRadius: 3,
    marginRight: 12,
  },
  scheduleDetails: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  subjectText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  moreButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  moreButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  gradeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  durationText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  
  // Floating Chat Button Styles
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  floatingButtonTouchable: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  floatingButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
  floatingButtonBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  floatingButtonBadgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  
  // Loading and spacing styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 100,
  },

  // Learning Analytics Styles
  recommendationsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  recommendationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  recommendationContent: {
    flex: 1,
    paddingRight: 12,
  },
  recommendationTask: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  recommendationDate: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  recommendationActions: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    width: '48%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  optionIcon: {
    fontSize: 18,
    marginBottom: 8,
    color: '#FFF',
    fontWeight: 'bold',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    lineHeight: 30,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  closeText: {
    fontSize: 22,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // Quiz Modal Styles
  quizItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizIcon: {
    fontSize: 16,
    marginRight: 16,
    backgroundColor: '#8B5CF6',
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  quizDetails: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  quizDifficulty: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  quizStartButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  quizStartText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Platform Modal Styles
  platformItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformIcon: {
    fontSize: 14,
    marginRight: 16,
    backgroundColor: '#E0E0E0',
    color: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  platformContent: {
    flex: 1,
  },
  platformName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  platformUrl: {
    fontSize: 13,
    color: '#666',
  },
  platformButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  platformButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  // Todo Modal Styles
  todoInputSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  todoInputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  todoInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginRight: 12,
    backgroundColor: '#FAFAFA',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  prioritySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 12,
  },
  priorityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  priorityButtonText: {
    fontSize: 11,
    fontWeight: '600',
  },
  todoStats: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  todoStatsText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#9C27B0',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxCompleted: {
    backgroundColor: '#9C27B0',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
    marginBottom: 4,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  todoPriority: {
    fontSize: 10,
    fontWeight: '600',
    opacity: 0.8,
  },
  deleteButton: {
    padding: 8,
    marginTop: -4,
  },
  deleteButtonText: {
    fontSize: 18,
    color: '#F44336',
    fontWeight: 'bold',
  },
  emptyTodoContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTodoText: {
    fontSize: 24,
    marginBottom: 16,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  emptyTodoMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Chatbot Modal Styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 2,
  },
  chatSubtitle: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageRow: {
    marginBottom: 16,
  },
  botMessageRow: {
    alignItems: 'flex-start',
  },
  userMessageRow: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '85%',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botMessage: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
  },
  userMessage: {
    backgroundColor: '#8B5CF6',
    borderBottomRightRadius: 6,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  botMessageText: {
    color: '#000',
  },
  userMessageText: {
    color: '#FFF',
  },
  messageTime: {
    fontSize: 10,
    color: '#999',
    marginHorizontal: 12,
    fontWeight: '500',
  },
  typingIndicator: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  typingText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontStyle: 'italic',
    backgroundColor: '#E1BEE7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  chatInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    marginRight: 12,
    maxHeight: 120,
    backgroundColor: '#FAFAFA',
  },
  sendButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendIcon: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
  // Survey Modal Styles
surveyContainer: {
  flex: 1,
  backgroundColor: '#F3E5F5',
},
surveyModalHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  paddingVertical: 16,
  backgroundColor: '#FFFFFF',
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  elevation: 6,
  shadowColor: '#8B5CF6',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
},
surveyModalTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#8B5CF6',
  textAlign: 'center',
  flex: 1,
},
placeholder: {
  width: 32,
},
progressContainer: {
  paddingHorizontal: 20,
  paddingVertical: 16,
  backgroundColor: '#FFFFFF',
},
progressBackground: {
  height: 6,
  backgroundColor: '#E0E0E0',
  borderRadius: 3,
  marginBottom: 8,
},
progressFill: {
  height: '100%',
  backgroundColor: '#8B5CF6',
  borderRadius: 3,
},
progressText: {
  fontSize: 12,
  color: '#666',
  textAlign: 'center',
  fontWeight: '500',
},
questionContainer: {
  flex: 1,
},
questionText: {
  fontSize: 18,
  fontWeight: '600',
  color: '#000',
  marginBottom: 30,
  lineHeight: 26,
},
optionItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 20,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  borderWidth: 2,
  borderColor: 'transparent',
},
selectedOption: {
  borderColor: '#8B5CF6',
  backgroundColor: '#F3E5F5',
  shadowColor: '#8B5CF6',
  shadowOpacity: 0.3,
},
radioButton: {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#CCC',
  marginRight: 16,
  justifyContent: 'center',
  alignItems: 'center',
},
selectedRadio: {
  borderColor: '#8B5CF6',
  backgroundColor: '#8B5CF6',
},
radioInner: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#FFF',
},
optionText: {
  fontSize: 14,
  color: '#333',
  flex: 1,
  lineHeight: 20,
},
selectedOptionText: {
  color: '#8B5CF6',
  fontWeight: '600',
},
commentsContainer: {
  flex: 1,
},
commentsTitle: {
  fontSize: 20,
  fontWeight: '600',
  color: '#000',
  marginBottom: 8,
},
commentsSubtitle: {
  fontSize: 14,
  color: '#666',
  marginBottom: 24,
  lineHeight: 20,
},
commentsInput: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 20,
  fontSize: 16,
  color: '#000',
  minHeight: 150,
  borderWidth: 2,
  borderColor: '#E0E0E0',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},
characterCount: {
  fontSize: 12,
  color: '#999',
  textAlign: 'right',
  marginTop: 8,
},
navigationContainer: {
  flexDirection: 'row',
  paddingHorizontal: 20,
  paddingVertical: 20,
  backgroundColor: '#FFFFFF',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  elevation: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
},
navButton: {
  paddingVertical: 14,
  paddingHorizontal: 24,
  borderRadius: 16,
  borderWidth: 2,
  borderColor: '#E0E0E0',
  backgroundColor: '#FFFFFF',
  minWidth: 100,
  alignItems: 'center',
},
nextButton: {
  backgroundColor: '#8B5CF6',
  borderColor: '#8B5CF6',
},
completeButton: {
  backgroundColor: '#4CAF50',
  borderColor: '#4CAF50',
},
disabledButton: {
  backgroundColor: '#F5F5F5',
  borderColor: '#E0E0E0',
},
navButtonSpacer: {
  flex: 1,
},
navButtonText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#666',
},
nextButtonText: {
  color: '#FFF',
},
completeButtonText: {
  color: '#FFF',
},
disabledButtonText: {
  color: '#CCC',
},
});

export default StudentHome;