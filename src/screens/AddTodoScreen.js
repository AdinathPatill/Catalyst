import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';

const AddTodoForm = React.memo(() => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    if (text.trim()) {
      dispatch(addTodo({
        title: text,
        completed: false
      }));
      setText('');
      // Show an alert
      Alert.alert('Success', 'Todo added successfully');
    } else {
      // Show an alert for empty todo title
      Alert.alert('Error', 'Please enter a valid todo title');
    }
  }, [dispatch, text]);

  return (
    <View>
      <TextInput
        placeholder="Add new todo"
        value={text}
        onChangeText={setText}
      />
      <Button
        title="Add todo"
        onPress={handleSubmit}
      />
    </View>
  );
});

export default AddTodoForm;
