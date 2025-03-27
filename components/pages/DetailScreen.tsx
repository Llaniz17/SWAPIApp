import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { getEntityById } from '../../services/swapiService';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC = () => {
    const route = useRoute<DetailScreenRouteProp>();
    const { entityType, entityId } = route.params;

    const [entity, setEntity] = useState<Record<string, string | undefined> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEntityById(entityType, entityId).then((data) => {
            setEntity(data);
            setLoading(false);
        });
    }, [entityType, entityId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {entity ? (
                Object.entries(entity).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        <Text style={styles.label}>{key.replace('_', ' ').toUpperCase()}:</Text> {value}
                    </Text>
                ))
            ) : (
                <Text>No se encontraron datos.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
    },
});

export default DetailScreen;
