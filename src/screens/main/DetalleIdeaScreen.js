import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Platform,
} from 'react-native';

const IDEA_DATA = {
    badgeText: '🔥 Tendencia activa',
    badgeColor: '#FF5A5F',
    badgeBg: '#FFF0ED',
    title: 'Happy Hour para estudiantes',
    description: 'Los martes y jueves hay baja afluencia entre 4–7pm. Un descuento especial para estudiantes con credencial puede duplicar tus ventas en ese horario y crear hábito de visita.',
    caption: '"¿Estudiando para los parciales? 📚 Ven a nuestro Happy Hour de 4–7pm. Café + internet + ambiente chill = combo perfecto para sobrevivir los exámenes ☕ ✨ #HappyHour #Cafetería #Estudiantes"',
    metrics: [
        { value: '3.2k', label: 'Alcance\nestimado' },
        { value: '5.8%', label: 'Engagement\nestimado' },
        { value: 'Mar', label: 'Mejor día' },
    ],
    availableTags: [
        { id: 'reel', label: 'Reel', icon: '📱' },
        { id: 'story', label: 'Story', icon: '🟦' },
        { id: 'post', label: 'Post', icon: '📸' },
    ]
};

export default function DetalleIdeaScreen({ navigation }) {
    const [selectedTags, setSelectedTags] = useState(['reel']);

    // --- EFECTO PARA OCULTAR EL TAB BAR ---
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
    // ----------------------------------------

    const toggleTag = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter(id => id !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    const handleGeneratePost = () => {
        console.log("Tags a generar:", selectedTags);
        navigation.navigate('CrearPostScreen', { tags: selectedTags });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('HomeMain')}
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalle de idea</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Badge */}
                <View style={[styles.badge, { backgroundColor: IDEA_DATA.badgeBg }]}>
                    <Text style={[styles.badgeText, { color: IDEA_DATA.badgeColor }]}>
                        {IDEA_DATA.badgeText}
                    </Text>
                </View>

                {/* Título y Descripción */}
                <Text style={styles.title}>{IDEA_DATA.title}</Text>
                <Text style={styles.description}>{IDEA_DATA.description}</Text>

                {/* Caption Card */}
                <View style={styles.captionCard}>
                    <Text style={styles.captionHeader}>CAPTION SUGERIDO</Text>
                    <Text style={styles.captionText}>{IDEA_DATA.caption}</Text>
                </View>

                {/* Métricas */}
                <View style={styles.metricsContainer}>
                    {IDEA_DATA.metrics.map((metric, index) => (
                        <View key={index} style={styles.metricBox}>
                            <Text style={styles.metricValue}>{metric.value}</Text>
                            <Text style={styles.metricLabel}>{metric.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Tags Seleccionables */}
                <View style={styles.tagsContainer}>
                    {IDEA_DATA.availableTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag.id);
                        return (
                            <TouchableOpacity
                                key={tag.id}
                                style={[
                                    styles.tagButton,
                                    isSelected ? styles.tagButtonActive : styles.tagButtonInactive
                                ]}
                                onPress={() => toggleTag(tag.id)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.tagIcon,
                                    !isSelected && { opacity: 0.5 }
                                ]}>
                                    {tag.icon}
                                </Text>
                                <Text style={[
                                    styles.tagText,
                                    isSelected ? styles.tagTextActive : styles.tagTextInactive
                                ]}>
                                    {tag.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Botón Principal */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleGeneratePost}
                >
                    <Text style={styles.primaryButtonText}>🎨 Generar post completo</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? 40 : 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    backIcon: {
        fontSize: 20,
        color: '#111827',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    content: {
        padding: 24,
        paddingBottom: 40,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 16,
    },
    badgeText: {
        fontSize: 13,
        fontWeight: '700',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 12,
        lineHeight: 30,
    },
    description: {
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 24,
        marginBottom: 24,
    },
    captionCard: {
        backgroundColor: '#F3E8FF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
    },
    captionHeader: {
        fontSize: 12,
        fontWeight: '700',
        color: '#4B5563',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    captionText: {
        fontSize: 15,
        fontStyle: 'italic',
        color: '#1F2937',
        lineHeight: 24,
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    metricBox: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 4,
    },
    metricValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 4,
    },
    metricLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        lineHeight: 16,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    tagButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1.5,
    },
    tagButtonActive: {
        backgroundColor: '#F3E8FF',
        borderColor: '#6C63FF',
    },
    tagButtonInactive: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
    },
    tagIcon: {
        marginRight: 6,
        fontSize: 14,
    },
    tagText: {
        fontSize: 14,
        fontWeight: '600',
    },
    tagTextActive: {
        color: '#6C63FF',
    },
    tagTextInactive: {
        color: '#6B7280',
    },
    primaryButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});