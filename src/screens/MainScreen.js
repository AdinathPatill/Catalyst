import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from '../redux/actions';
import TodoItem from '../components/TodoItem';

export default function MainScreen() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Recent');

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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Done') return todo.completed;
  });

  const sortByRecent = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

  const sortByID = (a, b) => {
    return a.id - b.id;
  };

  const sortedTodos = [...filteredTodos].sort(sort === 'Recent' ? sortByRecent : sortByID);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Total TODO items: {todos.length}</Text>
        <Text style={styles.info}>Completed TODO items: {todos.filter(todo => todo.completed).length}</Text>
      </View>
      <Button title="Add TODO" onPress={handleAddTodo} color='green' />
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
        <Button title="Most Recent" onPress={() => handleSortChange('Recent')} />
        <Button title="ID" onPress={() => handleSortChange('ID')} />
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
    marginBottom: 20,
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
