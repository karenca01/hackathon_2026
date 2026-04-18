import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import { createBusiness } from '../../services/api';

export default function InformacionRegistro({ navigation }) {
    const [name, setName] = useState('');
    const [negocio, setNegocio] = useState('');
    const [productos, setProductos] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [valores, setValores] = useState('');
    const [impacto, setImpacto] = useState('');
    const [redes, setRedes] = useState('');
    const [vision, setVision] = useState('');
    const [metas, setMetas] = useState('');
    const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await sessionStore.getUserData();
      setUserData(data);
    };
    loadUserData();
  }, []);

    const handleSignUp = async () => {
        // Validación de campos vacíos
        if (!name || !negocio || !productos || !ubicacion || !descripcion ||
            !valores || !impacto || !redes || !vision || !metas) {
            Alert.alert('Atención', 'Por favor, completa todos los campos');
            return;
        }

        try {
            await createBusiness({
                nombre: name,
                negocio,
                productos,
                ubicacion,
                descripcion,
                valores,
                impacto,
                redes,
                vision,
                metas,
                usuario: userData._id
            });

            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        } catch (error) {
            Alert.alert('Error', 'No se pudo registrar la empresa');
            console.error(error);
        }
    };

    // Componente reutilizable para los inputs
    const CustomInput = ({ label, value, onChangeText, placeholder, multiline = false }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && styles.textArea]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#666"
                multiline={multiline}
            />
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.inner} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.logo}>🚀</Text>
                    <Text style={styles.title}>Tu Negocio</Text>
                    <Text style={styles.subtitle}>Cuéntanos más para configurar tu perfil</Text>
                </View>

                <View style={styles.form}>
                    <CustomInput label="Nombre del Responsable" value={name} onChangeText={setName} placeholder="Ej. Juan Pérez" />
                    <CustomInput label="Nombre del Negocio" value={negocio} onChangeText={setNegocio} placeholder="Nombre comercial" />
                    <CustomInput label="Productos/Servicios" value={productos} onChangeText={setProductos} placeholder="¿Qué vendes o cuál es tu producto?" multiline={true} />
                    <CustomInput label="Ubicación" value={ubicacion} onChangeText={setUbicacion} placeholder="Dirección física o ciudad" />
                    <CustomInput label="Descripción" value={descripcion} onChangeText={setDescripcion} placeholder="Descripcion de tu negocio" multiline={true} />
                    <CustomInput label="Valores" value={valores} onChangeText={setValores} placeholder="Ej. Honestidad, Innovación" />
                    <CustomInput label="Impacto Social" value={impacto} onChangeText={setImpacto} placeholder="¿Cómo ayudas a la comunidad?" multiline={true} />
                    <CustomInput label="Redes Sociales" value={redes} onChangeText={setRedes} placeholder="¿En cuáles redes sociales te encuentras?" />
                    <CustomInput label="Visión" value={vision} onChangeText={setVision} placeholder="¿Cual es la visón de tu negocio" multiline={true} />
                    <CustomInput label="Metas" value={metas} onChangeText={setMetas} placeholder="¿Cuales son las metas de tu negocio?" multiline={true} />

                    <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
                        <Text style={styles.signUpBtnText}>Guardar y Continuar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
    },
    inner: {
        paddingHorizontal: 28,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        fontSize: 48,
        marginBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 15,
        color: '#9E9E9E',
        textAlign: 'center',
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6C63FF',
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#1E1E2E',
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingVertical: 14,
        color: '#FFFFFF',
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#2A2A3E',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    signUpBtn: {
        backgroundColor: '#6C63FF',
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    signUpBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});