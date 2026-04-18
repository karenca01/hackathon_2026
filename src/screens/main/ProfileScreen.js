import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import sessionStore from '../../services/sesion';
import { getBusiness } from '../../services/api';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [businessData, setBusinessData] = useState(null);

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

      loadProfile();
      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleLogOut = async () => {
    await sessionStore.clearSession();
    const rootNavigation = navigation.getParent()?.getParent();
    if (rootNavigation) {
      rootNavigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
    }
  };

  // Función para obtener iniciales (ej. "Cafetería El Rincón" -> "CE")
  const getInitials = (name) => {
    if (!name) return 'US';
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const userName = userData?.nombre || 'Cafetería El Rincón';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          
          {/* --- HEADER AZUL --- */}
          <View style={styles.header}>
            
            {/* Botón de Ajustes en la parte superior derecha */}
            <View style={styles.topActions}>
              <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('SettingsScreen')}>
                <Ionicons name="settings-outline" size={16} color="white" />
                <Text style={styles.settingsText}>Ajustes</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>📸</Text>
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.businessName}>{userData?.negocio || userData?.nombre || 'Usuario'}</Text>
                <Text style={styles.location}>{businessData?.negocio || 'Negocio'} - {businessData?.ubicacion || 'Ubicación'}</Text>
                <View style={styles.planBadge}>
                  <Text style={styles.planText}>Plan Gratuito</Text>
                </View>
              </View>
            </View>

            {/* Estadísticas */}
            <View style={styles.statsRow}>
              <StatItem value="23" label="Posts creados" />
              <StatItem value="8" label="Estrategias" />
              <StatItem value="4.1%" label="Eng. promedio" />
            </View>
          </View>

          {/* --- SECCIONES DE MENÚ --- */}
          <View style={styles.menuContainer}>
            
            <Text style={styles.sectionHeader}>MI CUENTA</Text>
            <MenuGroup>
              <MenuItem icon="storefront" iconColor="#FF6B6B" label="Mi negocio" />
              <MenuItem icon="person" iconColor="#5F27CD" label="Cuenta" />
              <MenuItem icon="notifications" iconColor="#FEEAA" label="Notificaciones" isLast />
            </MenuGroup>

            <Text style={styles.sectionHeader}>HERRAMIENTAS IA</Text>
            <MenuGroup>
              <MenuItem icon="hardware-chip" iconColor="#9B59B6" label="Evaluador de contenido" />
              <MenuItem icon="bar-chart" iconColor="#1ABC9C" label="Analytics" isComingSoon isLast />
            </MenuGroup>

            <Text style={styles.sectionHeader}>OTROS</Text>
            <MenuGroup>
              <MenuItem icon="settings" iconColor="#95A5A6" label="Ajustes generales" onPress={() => navigation.navigate('SettingsScreen')} />
              <MenuItem icon="star" iconColor="#F1C40F" label="Calificar la app" />
              <MenuItem icon="log-out" iconColor="#E74C3C" label="Cerrar sesión" isLast onPress={handleLogOut} />
            </MenuGroup>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// --- SUB-COMPONENTES ---

const StatItem = ({ value, label }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const MenuGroup = ({ children }) => (
  <View style={styles.menuGroup}>
    {children}
  </View>
);

const MenuItem = ({ icon, label, isComingSoon, isLast, iconColor, onPress }) => (
  <TouchableOpacity style={[styles.menuItem, isLast && styles.menuItemLast]} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={icon} size={22} color={iconColor || "#6C5CE7"} />
      <Text style={styles.menuItemLabel}>{label}</Text>
    </View>
    <View style={styles.menuItemRight}>
      {isComingSoon && (
        <View style={styles.soonBadge}>
          <Text style={styles.soonText}>Pronto</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={18} color="#C8C7CC" />
    </View>
  </TouchableOpacity>
);

// --- ESTILOS ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#5B4BFF', // Match top background for iOS notch
  },
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FE' 
  },
  header: {
    backgroundColor: '#5B4BFF',
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingHorizontal: 20,
    paddingBottom: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  topActions: { 
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  settingsButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  settingsText: { 
    color: 'white', 
    marginLeft: 6, 
    fontWeight: '700',
    fontSize: 13,
  },
  profileInfo: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: { 
    color: 'white', 
    fontSize: 28, 
    fontWeight: 'bold' 
  },
  profileTextContainer: { 
    marginLeft: 15,
    flex: 1,
  },
  businessName: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 2,
  },
  location: { 
    color: 'rgba(255,255,255,0.85)', 
    fontSize: 13, 
    marginBottom: 8 
  },
  planBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  planText: { 
    color: 'white', 
    fontSize: 12, 
    fontWeight: '700' 
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
    paddingHorizontal: 10,
  },
  statBox: { 
    alignItems: 'center' 
  },
  statValue: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: '800' 
  },
  statLabel: { 
    color: 'rgba(255,255,255,0.8)', 
    fontSize: 12, 
    marginTop: 4,
    fontWeight: '500'
  },
  menuContainer: { 
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6E6E73',
    marginTop: 25,
    marginBottom: 12,
    marginLeft: 5,
    letterSpacing: 0.5,
  },
  menuGroup: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#F0F0F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  menuItemLabel: { 
    marginLeft: 15, 
    fontSize: 16, 
    fontWeight: '600',
    color: '#1A1A1A',
  },
  menuItemRight: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  soonBadge: {
    backgroundColor: '#F0EFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  soonText: { 
    color: '#5B4BFF', 
    fontSize: 11, 
    fontWeight: 'bold' 
  },
});