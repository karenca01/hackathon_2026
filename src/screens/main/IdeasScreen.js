import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

const INITIAL_IDEAS = [
  {
    id: '1',
    category: 'Tendencias',
    categoryIcon: '🔥',
    categoryColor: '#FF5A5F',
    categoryBg: '#FFF0ED',
    title: 'Happy Hour para estudiantes',
    description: 'Los martes y jueves tienen baja afluencia. Un descuento especial de 4-7pm puede duplicar tus ventas tarde.',
    tags: [
      { label: 'Reel', icon: '📱', bg: '#F3E8FF', color: '#6C63FF' },
      { label: 'Story', icon: '🟦', bg: '#E5F0FF', color: '#0066CC' }
    ]
  },
  {
    id: '2',
    category: 'Temporada',
    categoryIcon: '📆',
    categoryColor: '#0066CC',
    categoryBg: '#E5F0FF',
    title: 'Semana de parciales universitarios',
    description: 'Estudiantes bajo estrés buscan espacios para estudiar. "Estudia con nosotros: café + enchufes + WiFi gratis"',
    tags: [
      { label: 'Carrusel', icon: '🎠', bg: '#F3E8FF', color: '#6C63FF' }
    ]
  },
  {
    id: '3',
    category: 'Promociones',
    categoryIcon: '💰',
    categoryColor: '#28A745',
    categoryBg: '#E8F5E9',
    title: 'Combo desayuno universitario',
    description: 'Café + pan dulce a $55. Publicar entre 7-8am cuando estudiantes van a clases.',
    tags: [
      { label: 'Post', icon: '🖼️', bg: '#FFF3E0', color: '#E6A800' }
    ]
  },
];

const FILTERS = ['Todas', 'Temporada', 'Tendencias', 'Promociones'];

export default function IdeasScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todas');

  // Lógica de filtrado
  const filteredIdeas = INITIAL_IDEAS.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'Todas' || idea.category === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      {/* Header Fijo */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Ideas con IA</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => navigation.navigate('Agregar')}
        >
          <Text style={styles.newButtonText}>+ Nueva</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de Búsqueda Fija */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ideas..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filtros Fijos */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {FILTERS.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterBadge, isActive && styles.filterBadgeActive]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Lista Scrolleable de Ideas */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filteredIdeas.map((idea) => (
          <TouchableOpacity
            key={idea.id}
            style={styles.ideaCard}
            onPress={() => navigation.navigate('DetalleIdeaScreen', { ideaId: idea.id })}
          >
            <View style={[styles.categoryBadge, { backgroundColor: idea.categoryBg }]}>
              <Text style={[styles.categoryText, { color: idea.categoryColor }]}>
                {idea.categoryIcon} {idea.category.replace(/s$/, '')}
              </Text>
            </View>

            <Text style={styles.ideaTitle}>{idea.title}</Text>
            <Text style={styles.ideaDescription}>{idea.description}</Text>

            <View style={styles.tagsContainer}>
              {idea.tags.map((tag, index) => (
                <View key={index} style={[styles.platformTag, { backgroundColor: tag.bg }]}>
                  <Text style={[styles.platformTagText, { color: tag.color }]}>
                    {tag.icon} {tag.label}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {filteredIdeas.length === 0 && (
          <Text style={styles.emptyStateText}>No se encontraron ideas.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA', // Fondo claro estilo iOS/Minimalista
    paddingTop: Platform.OS === 'android' ? 50 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  newButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  newButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 8, // Fallback por si gap no está soportado en versiones muy viejas
  },
  filterBadgeActive: {
    backgroundColor: '#F3E8FF',
    borderColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  ideaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2, // Sombra suave para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  ideaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  ideaDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  platformTag: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8, // Fallback por si gap falla
  },
  platformTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 40,
    fontSize: 15,
  }
});