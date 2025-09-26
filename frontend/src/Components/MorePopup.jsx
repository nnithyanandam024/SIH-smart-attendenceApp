import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';

// Import your SVG icons here
import CalendarIcon from '../assets/GeneralAssests/CalendarIcon';
import LeaveApplyIcon from '../assets/GeneralAssests/LeaveApplyIcon';
import PhonebookIcon from '../assets/GeneralAssests/PhonebookIcon';
import RequestIcon from '../assets/GeneralAssests/RequestIcon';
import SettingsIcon from '../assets/GeneralAssests/SettingsIcon';

const MorePopup = ({ visible, onClose, options = [] }) => {
    const slideAnim = React.useRef(new Animated.Value(300)).current; // Start off-screen

    React.useEffect(() => {
        if (visible) {
            // Slide in
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            // Slide out
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    // Default menu options
    const defaultOptions = [
        {
            label: 'Calendar',
            icon: 'calendar', // Replace with <CalendarIcon />
            onPress: () => console.log('Calendar pressed')
        },
        {
            label: 'Leave Apply',
            icon: 'leave-apply', // Replace with <LeaveApplyIcon />
            onPress: () => console.log('Leave Apply pressed')
        },
        {
            label: 'Phonebook',
            icon: 'phonebook', // Replace with <PhonebookIcon />
            onPress: () => console.log('Phonebook pressed')
        },
        {
            label: 'Request',
            icon: 'request', // Replace with <RequestIcon />
            onPress: () => console.log('Request pressed')
        },
        {
            label: 'Settings',
            icon: 'settings', // Replace with <SettingsIcon />
            onPress: () => console.log('Settings pressed')
        }
    ];

    const menuOptions = options.length > 0 ? options : defaultOptions;

    const renderIcon = (iconType) => {
        // Replace these with your actual SVG components
        switch (iconType) {
            case 'calendar':
                return <CalendarIcon />;
            case 'leave-apply':
                return <LeaveApplyIcon />
            case 'phonebook':
                return <PhonebookIcon />
            case 'request':
                return <RequestIcon />
            case 'settings':
                return <SettingsIcon />
            default:
                return <Text style={styles.iconText}>📋</Text>;
        }
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none" // We'll handle animation ourselves
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                {/* Transparent touchable area to close popup */}
                <TouchableOpacity 
                    style={styles.backgroundTouchable} 
                    activeOpacity={1} 
                    onPress={onClose}
                />
                
                <Animated.View 
                    style={[
                        styles.popup,
                        {
                            transform: [{ translateX: slideAnim }],
                        }
                    ]}
                >
                    {/* Menu Options */}
                    <View style={styles.menuSection}>
                        {menuOptions.map((option, idx) => (
                            <TouchableOpacity 
                                key={idx} 
                                style={styles.option} 
                                onPress={() => {
                                    option.onPress?.();
                                    onClose();
                                }}
                            >
                                <View style={styles.optionContent}>
                                    <View style={styles.iconPlaceholder}>
                                        {renderIcon(option.icon)}
                                    </View>
                                    <Text style={styles.optionText}>{option.label}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* User Section */}
                    <View style={styles.userSection}>
                        <Text style={styles.sectionTitle}>User</Text>
                        
                        <View style={styles.userItem}>
                            <Text style={styles.userName}>Vishal</Text>
                            <View style={styles.toggleContainer}>
                                <View style={styles.toggleActive}>
                                    <View style={styles.toggleThumb} />
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.userItem}>
                            <Text style={styles.userName}>Mahesh</Text>
                            <View style={styles.toggleContainer}>
                                <View style={styles.toggleInactive}>
                                    <View style={[styles.toggleThumb, styles.toggleThumbInactive]} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        flexDirection: 'row',
    },
    backgroundTouchable: {
        flex: 1,
    },
    popup: {
        width: 280,
        backgroundColor: '#fff',
        height: '100%',
        paddingTop: 60,
        paddingHorizontal: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: -2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuSection: {
        flex: 1,
        paddingHorizontal: 20,
    },
    option: {
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5E5',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconPlaceholder: {
        width: 24,
        height: 24,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 16,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '700',
    },
    userSection: {
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#F8F9FA',
    },
    sectionTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        fontWeight: '600',
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    userName: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    toggleContainer: {
        padding: 2,
    },
    toggleActive: {
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 2,
    },
    toggleInactive: {
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 2,
    },
    toggleThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    toggleThumbInactive: {
        // Same styling, position handled by parent container
    },
});

export default MorePopup;