import React from 'react';
import { View, Text } from 'react-native';

interface ListTemplateProps {
    title: string;
    children: React.ReactNode;
}

const ListTemplate: React.FC<ListTemplateProps> = ({ title, children }) => {
    return (
        <View>
            <Text>{title}</Text>
            {children}
        </View>
    );
};

export default ListTemplate;
