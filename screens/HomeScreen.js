import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Manage student marks with ease</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick actions</Text>
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
          onPress={() => navigation.navigate('Score')}
        >
          <Text style={styles.primaryButtonText}>Go to Score Screen</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#5f6368',
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  cardTitle: {
    fontSize: 16,
    color: '#202124',
    marginBottom: 16,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.85,
  },
});