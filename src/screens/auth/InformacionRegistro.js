import React, { useState, useEffect } from 'react';
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
import sessionStore from '../../services/sesion';
import { createBusiness } from '../../services/api';

export default function InformacionRegistro({ navigation }) {
    const [negocio, setNegocio] = useState('');
    const [productos, setProductos] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [valores, setValores] = useState('');
    const [impacto, setImpacto] = useState('');
    const [redes, setRedes] = useState('');
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
        if (!negocio || !productos || !ubicacion || !descripcion || !redes ) {
            Alert.alert('Atención', 'Por favor, completa todos los campos obligatorios');
            return;
        }

        try {
            await createBusiness({
                negocio,
                productos,
                ubicacion,
                descripcion,
                valores,
                impacto,
                redes,
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

    const CustomInput = ({ label, value, onEndEditing, placeholder, multiline = false }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && styles.textArea]}
                defaultValue={value}
                onEndEditing={({ nativeEvent }) => onEndEditing(nativeEvent.text)}
                placeholder={placeholder}
                placeholderTextColor="#999"
                multiline={multiline}
                blurOnSubmit={!multiline}
                returnKeyType={multiline ? 'default' : 'next'}
                autoCorrect={false}
                autoCapitalize="sentences"
            />
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.inner, { flexGrow: 1 }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="none"
            >
                <View style={styles.header}>
                    <Text style={styles.logo}>🚀</Text>
                    <Text style={styles.title}>Tu Negocio</Text>
                    <Text style={styles.subtitle}>Cuéntanos más para configurar tu perfil y ofrecerte mejores estrategias.</Text>
                </View>

                <View style={styles.form}>
                    <CustomInput label="Nombre del Negocio *" value={negocio} onEndEditing={setNegocio} placeholder="Nombre comercial" />
                    <CustomInput label="Productos/Servicios *" value={productos} onEndEditing={setProductos} placeholder="¿Qué vendes o cuál es tu producto?" multiline={true} />
                    <CustomInput label="Ubicación *" value={ubicacion} onEndEditing={setUbicacion} placeholder="Dirección física o ciudad" />
                    <CustomInput label="Descripción *" value={descripcion} onEndEditing={setDescripcion} placeholder="Descripción de tu negocio" multiline={true} />
                    <CustomInput label="Valores" value={valores} onEndEditing={setValores} placeholder="Ej. Honestidad, Innovación" />
                    <CustomInput label="Impacto Social" value={impacto} onEndEditing={setImpacto} placeholder="¿Cómo ayudas a la comunidad?" multiline={true} />
                    <CustomInput label="Redes Sociales *" value={redes} onEndEditing={setRedes} placeholder="¿En cuáles redes sociales te encuentras?" />
                    <CustomInput label="Metas" value={metas} onEndEditing={setMetas} placeholder="¿Cuáles son las metas de tu negocio?" multiline={true} />

                    <TouchableOpacity 
                        style={styles.signUpBtn} 
                        onPress={handleSignUp}
                        activeOpacity={0.8}
                    >
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
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? 40 : 20, 
    },
    inner: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'flex-start',
        marginBottom: 30,
        marginTop: 10,
    },
    logo: {
        fontSize: 40,
        marginBottom: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000033',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
    },
    form: {
        gap: 16,
    },
    scrollView: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: '#333',
        fontSize: 15,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: 14,
    },
    signUpBtn: {
        backgroundColor: '#6B4EFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    signUpBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});