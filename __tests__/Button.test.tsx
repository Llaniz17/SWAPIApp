import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../components/atoms/Button';

test('Renderiza el botón correctamente y responde al click', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<Button title="Click Me" onPress={mockPress} />);

    fireEvent.press(getByText('Click Me'));

    expect(mockPress).toHaveBeenCalledTimes(1);
});
