import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const GastosScreen = () => {
  const [gastos, setGastos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editDescricao, setEditDescricao] = useState('');
  const [editValor, setEditValor] = useState('');
  const [editCategoria, setEditCategoria] = useState('');
  const router = useRouter();

  const fetchGastos = async () => {
    try {
      const response = await fetch('http://172.16.0.2:3000/api/gastos');
      const data = await response.json();
      setGastos(data);
    } catch (error) {
      console.error('Erro ao carregar os gastos:', error);
    }
  };

  useEffect(() => {
    fetchGastos();
  }, []);

  const handleRemoveGasto = async (id) => {
    try {
      const response = await fetch(`http://172.16.0.2:3000/api/gastos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchGastos();
      } else {
        alert('Erro ao remover o gasto');
      }
    } catch (error) {
      console.error('Erro ao remover gasto:', error);
    }
  };

  const handleSaveEdit = async (id) => {
    // Valida se os campos estão preenchidos corretamente
    if (!editDescricao || !editValor || !editCategoria) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await fetch(`http://172.16.0.2:3000/api/gastos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descricao: editDescricao,
          valor: editValor,
          categoria: editCategoria,
        }),
      });

      if (response.ok) {
        setEditingId(null);
        fetchGastos();
      } else {
        alert('Erro ao editar gasto');
      }
    } catch (error) {
      console.error('Erro ao editar gasto:', error);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditDescricao(item.descricao);
    setEditValor(item.valor.toString());
    setEditCategoria(item.categoria);
  };

  const renderGasto = ({ item }) => (
    <View style={styles.gastoContainer}>
      {editingId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            value={editDescricao}
            onChangeText={setEditDescricao}
            placeholder="Descrição"
          />
          <TextInput
            style={styles.input}
            value={editValor}
            onChangeText={setEditValor}
            keyboardType="numeric"
            placeholder="Valor"
          />
          <TextInput
            style={styles.input}
            value={editCategoria}
            onChangeText={setEditCategoria}
            placeholder="Categoria"
          />
          <Button title="Salvar" onPress={() => handleSaveEdit(item.id)} />
          <Button title="Cancelar" onPress={() => setEditingId(null)} />
        </>
      ) : (
        <>
          <Text style={styles.text}>Descrição: {item.descricao}</Text>
          <Text style={styles.text}>Valor: R$ {item.valor}</Text>
          <Text style={styles.text}>Categoria: {item.categoria}</Text>
          <Button title="Editar" onPress={() => startEdit(item)} />
          <Button title="Remover" onPress={() => handleRemoveGasto(item.id)} />
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Gastos</Text>
      <FlatList
        data={gastos}
        renderItem={renderGasto}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111',
    flex: 1,
  },
  header: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
  },
  gastoContainer: {
    backgroundColor: '#222',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
});

export default GastosScreen;
