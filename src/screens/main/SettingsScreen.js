import React, {useEffect}  from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {

    useEffect(() => {
        const parent = navigation.getParent();
            
            if (parent) {
                // Oculta el tab bar al entrar a la pantalla
                parent.setOptions({
                    tabBarStyle: { display: 'none' },
                });
            }
    
            return () => {
                if (parent) {
                    // Restaura los estilos originales del tab bar al salir de la pantalla
                    parent.setOptions({
                        tabBarStyle: {
                            display: 'flex',
                            backgroundColor: '#FFFFFF',
                            borderTopWidth: 0,
                            elevation: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -3 },
                            shadowOpacity: 0.08,
                            shadowRadius: 10,
                            height: 65,
                            paddingBottom: 10,
                            paddingTop: 8,
                        },
                    });
                }
            };
        }, [navigation]);
  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajustes</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

        <Text style={styles.sectionTitle}>PREFERENCIAS</Text>
        <View style={styles.card}>
          <SettingItem
            icon="globe-outline"
            label="Idioma"
            value="Español"
            iconColor="#4CC9F0"
          />
          <SettingItem
            icon="color-palette-outline"
            label="Tema"
            value="Sistema"
            iconColor="#F72585"
          />
          <SettingItem
            icon="pencil-outline"
            label="Estilo de contenido"
            iconColor="#FFB703"
            isLast={true}
          />
        </View>

        <Text style={styles.sectionTitle}>DATOS</Text>
        <View style={styles.card}>
          <SettingItem
            icon="save-outline"
            label="Exportar mis datos"
            iconColor="#7209B7"
          />
          <SettingItem
            icon="lock-closed-outline"
            label="Privacidad y datos"
            iconColor="#4361EE"
            isLast={true}
          />
        </View>

        <Text style={styles.sectionTitle}>SOPORTE</Text>
        <View style={styles.card}>
          <SettingItem
            icon="help-circle-outline"
            label="Centro de ayuda"
            iconColor="#F94144"
          />
          <SettingItem
            icon="chatbubbles-outline"
            label="Contactar soporte"
            iconColor="#5E5CE6"
          />
          <SettingItem
            icon="information-circle-outline"
            label="Versión 1.0.0"
            value="Build 42"
            iconColor="#4895EF"
            hideChevron={true}
            isLast={true}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-componente refactorizado
const SettingItem = ({ icon, label, value, iconColor, hideChevron, onPress, isLast }) => (
  <TouchableOpacity 
    style={[styles.itemContainer, isLast && styles.itemContainerLast]} 
    onPress={onPress}
    disabled={!onPress && hideChevron}
  >
    <View style={styles.itemLeft}>
      <View style={[styles.iconWrapper, { backgroundColor: iconColor + '15' }]}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <Text style={styles.itemLabel}>{label}</Text>
    </View>

    <View style={styles.itemRight}>
      {value ? <Text style={styles.itemValue}>{value}</Text> : null}
      {!hideChevron ? (
        <Ionicons name="chevron-forward" size={18} color="#C7C7CC" style={{ marginLeft: 8 }} />
      ) : null}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Header background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE', // Fondo gris claro para resaltar las tarjetas
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6E6E73',
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  itemContainerLast: {
    borderBottomWidth: 0, // Remueve la línea en el último elemento
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemLabel: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
});