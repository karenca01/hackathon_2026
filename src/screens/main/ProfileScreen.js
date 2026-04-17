import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const MENU_ITEMS = [
  { emoji: '🔔', label: 'Notificaciones' },
  { emoji: '🔒', label: 'Privacidad' },
  { emoji: '🎨', label: 'Apariencia' },
  { emoji: '❓', label: 'Ayuda' },
  { emoji: '🚪', label: 'Cerrar sesión' },
];

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar & Name */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <Text style={styles.name}>Usuario</Text>
          <Text style={styles.email}>usuario@correo.com</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { value: '12', label: 'Ideas' },
            { value: '5', label: 'Eventos' },
            { value: '3', label: 'Tareas' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, idx < MENU_ITEMS.length - 1 && styles.menuItemBorder]}
              onPress={item.label === 'Cerrar sesión' ? handleLogout : undefined}
            >
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <Text style={[styles.menuLabel, item.label === 'Cerrar sesión' && styles.logoutText]}>
                {item.label}
              </Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    color: '#9E9E9E',
    fontSize: 14,
    marginBottom: 16,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#6C63FF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  editBtnText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A3E',
  },
  statValue: {
    color: '#6C63FF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#9E9E9E',
    fontSize: 12,
  },
  menuCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2A2A3E',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A3E',
  },
  menuEmoji: {
    fontSize: 20,
  },
  menuLabel: {
    flex: 1,
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: '500',
  },
  logoutText: {
    color: '#FF6584',
  },
  menuArrow: {
    color: '#9E9E9E',
    fontSize: 20,
  },
});
