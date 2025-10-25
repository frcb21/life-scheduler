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

// Only import react-datepicker on web platform
let DatePicker;
if (Platform.OS === 'web') {
  DatePicker = require('react-datepicker').default;
  require('react-datepicker/dist/react-datepicker.css');
}

export default function App() {
  const [reminderText, setReminderText] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const scheduleReminder = () => {
    alert(`Reminder: "${reminderText}" set for ${date}`);
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'web') {
      setDate(selectedDate);
    } else {
      setShowPicker(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
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
            
            {Platform.OS === 'web' ? (
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                style={{ marginBottom: 10 }}
              />
            ) : (
              <>
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
                    display="spinner"
                    onChange={handleDateChange}
                  />
                )}
              </>
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