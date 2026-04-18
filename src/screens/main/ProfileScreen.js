import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
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


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- HEADER AZUL --- */}

        <View style={styles.header}>

          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}></Text>
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.businessName}>{userData?.negocio || userData?.nombre || 'Usuario'}</Text>
              <Text style={styles.location}>{businessData?.negocio || 'Negocio'} - {businessData?.ubicacion || 'Ubicación'}</Text>
              <View style={styles.planBadge}>
                <Text style={styles.planText}>Plan Gratuito</Text>
              </View>
            </View>
          </View>

          {/* Estadísticas: todas salen de la base de datos*/}
          <View style={styles.statsRow}>
            <StatItem value="#" label="Posts creados" />
            <StatItem value="#" label="Estrategias" />
            <StatItem value="#" label="Engagement promedio" />
          </View>
        </View>

        {/* --- SECCIONES DE MENÚ --- */}
        <View style={styles.menuContainer}>
          <MenuItem icon="business-outline" label="Mi negocio" />
          <MenuItem icon="person-outline" label="Cuenta" />
          <MenuItem icon="notifications-outline" label="Notificaciones" />

          <Text style={styles.sectionHeader}>HERRAMIENTAS IA</Text>
          <MenuItem icon="chatbubble-ellipses-outline" label="Evaluador de contenido" />
          <MenuItem icon="bar-chart-outline" label="Analytics" isComingSoon />

          <Text style={styles.sectionHeader}>OTROS</Text>
          <MenuItem><View style={styles.topActions}>
            <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('SettingsScreen')}>
              <Ionicons name="settings-outline" size={18} color="white" />
              <Text style={styles.settingsText}>Ajustes</Text>
            </TouchableOpacity>
          </View></MenuItem>

          <MenuItem icon="star-outline" label="Calificar la app" />
          <MenuItem icon="log-out-outline" label="Cerrar sesión" isLast color="#E74C3C" onPress={handleLogOut}/>
        </View>
      </ScrollView>
    </View>
  );
}

// Sub-componentes para limpieza de código
const StatItem = ({ value, label }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const MenuItem = ({ icon, label, isComingSoon, isLast, color = "#1A1A1A", onPress }) => (
  <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={icon} size={22} color={color === "#1A1A1A" ? "#6C5CE7" : color} />
      <Text style={[styles.menuItemLabel, { color }]}>{label}</Text>
    </View>
    <View style={styles.menuItemRight}>
      {isComingSoon && (
        <View style={styles.soonBadge}>
          <Text style={styles.soonText}>Pronto</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={18} color="#CCC" />
    </View>
  </TouchableOpacity>
);

const TabItem = ({ icon, label, active }) => (
  <TouchableOpacity style={styles.tabItem}>
    <Ionicons name={icon} size={24} color={active ? "#6C5CE7" : "#8E8E93"} />
    <Text style={[styles.tabLabel, active && { color: "#6C5CE7" }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  header: {
    backgroundColor: '#5E5CE6',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topActions: { alignItems: 'flex-end' },
  settingsButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  settingsText: { color: 'white', marginLeft: 5, fontWeight: '600' },
  profileInfo: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  profileTextContainer: { marginLeft: 15 },
  businessName: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  location: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginVertical: 4 },
  planBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  planText: { color: 'white', fontSize: 12, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  statBox: { alignItems: 'center' },
  statValue: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 },

  menuContainer: { padding: 20 },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A4A4A',
    marginTop: 25,
    marginBottom: 10
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 15,
    marginBottom: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemLabel: { marginLeft: 15, fontSize: 16, fontWeight: '500' },
  menuItemRight: { flexDirection: 'row', alignItems: 'center' },
  soonBadge: {
    backgroundColor: '#EEEAFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 10,
  },
  soonText: { color: '#6C5CE7', fontSize: 12, fontWeight: 'bold' },

  tabBar: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 12, color: '#8E8E93', marginTop: 4 },
  fabContainer: {
    top: -20,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});