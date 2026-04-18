import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ─── Constantes de diseño ────────────────────────────────────────────────────
const PURPLE = '#5E5CE6';
const LIGHT_BG = '#F8F9FE';

// ─── Componentes auxiliares ──────────────────────────────────────────────────

/** Etiqueta de sección con línea divisoria */
const SectionHeader = ({ icon, title }) => (
    <View style={styles.sectionHeaderRow}>
        <View style={styles.sectionIconBox}>
            <Ionicons name={icon} size={18} color={PURPLE} />
        </View>
        <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
);

/** Campo de texto reutilizable */
const InputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    multiline = false,
    icon,
    maxLength,
}) => (
    <View style={styles.fieldWrapper}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={[styles.inputBox, multiline && styles.inputBoxMultiline]}>
            {icon && (
                <Ionicons
                    name={icon}
                    size={18}
                    color="#9E9E9E"
                    style={styles.inputIcon}
                />
            )}
            <TextInput
                style={[styles.input, multiline && styles.inputMultiline]}
                placeholder={placeholder}
                placeholderTextColor="#C2C2C2"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
                maxLength={maxLength}
                textAlignVertical={multiline ? 'top' : 'center'}
            />
        </View>
        {maxLength && (
            <Text style={styles.charCount}>
                {value.length}/{maxLength}
            </Text>
        )}
    </View>
);

/** Selector de categoría */
const CategoryChip = ({ label, selected, onPress }) => (
    <TouchableOpacity
        style={[styles.chip, selected && styles.chipSelected]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
            {label}
        </Text>
    </TouchableOpacity>
);

// ─── Datos estáticos ─────────────────────────────────────────────────────────
const CATEGORIES = [
    'Restaurante',
    'Retail',
    'Tecnología',
    'Salud',
    'Educación',
    'Servicios',
    'Moda',
    'Arte',
    'Deporte',
    'Otro',
];

// ─── Pantalla principal ───────────────────────────────────────────────────────
export default function InformacionRegistro({ navigation }) {
    // Información básica
    const [nombreNegocio, setNombreNegocio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [slogan, setSlogan] = useState('');

    // Contacto
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sitioWeb, setSitioWeb] = useState('');

    // Ubicación
    const [ciudad, setCiudad] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [direccion, setDireccion] = useState('');

    // Redes sociales
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [twitter, setTwitter] = useState('');

    const handleGuardar = () => {
        if (!nombreNegocio.trim() || !categoria) {
            Alert.alert(
                'Campos requeridos',
                'Por favor completa al menos el nombre del negocio y selecciona una categoría.',
            );
            return;
        }

        const datosNegocio = {
            nombreNegocio,
            descripcion,
            categoria,
            slogan,
            contacto: { email, telefono, sitioWeb },
            ubicacion: { ciudad, estado, pais, direccion },
            redesSociales: { instagram, facebook, tiktok, twitter },
        };

        console.log('Datos del negocio:', datosNegocio);
        // TODO: Guardar en base de datos / contexto global
        Alert.alert('¡Listo!', 'La información de tu negocio ha sido guardada.');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* ── Header ── */}
            <View style={styles.header}>
                {navigation && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>
                )}
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Mi Negocio</Text>
                    <Text style={styles.headerSubtitle}>
                        Completa la información de tu empresa
                    </Text>
                </View>
                <View style={styles.headerIconBox}>
                    <Ionicons name="business" size={26} color="white" />
                </View>
            </View>

            {/* ── Contenido ── */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* ─ Información básica ─ */}
                <View style={styles.card}>
                    <SectionHeader icon="storefront-outline" title="Información Básica" />

                    <InputField
                        label="Nombre del negocio *"
                        placeholder="Ej. Panadería El Sol"
                        value={nombreNegocio}
                        onChangeText={setNombreNegocio}
                        icon="business-outline"
                        maxLength={60}
                    />

                    <InputField
                        label="Slogan"
                        placeholder="Ej. El sabor que te alegra el día"
                        value={slogan}
                        onChangeText={setSlogan}
                        icon="sparkles-outline"
                        maxLength={80}
                    />

                    <InputField
                        label="Descripción"
                        placeholder="Cuéntanos qué hace tu negocio, a quién va dirigido y qué te hace especial…"
                        value={descripcion}
                        onChangeText={setDescripcion}
                        multiline
                        maxLength={300}
                    />

                    {/* Categoría */}
                    <Text style={styles.fieldLabel}>Categoría *</Text>
                    <View style={styles.chipsContainer}>
                        {CATEGORIES.map((cat) => (
                            <CategoryChip
                                key={cat}
                                label={cat}
                                selected={categoria === cat}
                                onPress={() => setCategoria(cat)}
                            />
                        ))}
                    </View>
                </View>

                {/* ─ Contacto ─ */}
                <View style={styles.card}>
                    <SectionHeader icon="call-outline" title="Contacto" />

                    <InputField
                        label="Correo electrónico"
                        placeholder="contacto@minegocio.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        icon="mail-outline"
                    />

                    <InputField
                        label="Teléfono"
                        placeholder="+52 000 000 0000"
                        value={telefono}
                        onChangeText={setTelefono}
                        keyboardType="phone-pad"
                        icon="call-outline"
                    />

                    <InputField
                        label="Sitio web"
                        placeholder="https://www.minegocio.com"
                        value={sitioWeb}
                        onChangeText={setSitioWeb}
                        keyboardType="url"
                        icon="globe-outline"
                    />
                </View>

                {/* ─ Ubicación ─ */}
                <View style={styles.card}>
                    <SectionHeader icon="location-outline" title="Ubicación" />

                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <InputField
                                label="Ciudad"
                                placeholder="Ciudad"
                                value={ciudad}
                                onChangeText={setCiudad}
                            />
                        </View>
                        <View style={styles.rowItemSpacer} />
                        <View style={styles.rowItem}>
                            <InputField
                                label="Estado"
                                placeholder="Estado"
                                value={estado}
                                onChangeText={setEstado}
                            />
                        </View>
                    </View>

                    <InputField
                        label="País"
                        placeholder="México"
                        value={pais}
                        onChangeText={setPais}
                        icon="flag-outline"
                    />

                    <InputField
                        label="Dirección"
                        placeholder="Calle, número, colonia…"
                        value={direccion}
                        onChangeText={setDireccion}
                        icon="map-outline"
                    />
                </View>

                {/* ─ Redes sociales ─ */}
                <View style={styles.card}>
                    <SectionHeader icon="share-social-outline" title="Redes Sociales" />

                    <InputField
                        label="Instagram"
                        placeholder="@minegocio"
                        value={instagram}
                        onChangeText={setInstagram}
                        icon="logo-instagram"
                    />

                    <InputField
                        label="Facebook"
                        placeholder="facebook.com/minegocio"
                        value={facebook}
                        onChangeText={setFacebook}
                        icon="logo-facebook"
                    />

                    <InputField
                        label="TikTok"
                        placeholder="@minegocio"
                        value={tiktok}
                        onChangeText={setTiktok}
                        icon="logo-tiktok"
                    />

                    <InputField
                        label="Twitter / X"
                        placeholder="@minegocio"
                        value={twitter}
                        onChangeText={setTwitter}
                        icon="logo-twitter"
                    />
                </View>

                {/* ─ Botón guardar ─ */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleGuardar}
                    activeOpacity={0.85}
                >
                    <Ionicons name="checkmark-circle-outline" size={22} color="white" />
                    <Text style={styles.saveButtonText}>Guardar información</Text>
                </TouchableOpacity>

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: PURPLE,
    },

    // Header
    header: {
        backgroundColor: PURPLE,
        paddingTop: 10,
        paddingBottom: 24,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 12,
        padding: 4,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '800',
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 13,
        marginTop: 2,
    },
    headerIconBox: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Scroll
    scrollView: {
        flex: 1,
        backgroundColor: LIGHT_BG,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },
    scrollContent: {
        padding: 18,
        paddingTop: 22,
    },

    // Card
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 18,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },

    // Section header
    sectionHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sectionIconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#EEEAFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A2E',
    },

    // Field
    fieldWrapper: {
        marginBottom: 14,
    },
    fieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4A4A4A',
        marginBottom: 6,
        marginLeft: 2,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FE',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E8E8F0',
        paddingHorizontal: 12,
        height: 48,
    },
    inputBoxMultiline: {
        height: 100,
        alignItems: 'flex-start',
        paddingTop: 12,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#1A1A2E',
    },
    inputMultiline: {
        flex: 1,
        fontSize: 15,
        color: '#1A1A2E',
    },
    charCount: {
        fontSize: 11,
        color: '#AAAAAA',
        textAlign: 'right',
        marginTop: 4,
        marginRight: 2,
    },

    // Chips de categoría
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
        marginBottom: 4,
    },
    chip: {
        borderWidth: 1.5,
        borderColor: '#E0E0F0',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#F8F9FE',
    },
    chipSelected: {
        backgroundColor: PURPLE,
        borderColor: PURPLE,
    },
    chipText: {
        fontSize: 13,
        color: '#777',
        fontWeight: '500',
    },
    chipTextSelected: {
        color: 'white',
        fontWeight: '700',
    },

    // Layout helpers
    row: {
        flexDirection: 'row',
    },
    rowItem: {
        flex: 1,
    },
    rowItemSpacer: {
        width: 10,
    },

    // Botón guardar
    saveButton: {
        backgroundColor: PURPLE,
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: PURPLE,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
        marginTop: 4,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },

    bottomSpacer: {
        height: 30,
    },
});
