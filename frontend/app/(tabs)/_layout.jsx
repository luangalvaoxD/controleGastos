// app/(tabs)/_layout.jsx
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="gastos" />
    </Tabs>
  );
}
