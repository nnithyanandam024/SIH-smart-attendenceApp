import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Dimensions,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Attendence = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOTP] = useState('');

  // Simulate camera permission request
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to camera to scan QR codes',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setHasPermission(false);
      }
    } else {
      // iOS permissions simulation
      setHasPermission(true);
    }
    setShowCamera(true);
  };

  useEffect(() => {
    // Auto-request permission on component mount
    requestCameraPermission();
  }, []);

  // Simulate QR code scanning
  const simulateQRScan = () => {
    setTimeout(() => {
      Alert.alert('QR Code Scanned', 'Student ID: STU123\nPlease verify with OTP.', [
        { text: 'OK', onPress: () => setShowOTPModal(true) }
      ]);
    }, 2000); // Simulate 2-second scan delay
  };

  const handleOTPSubmit = () => {
    if (otp.length === 4) {
      Alert.alert('Success', 'Attendance marked successfully!', [
        { text: 'OK', onPress: () => {
          setShowOTPModal(false);
          setOTP('');
        }}
      ]);
    } else {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
    }
  };

  const handleOTPChange = (text) => {
    if (text.length <= 4 && /^\d*$/.test(text)) {
      setOTP(text);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Attendence</Text>
        <View style={styles.noPermissionContainer}>
          <Text style={styles.noPermissionText}>
            Camera permission is required to scan QR codes
          </Text>
          <TouchableOpacity 
            style={styles.useOTPButton} 
            onPress={() => setShowOTPModal(true)}
          >
            <Text style={styles.useOTPText}>Use OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header */}
      <Text style={styles.header}>Attendence</Text>
      
      {/* Camera Simulation View */}
      <View style={styles.cameraContainer}>
        <View style={styles.cameraSimulation}>
          {/* Camera Feed Simulation */}
          <View style={styles.cameraFeed}>
            <View style={styles.cameraOverlay}>
              <View style={styles.scannerFrame}>
                <View style={styles.cornerTL} />
                <View style={styles.cornerTR} />
                <View style={styles.cornerBL} />
                <View style={styles.cornerBR} />
                
                {/* Scanning Animation */}
                <View style={styles.scanLine} />
              </View>
            </View>
          </View>
        </View>
        
        {/* Instruction Text */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>Align the Scanner to the QR Code</Text>
        </View>

        {/* Simulate Scan Button (for demo) */}
        <TouchableOpacity 
          style={styles.simulateScanButton}
          onPress={simulateQRScan}
        >
          <Text style={styles.simulateScanText}>Tap to Simulate QR Scan</Text>
        </TouchableOpacity>
      </View>

      {/* Use OTP Button */}
      <TouchableOpacity 
        style={styles.useOTPButton} 
        onPress={() => setShowOTPModal(true)}
      >
        <Text style={styles.useOTPText}>Use OTP</Text>
      </TouchableOpacity>

      {/* OTP Modal */}
      <Modal
        visible={showOTPModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOTPModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            <Text style={styles.modalSubtitle}>
              Please enter the 4-digit OTP for attendance verification
            </Text>
            
            {/* OTP Input Boxes */}
            <View style={styles.otpContainer}>
              {[0, 1, 2, 3].map((index) => (
                <View key={index} style={styles.otpBox}>
                  <Text style={styles.otpDigit}>
                    {otp[index] || ''}
                  </Text>
                </View>
              ))}
            </View>
            
            <TextInput
              style={styles.hiddenInput}
              value={otp}
              onChangeText={handleOTPChange}
              keyboardType="numeric"
              maxLength={4}
              autoFocus={true}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowOTPModal(false);
                  setOTP('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleOTPSubmit}
              >
                <Text style={styles.submitButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight || 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  noPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noPermissionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 30,
    color: '#333',
  },
  cameraContainer: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e8d5f5',
    position: 'relative',
  },
  cameraSimulation: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  cameraFeed: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 200,
    height: 200,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#00ff00',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#00ff00',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#00ff00',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#00ff00',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00ff00',
    opacity: 0.8,
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  simulateScanButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(155, 89, 182, 0.8)',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  simulateScanText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  useOTPButton: {
    backgroundColor: '#9b59b6',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  useOTPText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '70%',
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#9b59b6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  otpDigit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#9b59b6',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Attendence;