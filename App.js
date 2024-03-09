import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesScreen from './screens/MoviesScreen';
import SeriesScreen from './screens/SeriesScreen';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}> 

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          tabBarStyle: {
            display: 'flex',
            backgroundColor: 'black'
          },
        }}
      >
        <Tab.Screen name="Movies" component={MoviesScreen} options={{headerShown: false, tabBarIcon: ({ color, size }) => (
        <Ionicons name="film" color={color} size={24} />
      ),}}/>
        <Tab.Screen name="Series" component={SeriesScreen} options={{  headerShown: false, tabBarIcon: ({ color, size }) => (
        <Ionicons name="tv" color={color} size={24} />
      ),}}/>
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>

  );
};

export default App;

//BA:7D:D5:14:3E:4C:BD:A9:68:A7:B2:0B:56:BF:23:3E:A0:4D:F1:C9  SHA1