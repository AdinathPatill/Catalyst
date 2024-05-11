import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../redux/actions';
import TodoItem from '../components/TodoItem';

export default function MainScreen() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('MostRecent'); // Initialize sort state to MostRecent

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    navigation.navigate('AddTodoScreen');
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handleSortByMostRecent = () => {
    setSort('MostRecent');
  };

  const handleSortById = () => {
    setSort('ID');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Done') return todo.completed;
  });

  const sortByMostRecent = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

  const sortById = (a, b) => {
    return a.id - b.id;
  };

  // Apply sorting based on the selected sort option
  const sortedTodos = [...filteredTodos].sort(sort === 'MostRecent' ? sortByMostRecent : sortById);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Total TODO items: {todos.length}</Text>
        <Text style={styles.info}>Completed TODO items: {todos.filter(todo => todo.completed).length}</Text>
      </View>
      <FlatList
        data={sortedTodos}
        renderItem={({ item }) => (
          <TodoItem todo={item} />
        )}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
      />
      <View style={styles.buttonsContainer}>
        <Button title="All" onPress={() => handleFilterChange('All')} />
        <Button title="Active" onPress={() => handleFilterChange('Active')} />
        <Button title="Done" onPress={() => handleFilterChange('Done')} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Most Recent" onPress={handleSortByMostRecent} />
        <Button title="ID" onPress={handleSortById} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  infoContainer: {
    alignItems: 'center',
        marginBottom: 10,
    marginTop:10,
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatList: {
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
