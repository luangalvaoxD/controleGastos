import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import ExpenseList from '../components/ExpenseList';

export default function HomeScreen({ navigation }) {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    // Requisição para pegar os gastos cadastrados
    axios.get('http://localhost:3000/api/gastos')
      .then(response => setGastos(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Gastos</Text>
      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpenseList gasto={item} />}
      />
      <Button
        title="Adicionar Novo Gasto"
        onPress={() => navigation.navigate('AddExpense')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
