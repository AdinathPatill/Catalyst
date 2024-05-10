import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MainScreen from './src/screens/MainScreen';
import AddTodoForm from './src/screens/AddTodoScreen';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

const RootNavigator = () => {
  const navigation = useNavigation();

  return (
    <>
      <MainScreen navigateToAddTodo={() => navigation.navigate('AddTodoScreen')} />
      <AddTodoForm />
    </>
  );
};

export default App;
