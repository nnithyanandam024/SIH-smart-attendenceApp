import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
import AddIcon from '../../../assets/Teacher/add.svg';
import DropdownIcon from '../../../assets/Teacher/dropdown.svg';
import { styles } from './AddProjectStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddProject = () => {
  const [projectData, setProjectData] = useState({
    projectName: '',
    departmentName: '',
    description: '',
    phases: [
      { phaseNumber: 1, requirements: '', duration: '' },
      { phaseNumber: 2, requirements: '', duration: '' },
      { phaseNumber: 3, requirements: '', duration: '' }
    ]
  });
  
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [errors, setErrors] = useState({
    projectName: '',
    departmentName: '',
    description: '',
    phases: []
  });
  
  // Sample department data
  const departments = [
    "CSE",
    "IT",
    "EEE",
    "ECE",
    "CIVIL",
    "MECH",
    "AIDS",
    "AIML",
    "AERO",
    "FT",
    "FD",
    "AGRI",
    "BT"
  ];

  const handleInputChange = (name, value) => {
    setProjectData({
      ...projectData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleDepartmentSelect = (department) => {
    handleInputChange('departmentName', department);
    setShowDepartmentModal(false);
    
    // Clear department error
    if (errors.departmentName) {
      setErrors({
        ...errors,
        departmentName: ''
      });
    }
  };

  const handlePhaseChange = (phaseNumber, field, value) => {
    const updatedPhases = projectData.phases.map(phase => {
      if (phase.phaseNumber === phaseNumber) {
        return { ...phase, [field]: value };
      }
      return phase;
    });

    setProjectData({
      ...projectData,
      phases: updatedPhases
    });
    
    // Clear phase error when user starts typing
    const phaseIndex = phaseNumber - 1;
    if (errors.phases[phaseIndex] && errors.phases[phaseIndex][field]) {
      const updatedPhaseErrors = [...errors.phases];
      updatedPhaseErrors[phaseIndex] = {
        ...updatedPhaseErrors[phaseIndex],
        [field]: ''
      };
      
      setErrors({
        ...errors,
        phases: updatedPhaseErrors
      });
    }
  };

  const addPhase = () => {
    const newPhaseNumber = projectData.phases.length + 1;
    setProjectData({
      ...projectData,
      phases: [
        ...projectData.phases,
        { phaseNumber: newPhaseNumber, requirements: '', duration: '' }
      ]
    });
    
    // Add empty error object for the new phase
    setErrors({
      ...errors,
      phases: [...errors.phases, {}]
    });
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log("Operation cancelled");
    // Could navigate back or reset form
  };

  const handleConfirm = () => {
    // Validate form
    let newErrors = {
      projectName: '',
      departmentName: '',
      description: '',
      phases: []
    };
    let isValid = true;
    
    // Validate project name
    if (!projectData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
      isValid = false;
    }
    
    // Validate department
    if (!projectData.departmentName.trim()) {
      newErrors.departmentName = 'Department name is required';
      isValid = false;
    }
    
    // Validate description
    if (!projectData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    
    // Validate phases
    const phaseErrors = projectData.phases.map(phase => {
      const phaseError = {};
      if (!phase.requirements.trim()) {
        phaseError.requirements = `Phase ${phase.phaseNumber} requirements are required`;
        isValid = false;
      }
      if (!phase.duration.trim()) {
        phaseError.duration = `Phase ${phase.phaseNumber} duration is required`;
        isValid = false;
      } else if (isNaN(phase.duration) || parseInt(phase.duration) <= 0) {
        phaseError.duration = `Phase ${phase.phaseNumber} duration must be a positive number`;
        isValid = false;
      }
      return phaseError;
    });
    newErrors.phases = phaseErrors;
    
    setErrors(newErrors);
    
    if (isValid) {
      // Handle project submission logic here
      console.log("Project submitted:", projectData);
      // You could navigate away or show success message here
    } else {
      console.log("Form has errors, please correct them");
    }
  };

  const renderDepartmentItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.departmentItem} 
      onPress={() => handleDepartmentSelect(item)}
    >
      <Text style={styles.departmentText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.containermain}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Project</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Project name</Text>
              <TextInput
                style={[styles.input, errors.projectName ? styles.inputError : null]}
                value={projectData.projectName}
                onChangeText={(text) => handleInputChange('projectName', text)}
                placeholder="Enter project name"
              />
              {errors.projectName ? <Text style={styles.errorText}>{errors.projectName}</Text> : null}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Department name</Text>
              <TouchableOpacity 
                style={[styles.dropdown, errors.departmentName ? styles.inputError : null]}
                onPress={() => setShowDepartmentModal(true)}
              >
                <Text style={[
                  styles.input, 
                  {
                    color: projectData.departmentName ? '#000' : '#999',
                    padding: 10,
                    height: 40,
                    textAlignVertical: 'center'
                  }
                ]}>
                  {projectData.departmentName || "Select department"}
                </Text>
                <DropdownIcon style={styles.dropdownIcon} />
              </TouchableOpacity>
              {errors.departmentName ? <Text style={styles.errorText}>{errors.departmentName}</Text> : null}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea, errors.description ? styles.inputError : null]}
                value={projectData.description}
                onChangeText={(text) => handleInputChange('description', text)}
                multiline
                numberOfLines={4}
                placeholder="Enter project description"
              />
              {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
            </View>
            
            {projectData.phases.map((phase, index) => (
              <View key={phase.phaseNumber}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phase {phase.phaseNumber} Requirements</Text>
                  <TextInput
                    style={[styles.input, errors.phases[index]?.requirements ? styles.inputError : null]}
                    value={phase.requirements}
                    onChangeText={(text) => handlePhaseChange(phase.phaseNumber, 'requirements', text)}
                    placeholder={`Enter phase ${phase.phaseNumber} requirements`}
                  />
                  {errors.phases[index]?.requirements ? 
                    <Text style={styles.errorText}>{errors.phases[index].requirements}</Text> : null}
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phase {phase.phaseNumber} Duration (Days)</Text>
                  <TextInput
                    style={[styles.input, errors.phases[index]?.duration ? styles.inputError : null]}
                    value={phase.duration}
                    onChangeText={(text) => handlePhaseChange(phase.phaseNumber, 'duration', text)}
                    keyboardType="numeric"
                    placeholder={`Enter phase ${phase.phaseNumber} duration in days`}
                  />
                  {errors.phases[index]?.duration ? 
                    <Text style={styles.errorText}>{errors.phases[index].duration}</Text> : null}
                </View>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.addPhaseButton} 
              onPress={addPhase}
            >
              <AddIcon color="#fff" />
              <Text style={styles.addPhaseButtonText}>Add more phase</Text>
            </TouchableOpacity>
            
            <View style={styles.buttonRow}>
              {/* <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity> */}
              
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Department Selection Modal */}
      <Modal
        visible={showDepartmentModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDepartmentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Department</Text>
            
            <FlatList
              data={departments}
              renderItem={renderDepartmentItem}
              keyExtractor={(item) => item}
              style={styles.departmentsList}
            />
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowDepartmentModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddProject;