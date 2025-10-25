import React, { useState } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

  const scheduleReminder = () => {
    alert(`Reminder: "${reminderText}" set for ${date}`);
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
            <DatePicker
              selected={date}
              onChange={(selectedDate) => setDate(selectedDate)}
              showTimeSelect
              dateFormat="Pp"
              style={{ marginBottom: 10 }}
            />
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