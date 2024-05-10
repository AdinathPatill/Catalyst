import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/actions';

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
      <Text>{item.title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          title={item.completed ? 'Undo' : 'Complete'}
          onPress={() => handleToggle(item.id)}
        />
        <Button
          title="Delete"
          onPress={() => handleDelete(item.id)}
          color="red"
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}
