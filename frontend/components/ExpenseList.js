import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseList({ gasto }) {
  return (
    <View style={styles.gastoContainer}>
      <Text style={styles.gastoText}>Descrição: {gasto.descricao}</Text>
      <Text style={styles.gastoText}>Valor: R$ {gasto.valor}</Text>
      <Text style={styles.gastoText}>Categoria: {gasto.categoria}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gastoContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  gastoText: {
    fontSize: 16,
  },
});
