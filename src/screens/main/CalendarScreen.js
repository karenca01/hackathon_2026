import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const EVENTS = [
  { id: '1', time: '09:00', title: 'Reunión de equipo', color: '#6C63FF' },
  { id: '2', time: '12:30', title: 'Revisión de ideas', color: '#FF6584' },
  { id: '3', time: '16:00', title: 'Publicar contenido', color: '#43D9AD' },
];

export default function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState(3);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleDateString('es-MX', {
      month: 'long',
      year: 'numeric',
    })
  );

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>📅 Calendario</Text>
          </View>

          <RNcalendar />

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
    </View>
  );
}

const RNcalendar = () => {
  const [selected, setSelected] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');

  return (
    <>
      <Calendar
        style={styles.calendar}
        enableSwipeMonths={true}

        onDayPress={(day) => {
          setSelected(day.dateString);
        }}

        onMonthChange={(month) => {
          const date = new Date(month.timestamp);
          const formatted = date.toLocaleDateString('es-MX', {
            month: 'long',
            year: 'numeric',
          });
          setCurrentMonth(formatted);
        }}

        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: '#6C63FF',
          },
        }}

        theme={{
          backgroundColor: '#EDE9FF',
          calendarBackground: '#EDE9FF',
          textSectionTitleColor: '#3d2a8aff',
          dayTextColor: '#90869cff',
          todayTextColor: '#6C63FF',
          monthTextColor: '#3d2a8aff',
          arrowColor: '#6C63FF',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#F5F6FA',
  },
  header: {
    marginBottom: 28,
  },
  title: {
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
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#90869cff',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
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
    fontSize: 15,
    fontWeight: '600',
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  calendar: {
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
  }
});
