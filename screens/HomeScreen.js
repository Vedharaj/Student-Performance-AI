import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await SecureStore.getItemAsync('authToken');
      if (!storedToken) {
        navigation.navigate('Login');
      } else {
        setToken(storedToken);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    Alert.alert('Logged out');
    navigation.navigate('Login');
  };

  if (!token) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome! Your token: {token}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}