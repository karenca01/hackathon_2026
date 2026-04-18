import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SectionList,
  StatusBar,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Datos de prueba estructurados para el SectionList
const NOTIFICATIONS_DATA = [
  {
    title: 'HOY',
    data: [
      {
        id: '1',
        title: 'Nueva estrategia generada',
        description: 'Tu plan "Zona de Estudio" está listo con 4 publicaciones para esta semana',
        time: 'Hace 2 horas',
        icon: '🤖',
        iconBgColor: '#6D28D9', // Morado
        isUnread: true,
      },
      {
        id: '2',
        title: 'Recordatorio de publicación',
        description: 'Tu post "Promo Happy Hour" se publica en 30 minutos',
        time: 'Hace 5 horas',
        icon: '⏰',
        iconBgColor: '#FDE047', // Amarillo
        isUnread: false,
      },
    ],
  },
  {
    title: 'AYER',
    data: [
      {
        id: '3',
        title: 'Tu post tuvo buen desempeño',
        description: '"Combo desayuno" alcanzó 1,240 personas (+38% vs tu promedio)',
        time: 'Ayer, 3:15 PM',
        icon: '📈',
        iconBgColor: '#A7F3D0', // Verde claro
        isUnread: false,
      },
    ],
  },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();

  // Componente para renderizar cada notificación individual
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem, 
        item.isUnread ? styles.unreadBackground : styles.readBackground
      ]}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor }]}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            // Evaluamos si venimos de otra pantalla (ej. Home) para regresar suavemente
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              // Si entramos por el Tab inferior, forzamos ir al Home principal
              navigation.navigate('Inicio', { screen: 'HomeMain' });
            }
          }}
        >
          <Text style={styles.iconBack}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Notificaciones</Text>
        
        {/* Espaciador para mantener el título centrado ya que quitamos "Leer todo" */}
        <View style={{ width: 40 }} /> 
      </View>

      {/* Lista de Notificaciones */}
      <SectionList
        sections={NOTIFICATIONS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false} // En Android a veces es mejor desactivarlo para un scroll más limpio si no es estrictamente necesario
      />
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
    marginBottom: 20,
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
  iconBack: {
    fontSize: 18,
    color: '#0F172A',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  listContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  unreadBackground: {
    backgroundColor: '#F3E8FF', // Morado muy claro para no leídos
  },
  readBackground: {
    backgroundColor: '#FFFFFF', // Blanco para leídos
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
});