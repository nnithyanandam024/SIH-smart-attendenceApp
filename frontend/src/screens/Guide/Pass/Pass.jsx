import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';

// Add your SVG imports here - replace with actual paths
import CloseIcon from '../../../assets/Guide/close.svg';
import CheckmarkIcon from '../../../assets/Guide/checkmark.svg';
// import CloseCircleIcon from '../../../assets/Guide/close-circle.svg';
// import CheckmarkCircleIcon from '../../../Guide/Admin/checkmark-circle.svg';

// Location icon component (you can replace with actual SVG)
const LocationIcon = ({ width = 20, height = 20, color = '#4A90E2' }) => (
  <View style={[styles.locationIconContainer, { backgroundColor: color + '20' }]}>
    <Text style={styles.locationIconText}>Track</Text>
  </View>
);

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CampusPassScreen = () => {
  const [passRequests, setPassRequests] = useState([
    {
      id: 1,
      name: 'Prakash Raj',
      rollNo: '2024VI023',
      location: 'Lab Signature',
      avatar: 'https://via.placeholder.com/40x40/4A90E2/FFFFFF?text=PR',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Prakash Raj',
      rollNo: '2024VI023',
      location: 'RestRoom',
      avatar: 'https://via.placeholder.com/40x40/4A90E2/FFFFFF?text=PR',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Prakash Raj',
      rollNo: '2024VI023',
      location: 'Medical Room',
      avatar: 'https://via.placeholder.com/40x40/4A90E2/FFFFFF?text=PR',
      status: 'pending',
    },
  ]);

  const [passHistory] = useState([
    {
      id: 1,
      name: 'SasiKumar V',
      rollNo: '203384IT',
      time: '10:40AM - 11:20AM',
      avatar: 'https://via.placeholder.com/50x50/4A90E2/FFFFFF?text=SK',
      status: 'declined',
      location: 'Library Block',
      coordinates: { lat: 11.0168, lng: 76.9558 }, // Sample coordinates for Coimbatore
    },
    {
      id: 2,
      name: 'Sasi K',
      rollNo: '203384CS',
      time: '10:50AM - 11:30AM',
      avatar: 'https://via.placeholder.com/50x50/4A90E2/FFFFFF?text=SK',
      status: 'accepted',
      location: 'Computer Lab',
      coordinates: { lat: 11.0175, lng: 76.9565 }, // Sample coordinates for Coimbatore
    },
  ]);

  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleApprove = (requestId) => {
    setPassRequests(prev => prev.filter(request => request.id !== requestId));
    Alert.alert('Success', 'Pass request approved successfully!');
  };

  const handleDecline = (requestId) => {
    setPassRequests(prev => prev.filter(request => request.id !== requestId));
    Alert.alert('Declined', 'Pass request has been declined.');
  };

  const handleLocationPress = (historyItem) => {
    setSelectedLocation(historyItem);
    setMapModalVisible(true);
  };

  const closeMapModal = () => {
    setMapModalVisible(false);
    setSelectedLocation(null);
  };

  const PassRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.requestInfo}>
        {/* <Image source={{ uri: item.avatar }} style={styles.avatar} /> */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userRoll}>{item.rollNo}</Text>
          <Text style={styles.userLocation}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.declineButton}
          onPress={() => handleDecline(item.id)}
          activeOpacity={0.7}
        >
          <CloseIcon width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.approveButton}
          onPress={() => handleApprove(item.id)}
          activeOpacity={0.7}
        >
          <CheckmarkIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const PassHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      {/* <Image source={{ uri: item.avatar }} style={styles.historyAvatar} /> */}
      <View style={styles.historyInfo}>
        <Text style={styles.historyName}>{item.name}</Text>
        <Text style={styles.historyRoll}>Roll No : {item.rollNo}</Text>
        <Text style={styles.historyTime}>{item.time}</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.statusWrapper}>
          {item.status === 'declined' ? (
            <>
              {/* <CloseCircleIcon width={16} height={16} /> */}
              <Text style={styles.declinedText}>Declined</Text>
            </>
          ) : (
            <>
              {/* <CheckmarkCircleIcon width={16} height={16} /> */}
              <Text style={styles.acceptedText}>Accepted</Text>
            </>
          )}
        </View>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={() => handleLocationPress(item)}
          activeOpacity={0.7}
        >
          <LocationIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const MapModal = () => (
    <Modal
      visible={mapModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeMapModal}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Location Details</Text>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={closeMapModal}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Location Info */}
          {selectedLocation && (
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{selectedLocation.name}</Text>
              <Text style={styles.locationDetails}>
                Roll No: {selectedLocation.rollNo}
              </Text>
              <Text style={styles.locationDetails}>
                Location: {selectedLocation.location}
              </Text>
              <Text style={styles.locationDetails}>
                Time: {selectedLocation.time}
              </Text>
              <Text style={styles.coordinatesText}>
                Coordinates: {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
              </Text>
            </View>
          )}

          {/* Sample Map Area */}
          <ScrollView style={styles.mapScrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.mapContainer}>
              <View style={styles.sampleMap}>
                <Text style={styles.mapTitle}>Campus Map</Text>
                
                {/* Sample map with building blocks */}
                <View style={styles.mapContent}>
                  {/* Main Building */}
                  <View style={[styles.building, { top: 30, left: 60, backgroundColor: '#4A90E2' }]}>
                    <Text style={styles.buildingText}>Main Block</Text>
                  </View>
                  
                  {/* Library */}
                  <View style={[styles.building, { 
                    top: 70, 
                    left: 20, 
                    backgroundColor: selectedLocation?.location === 'Library Block' ? '#FF6B6B' : '#7B68EE' 
                  }]}>
                    <Text style={styles.buildingText}>Library</Text>
                  </View>
                  
                  {/* Computer Lab */}
                  <View style={[styles.building, { 
                    top: 50, 
                    left: 120, 
                    backgroundColor: selectedLocation?.location === 'Computer Lab' ? '#FF6B6B' : '#50C878' 
                  }]}>
                    <Text style={styles.buildingText}>Comp Lab</Text>
                  </View>
                  
                  {/* Medical Room */}
                  <View style={[styles.building, { 
                    top: 100, 
                    left: 80, 
                    backgroundColor: selectedLocation?.location === 'Medical Room' ? '#FF6B6B' : '#FFD700' 
                  }]}>
                    <Text style={styles.buildingText}>Medical</Text>
                  </View>
                  
                  {/* Rest Room */}
                  <View style={[styles.building, { 
                    top: 120, 
                    left: 40, 
                    backgroundColor: selectedLocation?.location === 'RestRoom' ? '#FF6B6B' : '#FF69B4' 
                  }]}>
                    <Text style={styles.buildingText}>RestRoom</Text>
                  </View>

                  {/* Current location marker */}
                  {selectedLocation && (
                    <View style={styles.locationMarker}>
                      <Text style={styles.markerText}>📍</Text>
                    </View>
                  )}
                </View>
                
                {/* Map Legend */}
                <View style={styles.mapLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#FF6B6B' }]} />
                    <Text style={styles.legendText}>Current Location</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#4A90E2' }]} />
                    <Text style={styles.legendText}>Other Buildings</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.viewFullMapButton}
              activeOpacity={0.8}
            >
              <Text style={styles.viewFullMapText}>View Full Map</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.directionsButton}
              activeOpacity={0.8}
            >
              <Text style={styles.directionsText}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Campus Pass</Text>
        </View>

        {/* Campus Pass Request Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campus Pass Request</Text>
          <View style={styles.requestList}>
            {passRequests.map((item) => (
              <PassRequestItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Campus Pass History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campus Pass History</Text>
          <View style={styles.historyList}>
            {passHistory.map((item) => (
              <PassHistoryItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Map Modal */}
      <MapModal />
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
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  requestList: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  userRoll: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  declineButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  approveButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyList: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  historyInfo: {
    flex: 1, 
  },
  historyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  historyRoll: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  historyTime: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  declinedText: {
    fontSize: 14,
    color: '#FF4444',
    fontWeight: '500',
  },
  acceptedText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  locationButton: {
    padding: 4,
  },
  locationIconContainer: {
    width: 58,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  locationIconText: {
    fontSize: 14,
  },
  bottomSpacing: {
    height: 100,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: screenWidth - 40,
    height: screenHeight * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  locationInfo: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#4A90E2',
    marginTop: 5,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  mapScrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  mapContainer: {
    minHeight: 300,
  },
  sampleMap: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 15,
    minHeight: 300,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  mapContent: {
    height: 200,
    position: 'relative',
    backgroundColor: '#f0f8f0',
    borderRadius: 8,
    marginBottom: 15,
  },
  building: {
    position: 'absolute',
    padding: 8,
    borderRadius: 8,
    minWidth: 55,
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buildingText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationMarker: {
    position: 'absolute',
    top: 60,
    left: 90,
    zIndex: 10,
  },
  markerText: {
    fontSize: 24,
  },
  mapLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 10,
  },
  viewFullMapButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  viewFullMapText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  directionsButton: {
    flex: 1,
    backgroundColor: '#50C878',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#50C878',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  directionsText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CampusPassScreen;