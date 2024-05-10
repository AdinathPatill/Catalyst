import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';

export default function AddTodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (text.trim()) {
      dispatch(addTodo({
        title: text,
        completed: false
      }));
      setText('');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Add new todo"
        value={text}
        onChangeText={setText}
      />
      <Button
        title="Add"
        onPress={handleSubmit}
      />
    </View>
  );
}
