import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  Switch, 
  Share,
  ScrollView,
  StatusBar,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 1. Importamos la navegación

export default function PostPreviewScreen() {
  const navigation = useNavigation(); // 2. Inicializamos navigation

  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [aiModalVisible, setAiModalVisible] = useState(false);
  
  // Estado para la programación
  const [selectedDate, setSelectedDate] = useState('2025-04-09');
  const [selectedTime, setSelectedTime] = useState('2:00 PM');
  const [selectedNetwork, setSelectedNetwork] = useState('Instagram');
  const [reminderEnabled, setReminderEnabled] = useState(true);

  // Estado para la retroalimentación de la IA
  const [aiFeedback, setAiFeedback] = useState('');

  const captionText = '¿Estudiando para los parciales? 📚☕ ¡Tu zona de estudio perfecta está aquí! WiFi, enchufes y café desde $35 🎓 #CaféEstudio #Universitarios #Querétaro';

  // Función nativa para abrir el intent de compartir (Foto + Texto)
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${captionText}\n\n¡Mira esta zona de estudio perfecta en cafeteria_el_rincon! ☕📚`,
        url: 'https://ejemplo.com/publicacion-cafeteria' 
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Compartido con una actividad específica
        } else {
          // Compartido
        }
      } else if (result.action === Share.dismissedAction) {
        // Cancelado
      }
    } catch (error) {
      console.error('Error al compartir:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        {/* 3. Lógica del botón de retroceso */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Inicio', { screen: 'HomeMain' });
            }
          }}
        >
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vista previa</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Así se verá en Instagram</Text>

        {/* Post Card */}
        <View style={styles.postCard}>
          {/* Post Header */}
          <View style={styles.postHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>CE</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username}>cafeteria_el_rincon</Text>
              <Text style={styles.location}>Juriquilla, Querétaro</Text>
            </View>
            <Text style={styles.moreIcon}>•••</Text>
          </View>

          {/* Post Image Mock */}
          <View style={styles.imageMock}>
            <Image source={require('../../../assets/images/Imagen.jpg')} style={styles.postImage} resizeMode="cover"/>
          </View>

          {/* Post Actions */}
          <View style={styles.postActions}>
            <View style={styles.leftActions}>
              <Text style={styles.actionIcon}>🤍</Text>
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionIcon}>🔗</Text>
            </View>
            <Text style={styles.actionIcon}>🔖</Text>
          </View>

          {/* Caption */}
          <View style={styles.captionContainer}>
            {/* Se juntó para evitar espacios vacíos interpretados como texto */}
            <Text style={styles.captionText}>
              <Text style={styles.captionUser}>cafeteria_el_rincon </Text>
              {captionText}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setScheduleModalVisible(true)}
          >
            <Text style={styles.primaryButtonText}>📅 Programar publicación</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setAiModalVisible(true)}
          >
            <Text style={styles.secondaryButtonText}>🤖 Evaluar con IA</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.shareOptionButton}
            onPress={onShare}
          >
            <Text style={styles.shareOptionText}>📤 Compartir publicación completa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.draftButton}>
            <Text style={styles.draftButtonText}>Guardar como borrador</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL: Programar Publicación */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={scheduleModalVisible}
        onRequestClose={() => setScheduleModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setScheduleModalVisible(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              <View style={styles.dragIndicator} />
              <Text style={styles.modalTitle}>📅 Programar publicación</Text>

              <Text style={styles.inputLabel}>Fecha</Text>
              <TouchableOpacity style={styles.inputBox}>
                <Text style={styles.inputText}>{selectedDate}</Text>
                <Text style={styles.calendarIcon}>📅</Text>
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Hora</Text>
              <View style={styles.chipsRow}>
                {['2:00 PM', '6:00 PM', '8:00 AM'].map(time => (
                  <TouchableOpacity 
                    key={time} 
                    style={[styles.chip, selectedTime === time && styles.chipSelected]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[styles.chipText, selectedTime === time && styles.chipTextSelected]}>
                      {time + (time === '2:00 PM' || time === '6:00 PM' ? ' ⭐' : '')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.aiRecommendationText}>⭐ Horario recomendado por la IA</Text>

              <Text style={styles.inputLabel}>Red social</Text>
              <View style={styles.chipsRow}>
                {['Instagram', 'Facebook', 'TikTok'].map(network => (
                  <TouchableOpacity 
                    key={network} 
                    style={[styles.chip, selectedNetwork === network && styles.chipSelected]}
                    onPress={() => setSelectedNetwork(network)}
                  >
                    {/* Se concatenó en una sola línea para evitar el error de texto en React Native */}
                    <Text style={[styles.chipText, selectedNetwork === network && styles.chipTextSelected]}>
                      {(network === 'Instagram' ? '📷 ' : network === 'Facebook' ? '👍 ' : '🎵 ') + network}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Recordatorio 30 min antes</Text>
                <Switch
                  trackColor={{ false: "#CBD5E1", true: "#8B5CF6" }}
                  thumbColor={"#FFFFFF"}
                  value={reminderEnabled}
                  onValueChange={setReminderEnabled}
                />
              </View>

              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={() => setScheduleModalVisible(false)}
              >
                <Text style={styles.confirmButtonText}>Confirmar programación</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      {/* MODAL: Evaluar con IA */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={aiModalVisible}
        onRequestClose={() => setAiModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setAiModalVisible(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              <View style={styles.dragIndicator} />
              <Text style={styles.modalTitle}>🤖 Evaluar con IA</Text>
              {/* Texto en una sola línea en el código fuente para evitar saltos de línea rebeldes */}
              <Text style={{color: '#64748B', marginBottom: 15}}>Describe los cambios o correcciones que te gustaría aplicar a la publicación para mejorarla.</Text>
              
              <TextInput
                style={styles.feedbackInput}
                multiline
                numberOfLines={4}
                placeholder="Ej: Haz el texto más formal, o cambia la foto..."
                value={aiFeedback}
                onChangeText={setAiFeedback}
              />
              
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={() => setAiModalVisible(false)}
              >
                <Text style={styles.confirmButtonText}>Enviar retroalimentación</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  iconText: {
    fontSize: 18,
    color: '#0F172A',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 15,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#6D28D9',
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
    color: '#0F172A',
  },
  location: {
    fontSize: 12,
    color: '#64748B',
  },
  moreIcon: {
    color: '#64748B',
    fontSize: 18,
  },
  imageMock: {
    height: 250,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coffeeEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  imageMockText: {
    color: '#475569',
    fontWeight: '500',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionIcon: {
    fontSize: 20,
  },
  captionContainer: {
    paddingHorizontal: 12,
    paddingBottom: 15,
  },
  captionText: {
    color: '#334155',
    lineHeight: 20,
  },
  captionUser: {
    fontWeight: 'bold',
    color: '#0F172A',
  },
  buttonsContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#6D28D9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#6D28D9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shareOptionButton: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
  },
  shareOptionText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 16,
  },
  draftButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  draftButtonText: {
    color: '#64748B',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  inputText: {
    color: '#0F172A',
    fontSize: 16,
  },
  calendarIcon: {
    fontSize: 16,
    color: '#475569',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 5,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F5F3FF',
  },
  chipText: {
    color: '#475569',
  },
  chipTextSelected: {
    color: '#6D28D9',
    fontWeight: 'bold',
  },
  aiRecommendationText: {
    fontSize: 12,
    color: '#8B5CF6',
    marginBottom: 20,
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    color: '#0F172A',
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageMock: {
    height: 250,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // <-- Agrega esto para que la imagen respete los bordes si los tuviera
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
});