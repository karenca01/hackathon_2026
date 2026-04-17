import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const IDEAS = [
  { id: '1', title: 'Lanzar campaña en redes', tag: 'Marketing', color: '#6C63FF' },
  { id: '2', title: 'Mejorar UX del onboarding', tag: 'Producto', color: '#FF6584' },
  { id: '3', title: 'Automatizar reportes', tag: 'Tecnología', color: '#43D9AD' },
];

export default function IdeasScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>💡 Ideas</Text>
          <Text style={styles.subtitle}>Captura tus mejores ideas</Text>
        </View>

        {IDEAS.map((idea) => (
          <TouchableOpacity key={idea.id} style={styles.ideaCard}>
            <View style={[styles.tagBadge, { backgroundColor: idea.color + '22' }]}>
              <Text style={[styles.tagText, { color: idea.color }]}>{idea.tag}</Text>
            </View>
            <Text style={styles.ideaTitle}>{idea.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Nueva idea</Text>
        </TouchableOpacity>
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
    paddingBottom: 30,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  ideaCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2A2A3E',
  },
  tagBadge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ideaTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
