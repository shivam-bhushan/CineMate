import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesScreen from './screens/MoviesScreen';
import SeriesScreen from './screens/SeriesScreen';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/LoginScreen';
import { User, onAuthStateChanged } from 'firebase/auth'; 
import { FIREBASE_AUTH } from './firebaseConfig';
import { LogBox } from 'react-native';


LogBox.ignoreLogs([
  'Warning: ...', 
]);


LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function InsideLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#cd1d27',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#131112',
          borderColor: '#131112',
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Series"
        component={SeriesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => { 
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="InsideStack" component={InsideLayout} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
