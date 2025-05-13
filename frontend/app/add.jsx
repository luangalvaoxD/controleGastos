import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function AddExpenseScreen() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const router = useRouter();

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
      const response = await axios.post('http://172.16.0.2:3000/api/gastos', {
        descricao,
        valor: valorNumerico,
        categoria,
      });

      // Checando o status da resposta
      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Gasto adicionado com sucesso!');

        // Limpa os campos
        setDescricao('');
        setValor('');
        setCategoria('');

        // Redireciona para a página de listagem de gastos
        router.push('/gastos');
      } else {
        Alert.alert('Erro', 'Erro ao adicionar gasto');
      }
    } catch (error) {
      console.error('Erro ao salvar gasto:', error);

      // Mensagem de erro mais detalhada para diferentes cenários
      if (error.response) {
        // Se a resposta do backend foi recebida, mas com erro
        Alert.alert('Erro', `Erro no servidor: ${error.response.data.message || 'Tente novamente mais tarde.'}`);
      } else if (error.request) {
        // Se a requisição foi feita, mas não houve resposta
        Alert.alert('Erro', 'Servidor não respondeu. Verifique sua conexão ou se o servidor está ativo.');
      } else {
        // Qualquer outro erro
        Alert.alert('Erro', `Erro desconhecido: ${error.message}`);
      }
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
