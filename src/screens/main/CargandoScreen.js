import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CargandoScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Textos dinámicos según el paso actual
  const subtitles = [
    "Identificando tu audiencia...",
    "Buscando tendencias relevantes...",
    "Preparando tu plan de contenido...",
    "¡Todo listo!"
  ];

  useEffect(() => {
    // 1. Animación suave de la barra de progreso de 0 a 100% durante 6 segundos
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 6000,
      useNativeDriver: false, // false porque estamos animando el 'width'
    }).start();

    // 2. Temporizadores para cambiar el estado de las palomitas
    const t1 = setTimeout(() => setStep(1), 2000); // A los 2 segundos
    const t2 = setTimeout(() => setStep(2), 4000); // A los 4 segundos
    
    // 3. Temporizador final para completar y navegar
    const t3 = setTimeout(() => {
      setStep(3); // Marca todo como completado
      
      // Espera medio segundo extra para que el usuario vea el 100% completado
      setTimeout(() => {
        // Usamos replace en lugar de navigate para que no pueda volver con el botón "Atrás"
        navigation.replace('VistaPreviaScreen'); 
      }, 500);

    }, 6000); // A los 6 segundos

    // Limpieza de temporizadores si el componente se desmonta antes de tiempo
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigation, progressAnim]);

  // Interpolación para convertir el valor animado (0-100) en porcentaje de ancho ('0%' a '100%')
  const barWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.content}>
        
        {/* Logo Superior */}
        <View style={styles.logoContainer}>
          <Ionicons name="layers" size={40} color="#6C5CE7" />
        </View>

        {/* Textos Principales */}
        <Text style={styles.title}>Analizando tu negocio</Text>
        <Text style={styles.subtitle}>{subtitles[step]}</Text>

        {/* Barra de Progreso */}
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBarFill, { width: barWidth }]} />
        </View>

        {/* Lista de Tareas (Checklist) */}
        <View style={styles.checklistContainer}>
          
          {/* Item 1 */}
          <ChecklistItem 
            status={step >= 1 ? 'done' : 'active'}
            textPending="Analizando perfil de negocio..."
            textDone="Perfil de negocio analizado"
          />

          {/* Item 2 */}
          <ChecklistItem 
            status={step >= 2 ? 'done' : (step === 1 ? 'active' : 'pending')}
            textPending="Buscando tendencias relevantes..."
            textDone="Tendencias identificadas"
          />

          {/* Item 3 */}
          <ChecklistItem 
            status={step >= 3 ? 'done' : (step === 2 ? 'active' : 'pending')}
            textPending="Generando estrategia personalizada"
            textDone="¡Estrategia generada!"
          />

        </View>
      </View>
    </SafeAreaView>
  );
}

// --- Sub-componente para cada elemento de la lista ---
const ChecklistItem = ({ status, textPending, textDone }) => {
  const isDone = status === 'done';
  const isActive = status === 'active';

  // Lógica visual basada en el estado
  const containerStyle = [
    styles.checkItem,
    isDone && styles.checkItemDone,
    !isDone && !isActive && styles.checkItemPending // Opacidad reducida si aún no llegamos ahí
  ];

  return (
    <View style={containerStyle}>
      <Ionicons 
        name={isDone ? 'checkbox' : 'hourglass-outline'} 
        size={22} 
        color={isDone ? '#22C55E' : (isActive ? '#6C5CE7' : '#D1D5DB')} 
      />
      <Text style={[
        styles.checkText, 
        isDone ? styles.checkTextDone : (isActive ? styles.checkTextActive : styles.checkTextPending)
      ]}>
        {isDone ? textDone : textPending}
      </Text>
    </View>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: '#F0EFFF', // Morado muy claro
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 30,
    height: 20, // Altura fija para que no brinque el diseño al cambiar de texto
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 40,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A020F0', // Morado intenso de la barra
    borderRadius: 3,
  },
  checklistContainer: {
    width: '100%',
    gap: 12, // Espacio entre elementos (Requiere React Native >= 0.71)
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  checkItemDone: {
    backgroundColor: '#F0FDF4', // Fondo verde muy claro
    borderColor: '#DCFCE7', // Borde verde
  },
  checkItemPending: {
    opacity: 0.6,
  },
  checkText: {
    fontSize: 14,
    marginLeft: 12,
    fontWeight: '500',
  },
  checkTextDone: {
    color: '#16A34A', // Verde texto
  },
  checkTextActive: {
    color: '#4B5563', // Gris oscuro
  },
  checkTextPending: {
    color: '#9CA3AF', // Gris claro
  },
});