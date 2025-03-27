import React from 'react';
import { View, FlatList } from 'react-native';
import CharacterCard from '../molecules/CharacterCard';

interface CharacterListProps {
    characters: { nombre: string; genero: string; año_nacimiento: string }[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
    return (
        <View>
            <FlatList
                data={characters}
                keyExtractor={(item) => item.nombre}
                renderItem={({ item }) => <CharacterCard {...item} />}
            />
        </View>
    );
};

export default CharacterList;
