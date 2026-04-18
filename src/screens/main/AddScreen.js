import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('idea');
  const [selectedIdeaFormat, setSelectedIdeaFormat] = useState('reel');
  const [taskGoal, setTaskGoal] = useState('');
  const [taskTargetDate, setTaskTargetDate] = useState(null);
  const [presetMediaList, setPresetMediaList] = useState([]);
  const [eventDate, setEventDate] = useState(new Date());
  const [eventHour, setEventHour] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTaskDatePicker, setShowTaskDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [presets, setPresets] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState(null);

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    try {
      const storedPresets = await AsyncStorage.getItem('presets');
      if (storedPresets) {
        setPresets(JSON.parse(storedPresets));
      }
    } catch (error) {
      console.error('Error loading presets:', error);
    }
  };

  const savePreset = async (name, media) => {
    const newPreset = { id: Date.now().toString(), name, media };
    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    try {
      await AsyncStorage.setItem('presets', JSON.stringify(updatedPresets));
    } catch (error) {
      console.error('Error saving preset:', error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(false);
    setEventDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || eventHour;
    setShowTimePicker(false);
    setEventHour(currentTime);
  };

  const onTaskDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || taskTargetDate;
    setShowTaskDatePicker(false);
    setTaskTargetDate(currentDate);
  };

  const handleSave = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un título.');
      return;
    }

    if (selectedType === 'preset') {
      savePreset(title, presetMediaList);
      Alert.alert('Guardado', 'Preset guardado correctamente.');
    } else if (selectedType === 'idea') {
      Alert.alert('Guardado', `Idea guardada como ${selectedIdeaFormat}.`);
    } else if (selectedType === 'task') {
      const dateText = taskTargetDate ? ` para ${taskTargetDate.toLocaleDateString()}` : '';
      Alert.alert('Guardado', `Tarea guardada.${dateText}`);
    } else if (selectedType === 'event') {
      Alert.alert('Guardado', 'Recordatorio guardado correctamente.');
    } else {
      Alert.alert('Guardado', 'Elemento guardado correctamente.');
    }
    // Reset form or navigate back
  };

  const ideaFormats = [
    { key: 'reel', label: 'Reel (video corto)' },
    { key: 'story', label: 'Historia' },
    { key: 'post', label: 'Post' },
  ];

  const taskTemplates = [
    'Quiero mas clientes nuevos',
    'Quiero una promoción viral',
    'Es una fecha especial',
    'Quiero mas visibilidad en redes',
    'Quiero aumentar mis ventas',
    'Quiero mejorar mi marca personal',
  ];

  const types = [
    { key: 'idea', label: '💡 Idea' },
    { key: 'task', label: ' 📋 Estrategia' },
    { key: 'event', label: ' 🕒 Recordatorio' },
    { key: 'preset', label: '📸 Fotos' },
  ];

  const pickMedia = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your media library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,//Esto saca un WARN [expo-image-picker] `ImagePicker.MediaTypeOptions` have been deprecated. Use `ImagePicker.MediaType` or an array of `ImagePicker.MediaType` instead.
        allowsMultiple: true,
        quality: 1,
      });

      if (!result.canceled) {
        setPresetMediaList([...presetMediaList, ...result.assets]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick media');
      console.error(error);
    }
  };

  const removeMedia = (index) => {
    setPresetMediaList(presetMediaList.filter((_, i) => i !== index));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>➕ Agregar</Text>
          <Text style={styles.subtitle}>Crea algo nuevo</Text>
        </View>

        {/* Type Selector */}
        <Text style={styles.label}>Tipo</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeRow}
          nestedScrollEnabled
        >
          {types.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.typeChip, selectedType === t.key && styles.typeChipActive]}
              onPress={() => setSelectedType(t.key)}
            >
              <Text style={[styles.typeChipText, selectedType === t.key && styles.typeChipTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Dale un nombre..."
          placeholderTextColor="#9E9E9E"
          value={title}
          onChangeText={setTitle}
        />

        {selectedType === 'preset' ? (
          <>
            <Text style={styles.label}>Fotos o Videos</Text>
            <View style={styles.mediaContainer}>
              <View style={styles.mediaGrid}>
                {presetMediaList.map((media, index) => (
                  <View key={index} style={styles.mediaGridItem}>
                    <Image
                      source={{ uri: media.uri }}
                      style={styles.mediaThumbnail}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeMedia(index)}
                    >
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <TouchableOpacity 
                style={styles.addMediaButton}
                onPress={pickMedia}
              >
                <Text style={styles.addMediaButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : selectedType === 'event' ? (
          <>
            <Text style={styles.label}>Fecha del Evento</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.inputText}>
                {eventDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Hora del Evento</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
              <Text style={styles.inputText}>
                {eventHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Preset</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetRow}>
              {presets.map((preset) => (
                <TouchableOpacity
                  key={preset.id}
                  style={[styles.presetChip, selectedPreset === preset.id && styles.presetChipActive]}
                  onPress={() => setSelectedPreset(preset.id)}
                >
                  <Text style={[styles.presetChipText, selectedPreset === preset.id && styles.presetChipTextActive]}>
                    {preset.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        ) : selectedType === 'idea' ? (
          <>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe la idea..."
              placeholderTextColor="#9E9E9E"
              multiline
              numberOfLines={5}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Formato</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetRow}>
              {ideaFormats.map((format) => (
                <TouchableOpacity
                  key={format.key}
                  style={[styles.presetChip, selectedIdeaFormat === format.key && styles.presetChipActive]}
                  onPress={() => setSelectedIdeaFormat(format.key)}
                >
                  <Text style={[styles.presetChipText, selectedIdeaFormat === format.key && styles.presetChipTextActive]}>
                    {format.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        ) : selectedType === 'task' ? (
          <>
            <Text style={styles.label}>¿Qué quieres lograr?</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Escribe tu objetivo..."
              placeholderTextColor="#9E9E9E"
              multiline
              numberOfLines={5}
              value={taskGoal}
              onChangeText={setTaskGoal}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Plantillas sugeridas</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetRow}>
              {taskTemplates.map((template, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.templateChip}
                  onPress={() => setTaskGoal(template)}
                >
                  <Text style={styles.templateChipText}>{template}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Fecha objetivo (opcional)</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowTaskDatePicker(true)}>
              <Text style={styles.inputText}>
                {taskTargetDate ? taskTargetDate.toLocaleDateString() : 'Selecciona una fecha'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Escribe más detalles aquí..."
              placeholderTextColor="#9E9E9E"
              multiline
              numberOfLines={5}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
          </>
        )}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={eventDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={eventHour}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      {showTaskDatePicker && (
        <DateTimePicker
          value={taskTargetDate || new Date()}
          mode="date"
          display="default"
          onChange={onTaskDateChange}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#F5F6FA', // Fondo claro
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    color: '#111827', // Negro suave
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#6B7280', // Gris moderno
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
    marginTop: 16,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  typeChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
  },
  typeChipActive: {
    backgroundColor: '#F3E8FF', // Morado muy claro
    borderColor: '#8B5CF6',
  },
  typeChipText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  typeChipTextActive: {
    color: '#6C63FF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: '#1F2937',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputText: {
    color: '#1F2937',
    fontSize: 15,
  },
  textArea: {
    height: 120,
  },
  mediaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    padding: 12,
    marginBottom: 16,
    marginTop: 8,
    minHeight: 200,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  mediaGridItem: {
    position: 'relative',
    width: '48%',
  },
  mediaThumbnail: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EF4444', // Rojo más moderno
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  addMediaButton: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMediaButtonText: {
    fontSize: 40,
    color: '#6C63FF',
    fontWeight: '300',
  },
  saveBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  presetRow: {
    marginTop: 8,
  },
  presetChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
  },
  presetChipActive: {
    backgroundColor: '#F3E8FF',
    borderColor: '#8B5CF6',
  },
  presetChipText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  presetChipTextActive: {
    color: '#6C63FF',
  },
  templateChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    marginRight: 10,
  },
  templateChipText: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '600',
  },
});
