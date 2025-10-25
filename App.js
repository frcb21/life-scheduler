import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  Card,
  Title,
} from 'react-native-paper';

export default function App() {
  const [reminderText, setReminderText] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const scheduleReminder = () => {
    alert(`Reminder: "${reminderText}" set for ${date}`);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS !== 'web');
    if (selectedDate) {
      setDate(selectedDate);
    }
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
            
            <Button
              mode="outlined"
              onPress={() => setShowPicker(true)}
              style={{ marginBottom: 10 }}
            >
              Pick Date & Time: {date.toLocaleString()}
            </Button>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode="datetime"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
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