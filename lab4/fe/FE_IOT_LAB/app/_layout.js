import { Stack } from 'expo-router';
import Home from './Home';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00b4d8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
      name="index"
      
      options={{ title: 'IOT Demo' }}
  />
    </Stack>
  );
}
