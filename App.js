import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/SignInScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    // Funtion logout
    const doLogout = (navigation) => {
        AsyncStorage.removeItem('authInfo');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={LoginScreen} options={{ gestureEnabled: false }} />
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={(props) => ({
                        gestureEnabled: false,
                        headerRight: () => <Button title='Logout' onPress={() => doLogout(props.navigation)} />
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
