import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function ScoreScreen() {
  const [marks, setMarks] = useState(['', '', '', '', '']);  // Array for five marks
  const [submittedAverage, setSubmittedAverage] = useState(null);

  const handleMarkChange = (index, value) => {
    const newMarks = [...marks];
    newMarks[index] = value;
    setMarks(newMarks);
  };

  const calculateAverage = () => {
    const validMarks = marks.filter(mark => mark !== '' && !isNaN(mark)).map(Number);
    if (validMarks.length === 0) return 0;
    const sum = validMarks.reduce((acc, mark) => acc + mark, 0);
    return (sum / validMarks.length).toFixed(2);
  };

  const parsedScore = useMemo(() => {
    if (submittedAverage === null) return null;
    const value = Number(submittedAverage);
    if (Number.isNaN(value)) return 0;
    return Math.max(0, Math.min(100, value));
  }, [submittedAverage]);

  const handleSubmit = () => {
    setSubmittedAverage(calculateAverage());
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Enter marks</Text>
        <Text style={styles.subtitle}>Add up to five subject scores</Text>

        {marks.map((mark, index) => (
          <TextInput
            key={index}
            placeholder={`Mark ${index + 1}`}
            placeholderTextColor="#5f6368"
            value={mark}
            onChangeText={(value) => handleMarkChange(index, value)}
            keyboardType="numeric"
            style={styles.input}
          />
        ))}

        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
          onPress={handleSubmit}
        >
          <Text style={styles.primaryButtonText}>Submit</Text>
        </Pressable>

        <View style={styles.averageCard}>
          <Text style={styles.averageLabel}>Score</Text>
          <View style={styles.circleWrapper}>
            <Svg width={140} height={140} viewBox="0 0 140 140">
              <Circle
                cx="70"
                cy="70"
                r="56"
                stroke="#d2e3fc"
                strokeWidth="12"
                fill="none"
              />
              <Circle
                cx="70"
                cy="70"
                r="56"
                stroke="#1a73e8"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={
                  parsedScore === null
                    ? 2 * Math.PI * 56
                    : (2 * Math.PI * 56) * (1 - parsedScore / 100)
                }
                rotation="-90"
                origin="70, 70"
              />
            </Svg>
            <View style={styles.circleLabel}>
              <Text style={styles.averageValue}>
                {submittedAverage ?? '--'}
              </Text>
              <Text style={styles.averageHint}>out of 100</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ffffff',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#202124',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#5f6368',
    textAlign: 'center',
    marginBottom: 18,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#dadce0',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    color: '#202124',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
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
  averageCard: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#e8f0fe',
    borderWidth: 1,
    borderColor: '#d2e3fc',
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 12,
    color: '#1967d2',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  averageValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1967d2',
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleLabel: {
    position: 'absolute',
    alignItems: 'center',
  },
  averageHint: {
    fontSize: 12,
    color: '#5f6368',
    marginTop: 2,
  },
});