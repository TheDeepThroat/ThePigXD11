import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';

export default function BMICalculatorScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    Keyboard.dismiss();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // convert cm to m

    if (weightNum > 0 && heightNum > 0) {
      const bmiValue = weightNum / (heightNum * heightNum);
      setBmi(bmiValue.toFixed(1));
      
      if (bmiValue < 18.5) setCategory('Bajo peso');
      else if (bmiValue < 25) setCategory('Peso normal');
      else if (bmiValue < 30) setCategory('Sobrepeso');
      else setCategory('Obesidad');
    } else {
      setBmi(null);
      setCategory('Por favor ingresa valores válidos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholder="Ej: 70"
        />

        <Text style={styles.label}>Altura (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholder="Ej: 175"
        />

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>
      </View>

      {bmi !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Tu IMC es:</Text>
          <Text style={styles.bmiValue}>{bmi}</Text>
          <Text style={styles.categoryValue}>{category}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    color: '#666',
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6200EE',
    marginVertical: 10,
  },
  categoryValue: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
  },
});
