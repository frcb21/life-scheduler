import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import {
  Provider as PaperProvider,
  Text,
  TextInput,
  Button,
  Card,
  Title,
} from 'react-native-paper';

export default function App() {
  const [reminderText, setReminderText] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const scheduleReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder',
        body: reminderText,
      },
      trigger: {
        type: 'date',
        date: date,
      },
    });
    alert('Reminder scheduled!');
  };

  return (
    <PaperProvider>
      <View style={{ padding: 20 }}>
        <Card>
          <Card.Content>
            <Title>Set a Reminder</Title>
            <TextInput
              label="Reminder"
              value={reminderText}
              onChangeText={setReminderText}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <Button mode="contained" onPress={() => setShowPicker(true)}>
              Pick Date & Time
            </Button>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowPicker(Platform.OS === 'ios');
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
            <Button
              mode="contained"
              onPress={scheduleReminder}
              style={{ marginTop: 10 }}
            >
              Set Reminder
            </Button>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
}