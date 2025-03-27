import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListScreen from '../components/pages/ListScreen';
import DetailScreen from '../components/pages/DetailScreen';

export type RootStackParamList = {
    List: undefined;
    Detail: { entityType: 'people' | 'planets' | 'films'; entityId: string };
};


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="List" component={ListScreen} options={{ title: 'SWAPI App' }} />
                <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalle' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
