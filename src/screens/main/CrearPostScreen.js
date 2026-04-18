import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NuevaEstrategiaScreen({ navigation }) {
  // Estados para los inputs y selecciones
  const [objetivo, setObjetivo] = useState(
    'Quiero atraer más clientes a mi cafetería esta semana, especialmente estudiantes universitarios en época de exámenes.'
  );
  const [situacionSeleccionada, setSituacionSeleccionada] = useState(null);
  
  // Estados para el calendario
  const [fecha, setFecha] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(false);

  const situaciones = [
    { id: '1', icon: '🎯', label: 'Quiero más clientes nuevos' },
    { id: '2', icon: '🏷️', label: 'Tengo una promoción especial' },
    { id: '3', icon: '📅', label: 'Es una fecha o temporada especial' },
    { id: '4', icon: '📣', label: 'Quiero más visibilidad en redes' },
  ];

  const onChangeFecha = (event, fechaSeleccionada) => {
    const fechaActual = fechaSeleccionada || fecha;
    setMostrarCalendario(Platform.OS === 'ios'); // En Android se cierra automáticamente
    setFecha(fechaActual);
    setFechaSeleccionada(true);
  };

  const formatearFecha = (fecha) => {
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('DetalleIdeaScreen')}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nueva estrategia</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Sección 1: Resumen de la idea */}
        <View style={styles.ideaContainer}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>🔥 Tendencia activa</Text>
          </View>
          <Text style={styles.ideaTitle}>Happy Hour para estudiantes</Text>
          <Text style={styles.ideaDescription}>
            Los martes y jueves hay baja afluencia entre 4-7pm. Un descuento
            especial para estudiantes con credencial puede duplicar tus ventas en
            ese horario y crear hábito de visita.
          </Text>
        </View>

        {/* Sección 2: Análisis de IA */}
        <View style={styles.aiBanner}>
          <Text style={styles.aiBannerTitle}>🤖 La IA analizará tu negocio</Text>
          <Text style={styles.aiBannerText}>
            Describe tu objetivo o situación. Mientras más contexto das, mejores
            resultados obtendrás.
          </Text>
        </View>

        {/* Formulario */}
        <Text style={styles.sectionLabel}>¿Qué quieres lograr?</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          value={objetivo}
          onChangeText={setObjetivo}
          textAlignVertical="top"
        />

        <Text style={styles.sectionLabel}>O elige una situación:</Text>
        {situaciones.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.situacionButton,
              situacionSeleccionada === item.id && styles.situacionSeleccionada,
            ]}
            onPress={() => setSituacionSeleccionada(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.situacionIcon}>{item.icon}</Text>
            <Text style={[
                styles.situacionLabel,
                situacionSeleccionada === item.id && styles.situacionLabelSeleccionada
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionLabel}>Fecha objetivo (opcional)</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setMostrarCalendario(true)}
          activeOpacity={0.7}
        >
          <Text style={[styles.dateText, !fechaSeleccionada && styles.datePlaceholder]}>
            {fechaSeleccionada ? formatearFecha(fecha) : 'dd/mm/aaaa'}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#333" />
        </TouchableOpacity>

        {mostrarCalendario && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            onChange={onChangeFecha}
          />
        )}

      </ScrollView>

      {/* Botón de acción principal fijo abajo */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => navigation.navigate('CargandoScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>🚀 Generar post completo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 40 : 20, // Manejo del status bar sin SafeAreaView
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000033',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  ideaContainer: {
    marginBottom: 24,
    marginTop: 10,
  },
  badgeContainer: {
    backgroundColor: '#FFF0E6',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  badgeText: {
    color: '#FF5722',
    fontWeight: '600',
    fontSize: 12,
  },
  ideaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000033',
    marginBottom: 8,
  },
  ideaDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  aiBanner: {
    backgroundColor: '#F3EFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  aiBannerTitle: {
    color: '#6B4EFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
  },
  aiBannerText: {
    color: '#555',
    fontSize: 13,
    lineHeight: 18,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#333',
    minHeight: 100,
    marginBottom: 20,
  },
  situacionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  situacionSeleccionada: {
    borderColor: '#6B4EFF',
    backgroundColor: '#F9F8FF',
  },
  situacionIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  situacionLabel: {
    fontSize: 14,
    color: '#333',
  },
  situacionLabelSeleccionada: {
    color: '#6B4EFF',
    fontWeight: '500',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 15,
    color: '#333',
  },
  datePlaceholder: {
    color: '#999',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
  },
  submitButton: {
    backgroundColor: '#6B4EFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});