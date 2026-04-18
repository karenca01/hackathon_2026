import React, { useState, useCallback } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import sessionStore from '../../services/sesion';
import { quickGen } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [idea, setIdea] = useState('');
  const [resp, setResp] = useState(null);
  const navigation = useNavigation(); // <-- 1. Agregamos la navegación al HomeScreen
  const [userData, setUserData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [ isVisible, setIsVisible ] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProfile = async () => {
        try {
          const data = await sessionStore.getUserData();
          if (!isActive) return;
          setUserData(data);

          if (data?._id) {
            const bData = await getBusiness(data._id);
            if (!isActive) return;
            setBusinessData(bData);
          }
        } catch (error) {
          console.error('Error cargando perfil:', error);
        }
      };
    }, [])
  );

  const handleQuickGen = async () => {
    const answer = await quickGen(idea);
    setResp(answer);
    setIsVisible(true);
  }

  const getTagStyle = (tag) => {
    switch (tag) {
      case 'Tendencia':
        return { backgroundColor: '#FFE4E6', color: '#E11D48' };
      case 'Promoción':
        return { backgroundColor: '#DCFCE7', color: '#16A34A' };
      case 'Temporada':
        return { backgroundColor: '#FEF3C7', color: '#D97706' };
      default:
        return { backgroundColor: '#E0E7FF', color: '#6C63FF' };
    }
  };

  return (
    <View style={styles.container}>
      
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{businessData?.negocio || 'Negocio'}</Text>

        <View style={styles.headerRight}>

          {/* 2. Envolvemos la campana en un TouchableOpacity con su onPress */}
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
            <FontAwesome6 name="bell" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Text style={styles.avatarText}>U</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>✨ GENERACIÓN RÁPIDA</Text>

          <Text style={styles.heroTitle}>
            ¿Qué quieres lograr esta semana?
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej: Quiero atraer más clientes el martes..."
            placeholderTextColor="#D1CFFF"
            value={idea}
            onChangeText={setIdea}
          />

          <TouchableOpacity style={styles.button} onPress={handleQuickGen}>
            <Text style={styles.buttonText}>⚡ Generar con IA</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsVisible(false)}
        >
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setIsVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.title}>{idea}</Text>
              <Text>{resp?.texto || "Pensando..."}</Text>
              <Button title="Close" onPress={() => setIsVisible(false)} />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* STATS */}
        <Text style={styles.sectionTitle}>Esta semana</Text>

        <View style={styles.statsContainer}>
          <StatCard value="5" label="Posts publicados" change="+2 vs semana pasada" />
          <StatCard value="4.2%" label="Engagement" change="+0.8 vs semana pasada" />
          <StatCard value="128" label="Nuevos seguidores" change="+34 vs semana pasada" />
        </View>

        {/* LISTA */}
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitleDark}>Próximas publicaciones</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
            <Text style={styles.link}>Ver todo</Text>
          </TouchableOpacity>
          
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('VistaPreviaScreen')}>
          <PostItem
            emoji="☕"
            title="Promoción 2x1 café"
            subtitle="Hoy, 2:00 PM - Instagram"
            status="Borrador"
            statusStyle={styles.draft}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VistaPreviaScreen')}>
          <PostItem
            emoji="⭐"
            title="Historia de estudiantes"
            subtitle="Mñn., 9:00 AM - Instagram"
            status="Listo"
            statusStyle={styles.ready}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VistaPreviaScreen')}>
          <PostItem
            emoji="👍"
            title="Jueves de 20% de desc."
            subtitle="Juev., 1:00 PM - Instagram"
            status="Listo"
            statusStyle={styles.ready}
          />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Sugerencias del día</Text>
        <View style={styles.suggestionsContainer}>
          <SuggestionCard
            tag="Tendencia"
            title="Reel con café aesthetic"
            description="Graba el proceso..."
            getTagStyle={getTagStyle}
          />
          <SuggestionCard
            tag="Promoción"
            title="2x1 en bebidas frías"
            description="Publica una promo limitada por calor para aumentar visitas en horas pico."
            getTagStyle={getTagStyle}
          />
        </View>
      </ScrollView>
    </View>
  );
}

/* COMPONENTES */

const StatCard = ({ value, label, change }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statChange}>{change}</Text>
  </View>
);

const PostItem = ({ emoji, title, subtitle, status, statusStyle }) => (
  <View style={styles.postItem}>
    <View style={styles.postLeft}>
      <Text style={styles.postEmoji}>{emoji}</Text>
      <View>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postSubtitle}>{subtitle}</Text>
      </View>
    </View>

    <View style={[styles.statusBadge, statusStyle]}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  </View>
);

const SuggestionCard = ({ tag, title, description, getTagStyle }) => {
  const colors = getTagStyle(tag);
  const navigation = useNavigation();

  return (
    <View style={styles.suggestionCard}>

      {/* TAG */}
      <View style={[styles.tag, { backgroundColor: colors.backgroundColor }]}>
        <Text style={[styles.tagText, { color: colors.color }]}>
          {tag}
        </Text>
      </View>

      {/* CONTENIDO */}
      <Text style={styles.suggestionTitle} numberOfLines={2}>
        {title}
      </Text>

      <Text
        style={styles.suggestionDescription}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {description}
      </Text>

      {/* BOTÓN */}
      <TouchableOpacity
        style={styles.useButton}
        onPress={() => navigation.navigate('DetalleIdeaScreen')}
      >
        <Text style={styles.useButtonText}>Ver idea</Text>
      </TouchableOpacity>
    </View>
  );
};

/* ESTILOS */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4FF',
  },
  content: {
    padding: 20,
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#F5F4FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15, // <-- Aumenté un poco el gap de 10 a 15 para que la campana y el avatar no estén tan pegados
  },

  icon: {
    fontSize: 18,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* HERO */
  heroCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#6C63FF',
  },

  heroLabel: {
    color: '#EDEBFF',
    fontSize: 12,
    marginBottom: 6,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  input: {
    backgroundColor: '#7D74FF',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#6C63FF',
    fontWeight: '700',
  },

  /* STATS */
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    width: '31%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },

  statLabel: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },

  statChange: {
    fontSize: 11,
    color: 'green',
    textAlign: 'center',
  },

  /* LIST */
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sectionTitleDark: {
    fontSize: 16,
    fontWeight: '700',
  },

  link: {
    color: '#6C63FF',
  },

  postItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  postLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  postEmoji: {
    fontSize: 24,
  },

  postTitle: {
    fontWeight: '600',
  },

  postSubtitle: {
    fontSize: 12,
    color: '#777',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // SUGERENCIAS
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  suggestionCard: {
    backgroundColor: '#fff',
    maxWidth: 230,
    maxHeight: 250,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    width: '48%',
    height: 200,
    justifyContent: 'space-between',
  },

  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },

  tagText: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '600',
  },

  suggestionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },

  suggestionDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },

  useButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  useButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  draft: {
    backgroundColor: '#FFE7C2',
  },

  ready: {
    backgroundColor: '#D4F5E9',
  },
});