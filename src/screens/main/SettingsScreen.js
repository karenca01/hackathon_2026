import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ajustes</Text>
                <View style={{ width: 24 }} /> {/* Espaciador para centrar el título */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- SECCIÓN: PREFERENCIAS --- */}
                <Text style={styles.sectionTitle}>PREFERENCIAS</Text>
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
                    label="Estilo de contenido por defecto"
                    iconColor="#FFB703"
                />

                {/* --- SECCIÓN: DATOS --- */}
                <Text style={styles.sectionTitle}>DATOS</Text>
                <SettingItem
                    icon="save-outline"
                    label="Exportar mis datos"
                    iconColor="#7209B7"
                />
                <SettingItem
                    icon="lock-closed-outline"
                    label="Privacidad y datos"
                    iconColor="#4361EE"
                />

                {/* --- SECCIÓN: SOPORTE --- */}
                <Text style={styles.sectionTitle}>SOPORTE</Text>
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
                    hideChevron
                />

            </ScrollView>
        </SafeAreaView>
    );
}

// Componente reutilizable para cada fila de ajuste
const SettingItem = ({ icon, label, value, iconColor, hideChevron, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <View style={styles.itemLeft}>
            <View style={[styles.iconWrapper, { backgroundColor: iconColor + '15' }]}>
                <Ionicons name={icon} size={20} color={iconColor} />
            </View>
            <Text style={styles.itemLabel}>{label}</Text>
        </View>

        <View style={styles.itemRight}>
            {value && <Text style={styles.itemValue}>{value}</Text>}
            {!hideChevron && (
                <Ionicons name="chevron-forward" size={18} color="#C7C7CC" style={{ marginLeft: 8 }} />
            )}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    backButton: {
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#A0A0B0',
        marginTop: 25,
        marginBottom: 10,
        letterSpacing: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    itemLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemValue: {
        fontSize: 14,
        color: '#A0A0B0',
    },
});