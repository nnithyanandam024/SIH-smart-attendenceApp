import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  Modal,
  PermissionsAndroid,
  Platform,
} from 'react-native';
// For modern camera implementation, install: npm install react-native-vision-camera
// import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
// import { Ionicons } from '@expo/vector-icons';

// Note: react-native-vision-camera is the modern replacement for react-native-camera

const { width, height } = Dimensions.get('window');

const AttendanceScreen = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const [liveAttendance, setLiveAttendance] = useState([
    {
      id: 1,
      name: 'Ram',
      rollNo: '737G254IT236',
      status: 'Present',
      time: '09:37 AM',
    },
    {
      id: 2,
      name: 'Selva',
      rollNo: '737G254IT276',
      status: 'Present',
      time: '11:23 AM',
    },
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Request camera permissions (updated for vision-camera)
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // Check if we already have permission
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        
        if (hasPermission) {
          setHasCameraPermission(true);
          return true;
        }

        // Request permission if we don't have it
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Access Required',
            message: 'This app needs camera access to scan faces for attendance marking. Your privacy is important - no images are stored.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'Allow',
          }
        );

        console.log('Permission result:', granted);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasCameraPermission(true);
          return true;
        } else {
          Alert.alert(
            'Permission Required', 
            'Camera permission is needed for facial recognition. You can grant it in Settings.',
            [{ text: 'OK', style: 'default' }]
          );
          return false;
        }
      } catch (err) {
        console.error('Permission request error:', err);
        Alert.alert('Error', 'Failed to request camera permission. Please try again.');
        return false;
      }
    } else {
      // For iOS, handle permissions using Camera.requestCameraPermission()
      // For now, assume granted
      setHasCameraPermission(true);
      return true;
    }
  };

  const handleShowQRCode = () => {
    setShowQRModal(true);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
  };

  const handleOpenScanner = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (hasPermission) {
        setShowCameraModal(true);
        setIsScanning(false);
        setScanProgress(0);
        setCameraReady(false);
        
        // Simulate camera initialization
        setTimeout(() => {
          setCameraReady(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Error opening scanner:', error);
      Alert.alert('Error', 'Failed to open camera scanner. Please try again.');
    }
  };

  const handleCloseCameraModal = () => {
    setShowCameraModal(false);
    setIsScanning(false);
    setScanProgress(0);
    setCameraReady(false);
  };

  const handleStartScanning = () => {
    if (!cameraReady) {
      Alert.alert('Camera Not Ready', 'Please wait for camera to initialize');
      return;
    }
    
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate face scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Simulate successful recognition
          setTimeout(() => {
            setShowCameraModal(false);
            Alert.alert(
              'Face Recognized!', 
              'Attendance marked successfully for Sabareesh SS',
              [{ text: 'OK', onPress: () => {} }]
            );
            // Add new attendance record
            const newAttendance = {
              id: Date.now(),
              name: 'John Doe',
              rollNo: '737G254IT' + Math.floor(Math.random() * 1000),
              status: 'Present',
              time: new Date().toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              }),
            };
            setLiveAttendance(prev => [newAttendance, ...prev]);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleGenerateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    Alert.alert('OTP Generated', `Your OTP is: ${otp}`);
  };

  // Dummy QR Code Component
  const DummyQRCode = () => {
    const qrPattern = [
      [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,1,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0,1,1,1,1],
      [1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,1],
      [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
      [1,0,1,1,0,1,1,1,0,0,1,1,0,1,0,1,1],
      [0,1,0,0,1,0,0,0,1,1,0,0,1,0,1,0,0],
      [1,0,1,0,0,1,1,1,0,0,1,1,0,1,0,1,1],
      [0,1,0,1,1,0,0,0,1,1,0,0,1,0,1,0,0],
      [1,0,1,1,0,1,1,1,0,0,1,1,0,1,0,1,1],
      [0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0],
      [1,1,1,1,1,1,1,0,0,1,0,1,1,1,0,1,1],
      [1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0],
      [1,1,1,1,1,1,1,0,0,1,0,1,1,1,0,1,1],
    ];

    return (
      <View style={styles.qrCodeContainer}>
        {qrPattern.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.qrRow}>
            {row.map((cell, cellIndex) => (
              <View
                key={cellIndex}
                style={[
                  styles.qrCell,
                  { backgroundColor: cell === 1 ? '#000' : '#fff' }
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  // Modern Camera Component (using react-native-vision-camera approach)
  const ModernCameraView = () => {
    return (
      <View style={styles.cameraContainer}>
        {/* 
        // Modern Camera Implementation (when react-native-vision-camera is installed)
        const devices = useCameraDevices();
        const device = devices.back;

        if (device == null) return <Text>Loading camera...</Text>;

        <Camera
          ref={cameraRef}
          style={styles.cameraPreview}
          device={device}
          isActive={showCameraModal && hasCameraPermission}
          onInitialized={() => {
            console.log('Camera initialized!');
            setCameraReady(true);
          }}
          onError={(error) => {
            console.log('Camera error:', error);
            Alert.alert('Camera Error', 'Failed to initialize camera');
          }}
        />
        */}
        
        {/* Enhanced placeholder for testing without camera library */}
        <View style={[styles.cameraPreview, styles.cameraPlaceholder]}>
          {!hasCameraPermission ? (
            <>
              <Text style={styles.placeholderEmoji}>📷</Text>
              <Text style={styles.placeholderText}>Camera Access Needed</Text>
              <Text style={styles.placeholderSubtext}>
                Grant camera permission to enable facial recognition scanning
              </Text>
            </>
          ) : !cameraReady ? (
            <>
              <Text style={styles.placeholderEmoji}>⚙️</Text>
              <Text style={styles.placeholderText}>Starting Camera...</Text>
              <View style={styles.loadingBar}>
                <View style={styles.loadingProgress} />
              </View>
              <Text style={styles.placeholderSubtext}>
                Preparing camera for face detection
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.placeholderEmoji}>✅</Text>
              <Text style={styles.placeholderText}>Camera Active</Text>
              <Text style={styles.placeholderSubtext}>
                Real camera feed ready for facial recognition
              </Text>
            </>
          )}
        </View>
        
        {hasCameraPermission && (
          <View style={styles.cameraOverlay}>
            {/* Face detection overlay */}
            <View style={[
              styles.faceOverlay,
              isScanning && styles.faceOverlayScanning
            ]}>
              <View style={styles.faceCorner} />
              <View style={[styles.faceCorner, styles.faceCornerTopRight]} />
              <View style={[styles.faceCorner, styles.faceCornerBottomLeft]} />
              <View style={[styles.faceCorner, styles.faceCornerBottomRight]} />
            </View>

            {/* Camera status indicator */}
            <View style={styles.cameraStatus}>
              <View style={[
                styles.statusIndicator,
                { backgroundColor: cameraReady ? '#4CAF50' : '#FF6B6B' }
              ]} />
              <Text style={styles.statusText}>
                {cameraReady ? 'Live Feed' : 'Starting...'}
              </Text>
            </View>

            {/* Scanning animation */}
            {isScanning && (
              <View style={styles.scanningLine}>
                <View style={[
                  styles.scanLine,
                  { transform: [{ translateY: (scanProgress / 100) * 200 }] }
                ]} />
              </View>
            )}
          </View>
        )}

        {/* Progress indicator */}
        {isScanning && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${scanProgress}%` }
              ]} />
            </View>
            <Text style={styles.progressText}>Facial Recognition: {scanProgress}%</Text>
          </View>
        )}
      </View>
    );
  };

  const AttendanceCard = ({ title, buttonText, onPress, icon }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {/* {icon && <Ionicons name={icon} size={24} color="#666" />} */}
      </View>
      <TouchableOpacity style={styles.actionButton} onPress={onPress}>
        <Text style={styles.actionButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );

  const LiveAttendanceItem = ({ item }) => (
    <View style={styles.attendanceItem}>
      <View style={styles.attendanceInfo}>
        <Text style={styles.attendanceName}>Name: {item.name}</Text>
        <Text style={styles.attendanceRoll}>Roll No: {item.rollNo}</Text>
      </View>
      <View style={styles.attendanceStatus}>
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <Text style={styles.attendanceTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Attendance</Text>
        </View>

        {/* QR Code Section */}
        <AttendanceCard
          title="QR Code"
          buttonText="Show QR Code"
          onPress={handleShowQRCode}
          icon="qr-code-outline"
        />

        {/* Facial Recognition Section */}
        <AttendanceCard
          title="Facial Recognition"
          buttonText="Open Scanner"
          onPress={handleOpenScanner}
          icon="camera-outline"
        />
       
        {/* Generate OTP Section */}
        <AttendanceCard
          title="Generate OTP"
          buttonText="Generate"
          onPress={handleGenerateOTP}
          icon="keypad-outline"
        />

        {/* Live Attendance Activity */}
        <View style={styles.liveAttendanceSection}>
          <View style={styles.liveAttendanceHeader}>
            <Text style={styles.liveAttendanceTitle}>Live Attendance Activity</Text>
            <Text style={styles.currentTime}>{currentTime}</Text>
          </View>

          <View style={styles.attendanceList}>
            {liveAttendance.map((item) => (
              <LiveAttendanceItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* QR Code Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showQRModal}
        onRequestClose={handleCloseQRModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Attendance QR Code</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseQRModal}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.qrContainer}>
              <DummyQRCode />
              <Text style={styles.qrInstructions}>
                Scan this QR code to mark your attendance
              </Text>
              <Text style={styles.qrCode}>Code: ATT-2024-001</Text>
            </View>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCloseQRModal}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Camera Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCameraModal}
        onRequestClose={handleCloseCameraModal}
      >
        <View style={styles.cameraModalOverlay}>
          <View style={styles.cameraModalContent}>
            <View style={styles.cameraHeader}>
              <Text style={styles.cameraTitle}>Facial Recognition Scanner</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseCameraModal}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ModernCameraView />
            
            <View style={styles.cameraInstructions}>
              <Text style={styles.instructionText}>
                {!hasCameraPermission 
                  ? "Camera permission is required for facial recognition. Please tap 'Allow' when prompted."
                  : !cameraReady
                  ? "Please wait while we initialize the camera..."
                  : "Position your face within the frame and tap 'Start Scan'"
                }
              </Text>
            </View>
            
            <View style={styles.cameraButtons}>
              <TouchableOpacity
                style={[
                  styles.scanButton,
                  (!cameraReady || isScanning) && styles.scanButtonDisabled
                ]}
                onPress={handleStartScanning}
                disabled={!cameraReady || isScanning}
              >
                <Text style={styles.scanButtonText}>
                  {!cameraReady ? 'Camera Loading...' : (isScanning ? 'Scanning...' : 'Start Scan')}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCloseCameraModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#B794F6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  liveAttendanceSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  liveAttendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  liveAttendanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  currentTime: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  attendanceList: {
    gap: 15,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  attendanceInfo: {
    flex: 1,
  },
  attendanceName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  attendanceRoll: {
    fontSize: 14,
    color: '#666',
  },
  attendanceStatus: {
    alignItems: 'flex-end',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  attendanceTime: {
    fontSize: 12,
    color: '#666',
  },
  bottomSpacing: {
    height: 100,
  },
  // QR Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.9,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrCodeContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 15,
  },
  qrRow: {
    flexDirection: 'row',
  },
  qrCell: {
    width: 8,
    height: 8,
  },
  qrInstructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  qrCode: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  modalButton: {
    backgroundColor: '#B794F6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Camera Modal Styles
  cameraModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraModalContent: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: width * 0.95,
    maxHeight: height * 0.9,
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  cameraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  cameraPreview: {
    width: 300,
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  cameraPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.7,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  placeholderSubtext: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  loadingBar: {
    width: 120,
    height: 4,
    backgroundColor: 'rgba(183, 148, 246, 0.3)',
    borderRadius: 2,
    marginVertical: 12,
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '70%',
    height: '100%',
    backgroundColor: '#B794F6',
    borderRadius: 2,
  },
  cameraOverlay: {
    position: 'absolute',
    width: 300,
    height: 280,
    borderRadius: 20,
  },
  cameraStatus: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  faceOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 150,
    height: 200,
    marginTop: -100,
    marginLeft: -75,
    borderWidth: 2,
    borderColor: '#B794F6',
    borderRadius: 10,
  },
  faceOverlayScanning: {
    borderColor: '#4CAF50',
  },
  faceCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: '#B794F6',
    top: -2,
    left: -2,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  faceCornerTopRight: {
    right: -2,
    left: 'auto',
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 3,
  },
  faceCornerBottomLeft: {
    bottom: -2,
    top: 'auto',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 3,
  },
  faceCornerBottomRight: {
    bottom: -2,
    right: -2,
    top: 'auto',
    left: 'auto',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanningLine: {
    position: 'absolute',
    width: 150,
    height: 200,
    top: '50%',
    left: '50%',
    marginTop: -100,
    marginLeft: -75,
    overflow: 'hidden',
  },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  progressContainer: {
    alignItems: 'center',
    width: 300,
    marginTop: 15,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  cameraInstructions: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  instructionText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  cameraButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  scanButton: {
    flex: 1,
    backgroundColor: '#B794F6',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  scanButtonDisabled: {
    backgroundColor: '#666',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#666',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AttendanceScreen;