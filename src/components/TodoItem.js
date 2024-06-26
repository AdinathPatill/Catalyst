import React, { useCallback } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/actions';

const TodoItem = React.memo(({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = useCallback(() => {
    dispatch(toggleTodo(todo.id));
  }, [dispatch, todo.id]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTodo(todo.id));
    // Show an alert
   // Alert.alert('Success', 'Todo deleted successfully');
  }, [dispatch, todo.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title={todo.completed ? 'Undo' : 'Complete'}
          onPress={handleToggle}
          style={styles.button}
        />
        <Button
          title="Delete"
          onPress={handleDelete}
          color="red"
          style={styles.button}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  title: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
  },
});

export default TodoItem;
