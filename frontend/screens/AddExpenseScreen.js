import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function AddExpenseScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async () => {
    if (!descricao || !valor || !categoria) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico)) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico válido');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/gastos', {
        descricao,
        valor: valorNumerico,
        categoria,
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Gasto adicionado com sucesso!');
        navigation.goBack(); // Voltar à tela anterior
      } else {
        Alert.alert('Erro', 'Erro ao adicionar gasto');
      }
    } catch (error) {
      console.error('Erro ao salvar gasto:', error);
      Alert.alert('Erro', 'Erro ao adicionar gasto');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />
      <Button title="Salvar Gasto" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
});
