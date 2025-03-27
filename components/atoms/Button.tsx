import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/themeContext';
import { darkTheme, lightTheme } from '../../theme';

interface ButtonProps {
    title: string;
    type?: 'primary' | 'secondary';
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ title, type = 'primary', onPress }) => {
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <TouchableOpacity
            style={[styles.button, theme[type]]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Button;
