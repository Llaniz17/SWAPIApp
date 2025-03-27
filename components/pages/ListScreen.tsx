import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, ActivityIndicator, TouchableOpacity,
    StyleSheet, TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { getEntities } from '../../services/swapiService';
import Button from '../../components/atoms/Button'; // Botón personalizado
import { useTheme } from '../../context/themeContext'; // Hook del tema

type NavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

const ListScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { theme, toggleTheme } = useTheme(); // Tema y función para cambiarlo
    const [data, setData] = useState<{ id: string; nombre: string; type: 'people' | 'planets' | 'films' }[]>([]);
    const [filteredData, setFilteredData] = useState(data);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'people' | 'planets' | 'films'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const people = await getEntities('people');
            const planets = await getEntities('planets');
            const films = await getEntities('films');
            const combinedData = [...people, ...planets, ...films];
            setData(combinedData);
            setFilteredData(combinedData);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        let updatedData = data;

        // Filtrar por categoría
        if (selectedCategory !== 'all') {
            updatedData = updatedData.filter(item => item.type === selectedCategory);
        }

        // Filtrar por búsqueda solo en personajes
        if (searchQuery.trim() !== '' && selectedCategory === 'people') {
            updatedData = updatedData.filter(item =>
                item.nombre.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(updatedData);
    }, [selectedCategory, searchQuery, data]);

    if (loading) {
        return <ActivityIndicator size="large" color={theme.primary.backgroundColor} />;
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.primary.backgroundColor }]}>
            {/* Selector de Categorías */}
            <View style={styles.filterContainer}>
                {['all', 'people', 'planets', 'films'].map(category => (
                    <Button
                        key={category}
                        title={category.toUpperCase()}
                        onPress={() => setSelectedCategory(category as any)}
                        variant={selectedCategory === category ? 'primary' : 'secondary'}
                        style={styles.filterButton}
                    />
                ))}
            </View>

            {/* Input de búsqueda (solo para personajes) */}
            {selectedCategory === 'people' && (
                <TextInput
                    style={[styles.searchInput, { backgroundColor: theme.secondary.backgroundColor, color: '#000' }]}
                    placeholder="Buscar personaje..."
                    placeholderTextColor="#666"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            )}

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Detail', { entityType: item.type, entityId: item.id })}
                        style={[styles.card, { backgroundColor: theme.secondary.backgroundColor }]}
                    >
                        <Text style={styles.name}>{item.nombre}</Text>
                        <Text style={styles.type}>({item.type.toUpperCase()})</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Botón flotante para cambiar el modo */}
            <TouchableOpacity
                style={[styles.floatingButton, { backgroundColor: theme.secondary.backgroundColor }]}
                onPress={toggleTheme}
            >
                <Text style={styles.buttonText}>🌙</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    filterButton: {
        marginHorizontal: 5,
    },
    searchInput: {
        height: 40,
        marginHorizontal: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    card: {
        padding: 10,
        margin: 10,
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
    type: {
        fontSize: 12,
        color: 'gray',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    buttonText: {
        fontSize: 24,
        color: '#FFF',
    },
});

export default ListScreen;
