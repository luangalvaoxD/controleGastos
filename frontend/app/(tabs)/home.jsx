// app/(tabs)/home.jsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Adicionar Gasto" onPress={() => router.push('/add')} />
      <Button title="Ver Gastos" onPress={() => router.push('/gastos')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#222',
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
});
