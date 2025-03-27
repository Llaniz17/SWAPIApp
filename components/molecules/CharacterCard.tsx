import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

interface CharacterCardProps {
    id: string;
    nombre: string;
    genero: string;
    año_nacimiento: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ id, nombre, genero, año_nacimiento }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'List'>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { characterId: id })}>
            <View style={styles.card}>
                <Text style={styles.name}>{nombre}</Text>
                <Text>Género: {genero}</Text>
                <Text>Año de nacimiento: {año_nacimiento}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CharacterCard;
