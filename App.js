import React, { useState } from 'react';
import { View, Platform, TextInput as RNTextInput } from 'react-native';
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

  const handleWebDateChange = (event) => {
    const newDate = new Date(event.target.value);
    if (!isNaN(newDate.getTime())) {
      setDate(newDate);
    }
  };

  // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
              <View style={{ marginBottom: 10 }}>
                <RNTextInput
                  type="datetime-local"
                  value={formatDateForInput(date)}
                  onChange={handleWebDateChange}
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 4,
                    fontSize: 16,
                  }}
                />
              </View>
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
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
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