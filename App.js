import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

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
        title: "Reminder",
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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter Reminder:</Text>
      <TextInput
        value={reminderText}
        onChangeText={setReminderText}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
          fontSize: 16,
          height: 40,
        }}
        placeholder="Type your reminder here"
      />
      <Button title="Pick Date & Time" onPress={() => setShowPicker(true)} />
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
      <View style={{ marginTop: 10 }}>
        <Button title="Set Reminder" onPress={scheduleReminder} />
      </View>
    </View>
  );
}
