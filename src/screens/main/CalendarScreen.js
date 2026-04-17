import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const EVENTS = [
  { id: '1', time: '09:00', title: 'Reunión de equipo', color: '#6C63FF' },
  { id: '2', time: '12:30', title: 'Revisión de ideas', color: '#FF6584' },
  { id: '3', time: '16:00', title: 'Publicar contenido', color: '#43D9AD' },
];

export default function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState(3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>📅 Calendario</Text>
          <Text style={styles.subtitle}>Abril 2026</Text>
        </View>

        {/* Week strip */}
        <View style={styles.weekStrip}>
          {DAYS.map((day, index) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayBtn, selectedDay === index && styles.dayBtnActive]}
              onPress={() => setSelectedDay(index)}
            >
              <Text style={[styles.dayLabel, selectedDay === index && styles.dayLabelActive]}>
                {day}
              </Text>
              <Text style={[styles.dayNum, selectedDay === index && styles.dayNumActive]}>
                {14 + index}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Events */}
        <Text style={styles.sectionTitle}>Eventos del día</Text>
        {EVENTS.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={[styles.eventDot, { backgroundColor: event.color }]} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTime}>{event.time}</Text>
              <Text style={styles.eventTitle}>{event.title}</Text>
            </View>
          </View>
        ))}
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
  weekStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E2E',
    borderRadius: 18,
    padding: 10,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2A2A3E',
  },
  dayBtn: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  dayBtnActive: {
    backgroundColor: '#6C63FF',
  },
  dayLabel: {
    color: '#9E9E9E',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  dayLabelActive: {
    color: '#FFFFFF',
  },
  dayNum: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: '700',
  },
  dayNumActive: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A3E',
    gap: 14,
  },
  eventDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  eventInfo: {
    flex: 1,
  },
  eventTime: {
    color: '#9E9E9E',
    fontSize: 12,
    marginBottom: 4,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
